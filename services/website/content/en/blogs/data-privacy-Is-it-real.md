---
template: BlogDetailPage
title: Data Privacy
description: Emperor Wears no clothes!
keywords: data privacy, amazon, google, facebook, blockchain, ai, artificial intelligence, data science, cardano, blockchain
icon: 🔐
identities: 
    - id: pgwad
      role: author
---

##
![AI and Privacy](https://github.com/armada-alliance/assets/blob/gh-pages/ai_privacy.png?raw=true)

##

## ***Privacy, AI and Data***
In the [previous blog](/en/blogs/blockchain-ai-with-nunet-singularitynet-and-cardano.md), we talked about DeepchainADA. The main idea behind DeepchainADA is to achieve trained AI models using distributed learning. If you recall, one of the distributed learning frameworks is Federated Learning. In this framework, data is distributed and the model gets trained separately.  Then there is a central server that will aggregate the model before sending it for another iteration.

The general assumption is if the data is in the device, then it must be all secure. Right? The AI model is not sending data to the server, so all good? Well, the answer is no. There are two papers in this area that show gradient leaks can be used to infer data. So the next time you use a big tech app where it says "no end-to-end encryption" then hurray you leaked your data. Users then keep wondering what happened, why, and how did their private information get exposed. If you are a stake pool operator you already know the importance of air-gapped-machine.

## ***AI Privacy Techniques***
Well, AI training cannot be behind such closed doors. We need both collaboration and privacy to train AI algorithms. One technique called Differential privacy attempts to accomplish this. In this technique, you get a privacy budget where you choose what information to hide and what information to add statistical noise. However, this method does come with a cost that the model may not be accurate. To understand differential privacy more take a look at this [privacy overview document](https://www.apple.com/privacy/docs/Differential_Privacy_Overview.pdf) from [Apple](https://apple.com). 

But before you jump to any conclusions take a look at this research article, ***[Deep models under the gan: information leakage from collaborative deep learning](https://doi.org/10.1145/3133956.3134012)***, by B. Hitaj, G. Ateniese, and F. P ́erez-Cruz. In this paper, Hitaj et.al. show that the Generative Adversarial Network (GAN) generates prototypical samples of the targeted training set that are meant to be private and reveals the differential privacy applied to the shared parameters of the model is ineffective. Not only this, the intermediate gradients can still be used to cause linkability attacks.  In linkability attacks, the attacker attempts to determine if users in a public database are also in the protected database.

Another technique proposed is using homomorphic encryption. From [Wikipedia](https://en.wikipedia.org/wiki/Homomorphic_encryption), "Homomorphic encryption is a form of encryption that permits users to perform computations on its encrypted data without first decrypting it. These resulting computations are left in an encrypted form which, when decrypted, resulting in an identical output to that produced had the operations been performed on the unencrypted data".

Amazon AWS talks about homomorphic encryption for the users of their various ML training services, which is good if you are the only participant. Homomorphic encryption protects you from a federated server. However, in distributed learning, there will be others on the network. If a participant is curious enough then this technique will fail. It's important to distinguish between honest vs curious. A participant can be honest but also curious. It's like you are taking an exam where you are honest that you will do your work, but you are curious to understand what the person in front of you is writing. So homomorphic encryption can fail with curious participants.

## ***DeepchainAda & Privacy***
In deepchainAda, there is no central server since it's based on a decentralized distributed network, the Cardano blockchain. So we need a mechanism that has both homomorphic properties and also non-deterministic encryption. The other challenge in DeepchainAda is if we want to support distributed computing like NuNet (from SingularityNet). So as you can see, privacy is deep-rooted in the ethos of DeepchainAda. Sometimes big tech companies like Amazon just put some buzzwords about privacy that may not always be true in all scenarios. So next time someone uses these buzzwords try and understand if they are talking superficially to get past a regulator or are they serious about it.

One last note, Data Privacy is not equal to Data secrecy. These two are independent. In this blog, we talk only about data privacy. For example, the information you share with your healthcare provider is private but not secret. On the other hand, your crypto wallet keys are secret.

You can watch my video here

<YoutubeVideo url="https://www.youtube.com/watch?v=1N7_sXG622g" />
