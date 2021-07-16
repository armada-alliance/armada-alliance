import { useState } from 'react'
import shuffle from 'lodash/shuffle'
import formatImage from './formatImage'
import DualColorText from './DualColorText'
import WithPageTooltip from './WithPageTooltip'
import template from 'lodash/template'
import Link from './Link'
import PageTooltip from './PageTooltip'
import Text from './Text'
import AdaPrice from './AdaPrice'

export default function StatsSection({ title, pretitle, description, poolCount, countryCount, liveStake, mintedBlocksCount, delegatorCount, pools }) {

    const [poolSelection] = useState(
        shuffle(pools).slice(0, 10)
    )

    return (
        <div className="bg-gray-50 pt-12 sm:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-base font-semibold tracking-wider text-primary-500 uppercase">{pretitle}</h2>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        <DualColorText>{title}</DualColorText>
                    </h2>
                    <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                        {template(description)({ data: { poolCount, countryCount } })}
                    </p>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-center -space-x-2">
                {poolSelection.map(pool => {

                    return (
                        <WithPageTooltip key={pool.id} slug={pool.link.href}>
                            {props => (
                                <Link href={pool.link.href}>
                                    <a {...props} className="bg-white shadow-md h-10 w-10 rounded-full ring-2 ring-white bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${formatImage(pool.image)}` }} />
                                </Link>
                            )}
                        </WithPageTooltip>
                    )
                })}
            </div>
            <div className="mt-10 pb-12 bg-white sm:pb-16">
                <div className="relative">
                    <div className="absolute inset-0 h-1/2 bg-gray-50" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                        <PageTooltip slug={'/terms/block'}>
                                            <Text>Blocks minted</Text>
                                        </PageTooltip>
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-primary-500">{mintedBlocksCount}</dd>
                                </div>
                                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                        <PageTooltip slug={'/terms/live-stake'}>
                                            <Text>Live stake</Text>
                                        </PageTooltip>
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-primary-500">
                                        <AdaPrice
                                            value={liveStake / 1000000}
                                        />
                                    </dd>
                                </div>
                                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                        <PageTooltip slug={'/terms/delegate'}>
                                            <Text>Delegators</Text>
                                        </PageTooltip>
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-primary-500">{delegatorCount}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
