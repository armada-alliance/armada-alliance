module.exports = {
    id: 'Context',
    type: 'Component',
    resolve: async (ctx, props) => {

        const languages = ctx.tables.get('languages')
        const pages = ctx.tables.get('pages')

        return {
            languages,
            pages
        }
    },
}