import { useState } from "react"

export default function Tooltip(props) {

    const { text, children } = props

    const [hover, setHover] = useState(false)

    return (
        <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {children}
            {hover ? (
                <span className="absolute inset-x-0 bottom-full mb-2.5 flex justify-center">
                    <span className="bg-gray-900 text-white rounded-md text-xs leading-4 tracking-wide font-semibold uppercase py-1 px-3 filter drop-shadow-md">
                        <svg width="16" height="6" viewBox="0 0 16 6" className="text-gray-900 absolute top-full left-1/2 -mt-px -ml-2">
                            <path fillRule="evenodd" clipRule="evenodd" d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z" fill="currentColor"></path>
                        </svg>
                        {text}
                    </span>
                </span>
            ) : null}
        </div>
    )
}