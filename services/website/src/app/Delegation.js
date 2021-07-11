import { Fragment, useState } from 'react'
import useTestMode from './useTestMode'
import { Dialog, Transition } from '@headlessui/react'
import cx from 'classnames'
import { CheckCircleIcon } from '@heroicons/react/outline'
import formatImage from './formatImage'

function Button(props) {

    const { state, children, onClick, disabled } = props

    return (
        <button
            type="button"
            className={cx(
                "inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-full w-40 justify-center text-white transition ease-in-out duration-150 focus:outline-none",
                state === 'completed' ? "bg-green-500" : "bg-primary-500",
                state !== 'default' ? 'cursor-not-allowed' : "hover:bg-primary-400 focus:border-primary-600 active:bg-primary-600"
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

function SquareButton({ image, name, href }) {

    return (
        <a href={href} target="_blank" className="border border-gray-200 rounded-lg shadow p-4 inline-block focus:ring-2 focus:ring-primary-600">
            <div className="bg-contain bg-center bg-no-repeat w-12 h-12 m-2" style={{ backgroundImage: `url(${image})` }} />
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
                        <SquareButton image={pool.image} name={pool.ticker} href={pool.website} />
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

function DefaultTab({ pool }) {

    const [connectState, setConnectState] = useState('default')
    const [delegateState, setDelegateState] = useState('default')

    const handleConnect = () => {

        if (connectState !== 'default') return

        setConnectState('loading')

        setTimeout(() => {
            setConnectState('completed')
        }, 2000)
    }

    const handleDelegate = () => {

        if (connectState !== 'completed') return

        setDelegateState('loading')

        setTimeout(() => {
            setDelegateState('completed')
        }, 2000)
    }

    return (
        <>
            <div>
                <div className="text-center mb-2 text-gray-500">Step 1</div>
                <Button
                    state={connectState}
                    onClick={handleConnect}
                >
                    Connect
                                        </Button>
            </div>
            <div className="w-0.5 bg-gray-100 h-12" />
            <div>
                <div className="text-center mb-2 text-gray-500">Step 2</div>
                <Button
                    state={delegateState}
                    onClick={handleDelegate}
                    disabled={connectState !== 'completed'}
                >
                    Delegate
                                        </Button>
            </div>
            <div className="w-0.5 bg-gray-100 h-12" />

            {delegateState === 'default' ? (
                <div className="font-bold text-gray-400">Waiting for delegation</div>
            ) : null}
            {delegateState === 'loading' ? (
                <svg className="animate-spin h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {delegateState === 'completed' ? (
                <div className="font-bold text-gray-700 flex items-center space-x-2">
                    <div>Delegated to</div>
                    <div className="flex flex-nowrap items-center px-2 py-1 space-x-2 rounded-lg bg-gray-50">
                        <div className="h-5 w-5 rounded-full overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${formatImage(pool.image)})` }} />
                        <div className="font-bold truncate">
                            {pool.name}
                        </div>
                    </div>
                    <div>{'🎉 !'}</div>
                </div>
            ) : null}
        </>
    )
}

export default function Delegation(props) {

    const testMode = useTestMode()
    const hasNami = process.browser && window.cardano && testMode

    const [open, setOpen] = useState(false)
    let [tabId, setTabId] = useState('nami')

    tabId = hasNami ? tabId : 'alternate'

    const tabs = [
        { id: 'nami', name: 'Nami' },
        { id: 'alternate', name: 'Daedalus/Yoroi' },
    ]

    return (
        <>
            <div className="mt-4 flex items-center">
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
                            <div className="select-none inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                                <div className="flex justify-center py-6 border-b border-gray-100">
                                    <div className="font-bold text-xl">How to delegate</div>
                                </div>
                                {hasNami ? (
                                    <div className="py-2 flex justify-center border-b border-gray-100">
                                        <nav className="flex space-x-4">
                                            {tabs.map((tab) => (
                                                <button
                                                    type="button"
                                                    key={tab.id}
                                                    className={cx(
                                                        tab.id === tabId ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
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
                                <div className="flex flex-col items-center space-y-6 py-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                                    {tabId === 'nami' ? (
                                        <DefaultTab {...props} />
                                    ) : null}
                                    {tabId === 'alternate' ? (
                                        <AlternateTab {...props} />
                                    ) : null}
                                </div>
                                {tabId === 'nami' ? (
                                    <div className="flex items-center justify-evenly py-4 border-t border-gray-100 select-none">
                                        <div className="flex-1 text-right text-xs text-gray-300">Powered by</div>
                                        <a href="https://nami-wallet.io" target="_blank" className="transition-all hover:opacity-50">
                                            <img src="/nami-wallet.svg" className="h-12 mx-6" />
                                        </a>
                                        <div className="flex-1"></div>
                                    </div>
                                ) : null}
                                {tabId === 'alternate' ? (
                                    <div className="flex items-center justify-evenly py-4 border-t border-gray-100 select-none">
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