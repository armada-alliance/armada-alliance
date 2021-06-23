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

const legacy_templates = [
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
    // {
    //     id: 'PoolDetailPage',
    //     title: 'Stake Pool',
    //     getPages: async (props) => {
    //         const slug = dashify(props.originalTitle)

    //         let pages = []

    //         pools.forEach(pool => {

    //             const mergePages = [
    //                 { title: 'About', slug: 'about' },
    //                 { title: 'Delegators', slug: 'delegators' },
    //                 { title: 'Blocks', slug: 'blocks' },
    //                 { title: 'Assigned Slots', slug: 'assigned-slots' },
    //                 { title: 'Hardware', slug: 'hardware' },
    //                 { title: 'Issues', slug: 'issues' }
    //             ].map(tab => {

    //                 return {
    //                     ...props,
    //                     title: `${pool.name}${tab.slug === 'about' ? '' : ' / ' + tab.title}`,
    //                     origin: `${slug} — ${pool.id}${tab.slug === 'about' ? '' : '/' + tab.slug}`,
    //                     slug: `${dashify(props.translateSlug ? props.title : props.originalTitle)}/${pool.id}${tab.slug === 'about' ? '' : '/' + tab.slug}`,
    //                     params: {
    //                         poolId: pool.id,
    //                         tab: tab.slug
    //                     }
    //                 }
    //             })

    //             pages = [
    //                 ...pages,
    //                 ...mergePages
    //             ]
    //         })

    //         return pages
    //     }
    // },
]

async function main() {

    console.log(`generatePages started`)

    perf.start()

    let pages = []

    for (const template of legacy_templates) {

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


    const templates = [
        {
            id: "StakePoolDetailPage",
            page: "Stake Pool"
        },
        {
            id: "IdentitiesMainPage",
            page: "Page"
        },
        {
            id: "GuidesPage",
            name: "Page"
        },
        {
            id: "GuideDetailPage",
            name: "Guide"
        },
        {
            id: "ResourceDetailPage",
            name: "Resource"
        },
        {
            id: "IdentityDetailPage",
            name: "Identity"
        },
        {
            id: "SitemapPage",
            name: "Page"
        },
        {
            id: "BlogDetailPage",
            name: "Blog"
        },
        {
            id: "HomePage",
            name: "Page"
        },
        {
            id: "TermDetailPage",
            name: "Term"
        },
        {
            id: "RoadmapPage",
            name: "Page"
        },
        {
            id: "TermsMainPage",
            name: "Page"
        },
        {
            id: "PoolsMainPage",
            name: "Page"
        },
        {
            id: "PoolDetailPage",
            name: "Stake Pool"
        },
    ]

    await fs.writeFile(basePath + `/templates.json`, JSON.stringify(templates, null, 2))
    await fs.writeFile(basePath + `/pages.json`, JSON.stringify(pages, null, 2))
    await fs.writeFile(basePath + `/keywords.json`, JSON.stringify(keywords, null, 2))

    const result = perf.stop()

    console.log(`generated (${pages.length}) pages in ${result.words}`)
}

main()