const perf = require('execution-time')()
const tables = require('../tables')
const fs = require('fs/promises')
const createContext = require('../context/createContext')

async function main() {

    perf.start()

    const ctx = await createContext()

    let resolvedTables = []
    let rowCounts = {}

    async function resolveTable(table) {

        try {
            if (resolvedTables.includes(table.id)) {
                return
            }
    
            if (table.dependsOn) {
    
                for (const tableId of table.dependsOn) {
                    const table = tables.find(table => table.id === tableId)
                    await resolveTable(table)
                }
            }
    
            let rows = await table.create(ctx)
    
            if (table.afterCreate) {
                rows = await table.afterCreate(ctx, rows)
            }
    
            rowCounts[table.id] = rows.length
    
            await fs.writeFile(__dirname + '/../../../public/tables/' + table.id + '.json', JSON.stringify(rows, null, 2))
    
            resolvedTables.push(table.id)
        } catch (e) {
            console.log(`Error resolving table ${table.id}:`)
            throw e
        }
    }

    for (const table of tables) {

        await resolveTable(table)
    }

    const result = perf.stop()

    console.log('============================')
    console.log(`Tables found: ${tables.length}`)
    console.log('============================')

    console.log(
        Object
            .keys(rowCounts)
            .map(key => {
                return `\t- ${key}: ${rowCounts[key]}`
            })
            .join('\n')
    )

    console.log('============================')
    console.log(`Finished in ${result.words}.`)
    console.log('============================')
}

main()