import { useState } from 'react'
import useTestMode from './useTestMode'
import shuffle from 'lodash/shuffle'
import formatImage from './formatImage'
import DualColorText from './DualColorText'
import WithPageTooltip from './WithPageTooltip'
import template from 'lodash/template'
import Link from './Link'
import PageTooltip from './PageTooltip'
import Text from './Text'
import AdaPrice from './AdaPrice'
import EpochClock from './EpochClock'

export default function StatsSection({ title, pretitle, description, poolCount, countryCount, fields, pools }) {

    const [poolSelection] = useState(
        shuffle(pools)
            .slice(0, 10)
            .filter(pool => pool.hasImage)
    )

    const testMode = useTestMode()

    const liveStake = fields.find(field => field.id === 'liveStake')
    const mintedBlocksCount = fields.find(field => field.id === 'mintedBlocksCount')
    const delegatorCount = fields.find(field => field.id === 'delegatorCount')

    return (
        <div className="bg-gray-50 dark:bg-gray-800 pt-12 sm:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-base font-semibold tracking-wider text-primary-500 bg-gradient-to-r from-primary-400 dark:from-primary-300 via-primary-500 to-primary-700 text-gradient uppercase">{pretitle}</h2>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
                        <DualColorText>{title}</DualColorText>
                    </h2>
                    <p className="mt-3 text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
                        {template(description)({ data: { poolCount, countryCount } })}
                    </p>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-center -space-x-2">
                {poolSelection.map(pool => {

                    return (
                        <WithPageTooltip pool={pool} slug={pool.link.href}>
                            {props => (
                                <Link href={pool.link.href}>
                                    <a key={pool.id} {...props}>
                                        <div className="bg-white shadow-md h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-700 bg-center bg-no-repeat bg-cover" ref={ref => { ref ? ref.style = `background-image: url('${formatImage(pool.image)}')` : null }} />
                                    </a>
                                </Link>
                            )}
                        </WithPageTooltip>
                    )
                })}
            </div>
            <div className="mt-10 pb-12 bg-white dark:bg-gray-900 sm:pb-16">
                <div className="relative">
                    <div className="absolute inset-0 h-1/2 bg-gray-50 dark:bg-gray-800" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="rounded-lg bg-white dark:bg-gray-900 shadow-lg border-2 border-white dark:border dark:border-gray-800 sm:grid sm:grid-cols-3">
                                <div className="flex flex-col border-b border-gray-100 dark:border-gray-800 dark:border-gray-800 p-6 text-center sm:border-0 sm:border-r">
                                    <div className="text-5xl font-extrabold text-primary-500 bg-gradient-to-r from-primary-400 dark:from-primary-300 via-primary-500 to-primary-700 text-gradient">{mintedBlocksCount.value}</div>
                                    {mintedBlocksCount.diff ? (
                                        <div className="flex items-center justify-center text-sm">
                                            {mintedBlocksCount.diff > 0 ? (
                                                <div className="flex items-center space-x-1">
                                                    <div className="text-green-500">+{mintedBlocksCount.diff}</div>
                                                    <div className="text-green-500">({mintedBlocksCount.diffPct.toFixed(2)}%)</div>
                                                </div>
                                            ) : null}
                                            {mintedBlocksCount.diff < 0 ? (
                                                <div className="flex items-center space-x-1">
                                                    <div className="text-red-500">{mintedBlocksCount.diff}</div>
                                                    <div className="text-red-500">({mintedBlocksCount.diffPct.toFixed(2)}%)</div>
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : null}
                                    <div className="mt-2 text-lg leading-6 font-medium text-gray-500 dark:text-gray-400">
                                        <PageTooltip slug={'/terms/block'}>
                                            <Text>Blocks minted</Text>
                                        </PageTooltip>
                                    </div>
                                </div>
                                <div className="flex flex-col border-t border-b border-gray-100 dark:border-gray-800 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                    <div className="text-5xl font-extrabold text-primary-500">
                                        <AdaPrice
                                            className="space-x-3 justify-center items-end"
                                            currencySize="text-3xl"
                                            value={liveStake.value / 1000000}
                                        />
                                    </div>
                                    {liveStake.diff ? (
                                        <div className="flex items-center justify-center text-sm">
                                            {liveStake.diff > 0 ? (
                                                <div className="flex items-center space-x-1">
                                                    <div className="text-green-500 flex items-center">+
                                                        <AdaPrice
                                                            className="justify-center items-end space-x-1"
                                                            value={liveStake.diff / 1000000}
                                                        />
                                                    </div>
                                                    <div className="text-green-500">({liveStake.diffPct.toFixed(2)}%)</div>
                                                </div>
                                            ) : null}
                                            {liveStake.diff < 0 ? (
                                                <div className="flex items-center space-x-1">
                                                    <div className="text-red-500 flex items-center">
                                                        <AdaPrice
                                                            className="justify-center items-end space-x-1"
                                                            value={liveStake.diff / 1000000}
                                                        />
                                                    </div>
                                                    <div className="text-red-500">({liveStake.diffPct.toFixed(2)}%)</div>
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : null}
                                    <div className="mt-2 text-lg leading-6 font-medium text-gray-500 dark:text-gray-400">
                                        <PageTooltip slug={'/terms/live-stake'}>
                                            <Text>Live stake</Text>
                                        </PageTooltip>
                                    </div>
                                </div>
                                <div className="flex flex-col border-t border-gray-100 dark:border-gray-800 p-6 text-center sm:border-0 sm:border-l">
                                    <div className="text-5xl font-extrabold text-primary-500 bg-gradient-to-r from-primary-400 dark:from-primary-300 via-primary-500 to-primary-700 text-gradient">{delegatorCount.value}</div>
                                    {delegatorCount.diff ? (
                                        <div className="flex items-center justify-center text-sm">
                                            {delegatorCount.diff > 0 ? (
                                                <div className="flex items-center space-x-1">
                                                    <div className="text-green-500">+{delegatorCount.diff}</div>
                                                    <div className="text-green-500">({delegatorCount.diffPct.toFixed(2)}%)</div>
                                                </div>
                                            ) : null}
                                            {delegatorCount.diff < 0 ? (
                                                <div className="flex items-center space-x-1">
                                                    <div className="text-red-500">{delegatorCount.diff}</div>
                                                    <div className="text-red-500">({delegatorCount.diffPct.toFixed(2)}%)</div>
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : null}
                                    <div className="mt-2 text-lg leading-6 font-medium text-gray-500 dark:text-gray-400">
                                        <PageTooltip slug={'/terms/delegate'}>
                                            <Text>Delegators</Text>
                                        </PageTooltip>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-2">
                                <div className="text-gray-400 text-xs">
                                    *increase / decrease is relative to yesterday
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {testMode ? <EpochClock /> : null}
        </div>
    )
}
