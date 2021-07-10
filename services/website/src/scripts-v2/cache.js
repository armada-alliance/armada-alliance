const fsSync = require('fs')
const fs = require('fs/promises')

let cache = null

try {
    cache = JSON.parse(fsSync.readFileSync(__dirname + '/cache.json'))
} catch (e) {
    cache = {}
}

let promise = Promise.resolve()

async function setCacheItem(key, value) {
    cache[key] = value
    await promise
    promise = fs.writeFile(__dirname + '/cache.json', JSON.stringify(cache, null, 2))
}

function getCacheItem(key) {
    return cache[key]
}

module.exports = {
    setCacheItem,
    getCacheItem
}