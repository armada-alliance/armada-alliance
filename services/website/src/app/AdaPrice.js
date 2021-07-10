import { useEffect, useState } from "react"
import axios from 'axios'
import numeral from 'numeral'

const currencies = [
    { name: 'ADA', label: '₳', },
    { name: 'BTC', label: 'BTC' },
    { name: 'USD', label: 'USD' },
    { name: 'EUR', label: 'EUR' }
]

export default function AdaPrice({ value }) {

    const [currencyIndex, setCurrencyIndex] = useState(0)
    const [data, setData] = useState(null)

    // useEffect(async () => {
    //     if (data) return
    //     const { data } = await axios.get('https://pool.pm/total.json')

    //     setData(data)
    // }, [data])

    const currency = currencies[currencyIndex]

    const handleCurrencyClick = () => {

        if (!data) return

        setCurrencyIndex(
            currencyIndex === currencies.length - 1 ? 0 : currencyIndex + 1
        )
    }

    let adjustedValue = value

    if (currency.name !== 'ADA') {

        const rateKey = `ADA${currency.name}`
        const rate = data[rateKey]

        adjustedValue = value * rate
    }

    return (
        <div className="flex justify-center items-end select-none">
            {numeral(adjustedValue).format('0,0.00a').replace('.00', '')} <button type="button" onClick={handleCurrencyClick} className="text-3xl focus:outline-none cursor-pointer ml-3 hover:text-gray-900">{currency.label}</button>
        </div>
    )
}