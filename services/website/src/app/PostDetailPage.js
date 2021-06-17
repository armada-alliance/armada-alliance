import Layout from './Layout'
import ContentContainer from './ContentContainer'
import Image from 'next/image'
import Markdown from './Markdown'
import MarkdownContent from './MarkdownContent'
import markdownToText from 'markdown-to-text'
import cx from 'classnames'
import Link from './Link'

export default function TermDetailPage(props) {

    return (
        <Layout>
            <ContentContainer>
                <div className="relative px-4 sm:px-6 lg:px-8">
                    <div className="text-lg max-w-prose mx-auto">
                        {props.page.image ? (
                            <div className="flex items-center justify-center mb-4">
                                <div className="relative rounded-full overflow-hidden w-52 h-52 shadow-md">
                                    <Image
                                        src={props.page.image}
                                        layout="fill"
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
                                <Markdown
                                    source={props.page.description}
                                />
                            </div>
                        ) : null}
                    </div>
                    {props.page.props.source ? (
                        <div className="mt-4 text-lg max-w-prose mx-auto">
                            <div className="mt-6 text-gray-500 font-light mx-auto">
                                <MarkdownContent
                                    source={props.page.props.source}
                                />
                            </div>
                        </div>
                    ) : null}
                    <div className="mt-4">
                        <Link href={'https://github.com/armada-alliance'}>
                            <a>
                                Open in GitHub
                            </a>
                        </Link>
                    </div>
                </div>
            </ContentContainer>
        </Layout>
    )
}