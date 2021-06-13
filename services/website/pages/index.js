import DynamicPage from '../src/app/DynamicPage'
import fs from 'fs/promises'
import path from 'path'

export default function IndexRoute(props) {
    return <DynamicPage {...props} />
}

export async function getStaticProps() {

    const appPath = path.resolve(process.cwd())

    const data = await fs.readFile(path.join(appPath, 'src/page-data/index.json'))

    const page = JSON.parse(data)

    return {
        props: {
            page,
        }
    }
}

