import { useState } from 'react'
import NumberField from './fields/NumberField'
import RadioField from './fields/RadioField'
import toCurrency from './toCurrency'
import Text from './Text'

const getRequiredAdaPrice = data => {

    const { stake, incomeGoal, frequency, percentage } = data

    if (stake && incomeGoal && frequency && percentage) {
        const priceForAnnual = incomeGoal / (stake * (percentage / 100))
        return frequency === 'monthly' ? priceForAnnual * 12 : priceForAnnual
    }

    return null
}

export default function StakingRewardsCalculator({ description }) {

    const [data, setData] = useState({
        stake: 10000,
        incomeGoal: 20000,
        percentage: 5,
        frequency: 'annual'
    })

    return (
        <div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="grid grid-cols-2 divide-x divide-gray-200">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    <Text>ADA You Own</Text>
                                </label>
                                <div className="mt-1">
                                    <NumberField
                                        value={data.stake}
                                        onChange={({ value }) => setData({
                                            ...data,
                                            stake: value
                                        })}
                                        field={{
                                            settings: {
                                                placeholder: 'Enter your ADA'
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    <Text>APY (Average 5% - 5.5%)</Text>
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
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    <Text>Income goal</Text>
                                </label>
                                <div className="mt-1">
                                    <NumberField
                                        value={data.incomeGoal}
                                        onChange={({ value }) => setData({
                                            ...data,
                                            incomeGoal: value
                                        })}
                                        field={{
                                            settings: {
                                                placeholder: 'Enter your apy'
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mt-1">
                                    <RadioField
                                        id={'frequency'}
                                        value={data.frequency}
                                        onChange={({ value }) => setData({
                                            ...data,
                                            frequency: value
                                        })}
                                        field={{
                                            settings: {
                                                options: [
                                                    { id: 'annual', name: 'Annual' },
                                                    { id: 'monthly', name: 'Monthly' },
                                                ]
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6 bg-gray-50">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    <Text>Required ADA price</Text>
                                </label>
                                <div className="mt-1">
                                    {toCurrency(getRequiredAdaPrice(data))} $
                                </div>
                                <p className="mt-2 text-gray-500 text-xs" id="email-description">
                                    <Text>ADA Price to reach your Income Goal</Text>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 text-gray-400 text-sm">{description}</div>
        </div>
    )
}

