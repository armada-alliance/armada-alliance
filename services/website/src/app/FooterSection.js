import moment from 'moment'
import schema from '../schema'
import navigation from './navigation-data'

export default function FooterSection() {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                    {navigation.main.map((item) => (
                        <div key={item.name} className="px-5 py-2">
                            <a href={item.href} target={item.target} className="text-base text-gray-500 hover:text-gray-900">
                                {item.name}
                            </a>
                        </div>
                    ))}
                </nav>
                <div className="mt-8 flex justify-center space-x-6">
                    {navigation.social.map((item) => (
                        <a key={item.name} href={item.href} target="_blank" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </a>
                    ))}
                </div>
                <p className="mt-8 text-center text-base text-gray-400">{moment().format('YYYY')} {schema.about.name}.</p>
                <p className="mt-1 text-center text-xs font-bold">Generated at {moment(schema.createdAt).calendar()}</p>
            </div>
        </footer>
    )
}
