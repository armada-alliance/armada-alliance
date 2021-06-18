import { useContext } from 'react'
import Layout from './Layout'
import ContentContainer from './ContentContainer'
import Context from './Context'
import pages from '../pages'
import Link from './Link'
import cx from 'classnames'

export default function IdentitiesMainPage(props) {

    const ctx = useContext(Context)

    const identities = pages.filter(page => page.template === "IdentityDetailPage" && page.language === ctx.language)

    return (
        <Layout>
            <ContentContainer>
                <h1>
                    <span className={"mt-2 block text-3xl leading-8 text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl"}>
                        {props.page.title}
                    </span>
                </h1>
                <ul className="mt-12 mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
                    {identities.map(identity => {

                        return (
                            <Link href={identity.slug}>
                                <a className="p-2 cursor-pointer rounded-lg hover:bg-gray-50">
                                    <div className="space-y-4">
                                        <div className="mx-auto h-12 w-12 rounded-full lg:w-20 lg:h-20 shadow border relative border-gray-200 bg-white">
                                            <div className={cx("absolute top-2 left-2 right-2 bottom-2 bg-center bg-cover rounded-full")} style={{ backgroundImage: `url(https://armada-alliance.com/assets/${identity.image})` }}></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-center text-xs font-medium lg:text-sm">
                                                <h3>{identity.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )
                    })}
                </ul>
            </ContentContainer>
        </Layout >
    );
}