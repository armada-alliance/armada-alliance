const compact = require('lodash/compact')
const flatten = require('lodash/flatten')
const components = require('../components')

module.exports = {
    id: "pages",
    dependsOn: ['pools', 'templates'],
    create: async (ctx) => {

        const paths = await Promise.all(
            components.map(async component => {

                if (!component.getPages) {
                    return null
                }

                let pages = await component.getPages(ctx, { component })

                if (component.transformPage) {

                    pages = await Promise.all(
                        pages.map(page => component.transformPage(ctx, page))
                    )
                }

                return pages
            })
        )

        const pages = flatten(
            compact(paths)
        )

        return pages
    },
}