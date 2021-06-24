const { execSync } = require("child_process")

function getGitCreatedTimeForFile(file) {
    const output = execSync(`git log --format=%aD ${file} | tail -1`).toString()
    const dateString = output.split("\n").join("")
    return new Date(dateString)
}

function getGitUpdatedTimeForFile(file) {
    const output = execSync(`git log --format=%aD ${file} | head -1`).toString()
    const dateString = output.split("\n").join("")
    return new Date(dateString)
}

module.exports = { getGitCreatedTimeForFile, getGitUpdatedTimeForFile }