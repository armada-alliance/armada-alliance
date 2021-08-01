const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'BlogsPage',
    name: 'Blogs',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),

    resolve: (ctx, props) => {

        const pages = ctx.tables.get('pages')

        const blogPages = pages.filter(page => page.template === "BlogDetailPage")

        return {
            ...props,
            pages: blogPages
        }
    },
    components: [
        { type: 'Layout' },
    ]
}