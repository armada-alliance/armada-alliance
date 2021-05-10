const fs = require("fs")
const basePath = __dirname + "/.."
const template = require(basePath + "/adapools-without-members.json")
const pools = require("./pools")

const schema = {
    createdAt: new Date().toISOString(),
    about: {
        youtube: 'https://www.youtube.com/channel/UCligunhcmbMYaBUMvONsKwg',
        github: 'https://github.com/armada-alliance/armada-alliance',
        telegram: "https://t.me/armada_alli",
        discord: "https://discord.gg/6Q4mk7RTWn",
        gitbook: "https://armada-alliance.gitbook.io/",
        catalyst: "https://adapulse.io/arming-cardano-an-ecosystem-for-raspberry-pi-stakepool-operators/",
        adafolio: "https://adafolio.com/portfolio/2027fd88-a9e1-11eb-a580-0242c0a80002",
        ...template.adapools.about
    },
    roadmap: {
        items: [
            { name: "Explore the idea where we set up a treasury where people can delegate to that will be automatically assigned to pools that are in need of delegation using smart contracts", completed: false, date: "2021-07-01" },
            { name: "Create a validation page for stake pool members of the alliance to check for missing info", completed: false, date: "2021-06-01" },
            { name: "Maintain Armada Alliance Official ARM-based static build using GitHub Actions and put people on a mailinglist for new releases (including pre-releases)", completed: false, date: "2021-06-01" },
            { name: "Release a YouTube video on how to setup a cardano node + cli & quick db sync with Docker in under 30 minutes", completed: false, date: "2021-06-01" },
            { name: "Explore utility tokens for delegators of our community", completed: false, date: "2021-06-01" },
            { name: "Mint specials tokens for delegators of our community", completed: false, date: "2021-06-01" },
            { name: "Simplify the registration process for new stake pools, most data already comes from metadata & extended metadata", completed: false, date: "2021-06-01" },
            { name: "Support metrics endpoint for stake pools that will expose basic metrics that can be shown on the website", completed: false, date: "2021-06-01" },
            { name: "Launch first version of the [website](https://armada-alliance.com)", completed: true, date: "2021-04-30" },
            { name: "Create a [repository](https://github.com/armada-alliance/armada-alliance) where people can register", completed: true, date: "2021-04-18" }
        ]
    },
    pools
}

fs.writeFileSync(basePath + "/services/website/src/schema.json", JSON.stringify(schema, null, 2))
fs.writeFileSync(basePath + "/services/website/src/pools.json", JSON.stringify(pools, null, 2))
