import PoolSection from './PoolSection'
import MapSection from './MapSection'
import Layout from './Layout'

export default function HomePage({ pools }) {
  return (
    <Layout>
      <MapSection
        pools={pools}
      />
      <PoolSection
        pools={pools}
      />
    </Layout>
  );
}
