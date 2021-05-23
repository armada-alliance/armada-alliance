import Head from "next/head";
import MembersPage from "../../../src/app/MembersPage";
import schema from '../../../src/schema.json'
import pools from '../../../src/pools_extended.json'
import Context from "../../../src/app/Context";

export default function MembersRoute() {
    return (
        <Context.Provider value={{ language: 'en' }}>
            <Head>
                <title>{schema.about.name}</title>
                <meta name="description" content={schema.about.description} />
            </Head>
            <MembersPage
                pools={pools}
            />
        </Context.Provider>
    );
}