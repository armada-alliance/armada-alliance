---
template: TermDetailPage
title: Fake Stake Attack
description: This is the umbrella term that references the various vulnerabilities of Proof-of-Stake cryptocurrencies like Cardano. 
aliases: fake stake attacks, fake stake attack, fake stake attack cardano, cardano hack, PoS hacks, proof-of-stake hacks, proof-of-stake attacks, proof-of-stake vulnerabilities, utxo model hacks
keywords: vulnerabilities, fake, stake, attack, attacks, cardano, hack, hacks, PoSv3, 3rd-generation, blockchain, PoS, ada, 51%
identities: 
    - slug: /identities/wael-ivie
      role: author
---

We call the vulnerabilities we found “Fake Stake” attacks. Fake Stake attacks work because 3rd generation Proof-of-Stake blockchain implementations do not adequately validate network data before committing expensive resources, mainly disk-space and RAM. The consequence is that an attacker without much stake (in some cases none at all) can cause a victim node to crash by filling up its disk or RAM with bogus data. Unlike Cardano, many cryptocurrency blockchains that use the UTXO and longest-chain Proof-of-Stake model are susceptible to these Fake Stake vulnerabilities. For more information please see this blog from IOHK below.