import times from 'lodash/times'

const calculator_durations = times(20).map(i => {

    return {
        id: i + 1,
        name: `${i + 1} year${i > 1 ? 's' : ''}`
    }
})

export default calculator_durations