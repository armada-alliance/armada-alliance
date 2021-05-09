import Head from "next/head";
import HomePage from "../src/app/HomePage";
import schema from '../src/schema.json'
import pools from '../src/pools_extended.json'

export default function Home() {
  return (
    <>
      <Head>
        <title>{schema.about.name}</title>
        <meta name="description" content={schema.about.description} />
      </Head>
      <HomePage
        pools={pools}
      />
    </>
  );
}