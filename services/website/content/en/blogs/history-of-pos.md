---
template: BlogDetailPage
title: History of Proof-of-Stake
image: /staking-clock.webp
imageCaption: Credits to [@nattanan23](https://pixabay.com/users/nattanan23-6312362/) at Pixbay
description:
aliases: proof-of-work, pow, mining crypto, mining btc, mining bitcoin, bitcoin
keywords: bitcoin, bitcoin network, crypto, proof-of-work, proof-of-stake, cardano, sustainability
identities: 
    - id: wael-ivie
      role: author
---


##

One of the hottest topics discussed in the [cryptocurrency](/en/terms/cryptocurrency.md) and blockchain space is [Proof-of-Work](/en/terms/proof-of-work.md) Vs. [Proof-of-Stake](/en/terms/proof-of-stake.md). Ever since the development of Proof-of-Stake, this topic has dominated the discussion and forced a sort of tribal split between various blockchain communities. But before we can compare one Vs. another, we need to know about their history.  We have reviewed the Proof-of-Work blockchain history in a previous [blog here](/en/blogs/history-of-pow.md). In this blog, we will dive into the origins of proof-of-stake, some problems of "Proof-of-Work" it solves, and the current status of its development.

## Origins

The conception of Proof-of-Stake dates back to the summer of 2011 when a paper written by Ben Laurie titled [Decentralised Currencies Are Probably Impossible](https://github.com/armada-alliance/assets/raw/gh-pages/decentralised-currencies.pdf) laid out the foundation for Proof-of-Stake consensus.

Recall that consensus protocols like proof-of-work determine how individual nodes on a blockchain network assess the current state of the ledger system and reach an agreement. The objective of Laurie's research was to find a more decentralized and efficient consensus mechanism than Proof-of-Work by alternating the issuance (mining) of a Bitcoin. Instead of using computing power to determine the issuers of new coins, Laurie proposes a randomized selection process.

Just a few days after the paper by Ben Laurie, a post on the [bitcointalk forum](https://bitcointalk.org/index.php?topic=27787.0) by a user named "QuantumMechanic"  introduced the term and principles of Proof-of-Stake. According to the QuantumMechanic:

***What I mean by proof of stake is that instead of your "vote" on the accepted transaction history being weighted by the share of computing resources you bring to the network, it's weighted by the number of bitcoins you can prove you own, using your private keys.***

In simple terms, you can think of Proof-of-Stake as simply proof of ownership of a [currency](/en/terms/currency.md). This concept may seem trivial, but it is not when thinking about digital currencies. With traditional [fiat currencies](/en/terms/fiat.md), proof of ownership is easy to solve because fiat currencies are material and can only be in one place at a time.

The post also included bold claims about Proof-of-Stake, like it is more sustainable, is faster, cheaper, and is more decentralized. Those were merely a few of the added benefits to this sort of new consensus mechanism proposed. However, being untested like Proof-of-Work, many believed this new Proof-of-Stake idea to be nothing more than a utopian dream. 

## PPcoin & Peercoin

The next major milestone in the journey of Proof-of-Stake took place in 2012 when Sunny King and Scott Nadal released the [PPcoin whitepaper](https://decred.org/research/king2012.pdf). Building on the ideas of Ben Laurie and the discussions on the Bitcoin talk forum King and Nadal's ppcoin aimed to be the first peer-to-peer cryptocurrency based on Proof-of-Stake consensus. 

But how does King and Nadal's PPcoin use Proof-of-Stake to accomplish an even more decentralized and efficient cryptocurrency without sacrificing security?

The way King and Nadal solved the security concerns of Proof-of-Stake was by creating a hybrid protocol model. In this model, the issuance of new coins is a Proof-of-Work mining process known as minting. The PPcoin Proof-of-Stake consensus model uses "coin age" and a hashing scheme similar to Bitcoin.  

Satoshi Nakamoto knew of coin age as early as 2010, and he used it for prioritizing Bitcoin transactions, but not as a security feature. Coin age means a currency amount multiplied by the holding period of the currency. An example is Bob received 100 coins from Alice and held it for 10-days, then Bob accumulates (100 x 10) 1000 coin-days of coin age. Then by using block and transaction timestamps, the computation of coin age is facilitated and secured.

Block generation in the PPcoin hybrid model consists of two parts, proof-of-work blocks, and proof-of-stake blocks. 

![Hybrid Model](https://github.com/armada-alliance/assets/raw/gh-pages/hybrid-pos-pow.png)

In what is known as the "coinstake" transaction block owner pays himself consuming his coin age while gaining the right of creating a block for the network and minting for proof-of-stake. The first input called kernel is required to meet a hash target protocol similar to proof-of-work protocols.

But the hashing operation is done on a limited search space (one hash per unspent output per second), unlike in proof-of-work, which significantly reduces the consumption of energy resources. The hash target that the stake kernel must meet is a target per unit coin age consumed in the stake kernel. Thus the more coin age consumed by the stake kernel, the easier it is to meet the hash target protocol. 

The only issue left to solve is the issuance of new coins. For this, King and Nadal used a slightly modified proof-of-work minting process. Where the proof-of-stake block mints coins based on the consumed coin age in the coinstake transaction. With a mint rate of 1 cent per coin-year consumed to produce a low future inflation rate. More intriguing was King and Nadal's idea for a genesis block that contains all the coins to be in circulation, similar to how an IPO works.

Applying this hybrid model, PPcoin maintains similar levels of security to Bitcoin while being more efficient and decentralized. The model was revolutionary in the crypto space. Reduced demand on resources and computing power to generate blocks, validate transactions, and secure the network proof-of-stake allows for a more diverse number of participants, increasing decentralization. 

Later in 2012, King founded Peercoin, the world's first real proof-of-stake-based blockchain that is still around to this day. To learn more about Peercoin, I highly recommend visiting [Peercoin University](https://university.peercoin.net/), or you can watch the video below.

<YoutubeVideo url="https://youtu.be/x8KAsime9EI" description="peersoin intro"/>

## The Next Generation

In 2015 a new generation of blockchain had arrived that would become today's largest proof-of-stake consensus-based blockchain called Cardano with its native currency ADA. 

The Cardano platform was founded in 2015 by [Charles Hoskinson](/en/identities/charles-hoskinson.md) and Jeremy Wood. Cardano was developed by their company [IOG](/en/identities/iog.md) the [EMURGO foundation](/en/identities/emurgo.md), and the [Cardano Foundation](/en/identities/cardano-foundation.md). The goal of the Cardano blockchain is to solve the three main problems of cryptocurrency security, scalability, and interoperability. Cardano's methodology and groundbreaking Ouroboros protocol solve these problems but additionally adding benefits of sustainability, decentralization, and governance. While we won't have time to dive into all these topics in this blog, let's take a look into the Ouroboros proof-of-stake protocol. 

The main breakthrough of Cardano lies within the Ouroboros proof-of-stake protocol. Up to now, we have seen essentially the two main generations of consensus protocols, the first being proof-of-work, and the second being proof-of-stake. But the Ouroboros consensus protocol for Cardano brings in the third generation of consensus often described as delegated-proof-of-stake. 

Unlike in previous proof-of-stake protocols like Peercoin who use coin age, Ouroboros selects participants known as stake pools to generate new blocks. The stake pools are then selected based on the amount of active stake they control in the network along with true randomness. 

There are some benefits to this method that solves the proof-of-ownership while adding security to the overall network.  Additional benefits to the stake pool are ADA users/holders can delegate their ADA wallet to increase a stake pool's active stake, thus, in turn, increasing the likelihood of selection to generate a block and earn rewards.  

But What makes the Ouroboros protocol so different from other proof-of-stake protocols we have seen was using unbiased randomized leadership selection. Essentially the consensus protocol of a blockchain is responsible for three main tasks:

1. Perform leader checks and decide if a block should be created and by who.
2. Determine chain selection.
3. Verify produced blocks.

Randomness prevents the formation of patterns, which is critical for maintaining a protocol’s security. This along with the ability to facilitate the proliferation of global, permissionless systems with minimal energy consumption is what makes Ouroboros a significant milestone.

<YoutubeVideo url="https://youtu.be/Do8rHvr65ZA" description=Cardano Simply Explained/>

Today most cryptocurrencies have moved away from proof-of-work consensus due to the heavy amount of resources used by various mining pools. Other chains like Qtum, Cosmos Network, NEO, Polkadot, and Ethereum 2.0 utilize various proof-of-stake consensus protocols. By solving the main issues of scalability, security, and interoperability in a much more efficient manner proof-of-stake has an attractive future ahead.