const { execSync } = require("child_process")
const fs = require("fs")
const basePath = __dirname + "/.."

const files = fs.readdirSync(basePath + "/registry")

function getGitCreationTimeForFile(file) {
    const dateString = execSync(`git log --format=%aD ${file} | tail -1`).toString().split("\n").join("")
    return new Date(dateString)
}

const pools = files
    .map(file => {
        const data = require(basePath + "/registry/" + file)
        const memberSince = getGitCreationTimeForFile(basePath + "/registry/" + file)
        return {
            ...data,
            memberSince
        }
    })
    .sort((a, b) =>
        new Date(a.memberSince) - new Date(b.memberSince)
    )

module.exports = pools