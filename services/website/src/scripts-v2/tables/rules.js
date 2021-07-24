const readMarkdownPages = require('../../scripts/readMarkdownPages')
const getPageData = require('../getPageData')

module.exports = {
    id: "rules",
    create: async () => {

        const pages = await readMarkdownPages()

        const rulePages = pages.filter(page => page.template === "RuleDetailPage")

        return Promise.all(
            rulePages.map(async rulePage => {

                const ruleId = rulePage.params.filename

                return {
                    id: ruleId,
                    name: rulePage.title,
                    number: rulePage.number
                }
            })
        )
    }
}