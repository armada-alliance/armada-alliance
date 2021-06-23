import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Container from './Container'
import Layout from './Layout'
import Link from './Link'
import pages from '../pages.json'
import languages from '../languages.json'

function PageList(props) {

    const { pages } = props

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {pages.map((page) => (
                    <li key={page.slug}>
                        <Link href={page.slug}>
                            <a className="block hover:bg-gray-50">
                                <div className="px-4 py-4 flex items-center sm:px-6">
                                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div className="truncate">
                                            <div className="text-sm">
                                                <p className="font-medium text-primary-500 truncate">{page.title}</p>
                                                <p className="font-normal text-gray-500">{page.slug}</p>
                                            </div>
                                            {/* <div className="mt-2 flex">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        <p>
                                                            Closing on <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                                                        </p>
                                                    </div>
                                                </div> */}
                                        </div>
                                        {/* <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                                                <div className="flex overflow-hidden -space-x-1">
                                                    {position.applicants.map((applicant) => (
                                                        <img
                                                            key={applicant.email}
                                                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                                            src={applicant.imageUrl}
                                                            alt={applicant.name}
                                                        />
                                                    ))}
                                                </div>
                                            </div> */}
                                    </div>
                                    <div className="ml-5 flex-shrink-0">
                                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function LanguageSection(props) {

    const { language } = props

    const [open, setOpen] = useState(false)

    const pagesForLanguage = pages.filter(page => page.language === language.id)

    return (
        <div className="select-none">
            <h2 className="flex items-center space-x-3 text-2xl font-bold rounded-lg -mx-4 px-4 py-4 hover:bg-gray-50 cursor-pointer" onClick={() => setOpen(!open)}>
                <div>{language.icon}</div>
                <div>{language.name}</div>
                <div className="text-gray-400">({pagesForLanguage.length})</div>
            </h2>
            {open ? (
                <div className="mt-4">
                    <PageList
                        pages={pagesForLanguage}
                    />
                </div>
            ) : null}
        </div>
    )
}

export default function Example() {

    return (
        <Layout>
            <Container>
                {languages.map(language => {

                    return (
                        <LanguageSection
                            key={language.id}
                            language={language}
                        />
                    )
                })}
            </Container>
        </Layout>
    )
}
