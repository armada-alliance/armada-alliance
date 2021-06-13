import Head from "next/head";
import Context from "./Context";
import pools from '../pools_extended.json'
import translations from '../translations.json'
import templates from './templates'

export default function DynamicPage(props) {

    const { page } = props

    const template = templates[page.template]

    if (!template || !template.component) {
        throw new Error(`Template component for "${page.template}" not defined`)
    }

    return (
        <Context.Provider value={{ page: page, language: page.language, translations: translations[page.language] }}>
            <Head>
                <title>{page.title}</title>
                <meta name="description" content={page.description} />
            </Head>
            <template.component {...props} pools={pools} />
        </Context.Provider>
    );
}