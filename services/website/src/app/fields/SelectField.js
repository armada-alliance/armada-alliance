import React from 'react'
import * as styles from './styles'

function DropdownField({ field, value, onChange }) {

    value = value ? JSON.stringify({ value }) : value

    const options = [
        { id: null, name: field.settings.placeholder },
        ...field.settings.options
    ].map(option => ({
        ...option,
        id: JSON.stringify({ value: option.id })
    }))

    return (
        <select
            className="max-w-lg block focus:ring-primary-500 focus:border-primary-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            css={styles.input}
            value={value}
            onChange={(e) => {

                onChange({
                    value: JSON.parse(e.target.value).value
                })
            }}
        >
            {options.map(option => {

                return (
                    <option key={option.id} value={option.id}>{option.name}</option>
                )
            })}
        </select>
    )
}

export default DropdownField