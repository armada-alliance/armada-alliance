import Component from './Component'
import StatsSection from './StatsSection'

export default function StatsWidgetPage({ components }) {

    let searchParams = process.browser ? new URLSearchParams(location.search) : null

    const image = searchParams && searchParams.get('context') === 'image'

    return (
        <div style={image ? { fontFamily: 'Noto Sans' } : null}>
            <Component use={StatsSection} data={components.StatsSection} image={image} />
        </div>
    )
}