module.exports = {
    id: 'PoolWidgetPage',
    name: 'Delegate',
    type: 'Template',
    getPages: async (ctx, { component }) => {

        const pools = ctx.tables.get('pools')

        return pools.map(pool => ({
            language: "en",
            title: `${pool.name} ${pool.ticker}`,
            slug: `/pool-widget/${pool.id}`,
            template: component.id,
            poolId: pool.id,
            hidden: true
        }))
    },
    resolve: (ctx, props) => {

        const pool = ctx.tables.get('pools').find(pool => pool.id === props.poolId)

        return {
            ...props,
            pool
        }
    },
    components: [
        { type: 'Layout' }
    ]
}