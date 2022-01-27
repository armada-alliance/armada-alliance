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
            { id: 'ADA', name: 'ADA', symbol: '₳' },
            { id: 'EUR', name: 'Euro', symbol: '€' },
            { id: 'USD', name: 'U.S. Dollar', symbol: '$' },
            { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
            { id: 'BTC', name: 'Ethereum', symbol: 'ETH' },
            { id: 'AUD', name: 'Australian Dollar', symbol: 'AUD' },
            { id: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
            { id: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
            { id: 'JPY', name: 'Japanese Yen', symbol: '¥' },
            { id: 'THB', name: 'Thai Baht', symbol: '฿' },
        ]

        const currency_names = currencies.map(cur => cur.id).join(',')

        console.log(`https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=${currency_names}`)

        const currency_data = await axios
            .request({
                method: 'get',
                url: `https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=${currency_names}`,
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then((res) => res.data.cardano)

        return currencies.map(currency => {

            return {
                ...currency,
                rate: currency.id === 'ADA' ? 1 : currency_data[currency.id.toLowerCase()]
            }
        })
    }
}