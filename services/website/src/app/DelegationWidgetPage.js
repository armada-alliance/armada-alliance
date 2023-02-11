import { Fragment, useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/solid'
import useTestMode from './useTestMode'
import { Dialog, Transition } from '@headlessui/react'
import cx from 'classnames'
import { CheckCircleIcon } from '@heroicons/react/outline'
import formatImage from './formatImage'
import HashLink from './HashLink'
import axios from 'axios'

function Button(props) {

    const { state, children, onClick, disabled } = props

    return (
        <button
            type="button"
            className={cx(
                "inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-full w-40 justify-center text-white transition ease-in-out duration-150 focus:outline-none",
                state === 'completed' ? "bg-green-500" : "bg-primary-500",
                state !== 'default' ? 'cursor-default' : "hover:bg-primary-400 focus:border-primary-600 active:bg-primary-600"
            )}
            disabled={state !== 'default' || disabled}
            onClick={onClick}
        >
            {state === 'loading' ? (
                <svg className="animate-spin h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {state === 'completed' ? (
                <CheckCircleIcon className="h-5" />
            ) : null}
            {state === 'default' ? children : null}
        </button>
    )
}

function SquareButton({ image, name, href, rounded = false }) {

    return (
        <a href={href} target="_blank" className="border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4 inline-block focus:ring-2 focus:ring-primary-600">
            <div className={cx("bg-contain bg-center bg-no-repeat w-12 h-12 m-2", rounded ? "rounded-full" : "rounded-sm", image ? null : "bg-white dark:bg-gray-700")} style={{ backgroundImage: image ? `url(${image})` : null }} />
            <div className="font-bold text-sm">
                {name}
            </div>
        </a>
    )
}


function AlternateTab({ pool }) {

    return (
        <div className="text-center px-6">
            <div className="space-y-10">
                <div className="space-y-4">
                    <h2 className="font-bold">1. Buy ADA on an exchange</h2>
                    <div className="space-x-4">
                        <SquareButton image="/binance.svg" name="Binance" href="https://binance.com" />
                        <SquareButton image="/kraken.svg" name="Kraken" href="https://kraken.com" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="font-bold">2. Transfer your ADA to a wallet</h2>
                    <div className="space-x-4">
                        <SquareButton image="/daedalus.svg" name="Daedalus" href="https://daedaluswallet.io" />
                        <SquareButton image="/yoroi.svg" name="Yoroi" href="https://yoroi-wallet.com" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="font-bold">3. Go to staking / delegation center</h2>
                    <p className="text-gray-400 text-sm">Search for my pool, select delegate and choose the wallet you want to use for staking</p>
                    <div className="space-x-4">
                        <SquareButton image={pool.image} name={pool.ticker} href={pool.website} rounded={true} />
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="font-bold">4. Enjoy your staking rewards</h2>
                    <p className="text-gray-400 text-sm">You'll receive staking rewards every epoch (5 days)</p>
                </div>
            </div>
        </div>
    )
}

function ToastMessage({ show, onClose }) {

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 pt-0.5">
                                        <img src="/nami-wallet.svg" className="h-12" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900">Nami Wallet</p>
                                        <p className="mt-1 text-sm text-gray-500">I would like to be installed first.</p>
                                        <div className="mt-4 flex">
                                            <a
                                                target="_blank"
                                                href="https://namiwallet.io/"
                                                onClick={onClose}
                                                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400"
                                            >
                                                Accept
                                            </a>
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex">
                                        <button
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                            onClick={() => {
                                                onClose()
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}


function NamiTab({ ctx, pool, toast, setToast }) {

    const [init, setInit] = useState(false)
    const [nami, setNami] = useState(null)
    const [currentPool, setCurrentPool] = useState(null)

    const refreshDelegationState = async (nami) => {

        try {
            const delegation = await nami.getDelegation()

            if (pool.addr === delegation.pool_id) {
                setDelegateState('completed')
                setTransactionState('completed')
            } else if (delegation.active) {
                const poolId = nami.getPoolId(delegation.pool_id)
                const pool = await getPool(poolId)
                console.log({
                    id: poolId,
                    addr: delegation.pool_id
                })
                setCurrentPool(pool)
            }
        } catch (e) {
            console.log(e)
            console.log('failed to fetch delegation')
        }
    }

    useEffect(async () => {

        if (nami) return

        if (process.browser && window.cardano && window.cardano.nami) {
            const walletAPI = await window.cardano.nami.enable()
            if (walletAPI) {

                const { default: createNami } = await import('./nami')
                const _nami = createNami({ blockfrost_project_id: 'gvIrp8FwB2oK1dpCI1ZxhUHkY8Bb5H9e', walletAPI })
                setNami(_nami)

                setConnectState('completed')
                await refreshDelegationState(_nami)
            }
        }

        setInit(true)

    })

    const [connectState, setConnectState] = useState('default')
    const [delegateState, setDelegateState] = useState('default')
    const [transactionState, setTransactionState] = useState('default')
    const [delegateError, setDelegateError] = useState(null)
    const [txHash, setTxHash] = useState(null)

    const handleConnect = async () => {

        if (!window.cardano) {
            setToast(true)
            return
        }

        if (connectState !== 'default') return

        setConnectState('loading')

        try {

            if (!nami) {
                if (process.browser && window.cardano && window.cardano.nami) {
                    const walletAPI = await window.cardano.nami.enable()
                    if (walletAPI) {
                        const { default: createNami } = await import('./nami')
                        const _nami = createNami({ blockfrost_project_id: 'gvIrp8FwB2oK1dpCI1ZxhUHkY8Bb5H9e', walletAPI })
                        setNami(_nami)
                    }
                }
            }

            await refreshDelegationState(nami)
            setConnectState('completed')
        } catch (e) {
            setConnectState('default')
        }
    }

    const handleDelegate = async () => {

        if (connectState !== 'completed') return

        setDelegateState('loading')
        setDelegateError(null)

        try {

            const delegation = await nami.getDelegation(); // you can also use this one to check for current deleagation status (for the UI, like if the user is already delegate in the pool you just selected)
            // console.log('delegation', delegation)
            const targetPoolId = pool.addr;
            // console.log(`delegate to: ${targetPoolId}`)
            const tx = await nami.delegationTx(delegation, targetPoolId);
            const signedTx = await nami.signTx(tx);
            setDelegateState('completed')
            setTransactionState('loading')
            const txHash = await nami.submitTx(signedTx);
            window.gtag('event', 'delegate', {
                pool_addr: pool.addr,
                transaction_id: txHash,
                value: 1
            })
            setTxHash(txHash)
            console.log(`transaction submitted: ${txHash}`)

            await new Promise((res, rej) => {
                const awaitInterval = setInterval(async () => {
                    const result = await nami.blockfrostRequest(`/txs/${txHash}`);
                    if (result && !result.error) {
                        clearInterval(awaitInterval);
                        res();
                        // set your states
                        return;
                    }
                }, 3000)
            })
            setTransactionState('completed')

            setCurrentPool(null)
        } catch (e) {
            console.dir(e)
            setDelegateError('Transaction not possible (maybe insufficient balance)')
            setDelegateState('default')
        }
    }

    return (
        <div className="relative">
            <div className="flex flex-col items-center space-y-6 ">
                <div>
                    <div className="text-center mb-2 text-gray-500">Step 1</div>
                    <Button
                        state={connectState}
                        onClick={handleConnect}
                    >
                        Connect
                    </Button>
                </div>
                <div className="w-0.5 bg-gray-100 dark:bg-gray-800 h-12" />
                {currentPool ? (
                    <>
                        <div className="flex text-gray-700 dark:text-gray-300 items-center space-x-2 text-xs">
                            <div className="text-gray-400 dark:text-gray-300">Currently delegated to</div>
                            <div className="flex flex-nowrap items-center px-2 py-1 space-x-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                                {currentPool.image ? (
                                    <div className="h-5 w-5 rounded-full overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${formatImage(currentPool.image)})` }} />
                                ) : null}
                                <div className="font-bold truncate">
                                    {currentPool.name}
                                </div>
                            </div>
                        </div>
                        <div className="w-0.5 bg-gray-100 dark:bg-gray-800 h-12" />
                    </>
                ) : null}
                <div className="flex flex-col items-center">
                    <div className="text-center mb-2 text-gray-500">Step 2</div>
                    <Button
                        state={delegateState}
                        onClick={handleDelegate}
                        disabled={connectState !== 'completed'}
                    >
                        Delegate
                    </Button>
                    {delegateError ? (
                        <div className="mt-2 text-red-500 text-xs">
                            {delegateError}
                        </div>
                    ) : null}
                </div>
                <div className="w-0.5 bg-gray-100 dark:bg-gray-800 h-12" />
                {txHash ? (
                    <>
                        <div className="flex flex-col items-center">
                            <div className="mb-2 text-gray-500 text-sm">Transaction submitted </div>
                            <HashLink href={`https://cardanoscan.io/transaction/${txHash}`} hash={txHash} />
                        </div>
                        <div className="w-0.5 bg-gray-100 dark:bg-gray-800 h-12" />
                    </>
                ) : null}
                {transactionState === 'default' ? (
                    <div className="font-bold text-gray-400">Waiting for delegation</div>
                ) : null}
                {transactionState === 'loading' ? (
                    <div className="flex items-center space-x-2">
                        <svg className="animate-spin flex-shrink-0 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <div className="font-bold text-gray-400">Confirming transaction</div>

                    </div>
                ) : null}
                {transactionState === 'completed' ? (
                    <div className="font-bold text-gray-700 dark:text-gray-100 flex items-center space-x-2">
                        <div>Delegated to</div>
                        <div className="flex flex-nowrap items-center px-2 py-1 space-x-2 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100">
                            {pool.image ? (
                                <div className="h-5 w-5 rounded-full overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${formatImage(pool.image)})` }} />
                            ) : null}
                            <div className="font-bold truncate">
                                {pool.name}
                            </div>
                        </div>
                        <div>{'🎉 !'}</div>
                    </div>
                ) : null}
                {!init ? (
                    <div
                        className="absolute inset-0 bg-white dark:bg-gray-900 animate animate-pulse"
                    />
                ) : null}
            </div>
        </div>
    )
}

function Delegation(props) {

    const { onClose } = props

    const isChrome = process.browser && /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)

    let [tabId, setTabId] = useState('nami')
    const [toast, setToast] = useState(false)

    tabId = isChrome ? tabId : 'alternate'

    const tabs = [
        { id: 'nami', name: 'Nami' },
        { id: 'alternate', name: 'Daedalus/Yoroi' },
    ]

    const { pool } = props

    return (
        <>
            <div className="pt-44 pb-44 dark:bg-gray-900 dark:text-white">
                {tabId === 'nami' ? (
                    <NamiTab {...props} toast={toast} setToast={setToast} />
                ) : null}
                {tabId === 'alternate' ? (
                    <AlternateTab {...props} />
                ) : null}
            </div>
            <div className="fixed top-0 left-0 w-full bg-white  dark:bg-gray-900 dark:text-white">
                <div className="flex justify-center py-6 px-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="font-bold text-xl flex items-center space-x-2">
                        <div>Delegate to</div>
                        <div className="flex flex-nowrap items-center px-2 py-1 space-x-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                            {pool.image ? (
                                <div className="h-5 w-5 rounded-full overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${formatImage(pool.image)})` }} />
                            ) : null}
                            <div className="font-bold truncate">
                                {pool.name}
                            </div>
                        </div>
                    </div>
                </div>
                {isChrome ? (
                    <div className="py-2 flex justify-center border-b border-gray-100 dark:border-gray-800">
                        <nav className="flex space-x-4">
                            {tabs.map((tab) => (
                                <button
                                    type="button"
                                    key={tab.id}
                                    className={cx(
                                        tab.id === tabId ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : 'text-gray-500 hover:text-gray-700',
                                        'px-3 py-2 font-medium text-sm rounded-md cursor-pointer focus:outline-none'
                                    )}
                                    onClick={() => setTabId(tab.id)}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                ) : null}
            </div>
            {tabId === 'nami' ? (
                <div className="bg-white dark:bg-gray-900 dark:text-white fixed bottom-0 left-0 w-full flex items-center space-x-4 px-6 py-4 border-t border-gray-100 dark:border-gray-800 select-none">
                    <div className="ml-auto flex space-x-4 items-center">
                        <div className="flex-1 text-right text-xs text-gray-300">Powered by</div>
                        <a href="https://namiwallet.io/" title="Nami Wallet" target="_blank" className="transition-all hover:opacity-50">
                            <img src="/nami-wallet.svg" className="h-8" />
                        </a>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <a href="https://armada-alliance.com/" title="Armada Alliance" target="_blank" className="transition-all hover:opacity-50">
                            <img src="https://armada-alliance.com/ship-420.png" className="h-8" />
                        </a>
                    </div>
                </div>
            ) : null}
            {tabId === 'alternate' ? (
                <div className="bg-white dark:bg-gray-900 dark:text-white fixed bottom-0 left-0 w-full flex items-center justify-evenly py-4 border-t border-gray-100  dark:border-gray-800 select-none">
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-full w-40 justify-center text-white bg-primary-500 transition ease-in-out duration-150 focus:outline-none hover:bg-primary-400 focus:border-primary-600 active:bg-primary-600" onClick={onClose}>
                        Got it!
                    </button>
                </div>
            ) : null}
            <ToastMessage show={toast} onClose={() => setToast(false)} />
        </>
    )
}

const getPool = async (pool_id) => {
    try {
        const response = await axios.get(`https://js.adapools.org/pools/${pool_id}/summary.json`)
        if (response.data.data.pool_id !== pool_id) {
            return null
        }
        const { data } = response.data
        return {
            id: pool_id,
            name: data.db_name,
            ticker: data.db_ticker,
            image: data.handles.icon ? data.handles.icon : null,
            addr: data.pool_id_bech32
        }
    } catch (e) {
        return null
    }
}

export default function DelegationWidgetPage() {

    const [error, setError] = useState(null)
    const [pool, setPool] = useState(null)
    const [init, setInit] = useState(false)

    if (!process.browser) {
        return null
    }

    const searchParams = new URLSearchParams(window.location.search)

    const pool_id = searchParams.get('pool_id')
    const blockfrost_project_id = searchParams.get('blockfrost_project_id')

    if (!pool_id || !blockfrost_project_id) {
        return (
            <ul>
                {!pool_id ? (
                    <li><i>?pool_id</i> not specified</li>
                ) : null}
                {!blockfrost_project_id ? (
                    <li><i>?blockfrost_project_id</i> not specified</li>
                ) : null}
            </ul>
        )
    }

    useEffect(async () => {
        if (init) return

        try {
            const pool = await getPool(pool_id)
            if (!pool) {
                setError(true)
            }
            setPool(pool)
        } catch (e) {

            setError(true)

        } finally {
            setInit(true)
        }

    })

    if (error) {
        return (
            <div>
                Something went wrong. Check the query parameters.
            </div>
        )
    }

    if (!init) {
        return (
            <div>
                loading...
            </div>
        )
    }

    console.log({
        pool,
        blockfrost_project_id
    })

    return (
        <Delegation
            pool={pool}
            ctx={{ blockfrost_project_id }}
            onClose={() => {
                window.close()
            }}
        />
    )
}
