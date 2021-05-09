import HeroSection from './HeroSection'
import PoolSection from './PoolSection'
import MapSection from './MapSection'
import Layout from './Layout'

export default function HomePage({ pools }) {
  return (
    <Layout>
      <HeroSection />
      <PoolSection
        pools={pools}
      />
      <MapSection
        pools={pools}

      />
    </Layout>
  );
}
