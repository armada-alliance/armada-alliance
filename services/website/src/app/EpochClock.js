import axios from "axios"
import { useEffect, useState } from "react"
import moment from 'moment'
import DualColorText from './DualColorText'
import cx from 'classnames'

export default function EpochClock() {

    const [data, setData] = useState(null)

    useEffect(async () => {
        if (data) return
        const { data: _data } = await axios.get(`https://cardano-mainnet.blockfrost.io/api/v0/epochs/278`, {
            headers: {
                project_id: 'gvIrp8FwB2oK1dpCI1ZxhUHkY8Bb5H9e'
            }
        })

        setData(_data)
    })

    if (!data) {
        return null
    }

    const startTime = data.start_time * 1000
    const endTime = data.end_time * 1000
    const duration = endTime - startTime
    const currentTime = new Date().valueOf()
    const progress = ((currentTime - startTime) / duration) * 100

    const epochs = [
        {
            type: 'upcoming',
            epoch: data.epoch + 3,
            startTime: startTime + (duration * 3),
            endTime: endTime + (duration * 3),
            progress: 0,
            description: ({ epoch }) => <>The rewards for <strong>epoch {epoch - 2}</strong> are now available for you to withdraw. Your stake remains still active. Now rewards for <strong>epoch {epoch - 1}</strong> are being calculated.</>
        },
        {
            type: 'upcoming',
            epoch: data.epoch + 2,
            startTime: startTime + (duration * 2),
            endTime: endTime + (duration * 2),
            progress: 0,
            description: ({ epoch }) => <>Your stake is still active. During this epoch you're earning rewards. The exact amount of rewards are now being calculated for <strong>epoch {epoch - 1}</strong> (previous epoch)</>
        },
        {
            type: 'upcoming',
            epoch: data.epoch + 1,
            startTime: startTime + (duration * 1),
            endTime: endTime + (duration * 1),
            progress: 0,
            description: props => `Your stake is now active. During this epoch you're technically earning rewards, but they're neither known or given to you yet.`
        },
        {
            type: 'current',
            epoch: data.epoch,
            startTime,
            endTime,
            progress,
            description: props => `You've delegated your ADA. Your stake isn't earning rewards until the next epoch`
        }
    ].reverse()

    return (
        <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-base font-semibold tracking-wider text-primary-500 uppercase">Staking Rewards</h2>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        <DualColorText>{'When do I receive rewards'}</DualColorText>
                    </h2>
                    <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                        It will take 15 to 20 days between the time you first delegate your ADA and when you receive your first reward payout. After this, you will receive rewards every epoch (5 days) which were earned by your active stake from 2 epochs prior.
                    </p>
                </div>
            </div>
            <div className="mt-6 max-w-4xl mx-auto">
                <div className="space-y-4">
                    {epochs.map(epoch => {

                        return (
                            <div className={cx("rounded-lg shadow-md bg-white", epoch.planned ? "" : "")}>
                                <div className="p-4">
                                    <div className="flex items-center">
                                        <div className="flex items-center space-x-2">
                                            <div className="font-bold">
                                                Epoch {epoch.epoch}
                                            </div>
                                            {epoch.type === 'current' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                                    Current
                                                </span>
                                            ) : null}
                                            {epoch.type === 'upcoming' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Upcoming
                                                </span>
                                            ) : null}
                                            {epoch.type === 'rewards' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Rewards
                                                </span>
                                            ) : null}
                                        </div>
                                        {epoch.startTime < currentTime && epoch.endTime > currentTime ? (
                                            <div className="ml-auto text-xs text-gray-400">
                                                ending {moment(epoch.endTime).fromNow()}
                                            </div>
                                        ) : (
                                            <div className="ml-auto text-xs text-gray-400">
                                                starting {moment(epoch.startTime).fromNow()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2 text-gray-500 text-sm">
                                        {epoch.description(epoch)}
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-b-lg p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs text-gray-400 font-bold">
                                            {moment(epoch.startTime).format('dddd, MMMM Do YYYY, HH:mm')}
                                        </div>
                                        <div className="text-xs text-gray-400 font-bold">
                                            {moment(epoch.endTime).format('dddd, MMMM Do YYYY, HH:mm')}
                                        </div>
                                    </div>
                                    <div className="relative rounded-full bg-white h-3 shadow-sm">
                                        <div className="absolute top-0 left-0 h-3 bg-primary-500 rounded-full" style={{ width: epoch.progress + '%' }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}