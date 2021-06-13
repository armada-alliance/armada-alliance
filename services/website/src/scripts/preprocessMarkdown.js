const parse = require('parse-markdown-links')
const decodeUrlPartsFromFilePath = require('./decodeUrlPartsFromFilePath')

module.exports = (source) => {

    const links = parse(source)

    return links.reduce((source, link) => {

        if (link[0] !== '/') {
            return source
        }

        const { slug } = decodeUrlPartsFromFilePath(link)

        return source.replace(link, slug)
    }, source)
}