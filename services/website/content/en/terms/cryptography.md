---
template: TermDetailPage
title: Cryptography 
description: Cryptography is a set of rules for encoding information into a message that can only be decoded by someone with the same knowledge of the secret key.
aliases: cryptography, crypto, cryptology, blockchain, blockchains, proof of work, proof of work algorithm, proof of stake, bitcoin, Satoshi Nakamoto, ethereum, cardano, cipher
keywords: cryptography, crypto, cryptology, blockchain, blockchains, proof of work, proof of work algorithm, proof of stake, bitcoin, satoshi Nakamoto, ethereum, cardano, what is crypto
identities: 
    - id: wael-ivie
      role: author
---

![Cipher](https://pixabay.com/get/g65e5a1025ca401374ee41b8320cdfcccdef6e60714962d18e1ba0aeb5fd83b8e05693b92b790c2e9c8abc9eb8d41f4a0_1920.jpg)

## What is Cryptography?

[Cryptography](https://csrc.nist.gov/glossary/term/cryptography) is a subset of the scientific field of [cryptology](/en/terms/cryptology.md) that deals with the encoding and decoding of information. The main goal of cryptography is to prevent unauthorized access to information. The history of cryptography goes back to around 1900 BCE in Egypt, where it was essentially a way of writing hieroglyphs in an encrypted manner.

Today's cryptography uses advanced mathematics and computer science techniques to encode and decode messages or information in a secure method. The cryptographic techniques used are known as cryptographic algorithms, hence where the name crypto comes from. Crypto algorithms are designed around the theory of [Computational complexity theory](https://en.wikipedia.org/wiki/Computational_complexity_theory) and a [computational hardness assumption](https://en.wikipedia.org/wiki/Computational_hardness_assumption) which makes breaking or decoding the crypto algorithm infeasible to an adversary, both in computational time and resources.

***Three main branches of cryptography:***

1. **Symmetric (Secret-Key) Algorithms:** The form of cryptography most commonly thought of: where two parties have an encryption and decryption method to share a private key. This symmetric method was the type of cryptography used from antiquity up until the mid-1970s. Symmetric ciphers are still in use with many applications like bulk data encryption, integrity checking of messages, the .NET framework, and more.

2. **Asymmetric (Public-Key) Algorithms:** A new type of cipher introduced in 1976 by researchers Whitfield Diffie, Martin Hellman, and Ralph Merkle. The difference in this cipher compared to its symmetric counterpart is that a user posses a secret key and a public key to use in encoding and decoding information. Some applications for asymmetric algorithms are digital signatures, key-establishment, and data encryption.

3. **Cryptographic Protocols:** Cryptographic protocols are the mechanisms or systems that apply cryptographic algorithms. You can think of a house where the symmetric and asymmetric algorithms are the building blocks or foundations that allow applications and protocols to build on top of them. Some crypto protocols are [Proof of Work](/en/terms/proof-of-work.md) and [Proof of Stake](/en/terms/proof-of-stake.md) blockchains, secure socket layer (SSL), and transport layer security (TSL).


***Features of cryptography:***

- **Confidentiality:** No one can read or access the information in a message except the intended receiver.

- **Integrity:** Ensures the receiver cannot alter or destroy the original message.

- **Non-repudiation:** Proves that the sender sent the message and thus cannot deny they sent it in the future.

- **Authentication:** Verifies the correct sender/receiver identities and the destination/origin of the message.