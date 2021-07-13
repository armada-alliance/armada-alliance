---
template: GuideDetailPage
title: Setup a Nami delegate button on your website
description: A guide on how to setup a button that allows your visitors to delegate to your pool straight from your website.
keywords: Delegate, Nami Wallet, JavaScript, Marketing
icon: ❤️
identities: 
    - id: alessandro-berry
      role: author
    - id: sublayerio
      role: author
---

## Demo

<YoutubeVideo url="https://www.youtube.com/watch?v=hm8c-RhBop4" />

## Installation

1. **Get a blockfrost project id** —  Go to [blockfrost.io](https://blockfrost.io/), make an account and create a project.

2. **Get your pool id** — Go to [pooltool.io](https://pooltool.io)


Setup a button somewhere on your website that looks like this:

```html
<button type="button" onclick="handleDelegate()">
    Delegate
</button>
```

Put the following code snippet at the end of the body content:

```html
<script>
    function handleDelegate() {
        var pool_id = '<POOL_ID>'
        var blockfrost_project_id = '<BLOCKFROST_PROJECT_ID>'
        var link = 'https://armada-alliance.com/delegation-widget?pool_id=' + pool_id + '&blockfrost_project_id=' + blockfrost_project_id
        var width = 600
        var height = Math.min(800, parseInt(window.outerHeight, 10))
        var left = (parseInt(window.outerWidth, 10) / 2) - (width / 2)
        var top = (parseInt(window.outerHeight, 10) - height) / 2
        window.open(link, 'Delegate', 'width=' + width + ',height=' + height + ',toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1,left=' + left + ',top=' + top);
    }
</script>
```