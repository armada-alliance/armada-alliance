import { useState, useContext } from 'react'
import axios from 'axios'
import moment from 'moment'
import lowerFirst from 'lodash/lowerFirst'
import Link from './Link'
import Context from './Context'
import NewsletterSection from '../NewsletterSection'
import { YouTubeIcon, DiscordIcon, TelegramIcon, GitHubIcon, TwitterIcon } from './icons'

const socials = [
    {
        name: 'YouTube',
        icon: YouTubeIcon,
        href: 'https://www.youtube.com/channel/UCligunhcmbMYaBUMvONsKwg'
    },
    {
        name: 'Discord',
        icon: DiscordIcon,
        href: 'https://discord.gg/Sqc398qk5a'
    },
    {
        name: 'Telegram',
        icon: TelegramIcon,
        href: 'https://t.me/armada_alli'
    },
    {
        name: 'Twitter',
        icon: TwitterIcon,
        href: 'https://twitter.com/alliance_armada'
    },
    {
        name: 'GitHub',
        icon: GitHubIcon,
        href: 'https://github.com/armada-alliance'
    }
]

function SubscribeForm() {

    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (submitting) return

        setSubmitting(true)

        await axios.request({
            method: 'post',
            url: 'https://api.sublayer.io/armada-api/newsletter/submit',
            headers: {
                'content-type': 'application/json'
            },
            data: {
                email
            }
        })

        setEmail('')
        setSubmitting(false)
    }

    return (
        <form className="mt-4 sm:flex sm:max-w-md" onSubmit={handleSubmit}>
            <label htmlFor="emailAddress" className="sr-only">
                Email address
            </label>
            <input
                type="email"
                name="emailAddress"
                id="emailAddress"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:placeholder-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                    disabled={submitting}
                    type="submit"
                    className="w-full bg-primary-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                    {submitting ? 'Sending...' : 'Subscribe'}
                </button>
            </div>
        </form>
    )
}

export default function Footer() {

    const { pages, schema } = useContext(Context)

    return (
        <>
            <NewsletterSection />
            <footer className="bg-white dark:bg-gray-900" aria-labelledby="footerHeading">
                <div className="max-w-7xl mx-auto py-12 px-4 md:px-6 lg:py-16 lg:px-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <p className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 items-center text-base text-gray-400 md:mt-0">
                            <div>
                                {moment().format('YYYY')} {schema.about.name}
                            </div>
                            <Link href={'/sitemap'}>
                                <a className="text-xs text-gray-600 dark:text-gray-400 font-bold px-2 py-1 rounded-md transition-colors bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100">{pages.length} pages generated {lowerFirst(moment(schema.createdAt).calendar())}</a>
                            </Link>
                        </p>
                        <div className="mt-6 md:mt-0 flex items-center justify-center md:justify-end space-x-3">
                            {socials.map(social => (
                                <a key={social.name} href={social.href} target="_blank" className="text-gray-300 hover:text-gray-500">
                                    <span className="sr-only">{social.name}</span>
                                    <social.icon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}