module.exports = {
    id: 'SearchBox',
    type: 'Component',
    resolve: async (ctx, props) => {

        const pageTypes = [
            {
                name: 'Blogs',
                listLink: '/blogs',
                template: 'BlogDetailPage'
            },
            {
                name: 'Guides',
                listLink: '/guides',
                template: 'GuideDetailPage'
            },
            {
                name: 'Pools',
                listLink: '/stake-pools',
                template: 'PoolDetailPage'
            },
            {
                name: 'Identities',
                listLink: '/identities',
                template: 'IdentityDetailPage'
            },
            {
                name: 'Terms',
                listLink: '/terms',
                template: 'TermDetailPage'
            },
            {
                name: 'Improvement Proposals',
                listLink: '/aaips',
                template: 'AAIPDetailPage'
            },
        ]

        const templates = pageTypes.map(pageType => {

            return {
                id: pageType.template,
                name: pageType.name,
                moreLink: {
                    name: `Show all`,
                    href: pageType.listLink
                }
            }
        })

        return {
            templates
        }
    },
}