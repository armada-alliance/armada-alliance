import pages from '../src/pages.json'
import DynamicPage from '../src/app/DynamicPage'
import templates from '../src/app/templates'

export default function IndexRoute(props) {
    return <DynamicPage {...props} />
}

export async function getStaticProps() {

    const page = pages.find(page => page.slug === '/')

    const template = templates[page.template]

    const mergeProps = template.getProps ? await template.getProps(page) : {}

    return {
        props: {
            page,
            ...mergeProps
        }
    }
}

