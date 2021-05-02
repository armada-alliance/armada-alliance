const fs = require("fs")
const basePath = __dirname + "/.."
const template = require(basePath + "/adapools-without-members.json")
const pools = require("./pools")

console.log(
    JSON.stringify(pools, null, 2)
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