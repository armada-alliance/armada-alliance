import axios from 'axios'

let simpleCache = {}

const fetch = async url => {
    if (simpleCache[url]) {
        return simpleCache[url]
    }
    const response = await axios.get(url)
    simpleCache[url] = response
    return response
}

export default fetch 