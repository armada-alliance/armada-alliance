import { useState, useContext } from 'react'
import axios from 'axios'
import moment from 'moment'
import lowerFirst from 'lodash/lowerFirst'
import Link from './Link'
import Context from './Context'

function SubscribeForm() {

    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (submitting) return

        setSubmitting(true)

        await axios.request({
            method: 'post',
            url: 'https://webhook.site/00500e52-15ea-49db-bd34-8645c07f6ea3',
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
                    className="w-full bg-primary-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
        <footer className="bg-white" aria-labelledby="footerHeading">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        {/* {navigation.social.map((item) => (
                            <a key={item.name} href={item.href} target="_blank" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">{item.name}</span>
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                            </a>
                        ))} */}
                    </div>
                    <p className="mt-8 flex items-center text-base text-gray-400 md:mt-0 md:order-1">
                        <div>
                            {moment().format('YYYY')} {schema.about.name}
                        </div>
                        <Link href={'/sitemap'}>
                            <a className="ml-2 text-xs text-gray-600 font-bold px-2 py-1 rounded-md bg-gray-50 hover:bg-gray-100">{pages.length} pages generated {lowerFirst(moment(schema.createdAt).calendar())}</a>
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}