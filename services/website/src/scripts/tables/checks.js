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

                const checksFailed = results.filter(result => result.status === "failed").length
                const checksPassed = results.filter(result => result.status === "passed").length
                const checksTotal = results.length

                const qualityScore = checksPassed / checksTotal * 100

                return {
                    poolId: pool.id,
                    name: pool.name,
                    ticker: pool.ticker,
                    checks: {
                        total: checksTotal,
                        failed: checksFailed,
                        passed: checksPassed
                    },
                    qualityScore,
                    results,
                }
            })
        )
    }
}