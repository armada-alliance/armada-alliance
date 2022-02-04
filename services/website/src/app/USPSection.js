/* This example requires Tailwind CSS v2.0+ */
import {
    CloudUploadIcon,
    LockClosedIcon,
    RefreshIcon,
} from '@heroicons/react/outline'

import Text from './Text'
import DualColorText from './DualColorText'

const features = [
    { name: 'Sustainable', description: 'All Stake Pools in this alliance run on low power consuming ARM or RISC-V machines with an average pool energy consumption of 60 Watts💡', icon: RefreshIcon },
    { name: 'True Decentralization', description: 'All independently owned stake pools ran by single pool operators. We work together to provide optimal rewards, education, and decentralization of hardware', icon: LockClosedIcon },
    { name: 'Community Support', description: 'We offer high quality support, educational content, and tools for both our stake pool operators and delegators. With many forms of communication channels, tutorials, and personal SPO sessions as needed.', icon: CloudUploadIcon }
]

export default function USPSection() {
    return (
        <div className="relative bg-white dark:bg-gray-900 py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <h2 className="text-base font-semibold tracking-wider text-primary-500 bg-gradient-to-r from-primary-400 dark:from-primary-300 via-primary-500 to-primary-700 text-gradient uppercase">
                    <Text>Why Delegate</Text>
                </h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-4xl">
                    <DualColorText>
                        Independent pools with one mission
                    </DualColorText>
                </p>
                <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500 dark:text-gray-300">
                    <Text>
                        The Armada Alliance was formed with a single mission in mind, achieving true decentralization on the Cardano blockchain. We will do our part to accomplish this goal by aiding in the creation of many independent, eco-friendly, ARM and RISC-V based stake pools around the globe.
                    </Text>
                </p>
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="pt-6">
                                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full">
                                    <div className="-mt-6">
                                        <div>
                                            <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                                                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">{feature.name}</h3>
                                        <p className="mt-5 text-base text-gray-500 dark:text-gray-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
