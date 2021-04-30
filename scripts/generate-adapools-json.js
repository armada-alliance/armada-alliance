const fs = require("fs")
const basePath = __dirname + "/.."

const files = fs.readdirSync(basePath + "/registry")
const template = require(basePath + "/adapools-without-members.json")

const pools = files
    .map(file => require(basePath + "/registry/" + file))
    .sort((a, b) =>
        new Date(a.memberSince) - new Date(b.memberSince)
    )

const members = pools.reduce((result, pool, index) => {
    result[index] = {
        pool_id: pool.poolId,
        member_since: pool.memberSince,
        name: pool.ticker
    }
    return result
}, {})

const adapools = {
    ...template,
    adapools: {
        ...template.adapools,
        members
    }
}

fs.writeFileSync(basePath + "/adapools.json", JSON.stringify(adapools, null, 2))