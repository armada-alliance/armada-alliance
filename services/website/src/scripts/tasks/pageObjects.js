const perf = require('execution-time')()
const _colors = require('colors');
const createContext = require('../context/createContext')
const mkdirp = require('mkdirp')
const path = require('path')
const rmfr = require('rmfr')
const basePath = path.resolve(__dirname + "/../../../public/pages")
const Throttle = require('promise-parallel-throttle')
const cliProgress = require('cli-progress')
const fs = require('fs/promises')
const getDataForComponent = require('../getDataForComponent')
const getPageData = require('../getPageData')
let cache = {
    createdDirs: {}
}

async function main() {

    perf.start('global')

    // create new progress bar
    const b1 = new cliProgress.SingleBar({
        format: 'Generating static pages ({value}/{total}) ' + _colors.cyan(' {bar}') + ' {percentage}% {eta_formatted}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        // hideCursor: true
    });

    const ctx = await createContext()

    const pages = await ctx.tables.get('pages')

    // initialize the bar - defining payload token "speed" with the default value "N/A"
    b1.start(pages.length, 0, {
        speed: "N/A"
    });

    await rmfr(basePath)

    let errorCount = 0

    let componentCounts = {}

    await Throttle.sync(
        pages.map(page => async () => {

            componentCounts[page.template] = componentCounts[page.template] || 0
            componentCounts[page.template]++

            perf.start(page.slug)

            const filePath = path.join(basePath, page.slug === "/" ? "/index" : page.slug)

            const dirname = path.dirname(filePath)

            if (!cache.createdDirs[dirname]) {
                await mkdirp(dirname)
                cache.createdDirs[dirname] = true
            }


            if (page.filePath) {
                const pageData = await getPageData(page.filePath)

                page = {
                    ...page,
                    ...pageData
                }
            }

            const data = await getDataForComponent(ctx)({
                type: page.template,
                props: page,
                invalidate: true,
                resolve: (ctx, props) => ({
                    ...props,
                    title: page.title,
                    description: page.description,
                    slug: page.slug,
                    origin: page.origin,
                    source: '/pages' + (page.slug === '/' ? '/index' : page.slug) + '.json',
                })
            })

            if (data.error) {
                errorCount++
            }

            await fs.writeFile(filePath + '.json', JSON.stringify(data, null, 2))

        })
        , {
            maxInProgress: 50,
            progressCallback: (params) => {
                b1.update(params.amountDone)
            }
        })

    b1.stop()

    console.log(`============================`)
    console.log(`Pages found: ${pages.length}`)
    console.log(`============================`)

    const result = perf.stop('global')

    console.log(
        Object
            .keys(componentCounts)
            .map(key => {
                return `\t- ${key}: ${componentCounts[key]}`
            })
            .join('\n')
    )

    console.log(`============================`)
    console.log(`Finished in ${result.words} with (${errorCount}) errors.`)
    console.log(`============================`)
}

main()