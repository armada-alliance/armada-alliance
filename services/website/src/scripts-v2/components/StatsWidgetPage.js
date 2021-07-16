const getDataForPage = require('../getDataForPage')

module.exports = {
    id: 'StatsWidgetPage',
    name: 'Delegate',
    type: 'Template',
    getPages: async (ctx, { component }) => {

        return [
            {
                language: "en",
                title: "Stats widget",
                slug: "/stats-widget",
                template: component.id,
                hidden: true
            }
        ]
    },
    components: [
        { type: 'Layout' },
        {
            type: 'StatsSection',
            resolve: async (ctx, props) => {

                const data = await getDataForPage('/en/index.md')

                return {
                    ...data.statsSection
                }
            }
        }
    ]
}