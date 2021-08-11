---
template: BlogDetailPage
title: Data Privacy
description: Emperor Wears no clothes!
keywords: data privacy, amazon, google, facebook, blockchain, ai, artificial intelligence
icon: 🔒
identities: 
    - id: pgwad
      role: author
---

##
![AI and Privacy](https://github.com/armada-alliance/assets/blob/gh-pages/ai_privacy.png?raw=true)
##

In the previous blog, we talked about DeepchainADA. The main idea behind this is how to achieve trained AI models using distributed learning. Just to recap, one of the distributed learning is Federated Learning. In this framework, data is distributed and the model gets trained separately.  Then there is a central server that will aggregate the model before sending it for another iteration.

The general assumption is that if the data is in the device then it's all secure right? The AI model is not sending data to the server so all good? Well, the answer is no. There are 2 papers in this area that show these gradient leaks can be used to infer data. So the next time you use a big tech app and it says no end-to-end encryption then hurray you leaked your data. People then keep wondering what happened and why their information got leaked. If you are a stake pool operator you already know the importance of air-gapped-machine.

Well AI training cannot be in such closed doors. So we need collaboration and privacy. A technique called Differential privacy was used. In differential privacy, you add statistical noise. Want to understand more then look at this [privacy overview document](https://www.apple.com/privacy/docs/Differential_Privacy_Overview.pdf) from [Apple](https://apple.com). In this technique, you get a privacy budget where you choose what information to hide and add noise. It comes with a cost that the model may not be fully accurate. But before you jump to any conclusion looks at this paper

According to B. Hitaj, G. Ateniese, and F. P ́erez-Cruz, in Proceedings of the 2017 ACM SIGSAC Conference on Computer and
Communications Security, “Deep models under the gan: information leakage from collaborative deep learning”.  ACM, 2017, pp. 603–618.

In this paper, Hitaj et.al. show that Generative Adversal Network (GAN). They show that Generative Adversarial
Network (GAN) that generates prototypical samples of the targeted training set that was meant to be private and show that differential privacy applied to the shared parameters of the model is ineffective. Not only this, the intermediate gradients can still be used to cause linkability attacks.  In the linkability attack, the attacker tries to determine if users in the public database are also in the protected database.

Another technique that was proposed is using homomorphic encryption. 
From Wikipedia, "Homomorphic encryption is a form of encryption that permits users to perform computations on its encrypted data without first decrypting it. These resulting computations are left in an encrypted form which, when decrypted, resulting in an identical output to that produced had the operations been performed on the unencrypted data".

Amazon AWS talks about this for their users who use the services for ML training. This is good if you are the only participant. Homomorphic encryption protects you from a federated server. However, in distributed learning, there will be others. If a participant is curious then this technique will fail. It's important to distinguish between honest vs curious. A participant can be honest but also curious. It's like you are writing an exam and you are honest that you will do your job but you are curious to understand what the person in front of you is writing. So homomorphic encryption can fail with curious participants. 
In deepchainAda there is no central server as it's based on decentralized Cardano blockchain. So we need a mechanism that has homomorphic properties and also  non-deterministic encryption
The other challenge in DeepchainAda is if we want to support distributed computing like NuNet (from SingularityNet).   

So as you can see Privacy is deep-rooted. Sometimes Big tech companies can just put some buzzwords on privacy and that may not be always true in all scenarios. So next time someone uses these buzz words try and understand if they are just talking superficially to get past a regulator or are they serious about it. 

One last note Data Privacy is not equal to Data secrecy. These two are independent. In this blog, we talk only about data privacy. For example, the information you share with your healthcare provider is private but not secret. Your crypto wallet keys are secret.

You can watch my video here

<YoutubeVideo url="https://www.youtube.com/watch?v=1N7_sXG622g" />
