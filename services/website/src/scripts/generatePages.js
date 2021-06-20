const perf = require('execution-time')();
const fs = require('fs').promises
const dotenv = require('dotenv')
const path = require('path')
const uniq = require('lodash/uniq')
const compact = require('lodash/compact')
const dashify = require('./dashify')
dotenv.config()
const translate = require('./translate')
const readMarkdownPages = require('./readMarkdownPages')
const generatePageObjects = require('./generatePageObjects')
const pools = require('../pools_extended.json')
const languages = require('../languages.json')
const basePath = path.join(__dirname, "..")

const templates = [
    {
        id: 'HomePage',
        title: 'Homepage',
        getPages: (props) => {
            return [
                {
                    ...props,
                    origin: null,
                    slug: null
                }
            ]
        }
    },
    {
        id: 'GuidesPage',
        title: 'Guides',
        getPages: (props) => {
            return [
                {
                    ...props,
                    origin: `${dashify(props.originalTitle)}`,
                    slug: `${dashify(props.title)}`
                }
            ]
        }
    },
    {
        id: 'TermsMainPage',
        title: 'Terminology',
        getPages: (props) => {
            return [
                {
                    ...props,
                    origin: `${dashify(props.originalTitle)}`,
                    slug: `${dashify(props.title)}`
                }
            ]
        }
    },
    {
        id: 'SitemapPage',
        title: 'Sitemap',
        getPages: (props) => {
            return [
                {
                    ...props,
                    origin: `${dashify(props.originalTitle)}`,
                    slug: `${dashify(props.title)}`
                }
            ]
        }
    },
    {
        id: 'RoadmapPage',
        title: 'Roadmap',
        getPages: (props) => {
            return [
                {
                    ...props,
                    origin: `${dashify(props.originalTitle)}`,
                    slug: `${dashify(props.title)}`
                }
            ]
        }
    },
    {
        id: 'PoolsMainPage',
        title: 'Stake Pools',
        getPages: (props) => {
            return [
                {
                    ...props,
                    origin: `${dashify(props.originalTitle)}`,
                    slug: `${dashify(props.title)}`
                }
            ]
        }
    },
    {
        id: 'PoolDetailPage',
        title: 'Stake Pool',
        getPages: async (props) => {
            const slug = dashify(props.originalTitle)

            let pages = []

            pools.forEach(pool => {

                const mergePages = ['about', 'delegators', 'blocks', 'assigned-slots', 'hardware', 'issues'].map(tab => {

                    return {
                        ...props,
                        title: `${pool.name} — ${props.originalTitle}`,
                        origin: `${slug}/${pool.id}${tab === 'about' ? '' : '/' + tab}`,
                        slug: `${dashify(props.translateSlug ? props.title : props.originalTitle)}/${pool.id}${tab === 'about' ? '' : '/' + tab}`,
                        params: {
                            poolId: pool.id,
                            tab
                        }
                    }
                })

                pages = [
                    ...pages,
                    ...mergePages
                ]
            })

            return pages
        }
    },
]

async function main() {

    console.log(`generatePages started`)

    perf.start()

    let pages = []

    for (const template of templates) {

        for (const language of languages) {

            const title = await translate(template.title, 'en', language.id)

            let templatePages = await template.getPages({ originalTitle: template.title, title, template: template.id, language: language.id, translateSlug: language.translateSlug })

            const languageSlug = language.id === 'en' ? null : language.id

            templatePages = templatePages.map(page => ({
                ...page,
                params: page.params ? page.params : {},
                origin: `/${compact([page.origin]).join('/')}`,
                slug: `/${compact([languageSlug, page.slug]).join('/')}`
            }))

            pages = [
                ...pages,
                ...templatePages
            ]
        }
    }

    const markdownPages = await readMarkdownPages()

    pages = [
        ...pages,
        ...markdownPages
    ]

    pages = pages.filter(page => {
        if (page.error) {
            console.log('page has error', page)
            return false
        }
        return true
    })

    await generatePageObjects(pages)

    const keywords = pages.reduce((result, page) =>
        uniq([
            ...result,
            ...(page.keywords ? page.keywords : [])
        ])
        , [])

    await fs.writeFile(basePath + `/pages.json`, JSON.stringify(pages, null, 2))
    await fs.writeFile(basePath + `/keywords.json`, JSON.stringify(keywords, null, 2))

    const result = perf.stop()

    console.log(`generated (${pages.length}) pages in ${result.words}`)
}

main()