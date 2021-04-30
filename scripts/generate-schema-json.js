const fs = require("fs")
const basePath = __dirname + "/.."

const files = fs.readdirSync(basePath + "/registry")
const template = require(basePath + "/adapools-without-members.json")

const pools = files
    .map(file => require(basePath + "/registry/" + file))
    .sort((a, b) =>
        new Date(a.memberSince) - new Date(b.memberSince)
    )

const schema = {
    about: {
        github: 'https://github.com/armada-alliance/armada-alliance',
        telegram: "https://t.me/armada_alli",
        discord: "https://discord.gg/sVWNZfJB",
        gitbook: "https://armada-alliance.gitbook.io/",
        catalyst: "https://adapulse.io/arming-cardano-an-ecosystem-for-raspberry-pi-stakepool-operators/",
        ...template.adapools.about
    },
    roadmap: {
        sprints: [
            {
                name: "April 2021",
                items: [
                    { name: "Launch first version of the [website](https://armada-alliance.com)", completed: true, date: "Apr 30" },
                    { name: "Create a [repository](https://github.com/armada-alliance/armada-alliance) where people can register", completed: true, date: "Apr 18" }
                ]
            },
        ]
    },
    pools
}

fs.writeFileSync(basePath + "/services/website/src/schema.json", JSON.stringify(schema, null, 2))