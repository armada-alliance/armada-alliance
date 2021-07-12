import PoolsSection from './PoolsSection'
import PoolMapSection from './PoolMapSection'
import Layout from './Layout'
import Component from './Component'

export default function PoolsPage({ components }) {
    return (
        <Component use={Layout} data={components.Layout}>
            <Component
                use={PoolsSection}
                data={components.PoolsSection}
            />
            <Component
                use={PoolMapSection}
                data={components.PoolMapSection}
            />
        </Component>
    );
}
