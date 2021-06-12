const fs = require('fs').promises
const dotenv = require('dotenv')
const compact = require('lodash/compact')
const dashify = require('./dashify')
dotenv.config()
const translate = require('./translate')
const pools = require('../services/website/src/pools_extended.json')
const basePath = __dirname + "/.."
const languages = [
    { id: 'en', icon: '🇬🇧', name: 'English', translateSlug: true },
    { id: 'ca', icon: '🐎', name: 'Català', translateSlug: true },
    { id: 'es', icon: '🇪🇸', name: 'Español', translateSlug: true },
    { id: 'de', icon: '🇩🇪', name: 'Deutsch', translateSlug: true },
    { id: 'nl', icon: '🇳🇱', name: 'Nederlands', translateSlug: true },
    { id: 'ms', icon: '🇲🇾', name: 'Melayu', translateSlug: true },
    { id: 'pt', icon: '🇵🇹', name: 'Português', translateSlug: true },
    { id: 'fi', icon: '🇫🇮', name: 'Suomeksi', translateSlug: true },
    { id: 'it', icon: '🇮🇹', name: 'Italiano', translateSlug: true },
    { id: 'th', icon: '🇹🇭', name: 'ไทย', translateSlug: false },
]

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

    await fs.writeFile(basePath + `/services/website/src/pages.json`, JSON.stringify(pages, null, 2))

    console.log(`generated (${pages.length}) pages :)`)
}

main()