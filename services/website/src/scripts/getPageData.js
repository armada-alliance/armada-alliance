const fetch = require('./fetch')
const pools = require('../pools_extended.json')
const fs = require('fs/promises')
const fm = require('front-matter')
const path = require('path')
const preprocessMarkdown = require('./preprocessMarkdown')
const { serialize } = require('next-mdx-remote/serialize')
const compact = require('lodash/compact')
const { identity } = require('lodash')

const contentPath = path.join(__dirname, '..', '..', 'content')

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

async function getPostProps(page, pages) {

    const string = await fs.readFile(path.join(contentPath, page.params.source), 'utf-8')

    const data = fm(string)
    const attributes = getAttributes(data)

    const body = preprocessMarkdown(data.body)

    let identities = []

    if (attributes.identities) {

        identities = await Promise.all(
            attributes.identities.map(
                async identity => {
                    const page = pages.find(page => page.slug === identity.slug)
                    if (!page) {
                        return null
                    }
                    const pageData = await getPageData(page, pages)

                    if (!pageData) {
                        return null
                    }
                    return {
                        ...pageData,
                        meta: {
                            role: identity.role
                        },
                    }
                }
            )
        ).then(compact)
    }

    return {
        ...attributes,
        identities,
        body,
        source: await serialize(body)
    }
}

const templates = {
    GuideDetailPage: {
        getProps: getPostProps
    },
    BlogDetailPage: {
        getProps: getPostProps
    },
    TermDetailPage: {
        getProps: getPostProps
    },
    IdentityDetailPage: {
        getProps: async (page, pages) => {

            const props = await getPostProps(page, pages)

            const authorPages = pages.filter(p =>
                (p.identities || []).find(identity => identity.slug === page.slug)
            )

            return {
                ...props,
                pages: authorPages
            }
        }
    },
    PoolDetailPage: {
        getProps: async ({ params }) => {

            const pool = pools.find(pool => pool.id === params.poolId)
            const { data: feed } = await fetch(`https://pool.pm/feed/${params.poolId}`)
            const { data: stake } = await fetch(`https://pool.pm/stake/${params.poolId}`)
            // const { data: { data: { devices } } } = await fetch(`https://pool.sublayer.io/metrics`)
            const devices = []

            return {
                feed,
                stake,
                devices,
                pool
            }
        }
    }
}

async function getPageData(page, pages) {

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