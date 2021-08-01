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

                return {
                    ...props.statsSection
                }
            }
        }
    ]
}