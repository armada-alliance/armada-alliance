const trim = require('lodash/trim')
const fs = require('fs')
const { execSync } = require('child_process')

async function main() {

    const result = execSync(`git ls-tree -r --name-only HEAD | while read filename; do
    echo "$(git log -1 --format="%aD" -- $filename) === $filename"
  done`).toString()

    console.log(result)

    const items = result
        .split('\n')
        .filter(line => line.length)
        .map(item => {

            let [date_string, file_string] = item.split('===').map(trim)

            return {
                date: new Date(date_string),
                file: file_string
            }
        })
        .reduce((result, item) => {
            result[item.file] = item.date
            return result
        }, {})

    fs.writeFileSync(__dirname + '/../../../public/files.json', JSON.stringify(items, null, 2))

}

main()
