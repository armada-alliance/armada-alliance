import pages from '../src/pages.json'
import DynamicPage from '../src/app/DynamicPage'
import fs from 'fs/promises'

export default function IndexRoute(props) {
    return <DynamicPage {...props} />
}

export async function getStaticProps() {

    const data = await fs.readFile('/app/src/page-data/index.json')

    const page = JSON.parse(data)

    return {
        props: {
            page,
        }
    }
}

