import Head from "next/head";
import HomePage from "../src/app/HomePage";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>ada pi</title>
      </Head>
      <HomePage />
    </>
  );
}
