---
template: BlogDetailPage
title: A Brief History of PoW
image: /PoW.webp
imageCaption: Credits to [@Peggy_Marco](https://pixabay.com/users/peggy_marco-1553824/) at Pixbay
description:
aliases: proof-of-work, pow, mining crypto, mining btc, mining bitcoin, bitcoin
keywords: bitcoin, bitcoin network, crypto, proof-of-work
identities: 
    - id: wael-ivie
      role: author
---



## ***Intro***

In peer-to-peer cryptocurrencies, the dominant protocols are Proof of Work and [Proof of Stake](/en/terms/proof-of-stake.md). Bitcoin is a peer-to-peer cryptocurrency network that utilizes Sakatoshi Nakamoto's Proof of Work consensus. [Cardano](/en/identities/cardano.md), a peer-to-peer cryptocurrency, uses the Ouroboros Proof of Stake consensus to secure and reward its network. But where, when, and how did these types of [cryptography](/en/terms/cryptography.md) become so valuable and influential in today's digital life? Is one better than the other?

## ***The Early Days***

The history of Proof of Work dates back to the early 1990s, with its first use case being to combat Email spam messages. In 1992, IBM researchers Cynthia Dwork and Moni Naor released a paper titled ["Pricing via Processing or Combatting Junk Mail"](https://web.cs.dal.ca/~abrodsky/7301/readings/DwNa93.pdf). According to Dwork and Naor, "The main idea is to require a user to compute a moderately hard, but not intractable, function in order to gain access to the resource, thus preventing frivolous use." they called these types of functions ***pricing functions***. 

The simplest of pricing functions is to base the difficulty of sending a message on a computationally difficult (not infeasible) task like extracting square roots. Extracting or verifying a square root is less complicated and requires less computational time for a CPU compared to calculating the square root of a number. 

![Extracting Square Roots](https://github.com/armada-alliance/assets/raw/gh-pages/extracting-sqrt.png)

As you can see above, verifying the square root of a number requires only one multiplication. However, this is not a common pricing function because you need to use large numbers thousands of digits long since modern computers can calculate square roots remarkably fast.


Dwork and Naor proposed various other pricing functions like the Fiat-Shamir signature scheme and the Ong-Schnorr-Shamir (crackled) signature scheme. Using the pricing functions along with hash functions like DES, MD4 & MD5, Subset Sum, and Snefru they essentially developed the first PoW protocol. 

## ***Hashcash*** 

Later in 1997, a member of the infamous [Cypherpunks mailing list](https://lists.cpunks.org/mailman/listinfo/cypherpunks) known as Adam Back brought the HashCash protocol to the world as a "proof-of-work algorithm, which has been used as a denial-of-service counter measure technique in a number of systems". [Hashcash](http://www.hashcash.org/) was developed by Back mainly to help combat denial of service and Email spam, similar to the work done by Dwork and Naor. You can think of Hashcash as being a sort of throttle or control valve to limit widespread abuse of various un-metered internet resources.

Hashcash uses a ["partial hash collision based postage scheme"](http://www.hashcash.org/papers/announce.txt). Essentially it puts a cryptographic hash "stamp" on E-mails sent by a user to add a layer of computational cost. This added CPU cost function is very similar to the technology found in the research from Dwork and Naor. Adam Back was unaware of the work already done before by Dwork and Naor and still managed to make a similar Proof of Work crypto protocol. Just like verifying a square root, partial hash collisions can be verified easily and are moderately difficult cost-functions (not infeasible like full hash collisions).

According to  Back, ["Hashcash is a non-interactive, pubicly auditable, trapdoor-free cost function with unbounded probablistic cost."](http://www.hashcash.org/papers/hashcash.pdf). I know that is a lot to take in, but for simplicity's sake, Hashcash is comparable to the Bitcoin protocol. In fact, Adam Back's Hashcash is one of the few papers cited by Satoshi Nakamoto in the Bitcoin whitepaper, interesting 🧐. 

Overall there are some exciting discoveries found in Hashcash like the minting of digital tokens to verify users of a server and protection from [double-spending](/en/terms/double-spending-problem.md), much like Bitcoin. The full description and design of the Hashcash protocol can be found [here](http://www.hashcash.org/papers/hashcash.pdf). 

## ***Reuseable Proofs of Work - RPoW***
Another Proof of Work protocol closely tied to Bitcoin is Reuseable Proofs of Work invented by Hal Finney. Even though RPoW was just a prototype PoW it is a key development in the formation of cryptocurrencies like Bitcoin. By using a "minting" cost-function to create tokens to be used on a server, however, RPoW then keeps track of ownership of server tokens by signing using a cryptographic key. This allows for the RPoW client to transfer the token to another key via a transfer order. The trusted server would then register the token as belonging to the corresponding private key. 

There were some issues however with the RPoW approach, sort of like Hashcash the double-spending problem still exists although RPoW has claimed to solve it by using a centralized trusted server to verify minting/ownership of tokens. This was still not a perfect solution because it required the use of a centralized server to verify signatures and protection from double-spending, which is not ideal for decentralization.

## ***Bitcoin***

Then in 2008, amidst the global financial crisis known as the [Great Recession](https://www.thebalance.com/the-great-recession-of-2008-explanation-with-dates-4056832), upon a cryptography mailing list appeared a new piece of innovation from a member known as Satoshi Nakamoto. The Email's
title is ["Bitcoin P2P e-cash paper"]((https://satoshi.nakamotoinstitute.org/emails/cryptography/1/)), and the first line of this Email Nakamoto states "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party.". Included in the message was the link to the Bitcoin whitepaper marking the beginning of Bitcoin. 

![BTC Privacy Model](https://github.com/armada-alliance/assets/raw/gh-pages/btc-privacy.png)

***Here are the key elements of Bitcoin according to Satoshi Nakamoto:***

- ***Double-spending is prevented with a peer-to-peer network.***
- ***No mint or other trusted parties.***
- ***Participants can be anonymous.***
- ***New coins are made from Hashcash style proof-of-work.***
- ***The proof-of-work for new coin generation also powers the network to prevent double-spending.***

This was all great sounding in theory but in reality, such a protocol seemed unpractical. This led to a very consistent long thread of communication on the [cryptography mailing list](https://satoshi.nakamotoinstitute.org/emails/) which acted as a type of peer review process similar to that in academia. Many questions arose about the scalability of the protocol, centralization, mining of tokens, network resource needs, security vulnerabilities, and more.

Nonetheless, by January of 2009, the majority of kinks were hammered out and the [first version of the Bitcoin protocol](https://satoshi.nakamotoinstitute.org/emails/) was released. A perfect time to release such a revolutionary technology. Right after the big banks were bailed out by the U.S. Congress, while many Americans suffered to make ends meet. The lack of trust was at an all-time high with major institutions that control the financial world. Bitcoin was seen by many like myself as a sense of hope, community, and financial freedom.

Today Bitcoin is still alive and well, leading the way in cryptocurrency market capitalization. While many other protocols have been developed most notably Proof of Stake, Bitcoin still remains a top player and is debatably the most secure decentralized protocol to this day. 