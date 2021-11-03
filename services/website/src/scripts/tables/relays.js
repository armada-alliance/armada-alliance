module.exports = {
    id: "relays",
    dependsOn: ['pools'],
    create: async (ctx) => {

        const pools = ctx.tables.get('pools')

        return pools.reduce((result, pool) => {

            pool.relays.forEach(relay => {

                if (!relay.data || !relay.data.latitude || !relay.data.longitude) {
                    return
                }

                result = [
                    ...result,
                    {
                        addr: relay.addr,
                        port: relay.port,
                        continent: relay.data.continent_name,
                        state: relay.data.country_code,
                        latitude: relay.data.latitude,
                        longitude: relay.data.longitude,
                        poolId: pool.id
                    }
                ]
            })

            return result
        }, [])
    }
}