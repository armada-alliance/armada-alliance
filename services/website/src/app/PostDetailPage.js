import Layout from './Layout'
import ContentContainer from './ContentContainer'
import PageHeader from './PageHeader'
import PageExcerpt from './PageExcerpt'
import PageContent from './PageContent'
import PageSocials from './PageSocials'
import PostPagesSection from './PostPagesSection'
import Component from './Component'
import Delegation from './Delegation'
import ContentSections from './ContentSections'

export default function PostDetailPage(props) {

    const { components } = props

    return (
        <Component use={Layout} data={props.components.Layout}>
            <ContentContainer>
                <div className="relative px-4 sm:px-6 lg:px-8">
                    <div className="max-w-prose mx-auto">
                        <div className="text-lg">
                            <Component use={PageHeader} data={components.PageHeader} />
                            {props.props.template === 'PoolDetailPage' ? (
                                <Component
                                    use={Delegation}
                                    data={components.DelegationSection}
                                />
                            ) : null}
                            {components.PageSocials ? (
                                <div className="mt-4">
                                    <Component use={PageSocials} data={components.PageSocials} />

                                </div>
                            ) : null}
                            <Component use={PageExcerpt} data={components.PageExcerpt} />
                        </div>
                        <Component use={PageContent} data={components.PageContent} />
                        <Component use={PostPagesSection} data={components.PostPagesSection} />
                    </div>
                </div>
            </ContentContainer>
            {props.props.template === 'PoolDetailPage' ? (
                <Component
                    use={ContentSections}
                    data={components.ContentSections}
                />
            ) : null}
        </Component>
    )
}