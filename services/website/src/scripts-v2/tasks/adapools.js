const fs = require("fs")
const template = require("../../adapools-without-members.json")
const pools = require("../../../public/tables/pools.json")

async function main() {

    const members = pools.reduce((result, pool, index) => {
        result[index] = {
            pool_id: pool.id,
            member_since: pool.memberSince,
            name: pool.ticker
        }
        return result
    }, {})

    const adapools = {
        createdAt: new Date().toISOString(),
        ...template,
        adapools: {
            ...template.adapools,
            members
        }
    }

    fs.writeFileSync(__dirname + '/../../../public/adapools.json', JSON.stringify(adapools, null, 2))
}

main()