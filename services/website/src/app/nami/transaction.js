import CoinSelection from "./coinSelection";
import Loader from "./loader";

export const blockfrostRequest = ctx => async (endpoint, headers, body) => {
  return await fetch(
    `https://cardano-mainnet.blockfrost.io/api/v0` + endpoint,
    {
      headers: { project_id: ctx.blockfrost_project_id },
    }
  ).then((res) => res.json());
};

const initTx = ctx => async () => {
  await Loader.load();
  const latest_block = await blockfrostRequest(ctx)("/blocks/latest");

  const p = await blockfrostRequest(ctx)(`/epochs/${latest_block.epoch}/parameters`);

  return {
    linearFee: Loader.Cardano.LinearFee.new(
      Loader.Cardano.BigNum.from_str(p.min_fee_a.toString()),
      Loader.Cardano.BigNum.from_str(p.min_fee_b.toString())
    ),
    minUtxo: Loader.Cardano.BigNum.from_str(p.min_utxo),
    poolDeposit: Loader.Cardano.BigNum.from_str(p.pool_deposit),
    keyDeposit: Loader.Cardano.BigNum.from_str(p.key_deposit),
    maxTxSize: Loader.Cardano.max_tx_size,
  };
};

export const getPoolId = (poolId) => {
  return Buffer.from(Loader.Cardano.Ed25519KeyHash.from_bech32(poolId).to_bytes(), "hex").toString("hex")
}

export const delegationTx = ctx => async (delegation, targetPoolId) => {
  await Loader.load();
  const protocolParameters = await initTx(ctx)();
  let address = (await ctx.walletAPI.getUsedAddresses())[0];
  address = Loader.Cardano.Address.from_bytes(Buffer.from(address, "hex"));
  const rewardAddress = await ctx.walletAPI.getRewardAddresses();
  const stakeCredential = Loader.Cardano.RewardAddress.from_address(
    Loader.Cardano.Address.from_bytes(Buffer.from(rewardAddress[0], "hex"))
  ).payment_cred();
  let utxos = await ctx.walletAPI.getUtxos();
  utxos = utxos.map((utxo) =>
    Loader.Cardano.TransactionUnspentOutput.from_bytes(Buffer.from(utxo, "hex"))
  );
  //estimated max multiasset size 5848
  //estimated max value size 5860
  //estimated max utxo size 5980
  const MULTIASSET_SIZE = 5848;
  const VALUE_SIZE = 5860;

  const outputs = Loader.Cardano.TransactionOutputs.new();
  outputs.add(
    Loader.Cardano.TransactionOutput.new(
      address,
      Loader.Cardano.Value.new(protocolParameters.keyDeposit)
    )
  );
  const selection = await CoinSelection.randomImprove(
    utxos,
    outputs,
    20,
    protocolParameters.minUtxo.to_str()
  );

  const inputs = selection.input;
  const txBuilder = Loader.Cardano.TransactionBuilder.new(
    protocolParameters.linearFee,
    protocolParameters.minUtxo,
    protocolParameters.poolDeposit,
    protocolParameters.keyDeposit
  );

  for (let i = 0; i < inputs.length; i++) {
    const utxo = inputs[i];
    txBuilder.add_input(
      utxo.output().address(),
      utxo.input(),
      utxo.output().amount()
    );
  }

  const certificates = Loader.Cardano.Certificates.new();
  if (!delegation.active)
    certificates.add(
      Loader.Cardano.Certificate.new_stake_registration(
        Loader.Cardano.StakeRegistration.new(stakeCredential)
      )
    );

  certificates.add(
    Loader.Cardano.Certificate.new_stake_delegation(
      Loader.Cardano.StakeDelegation.new(
        stakeCredential,
        Loader.Cardano.Ed25519KeyHash.from_bech32(targetPoolId)
      )
    )
  );
  txBuilder.set_certs(certificates);

  const change = selection.change;
  const changeMultiAssets = change.multiasset();

  // check if change value is too big for single output
  if (changeMultiAssets && change.to_bytes().length * 2 > VALUE_SIZE) {
    const partialChange = Loader.Cardano.Value.new(
      Loader.Cardano.BigNum.from_str("0")
    );

    const partialMultiAssets = Loader.Cardano.MultiAsset.new();
    const policies = changeMultiAssets.keys();
    const makeSplit = () => {
      for (let j = 0; j < changeMultiAssets.len(); j++) {
        const policy = policies.get(j);
        const policyAssets = changeMultiAssets.get(policy);
        const assetNames = policyAssets.keys();
        const assets = Loader.Cardano.Assets.new();
        for (let k = 0; k < assetNames.len(); k++) {
          const policyAsset = assetNames.get(k);
          const quantity = policyAssets.get(policyAsset);
          assets.insert(policyAsset, quantity);
          //check size
          const checkMultiAssets = Loader.Cardano.MultiAsset.from_bytes(
            partialMultiAssets.to_bytes()
          );
          checkMultiAssets.insert(policy, assets);
          if (checkMultiAssets.to_bytes().length * 2 >= MULTIASSET_SIZE) {
            partialMultiAssets.insert(policy, assets);
            return;
          }
        }
        partialMultiAssets.insert(policy, assets);
      }
    };
    makeSplit();
    partialChange.set_multiasset(partialMultiAssets);
    const minAda = Loader.Cardano.min_ada_required(
      partialChange,
      protocolParameters.minUtxo
    );
    partialChange.set_coin(minAda);

    txBuilder.add_output(
      Loader.Cardano.TransactionOutput.new(address, partialChange)
    );
  }

  txBuilder.add_change_if_needed(address);

  const transaction = Loader.Cardano.Transaction.new(
    txBuilder.build(),
    Loader.Cardano.TransactionWitnessSet.new()
  );

  const size = transaction.to_bytes().length * 2;
  if (size > protocolParameters.maxTxSize) throw ERROR.txTooBig;

  return transaction;
};

export const signTx = ctx => async (transaction) => {
  await Loader.load();
  const witnesses = await ctx.walletAPI.signTx(
    Buffer.from(transaction.to_bytes(), "hex").toString("hex")
  );
  const signedTx = await Loader.Cardano.Transaction.new(
    transaction.body(),
    Loader.Cardano.TransactionWitnessSet.from_bytes(
      Buffer.from(witnesses, "hex")
    )
  );
  return signedTx;
};

export const submitTx = ctx => async (signedTx) => {
  const txHash = await ctx.walletAPI.submitTx(
    Buffer.from(signedTx.to_bytes(), "hex").toString("hex")
  );
  return txHash;
};

export const getDelegation = ctx => async () => {
  await Loader.load();
  const rawAddress = await ctx.walletAPI.getRewardAddresses();
  const rewardAddress = Loader.Cardano.Address.from_bytes(
    Buffer.from(rawAddress[0], "hex")
  ).to_bech32();
  const stake = await blockfrostRequest(ctx)(`/accounts/${rewardAddress}`);
  if (!stake || stake.error || !stake.pool_id) return {};
  return stake;
};
