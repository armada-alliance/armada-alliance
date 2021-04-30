import HeroSection from './HeroSection'
import PoolSection from './PoolSection'
import FooterSection from './FooterSection'
import Layout from './Layout'

export default function HomePage({ pools }) {
  return (
    <Layout>
      <HeroSection />
      <PoolSection
        pools={pools}
      />
    </Layout>
  );
}
