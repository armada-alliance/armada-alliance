import { ChevronRightIcon } from '@heroicons/react/solid'
import Layout from './Layout'
import ContentContainer from './ContentContainer'
import Link from './Link'
import Component from './Component'
import markdownToText from 'markdown-to-text'

export default function AAIPsPage(props) {

    const { title, pages } = props.props

    return (
        <Component use={Layout} data={props.components.Layout}>
            <ContentContainer>
                <h1>
                    <span className={"mt-2 block text-3xl leading-8 text-center font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl"}>
                        {title}
                    </span>
                </h1>
                <div className="mt-8">
                    <div className="bg-white dark:bg-gray-900 shadow border border-gray-50 dark:border-gray-800 overflow-hidden rounded-md">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                            {pages.map((page) => (
                                <li key={page.slug}>
                                    <Link href={page.slug}>
                                        <a className="block hover:bg-gray-50 dark:hover:bg-gray-800">
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
        </Component>
    );
}