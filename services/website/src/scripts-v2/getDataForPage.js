const fs = require('fs/promises')
const fm = require('front-matter')
const path = require('path')

const getDataForPage = async (filePath) => {

    const contentPath = __dirname + '/../../content'

    const dirPath = path.join(contentPath)

    const string = await fs.readFile(
        path.join(
            dirPath,
            filePath
        )
        , 'utf-8')

    string = replaceVariables(string)

    const data = fm(string)

    return fm(string).attributes
}

module.exports = getDataForPage