export default function getTestMode() {

    try {
        return localStorage.testMode === "true"
    } catch (e) {
        return false
    }
}