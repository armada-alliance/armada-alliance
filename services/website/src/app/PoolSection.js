import moment from 'moment'
import schema from "../schema"
import cx from "classnames"
import numeral from 'numeral'

const toAda = (input, end = false) => numeral(input / 1000000).format('0,0a');


export default function PoolSection({ pools }) {

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-8 sm:space-y-12">
                    <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Members</h2>
                        <p className="text-xl text-gray-500">
                            {/* {schema.community.description} */}
                        </p>
                    </div>
                    <ul className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
                        {pools.map(pool => {

                            return (
                                <a href={pool.meta.data.db_url} target="_blank" className="p-2 cursor-pointer rounded-lg hover:bg-gray-50">
                                    <div className="space-y-4">
                                        <div className="mx-auto h-12 w-12 rounded-full lg:w-20 lg:h-20 shadow border relative border-gray-200 bg-white">
                                            <div className={cx("absolute top-2 left-2 right-2 bottom-2 bg-center bg-cover rounded-full", pool.meta.data.handles.icon ? "opacity-100" : "opacity-20")} style={{ backgroundImage: `url(${pool.meta.data.handles.icon || schema.about.url_png_icon_64x64})` }}></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-xs font-medium lg:text-sm">
                                                <h3>{pool.ticker}</h3>
                                                <div className="text-xs">{toAda(pool.meta.data.total_stake)} ₳ / {toAda(pool.meta.data.pledge)} ₳</div>
                                                <div className="text-xs text-gray-400">Joined {moment(pool.memberSince).format('YYYY-MM-DD')}</div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}