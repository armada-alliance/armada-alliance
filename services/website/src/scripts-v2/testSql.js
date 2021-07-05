const sqlite3 = require('sqlite3')
const { open } = require('sqlite');

(async () => {

    const db = await open({
        filename: __dirname + '/../../db/database.db',
        driver: sqlite3.cached.Database
    })

    await db.run("CREATE TABLE tbl (col TEXT)");

    const result = await db.run(
        'INSERT INTO tbl (col) VALUES (?)',
        'foo'
    )
})()