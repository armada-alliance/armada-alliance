const getMetaData = require('../getMetaData')

const convertPrice = ctx => (from, to, value) => {
    if (from === to) return value
    const currencies = ctx.tables.get('currencies')
    const fromCurrency = currencies.find(currency => currency.id === from)
    const toCurrency = currencies.find(currency => currency.id === to)

    let adaPrice = fromCurrency.adaPrice * value

    if (to === 'ADA') {
        return adaPrice
    }

    return toCurrency.adaPrice / adaPrice
}

module.exports = {
    id: 'ContentSections',
    resolve: async (ctx, props) => {

        if (!props.contentSections) {
            return props
        }

        const contentSections = await Promise.all(
            props.contentSections.map(async contentSection => {

                if (contentSection.type === 'HardwareSection') {

                    const items = await Promise.all(
                        contentSection.items.map(async item => {

                            const metadata = await getMetaData(item.url)

                            return {
                                ...item,
                                image: metadata && metadata.image ? metadata.image : null,
                                localPrice: item.price,
                                price: convertPrice(ctx)(item.currency, 'ADA', item.price),
                            }
                        })
                    )

                    const totalPrice = items.reduce((prev, curr) => (prev + (curr.price * curr.quantity)), 0)

                    return {
                        ...contentSection,
                        items,
                        totalPrice
                    }
                }

                return contentSection
            })
        )

        return {
            contentSections
        }
    }
}