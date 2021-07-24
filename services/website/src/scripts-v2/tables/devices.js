const readMarkdownPages = require('../../scripts/readMarkdownPages')

module.exports = {
    id: "devices",
    create: async () => {

        const pages = await readMarkdownPages()

        const devicePages = pages.filter(page => page.template === "DeviceDetailPage")

        return Promise.all(
            devicePages.map(async devicePage => {

                return {
                    id: devicePage.params.filename,
                    name: devicePage.title,
                    platform: devicePage.platform,
                    storage: devicePage.storage,
                    processor: devicePage.processor,
                }
            })
        )
    }
}