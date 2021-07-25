import Layout from './Layout'
import ContentContainer from './ContentContainer'
import Link from './Link'
import cx from 'classnames'
import Component from './Component'
import formatImage from './formatImage'

export default function IdentitiesPage(props) {

    const { title, identities } = props.props

    return (
        <Component use={Layout} data={props.components.Layout}>
            <ContentContainer>
                <h1>
                    <span className={"mt-2 block text-3xl leading-8 text-center font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl"}>
                        {title}
                    </span>
                </h1>
                <ul className="mt-12 mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
                    {identities.map(identity => {

                        return (
                            <Link href={identity.link.href}>
                                <a className="p-2 cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
                                    <div className="space-y-4">
                                        <div className="mx-auto h-12 w-12 rounded-full lg:w-20 lg:h-20 shadow border relative border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                            <div className={cx("absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover rounded-full")} style={{ backgroundImage: `url(${formatImage(identity.image)})` }}></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-center text-xs font-medium lg:text-sm">
                                                <h3>{identity.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )
                    })}
                </ul>
            </ContentContainer>
        </Component>
    );
}