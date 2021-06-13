/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react'
import Link from './Link'
import Text from './Text'
import schema from '../schema'
import languages from '../languages.json'
import Context from './Context'
import pages from '../pages'
import cx from 'classnames'
import markdownToText from 'markdown-to-text'
import { Popover, Transition } from '@headlessui/react'
import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorClickIcon,
    MenuIcon,
    PhoneIcon,
    PlayIcon,
    RefreshIcon,
    ShieldCheckIcon,
    SupportIcon,
    ViewGridIcon,
    XIcon,
    BookOpenIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

const resources = [
    {
        name: 'Help Center',
        description: 'Get all of your questions answered in our forums or contact support.',
        href: '#',
        icon: SupportIcon,
    },
    {
        name: 'Guides',
        description: 'Learn how to maximize our platform to get the most out of it.',
        href: '#',
        icon: BookmarkAltIcon,
    },
    {
        name: 'Events',
        description: 'See what meet-ups and other events we might be planning near you.',
        href: '#',
        icon: CalendarIcon,
    },
    { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function LanguageButton() {

    const ctx = useContext(Context)
    const language = languages.find(language => language.id === ctx.language)

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={classNames(
                            open ? 'text-gray-900' : 'text-gray-500',
                            'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                        )}
                    >
                        <div>{language.icon}</div><div className="ml-1">{language.name}</div>
                        <ChevronDownIcon
                            className={classNames(
                                open ? 'text-gray-600' : 'text-gray-400',
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
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    {languages.map((language) => {

                                        const alternatePage = pages.find(page => page.language === language.id && page.origin === ctx.page.origin)

                                        const disabled = !alternatePage

                                        const className = cx(
                                            "-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 cursor-pointer",
                                            disabled ? "bg-gray-50 cursor-not-allowed opacity-50" : null
                                        )

                                        const content = (
                                            <>
                                                <div className="flex-shrink-0 h-6 w-6 text-primary-600" aria-hidden="true">{language.icon}</div>
                                                <div className="ml-1">
                                                    <p className={cx(
                                                        "text-base font-medium",
                                                        language.id === ctx.language ? "text-primary-500" : "text-gray-900"
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

export default function Header() {

    const { navigation } = schema

    return (
        <Popover className="relative bg-white">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                            <div className="flex justify-start lg:w-0 lg:flex-1">
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
                            <div className="-mr-2 -my-2 md:hidden">
                                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                                    <span className="sr-only">Open menu</span>
                                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                            <Popover.Group as="nav" className="hidden md:flex space-x-10">
                                <Popover className="relative">
                                    {({ open }) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    open ? 'text-gray-900' : 'text-gray-500',
                                                    'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                                                )}
                                            >
                                                <span><Text>{navigation.general.name}</Text></span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? 'text-gray-600' : 'text-gray-400',
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
                                                    className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                                                >
                                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                            {navigation.general.navItems.map((navItem) => {

                                                                const page = pages.find(page => page.slug === navItem.href)

                                                                return (
                                                                    <a
                                                                        key={navItem.name}
                                                                        href={navItem.href}
                                                                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                                    >
                                                                        <BookOpenIcon className="flex-shrink-0 h-6 w-6 text-primary-600" aria-hidden="true" />
                                                                        <div className="ml-4">
                                                                            <p className="text-base font-medium text-gray-900">{navItem.name}</p>
                                                                            {page ? (
                                                                                <p className="mt-1 text-sm text-gray-500">{markdownToText(page.description)}</p>
                                                                            ) : null}
                                                                        </div>
                                                                    </a>
                                                                )
                                                            })}
                                                        </div>
                                                        {navigation.general.readMore ? (
                                                            <div className="px-5 py-5 bg-gray-50 text-center sm:px-8">
                                                                <Link href={navigation.general.readMore.href}>
                                                                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                                                        {navigation.general.readMore.name} <span aria-hidden="true">&rarr;</span>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                                <Popover className="relative">
                                    {({ open }) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    open ? 'text-gray-900' : 'text-gray-500',
                                                    'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                                                )}
                                            >
                                                <span><Text>{navigation.technical.name}</Text></span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? 'text-gray-600' : 'text-gray-400',
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
                                                    className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                                                >
                                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                            {navigation.technical.navItems.map((navItem) => {

                                                                const page = pages.find(page => page.slug === navItem.href)

                                                                return (
                                                                    <a
                                                                        key={navItem.name}
                                                                        href={navItem.href}
                                                                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                                    >
                                                                        <BookOpenIcon className="flex-shrink-0 h-6 w-6 text-primary-600" aria-hidden="true" />
                                                                        <div className="ml-4">
                                                                            <p className="text-base font-medium text-gray-900">{navItem.name}</p>
                                                                            {page ? (
                                                                                <p className="mt-1 text-sm text-gray-500">{markdownToText(page.description)}</p>
                                                                            ) : null}
                                                                        </div>
                                                                    </a>
                                                                )
                                                            })}
                                                        </div>
                                                        {navigation.technical.readMore ? (
                                                            <div className="px-5 py-5 bg-gray-50 text-center sm:px-8">
                                                                <Link href={navigation.technical.readMore.href}>
                                                                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                                                        {navigation.technical.readMore.name} <span aria-hidden="true">&rarr;</span>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </Popover.Group>
                            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                                <Popover.Group>
                                    <LanguageButton />
                                </Popover.Group>
                            </div>
                        </div>
                    </div>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            static
                            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                        >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img
                                                className="h-8 w-auto"
                                                src={'/ship-420.png'}
                                                alt={schema.about.name}
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                                                <span className="sr-only">Close menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                    <div className="mt-6 text-sm text-gray-500 uppercase">
                                        {navigation.general.name}
                                    </div>
                                    <div className="mt-4">
                                        <nav className="grid gap-y-8">
                                            {navigation.general.navItems.map((navItem) => (
                                                <a
                                                    key={navItem.name}
                                                    href={navItem.href}
                                                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                >
                                                    <BookOpenIcon className="flex-shrink-0 h-6 w-6 text-primary-600" aria-hidden="true" />
                                                    <span className="ml-3 text-base font-medium text-gray-900">{navItem.name}</span>
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                    <div className="mt-6 text-sm text-gray-500 uppercase">
                                        {navigation.technical.name}
                                    </div>
                                    <div className="mt-4">
                                        <nav className="grid gap-y-8">
                                            {navigation.technical.navItems.map((navItem) => (
                                                <a
                                                    key={navItem.name}
                                                    href={navItem.href}
                                                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                >
                                                    <BookOpenIcon className="flex-shrink-0 h-6 w-6 text-primary-600" aria-hidden="true" />
                                                    <span className="ml-3 text-base font-medium text-gray-900">{navItem.name}</span>
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
