---
template: RuleDetailPage
title: Pool should have an image
description: Make sure to have a logo of your pool specified in a extended metadata json file.
number: 4
---

## Add extended metadata to your metadata file

Make sure to have the extended property defined in you metadata.json file.

```json
{
    "name": "Sublayer Pool",
    "description": "Providing marketing pages and educational content for stake pool operators.",
    "ticker": "SBLYR",
    "homepage": "https://pool.sublayer.io",
    "extended": "https://cdn.sublayer.io/poolExtended.json"
}
```

Example: https://cdn.sublayer.io/poolMetaData.json

**Note:** The extended property is not mandatory, but recommended for all metadata other than required by the Cardano network. If you don't have the extended metadata url specified and you're going to update the metadata.json file, make sure to regenerate the metadata hash and update your pool.cert file.

## Upload the extended metadata file

Make sure to specify `info.url_png_logo` and `info.url_png_icon64x64`. The Armada Alliance website will scrape this information and use it to display your logo.

```json
{
  "info": {
    "url_png_icon_64x64": "https://cdn.sublayer.io/logo_64x64.png",
    "url_png_logo": "https://cdn.sublayer.io/logo.png",
    "location": "Sommelsdijk, The Netherlands",
    "social": {
      "telegram_handle": "sublayerio",
      "twitter_handle": "sublayerio",
      "youtube_handle": "channel/UCligunhcmbMYaBUMvONsKwg"
    },
    "company": {
      "name": "Sublayer"
    },
    "about": {
      "me": "As an independent stake pool operator it is my goal to educate people about Cardano and true decentralisation by providing educational content through the Armada Alliance platform (armada-alliance.com).",
      "server": "Running on low power consuming ARM-based devices (Raspberry Pis & Apple SOC) with an average pool energy consumption of less than 40 Watts💡, always online, 100MB up/down, solar energy. Margin stays 1%."
    }
  },
  "adapools": "ed6d9672a5ea74667cb0ca867d7479fb",
  "my-pool-ids": ["8264de3cdb1798dd8758e24cda5101184b44543e7c4421c7815f9ed8"],
  "when-satured-then-recommend": [
    "b8d8742c7b7b512468448429c776b3b0f824cef460db61aa1d24bc65"
  ]
}
```

Example: https://cdn.sublayer.io/poolExtended.json