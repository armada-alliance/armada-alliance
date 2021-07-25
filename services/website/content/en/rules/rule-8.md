---
template: RuleDetailPage
title: Pool is recommended to completely run on ARM devices
description: We validate this by looking at your list of nodes. We'll look for at least one block producer and one relay that run on an ARM device.
number: 8
---

```yaml
---
template: PoolDetailPage
ticker: SBLYR
memberSince: 2021-04-18
identities: 
  - id: sublayerio
    role: spo
nodes:
  - role: producer
    deviceId: mac-mini-m1-16gb
  - role: relay 
    deviceId: raspberry-pi-4-8gb
    storage: Crucial BX500 Internal SSD 120GB
  - role: relay 
    deviceId: raspberry-pi-4-8gb
    storage: Crucial BX500 Internal SSD 120GB
---
```
[View source](https://github.com/armada-alliance/armada-alliance/blob/main/services/website/content/en/stake-pools/8264de3cdb1798dd8758e24cda5101184b44543e7c4421c7815f9ed8.md)


## How to edit

1. Head over to the Armada Alliance's [GitHub](https://github.com/armada-alliance/armada-alliance).

2. Locate your specific `stake-pool` markdown file based on your pool's [pool ID](/en/terms/pool-id.md) by using the `Go to file` search function,  then simply paste in your `pool ID`.

![Go to file](https://github.com/armada-alliance/assets/blob/gh-pages/rule1.png?raw=true)

3. Then edit your pool's markdown file to look like the example shown above by adding your `nodes` details, then submit a pull request on GitHub to merge your edit.