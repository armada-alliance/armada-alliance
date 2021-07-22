import markdownToText from 'markdown-to-text'
import Link from './Link'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import formatImage from './formatImage'
import WithPageTooltip from './WithPageTooltip'

function Identities({ identities }) {

    return (
        <div className="mx-auto inline-flex items-center space-x-2 text-sm sm:text-base">
            {/* <div className="text-gray-400 text-sm">
                written by
            </div> */}
            {identities.map((identity) => {

                return (
                    <WithPageTooltip slug={identity.link.href}>
                        {(props) => (
                            <Link key={identity.id} href={identity.link.href}>
                                <a {...props} className="flex flex-nowrap items-center px-3 py-2 space-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors duration-50">
                                    <div className="bg-white dark:bg-gray-800 h-8 w-8 rounded-full overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${formatImage(identity.image)})` }} />
                                    <div className="font-bold truncate">
                                        {identity.name}
                                    </div>
                                </a>
                            </Link>
                        )}
                    </WithPageTooltip>

                )

            })}
        </div>
    )
}

export default function PageHeader({ title, subtitle, image, verified, pageType, identities }) {

    return (
        <>
            {image ? (
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-white dark:bg-gray-800 relative rounded-full overflow-hidden w-52 h-52 shadow-md">
                        <div
                            className="absolute top-0 right-0 bottom-0 left-0 bg-center bg-no-repeat bg-cover"
                            style={{
                                backgroundImage: `url(${formatImage(image)})`
                            }}
                        />
                    </div>
                </div>
            ) : null}
            <h1>
                <span className="block text-base text-center text-primary-500 font-semibold tracking-wide uppercase">
                    {pageType}
                </span>
                <span className={"mt-2 block text-3xl leading-8 text-center font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl"}>
                    {markdownToText(title)}
                </span>
                {subtitle || verified ? (
                    <div className="mt-2 flex justify-center items-center space-x-2">
                        {subtitle ? (
                            <span className="block text-base text-center text-gray-400 font-semibold tracking-wide">
                                {subtitle}
                            </span>
                        ) : null}
                        {verified ? (
                            <div className="flex justify-center">
                                <div className="flex items-center space-x-1">
                                    <BadgeCheckIcon className="h-4 text-primary-500" />
                                    <div className="text-primary-500 text-sm">Verified</div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </h1>
            {identities && identities.length ? (
                <div className="py-6 flex justify-center">
                    <Identities identities={identities} />
                </div>
            ) : null}
        </>
    )
}