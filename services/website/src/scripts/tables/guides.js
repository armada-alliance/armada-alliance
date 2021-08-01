const readMarkdownPages = require('../readMarkdownPages')

module.exports = {
    id: "guides",
    create: async () => {
        const pages = await readMarkdownPages()

        return pages.filter(page => page.template === "GuideDetailPage")
    }
}