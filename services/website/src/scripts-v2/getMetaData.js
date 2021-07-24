const urlMetadata = require('url-metadata')
const { getCacheItem, setCacheItem } = require('./cache')
const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

const getAmazonMetaData = async input => {

    const { data } = await axios.get(input, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
        }
    })

    const $ = cheerio.load(data)

    fs.writeFileSync(__dirname + '/test.html', data, 'utf8')

    const image = $('#landingImage')

    return {
        image: image ? image.first().attr('src') : null,
    }
}

const getMetaData = async (input) => {

    let result = getCacheItem(input)

    try {

        if (!result) {

            if (input.indexOf('amazon') !== -1) {

                result = await getAmazonMetaData(input)

            } else {
                result = await urlMetadata(input)
                if (result.canonical) {
                    result = await urlMetadata(input)
                }
            }


            setCacheItem(input, result)
        }
    } catch (error) {
    }

    if (!result.image) {
        result.image = result?.jsonld?.image?.url
    }

    return result
}

getMetaData.getAmazonMetaData = getAmazonMetaData

module.exports = getMetaData