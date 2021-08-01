import cx from "classnames"
import { ShieldCheckIcon } from '@heroicons/react/solid'

export default function QualityIndicator({ qualityScore }) {

    return (
        <span
            className={cx(
                "inline-flex items-center px-2 py-1 rounded-full text-xs space-x-1 font-medium",
                {
                    "bg-green-100 text-green-500 dark:bg-green-500 dark:text-white": qualityScore >= 75,
                    "bg-yellow-100 text-yellow-500 dark:bg-yellow-500 dark:text-white": qualityScore < 75 && qualityScore >= 50,
                    "bg-red-100 text-red-500 dark:bg-red-500 dark:text-white": qualityScore < 50,
                }
            )}
        >
            <ShieldCheckIcon className="h-4" />
            <div>{~~qualityScore}{'%'}</div>
        </span>
    )
}