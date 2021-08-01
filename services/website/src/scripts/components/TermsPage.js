const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'TermsPage',
    name: 'Guides',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),

    resolve: (ctx, props) => {

        const pages = ctx.tables.get('pages')

        const terms = pages.filter(page => page.template === "TermDetailPage")

        return {
            ...props,
            terms
        }
    },
    components: [
        { type: 'Layout' },
    ]
}