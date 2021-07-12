import moment from 'moment'
import Layout from "./Layout"
import Content from "./Content"

function Item({ name, completed, date }) {

    return (
        <li>
            <div className="relative p-4 bg-gray-50 rounded-lg">
                <div className="relative flex items-center space-x-3">
                    {completed ? (
                        <div>
                            <span className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                                {/* Heroicon name: solid/check */}
                                <svg className="h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    ) : (
                            <div>
                                <span className="h-5 w-5 rounded-full bg-gray-400 flex items-center justify-center">
                                    <svg className="h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                    </svg>
                                </span>
                            </div>
                        )}
                    <div className="min-w-0 flex-1 flex justify-between space-x-4">
                        <div>
                            <p className="text-sm"><Content value={name} /></p>
                        </div>
                    </div>
                    {date ? (
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {moment(date).format('MMM Do')}
                        </div>
                    ) : null}
                </div>
            </div>
        </li>
    )
}

function Checklist({ items }) {

    return (
        <div className="flow-root">
            <ul className="space-y-2">
                {items.map((item, index) => {

                    return (
                        <Item key={index} {...item} />
                    )
                })}
            </ul>
        </div>

    )
}

function Sprint({ name, items }) {

    return (
        <div className="max-w-lg mx-auto p-4 ">
            <h1 className="text-lg font-bold text-center">{name}</h1>
            <div className="mt-4">
                <Checklist items={items} />
            </div>
        </div>
    )
}

export default function RoadmapPage() {

    const sprints = schema.roadmap.items
        .sort((a, b) => b.date.localeCompare(a.date))
        .reduce((result, item) => {

            const sprintName = moment(item.date).format('MMMM YYYY')

            let sprint = result.find(sprint => sprint.name === sprintName)

            if (!sprint) {
                sprint = {
                    name: sprintName,
                    items: []
                }
                result.push(sprint)
            }

            sprint.items.push(item)


            return result

        }, [])

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
                <h1 className="text-3xl leading-8 font-extrabold text-center">Roadmap</h1>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto text-center">
                </p>
                <div className="mt-10 space-y-10">
                    {sprints.map((sprint, index) => {

                        return (
                            <Sprint key={index} {...sprint} />
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}