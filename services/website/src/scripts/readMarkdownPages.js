const fs = require('fs/promises')
const walk = require('walkdir')
const fm = require('front-matter')
const path = require('path')
const compact = require('lodash/compact')
const trim = require('lodash/trim')
const decodeUrlPartsFromFilePath = require('./decodeUrlPartsFromFilePath')

module.exports = async () => {

    const contentPath = __dirname + '/../../content'

    const paths = walk.sync(contentPath);
    console.log('found paths sync: ', paths);

    const pages = await Promise.all(
        paths.map(async filePath => {

            const dirPath = path.join(contentPath)
            const relPath = filePath.replace(dirPath, '')

            const { language, slug } = decodeUrlPartsFromFilePath(relPath)

            const ignorePaths = ['/README.md']

            if (ignorePaths.includes(relPath)) {
                return null
            }

            if (relPath.slice(-3) !== '.md') {
                return null
            }

            try {

                const string = await fs.readFile(filePath, 'utf-8')

                const data = fm(string)

                return {
                    language,
                    slug,
                    // ...data.attributes,
                    origin: data.attributes.origin ? data.attributes.origin : slug,
                    title: data.attributes.title ? data.attributes.title : slug.split("/").pop(),
                    description: data.attributes.description,
                    aliases: data.attributes.aliases ? data.attributes.aliases.split(',').map(trim) : null,
                    keywords: data.attributes.keywords ? data.attributes.keywords.split(',').map(trim) : null,
                    template: data.attributes.template,
                    identities: data.attributes.identities,
                    image: data.attributes.image,
                    icon: data.attributes.icon,
                    params: {
                        source: relPath
                    }
                }

            } catch (e) {

                return {
                    source: relPath,
                    error: e.message
                }
            }

        })
    )

    return compact(pages)
}