module.exports = {
    id: "countries",
    dependsOn: ['pools'],
    create: async (ctx) => {

        const pools = ctx.tables.get('pools')

        return pools.reduce((result, pool) => {

            pool.relays.forEach(relay => {

                if (!relay.data) {
                    return
                }

                const { data } = relay

                let country = result.find(country => country.id === data.country_code)

                if (data.success === false) {
                    console.log('ip stack error', pool.id, data)
                    return
                }

                if (!country) {
                    country = {
                        id: data.country_code,
                        name: data.country_name,
                        icon: data.location.country_flag_emoji,
                        continentCode: data.continent_code,
                        continentName: data.continent_name,
                        pools: []
                    }
                    result.push(country)
                }

                if (!country.pools.includes(pool.id)) {
                    country.pools.push(pool.id)
                }
            })

            return result
        }, [])
    }
}