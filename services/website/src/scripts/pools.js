const { execSync } = require("child_process")
const fs = require("fs")
const path = require('path')
const basePath = path.join(__dirname, "../../")

const files = fs.readdirSync(path.join(basePath, "registry"))

function getGitCreationTimeForFile(file) {
    const output = execSync(`git log --format=%aD ${file} | tail -1`).toString()
    const dateString = output.split("\n").join("")
    console.log(`file: "${file}", output: "${dateString}"`)
    return new Date(dateString)
}

const pools = files
    .map(file => {
        const data = require(path.join(basePath, "registry", file))
        const memberSince = getGitCreationTimeForFile(path.join(basePath, "registry", file))
        return {
            ...data,
            memberSince
        }
    })
    .sort((a, b) =>
        new Date(a.memberSince) - new Date(b.memberSince)
    )

module.exports = pools