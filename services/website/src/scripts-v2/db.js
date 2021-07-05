const sqlite3 = require('sqlite3')
const { open } = require('sqlite');

const createDb = async () => {

    const db = await open({
        filename: __dirname + '/../../db/database.db',
        driver: sqlite3.cached.Database
    })

    return db
}

module.exports = createDb