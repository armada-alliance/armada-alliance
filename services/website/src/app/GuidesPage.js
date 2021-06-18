import { useState, useContext } from 'react'
import Layout from './Layout'
import ContentContainer from './ContentContainer'
import * as icons from './icons'
import uniq from 'lodash/uniq'
import intersection from 'lodash/intersection'
import cx from 'classnames'
import Context from './Context'
import Link from './Link'
import pages from '../pages'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Guides({ guides }) {

    const [filters, setFilters] = useState([])

    const toggleTopic = topic => {

        if (filters.includes(topic)) {
            setFilters(
                filters.filter(t => t !== topic)
            )
            return
        }

        setFilters([
            ...filters,
            topic
        ])
    }

    const topics = guides.reduce((result, guide) => {

        if (!guide.labels) return result

        result = uniq([
            ...result,
            ...guide.labels
        ])

        return result.sort((a, b) => a.localeCompare(b))
    }, [])

    let filteredGuides = guides

    if (filters.length) {

        filteredGuides = guides.filter(guide =>
            intersection(filters, guide.labels).length
        )
    }

    return (
        <div>
            <div className="flex justify-center items-center space-x-1 select-none">
                {topics.map(topic => {

                    return (
                        <div className={cx("flex-shrink-0 inline-block px-4 py-1 text-sm font-medium rounded-full cursor-pointer", filters.includes(topic) ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200")} onClick={() => toggleTopic(topic)}>
                            {topic}
                        </div>
                    )
                })}
            </div>
            <div className="mt-6 rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                {filteredGuides.map((guide, index) => {

                    const Icon = icons[guide.icon]

                    return (
                        <Link key={guide.title} href={guide.slug}>
                            <a
                                className={classNames(
                                    index === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                                    index === 1 ? 'sm:rounded-tr-lg' : '',
                                    index === guides.length - 2 ? 'sm:rounded-bl-lg' : '',
                                    index === guides.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                                    'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500'
                                )}
                            >
                                <div>
                                    <span
                                        className={classNames(
                                            'rounded-lg inline-flex p-3 ring-4 ring-white bg-gray-100'
                                        )}
                                    >
                                        {Icon ? (<Icon className="h-6 w-6" aria-hidden="true" />) : <div className="text-xl w-6 h-6 flex items-center justify-center">{guide.icon}</div>}
                                    </span>
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-lg font-medium">
                                        <div>
                                            {guide.title}
                                        </div>
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {guide.description}
                                    </p>
                                    {guide.labels ? (
                                        <div className="mt-4 flex items-center space-x-1">
                                            {guide.labels.map(label => {
                                                return (
                                                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-gray-100 rounded-full">
                                                        {label}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    ) : null}
                                </div>
                                <span
                                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                    aria-hidden="true"
                                >
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                    </svg>
                                </span>
                            </a>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}


export default function GuidesPage(props) {

    const ctx = useContext(Context)

    const guides = pages.filter(page => page.template === "GuideDetailPage" && page.language === ctx.language)

    return (
        <Layout>
            <ContentContainer>
                <h1>
                    <span className={"mt-2 block text-3xl leading-8 text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl"}>
                        {props.page.title}
                    </span>
                </h1>
                <div className="mt-8 space-y-12">
                    <Guides
                        guides={guides}
                    />
                </div>
            </ContentContainer>
        </Layout >
    );
}