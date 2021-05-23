import Head from "next/head";
import Context from "../../../src/app/Context";
import RoadmapPage from "../../src/app/RoadmapPage";
import schema from "../../src/schema"

export default function Roadmap() {
    return (
        <Context.Provider value={{ language: 'en' }}>
            <Head>
                <title>Roadmap | {schema.about.name}</title>
                <meta name="description" content="Here you can follow the journey of our alliance." />
            </Head>
            <RoadmapPage />
        </Context.Provider>
    );
}
