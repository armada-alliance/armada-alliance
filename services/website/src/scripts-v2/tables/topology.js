module.exports = {
    id: "topology",
    dependsOn: ['pools'],
    create: async (ctx) => {

        const pools = ctx.tables.get('pools')

        return pools.reduce((result, pool) => {

            pool.relays.forEach(relay => {

                if (!relay.data) {
                    return
                }

                result = [
                    ...result,
                    {
                        addr: relay.addr,
                        port: relay.port,
                        continent: relay.data.continent_name,
                        state: relay.data.country_code,
                        poolId: pool.id,
                        ticker: pool.ticker
                    }
                ]
            })

            return result
        }, [])
    }
}