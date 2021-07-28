import MarkdownContent from './MarkdownContent'
import cx from 'classnames'

export default function PageExcerpt({ alignLeft, excerpt }) {

    return (
        <>
            {excerpt ? (
                <div className={cx("mt-4 text-2xl font-normal text-gray-600 dark:text-gray-200 leading-8 mb-8 border-b border-gray-200 dark:border-gray-700", alignLeft ? "text-left" : "text-center")}>
                    <MarkdownContent
                        source={excerpt}
                    />
                </div>
            ) : null}
        </>
    )
}