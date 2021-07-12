const tablesClient = {
    get: (name) => {
        return require(__dirname + '/../../../public/tables/' + name + '.json')
    }
}

const ctx = {
    tables: tablesClient
}

module.exports = () => {

    return ctx
}