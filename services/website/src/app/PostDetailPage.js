import Layout from './Layout'
import ContentContainer from './ContentContainer'
import MDXContent from './MDXContent'
import MarkdownContent from './MarkdownContent'
import markdownToText from 'markdown-to-text'
import cx from 'classnames'
import Link from './Link'
import Image from './Image'
import { GitHubIcon } from './icons'
import QRCode from 'qrcode.react'
import CopyToClipboard from './CopyToClipboard'
import Tooltip from './Tooltip'
import { ChevronRightIcon, BadgeCheckIcon } from '@heroicons/react/solid'
import moment from 'moment'

function formatAddress(input) {
    return [input.slice(0, 15), '...', input.slice(-15)].join('')
}

function Identities({ identities }) {

    return (
        <div className="mx-auto inline-flex items-center space-x-2">
            {/* <div className="text-gray-400 text-sm">
                written by
            </div> */}
            {identities.map((identity) => {

                return (
                    <Link key={identity.id} href={identity.slug}>
                        <a className="flex items-center px-3 py-2 space-x-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-50">
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(https://armada-alliance.com/assets${identity.image})` }} />
                            <div className="font-bold">
                                {identity.title}
                            </div>
                        </a>
                    </Link>

                )

            })}
        </div>
    )
}

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

export default function TermDetailPage(props) {

    return (
        <Layout>
            <ContentContainer>
                <div className="relative px-4 sm:px-6 lg:px-8">
                    <div className="max-w-prose mx-auto">
                        <div className="text-lg">
                            {props.page.image ? (
                                <div className="flex items-center justify-center mb-4">
                                    <div className="relative rounded-full overflow-hidden w-52 h-52 shadow-md">
                                        <Image
                                            src={props.page.image}
                                            className="absolute top-0 right-0 bottom-0 left-0"
                                        />
                                    </div>
                                </div>
                            ) : null}
                            <h1>
                                <span className="block text-base text-center text-primary-500 font-semibold tracking-wide uppercase">
                                    {props.type}
                                </span>
                                <span className={"mt-2 block text-3xl leading-8 text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl"}>
                                    {markdownToText(props.page.title)}
                                    {/* <Markdown children={props.page.title} /> */}
                                </span>
                            </h1>
                            {props.page.props.verified ? (
                                <div className="mt-2 flex justify-center">
                                    <div className="flex items-center space-x-1">
                                        <BadgeCheckIcon className="h-4 text-primary-500" />
                                        <div className="text-primary-500 text-sm">Verified</div>
                                    </div>
                                </div>
                            ) : null}
                            {props.page.props.identities ? (
                                <div className="py-6 flex justify-center">
                                    <Identities identities={props.page.props.identities} />
                                </div>
                            ) : null}
                            {/* <div className="flex items-center space-x-4">
                            {props.page.keywords.map(keyword => {
                                return (
                                    <div>
                                        {keyword}
                                    </div>
                                )
                            })}
                        </div> */}
                            {props.page.description ? (
                                <div className={cx("mt-4 text-xl font-normal text-gray-500 leading-8", props.page.props.body ? "text-left" : "text-center")}>
                                    <MarkdownContent
                                        source={props.page.description}
                                    />
                                </div>
                            ) : null}
                        </div>
                        {props.page.props.source ? (
                            <div className="mt-4 text-lg max-w-prose mx-auto">
                                <div className="mt-6 text-gray-500 font-light mx-auto">
                                    <MDXContent
                                        source={props.page.props.source}
                                    />
                                </div>
                            </div>
                        ) : null}
                        {props.page.props.externalLink ? (
                            <div className="mt-12 flex justify-center">
                                <Link href={props.page.props.externalLink}>
                                    <a
                                        target="_blank"
                                        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                    >
                                        Open the full {props.type.toLowerCase()}
                                    </a>
                                </Link>
                            </div>
                        ) : null}
                        {props.page.props.donationAddress ? (
                            <div className="p-6 rounded-lg bg-white flex flex-col sm:flex-row shadow-sm">
                                <div className="mr-4 flex-grow">
                                    <div className="text-lg font-bold">Support our work</div>
                                    <div className="text-gray-400 text-sm">Donate ADA to this address to support <strong>{props.page.title}</strong> directly.</div>
                                    <div className="mt-3 flex items-center">
                                        <Tooltip text="Go to CardanoScan explorer">
                                            <a href={`https://cardanoscan.io/address/${props.page.props.donationAddress}`} target="_blank" className="inline-flex bg-gray-50 text-gray-500 rounded-lg px-4 py-3 tracking-wider text-xs sm:text-sm hover:underline cursor-pointer">
                                                {formatAddress(props.page.props.donationAddress)}
                                            </a>
                                        </Tooltip>
                                        <CopyToClipboard text={props.page.props.donationAddress} />
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-0 flex-shrink-0 rounded-lg bg-white w-28 h-28 flex items-center justify-center">
                                    <QRCode value={props.page.props.donationAddress} renderAs={'svg'} size="100" />
                                </div>
                            </div>
                        ) : null}
                        <div className="mt-8 flex items-center justify-end">
                            <div className="mr-4 text-gray-400 text-sm">
                                Last updated on {moment(props.page.updatedAt).format('MMM DD, YYYY')}
                            </div>
                            <Link href={`https://github.com/armada-alliance/armada-alliance/tree/staging/services/website/content${props.page.params.source}`}>
                                <a
                                    target="_blank"
                                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    <GitHubIcon className="h-4 mr-1" />Edit on GitHub
                            </a>
                            </Link>
                        </div>
                        {props.page.props.pages && props.page.props.pages.length ? (
                            <div className="mt-8">
                             <div className="flex items-center">
                             <h2 className="text-2xl font-bold">
                                    Pages
                                  
                                </h2>
                                <span className="bg-primary-100 text-primary-800 ml-3 py-1 px-3 rounded-full text-sm font-medium">
                                    {props.page.props.pages.length}
                                </span>
                                 </div>
                                <div className="mt-4">
                                    <Pages pages={props.page.props.pages} />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </ContentContainer>
        </Layout>
    )
}