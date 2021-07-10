const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'PoolsPage',
    name: 'PoolsPage',
    type: 'Template',
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

                return {
                    pools,
                    relays
                }
            }
        }
    ]
}