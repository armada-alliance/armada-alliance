import { useState } from 'react'
import axios from 'axios'

export default function NewsletterSection() {


    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault()
        e.stopPropagation()

        if (submitting || submitted) return

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
        setSubmitted(true)
    }

    return (
        <div className="bg-white dark:bg-gray-900 pt-16 sm:pt-24">
            <div className="relative sm:py-16">
                <div aria-hidden="true" className="hidden sm:block">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 dark:bg-gray-800 rounded-r-3xl" />
                    <svg className="absolute top-8 left-1/2 -ml-3" width={404} height={392} fill="none" viewBox="0 0 404 392">
                        <defs>
                            <pattern
                                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200 dark:text-gray-700" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
                    </svg>
                </div>
                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="relative rounded-2xl px-6 py-10 bg-primary-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
                        <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                            <svg
                                className="absolute inset-0 h-full w-full"
                                preserveAspectRatio="xMidYMid slice"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 1463 360"
                            >
                                <path
                                    className="text-primary-500 text-opacity-40"
                                    fill="currentColor"
                                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                                />
                                <path
                                    className="text-primary-700 text-opacity-40"
                                    fill="currentColor"
                                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                                />
                            </svg>
                        </div>
                        <div className="relative">
                            {submitted ? (
                                <div className="sm:text-center">
                                    <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                                        You're now subscribed to our newsletter
                                    </h2>
                                </div>
                            ) : (
                                <>
                                    <div className="sm:text-center">
                                        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                                            Get notified when we release new content
                                        </h2>
                                        <p className="mt-6 mx-auto max-w-2xl text-lg text-primary-200">
                                            Sign up for our newsletter to stay up-to-date with the latest Armada Alliance news and updates.
                                        </p>
                                    </div>
                                    <form className="mt-12 sm:mx-auto sm:max-w-lg sm:flex" onSubmit={handleSubmit}>
                                        <div className="min-w-0 flex-1">
                                            <label htmlFor="cta-email" className="sr-only">
                                                Email address
                                            </label>
                                            <input
                                                id="cta-email"
                                                type="email"
                                                className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="mt-4 sm:mt-0 sm:ml-3">
                                            <button
                                                disabled={submitting}
                                                type="submit"
                                                className="block w-full rounded-md border border-transparent px-5 py-3 bg-primary-500 text-base font-medium text-white shadow hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 sm:px-10"
                                            >
                                                {submitting ? 'Sending...' : 'Subscribe'}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
