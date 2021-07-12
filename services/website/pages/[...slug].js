import compact from 'lodash/compact'
import pages from '../public/tables/pages.json'
import DynamicPage from '../src/app/DynamicPage'
import fs from 'fs/promises'
import path from 'path'

export default function SlugRoute(props) {
  return <DynamicPage {...props} />
}

export async function getStaticProps(ctx) {

  const slug = '/' + ctx.params.slug.join('/')
  const appPath = path.resolve(process.cwd())
  const data = await fs.readFile(path.join(appPath, `public/pages/${slug}.json`))

  return {
    props: {
      page: JSON.parse(data)
    }
  }
}

export function getStaticPaths() {

  const paths = pages.filter(page => page.slug !== '/').map(page => {
    return {
      params: {
        slug: compact(page.slug.slice(1, page.slug.length).split('/'))
      }
    }
  })

  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}