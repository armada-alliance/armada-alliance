function decodeUrlPartsFromFilePath(filePath) {

    // remove extension
    const string = filePath.replace('.md', '')
    const [language, ...urlParts] = string.split('/').filter(Boolean)

    const slug = urlParts.join('/')

    return {
        language,
        slug: "/" + (language !== "en" ? [language, slug].join('/') : slug),
        urlParts
    }
}

module.exports = decodeUrlPartsFromFilePath