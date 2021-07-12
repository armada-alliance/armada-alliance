import { useState, useEffect } from 'react'
import getTestMode from './getTestMode'

export default function useTestMode() {
    const [testMode, setTestMode] = useState(getTestMode());

    const handleTestModeChange = e => setTestMode(getTestMode())

    useEffect(() => {
        document.addEventListener("testMode", handleTestModeChange)
        return () => {
            document.removeEventListener("testMode", handleTestModeChange)
        };
    });

    return testMode;
}