import { useState } from 'react'
import times from 'lodash/times'
import Text from './Text'
import NumberField from './fields/NumberField'
import SelectField from './fields/SelectField'
import toCurrency from './toCurrency'

const getReturnsPerMonth = data => {

    const { stake, duration, percentage } = data

    if (stake && duration && percentage) {
        return Math.ceil(stake * (percentage / 100) / 12)
    }

    return null
}


const getReturnsPerYear = data => {

    const { stake, duration, percentage } = data

    if (stake && duration && percentage) {
        return Math.ceil(stake * (percentage / 100))
    }

    return null
}


const getAvgReturnsPerEpoch = data => {

    const { stake, duration, percentage } = data

    if (stake && duration && percentage) {
        return Math.ceil(stake * (percentage / 100) / 73)
    }

    return null
}


const getTotalRewardsEarned = data => {

    const { stake, duration, percentage } = data

    if (stake && duration && percentage) {
        return Math.ceil(stake * (percentage / 100) * duration)
    }

    return null
}

const getFinalBalance = data => {

    const { stake, duration, percentage } = data

    if (stake && duration && percentage) {
        return Math.ceil(stake + (stake * (percentage / 100) * duration))
    }

    return null
}


const yearOptions = times(20).map(i => {

    return {
        id: i + 1,
        name: `${i + 1} year${i > 1 ? 's' : ''}`
    }
})

export default function StakingRewardsCalculator({ description }) {

    const [data, setData] = useState({
        stake: 10000,
        duration: 1,
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
                                    <Text>How long will you HODL</Text>
                                </label>
                                <div className="mt-1">
                                    <SelectField
                                        value={data.duration}
                                        onChange={({ value }) => setData({
                                            ...data,
                                            duration: value
                                        })}
                                        field={{
                                            settings: {
                                                placeholder: 'Select a duration',
                                                options: yearOptions
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
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6 bg-gray-50">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    <Text>Returns per month</Text>
                                </label>
                                <div className="mt-1">
                                    {toCurrency(getReturnsPerMonth(data))} ₳
                        </div>
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    <Text>Returns per year</Text>
                                </label>
                                <div className="mt-1">
                                    {toCurrency(getReturnsPerYear(data))} ₳
                        </div>
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    <Text>Average returns per epoch</Text>
                                </label>
                                <div className="mt-1">
                                    {toCurrency(getAvgReturnsPerEpoch(data))} ₳
                        </div>
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    <Text>Final balance</Text>
                                </label>
                                <div className="mt-1">
                                    {toCurrency(getFinalBalance(data))} ₳
                        </div>
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    <Text>Total rewards earned</Text>
                                </label>
                                <div className="mt-1">
                                    {toCurrency(getTotalRewardsEarned(data))} ₳
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 text-gray-400 text-sm"><Text>{description}</Text></div>
        </div>
    )
}

