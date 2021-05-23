import fetch from './fetch'
import HomePage from "./HomePage";
import PoolsMainPage from "./PoolsMainPage";
import PoolDetailPage from "./PoolDetailPage";
import RoadmapPage from "./RoadmapPage";
import pools from "../pools_extended.json";

const templates = {
    HomePage: {
        component: HomePage
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
            const { data: { data: { devices } } } = await fetch(`https://pool.sublayer.io/metrics`)

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