import { useEffect, useState } from 'react'
import Component from './Component'
import StatsSection from './StatsSection'

export default function StatsWidgetPage({ components }) {

    const [style, setStyle] = useState(null)

    useEffect(() => {
        let searchParams = process.browser ? new URLSearchParams(window.location.search) : null
        const image = searchParams && searchParams.get('context') === 'image'
        if (image) {
            setStyle({ fontFamily: 'Noto Sans' })
        }
    })

    return (
        <div style={style}>
            <Component use={StatsSection} data={components.StatsSection} />
        </div>
    )
}