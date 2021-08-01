const getPagesForTemplate = require('../getPagesForTemplate')

const createSocialLink = (baseURL, value) => value.indexOf('https://') === 0 ? value : `${baseURL}/${value}`

module.exports = {
    id: 'IdentityDetailPage',
    name: 'Identity',
    type: 'Template',
    getPages: async (ctx, { component }) => getPagesForTemplate(component.id),
    transformPage: async (ctx, page) => {

        const identity = ctx.tables.get('identities').find(identity => identity.id === page.id)

        if (!identity) {
            console.log('page', page)
        }

        return {
            ...page,
            title: identity.name,
            image: identity.image,
            description: identity.description
        }
    },
    resolve: (ctx, props) => {

        const identity = ctx.tables.get('identities').find(identity => identity.id === props.id)

        return {
            ...props,
            identity
        }
    },
    components: [
        { type: 'Layout' },
        {
            type: 'PageHeader',
            resolve: (ctx, props) => {

                return {
                    title: props.identity.name,
                    subtitle: `@${props.id}`,
                    image: props.identity.image,
                    verified: props.verified,
                    pageType: 'Identity'
                }
            },
        },
        {
            type: 'PageExcerpt',
            resolve: (ctx, props) => ({
                alignLeft: !!props.body,
                excerpt: props.identity.description
            })
        },
        {
            type: 'PageContent',
            resolve: (ctx, props) => {

                return {
                    mdxSource: props.mdxSource,
                    filePath: props.filePath,
                    externalLink: props.externalLink ? ({
                        url: props.externalLink,
                        name: 'Go to website'
                    }) : null,
                    updatedAt: props.updatedAt,
                    donationName: props.identity.name,
                    donationAddress: props.donationAddress,
                }
            }
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
                    .filter(type => props.identity[type.id])
                    .map(type => {
                        return {
                            id: type.id,
                            icon: type.icon,
                            color: type.color,
                            link: type.createLink(props.identity[type.id])
                        }
                    })
                return { socials, badges: props.badges || [] }
            }
        },
        {
            type: 'PostPagesSection',
            resolve: (ctx, props) => {

                const pages = ctx.tables.get('pages').filter(page => {
                    return (page.identities || []).find(identity => {
                        return identity.id === props.id
                    })
                })

                return {
                    pages
                }
            }
        }
    ]
}