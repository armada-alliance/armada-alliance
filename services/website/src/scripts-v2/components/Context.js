const schema = require('../../../public/schema.json')

module.exports = {
    id: 'Context',
    type: 'Component',
    resolve: async (ctx, props) => {

        const languages = ctx.tables.get('languages')
        const pages = ctx.tables.get('pages')

        return {
            schema,
            languages,
            pages
        }
    },
}