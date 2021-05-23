import SelectField from './SelectField'
import NumberField from './NumberField'
import TextField from './TextField'

const fieldTypes = {
    text: TextField,
    number: NumberField,
    select: SelectField
}

export default fieldTypes