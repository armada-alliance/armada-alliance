import CopyToClipboard from './CopyToClipboard'
import Tooltip from './Tooltip'

function formatAddress(input) {
    return [input.slice(0, 15), '...', input.slice(-15)].join('')
}

export default function HashLink({ href, hash }) {

    return (
        <div className="flex items-center">
            <Tooltip text="Go to CardanoScan explorer">
                <a href={href} target="_blank" className="inline-flex bg-gray-50 text-gray-500 rounded-lg px-4 py-3 tracking-wider text-xs sm:text-sm hover:underline cursor-pointer">
                    {formatAddress(hash)}
                </a>
            </Tooltip>
            <CopyToClipboard text={href} />
        </div>
    )
}