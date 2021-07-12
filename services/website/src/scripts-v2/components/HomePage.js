const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'HomePage',
    name: 'Homepage',
    type: 'Template',
    changefreq: 'hourly',
    priority: 1.0,
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),

    components: [
        { type: 'Layout' },
        {
            type: 'HeroSection',
            resolve: (ctx, props) => {

                const pools = ctx.tables.get('pools')

                return {
                    ...props.heroSection,
                    poolCount: pools.length
                }
            }
        },
        {
            type: 'StatsSection',
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
                    ...props.statsSection,
                    pools,
                    delegatorCount: getDelegators(pools),
                    mintedBlocksCount: getBlocksMinted(pools),
                    liveStake: getLiveStake(pools),
                    poolCount: pools.length,
                    countryCount: countries.length,
                }
            }
        }
    ]
}