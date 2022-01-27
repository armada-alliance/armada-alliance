const tables = require('../tables')

let ctx = {}

const tablesClient = {
    get: (name) => {
        try {
            const table = tables.find(table => table.id === name)
            const rows = require(__dirname + '/../../../public/tables/' + name + '.json')
            if (table.transformRow) {
                return rows.map(row => table.transformRow(ctx, row))
            }
            return rows
        } catch (e) {
            // console.log(e)
            return null
        }
    }
}

ctx.tables = tablesClient

module.exports = () => {

    return ctx
}