import schema from "../schema"

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import navigation from './navigation-data'

export default function Example() {
    return (
        <div className="bg-gray-50">
            <div className="pt-6 pb-6">
                <Popover>
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                                <nav
                                    className="relative flex items-center justify-between sm:h-10 md:justify-center"
                                    aria-label="Global"
                                >
                                    <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                                        <div className="flex items-center justify-between w-full md:w-auto">
                                            <a href="#">
                                                <span className="sr-only">Workflow</span>
                                                <img
                                                    className="h-8 w-auto sm:h-10"
                                                    src={schema.about.url_png_icon_64x64}
                                                    alt={schema.about.name}
                                                />
                                            </a>
                                            <div className="-mr-2 flex items-center md:hidden">
                                                <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                                                    <span className="sr-only">Open main menu</span>
                                                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                                </Popover.Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex md:space-x-10">
                                        {navigation.main.map((item) => (
                                            <a key={item.name} href={item.href} target={item.target} className="font-medium text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                                        <span className="inline-flex rounded-md shadow">
                                            <a
                                                href={schema.about.github}
                                                target="_blank"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
                                            >
                                                Register
                      </a>
                                        </span>
                                    </div>
                                </nav>
                            </div>

                            <Transition
                                show={open}
                                as={Fragment}
                                enter="duration-150 ease-out"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="duration-100 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Popover.Panel
                                    focus
                                    static
                                    className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10"
                                >
                                    <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                        <div className="px-5 pt-4 flex items-center justify-between">
                                            <div>
                                                <img
                                                    className="h-8 w-auto"
                                                    src={schema.about.url_png_icon_64x64}
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
                                        <div className="px-2 pt-2 pb-3">
                                            {navigation.main.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    target={item.target}
                                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                        <a
                                            href={schema.about.github}
                                            target="_blank"
                                            className="block w-full px-5 py-3 text-center font-medium text-primary-600 bg-gray-50 hover:bg-gray-100"
                                        >
                                            Register
                    </a>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        </div>
    )
}
