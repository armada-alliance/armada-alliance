<p align="center"><img width="200px" src="https://armada-alliance.com/assets/ship.webp"></img></p>

# Armada Alliance Website

https://armada-alliance.com

## Our Mission

- The Armada alliance was formed in efforts to build a community of decentralized, low-cost, and energy-efficient stake pool operations on Cardano. All Stake Pools that are apart of this alliance run on either Raspberry Pis exclusively or low power consuming ARM-based machines.

## How to add your pool (and stake pool operators) to the website

1. Fork this repo with your GitHub account

2. Add a file named `<IDENTITY_ID>.md` for every stake pool operator of your stake pool inside https://github.com/armada-alliance/armada-alliance/tree/main/services/website/content/en/identities

3. Add a file named <POOL_ID>.md for your pool inside https://github.com/armada-alliance/armada-alliance/tree/main/services/website/content/en/stake-pools

4. Head back to the armada-alliance github and submit a pull request to add your pool to the website

#### Here is an example of an identity md file.

`wael-ivie.md`

```md
---
template: IdentityDetailPage
title: Wael Ivie 🐋
description: SPO
image: /wael.jpg
website: https://piada.io
donationAddress: addr1q8ae4ja0yrqy49g9pj48t4hhnc6zpamy4kecm7ay3d8m930k7hlxjrthyxvhjkjkxc5xjffs5w2tjqyh9ruv0kwqwv4qrq0gdt
verified: true
---

Hi I am Wael Ivie, the founder of the Armada Alliance and the ARMing Cardano proposal from fund4 of project Catalyst. My whole life I have been wondering how can I help the world be a better place? I have decided to do this by focusing my efforts on decentralization and blockchain education.

<YoutubeVideo url="https://www.youtube.com/watch?v=Py3Xy3ScVas" description="ARMing Cardano" />

https://adapulse.io/arming-cardano-an-ecosystem-for-raspberry-pi-stakepool-operators/
```

#### Here is an example of a pool's registration md file.

`b8d8742c7b7b512468448429c776b3b0f824cef460db61aa1d24bc65.md`

```md
---
template: PoolDetailPage
ticker: PIADA
memberSince: 2021-04-18 # the date on which you joined the alliance
identities:
  - id: tony-piada
    role: spo
  - id: wael-ivie
    role: spo
---
```


Please join our alliance's telegram channel https://t.me/armada_alli because this will be the main place we discuss and vote on the future of our alliance. Thank You for Joining the Armada Alliance :smile:
