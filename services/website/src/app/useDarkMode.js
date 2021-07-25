import { useState, useEffect } from 'react'
import getDarkMode from './getDarkMode'

export default function useDarkMode() {
    const [darkMode, setDarkMode] = useState(getDarkMode());

    const handleDarkModeChange = e => setDarkMode(getDarkMode())

    useEffect(() => {
        document.addEventListener("darkMode", handleDarkModeChange)
        return () => {
            document.removeEventListener("darkMode", handleDarkModeChange)
        };
    });

    return darkMode;
}