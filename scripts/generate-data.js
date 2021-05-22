const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()
const { writeFile } = require('fs').promises
const axios = require('axios')
const registries = require('./pools')
const basePath = __dirname + "/.."
const template = require(basePath + "/adapools-without-members.json")

const blockfrost = axios.create({
    baseURL: 'https://cardano-mainnet.blockfrost.io/api/v0',
    headers: {
        project_id: process.env.BLOCKFROST_PROJECT_ID
    }
})

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

    const pools = registries.reduce((result, registry) => {

        const pool = poolsById[registry.poolId]

        if (pool) {
            result.push({
                id: registry.poolId,
                memberSince: registry.memberSince,
                ...pool,
            })
        }

        return result

    }, [])

    const pools_extended = await Promise.all(
        pools.map(async pool => {

            const result = {
                icon: '/ship-420.png',
                errors: []
            }

            try {
                const { data: metadata } = await axios.get(pool.metadata)
                result.metadata = metadata
            } catch (e) {
                result.errors.push(`could not fetch metadata at: ${pool.metadata}`)
                console.log(`could not fetch metadata for ${pool.ticker}`)
                console.log(e)
            }

            try {
                const { data } = await blockfrost.get(`/pools/${pool.id}/relays`)
                result.relays = data
            } catch (e) {
                result.errors.push(`could not fetch relays for: ${pool.ticker}`)
                console.log(`could not fetch relays for ${pool.ticker}`)
                console.log(e)
            }

            if (pool.extended) {
                try {
                    const { data: extended } = await axios.get(pool.extended)
                    result.extended = extended
                    if (extended.info.location) {
                        result.location = await getLocationForQuery({ query: extended.info.location })
                    }
                    if (extended.info.url_png_icon_64x64) {
                        const { data } = await axios.get(extended.info.url_png_icon_64x64, { responseType: 'arraybuffer' })
                        console.log('writing image to path', basePath + "/services/website/public/images/" + pool.id + ".png")
                        await writeFile(basePath + "/services/website/public/images/" + pool.id + ".png", data)
                        result.icon = "/images/" + pool.id + ".png"
                    }
                } catch (e) {
                    result.errors.push(`could not fetch extended metadata at: ${pool.extended}`)
                    console.log(`could not fetch extended metadata for ${pool.ticker}`)
                    console.log(e)
                }
            }

            try {
                const adapools = await getAdapoolsData({ poolId: pool.id })
                result.adapools = adapools
            } catch (e) {
                result.errors.push('could not fetch adapools data')
                console.log(`could not fetch adapools data for ${pool.ticker}`)
                console.log(e)
            }

            return {
                ...pool,
                ...result
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
        }
    }

    const topology = pools_extended.reduce((result, pool) => {

        if (pool.relays) {
            return [
                ...result,
                ...pool.relays.map(relay => ({
                    pool_id: pool.id,
                    pool_ticker: pool.ticker,
                    ...relay
                }))
            ]
        }

        return result

    }, [])

    fs.writeFileSync(basePath + "/services/website/src/topology.json", JSON.stringify(topology, null, 2))
    fs.writeFileSync(basePath + "/services/website/src/pools.json", JSON.stringify(pools, null, 2))
    fs.writeFileSync(basePath + "/services/website/src/pools_extended.json", JSON.stringify(pools_extended, null, 2))
    fs.writeFileSync(basePath + "/services/website/src/schema.json", JSON.stringify(schema, null, 2))
}

main()