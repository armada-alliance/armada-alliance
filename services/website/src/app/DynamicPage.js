import Head from "next/head";
import Context from "./Context";
import pools from '../pools_extended.json'
import translations from '../translations.json'
import templates from './templates'
import markdownToText from 'markdown-to-text'

export default function DynamicPage(props) {

    const { page } = props

    const Template = templates[page.template]

    if (!Template) {
        throw new Error(`Template component for "${page.template}" not defined`)
    }

    return (
        <Context.Provider value={{ page: page, language: page.language, translations: translations[page.language] }}>
            <Head>
                <title>{markdownToText(page.title)}</title>
                <meta name="description" content={markdownToText(page.description)} />
            </Head>
            <Template {...props} pools={pools} />
        </Context.Provider>
    );
}