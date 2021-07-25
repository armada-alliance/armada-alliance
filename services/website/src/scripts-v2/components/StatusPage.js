const getPagesForTemplate = require('../getPagesForTemplate')

module.exports = {
    id: 'StatusPage',
    name: 'Status Page',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),
    resolve: (ctx, props) => {

        return {
            ...props,
        }
    },
    components: [
        { type: 'Layout' },
    ]
}