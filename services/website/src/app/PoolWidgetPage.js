import moment from 'moment'
import cx from "classnames"
import toAda from './toAda'
import Link from './Link'
import Text from './Text'

export default function PoolWidgetPage(props) {

    const { pool } = props.props

    const fields = [
        {
            name: 'Stake',
            render: ({ pool }) => <div>{toAda(pool.totalStake)} ₳ </div>
        },
        {
            name: 'Saturation',
            render: ({ pool }) => <div>{toAda(pool.pledge)} ₳ </div>
        },
        {
            name: 'Margin',
            render: ({ pool }) => <div>{parseFloat(pool.taxRatio) * 100} %</div>
        },
        {
            name: 'Pledge',
            render: ({ pool }) => <div>{toAda(pool.pledge)} ₳</div>
        },
        {
            name: 'Fixed cost',
            render: ({ pool }) => <div>{toAda(pool.taxFix)} ₳</div>
        },
        {
            name: 'Joined',
            render: ({ pool }) => <div>{moment(pool.memberSince).format('YYYY-MM-DD')}</div>
        },
    ]

    return (
        <div className="">
            <div className="bg-white flex-items-center">
                <div className="mx-auto max-w-2xl flex items-center space-x-4 p-4">
                    <div className="h-12 w-12 rounded-full lg:w-20 lg:h-20 shadow border relative border-gray-200 bg-white">
                        <div className={cx("absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover rounded-full", pool.image ? "opacity-100" : "opacity-20")} style={{ backgroundImage: `url(${pool.image ? pool.image : 'https://armada-alliance.com/assets/ship-420.png'})` }}></div>
                    </div>
                    <div className="space-y-1 flex-grow">
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-bold">{pool.name}</h3>
                            <div className="text-gray-500 text-lg">{pool.ticker}</div>
                        </div>
                        <div className="flex items-center justify-between w-full space-x-4">
                            {fields.map(field => {
                                return (
                                    <div>
                                        <div className="uppercase text-xs text-gray-500">
                                            {field.name}
                                        </div>
                                        <div>
                                            {field.render({ pool })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center bg-gray-50">
                <div className="flex items-center mx-auto p-4 w-full max-w-2xl">
                    <a target="_blank" href="https://armada-alliance.com" className="ml-auto flex items-center space-x-2">
                        <div className="text-gray-400 text-xs">Proud member of the</div>
                        <div className="h-8 w-8 rounded-full shadow border relative border-gray-200 bg-white">
                            <div className={cx("absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover rounded-full", pool.image ? "opacity-100" : "opacity-20")} style={{ backgroundImage: `url(https://armada-alliance.com/assets/ship-420.png)` }}></div>
                        </div>
                        <div className="flex items-center space-x-1"><div className="font-bold">Armada</div><div className="font-bold text-primary-500">Alliance</div></div>
                    </a>
                </div>
            </div>
        </div>
    )
}