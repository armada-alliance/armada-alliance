const fs = require('fs/promises')
const mkdirp = require('mkdirp')
const path = require('path')
const rmfr = require('rmfr')
const basePath = path.resolve(__dirname + "/../page-data")
const templates = require('./templates')

module.exports = async (pages) => {

    await rmfr(basePath)

    await Promise.all(
        pages.map(async page => {

            const filePath = path.join(basePath, page.slug === "/" ? "/index" : page.slug)

            const dirname = path.dirname(filePath)

            await mkdirp(dirname)

            const template = templates[page.template]

            let props = {}
            if (template) {
                props = await template.getProps(page)
            }

            const data = {
                ...page,
                props
            }

            await fs.writeFile(filePath + '.json', JSON.stringify(data, null, 2))

            console.log(`generated page: ${filePath + '.json'}`)
        })
    )

    console.log('basePath', basePath)
}