import cx from "classnames"
import toAda from './toAda'
import Link from './Link'
import Text from './Text'
import formatImage from './formatImage'
import { firstBy } from 'thenby'
import WithPageTooltip from './WithPageTooltip'
import AdaPrice from './AdaPrice'
import QualityIndicator from './QualityIndicator'

function GalleryView({ pools }) {

    return (
        <ul className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
            {pools.map(pool => {

                return (
                    <Link internal={true} href={pool.link.href}>
                        <a className="p-2 cursor-pointer rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
                            <div className="space-y-2">
                                <div className="mx-auto h-12 w-12 rounded-full lg:w-20 lg:h-20 shadow border relative border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                    <div className={cx("absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover rounded-full", pool.image ? "opacity-100" : "opacity-20")} data-src={formatImage(pool.image)} ref={ref => { ref ? ref.style = `background-image: url('${formatImage(pool.image)}')` : null }}></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-xs font-medium lg:text-sm">
                                        <h3>{pool.ticker}</h3>
                                        <div className="text-xs flex items-center space-x-1 justify-center">
                                            <WithPageTooltip slug={'/terms/live-stake'}>
                                                {props => (
                                                    <div {...props}>
                                                        <AdaPrice value={toAda(pool.totalStake)} />
                                                    </div>
                                                )}
                                            </WithPageTooltip>
                                            <div>/</div>
                                            <WithPageTooltip slug={'/terms/pledge'}>
                                                {props => (
                                                    <div {...props}>
                                                        <AdaPrice value={toAda(pool.pledge)} />
                                                    </div>
                                                )}
                                            </WithPageTooltip>
                                        </div>
                                        <div className="mt-1">
                                            <WithPageTooltip slug={'/terms/quality-score'}>
                                                {props => (
                                                    <div {...props}>
                                                        <QualityIndicator qualityScore={pool.qualityScore} />
                                                    </div>
                                                )}
                                            </WithPageTooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Link>
                )
            })}
        </ul>
    )
}

function ListView({ pools }) {
    return (
        <div className="shadow-sm border border-transparent dark:border-gray-700 rounded-lg">
            <div className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <div className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 rounded-t-lg">
                    {pools.map((pool) => (
                        <div key={pool.id}>
                            <div className={cx("flex items-center space-x-4 px-6 py-2")}>
                                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-white flex items-center justify-center">
                                    <div className="h-10 w-10 rounded-full bg-white bg-contain bg-no-repeat bg-center" title={pool.image} style={{ backgroundImage: `url('${pool.image}')` }} />
                                </div>
                                <div className="flex flex-grow items-center space-x-2">
                                    <a className="text-sm font-medium text-primary-500" href={pool.url} target={"_blank"}>{pool.name}</a>
                                    <div className="dark:text-white bg-gray-50 dark:bg-gray-800 px-2 py-1 text-gray-400 dark:text-gray-300 text-xs rounded-full flex-shrink-0">{pool.qualityScore} x</div>
                                </div>
                                <div className="ml-auto">
                                    {/* <AdaPrice
                                        value={item.price}
                                        className="space-x-1 font-medium dark:text-gray-100"
                                    /> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function PoolsSection({ pools }) {

    const sortedPools = pools.sort(
        firstBy("qualityScore", "desc")
            .thenBy((a, b) =>
                b.hasImage ? 1 : a.hasImage ? -1 : 0
            )
            .thenBy("memberSince", "desc")
    )


    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-8 sm:space-y-12">
                    <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl dark:text-white"><Text>Stake pools</Text></h2>
                        <p className="text-xl text-gray-500">
                            {/* {schema.community.description} */}
                        </p>
                    </div>
                    <GalleryView
                        pools={sortedPools}
                    />
                </div>
            </div>
        </div>
    )
}