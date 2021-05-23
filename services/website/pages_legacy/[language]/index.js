import Head from "next/head";
import HomePage from "../../src/app/HomePage";
import schema from '../../src/schema.json'
import pools from '../../src/pools_extended.json'
import Context from "../../src/app/Context";
import languages from "../../src/app/languages";

export default function HomeRoute(props) {
  console.log('props', props)
  return (
    <Context.Provider value={{ language: props.language }}>
      <Head>
        <title>{schema.about.name}</title>
        <meta name="description" content={schema.about.description} />
      </Head>
      <HomePage
        pools={pools}
      />
    </Context.Provider>
  );
}

export function getStaticProps(ctx) {

  return {
    props: {
      language: ctx.params.language
    }
  }
}

export function getStaticPaths() {

  const paths = languages.map(language => {
    return {
      params: {
        language: language.id
      }
    }
  })

  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}