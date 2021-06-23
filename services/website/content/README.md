# Armada Pages

## Metadata

The following properties are supported in each template: template, title, description, keywords

```
---
template: BlogDetailPage
title: A blog post
keywords: a, blog, post
identities: 
    - slug: /identities/wael-ivie
      role: author
---
```

Per template different metadata properties are supported:

Term: aliases (names the term also is known as)

## Templates

We will support different templates for pages, based on the template defined the page will be rendered using a different template.

```
---
template: BlogDetailPage
title: A blog post
keywords: a, blog, post
identities: 
    - slug: /identities/wael-ivie
      role: author
---
```

```
---
template: TermDetailPage
title: Term XYZ
description: A definition of a term
aliases: Term XYZ alias 1, Term XYZ alias 2, Term XYZ alias 3
keywords: X, Y, Z
identities: 
    - slug: /identities/wael-ivie
      role: author
---
```

```
---
template: IdentityDetailPage
title: CAP'N Salty Whale 
description: Founder, SPO
image: /wael.jpg
website: https://armada-alliance.com
donationAddress: addr1q8ae4ja0yrqy49g9pj48t4hhnc6zpamy4kecm7ay3d8m930k7hlxjrthyxvhjkjkxc5xjffs5w2tjqyh9ruv0kwqwv4qrq0gdt
---
```

## Translations

The original page will always be the english page. Whenever you add a translation you can add a directory with the name of that language `en`, `de`, `es` etc. In order to refer back to the original (english page) you can add metadata refering back to the english page.


/es/a-blog-post-title-in-spanish.md
```
---
template: BlogDetailPage
title: A blog post title in Spanish
source: /en/a-blog-post-title-in-english.md
----
```
