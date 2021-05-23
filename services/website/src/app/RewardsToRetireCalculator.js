import { useState } from 'react'
import NumberField from './fields/NumberField'
import toCurrency from './toCurrency'

const getTotalAdaNeeded = data => {

    const { price, annualGoal, percentage } = data

    if (price && annualGoal && percentage) {
        return Math.ceil((annualGoal / price) / (percentage / 100))
    }

    return null
}


const getAnnualRewardsRequired = data => {

    const { price, annualGoal, percentage } = data

    if (price && annualGoal && percentage) {
        return Math.ceil(annualGoal / price)
    }

    return null
}


export default function LivingOffRewardsCalculator({ description }) {

    const [data, setData] = useState({
        price: 1,
        annualGoal: 20000,
        percentage: 5
    })

    return (
        <div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="grid grid-cols-2 divide-x divide-gray-200">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    ADA Price in dollars
                                        </label>
                                <div className="mt-1">
                                    <NumberField
                                        value={data.price}
                                        onChange={({ value }) => setData({
                                            ...data,
                                            price: value
                                        })}
                                        field={{
                                            settings: {
                                                placeholder: 'Expected ADA price'
                                            }
                                        }}
                                    />
                                </div>
                                <p className="mt-2 text-gray-500 text-xs" id="email-description">
                                    Expected ADA price
                                </p>
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Annual income goal
                                        </label>
                                <div className="mt-1">
                                    <NumberField
                                        value={data.annualGoal}
                                        onChange={({ value }) => setData({
                                            ...data,
                                            annualGoal: value
                                        })}
                                        field={{
                                            settings: {
                                                placeholder: 'Enter your apy'
                                            }
                                        }}
                                    />
                                </div>
                                <p className="mt-2 text-gray-500 text-xs" id="email-description">
                                    Income you expect from your rewards
                                </p>
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    APY (Average 5% - 5.5%)
                                        </label>
                                <div className="mt-1">
                                    <NumberField
                                        value={data.percentage}
                                        onChange={({ value }) => setData({
                                            ...data,
                                            percentage: value
                                        })}
                                        field={{
                                            settings: {
                                                placeholder: 'Enter your apy'
                                            }
                                        }}
                                    />
                                </div>
                                <p className="mt-2 text-gray-500 text-xs" id="email-description">
                                    Staking Rewards Annual Return
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6 bg-gray-50">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Total ADA needed
                                        </label>
                                <div className="mt-1">
                                    {toCurrency(getTotalAdaNeeded(data))} ₳
                                </div>
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Annual rewards required
                                        </label>
                                <div className="mt-1">
                                    {toCurrency(getAnnualRewardsRequired(data))} ₳
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 text-gray-400 text-sm">{description}</div>
        </div>
    )
}

