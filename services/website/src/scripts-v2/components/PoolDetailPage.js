const getPagesForTemplate = require('../getPagesForTemplate')
const getDataForPage = require('../getDataForPage')

module.exports = {
    id: 'PoolDetailPage',
    name: 'Stake Pool',
    type: 'Template',
    changefreq: 'hourly',
    priority: 1.0,
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),
    transformPage: async (ctx, props) => {

        const data = await getDataForPage(props.filePath)
        const pool = ctx.tables.get('pools').find(pool => pool.id === props.id)

        return {
            ...props,
            title: `${pool.name} (${pool.ticker})`,
            image: pool.image,
            description: pool.description,
            verified: data.verified
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
                subtitle: props.pool.ticker,
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
                filePath: props.filePath,
                updatedAt: props.updatedAt
            })
        },
        {
            type: 'ContentSections',
            resolve: (ctx, props) => ({
                contentSections: props.contentSections
            })
        },
        {
            type: 'QualityReportSection',
            resolve: (ctx, props) => {

                const checks = ctx.tables.get('checks')
                const result = checks.find(check => check.poolId === props.id)

                return {
                    rules: result.results,
                }
            }
        },
        {
            type: 'DelegationSection',
            resolve: (ctx, props) => ({
                pools: ctx.tables.get('pools'),
                pool: props.pool
            })
        }
    ]
}