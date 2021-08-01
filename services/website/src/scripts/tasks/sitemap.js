const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const createContext = require('../context/createContext')
const fs = require('fs/promises')

async function main() {

    // https://developers.google.com/search/docs/advanced/crawling/localized-versions

    const ctx = await createContext()

    const pages = ctx.tables.get('pages')
    const templates = ctx.tables.get('templates')
    const templatesById = templates.reduce((result, template) => {
        result[template.id] = template
        return result
    }, {})

    // An array with your links
    // const links = [{ url: '/page-1/', changefreq: 'daily', priority: 0.3 }]
    const links = pages
        .filter(page => !page.hidden)
        .map(page => ({
            url: page.slug,
            // links: [
            //     { lang: 'en', url: 'http://test.com/page-1/' },
            //     { lang: 'ja', url: 'http://test.com/page-1/ja/' }
            //   ],        
            links: pages.filter(p => p.origin === page.origin).map(page => ({
                lang: page.language,
                url: process.env.HOST + page.slug
            })),
            img: page.image,
            lastmod: page.updatedAt,
            changefreq: templatesById[page.template].changefreq,
            priority: templatesById[page.template].priority
        }))

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: process.env.HOST })

    // Return a promise that resolves with your XML string
    const xml_string = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
        data.toString()
    )

    await fs.writeFile(__dirname + '/../../../public/sitemap.xml', xml_string)
}

main()