import { useState } from 'react'
import moment from 'moment'
import toAda from './toAda'

const RECORD_LIMIT = 5

function AdaField({ value }) {
    return <span>{toAda(value)} ₳</span>
}

function TextField({ value }) {
    return <span>{value}</span>
}

function BooleanField({ value }) {
    return value ? (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Yes
        </span>
    ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                No
            </span>
        )
}

function DateField({ value }) {
    return <span>{value ? moment(value * 1000).calendar() : value}</span>
}

const fieldTypes = {
    date: DateField,
    text: TextField,
    ada: AdaField,
    boolean: BooleanField,
}

function Field(props) {
    const { field } = props
    const FieldType = fieldTypes[field.type] || TextField
    return (
        <FieldType {...props} />
    )
}

export default function Table({ fields, records }) {

    const [expanded, setExpanded] = useState(false)
    const visibleRecords = expanded ? records : records.slice(0, RECORD_LIMIT)
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {fields.map(field => {

                                        return (
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {field.name}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {visibleRecords.map((record) => (
                                    <tr key={JSON.stringify(record)}>
                                        {fields.map(field => {

                                            const value = record[field.id]

                                            return (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <Field field={field} value={value} />
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!expanded && records.length > RECORD_LIMIT ? (
                            <div>
                                <div
                                    onClick={() => setExpanded(true)}
                                    className="cursor-pointer block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                                >
                                    Show all {records.length} records
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
