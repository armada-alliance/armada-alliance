import MarkdownContent from './MarkdownContent'
import cx from 'classnames'

export default function PageExcerpt({ alignLeft, excerpt, template }) {

    return (
        <>
            {excerpt ? (
                <div className={cx("mt-4 text-2xl font-normal text-gray-600 dark:text-gray-200 leading-8 mb-8", alignLeft ? "text-left" : "text-center", template === "TermDetailPage" ? "border-b border-gray-200 dark:border-gray-700" : null)}>
                    <MarkdownContent
                        source={excerpt}
                    />
                </div>
            ) : null}
        </>
    )
}