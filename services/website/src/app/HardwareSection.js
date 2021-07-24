import Container from './Container'
import AdaPrice from './AdaPrice'
import cx from 'classnames'

export default function HardwareSection({ pretitle = 'Hardware', title = 'Shopping List', description, items, totalPrice }) {

    console.log('items', items)
    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <Container>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-base font-semibold tracking-wider text-primary-500 uppercase">{pretitle}</h2>
                        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
                            Specifications
                        </h2>
                        <p className="mt-3 text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="mt-12 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow-sm border border-transparent dark:border-gray-700 rounded-lg">
                                <div className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <div className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 rounded-t-lg">
                                        {items.map((item, index) => (
                                            <div key={item.name}>
                                                <div className={cx("flex items-center space-x-4 px-6 py-2")}>
                                                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-white flex items-center justify-center">
                                                        <div className="h-10 w-10 rounded-lg bg-white bg-contain bg-no-repeat bg-center" title={item.image} style={{ backgroundImage: `url('${item.image}')` }} />
                                                    </div>
                                                    <div className="flex flex-grow items-center space-x-2">
                                                        <a className="text-sm font-medium text-primary-500" href={item.url} target={"_blank"}>{item.name}</a>
                                                        <div className="dark:text-white bg-gray-50 dark:bg-gray-800 px-2 py-1 text-gray-400 dark:text-gray-300 text-xs rounded-full flex-shrink-0">{item.quantity} x</div>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <AdaPrice
                                                            value={item.price}
                                                            className="space-x-1 font-medium dark:text-gray-100"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                                        <div className="ml-auto flex items-center space-x-4 px-6 py-4 whitespace-nowrap">
                                            <div className="text-gray-500">Total price</div>
                                            <div className="text-sm text-gray-900 dark:text-white font-bold">
                                                <AdaPrice className="justify-center items-end space-x-1 text-primary-500 text-lg" value={totalPrice} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
