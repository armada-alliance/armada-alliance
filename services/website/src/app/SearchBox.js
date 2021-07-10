import { Fragment, useState, useContext, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import * as JsSearch from 'js-search'
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/outline'
import Context from './Context'
import markdownToText from 'markdown-to-text'
import Link from './Link'
import cx from 'classnames'
import { useRouter } from 'next/router'
import formatImage from './formatImage'
import WithPageTooltip from './WithPageTooltip'

function getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
}

function DefaultView({ templates, results, query }) {

    const pagesByTemplate = results.reduce((result, page) => {

        const list = result[page.template] = result[page.template] || []

        list.push(page)

        return result
    }, {})

    return (
        <div className="p-6 space-y-6">
            {templates.map(template => {

                let pages = pagesByTemplate[template.id] || []
                pages = pages.slice(0, 4 * 3)

                if (!pages.length) {
                    return null
                }

                return (
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <div className="font-bold text-lg">
                                {template.name}
                            </div>
                            <div className="ml-auto -mr-2">
                                <Link href={template.moreLink.href}>
                                    <a className="space-x-1 flex items-center text-sm px-2 py-1 hover:bg-gray-50 rounded-md">
                                        <div className="flex-shrink-0 truncate">
                                            {template.moreLink.name}
                                        </div>
                                        <ChevronRightIcon className="h-3" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="-mx-3 grid grid-cols-2 sm:grid-cols-3">
                            {pages.map(page => {

                                return (
                                    <WithPageTooltip delay={800} slug={page.slug}>
                                        {props => (
                                            <Link href={page.slug}>
                                                <a {...props} className="group flex items-center space-x-2 px-3 py-2 hover:bg-primary-500 hover:text-white rounded-lg text-sm block text-gray-500">
                                                    {page.image ? (
                                                        <div className="flex-shrink-0 bg-white h-8 w-8 rounded-full ring-2 ring-white bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${formatImage(page.image)})` }} />
                                                    ) : null}
                                                    {page.icon ? (
                                                        <div className="flex-shrink-0 bg-gray-50 group-hover:bg-white h-8 w-8 rounded-full ring-2 ring-white flex items-center justify-center">
                                                            {page.icon}
                                                        </div>
                                                    ) : null}
                                                    <div className="truncate">
                                                        {getHighlightedText(page.title, query)}
                                                    </div>
                                                </a>
                                            </Link>
                                        )}
                                    </WithPageTooltip>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default function SearchBox(props) {

    const router = useRouter()

    const ctx = useContext(Context)

    const searchViewRef = useRef(null)

    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const [moved, setMoved] = useState(false)

    useEffect(() => {

        // document.addEventListener('mousemove', handleMove)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            // document.removeEventListener('mousemove', handleMove)
        }
    })

    const handleMove = () => setMoved(true)

    const pagesForLanguage = ctx.pages
        .filter(page =>
            page.language === ctx.language
        )
        .map(page => ({
            ...page,
            title: markdownToText(page.title),
            description: markdownToText(page.description),
        }))

    let results = pagesForLanguage

    if (query.length) {

        const search = new JsSearch.Search('slug')
        search.addIndex('title')
        search.addIndex('description')
        search.addIndex('keywords')

        search.addDocuments(results)

        results = search.search(query)
    }

    const handleSetIndex = (index, scroll) => {

        setIndex(index)

        if (scroll) {
            const activeElement = searchViewRef.current.children[0].children[index]
            if (!activeElement) return
            searchViewRef.current.scrollTop = activeElement.offsetTop - (activeElement.clientHeight + 8 + 16)
        }
    }

    const handleQuery = value => {

        setQuery(value)
        setIndex(0)
    }

    const handleKeyDown = (e) => {
        let nextIndex = index

        if (e.metaKey && e.key.toLowerCase() === "k") {
            setOpen(!open)
        }

        if (e.code === "ArrowUp") {
            nextIndex = nextIndex === 0 ? results.length - 1 : nextIndex - 1
        }

        if (e.code === "ArrowDown") {
            nextIndex = nextIndex === results.length - 1 ? 0 : nextIndex + 1
        }

        if (e.code === "Enter") {
            setQuery('')
            setOpen(false)
            const page = results[index]
            router.push(page.slug)
        }

        // if (index !== nextIndex) {
        //     setMoved(false)
        //     e.preventDefault()
        //     handleSetIndex(nextIndex, true)
        // }
    }

    return (
        <>
            <button
                type="button"
                className="text-gray-500 group leading-6 font-medium flex items-center space-x-3 sm:space-x-4 hover:text-gray-600 transition-colors duration-200 w-92 py-2 px-3 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={() => {
                    setOpen(true)
                }}
            >
                <svg width="24" height="24" fill="none" className="text-gray-400 group-hover:text-gray-500 transition-colors duration-200"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                {/* <input
                type="text"
                placeholder="Quick search for anything"
                value={query}
                onChange={e => setQuery(e.target.value)}
            /> */}
                <span>Quick search<span className="hidden sm:inline"> for anything</span></span>
                <div className="hidden sm:block text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md">
                    <kbd className="font-sans"><abbr className="no-underline">⌘</abbr></kbd>
                    <kbd className="font-sans">K</kbd>
                </div>
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                                <div className="flex items-center py-2 px-4 space-x-4">
                                    <div>
                                        <SearchIcon className="h-6" />
                                    </div>
                                    <div className="flex-grow">
                                        <input
                                            className="block border-none w-full px-0 py-2 focus:outline-none focus:ring-0 placeholder-gray-400"
                                            type="text"
                                            placeholder="Search"
                                            value={query}
                                            onChange={e => handleQuery(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="hidden sm:block text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md focus:outline-none"
                                        onClick={() => setOpen(false)}
                                    >
                                        esc
                                    </button>
                                </div>
                                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                                    {results.length ? (
                                        <DefaultView {...props} results={results} query={query} />
                                    ) : (
                                            <div className="h-96 flex flex-col items-center justify-center">
                                                <div className="text-gray-500 font-bold text-center">
                                                    Nothing found that matches your search criteria
                                                    </div>
                                                <div className="text-center text-gray-500 text-sm">
                                                    You might want to check the <Link interal={true} href="/sitemap"><a className="font-bold underline">sitemap</a></Link>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}