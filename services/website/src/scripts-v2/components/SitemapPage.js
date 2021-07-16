const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'SitemapPage',
    name: 'Stats widget',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),

    resolve: (ctx, props) => {

        const pages = ctx.tables.get('pages')
        const languages = ctx.tables.get('languages')

        return {
            ...props,
            pages,
            languages
        }
    },
    components: [
        { type: 'Layout' },
    ]
}