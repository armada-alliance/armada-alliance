---
template: GuideDetailPage
title: Run a Alpine Linux OS RPi Cardano Node
description: Set up and run a Cardano Node on a very lightweight Linux distribution.
keywords: Stake Pool Operation, Raspberry Pi, ARM
icon: 🗻
externalLink: https://docs.armada-alliance.com/learn/intermediate-guide/alpine-linux-os
identities:
  - id: sayshar-srn
    role: author
---

<ImagesSection
images={[
{ url: '/adasrn_system_info.png' },
{ url: '/UPS_for_Pi_only.jpg' }
]}
/>

## Why use AlpineOS on the Raspberry Pi?

- **Very low memory consumption** (~50MB utilized during idle vs ~350MB for Ubuntu 20.04).
- **Lower CPU overhead** (27 tasks/ 31 threads active for Alpine vs 57 tasks / 111 threads for Ubuntu when cardano-node is running).
- **Cooler Pi** 😎 (Literally, CPU runs cooler❄️ because of the lower CPU overhead).
- And finally, **why not?** If you're gonna use static binaries, might as well take advantage of a fully static operating system like AlpineOS 😜
