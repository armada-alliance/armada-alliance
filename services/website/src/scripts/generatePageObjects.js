const fs = require('fs/promises')
const mkdirp = require('mkdirp')
const path = require('path')
const rmfr = require('rmfr')
const basePath = path.resolve(__dirname + "/../page-data")
const getPageData = require('./getPageData')

module.exports = async (pages) => {

    await rmfr(basePath)

    await Promise.all(
        pages.map(async page => {

            const filePath = path.join(basePath, page.slug === "/" ? "/index" : page.slug)

            console.log(`started generating page: ${filePath + '.json'}`)

            const dirname = path.dirname(filePath)

            await mkdirp(dirname)

            const data = await getPageData(page, pages)

            await fs.writeFile(filePath + '.json', JSON.stringify(data, null, 2))

            console.log(`generated page: ${filePath + '.json'}`)
        })
    )
}