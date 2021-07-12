import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        // console.log('initial props', initialProps)
        return { ...initialProps }
    }

    render() {

        const page = this.props.__NEXT_DATA__.props.pageProps.page

        return (
            <Html lang={page.props.language} prefix="og: http://ogp.me/ns#">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument