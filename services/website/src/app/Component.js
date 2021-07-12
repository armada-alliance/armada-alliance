import { ExclamationCircleIcon } from '@heroicons/react/outline'

export default function Component(props) {

    const { use, data } = props

    if (!data) {
        return null
    }

    const { components, props: componentProps, attrs, error, type } = data

    const ChildComponent = use

    return (
        <div {...attrs}>
            {error ? (
                <div className="p-12 bg-red-500 text-white font-lg font-bold flex items-center justify-center w-full space-x-2">
                    <ExclamationCircleIcon className="h-5" />
                    <div>
                        Error displaying{' '}<span className="underline">{type}</span>{' '}component
                    </div>
                </div>
            ) : (
                    <ChildComponent components={components} {...componentProps} {...props} />
                )}
        </div>
    )
}