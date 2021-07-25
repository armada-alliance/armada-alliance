const moment = require('moment')

module.exports = {
    id: 'StatsSection',
    type: 'Component',
    resolve: async (ctx, props) => {

        const timeSeries = ctx.tables.get('timeSeries').filter(timeSerie => timeSerie.type === "combined")
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

        const yesterday = moment().subtract(1, 'day')

        const timeSerie = timeSeries
            .sort((a, b) =>
                moment(a.timestamp) - moment(b.timestamp)
            )
            .find(timeSerie =>
                moment(timeSerie.timestamp).isAfter(yesterday.startOf('day')) && moment(timeSerie.timestamp).isBefore(yesterday.endOf('day'))
            )

        let fields = [
            {
                id: "mintedBlocksCount",
                title: "Blocks minted",
                prev: timeSerie ? timeSerie.mintedBlocksCount : null,
                value: getBlocksMinted(pools)
            },
            {
                id: "liveStake",
                title: "Live stake",
                prev: timeSerie ? timeSerie.liveStake : null,
                value: getLiveStake(pools)
            },
            {
                id: "delegatorCount",
                title: "Delegators",
                prev: timeSerie ? timeSerie.delegatorCount : null,
                value: getDelegators(pools)
            }
        ]

        fields = fields.map(field => {

            let diff = null
            let diffPct = null

            if (field.prev) {
                diff = field.value - field.prev
                diffPct = diff / field.prev * 100
            }

            return {
                ...field,
                diff,
                diffPct
            }
        })

        return {
            ...props,
            fields,
            delegatorCount: getDelegators(pools),
            mintedBlocksCount: getBlocksMinted(pools),
            liveStake: getLiveStake(pools),
            pools,
            poolCount: pools.length,
            countryCount: countries.length,
        }
    }
}