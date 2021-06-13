import { Fragment } from 'react'
import cx from 'classnames'
import moment from 'moment'
import Table from './Table'
import Layout from './Layout'
import Map from './Map'
import Tabs from './Tabs'
import Text from './Text'
import HardwareList from './HardwareList'
import toAda from './toAda'
import toPercentage from './toPercentage'
import pages from '../pages'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
    ArrowNarrowLeftIcon,
    CheckIcon,
    HomeIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    ThumbUpIcon,
    UserIcon,
} from '@heroicons/react/solid'
import PoolSection from './PoolSection'
import PoolStats from './PoolStats'

import {
    ArrowNarrowRightIcon,
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CurrencyDollarIcon,
    LinkIcon,
    LocationMarkerIcon,
    MailIcon,
    PencilIcon,
    SearchIcon,
} from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const user = {
    name: 'Whitney Francis',
    email: 'whitney@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Applicants', href: '#' },
    { name: 'Company', href: '#' },
]
const breadcrumbs = [
    { name: 'Jobs', href: '#', current: false },
    { name: 'Front End Developer', href: '#', current: false },
    { name: 'Applicants', href: '#', current: true },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
const attachments = [
    { name: 'resume_front_end_developer.pdf', href: '#' },
    { name: 'coverletter_front_end_developer.pdf', href: '#' },
]
const eventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
    {
        id: 1,
        type: eventTypes.applied,
        content: 'Applied to',
        target: 'Front End Developer',
        date: 'Sep 20',
        datetime: '2020-09-20',
    },
    {
        id: 2,
        type: eventTypes.advanced,
        content: 'Advanced to phone screening by',
        target: 'Bethany Blake',
        date: 'Sep 22',
        datetime: '2020-09-22',
    },
    {
        id: 3,
        type: eventTypes.completed,
        content: 'Completed phone screening with',
        target: 'Martha Gardner',
        date: 'Sep 28',
        datetime: '2020-09-28',
    },
    {
        id: 4,
        type: eventTypes.advanced,
        content: 'Advanced to interview by',
        target: 'Bethany Blake',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
    {
        id: 5,
        type: eventTypes.completed,
        content: 'Completed interview with',
        target: 'Katherine Snyder',
        date: 'Oct 4',
        datetime: '2020-10-04',
    },
]
const comments = [
    {
        id: 1,
        name: 'Leslie Alexander',
        date: '4d ago',
        imageId: '1494790108377-be9c29b29330',
        body:
            'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
    },
    {
        id: 2,
        name: 'Michael Foster',
        date: '4d ago',
        imageId: '1519244703995-f4e0f30006d5',
        body:
            'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
    },
    {
        id: 3,
        name: 'Dries Vincent',
        date: '4d ago',
        imageId: '1506794778202-cad84cf45f1d',
        body:
            'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function TextField({ value }) {

    return (
        <div>{value}</div>
    )
}

const fieldTypes = {
    text: TextField
}

function Field(props) {

    const { field } = props

    const FieldType = fieldTypes[field.type] || TextField

    return (
        <FieldType {...props} />
    )
}

const getMarginFee = pool => {
    return pool.adapools.data.tax_ratio
}

const getFixedCosts = pool => {
    return pool.adapools.data.tax_fix
}

const getSaturation = pool => {
    return pool.adapools.data.saturated
}

const getPledge = pool => {
    return pool.adapools.data.pledge
}

const getSlugForTab = (currentPage, tab) => {
    const page = pages.find(page => page.params.poolId === currentPage.params.poolId && page.language === currentPage.language && page.params.tab === tab)
    return page.origin
}

const getDelegators = stake => Object.keys(stake).map(key => {
    return {
        stake: key,
        ...stake[key]
    }
}).sort((a, b) => b.time - a.time)

const getBlocks = feed => Object.keys(feed).reduce((result, epochNo) => {
    const epoch = feed[epochNo]
    return Object.keys(epoch).reduce((result, time) => {
        const events = epoch[time].filter(event => event.type === 'block').map(event => ({
            ...event,
            epoch: epochNo,
            time
        }))
        result = [
            ...result,
            ...events,
        ]
        return result
    }, result)
}, []).sort((a, b) => b.time - a.time)

export default function Example(props) {

    const { page } = props
    const { pool, stake, feed, devices } = page.props

    const delegators = getDelegators(stake)
    const blocks = getBlocks(feed)

    const data = {
        ticker: pool.ticker,
        homepage: pool.homepage
    }

    const fields = [
        {
            id: 'ticker',
            name: 'Ticker',
            type: 'text',
        },
        {
            id: 'homepage',
            name: 'Homepage',
            type: 'text',
        }
    ]

    return (
        <div className="min-h-screen">
            <Layout>
                <div className="relative bg-gray-50">
                    <div>
                        <div className="h-32 w-full object-cover lg:h-56 relative">
                            {pool.location ? (
                                <Map
                                    lng={pool.location[0]}
                                    lat={pool.location[1]}
                                    zoom={2}
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
                        <div className="sm:flex sm:items-center sm:space-x-5">
                            <div className="flex">
                                <div
                                    className="h-18 w-18 rounded-full sm:h-24 sm:w-24 bg-white relative"
                                >
                                    <div className={cx("absolute top-2 left-2 right-2 bottom-2 bg-center bg-cover rounded-full", pool.adapools.data.handles.icon ? "opacity-100" : "opacity-20")} style={{ backgroundImage: `url(${pool.icon})` }}></div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{pool.ticker}</h1>
                                {false ? (
                                    <p className="text-sm font-medium text-gray-500">
                                        Joined the {' '}
                                        <a href="https://armada-alliance.com" target="_blank" className="text-gray-900">
                                            Armada Alliance
                </a>{' '}
                on {moment(pool.memberSince).format('YYYY-MM-DD')}
                                    </p>
                                ) : null}
                                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
                                    {[
                                        { name: 'Saturation', value: `${toPercentage(getSaturation(pool))}%` },
                                        { name: 'Margin', value: `${toPercentage(getMarginFee(pool))}%` },
                                        { name: 'Pledge', value: `${toAda(getPledge(pool))} ₳` },
                                        { name: 'Fixed cost', value: `${toAda(getFixedCosts(pool))} ₳` },
                                        { name: 'Member since', value: moment(pool.memberSince).format('DD-MM-YYYY') },
                                    ].map(item => {
                                        return (
                                            <div key={item.name} className="mt-2 flex items-center text-sm text-gray-500">
                                                <Text>{item.name}</Text> <div className="text-gray-900 ml-1.5">{item.value}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="mt-8 max-w-3xl mx-auto sm:px-6 lg:max-w-7xl">
                        <PoolStats pool={pool} />
                    </div> */}
                <div className="bg-gray-50">
                    <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl">
                        <Tabs
                            tabs={[
                                { name: 'About', href: getSlugForTab(page, 'about'), count: null, current: page.params.tab === 'about' },
                                { name: 'Assigned slots', href: getSlugForTab(page, 'assigned-slots'), count: 0, current: page.params.tab === 'assigned-slots' },
                                { name: 'Blocks', href: getSlugForTab(page, 'blocks'), count: blocks.length, current: page.params.tab === 'blocks' },
                                { name: 'Delegators', href: getSlugForTab(page, 'delegators'), count: delegators.length, current: page.params.tab === 'delegators' },
                                { name: 'Hardware', href: getSlugForTab(page, 'hardware'), count: devices.length, current: page.params.tab === 'hardware' },
                                { name: 'Issues', href: getSlugForTab(page, 'issues'), count: '4', current: page.params.tab === 'issues' }
                            ]}
                        />
                    </div>
                    <div className="py-8 max-w-3xl mx-auto sm:px-6 lg:max-w-7xl">
                        {page.params.tab === 'about' ? (
                            <div className="space-y-6">
                                {/* Description list*/}
                                <section aria-labelledby="applicant-information-title">
                                    <div className="bg-white shadow sm:rounded-lg">
                                        <div className="px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-2">
                                                    <dt className="text-sm font-medium text-gray-500">About</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {pool.description}
                                                    </dd>
                                                </div>
                                                {fields.map(field => {

                                                    return (
                                                        <div className="sm:col-span-1">
                                                            <dt className="text-sm font-medium text-gray-500">{field.name}</dt>
                                                            <dd className="mt-1 text-sm text-gray-900"><Field field={field} value={data[field.id]} /></dd>
                                                        </div>
                                                    )
                                                })}
                                            </dl>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        ) : null}
                        {page.params.tab === 'delegators' ? (
                            <div>
                                <Table
                                    fields={[
                                        { id: 'stake', name: 'stake' },
                                        { id: 'epoch', name: 'epoch' },
                                        { id: 'time', type: 'date', name: 'time' },
                                        { id: 'amount', type: 'ada', name: 'amount' },
                                        { id: 'reward', type: 'ada', name: 'reward' },
                                        { id: 'owner', type: 'boolean', name: 'owner' },
                                    ]}
                                    records={delegators}
                                />
                            </div>
                        ) : null}
                        {page.params.tab === 'blocks' ? (
                            <div>
                                <Table
                                    fields={[
                                        { id: 'epoch', name: 'epoch' },
                                        { id: 'amount', type: 'ada', name: 'amount' },
                                        { id: 'fees', type: 'ada', name: 'fees' },
                                        { id: 'txs', name: 'txs' },
                                        { id: 'time', type: 'date', name: 'time' },
                                    ]}
                                    records={blocks}
                                />
                            </div>
                        ) : null}
                        {page.params.tab === 'hardware' ? (
                            <div>
                                <HardwareList devices={devices} />
                            </div>
                        ) : null}
                        {page.params.tab === 'issues' ? (
                            <div>
                                issues
                            </div>
                        ) : null}
                        {page.params.tab === 'assigned-slots' ? (
                            <div>
                                assigned slots
                            </div>
                        ) : null}
                    </div>
                </div>
            </Layout>
        </div>
    )
}
