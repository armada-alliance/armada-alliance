---
template: TermDetailPage
title: Hardware wallet
description: A hardware wallet is a special type of wallet that stores the user's private keys in a secure hardware device.
aliases: Hardware wallet
keywords: hardware, wallet
identities: 
    - slug: /identities/wael-ivie
      role: author
    - slug: /identities/sublayerio
      role: author
---


The [private keys](/en/terms/private-keys.md) never leave the device, ensuring that there is no risk of losing funds even if the device is exposed to a potentially infected computer. Hardware wallets offer the security of a cold wallet or paper wallet but with the benefit of accessibility similar to hot wallets.

## Choose a brand

1. [Trezor](/en/terms/trezor.md)
2. [Ledger Nano S or Ledger Nano X](/en/terms/ledger-hardware-wallet.md)

## How does it work?

The big difference with signing transactions with a hardware wallet device as opposed to a wallet [private key](/en/terms/private-key.md) directly stored in the wallet application on your phone or laptop is the location where the transaction get's signed.

With the wallet directly stored on your computer or phone that's directly connected to the internet it's exposed to potential hacker to be stolen.

Using the hardware wallet device however, you have a device that's not connected to the internet by itself (since it's only connected in a way that the transaction can be received and send back to your computer or phone). This way the transaction can be safely signed.

The steps below can differ a little based on which wallet application or hardware wallet device you use.

1. Open up a wallet application that supports your specific hardware wallet device.
2. The hardware wallet can either be connected through USB or Bluetooth.
3. The wallet application will ask your hardware wallet device to export the [public key](/en/terms/public-key.md) so it knows which wallet address to import to your wallet application.
4. You're wallet is now listed in the wallet application (usually, depending on the application you use, you don't have to repeat this process and your wallet application will remember the wallet).
5. Create a new transaction, specifying the amount and the receiver address.
6. Confirm the transaction in the wallet application.
7. Once you confirm, the wallet application will send the unsigned transaction to the hardware wallet device to be signed.
8. The hardware wallet device will show you the transaction details on it's display for you to check.
9. Sign the transaction by confirming it on the hardware wallet device.
10. The signed transaction will now be send back to your wallet application and submitted to the blockchain.
11. Your transaction has now been successfully send.