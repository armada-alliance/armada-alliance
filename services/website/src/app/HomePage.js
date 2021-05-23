import CalculatorSection from './CalculatorSection'
import USPSection from './USPSection'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import Layout from './Layout'

export default function HomePage({ pools }) {

    return (
        <Layout>
            <HeroSection />
            <StatsSection pools={pools} />
            <USPSection pools={pools} />
            <CalculatorSection />
        </Layout>
    )
}