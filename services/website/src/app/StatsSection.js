import DualColorText from './DualColorText'
import TermTooltip from './TermTooltip'
import Text from './Text'
import toAda from './toAda'

const getBlocksMinted = pools => pools.reduce((result, pool) => {
    return result + parseInt(pool.adapools.data.blocks_lifetime, 10)
}, 0)

const getLiveStake = pools => pools.reduce((result, pool) => {
    return result + parseInt(pool.adapools.data.total_stake, 10)
}, 0)

const getDelegators = pools => pools.reduce((result, pool) => {
    return result + parseInt(pool.adapools.data.delegators, 10)
}, 0)

export default function StatsSection({ pools }) {
    return (
        <div className="bg-gray-50 pt-12 sm:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        <DualColorText>A group of single stake pool operators</DualColorText>
                    </h2>
                    <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                        {pools.length} stake pools operated across {pools.length} different countries with a total of
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
                                        <TermTooltip id={'Block'}>
                                            <Text>Blocks minted</Text>
                                        </TermTooltip>
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-primary-500">{getBlocksMinted(pools)}</dd>
                                </div>
                                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                        <TermTooltip id={'Live stake'}>
                                            <Text>Live stake</Text>
                                        </TermTooltip>
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-primary-500">{toAda(getLiveStake(pools))} ₳</dd>
                                </div>
                                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                        <TermTooltip id={'Delegation'}>
                                            <Text>Delegators</Text>
                                        </TermTooltip>
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-primary-500">{getDelegators(pools)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
