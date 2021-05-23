/* This example requires Tailwind CSS v2.0+ */
import {
    CloudUploadIcon,
    CogIcon,
    LockClosedIcon,
    RefreshIcon,
    ServerIcon,
    ShieldCheckIcon,
} from '@heroicons/react/outline'

const features = [
    { name: 'Sustainable', description: 'All Stake Pools in this alliance run on either Raspberry Pis exclusively or on other low power consuming ARM-based machines with an average pool energy consumption of less than 40 Watts💡', icon: RefreshIcon },
    { name: 'Focused on real decentralisation', description: 'Instead of being a centralised commercial organisation running multiple pools we are independent stake pools working together supporting real decentralisation', icon: LockClosedIcon },
    { name: 'Support', description: 'Personal support from each stake pool operator', icon: CloudUploadIcon }
]

export default function USPSection() {
    return (
        <div className="relative bg-white py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <h2 className="text-base font-semibold tracking-wider text-primary-600 uppercase">Why</h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                    Independent pools with a single mission
          </p>
                <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                    The Armada alliance was formed in efforts to build a sustainable community of decentralized, low-cost, and energy-efficient stake pool operations on the Cardano blockchain 🌍🌿
          </p>
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="pt-6">
                                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                    <div className="-mt-6">
                                        <div>
                                            <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                                                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                                        <p className="mt-5 text-base text-gray-500">
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
