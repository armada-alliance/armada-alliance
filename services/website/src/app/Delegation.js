import { Fragment, useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/solid'
import useTestMode from './useTestMode'
import { Dialog, Transition } from '@headlessui/react'
import cx from 'classnames'
import { CheckCircleIcon } from '@heroicons/react/outline'
import formatImage from './formatImage'
import HashLink from './HashLink'

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
            <div className={cx("bg-contain bg-center bg-no-repeat w-12 h-12 m-2", rounded ? "rounded-full" : null)} style={{ backgroundImage: `url(${image})` }} />
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
                                                setShow(false)
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


function NamiTab({ pools, pool }) {

    const [init, setInit] = useState(false)
    const [nami, setNami] = useState(null)
    const [currentPoolId, setCurrentPoolId] = useState(null)

    const refreshDelegationState = async (nami) => {

        try {
            const delegation = await nami.getDelegation()

            if (pool.addr === delegation.pool_id) {
                setDelegateState('completed')
                setTransactionState('completed')
            } else if (delegation.active) {
                setCurrentPoolId(delegation.pool_id)
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

    let currentPool = null

    if (currentPoolId) {
        currentPool = pools.find(pool => pool.addr === currentPoolId)
    }

    const [toast, setToast] = useState(false)
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

            setCurrentPoolId(null)
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
                        <div className="flex flex-nowrap items-center px-2 py-1 space-x-2 rounded-lg bg-gray-50 dark:bg-gray-800">
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
                <ToastMessage show={toast} onClose={() => setToast(false)} />
                {!init ? (
                    <div
                        className="absolute inset-0 bg-white dark:bg-gray-900 animate animate-pulse"
                    />
                ) : null}
            </div>
        </div>
    )
}

export default function Delegation(props) {

    const testMode = useTestMode()
    const isChrome = process.browser && /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)

    const [open, setOpen] = useState(false)
    let [tabId, setTabId] = useState('nami')

    tabId = isChrome ? tabId : 'alternate'

    const tabs = [
        { id: 'nami', name: 'Nami' },
        { id: 'alternate', name: 'Daedalus/Yoroi' },
    ]

    const { pool } = props

    return (
        <>
            <div className="py-4 flex items-center justify-center">
                <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-full w-40 justify-center text-white bg-primary-500 transition ease-in-out duration-150 focus:outline-none hover:bg-primary-400 focus:border-primary-600 active:bg-primary-600" onClick={() => setOpen(true)}>
                    Delegate
                </button>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="select-none inline-block align-bottom bg-white dark:bg-gray-900 dark:text-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                                <div className="flex justify-center py-6 px-2 border-b border-gray-100 dark:border-gray-800">
                                    <div className="font-bold text-xl flex items-center space-x-2 flex-wrap justify-center">
                                        <div>Delegate to</div>
                                        <div className="flex flex-nowrap items-center px-2 py-1 space-x-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                                            <div className="h-5 w-5 rounded-full overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${formatImage(pool.image)})` }} />
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
                                <div className="py-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                                    {tabId === 'nami' ? (
                                        <NamiTab {...props} />
                                    ) : null}
                                    {tabId === 'alternate' ? (
                                        <AlternateTab {...props} />
                                    ) : null}
                                </div>
                                {tabId === 'nami' ? (
                                    <div className="flex items-center justify-evenly py-4 border-t border-gray-100 dark:border-gray-800 select-none">
                                        <div className="flex-1 text-right text-xs text-gray-300 dark:text-gray-700">Powered by</div>
                                        <a href="https://namiwallet.io/" target="_blank" className="transition-all hover:opacity-50">
                                            <img src="/nami-wallet.svg" className="h-12 mx-6" />
                                        </a>
                                        <div className="flex-1"></div>
                                    </div>
                                ) : null}
                                {tabId === 'alternate' ? (
                                    <div className="flex items-center justify-evenly py-4 border-t border-gray-100 dark:border-gray-800 select-none">
                                        <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-full w-40 justify-center text-white bg-primary-500 transition ease-in-out duration-150 focus:outline-none hover:bg-primary-400 focus:border-primary-600 active:bg-primary-600" onClick={() => setOpen(false)}>
                                            Got it!
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
