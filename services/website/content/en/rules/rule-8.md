---
template: RuleDetailPage
title: Pool is recommended to completely run on ARM
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