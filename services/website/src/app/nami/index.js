import { getPoolId, delegationTx, signTx, submitTx, getDelegation, blockfrostRequest } from "./transaction";

export default ctx => ({
  delegationTx: delegationTx(ctx),
  getPoolId,
  signTx: signTx(ctx),
  submitTx: submitTx(ctx),
  getDelegation: getDelegation(ctx),
  blockfrostRequest: blockfrostRequest(ctx)
})

/*
example
const delegation = await getDelegation(); // you can also use this one to check for current deleagation status (for the UI, like if the user is already delegate in the pool you just selected)
const targetPoolId = "pool19f6guwy97mmnxg9dz65rxyj8hq07qxud886hamyu4fgfz7dj9gl";
const tx = await delegationTx(delegation, targetPoolId);
const signedTx = await signTx(tx);
const txHash = await submitTx(signedTx);
*/
