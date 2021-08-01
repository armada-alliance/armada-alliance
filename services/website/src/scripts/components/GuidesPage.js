const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'GuidesPage',
    name: 'Guides',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),

    resolve: (ctx, props) => {

        const pages = ctx.tables.get('pages')

        const guides = pages.filter(page => page.template === "GuideDetailPage")

        return {
            ...props,
            guides
        }
    },
    components: [
        { type: 'Layout' },
    ]
}