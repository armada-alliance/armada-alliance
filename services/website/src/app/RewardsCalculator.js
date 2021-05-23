
/* This example requires Tailwind CSS v2.0+ */
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, MailIcon, ScaleIcon } from '@heroicons/react/outline'
import StakingRewardsCalculator from './StakingRewardsCalculator'

const transferFeatures = [
    {
        id: 1,
        name: 'Competitive exchange rates',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: GlobeAltIcon,
    },
    {
        id: 2,
        name: 'No hidden fees',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: ScaleIcon,
    },
    {
        id: 3,
        name: 'Transfers are instant',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: LightningBoltIcon,
    },
]
const communicationFeatures = [
    {
        id: 1,
        name: 'Mobile notifications',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: AnnotationIcon,
    },
    {
        id: 2,
        name: 'Reminder emails',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: MailIcon,
    },
]

export default function Example() {
    return (
        <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
            <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                <svg
                    className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
                    width={404}
                    height={784}
                    fill="none"
                    viewBox="0 0 404 784"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={784} fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
                </svg>

                <div className="relative">
                    <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        A better way to send money
          </h2>
                    <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in,
                        accusamus quisquam.
          </p>
                </div>

                <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div className="relative">
                        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                            Transfer funds world-wide
            </h3>
                        <p className="mt-3 text-lg text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur minima sequi recusandae, porro maiores
                            officia assumenda aliquam laborum ab aliquid veritatis impedit odit adipisci optio iste blanditiis facere.
                            Totam, velit.
            </p>

                        <dl className="mt-10 space-y-10">
                            {transferFeatures.map((item) => (
                                <div key={item.id} className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            <item.icon className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{item.name}</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                        <StakingRewardsCalculator />
                    </div>
                </div>

                <svg
                    className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
                    width={404}
                    height={784}
                    fill="none"
                    viewBox="0 0 404 784"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={784} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
                </svg>
            </div>
        </div>
    )
}
