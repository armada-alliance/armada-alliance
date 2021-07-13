module.exports = {
    id: 'DelegationWidgetPage',
    name: 'Delegation Widget',
    type: 'Template',
    getPages: async (ctx, { component }) => {

        return [
            {
                language: "en",
                title: "Delegation widget",
                slug: "/delegation-widget",
                template: component.id,
                hidden: true
            }
        ]
    },
    components: [
        { type: 'Layout' }
    ]
}