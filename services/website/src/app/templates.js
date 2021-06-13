import fetch from './fetch'
import HomePage from "./HomePage";
import TermsMainPage from "./TermsMainPage";
import PoolsMainPage from "./PoolsMainPage";
import PoolDetailPage from "./PoolDetailPage";
import SitemapPage from "./SitemapPage";
import BlogDetailPage from "./BlogDetailPage";
import RoadmapPage from "./RoadmapPage";
import TermDetailPage from "./TermDetailPage";
import pools from "../pools_extended.json";
import terms from "../tables/terms";

const templates = {
    SitemapPage: {
        component: SitemapPage
    },
    BlogDetailPage: {
        component: BlogDetailPage
    },
    TermDetailPage: {
        component: TermDetailPage
    },
    HomePage: {
        component: HomePage
    },
    TermsMainPage: {
        component: TermsMainPage,
        getProps: () => {

            return {
                terms
            }
        }
    },
    PoolsMainPage: {
        component: PoolsMainPage
    },
    PoolDetailPage: {
        component: PoolDetailPage,
        getProps: async ({ params }) => {

            const pool = pools.find(pool => pool.id === params.poolId)
            const { data: feed } = await fetch(`https://pool.pm/feed/${params.poolId}`)
            const { data: stake } = await fetch(`https://pool.pm/stake/${params.poolId}`)
            // const { data: { data: { devices } } } = await fetch(`https://pool.sublayer.io/metrics`)
            const devices = []

            return {
                feed,
                stake,
                devices,
                pool
            }
        }
    },
    RoadmapPage: {
        component: RoadmapPage
    },
}

export default templates