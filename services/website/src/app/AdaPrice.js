import { useContext, useState } from "react"
import numeral from 'numeral'
import cx from 'classnames'
import Context from "./Context"

export default function AdaPrice({ value, className = 'space-x-1', currencySize }) {

    const { currencies } = useContext(Context)

    const [currencyIndex, setCurrencyIndex] = useState(0)

    const currency = currencies[currencyIndex]

    const handleCurrencyClick = () => {

        setCurrencyIndex(
            currencyIndex === currencies.length - 1 ? 0 : currencyIndex + 1
        )
    }

    let adjustedValue = value

    if (currency.id !== 'ADA') {

        adjustedValue = value * currency.rate
    }

    return (
        <div className={cx("flex select-none", className)}>
            <div>{numeral(adjustedValue).format('0,0.00a').replace('.00', '')}</div> <button type="button" onClick={handleCurrencyClick} className={cx(currencySize, "focus:outline-none cursor-pointer hover:text-gray-900 dark:hover:text-gray-100")}>{currency.symbol}</button>
        </div>
    )
}