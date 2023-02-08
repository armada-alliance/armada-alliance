import { useContext, useEffect, useState } from 'react'
import Link from './Link'
import Context from './Context'
import { css, keyframes } from '@emotion/react'
import Logo from './Logo'

const wave = keyframes`
    0% {
        -webkit-transform: translate(85px, 0%);
        -moz-transform: translate(85px, 0%);
        -ms-transform: translate(85px, 0%);
        transform: translate(85px, 0%);
    }
    100% {
        -webkit-transform: translate(-90px, 0%);
        -moz-transform: translate(-90px, 0%);
        -ms-transform: translate(-90px, 0%);
        transform: translate(-90px, 0%);
    }
`

export default function HeroSection({ text, poolCount, pools }) {
    const ctx = useContext(Context)
    const { schema } = ctx

    const [wave1, setWave1] = useState(false)
    const [wave2, setWave2] = useState(true)
    const [wave3, setWave3] = useState(true)

    // useEffect(() => setWave2(false), 4000)
    // useEffect(() => setWave3(false), 8000)

    return (
        <div className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <div className="pb-6 sm:pb-12">
                {/* <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
                    <div className="relative h-full max-w-7xl mx-auto">
                        <svg
                            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
                            width={404}
                            height={784}
                            fill="none"
                            viewBox="0 0 404 784"
                        >
                            <defs>
                                <pattern
                                    id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                                    x={0}
                                    y={0}
                                    width={20}
                                    height={20}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect x={0} y={0} width={4} height={4} className="text-gray-200 dark:text-gray-700" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
                        </svg>
                        <svg
                            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
                            width={404}
                            height={784}
                            fill="none"
                            viewBox="0 0 404 784"
                        >
                            <defs>
                                <pattern
                                    id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                                    x={0}
                                    y={0}
                                    width={20}
                                    height={20}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect x={0} y={0} width={4} height={4} className="text-gray-200 dark:text-gray-700" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
                        </svg>
                    </div>
                </div> */}
                <main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-12 relative">
                    <div className="flex items-center justify-items-center">
                        <div className="w-auto mx-auto mb-6 sm:mb-10">
                            <Logo
                                className="h-24 w-24 sm:h-44 sm:w-44"
                                waveClassName="h-11 bottom-0.5 sm:h-20 sm:-bottom-1"
                            />
                        </div>
                        {/* <img
                            className="h-20 w-auto sm:h-36 mx-auto mb-10"
                            src={'/ship-420.png'}
                            alt={schema.about.name}
                        /> */}
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Armada</span>{' '}
                            <span className="block text-primary-500 xl:inline bg-gradient-to-r from-primary-400 dark:from-primary-300 via-primary-500 to-primary-700 text-gradient">Alliance</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            {text}
                        </p>
                        <div className="mt-5 mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link internal={true} href={'/stake-pools'}>
                                    <a
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                                    >
                                        Choose a pool
                                    </a>
                                </Link>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <a
                                  href={'/docs'}
                                  target="_blank"
                                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-gray-300 hover:text-gray-200 hover:bg-gray-400 md:py-4 md:text-lg md:px-10"
                                >
                                    Docs & Guides
                                </a>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <a
                                    href={schema.about.telegram}
                                    target="_blank"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-500 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                                >
                                    Let's chat
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div className="relative" style={{ height: 48 }}>
                <svg
                    css={css`
                position: absolute;
    bottom: 0;
    left: 0px;
    display: block;
    width: 100%;
    max-height: 48px;
    margin: 0;
    z-index: 1;
                `}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 24 150 28"
                    preserveAspectRatio="none"
                    role="img"
                    ariaLabel="Animating waves dividing two sections."
                >
                    <defs>
                        <path
                            id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                        >
                        </path>
                    </defs>
                    <g
                        css={css`
                            -webkit-animation: ${wave} 10s linear infinite;
                            animation: ${wave} 10s linear infinite;
                        `}
                        className="text-primary-600"
                    >
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="currentColor">
                        </use>
                    </g>
                    <g
                        css={css`
                        -webkit-animation: ${wave} 8s linear infinite;
                        animation: ${wave} 8s linear infinite;
                        `}
                        className="text-primary-400"
                    >
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="currentColor"></use>
                    </g>
                    <g
                        css={css`
                        -webkit-animation: ${wave} 6s linear infinite;
                        animation: ${wave} 6s linear infinite;
                        `}
                        className="text-primary-500"
                    >
                        <use xlinkHref="#gentle-wave" x="48" y="9" fill="currentColor"></use>
                    </g>
                    <g
                        css={css`
                        -webkit-animation: ${wave} 4s linear infinite;
                        animation: ${wave} 4s linear infinite;
                        `}
                        className="text-gray-50 dark:text-gray-800"
                    >
                        <use xlinkHref="#gentle-wave" x="48" y="6" fill="currentColor"></use>
                    </g>
                </svg>
            </div>
        </div>
    )
}
