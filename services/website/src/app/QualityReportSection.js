import { useState } from 'react'
import Container from './Container'
import cx from 'classnames'
import { CheckCircleIcon, ChevronDownIcon, XCircleIcon, ExternalLinkIcon } from '@heroicons/react/outline'
import MarkdownContent from './MarkdownContent'
import Link from './Link'
import QualityIndicator from './QualityIndicator'

function RuleItem({ rule, open, onToggle }) {

    return (
        <>
            <div className={cx("flex items-center space-x-4 px-4 py-3 cursor-pointer select-none")} onClick={() => onToggle(rule.id)}>
                <div className="flex-shrink-0 flex items-center justify-center">
                    {rule.status === 'passed' ? (
                        <CheckCircleIcon className="h-5 text-green-500" />
                    ) : null}
                    {rule.status === 'failed' ? (
                        <XCircleIcon className="h-5 text-red-500" />
                    ) : null}
                </div>
                <div className="flex flex-grow items-center space-x-2">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-200">Rule {rule.number}: {rule.name}</div>
                </div>
                <div className="ml-auto">
                    <ChevronDownIcon className="h-5 text-gray-500 dark:text-gray-200" />
                </div>
            </div>
            {open ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm px-4 py-4">
                        <MarkdownContent
                            source={rule.description}
                            spacingEnabled={false}
                        />
                        <Link href={rule.link.href}>
                            <a title={rule.link.title} className="flex items-center space-x-1 text-primary-500">
                                <div>Read more</div>
                                <ExternalLinkIcon className="h-4" />
                            </a>
                        </Link>
                    </div>
                    {(rule.checks || []).map(check => (
                        <div className={cx("flex items-center space-x-4 px-4 py-2 bg-gray-100 dark:bg-gray-800")}>
                            <div className="flex-shrink-0 flex items-center justify-center">
                                {check.status === 'passed' ? (
                                    <CheckCircleIcon className="h-5 text-green-500" />
                                ) : null}
                                {check.status === 'failed' ? (
                                    <XCircleIcon className="h-5 text-red-500" />
                                ) : null}
                            </div>
                            <div className="flex flex-grow items-center space-x-2">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <MarkdownContent source={'Check: ' + check.message} spacingEnabled={false} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    )
}

export default function QualityReportSection({ qualityScore, rules }) {

    const [open, setOpen] = useState([])

    const handleToggle = (ruleId) => {

        if (open.includes(ruleId)) {
            setOpen(
                open.filter(id => id !== ruleId)
            )
        } else {
            setOpen([
                ...open,
                ruleId
            ])
        }
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <Container>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-base font-semibold tracking-wider text-primary-500 uppercase">Rules</h2>
                        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
                            Quality Report
                        </h2>
                        <div className="mt-2">
                            <QualityIndicator qualityScore={qualityScore} />
                        </div>
                        {/* <p className="mt-3 text-xl text-gray-500 dark:text-gray-400 sm:mt-4">

                        </p> */}
                    </div>
                </div>
                <div className="mt-12 flex flex-col">
                    <div className="w-full max-w-xl mx-auto">
                        <div className="flex items-center">
                            <div className="ml-auto space-x-2 flex items-center text-gray-200 dark:text-gray-600 text-sm">
                                <button type="button" className="text-primary-500" onClick={() => setOpen(rules.map(rule => rule.id))}>show all</button>
                                <div>/</div>
                                <button type="button" className="text-primary-500" onClick={() => setOpen([])}>hide all</button>
                            </div>
                        </div>
                        <div className="mt-4 shadow-sm border border-transparent dark:border-gray-700 rounded-lg">
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                <div className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 rounded-t-lg rounded-b-lg">
                                    {rules.map((rule) => (
                                        <div key={rule.id}>
                                            <RuleItem
                                                rule={rule}
                                                open={open.includes(rule.id)}
                                                onToggle={handleToggle}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
}
