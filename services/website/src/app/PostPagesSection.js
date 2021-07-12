import markdownToText from 'markdown-to-text'
import Link from './Link'
import { ChevronRightIcon } from '@heroicons/react/solid'
import moment from 'moment'

function Pages({ pages }) {

    const order = ['content', 'generated']

    const sortedPages = pages
        .sort((a, b) =>
            moment(b.updatedAt).valueOf() - moment(a.updatedAt).valueOf()
        )
        .sort((a, b) => {
            return order.indexOf(a.type) - order.indexOf(b.type)
        })

    return (
        <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {sortedPages.map((page) => (
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
    )
}

export default function PostPagesSection({ pages }) {

    return (
        <>
            {pages && pages.length ? (
                <div className="mt-8">
                    <div className="flex items-center">
                        <h2 className="text-2xl font-bold">
                            Pages
                </h2>
                        <span className="bg-primary-100 text-primary-800 ml-3 py-1 px-3 rounded-full text-sm font-medium">
                            {pages.length}
                        </span>
                    </div>
                    <div className="mt-4">
                        <Pages pages={pages} />
                    </div>
                </div>
            ) : null}
        </>
    )
}