import compact from 'lodash/compact'
import pages from '../src/pages.json'
import DynamicPage from '../src/app/DynamicPage'
import fs from 'fs/promises'

export default function SlugRoute(props) {
  return <DynamicPage {...props} />
}

export async function getStaticProps(ctx) {

  const slug = '/' + ctx.params.slug.join('/')
  const data = await fs.readFile(`/app/src/page-data/${slug}.json`)

  const page = JSON.parse(data)

  return {
    props: {
      page,
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