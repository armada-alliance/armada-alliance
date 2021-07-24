import PostDetailPage from './PostDetailPage'

export default function RuleDetailPage(props) {

    return (
        <PostDetailPage {...props} type={props.pageType} />
    )
}