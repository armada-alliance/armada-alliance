import React, { useContext, useEffect, useState } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import ReactPlayer from 'react-player'
import markdownComponents from './markdownComponents'
import cx from 'classnames'
import * as icons from './icons'
import Link from './Link'
import Image from './Image'
import Context from './Context'
import ImagesSection from './ImagesSection'

function Page(props) {

    const ctx = useContext(Context)

    const page = ctx.pages.find(page => page.slug === props.url)

    if (!page) {
        return (
            <div>
                Page: {props.url} not found
            </div>

        )
    }

    const Icon = icons[page.icon]

    return (
        <Link href={page.slug}>
            <div
                key={page.title}
                className={cx(
                    'rounded-lg shadow-sm hover:shadow-md cursor-pointer relative group bg-white dark:bg-gray-800 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500'
                )}
            >
                <div>
                    <span
                        className={cx(
                            'inline-flex p-3 ring-4 ring-white dark:ring-gray-700 bg-gray-100 dark:bg-gray-700 relative',
                            page.template === "IdentityDetailPage" ? "rounded-full" : "rounded-lg"
                        )}
                    >
                        {Icon ? (<Icon className="h-6 w-6" aria-hidden="true" />) : <div className="text-xl w-6 h-6 flex items-center justify-center">{page.icon}</div>}
                        {page.image ? (
                            <Image
                                src={page.image}
                                className="absolute inset-0"
                            />
                        ) : null}
                    </span>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-medium dark:text-gray-100 dark:group-hover:text-white">
                        <div>
                            <span className="absolute inset-0" aria-hidden="true" />
                            {page.title}
                        </div>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        {page.description}
                    </p>
                </div>
                <span
                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400 dark:text-gray-400 dark:group-hover:text-gray-200"
                    aria-hidden="true"
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                </span>
            </div>
        </Link>

    )
}

function YoutubeVideo({ url, description }) {

    const [init, setInit] = useState(true)

    // useEffect(() => {
    //     if (init) return
    //     let timeout = null
    //     if (process.browser) {
    //         timeout = setTimeout(() => setInit(true), 1000)
    //     }
    //     return () => clearTimeout(timeout)
    // })
    return (
        <div className="mb-8 w-full">
            <div
                className="w-full bg-gray-100 dark:bg-gray-700 relative rounded-lg overflow-hidden shadow-md"
                style={{
                    WebkitMaskImage: "-webkit-radial-gradient(white, black)", // Safari HACK for rounded corners,
                    paddingTop: '56%'
                }}
            >
                {init ? (
                    <ReactPlayer
                        className="absolute inset-0"
                        width={'100%'}
                        height={'100%'}
                        url={url}
                        controls={true}
                    />
                ) : null}
            </div>
            <div className="flex justify-end">
                {description ? (
                    <div className="mt-1.5 uppercase font-light text-sm text-gray-400 dark:text-gray-600">
                        {description}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

const components = {
    YoutubeVideo,
    ImagesSection: (props) => <div className="w-full"><ImagesSection {...props} alternate={true} /></div>,
    Page,
    ...markdownComponents({ spacingEnabled: true })
}

const MarkdownContent = props => (
    <div>
        <MDXRemote {...props.source} components={components} />
    </div>
)

export default MarkdownContent