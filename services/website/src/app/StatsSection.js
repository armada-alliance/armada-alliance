import DualColorText from './DualColorText'
import PageTooltip from './PageTooltip'
import Text from './Text'
import AdaPrice from './AdaPrice'
import template from 'lodash/template'

export default function StatsSection({ title, pretitle, description, poolCount, countryCount, liveStake, mintedBlocksCount, delegatorCount }) {
    return (
        <div className="bg-gray-50 pt-12 sm:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-base font-semibold tracking-wider text-primary-500 uppercase">{pretitle}</h2>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        <DualColorText>{title}</DualColorText>
                    </h2>
                    <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                        {template(description)({ poolCount, countryCount })}
                    </p>
                </div>
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
