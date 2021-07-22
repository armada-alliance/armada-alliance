export default function getDarkMode() {

    try {
        return localStorage.theme === "dark" || (process.browser && window.matchMedia('(prefers-color-scheme: dark)').matches)
    } catch (e) {
        return (process.browser && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
}