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

#### Here is an example of an identity markdown file.

`wael-ivie.md`

```md
---
template: IdentityDetailPage
title: Wael Ivie🐋
description: Founder, SPO
image: /wael.png
telegram: Qwailman
twitter: Piada_stakePool
github: AstroWa3l
donationAddress: addr1qyqydvg5wzd6twvernsjcdjd9akmygyqp7gky7zpm0hrmq3ccwlnumzzuum6k6ja2k47g5dv2p4kwt753mpjjzx8fsmsruqjr7 
verified: true
---

Hi I am Wael Ivie, the founder of the Armada Alliance and the ARMing Cardano proposal from fund4 of project Catalyst. My whole life I have been wondering how can I help the world be a better place? I have decided to do this by focusing my efforts on decentralization and blockchain education.

<YoutubeVideo url="https://www.youtube.com/watch?v=Py3Xy3ScVas" description="ARMing Cardano" />

https://adapulse.io/arming-cardano-an-ecosystem-for-raspberry-pi-stakepool-operators/
```

>**If you would like to include an image in your markdown file, you can use the following syntax: `/myimage.png` as we have above after you upload the image to our asset repo via a pull request. For more information on how to add your image to the asset repo please read our guide [here](https://github.com/armada-alliance/assets).** 
>
>**Alternatively, if you would like to just link an image you may do that as well by inserting the raw link to the image into the image field using the direct link as follows:** `https://url-to-image.com/image.png`


#### Here is an example of a pool's registration md file.

`b8d8742c7b7b512468448429c776b3b0f824cef460db61aa1d24bc65.md`

```md
---
template: PoolDetailPage
ticker: PIADA
memberSince: 2021-04-18
identities:
  - id: tony-piada
    role: spo
  - id: wael-ivie
    role: spo
telegram: piadapool
github: AstroWa3l
nodes:
  - role: producer
    deviceId: raspberry-pi-4-8gb
    storage: Crucial BX500 Internal SSD 120GB
    isBackup: false
  - role: relay
    deviceId: raspberry-pi-4-8gb
    storage: Crucial BX500 Internal SSD 120GB
    isBackup: false
  - role: relay
    deviceId: raspberry-pi-4-8gb
    storage: Crucial BX500 Internal SSD 120GB
    isBackup: false
  - role: relay
    deviceId: raspberry-pi-4-8gb
    storage: Crucial BX500 Internal SSD 120GB
    isBackup: true
---

Write about your Pool details...
```


Please join our alliance's telegram channel https://t.me/armada_alli because this will be the main place we discuss and vote on the future of our alliance. Thank You for Joining the Armada Alliance :smile: