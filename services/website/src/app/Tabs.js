import Link from './Link'
import Text from './Text'

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example({ tabs }) {

    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
          </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    defaultValue={tabs.find((tab) => tab.current).name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}><Text>{tab.name}</Text></option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link internal={true} href={tab.href}>
                                <a
                                    key={tab.name}
                                    className={classNames(
                                        tab.current
                                            ? 'border-primary-500 text-primary-500'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                                        'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm'
                                    )}
                                    aria-current={tab.current ? 'page' : undefined}
                                >
                                    <Text>{tab.name}</Text>
                                    {tab.count ? (
                                        <span
                                            className={classNames(
                                                tab.current ? 'bg-primary-100 text-primary-500' : 'bg-gray-100 text-gray-900',
                                                'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'
                                            )}
                                        >
                                            {tab.count}
                                        </span>
                                    ) : null}
                                </a>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
