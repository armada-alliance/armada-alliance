---
template: RuleDetailPage
title: Pool should have at **least** one SPO
description: Make sure to define at **least** one SPO in your pool markdown file.
number: 1
---

```yaml
---
template: PoolDetailPage
ticker: SBLYR
memberSince: 2021-04-18
identities: 
    - id: sublayerio
      role: spo
---
```
[View source](https://github.com/armada-alliance/armada-alliance/blob/main/services/website/content/en/stake-pools/8264de3cdb1798dd8758e24cda5101184b44543e7c4421c7815f9ed8.md)

## How to edit

1. To edit your stake pools markdown file head over to the Armada Alliance's GitHub by following this [link](https://github.com/armada-alliance/armada-alliance)

2. Locate your specific stake-pool's `.md` markdown file based on your pool's [pool ID](/en/terms/pool-id.md) by using the `Go to file` search function,  then simply paste in your `pool ID`.

![Go to file](https://github.com/armada-alliance/assets/blob/gh-pages/rule1.png?raw=true)

3. Then edit your pool's markdown file to look like the example shown above. Make sure you enter your specific `identities.md` filename in the `id:` field so that it matches. You can find your identity filename located [here](https://github.com/armada-alliance/armada-alliance/tree/main/services/website/content/en/identities).
