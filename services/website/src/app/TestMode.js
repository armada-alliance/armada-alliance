import React from 'react'
import { useEffect, useState } from 'react'

function getTestMode() {

    try {
        return localStorage.testMode === "true"
    } catch (e) {
        return false
    }
}

export default function TestMode({ children }) {

    const [testMode, _setTestMode] = useState(getTestMode())

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown)

        if (process.browser) {
            const query = new URLSearchParams(location.search)
            if (!testMode && query.get('testMode') === "true") {
                setTestMode(true)
            }
            if (testMode && query.get('testMode') === "false") {
                setTestMode(false)
            }
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    const setTestMode = (value) => {

        try {
            if (value) {
                localStorage.testMode = "true"
            } else {
                delete localStorage.testMode
            }
        } catch (e) {

        }

        const event = new CustomEvent("testMode", {
            testMode: value
        })

        document.dispatchEvent(event)

        _setTestMode(value)
    }

    const handleKeyDown = (e) => {

        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
            setTestMode(!testMode)
        }
    }

    if (!testMode) {
        return null
    }

    return (
        <>
            <div className="h-12" />
            <div className="fixed bottom-0 left-0 right-0 px-4 h-12 space-x-4 flex items-center justify-between bg-red-500 text-white" style={{ zIndex: 99999 }}>
                <div className="font-bold">Test mode enabled</div>
                <div className="flex items-center">
                    {children}
                </div>
                <div className="flex items-center space-x-8">
                    <div className="hidden sm:flex items-center space-x-2 text-sm">
                        <div>Use</div>
                        <div className="text-white text-sm leading-5 py-0.5 px-1.5 border border-white rounded-md space-x-0.5"><kbd className="font-sans"><abbr className="no-underline">⌘</abbr></kbd><kbd className="font-sans">J</kbd></div>
                        <div>to toggle</div>
                    </div>
                    <button type="button" className="py-1 px-2 rounded-md bg-white text-red-500 text-xs focus:outline-none" onClick={() => setTestMode(false)}>disable</button>
                </div>
            </div>
        </>
    )
}