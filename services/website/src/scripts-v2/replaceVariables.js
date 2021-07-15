const template = require('lodash/template')

function replaceVariables(input) {
    return template(input)({
        environment: {
            HOST: process.env.HOST
        },
        data: {}
    })
}

module.exports = replaceVariables