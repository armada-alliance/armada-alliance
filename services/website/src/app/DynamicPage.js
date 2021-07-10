import Head from "next/head";
import Context from "./Context";
import templates from './templates'
import markdownToText from 'markdown-to-text'
import TestMode from './TestMode'
import useTestMode from './useTestMode'

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

    return (
        <Context.Provider value={{ page: page, language: page.language, translations: {}, ...contextProps }}>
            <Head>
                <title>{markdownToText(page.title)}</title>
                <meta name="description" content={markdownToText(page.description)} />
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
        </Context.Provider>
    );
}