const templates = require('./templates')

async function getPageData(page) {

    const template = templates[page.template]

    let props = {}
    if (template) {
        props = await template.getProps(page, pages)
    }

    return {
        ...page,
        props
    }
}

module.exports = getPageData