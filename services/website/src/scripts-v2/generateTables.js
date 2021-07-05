const tables = require('./tables')
const createDb = require('./db')

async function main() {

    const table = tables.find(table => table.id === "languages")

    const db = await createDb()

    const fields = table.fields.map(field => `${field.id} ${field.type}${field.id === "id" ? " PRIMARY KEY" : " NOT NULL"}`).join(', ')
    const fieldNames = table.fields.map(field => field.id)
    // console.log(`CREATE TABLE ${table.id} (${fields})`)
    await db.run(`DROP TABLE IF EXISTS ${table.id}`);
    await db.run(`CREATE TABLE ${table.id} (${fields})`);

    const rows = await table.loadTable()

    await Promise.all(
        rows.map(async row => {

            const values = fieldNames.reduce((result, id) => {
                result[id] = row[id]
                return result
            }, {})

            await db.run(
                `INSERT INTO ${table.id} (${Object.keys(values).join(', ')}) VALUES (${Object.keys(values).map(() => '?').join(', ')})`,
                Object.values(values)
            )
        })
    )
}

main()