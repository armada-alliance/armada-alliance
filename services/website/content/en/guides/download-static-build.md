---
template: GuideDetailPage
title: Download Static Build
keywords: static build
icon: 📡 
identities: 
    - id: zw3rk
      role: author
downloads:
    - name: cardano-node 1.27.0
      arch: arm64
      externalLink: https://ci.zw3rk.com/build/1758
      downloadLink: https://ci.zw3rk.com/build/1758/download/1/aarch64-unknown-linux-musl-cardano-node-1.27.0.zip
      date: 2021-05-11 05:07:36
    - name: cardano-node 1.27.0
      arch: x86
      externalLink: https://ci.zw3rk.com/build/1759
      downloadLink: https://ci.zw3rk.com/build/1759/download/1/x86_64-unknown-linux-musl-cardano-node-1.27.0.zip
      date: 2021-05-11 05:04:17
---

![Glitch](https://github.com/armada-alliance/assets/blob/gh-pages/static-glitch.jpeg?raw=true)

A static build is a [compiled](https://en.wikipedia.org/wiki/Compiler) version of a program that has been statically linked against libraries.

To use cardano-node and cardano-cli you can download one of the binaries below provided by Mortiz the stake pool operator of [[ZW3rk] Pool](/en/identities/zw3rk.md). 

Simply download one of the zip files below to your Pi's home directory and then move it to the right location so you can call on it later to start the node.

The binaries are found here 

***If you are using Linux you can use the following command to download the binaries***
```
wget https://ci.zw3rk.com/build/1758/download/1/aarch64-unknown-linux-musl-cardano-node-1.27.0.zip
```

Use unzip command on the downloaded zip file and extract its contents.

```
unzip aarch64-unknown-linux-musl-cardano-node-1.27.0.zip
```

Next, we need to make sure the newly downloaded "cardano-node" folder and its contents are present.

> If you are unsure if the file downloaded properly or need the name of the folder/files, we can use the Linux ls command.

Now we need to move the cardano-node folder into our local binary directory.

```
mv cardano-node/* ~/.local/bin
```

Before we proceed let's make sure the cardano-node and cardano-cli is in our $PATH

```
cardano-node version
cardano-cli version
```