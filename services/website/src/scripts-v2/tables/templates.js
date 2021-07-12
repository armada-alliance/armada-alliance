const components = require('../components')

module.exports = {
    id: "templates",
    create: async () => {

        const templates = components.filter(component => component.type === 'Template')

        return templates.map(template => {

            return {
                id: template.id,
                name: template.name,
                changefreq: template.changefreq || 'daily',
                priority: template.priority || 0.5
            }
        })
    }
}