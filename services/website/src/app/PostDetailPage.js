import Layout from './Layout'
import ContentContainer from './ContentContainer'
import MDXContent from './MDXContent'
import MarkdownContent from './MarkdownContent'
import markdownToText from 'markdown-to-text'
import cx from 'classnames'
import Link from './Link'
import Image from './Image'
import { GitHubIcon } from './icons'

export default function TermDetailPage(props) {

    return (
        <Layout>
            <ContentContainer>
                <div className="relative px-4 sm:px-6 lg:px-8">
                    <div className="max-w-prose mx-auto">
                        <div className="text-lg">
                            {props.page.image ? (
                                <div className="flex items-center justify-center mb-4">
                                    <div className="relative rounded-full overflow-hidden w-52 h-52 shadow-md">
                                        <Image
                                            src={props.page.image}
                                            className="absolute top-0 right-0 bottom-0 left-0"
                                        />
                                    </div>
                                </div>
                            ) : null}
                            <h1>
                                <span className="block text-base text-center text-primary-600 font-semibold tracking-wide uppercase">
                                    {props.type}
                                </span>
                                <span className={"mt-2 block text-3xl leading-8 text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl"}>
                                    {markdownToText(props.page.title)}
                                    {/* <Markdown children={props.page.title} /> */}
                                </span>
                            </h1>
                            {/* <div className="flex items-center space-x-4">
                            {props.page.keywords.map(keyword => {
                                return (
                                    <div>
                                        {keyword}
                                    </div>
                                )
                            })}
                        </div> */}
                            {props.page.description ? (
                                <div className={cx("mt-4 text-xl font-normal text-gray-500 leading-8", props.page.props.body ? "text-left" : "text-center")}>
                                    <MarkdownContent
                                        source={props.page.description}
                                    />
                                </div>
                            ) : null}
                        </div>
                        {props.page.props.source ? (
                            <div className="mt-4 text-lg max-w-prose mx-auto">
                                <div className="mt-6 text-gray-500 font-light mx-auto">
                                    <MDXContent
                                        source={props.page.props.source}
                                    />
                                </div>
                            </div>
                        ) : null}
                        {props.page.props.externalLink ? (
                            <div className="mt-12 flex justify-center">
                                <Link href={props.page.props.externalLink}>
                                    <a
                                        target="_blank"
                                        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                    >
                                        Open the full {props.type.toLowerCase()}
                                    </a>
                                </Link>
                            </div>
                        ) : null}
                        <div className="mt-4 flex justify-end">
                            <Link href={`https://github.com/armada-alliance/armada-alliance/tree/staging/services/website/content${props.page.params.source}`}>
                                <a
                                    target="_blank"
                                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    <GitHubIcon className="h-4 mr-1" />Edit on GitHub
                            </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </Layout>
    )
}