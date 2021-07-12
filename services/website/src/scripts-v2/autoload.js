const fs = require('fs')
const path = require('path')

module.exports = autoloadPath => {

    const items = []

    const files = fs.readdirSync(autoloadPath)

    files
        .filter(file => file !== 'index.js')
        .forEach(file => {
            const item = require(path.join(autoloadPath, file))
            items.push(item)
        });

    return items
}