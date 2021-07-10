const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'HomePage',
    name: 'Homepage',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),

    components: [
        { type: 'Layout' },
        {
            type: 'HeroSection',
            resolve: (ctx, props) => {

                const identities = ctx.tables.get('identities')
                const pools = ctx.tables.get('pools')

                return {
                    ...props.heroSection,
                    poolCount: pools.length,
                    identities: identities.filter(identity => identity.image && identity.pools.length).slice(0, 10)
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