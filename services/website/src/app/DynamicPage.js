import Head from "next/head";
import Context from "./Context";
import templates from './templates'
import markdownToText from 'markdown-to-text'
import TestMode from './TestMode'
import DarkMode from './DarkMode'
import useTestMode from './useTestMode'
import formatImage from './formatImage'

export default function DynamicPage(props) {

    const testMode = useTestMode()

    const { props: page } = props.page

    const Template = templates[page.template]

    if (!Template) {
        throw new Error(`Template component for "${page.template}" not defined`)
    }

    const items = [
        { name: "title", value: props.page.props.title },
        { name: "slug", value: props.page.props.slug },
        { name: "data", value: (<a href={props.page.props.source} target={"_blank"} className="underline">view source</a>) },
        { name: "template", value: page.template },
    ]

    const contextProps = props.page.components.Layout.components.Context.props

    const { pages } = contextProps

    const alternatePages = pages.filter(p => p.origin === page.origin)

    return (
        <Context.Provider value={{ page: page, language: page.language, translations: {}, ...contextProps }}>
            <Head>
                <title>{markdownToText(page.title)}</title>
                <meta name="description" content={markdownToText(page.description)} />
                {page.meta ? (
                    <meta name="keywords" content={page.keywords.join(', ')} />
                ) : null}
                <meta property="og:title" content={markdownToText(page.title)} />
                <meta property="og:description" content={markdownToText(page.description)} />
                {page.image ? (
                    <meta property="og:image" content={formatImage(page.image)} />
                ) : null}
                <meta property="og:url" content={page.url} />
                {alternatePages.map(page => (
                    <link key={page.slug} rel="alternate" hreflang={page.language} href={page.url} />
                ))}
            </Head>
            <Template {...props.page} />
            {testMode ? (
                <div className="fixed bottom-16 left-4 bg-white p-2 shadow-md rounded-md text-xs">
                    <div>
                        {items.map((item, index) => (
                            <div className="flex" key={index}>
                                <div className="text-gray-500">{item.name}</div><div className="ml-2">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
            <TestMode />
            <DarkMode />
        </Context.Provider>
    );
}