const getPagesForTemplate = require('../getPagesForTemplate')
const getDataForPage = require('../getDataForPage')

module.exports = {
    id: 'GuideDetailPage',
    name: 'Guide',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),
    resolve: async (ctx, props) => {
        const data = await getDataForPage(props.filePath)
        return {
            ...props,
            pageType: 'Guide',
            externalLink: data.externalLink
        }
    },
    components: [
        { type: 'Layout' },
        {
            type: 'PageHeader',
            resolve: (ctx, props) => ({
                title: props.title,
                pageType: 'Guide',
                identities: props.identities
            })
        },
        {
            type: 'PageExcerpt',
            resolve: (ctx, props) => ({
                alignLeft: !!props.mdxSource,
                excerpt: props.description
            })
        },
        {
            type: 'PageContent',
            resolve: (ctx, props) => ({
                mdxSource: props.mdxSource,
                filePath: props.filePath,
                updatedAt: props.updatedAt,
                pageType: props.pageType,
                externalLink: props.externalLink
            })
        }
    ]
}