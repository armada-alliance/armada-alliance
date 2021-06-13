import compact from 'lodash/compact'
import pages from '../src/pages.json'
import DynamicPage from '../src/app/DynamicPage'
import templates from '../src/app/templates'

export default function SlugRoute(props) {
  return <DynamicPage {...props} />
}

export async function getStaticProps(ctx) {

  const page = pages.find(page => page.slug === '/' + ctx.params.slug.join('/'))

  const template = templates[page.template]

  if (!template || !template.component) {
    throw new Error(`Template component for "${page.template}" not defined`)
  }

  const mergeProps = template.getProps ? await template.getProps(page) : {}

  return {
    props: {
      page,
      ...mergeProps
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