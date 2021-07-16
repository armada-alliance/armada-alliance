import MDXContent from './MDXContent'
import Link from './Link'
import { GitHubIcon } from './icons'
import QRCode from 'qrcode.react'
import CopyToClipboard from './CopyToClipboard'
import Tooltip from './Tooltip'
import moment from 'moment'
import * as icons from './icons'

function formatAddress(input) {
    return [input.slice(0, 15), '...', input.slice(-15)].join('')
}

export default function PageContent({ mdxSource, externalLink, pageType, donationName, donationAddress, editOnGitHubLink, updatedAt, socials }) {

    return (
        <>
            {mdxSource ? (
                <div className="mt-4 text-lg max-w-prose mx-auto">
                    <div className="mt-6 text-gray-500 font-light mx-auto">
                        <MDXContent
                            source={mdxSource}
                        />
                    </div>
                </div>
            ) : null}
            {externalLink ? (
                <div className="mt-12 flex justify-center">
                    <Link href={externalLink}>
                        <a
                            target="_blank"
                            className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Open the full {pageType.toLowerCase()}
                        </a>
                    </Link>
                </div>
            ) : null}
            {donationAddress ? (
                <div className="mt-8 p-6 rounded-lg bg-white flex flex-col sm:flex-row shadow-sm">
                    <div className="mr-4 flex-grow">
                        <div className="text-lg font-bold">Support our work</div>
                        <div className="text-gray-400 text-sm">Donate ADA to this address to support <strong>{donationName}</strong> directly.</div>
                        <div className="mt-3 flex items-center">
                            <Tooltip text="Go to CardanoScan explorer">
                                <a href={`https://cardanoscan.io/address/${donationAddress}`} target="_blank" className="inline-flex bg-gray-50 text-gray-500 rounded-lg px-4 py-3 tracking-wider text-xs sm:text-sm hover:underline cursor-pointer">
                                    {formatAddress(donationAddress)}
                                </a>
                            </Tooltip>
                            <CopyToClipboard text={donationAddress} />
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex-shrink-0 rounded-lg bg-white w-28 h-28 flex items-center justify-center">
                        <QRCode value={donationAddress} renderAs={'svg'} size="100" />
                    </div>
                </div>
            ) : null}
            <div className="mt-8 flex items-center justify-end">
                <div className="ml-auto flex items-center">
                    <div className="mr-4 text-gray-400 text-sm">
                        Last updated on {moment(updatedAt).format('MMM DD, YYYY')}
                    </div>
                    <Link href={editOnGitHubLink.href}>
                        <a
                            target="_blank"
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <GitHubIcon className="h-4 mr-1" />Edit on GitHub
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}