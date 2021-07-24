const { getAmazonMetaData } = require("./getMetaData")

async function main() {
    const result = await getAmazonMetaData('https://www.amazon.nl/gp/product/B00XLAZODE/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&psc=1')

    console.log(result)
}

main()