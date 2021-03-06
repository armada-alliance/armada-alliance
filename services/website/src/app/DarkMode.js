import React from 'react'
import { useEffect, useState } from 'react'
import getDarkMode from './getDarkMode'

export default function DarkMode({ children }) {

    const [darkMode, _setDarkMode] = useState(getDarkMode())

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode)
    }

    useEffect(() => {

        document.addEventListener('toggleDarkMode', handleDarkModeToggle)
        document.addEventListener('keydown', handleKeyDown)

        if (process.browser) {
            const query = new URLSearchParams(location.search)
            if (!darkMode && query.get('darkMode') === "true") {
                setDarkMode(true)
            }
            if (darkMode && query.get('darkMode') === "false") {
                setDarkMode(false)
            }
        }

        return () => {
            document.removeEventListener('toggleDarkMode', handleDarkModeToggle)
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    useEffect(() => {

        let interval = setInterval(() => {
            const _darkMode = getDarkMode()
            if (_darkMode !== darkMode) {
                setDarkMode(_darkMode, false)
            }
        }, 1000)

        return () => {
            if (interval) {
                clearInterval(interval)
                interval = null
            }
        }
    })

    useEffect(() => {
        setClassNames(darkMode)
    }, [darkMode])

    const setClassNames = (value) => {
        if (value) {
            document.documentElement.classList.add('dark')
            document.body.classList.remove('bg-white')
            document.body.classList.add('bg-gray-900')
        } else {
            document.body.classList.remove('bg-gray-900')
            document.body.classList.add('bg-white')
            document.documentElement.classList.remove('dark')
        }
    }

    const setDarkMode = (value, store = true) => {

        if (store) {
            try {
                if (value) {
                    localStorage.theme = "dark"
                } else {
                    delete localStorage.theme
                }
            } catch (e) {

            }
        }

        setClassNames(value)

        const event = new CustomEvent("darkMode", {
            darkMode: value
        })

        document.dispatchEvent(event)

        _setDarkMode(value)
    }

    const handleKeyDown = (e) => {

        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
            setDarkMode(!darkMode)
        }
    }

    return null
}