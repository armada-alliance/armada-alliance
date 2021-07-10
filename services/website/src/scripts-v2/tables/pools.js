const axios = require('axios')
const readMarkdownPages = require('../../scripts/readMarkdownPages')
const Throttle = require("promise-parallel-throttle")
const { getCacheItem, setCacheItem } = require('../cache')

const blockfrost = axios.create({
    baseURL: 'https://cardano-mainnet.blockfrost.io/api/v0',
    headers: {
        project_id: process.env.BLOCKFROST_PROJECT_ID
    }
})

const ipstack = axios.create({
    baseURL: 'http://api.ipstack.com/',
    params: {
        access_key: process.env.IPSTACK_API_KEY
    }
})

const getRelaysForPool = async (poolId) => {
    const { data: relays } = await blockfrost.get(`/pools/${poolId}/relays`)
    return relays.map(relay => {
        return {
            addr: relay.dns || relay.ipv6 || relay.ipv4 || relay.dns_srv,
            port: relay.port
        }
    })
}

const getAdapoolsData = async (poolId) => {

    const { data } = await axios.get(`https://js.adapools.org/pools/${poolId}/summary.json`)

    return data
}


const getDataForAddresses = async (addresses) => {

    let result = {}
    await Throttle.sync(
        addresses.map(address => async () => {

            let cached = getCacheItem(address)
            if (cached) {
                result[address] = cached
                return
            }

            try {
                const { data } = await ipstack.get(address)
                result[address] = data
                setCacheItem(address, data)
            } catch (e) {
                console.log('e', e.response)
            }

        })
        , { maxInProgress: 1 })

    return result
}

module.exports = {
    id: "pools",
    create: async () => {

        const pages = await readMarkdownPages()

        const poolPages = pages.filter(page => page.template === "PoolDetailPage")

        return Promise.all(
            poolPages.map(async poolPage => {

                const poolId = poolPage.params.filename

                const relays = await getRelaysForPool(poolId)

                const adapools = await getAdapoolsData(poolId)

                const name = adapools.data.db_name
                return {
                    id: poolId,
                    name,
                    link: {
                        name,
                        href: '/stake-pools/' + poolId
                    },
                    description: adapools.data.db_description,
                    image: adapools.data.handles.icon || 'https://armada-alliance.com/assets/ship-420.png',
                    ticker: adapools.data.db_ticker,
                    website: adapools.data.db_url,
                    totalStake: adapools.data.total_stake,
                    blocksLifetime: adapools.data.blocks_lifetime,
                    delegators: adapools.data.delegators,
                    pledge: adapools.data.pledge,
                    pledged: adapools.data.pledged,
                    taxRatio: adapools.data.tax_ratio,
                    roa: adapools.data.roa,
                    memberSince: poolPage.memberSince,
                    registeredAt: new Date(adapools.created).toISOString(),
                    identities: poolPage.identities,
                    relays,
                }
            })
        )
    },
    afterCreate: async (ctx, rows) => {

        const addresses = rows.reduce((result, row) => {
            return [
                ...result,
                ...row.relays.map(relay => relay.addr)
            ]
        }, [])

        const locationsByAddress = await getDataForAddresses(addresses)

        return rows.map(row => {

            return {
                ...row,
                relays: row.relays.map(relay => {

                    return {
                        ...relay,
                        data: locationsByAddress[relay.addr]
                    }
                })
            }
        })
    }
}