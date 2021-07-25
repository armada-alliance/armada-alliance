---
template: RuleDetailPage
title: Pool should have their nodes defined
description: Make sure to define your nodes in the pool markdown file.
number: 6
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

## Fields

### role

The available options for `role` are: 
- `relay`
- `producer`

### deviceId
`deviceId` is not required. The available options for `deviceId` are: 
- `raspberry-pi-4-8gb`
- `mac-mini-16gb`

### name
You're also allowed to just specify a `name` for your node:

```yaml
---
nodes:
  - role: producer
    name: VPS in the cloud
  - role: relay 
    deviceId: raspberry-pi-4-8gb
    storage: Crucial BX500 Internal SSD 120GB
```

### storage

Storage is a text describing the storage of the node. It will get displayed on the website.

### processor

Processor is a text describing the processor of the node. It will get displayed on the website.

### memory

Memory is a text describing the memory of the node. It will get displayed on the website.