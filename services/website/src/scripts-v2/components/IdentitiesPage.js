const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'IdentitiesPage',
    name: 'Identities',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),

    resolve: (ctx, props) => {

        const identities = ctx.tables.get('identities')

        return {
            ...props,
            identities
        }
    },
    components: [
        { type: 'Layout' },
    ]
}