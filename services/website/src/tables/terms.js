const terms = [
    {
        name: 'Ada (₳)',
        aliases: ['Ada'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'The digital currency (or cryptocurrency) of the Cardano blockchain. 1 Ada = 1 million Lovelaces. Ada and Lovelace are named after the mathematician [Ada Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace).',
    },
    {
        name: 'Block',
        aliases: ['Block'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'A slot that contains a set of recent transactions on a blockchain network. Each block contains data required to manage the blockchain, including an encrypted version of the previous block.',
    },
    {
        name: 'Blockchain',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'A growing list of records, called blocks, that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data. Blockchain is a fundamental system underpinning cryptocurrencies, acting as the public transaction ledger.',
    },
    {
        name: 'Chain',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'A set of blocks that have been produced and are connected to one another in consecutive order.',
    },
    {
        name: 'Daedalus',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'A secure wallet for Ada that manages balances and provides the ability to send and receive payments. Daedalus is a full node wallet which means that it downloads a full copy of the Cardano blockchain and independently validates every transaction in its history. It has a friendly user interface and is recommended for new users to start with. [More information](https://daedaluswallet.io/).',
    },
    {
        name: 'DApp',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'Decentralized application.',
    },
    {
        name: 'Delegation',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'The process by which Ada owners can participate in the network and earn rewards by delegating the stake associated with their Ada holdings to a stake pool.',
    },
    {
        name: 'DeFi',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'Decentralized finance. Refers to financial instruments and mechanisms built on the blockchain using smart contracts. Examples include swaps, bonding curves, and escrow.',
    },
    {
        name: "Double spending problem",
        aliases: [],
        keywords: ['double spending problem'],
        description: 'When a digital currency is spent more than once. Historically this was a problem with early versions of cryptocurrencies.  Bitcoin was the first cryptocurrency to solve this problem.'
    },
    {
        name: 'Epoch',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'a defined group of slots that constitute a period of time. In Cardano, one epoch is 5 days long.',
    },
    {
        name: 'EUTXO',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'extended unspent transaction output model of Cardano.',
    },
    {
        name: 'Faucet',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'a web-based service that provides free tokens to users of a testnet.',
    },
    {
        name: 'Fee',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'amount of ada or other cryptocurrency charged for transaction processing.',
    },
    {
        name: 'Fork',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: 'A significant update to the software governing a blockhain platform, which may change rules, make existing rules invalid, or create new rules, is called a fork.',
    },
    {
        name: 'Fungible token/asset',
        aliases: ['Hard Fork'],
        keywords: ['Hard Fork', 'Hard Fork Combinator', 'HFC'],
        description: ' an asset that is interchangeable and indistinguishable with some other asset(s). Same denomination bills and coins are fungible assets, for example, like equal quantities of ada to lovelaces.',
    },
    {
        name: 'Goguen',
        aliases: ['Gougen'],
        keywords: ['Gougen'],
        description: 'third phase of Cardano development in which smart contracts will be delivered.',
    },
    {
        name: 'Incentive',
        aliases: ['incentive'],
        keywords: ['money'],
        dsecription: 'a way to encourage participants of the system to engage in the network by rewarding them with a return that is proportional to their efforts. Incentives aim to ensure equality and fairness in a distributed network of participants by encouraging consistent, active, and strong participation. Cardano\'s incentives model uses game theory to calculate the incentives required.'
    },
    {
        name: 'Interoperability',
        aliases: ['compatibility'],
        keywords: ['interaction'],
        description: 'one of the significant features within Cardano development that aims to enable interconnection between numerous blockchains and legitimate recognition of activities by central authorities. Enabled cross-chain transfers and the establishment of the internet of blockchains will grant enhanced user experience and functionality.',
    },
    {
        "name": "IOG",
        "aliases": ["IOHK", "Input Output Global", "Input Output Hong Kong"],
        "keywords": ["cardano, iog, iohk, input outout global, iog share price, iog jobs"],
        "description": "Input Output Global, also reffered to as Input Output Hong Kong (IOHK), is a technology company committed to using peer-to-peer innovations to provide financial services to the community. In particular, IOG is working on the technology development for Cardano."
    },
    {
        "name": "Key pair",
        "aliases": ["key value pair"],
        "keywords": ["key pair", "key value pair"],
        "description": "a set of two keys: public verification key and private signing key. These keys are used to process and approve transactions within the blockchain."
    },
    {
        "name": "Ledger",
        "aliases": ["books", "daybook", "database", "distributed database", "secure ledger", "cardano ledger", "register", "record book", "the ledger"],
        "keywords": ["ledger", "cardano ledger", "the ledger", "nano ledger", "nano ledger x"],
        "description": "a distributed database that is operated in a decentralized manner by multiple nodes across numerous locations."
    },
    {
        "name": "Live stake",
        "aliases": ["live stake"],
        "keywords": ["live stake", "what is live stake", "live stake meaning"],
        "description": "the total amount of stake that a stake pool controls. It combines the stake that is owned by the pool operator with any stake that has been delegated to the pool by other ada holders. It can be measured as a total ada amount (e.g. 3M ada), or as a percentage of the total supply of ada within the network (e.g. 5%)."
    },
    {
        "name": "Lovelace",
        "aliases": ["lovelace", "satoshi", "cardano lovelace", "ada"],
        "keywords": ["satoshi, cardano lovelace, lovelace, ada lovelace"],
        "description": "The smallest unit of Ada. 1 Lovelace = 1/1,000,000 Ada. A lovelace is to Ada what a Satoshi is to Bitcoin."
    },
    {
        "name": "Mainnet",
        "aliases": ["mainnet", "main-net", "cardano blockchain"],
        "keywords": ["mainnet crypto", "pi mainnet", "cardano blockchain", "mainnet", "main-net", "testnet", "mainnet meaning"],
        "description": "a live blockchain that has been deployed and is in operation. See also: testnet, devnet."
    },
    {
        "name": "Marlowe",
        "aliases": ["Marlowe", "Cardano Marlowe", "Cardano Domain Specific Language", ""],
        "keywords": ["Marlowe", "Domain Specific Language", "Cardano Marlowe smart contracts", "Marlowe playground", "plutus playground"],
        "description": "the domain-specific language (DSL) for writing and executing financial contracts on blockchain."
    },
    {
        "name": "Minting",
        "aliases": ["Forging", "Creating", "making"],
        "keywords": ["nft", "native tokens"],
        "description": "Also referred to as “Token minting”. The process by which new blocks are created."
    },
    {
        "name": "Oracle",
        "aliases": ["oracle"],
        "keywords": ["oracle", "information"],
        "description": "A mechanism by which critical external information that isn’t known or available to a blockchain network is transferred to the network. This can be any kind of information (currency or commodity exchange rates, events happening in the real world, etc.). Cardano has steadily been working on partnerships to connect to a variety of data sources to serve as Oracles for the Cardano network. [Intro to Oracles](https://www.youtube.com/watch?v=BLR8eX73SA4)."
    },
    {
        "name": "Oracle Pool",
        "aliases": [],
        "keywords": [],
        "description": "A method by which Oracles are decentralized, such that the external data they provide can be done so with greater assurance and trust. [More information](https://www.youtube.com/watch?v=QcNZYhAa2xU)."
    },
    {
        "name": "Proof of stake (PoS)",
        "aliases": [],
        "keywords": [],
        "description": "A type of consensus mechanism used to reach agreement on records in the blockchain. It ensures distributed consensus based on the stake, or wealth, that is held by participants in the system. This stake is used as the main resource to determine the participant’s power in the system for maintaining the ledger."
    },
    {
        "name": "Proof of work (PoW)",
        "aliases": [],
        "keywords": [],
        "description": "The original consensus algorithm in early blockchain networks, such as Bitcoin. This algorithm is used to confirm transactions and produce new blocks to the chain. With PoW, “miners” (those performing the computational work) compete against each other to complete transactions on the network and get rewarded."
    },
    {
        "name": "Shelly",
        "aliases": [],
        "keywords": [],
        "description": "Second phase of Cardano development in which network decentralization will be delivered."
    },
    {
        "name": "Stablecoin",
        "aliases": [],
        "keywords": [],
        "description": "A cryptocurrency that attempts to offer stability and generally (preferably) backed by a reserve asset. USD Tether and USD Coin are examples of stablecoins backed by US dollars."
    },
    {
        "name": "Stake pool",
        "aliases": [],
        "keywords": [],
        "description": " A reliable block-producing server node that holds the combined stake of various stakeholders in a single entity, or pool, on the Cardano network."
    },
    {
        "name": "Stake pool operator (SPO)",
        "aliases": [],
        "keywords": [],
        "description": "The person(s) or organization(s) operating a stake pool."
    },
    {
        "name": "Token",
        "aliases": [],
        "keywords": [],
        "description": "A cryptographic token that represents a footprint of value defined by the community, market state, or self-governed entity. A token can be fungible or non-fungible, and act as a payment unit, reward, trading asset, or information holder."
    },
    {
        "name": "UTXO",
        "aliases": [],
        "keywords": [],
        "description": "UTXO stands for “Unspent Transaction Output”. In cryptocurrencies, a UTXO is an abstraction of electronic money. Each UTXO is analogous to a coin, and holds a certain amount of value in its respective currency. Another way to look at it, using a fiat money analogy, is that UTXOs represent various amounts of “change” available to any particular user. The unspent values in each block are UTXOs, and when they are “spent” (used in a transaction) they create new “change” (new UTXOs). [Detailed information](https://medium.com/bitbees/what-the-heck-is-utxo-ca68f2651819). [Simple video](https://www.youtube.com/watch?v=hKft6E4K8KY)."
    },
    {
        "name": "Yoroi",
        "aliases": ["yoroi wallet", "cardano wallet"],
        "keywords": ["cardano wallet"],
        "description": "A light wallet for Cardano that is used to manage Ada balances and conduct transactions. A simple, fast, and secure wallet for daily use purposes that is developed by Emurgo. [More information](https://yoroi-wallet.com/#/)."
    }
]

export default terms