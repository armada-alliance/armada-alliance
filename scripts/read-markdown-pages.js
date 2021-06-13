const fs = require('fs/promises')
const walk = require('walkdir')
const fm = require('front-matter')
const path = require('path')
const compact = require('lodash/compact')
const trim = require('lodash/trim')

function decodeUrlPartsFromFilePath(filePath) {

    // remove extension
    const string = filePath.replace('.md', '')
    const [language, ...urlParts] = string.split('/').filter(Boolean)

    const slug = urlParts.join('/')

    return {
        language,
        slug: "/" + (language !== "en" ? language + slug : slug),
        urlParts
    }
}

module.exports = async () => {

    const paths = walk.sync(__dirname + '/../pages');
    console.log('found paths sync: ', paths);

    const pages = await Promise.all(
        paths.map(async filePath => {

            const dirPath = path.join(__dirname + '/../pages')
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
                    source: relPath,
                    language,
                    slug,
                    ...data.attributes,
                    title: data.attributes.title,
                    description: data.attributes.description,
                    aliases: data.attributes.aliases ? data.attributes.aliases.split(',').map(trim) : null,
                    keywords: data.attributes.keywords ? data.attributes.keywords.split(',').map(trim) : null,
                    template: data.attributes.template,
                    body: data.body
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