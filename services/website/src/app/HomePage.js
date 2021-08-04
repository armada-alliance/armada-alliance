import CalculatorSection from './CalculatorSection'
import USPSection from './USPSection'
import GlobeSection from './GlobeSection'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import Layout from './Layout'
import Component from './Component'

export default function HomePage(props) {

    const { pools, components } = props

    return (
        <Component use={Layout} data={props.components.Layout}>
            {/* <GlobeSection /> */}
            <Component use={HeroSection} data={components.HeroSection} />
            <Component use={StatsSection} data={components.StatsSection} />
            <USPSection pools={pools} />
            <CalculatorSection />
        </Component>
    )
}