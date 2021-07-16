const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'AAIPsPage',
    name: 'AAIPs',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),

    resolve: (ctx, props) => {

        const pages = ctx.tables.get('pages')

        const aaipPages = pages.filter(page => page.template === "AAIPDetailPage")

        return {
            ...props,
            pages: aaipPages
        }
    },
    components: [
        { type: 'Layout' },
    ]
}