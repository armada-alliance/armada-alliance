const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'IdentityDetailPage',
    name: 'Identity',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),
    transformPage: async (ctx, page) => {

        const pool = ctx.tables.get('identities').find(pool => pool.id === page.id)

        return {
            ...page,
            title: pool.name,
            image: pool.image,
            description: pool.description
        }
    },
    resolve: (ctx, props) => {

        const identity = ctx.tables.get('identities').find(identity => identity.id === props.id)

        return {
            ...props,
            identity
        }
    },
    components: [
        { type: 'Layout' },
        {
            type: 'PageHeader',
            resolve: (ctx, props) => ({
                title: props.identity.name,
                image: props.identity.image,
                verified: props.verified,
                pageType: 'Identity'
            })
        },
        {
            type: 'PageExcerpt',
            resolve: (ctx, props) => ({
                excerpt: props.identity.description
            })
        },
        {
            type: 'PageContent',
            resolve: (ctx, props) => ({
                mdxSource: props.mdxSource,
                filePath: props.filePath,
                updatedAt: props.updatedAt,
                donationName: props.identity.name,
                donationAddress: props.donationAddress
            })
        },
        {
            type: 'PostPagesSection',
            resolve: (ctx, props) => {

                const pages = ctx.tables.get('pages').filter(page => {
                    return (page.identities || []).find(identity => {
                        return identity.id === props.id
                    })
                })

                return {
                    pages
                }
            }
        }
    ]
}