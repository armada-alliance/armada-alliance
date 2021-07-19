const axios = require('axios')

const getData = async (url) => {
    try {
        const { data } = await axios.get(url)
        return data
    } catch (e) {
        return null
    }
}

module.exports = {
    id: "timeSeries",
    dependsOn: ['pools'],
    create: async (ctx) => {

        let timeSeries = await getData('https://raw.githubusercontent.com/armada-alliance/armada-alliance.github.io/master/timeSeries.json')

        timeSeries = timeSeries || []

        const pools = ctx.tables.get('pools')
        const countries = ctx.tables.get('countries')

        const getBlocksMinted = pools => pools.reduce((result, pool) => {
            return result + parseInt(pool.blocksLifetime, 10)
        }, 0)

        const getLiveStake = pools => pools.reduce((result, pool) => {
            return result + parseInt(pool.totalStake, 10)
        }, 0)

        const getDelegators = pools => pools.reduce((result, pool) => {
            return result + parseInt(pool.delegators, 10)
        }, 0)

        timeSeries.push({
            timestamp: new Date(),
            delegatorCount: getDelegators(pools),
            mintedBlocksCount: getBlocksMinted(pools),
            liveStake: getLiveStake(pools),
            poolCount: pools.length,
            countryCount: countries.length,
        })

        return timeSeries
    }
}