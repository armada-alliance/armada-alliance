const axios = require('axios')

const getPrice = (currency = 'USD') =>
    axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=${currency.toLowerCase()}`
    )
        .then((res) => res.data.cardano[currency.toLowerCase()])

module.exports = {
    id: "currencies",
    create: async () => {

        const currencies = [
            { id: 'EUR', name: 'Euro', symbol: '€' },
            { id: 'USD', name: 'U.S. Dollar', symbol: '$' },
            { id: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
            { id: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
            { id: 'JPY', name: 'Japanese Yen', symbol: '¥' },
            { id: 'THB', name: 'Thai Baht', symbol: '฿' },
            { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
            { id: 'ADA', name: 'Cardano', symbol: 'ADA' }
        ]

        const currency_names = currencies.map(cur => cur.id).join(',')

        const currency_data = await axios
            .get(
                `https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=${currency_names}`
            )
            .then((res) => res.data.cardano)

        return currencies.map(currency => {

            return {
                ...currency,
                adaPrice: currency_data[currency.id.toLowerCase()]
            }
        })
    }
}