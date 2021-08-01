const ruleResolvers = require('../rules')

module.exports = {
    id: "checks",
    dependsOn: ['pools', 'identities', 'devices', 'rules'],
    create: async (ctx) => {

        const pools = ctx.tables.get('pools')
        const rules = ctx.tables.get('rules')

        return Promise.all(
            pools.map(async pool => {

                const results = await Promise.all(
                    rules.map(async rule => {

                        const ruleResolver = ruleResolvers.find(resolver => resolver.id === rule.id)

                        const result = await ruleResolver.resolve(ctx, { pool })

                        return {
                            ...rule,
                            ...result,
                        }
                    })
                )

                return {
                    poolId: pool.id,
                    name: pool.name,
                    ticker: pool.ticker,
                    results,
                }
            })
        )
    }
}