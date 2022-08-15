---
template: GuideDetailPage
title: Docker Image Cardano Node
description: Run a Cardano Node in a Docker container
keywords: Stake Pool Operation, Docker, Raspberry Pi, Mac M1, ARM
icon: 🐳
externalLink: https://armada-alliance.com/docs/stake-pool-guides/docker-pool-guide
identities:
  - id: julien-terrier
    role: author
---

## Why using docker image to run a Cardano node?

The advantage of running a Cardano node as a Docker image is, that it can be installed seamlessly and started right out of the box (provided that 
you know how to use Docker). If you ever decide to remove the node, you only have to delete one file - the image. Another advantage is that the created image can run on any 
operating system where Docker is installed. If you use our Docker image, you will save a lot of time during installation and avoid the hassle of 
building the Cardano node from scratch, as taught in most tutorials on the web.

**The docker image includes all necessary tools to run and monitor a Cardano node:**
1. cardano-node & cardano-cli - Cardano binaries to run the node (Download compiled binaries from [Armada Alliance GitHub](https://github.com/armada-alliance/cardano-node-binaries)) 
2. gLiveView - Monitoring tool for the Cardano node
3. ScheduledBlocks - Tool to query the scheduled slots for a block production node. (Credits for this tool goes to [SNAKE POOL](https://github.com/asnakep/ScheduledBlocks))
4. Cardano Submit Transaction API - API to connect with a Cardano wallet (e.g. Nami) to send transactions via your own full node

**_If you are enjoying the content of this project, please consider supporting me by delegating to my stake pool, ticker MINI1 or donating ₳D₳ to: 
addr1qygv5fqsfjhfgkx7fhkkegxksx56dsu262vhaxr4mvuukt8uqh7nhjs3pcl98xr2zhmtqk6qkmr4gszxjrs3lnpedqdqyr3jzc_**

Thanks!
