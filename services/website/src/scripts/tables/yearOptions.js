const times = require('lodash/times')

module.exports = {
    id: "yearOptions",
    create: async () => {

        const yearOptions = times(20).map(i => {

            return {
                id: i + 1,
                name: `${i + 1} year${i > 1 ? 's' : ''}`
            }
        })

        return yearOptions
    }
}