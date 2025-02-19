const axios = require('axios')
const readMarkdownPages = require('../readMarkdownPages')
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

const getMetaDataForPool = async (poolId) => {

    const { data: metadata } = await blockfrost.get(`/pools/${poolId}/metadata`)
    const { data: result } = await axios.get(metadata.url)
    return result
}

const getDataForPool = async (poolId) => {

    const { data } = await blockfrost.get(`/pools/${poolId}`)
    return data
}

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

const getCexplorerData = async (poolIdBech32) => {

    const { data } = await axios.get(`https://js.cexplorer.io/api-static/pool/${poolIdBech32}.json`)

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
                if (!data.error) {
                    setCacheItem(address, data)
                }
            } catch (e) {
                console.log('e', e.response)
            }

        })
        , { maxInProgress: 1 })

    return result
}

module.exports = {
    id: "pools",
    transformRow: (ctx, row) => {
        const checks = ctx.tables.get('checks')

        if (!checks) {
            return row
        }

        const check = checks.find(check => check.poolId === row.id)

        if (!check) {
            return row
        }

        return {
            ...row,
            qualityScore: check.qualityScore
        }
    },
    create: async () => {

        const pages = await readMarkdownPages()

        const poolPages = pages.filter(page => page.template === "PoolDetailPage")

        // const { data: { pools: poolPingDatas } } = await axios.get('https://api.sublayer.io/armada-api/ping/pools')

        return Promise.all(
            poolPages.map(async poolPage => {

                const poolId = poolPage.params.filename

                let metadata = null
                try {
                    metadata = await getMetaDataForPool(poolId)
                } catch (e) {

                }

                let extended = null

                if (metadata && metadata.extended) {

                    try {
                        extended = await axios.get(metadata.extended).then(res => res.data)
                    } catch (e) {

                    }
                }

                // let poolPingData = poolPingDatas.map(data => ({
                //     nodeVersion: data.nodeVersion,
                //     remainingKesPeriods: data.remainingKesPeriods,
                // })).find(poolPingData => poolPingData.id === poolId)

                // poolPingData = poolPingData || {}
                let poolPingData = {}

                const relays = await getRelaysForPool(poolId)

                const adapools = await getAdapoolsData(poolId)

                let cexplorerData = null
                if (metadata && metadata.pool_id) {
                    cexplorerData = await getCexplorerData(metadata.pool_id)
                }
                
                const cexplorer = cexplorerData
                
                const data = await getDataForPool(poolId)

                //const name = adapools.data.db_name
                const name = cexplorer.data.name ? cexplorer.data.name : adapools.data.db_name

                // let image = adapools.data.handles.icon
                let image = cexplorer.data.img ? cexplorer.data.img : adapools.data.handles.icon
                
                let tg, tw, gh, fb, yt, di, li
                
                if (extended && extended.info) {
                    image = extended.info.url_png_logo

                    if (extended.info.social) {
                        tg = extended.info.social.telegram_handle ? extended.info.social.telegram_handle : adapools.data.handles.tg
                        tw = extended.info.social.twitter_handle ? extended.info.social.twitter_handle : adapools.data.handles.tw 
                        gh = extended.info.social.github_handle ? extended.info.social.github_handle : adapools.data.handles.gh 
                        fb = extended.info.social.facebook_handle ? extended.info.social.facebook_handle : adapools.data.handles.fb
                        yt = extended.info.social.youtube_handle ? extended.info.social.youtube_handle : adapools.data.handles.yt 
                        di = extended.info.social.discord_handle ? extended.info.social.discord_handle : adapools.data.handles.di 
                        li = extended.info.social.linkedin_handle ? extended.info.social.linkedin_handle : null
                    }
                }

                image = image && image.indexOf('http://') === -1 ? image : null

                const hasImage = !!image

                if (!hasImage) {
                    image = 'https://armada-alliance.com/assets/ship-420.png'
                }

                console.log('adapools', poolId, adapools.created)
                if (cexplorer) {
                    console.log('cexplorer', metadata.pool_id, cexplorer.time)
                }

                return {
                    id: poolId,
                    name,
                    link: {
                        name,
                        href: '/stake-pools/' + poolId
                    },
                    // description: adapools.data.db_description,
                    description: metadata.description ? metadata.description : adapools.data.db_description,
                    image,
                    hasImage,
                    // ticker: adapools.data.db_ticker,
                    ticker: metadata.ticker ? metadata.ticker : adapools.data.db_ticker,
                    // addr: adapools.data.pool_id_bech32,
                    addr: metadata.pool_id ? metadata.pool_id : adapools.data.pool_id_bech32,
                    // website: poolPage.website ? poolPage.website : adapools.data.db_url,
                    website: poolPage.website ? poolPage.website : metadata.homepage,
                    // totalStake: adapools.data.total_stake,
                    totalStake: data.live_stake,
                    // blocksLifetime: adapools.data.blocks_lifetime,
                    blocksLifetime: data.blocks_minted,
                    // delegators: adapools.data.delegators,
                    delegators: data.live_delegators,
                    // saturated: adapools.data.saturated,
                    saturated: data.live_saturation,
                    // pledge: adapools.data.pledge,
                    pledge: data.declared_pledge,
                    // pledged: adapools.data.pledged,
                    pledged: data.live_pledge,
                    // taxRatio: adapools.data.tax_ratio,
                    taxRatio: data.margin_cost,
                    // taxFix: adapools.data.tax_fix,
                    taxFix: data.fixed_cost,
                    // roa: adapools.data.roa,
                    roa: cexplorer.data.roa_lifetime ? cexplorer.data.roa_lifetime : adapools.data.roa,
                    
                    memberSince: poolPage.memberSince,
                    registeredAt: adapools.created ? new Date(adapools.created).toISOString() : null,
                    identities: poolPage.identities,
                    nodes: poolPage.nodes,
                    relays,
                    metadata,
                    extended,
                    telegram: tg ? tg : poolPage.telegram,
                    twitter: tw ? tw : poolPage.twitter,
                    github: gh ? gh : poolPage.github,
                    facebook: fb ? fb : poolPage.facebook,
                    youtube: yt ? yt : poolPage.youtube,
                    discord: di ? di : poolPage.discord,
                    instagram: poolPage.instagram,
                    email: poolPage.email,
                    linkedin: li ? li : poolPage.linkedin,
                    ...poolPingData
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
                relays: row.relays.reduce((result, relay) => {

                    const data = locationsByAddress[relay.addr]

                    if (!data.error) {

                        result.push({
                            ...relay,
                            data
                        })
                    }

                    return result
                }, [])
            }
        })
    }
}
