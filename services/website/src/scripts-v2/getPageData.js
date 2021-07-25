const path = require('path')
const fs = require('fs/promises')
const contentPath = path.join(__dirname, '..', '..', 'content')
const preprocessMarkdown = require('../scripts/preprocessMarkdown')
const fm = require('front-matter')
const { serialize } = require('next-mdx-remote/serialize');
const replaceVariables = require('./replaceVariables')

function getAttributes(data) {
    let attributes = { ...data.attributes }
    delete attributes.title
    delete attributes.origin
    delete attributes.description
    delete attributes.keywords
    delete attributes.aliases
    delete attributes.template
    return attributes
}

const getPageData = async (filePath) => {

    const string = await fs.readFile(path.join(contentPath, filePath), 'utf-8')

    const data = fm(string)
    const attributes = getAttributes(data)

    const body = preprocessMarkdown(
        replaceVariables(data.body)
    )

    return {
        ...attributes,
        body,
        mdxSource: await serialize(body)
    }
}

module.exports = getPageData