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
import formatImage from './formatImage'
import MarkdownContent from './MarkdownContent'
import QualityReportSection from './QualityReportSection'

export default function PostDetailPage(props) {

    const { components } = props

    return (
        <Component use={Layout} data={props.components.Layout}>
            <ContentContainer>
                <div className="relative">
                    <div className="max-w-prose mx-auto">
                        <div className="text-lg">
                            <Component use={PageHeader} data={components.PageHeader} />
                            {components.PageSocials ? (
                                <div className="mt-4">
                                    <Component use={PageSocials} data={components.PageSocials} />
                                </div>
                            ) : null}
                            {props.props.template === 'PoolDetailPage' ? (
                                <div className="mt-4">
                                    <Component
                                        use={Delegation}
                                        data={components.DelegationSection}
                                    />
                                </div>
                            ) : null}
                            <Component use={PageExcerpt} data={components.PageExcerpt} template={props.props.template} />
                        </div>
                        {props.props.template === 'BlogDetailPage' && props.props.image ? (
                            <div className="relative">
                                <div className="relative rounded-lg shadow-md overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center rounded-lg"
                                        style={{ backgroundImage: `url('${formatImage(props.props.image)}')` }}
                                    />
                                    <div className="absolute inset-0 bg-primary-500 bg-opacity-20" />
                                    <div style={{ paddingTop: '60%' }} />
                                </div>
                                <div className="flex justify-end">
                                    {props.props.imageCaption ? (
                                        <div className="mt-1.5 uppercase font-light text-sm text-gray-400 dark:text-gray-600">
                                            <MarkdownContent source={props.props.imageCaption} />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}
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
            {props.props.template === 'PoolDetailPage' ? (
                <Component
                    use={QualityReportSection}
                    data={components.QualityReportSection}
                />
            ) : null}
        </Component>
    )
}