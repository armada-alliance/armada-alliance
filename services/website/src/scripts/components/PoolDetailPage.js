const getPagesForTemplate = require('../getPagesForTemplate')
const getDataForPage = require('../getDataForPage')

const createSocialLink = (baseURL, value) => value.indexOf('https://') === 0 ? value : `${baseURL}/${value}`

module.exports = {
    id: 'PoolDetailPage',
    name: 'Stake Pool',
    type: 'Template',
    changefreq: 'hourly',
    priority: 1.0,
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),
    transformPage: async (ctx, props) => {

        const data = await getDataForPage(props.filePath)
        const pool = ctx.tables.get('pools').find(pool => pool.id === props.id)

        return {
            ...props,
            title: `${pool.name} (${pool.ticker})`,
            image: pool.image,
            description: pool.description,
            verified: data.verified
        }
    },
    resolve: (ctx, props) => {

        const pool = ctx.tables.get('pools').find(pool => pool.id === props.id)

        return {
            ...props,
            pool
        }
    },
    components: [
        { type: 'Layout' },
        {
            type: 'PageHeader',
            resolve: (ctx, props) => ({
                title: props.pool.name,
                subtitle: props.pool.ticker,
                image: props.pool.image,
                pageType: 'Stake Pool',
                identities: props.identities
            })
        },
        {
            type: 'PageExcerpt',
            resolve: (ctx, props) => ({
                alignLeft: !!props.body,
                excerpt: props.pool.description
            })
        },
        {
            type: 'PageContent',
            resolve: (ctx, props) => ({
                mdxSource: props.mdxSource,
                filePath: props.filePath,
                updatedAt: props.updatedAt
            })
        },
        {
            type: 'PageSocials',
            resolve: (ctx, props) => {
                const types = [
                    { id: 'email', color: '#202020', icon: 'EmailIcon', createLink: value => ({ title: 'E-mail', href: `mailto:${value}` }) },
                    { id: 'telegram', color: '#24a1dd', icon: 'TelegramIcon', createLink: value => ({ title: 'Telegram', href: createSocialLink(`https://t.me`, value) }) },
                    { id: 'twitter', color: '#1DA1F1', icon: 'TwitterIcon', createLink: value => ({ title: 'Twitter', href: createSocialLink(`https://twitter.com`, value) }) },
                    { id: 'github', color: '#202020', icon: 'GitHubIcon', createLink: value => ({ title: 'GitHub', href: createSocialLink(`https://github.com`, value) }) },
                    { id: 'facebook', color: '#4867AA', icon: 'FacebookIcon', createLink: value => ({ title: 'Facebook', href: value }) },
                    { id: 'instagram', color: '#BE32AB', icon: 'InstagramIcon', createLink: value => ({ title: 'Instagram', href: value }) },
                    { id: 'linkedin', color: '#0177B5', icon: 'LinkedInIcon', createLink: value => ({ title: 'LinkedIn', href: createSocialLink(`https://www.linkedin.com/in`, value) }) },
                    { id: 'youtube', color: '#FF0000', icon: 'YouTubeIcon', createLink: value => ({ title: 'YouTube', href: createSocialLink('https://youtube.com', value) }) },
                    { id: 'discord', color: '#404eed', icon: 'DiscordIcon', createLink: value => ({ title: 'Discord', href: value }) },
                    { id: 'website', color: '#0ea5e9', icon: 'WebsiteIcon', createLink: value => ({ title: 'Website', href: value }) }
                ]

                const socials = types
                    .filter(type => props.pool[type.id])
                    .map(type => {
                        return {
                            id: type.id,
                            icon: type.icon,
                            color: type.color,
                            link: type.createLink(props.pool[type.id])
                        }
                    })
                return { socials, badges: props.badges || [] }
            }
        },
        {
            type: 'ContentSections',
            resolve: (ctx, props) => ({
                contentSections: props.contentSections
            })
        },
        {
            type: 'QualityReportSection',
            resolve: (ctx, props) => {

                const checks = ctx.tables.get('checks')
                const result = checks.find(check => check.poolId === props.id)

                return {
                    qualityScore: props.pool.qualityScore,
                    rules: result.results,
                }
            }
        },
        {
            type: 'DelegationSection',
            resolve: (ctx, props) => ({
                pools: ctx.tables.get('pools'),
                pool: props.pool
            })
        }
    ]
}