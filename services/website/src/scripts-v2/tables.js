const times = require('lodash/times')

const tables = [
    {
        id: "languages",
        fields: [
            {
                id: "id",
                type: "TEXT"
            },
            {
                id: "icon",
                type: "TEXT"
            },
            {
                id: "name",
                type: "TEXT"
            },
            {
                id: "translateSlug",
                type: "INTEGER"
            },
        ],
        loadTable: async () => {
            return [
                { id: 'en', icon: '🇺🇸', name: 'English', translateSlug: false },
                { id: 'ca', icon: '🐎', name: 'Català', translateSlug: false },
                { id: 'es', icon: '🇪🇸', name: 'Español', translateSlug: false },
                { id: 'de', icon: '🇩🇪', name: 'Deutsch', translateSlug: false },
                { id: 'nl', icon: '🇳🇱', name: 'Nederlands', translateSlug: false },
                { id: 'ms', icon: '🇲🇾', name: 'Melayu', translateSlug: false },
                { id: 'pt', icon: '🇵🇹', name: 'Português', translateSlug: false },
                { id: 'fi', icon: '🇫🇮', name: 'Suomeksi', translateSlug: false },
                { id: 'it', icon: '🇮🇹', name: 'Italiano', translateSlug: false },
                // { id: 'th', icon: '🇹🇭', name: 'ไทย', translateSlug: false },
            ]
        }
    },
    {
        id: "yearOptions",
        loadTable: async () => {

            const yearOptions = times(20).map(i => {

                return {
                    id: i + 1,
                    name: `${i + 1} year${i > 1 ? 's' : ''}`
                }
            })

            return yearOptions
        }
    }
]

module.exports = tables