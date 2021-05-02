const fs = require("fs")
const basePath = __dirname + "/.."

const files = fs.readdirSync(basePath + "/registry")

const pools = files
    .map(file => {
        const data = require(basePath + "/registry/" + file)
        const stats = fs.statSync(basePath + "/registry/" + file)
        console.log(stats)
        const { birthtime } = stats
        return {
            ...data,
            memberSince: birthtime
        }
    })
    .sort((a, b) =>
        new Date(a.memberSince) - new Date(b.memberSince)
    )

module.exports = pools