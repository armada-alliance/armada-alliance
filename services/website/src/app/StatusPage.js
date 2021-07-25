import { useEffect, useState } from 'react'
import { css, keyframes } from '@emotion/react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import Layout from './Layout'
import ContentContainer from './ContentContainer'
import Component from './Component'
import axios from 'axios'
import { times } from 'lodash'
import moment from 'moment'
import cx from 'classnames'

const pulsate = keyframes`
0% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
}
50% {
    opacity: 1;
}
100% {
    transform: scale(2);
    -webkit-transform: scale(2);
    opacity: 0;
}
`;

function Pulsate() {

    return (
        <div className="relative">
            <span
                className="bg-green-500"
                css={css`
          height: 10px;
          width: 10px;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          &:before {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            border-radius: 100%;
            border: 2px #11b981 solid;
            box-sizing: border-box;
            animation: ${pulsate} 1.5s ease-out;
            animation-iteration-count: infinite;
            animation-delay: 1.1s;
          }
        `}
            />
        </div>
    )
}

function Tooltip(props) {

    const { title, subtitle, children } = props

    const [hover, setHover] = useState(false)

    return (
        <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {children}
            {hover ? (
                <span className="absolute inset-x-0 bottom-full mb-2.5 flex justify-center w-56 -ml-28">
                    <span className="bg-gray-900 text-white rounded-md text-xs py-3 px-3 filter drop-shadow-md">
                        <svg width="16" height="6" viewBox="0 0 16 6" className="text-gray-900 absolute top-full left-1/2 -mt-px -ml-2">
                            <path fillRule="evenodd" clipRule="evenodd" d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z" fill="currentColor"></path>
                        </svg>
                        <div className="text-gray-500">{title}</div>
                        <div className="text-white text-base">{subtitle}</div>
                    </span>
                </span>
            ) : null}
        </div>
    )
}

const getMetricMeta = (uptimePct) => {

    const hasUptime = uptimePct === 0 || !!uptimePct
    const green = hasUptime && uptimePct >= 98
    const opacity = hasUptime && uptimePct >= 98 && uptimePct < 100
    const orange = hasUptime && uptimePct >= 95 && uptimePct < 98
    const red = hasUptime && uptimePct < 95
    const gray = !hasUptime
    return { hasUptime, green, opacity, orange, red, gray }
}

function PoolMetrics({ metrics }) {

    const startDate = moment.utc().subtract(90, 'days')
    const dates = times(90).map(i => startDate.clone().add(i + 1, 'days'))

    return (
        <div className="inline-flex items-center space-x-1">
            {dates.map(date => {

                const dateString = date.format('YYYY-MM-DD')
                const uptimePct = metrics[dateString]

                const { hasUptime, gray, green, orange, red, opacity } = getMetricMeta(uptimePct)

                let title = date.format('MMM D, YYYY')
                let subtitle = hasUptime ? `${uptimePct}%` : 'No Records'

                return (
                    <Tooltip title={title} subtitle={subtitle}>
                        <div
                            className={cx(
                                "w-1 h-8 rounded-full",
                                {
                                    "bg-gray-200 dark:bg-gray-700": gray,
                                    "bg-green-500": green,
                                    "bg-orange-500": orange,
                                    "bg-red-500": red,
                                    "bg-opacity-75": opacity
                                }
                            )}
                        />
                    </Tooltip>
                )
            })}
        </div >
    )
}

export default function StatusPage(props) {

    const { title } = props.props
    const [pools, setPools] = useState(null)

    useEffect(async () => {
        if (pools) return

        const { data: { pools: _pools } } = await axios.get('https://api.sublayer.io/armada-api/ping/pools?includeMetrics=true')

        setPools(_pools)
    })

    return (
        <Component use={Layout} data={props.components.Layout}>
            <ContentContainer>
                <h1>
                    <span className={"mt-2 block text-3xl leading-8 text-center font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl"}>
                        {title}
                    </span>
                </h1>
                <div className="mt-12 mx-auto flex justify-center">
                    {pools ? (
                        <div className="space-y-4">
                            {pools.map(pool => {
                                const { avgUptimePct } = pool
                                const { hasUptime, gray, green, orange, red, opacity } = getMetricMeta(avgUptimePct)

                                return (
                                    <div className="p-4 shadow-sm bg-white dark:bg-gray-800 rounded-lg space-y-2">
                                        <div className="flex items-center">
                                            <div className="flex items-center text-gray-700 dark:text-gray-200 space-x-2">
                                                <div className="font-medium">{pool.ticker}</div>
                                                <ArrowRightIcon className="h-3 text-gray-400 dark:text-gray-600" />
                                                <div className="h-4 border-l border-gray-400 dark:border-gray-600" />
                                                <div
                                                    className={cx({
                                                        "text-gray-400 dark:text-gray-700": gray,
                                                        "text-green-500": green,
                                                        "text-orange-500": orange,
                                                        "text-red-500": red,
                                                        "text-opacity-75": opacity
                                                    })}
                                                >
                                                    {hasUptime ? `${avgUptimePct}%` : 'No Data'}
                                                </div>
                                            </div>
                                            <div className="ml-auto flex items-center space-x-2 text-green-500 text-sm">
                                                <Pulsate />
                                                <div>
                                                    Operational
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <PoolMetrics metrics={pool.metrics} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div>
                            loading...
                        </div>
                    )}
                </div>
            </ContentContainer>
        </Component>
    );
}