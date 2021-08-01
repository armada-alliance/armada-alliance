const schema = require('../../../public/schema.json')

module.exports = {
    id: 'Context',
    type: 'Component',
    resolve: async (ctx, props) => {

        const languages = ctx.tables.get('languages')
        const pages = ctx.tables.get('pages')
        const currencies = ctx.tables.get('currencies')

        return {
            host: process.env.HOST,
            schema,
            languages,
            pages,
            currencies,
        }
    },
}