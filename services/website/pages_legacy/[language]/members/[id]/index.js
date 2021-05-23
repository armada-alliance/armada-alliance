import axios from 'axios'
import pools from '../../../../src/pools_extended.json'
import PoolDetailPage from '../../../../src/app/PoolDetailPage'
import Context from '../../../../src/app/Context'

export default function PoolDetailRoute(props) {

    return (
        <Context.Provider value={{ language: props.language }}>
            <PoolDetailPage
                {...props}
            />
        </Context.Provider>
    )
}

export async function getStaticProps(ctx) {

    const { id: poolId, language } = ctx.params

    const { data: feed } = await axios.get(`https://pool.pm/feed/${poolId}`)
    const { data: stake } = await axios.get(`https://pool.pm/stake/${poolId}`)
    const { data: { data: { devices } } } = await axios.get(`https://pool.sublayer.io/metrics`)
    const pool = pools.find(pool => pool.id === poolId)
    return {
        revalidate: 1,
        props: {
            language,
            poolId,
            pool,
            feed,
            stake,
            devices
        }
    }
}

export async function getStaticPaths() {

    const paths = pools.map((pool) => ({
        params: {
            id: pool.id
        },
    }));

    return {
        paths,
        fallback: false, // See the "fallback" section below
    };
}