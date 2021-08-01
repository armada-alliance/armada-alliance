const readMarkdownPages = require('../readMarkdownPages')

module.exports = {
    id: "identities",
    dependsOn: ['pools'],
    create: async (ctx) => {

        const pages = await readMarkdownPages()

        const identityPages = pages.filter(page => page.template === "IdentityDetailPage")

        const pools = ctx.tables.get('pools')
        const poolsByIdentity = pools.reduce((result, pool) => {

            pool.identities.forEach(identity => {
                const identityId = identity.id
                result[identityId] = result[identityId] || []

                if (!result[identityId].includes(pool.id)) {
                    result[identityId].push(pool.id)
                }
            })

            return result
        }, {})

        const identities = identityPages.map(identityPage => {

            const identityId = identityPage.params.filename

            return {
                id: identityId,
                name: identityPage.title,
                description: identityPage.description,
                image: identityPage.image || 'https://armada-alliance.com/assets/ship-420.png',
                telegram: identityPage.telegram,
                twitter: identityPage.twitter,
                website: identityPage.website,
                github: identityPage.github,
                discord: identityPage.discord,
                facebook: identityPage.facebook,
                youtube: identityPage.youtube,
                instagram: identityPage.instagram,
                email: identityPage.email,
                linkedin: identityPage.linkedin,
                link: {
                    name: identityPage.title,
                    href: '/identities/' + identityId
                },
                pools: poolsByIdentity[identityId] || []
            }
        })

        return identities
    },
}