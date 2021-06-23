import { useContext } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Layout from './Layout'
import ContentContainer from './ContentContainer'
import Link from './Link'
import Context from './Context'
import pages from '../pages'
import markdownToText from 'markdown-to-text'

export default function TermsMainPage(props) {

    const ctx = useContext(Context)

    const termPages = pages.filter(page => page.template === "TermDetailPage" && page.language === ctx.language)

    return (
        <Layout>
            <ContentContainer>
                <h1>
                    <span className={"mt-2 block text-3xl leading-8 text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl"}>
                        {props.page.title}
                    </span>
                </h1>
                <div className="mt-8">
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {termPages.map((page) => (
                                <li key={page.slug}>
                                    <Link href={page.slug}>
                                        <a className="block hover:bg-gray-50">
                                            <div className="px-4 py-4 flex items-center sm:px-6">
                                                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                                    <div className="truncate">
                                                        <div className="text-sm">
                                                            <p className="font-medium text-primary-500 truncate">{markdownToText(page.title)}</p>
                                                            <p className="font-normal text-gray-500 overflow-ellipsis overflow-hidden">{markdownToText(page.description)}</p>
                                                        </div>
                                                    </div>
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
                </div>
            </ContentContainer>
        </Layout >
    );
}