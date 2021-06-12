const fs = require('fs/promises')
const walk = require('walkdir')
const fm = require('front-matter')
const path = require('path')
const compact = require('lodash/compact')

async function main() {

    const paths = walk.sync(__dirname + '/../pages');
    console.log('found paths sync: ', paths);

    const pages = await Promise.all(
        paths.map(async filePath => {

            const dirPath = path.join(__dirname + '/../pages')
            const relPath = filePath.replace(dirPath, '')

            const ignorePaths = ['/README.md']

            if (ignorePaths.includes(relPath)) {
                return null
            }

            if (relPath.slice(-3) !== '.md') {
                return null
            }

            try {

                const string = await fs.readFile(filePath, 'utf-8')

                const data = fm(string)

                return {
                    source: relPath,
                    meta: data.attributes,
                    body: data.body
                }

            } catch (e) {

                return {
                    source: relPath,
                    error: e.message
                }
            }

        })
    )

    fs.writeFile(__dirname + '/test.json', JSON.stringify(compact(pages), null, 2))
}

main()