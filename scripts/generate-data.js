const fs = require('fs')
const axios = require('axios')
const poolIds = require('./pools').map(pool => pool.poolId)
const basePath = __dirname + "/.."
const template = require(basePath + "/adapools-without-members.json")

async function getLocationForQuery({ query }) {

    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=pk.eyJ1Ijoic3VibGF5ZXJpbyIsImEiOiJja29oMzRwYTMxMXJpMnVxcDJrczh1Zm1oIn0.lHS4NebmckI-T1NfLiwGXA`)

    const [feature] = data.features

    if (!feature) {
        return null
    }

    return feature.center
}

async function getAdapoolsData({ poolId }) {

    const { data } = await axios.get(`https://js.adapools.org/pools/${poolId}/summary.json`)

    return data
}

async function main() {


    const { data: { pools: poolsById } } = await axios.get('https://pool.pm/pools.json')

    const pools = Object
        .keys(poolsById)
        .map(id => ({
            id,
            ...poolsById[id]
        }))
        .filter(pool => poolIds.includes(pool.id))

    const pools_extended = await Promise.all(
        pools.map(async pool => {

            const result = {}

            const { data: metadata } = await axios.get(pool.metadata)
            result.metadata = metadata

            if (pool.extended) {
                const { data: extended } = await axios.get(pool.extended)
                result.extended = extended
                if (extended.info.location) {
                    result.location = await getLocationForQuery({ query: extended.info.location })
                }
            }

            const adapools = await getAdapoolsData({ poolId: pool.id })

            return {
                ...pool,
                ...result,
                adapools
            }
        })
    )

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
                { name: "Launch first version of the [website](https://armada-alliance.com)", completed: true, date: "2021-04-30" },
                { name: "Create a [repository](https://github.com/armada-alliance/armada-alliance) where people can register", completed: true, date: "2021-04-18" }
            ]
        }
    }

    fs.writeFileSync(basePath + "/services/website/src/pools.json", JSON.stringify(pools, null, 2))
    fs.writeFileSync(basePath + "/services/website/src/pools_extended.json", JSON.stringify(pools_extended, null, 2))
    fs.writeFileSync(basePath + "/services/website/src/schema.json", JSON.stringify(schema, null, 2))
}

main()