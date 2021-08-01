const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'PoolsPage',
    name: 'PoolsPage',
    type: 'Template',
    changefreq: 'hourly',
    priority: 1.0,
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),

    components: [
        { type: 'Layout' },
        {
            type: 'PoolsSection',
            resolve: (ctx) => {

                const pools = ctx.tables.get('pools').sort((a, b) =>
                    new Date(a.memberSince) - new Date(b.memberSince)
                )

                return {
                    pools
                }
            }
        },
        {
            type: 'PoolMapSection',
            resolve: (ctx) => {

                const pools = ctx.tables.get('pools')
                const relays = ctx.tables.get('relays')
                const checks = ctx.tables.get('checks')

                return {
                    pools,
                    checks,
                    relays
                }
            }
        }
    ]
}