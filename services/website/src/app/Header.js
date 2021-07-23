/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react'
import Link from './Link'
import Context from './Context'
import cx from 'classnames'
import { Popover, Transition } from '@headlessui/react'
import SearchBox from './SearchBox'
import Component from './Component'

import { ChevronDownIcon, MoonIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function DarkModeToggle() {

    const handleToggle = () => {
        document.dispatchEvent(
            new CustomEvent("toggleDarkMode")
        )
    }

    return (
        <button type="button" className="h-8 w-8 flex items-center justify-center text-gray-900 dark:text-gray-400 rounded-full bg-gray-50 dark:bg-gray-900 focus:outline-none" onClick={handleToggle}>
            <MoonIcon className="h-5" />
        </button>
    )
}

function LanguageButton() {

    const ctx = useContext(Context)
    const languages = ctx.languages
    const language = languages.find(language => language.id === ctx.language)
    const pages = ctx.pages

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={classNames(
                            open ? 'text-gray-900 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400',
                            'group bg-white dark:bg-gray-800 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-700 focus:ring-primary-500'
                        )}
                    >
                        <div>{language.icon}</div><div className="hidden sm:block ml-1">{language.name}</div>
                        <ChevronDownIcon
                            className={classNames(
                                open ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600',
                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                            )}
                            aria-hidden="true"
                        />
                    </Popover.Button>
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            static
                            className="absolute z-10 right-0 mt-3 px-2 w-screen max-w-xs sm:px-0"
                        >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
                                    {languages.map((language) => {

                                        const alternatePage = pages.find(page => {
                                            return page.language === language.id && page.origin === ctx.page.origin
                                        })

                                        const disabled = language.id !== ctx.language && !alternatePage

                                        const className = cx(
                                            "-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer",
                                            disabled ? "bg-gray-50 dark:bg-gray-900 cursor-not-allowed opacity-50" : null
                                        )

                                        const content = (
                                            <>
                                                <div className="flex-shrink-0 h-6 w-6 text-primary-500" aria-hidden="true">{language.icon}</div>
                                                <div className="ml-1">
                                                    <p className={cx(
                                                        "text-base font-medium",
                                                        language.id === ctx.language ? "text-primary-500" : "text-gray-900 dark:text-gray-500"
                                                    )}>{language.name}</p>
                                                </div>
                                            </>
                                        )

                                        if (!alternatePage) {
                                            return (
                                                <div key={language.name} className={className}>
                                                    {content}
                                                </div>
                                            )
                                        }

                                        return (
                                            <Link key={language.name} href={alternatePage.slug}>
                                                <a
                                                    className={className}
                                                >
                                                    {content}
                                                </a>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}

export default function Header(props) {

    const ctx = useContext(Context)
    const { schema } = ctx

    const { components } = props

    return (
        <Popover className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 z-10">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="flex items-center h-16 sm:h-24 py-4 sm:py-6 space-x-10">
                            <div className="flex justify-start lg:w-0 flex-1">
                                <Link internal={true} href="/">
                                    <a>
                                        <span className="sr-only">Armada Alliance</span>
                                        <img
                                            className="h-8 w-auto sm:h-10"
                                            src={'/ship-420.png'}
                                            alt={schema.about.name}
                                        />
                                    </a>
                                </Link>
                            </div>
                            <Component use={SearchBox} data={components.SearchBox} />
                            <div className="flex items-center justify-end space-x-6 flex-1 lg:w-0">
                                <LanguageButton />
                                {process.browser && window.matchMedia('(prefers-color-scheme: dark)').matches ? null : (
                                    <DarkModeToggle />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </Popover >
    )
}
