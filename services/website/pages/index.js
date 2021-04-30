import axios from 'axios'
import Head from "next/head";
import HomePage from "../src/app/HomePage";
import schema from '../src/schema'

export default function Home(props) {
  return (
    <>
      <Head>
        <title>{schema.about.name}</title>
        <meta name="description" content={schema.about.description} />
      </Head>
      <HomePage
        pools={props.pools}
      />
    </>
  );
}

async function getPoolMeta({ poolId }) {

  const { data } = await axios.get(`https://js.adapools.org/pools/${poolId}/summary.json`)

  return data
}

export async function getStaticProps() {

  const pools = await Promise.all(
    schema.pools.map(async pool => {
      const meta = await getPoolMeta({ poolId: pool.poolId })
      return {
        ...pool,
        meta
      }
    })
  )

  return {
    revalidate: 1,
    props: {
      pools
    }
  }
}