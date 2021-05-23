import React from 'react'
import Text from '../Text'

function RadioField({ field, value, onChange }) {

    value = value ? JSON.stringify({ value }) : value

    const options = field.settings.options.map(option => ({
        ...option,
        id: JSON.stringify({ value: option.id })
    }))

    return (
        <div className="mt-4 space-y-4">
            {options.map(option => {

                return (
                    <div key={option.id} className="flex items-center">
                        <input
                            id={option.id}
                            name={field.id}
                            type="radio"
                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                            checked={value === option.id}
                            onClick={() => {
                                onChange({
                                    value: JSON.parse(option.id).value
                                })
                            }}
                        />
                        <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                            <Text>{option.name}</Text>
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default RadioField

