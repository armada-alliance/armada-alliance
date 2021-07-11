const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'PoolDetailPage',
    name: 'Stake Pool',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),
    transformPage: async (ctx, page) => {

        const pool = ctx.tables.get('pools').find(pool => pool.id === page.id)

        return {
            ...page,
            title: `${pool.name} (${pool.ticker})`,
            image: pool.image,
            description: pool.description,
        }
    },
    resolve: (ctx, props) => {

        const pool = ctx.tables.get('pools').find(pool => pool.id === props.id)

        return {
            ...props,
            pool
        }
    },
    components: [
        { type: 'Layout' },
        {
            type: 'PageHeader',
            resolve: (ctx, props) => ({
                title: props.pool.name,
                image: props.pool.image,
                pageType: 'Stake Pool',
                identities: props.identities
            })
        },
        {
            type: 'PageExcerpt',
            resolve: (ctx, props) => ({
                excerpt: props.pool.description
            })
        },
        {
            type: 'PageContent',
            resolve: (ctx, props) => ({
                mdxSource: props.mdxSource,
                filePath: props.filePath
            })
        },
        {
            type: 'DelegationSection',
            resolve: (ctx, props) => ({
                pool: props.pool
            })
        }
    ]
}