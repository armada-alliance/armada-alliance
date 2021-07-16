module.exports = {
    id: 'StatsSection',
    type: 'Component',
    resolve: (ctx, props) => {

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

        return {
            ...props,
            delegatorCount: getDelegators(pools),
            mintedBlocksCount: getBlocksMinted(pools),
            liveStake: getLiveStake(pools),
            pools,
            poolCount: pools.length,
            countryCount: countries.length,
        }
    }
}