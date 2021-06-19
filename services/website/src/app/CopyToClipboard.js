import cx from 'classnames'
import { useEffect, useState } from 'react'

export default function CopyToClipboard(props) {

    const [hover, setHover] = useState(false)

    const [copied, setCopied] = useState(false)

    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        setInitialized(true)
    })

    const handleCopy = () => {

        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }

    return (
        <button className="hidden sm:flex sm:items-center sm:justify-center relative w-9 h-9 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 text-gray-400 hover:text-gray-600 group ml-1" style={copied ? { color: '#06B6D4' } : null} onClick={handleCopy} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <span className="sr-only">Copy code</span>
            {hover || copied ? (
                <span className="absolute inset-x-0 bottom-full mb-2.5 flex justify-center">
                    <span className="bg-gray-900 text-white rounded-md text-xs leading-4 tracking-wide font-semibold uppercase py-1 px-3 filter drop-shadow-md">
                        <svg width="16" height="6" viewBox="0 0 16 6" className="text-gray-900 absolute top-full left-1/2 -mt-px -ml-2">
                            <path fillRule="evenodd" clipRule="evenodd" d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z" fill="currentColor"></path>
                        </svg>
                        {copied ? "Copied!" : "Copy to Clipboard"}
                    </span>
                </span>
            ) : null}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="stroke-current transform group-hover:rotate-[-4deg] transition" style={copied ? { '--tw-rotate': '-8deg' } : null}>
                <path d="M12.9975 10.7499L11.7475 10.7499C10.6429 10.7499 9.74747 11.6453 9.74747 12.7499L9.74747 21.2499C9.74747 22.3544 10.6429 23.2499 11.7475 23.2499L20.2475 23.2499C21.352 23.2499 22.2475 22.3544 22.2475 21.2499L22.2475 12.7499C22.2475 11.6453 21.352 10.7499 20.2475 10.7499L18.9975 10.7499" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M17.9975 12.2499L13.9975 12.2499C13.4452 12.2499 12.9975 11.8022 12.9975 11.2499L12.9975 9.74988C12.9975 9.19759 13.4452 8.74988 13.9975 8.74988L17.9975 8.74988C18.5498 8.74988 18.9975 9.19759 18.9975 9.74988L18.9975 11.2499C18.9975 11.8022 18.5498 12.2499 17.9975 12.2499Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M13.7475 16.2499L18.2475 16.2499" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M13.7475 19.2499L18.2475 19.2499" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <g className={cx(copied ? null : 'opacity-0', initialized ? 'transition-opacity' : null)}>
                    <path d="M15.9975 5.99988L15.9975 3.99988" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M19.9975 5.99988L20.9975 4.99988" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M11.9975 5.99988L10.9975 4.99988" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
        </button>
    )
}