---
template: GuideDetailPage
title: Run a Cardano Node using a prebuilt image
description: Download a preconfigured image with everything installed to run a
  Cardano Node on a Raspberry Pi out of the box.
keywords: Stake Pool Operation, Raspberry Pi, ARM
icon: 🍓
externalLink: https://docs.armada-alliance.com/learn/intermediate-guide/pi-pool-tutorial
identities:
    - slug: /identities/wcat-otg
      role: author
---
Pi-Pool was originally an image Alessandro Konrad hosted on his github. It had a working Grafana dashboard and came with cardano-node 1.25. I started using it when he released it somewhere around August 2020.

It was great for learning all the moving parts with it more or less working out of the box. As time went on and Alessandro became busy with the cool shit Alessandro does, the image became outdated, it did not have a working systemd implementation and I saw room for improvement.

I tried to hang on to as much as I could from the old image like the username and password as well as having a 'pi-pool' folder that housed db and config files.

I am proud to host a snapshot of the database folder that allows one to burn the image and have a passive synced relay in about an hour. Something that would take 2 days to sync on its own on a Raspberry Pi.
