const rules = [
    {
        id: 'rule-1',
        resolve: (ctx, { pool }) => {

            const checks = [null].map(() => {

                if (!pool.identities) {
                    return {
                        status: 'failed',
                        message: 'Pool does not have any identities',
                    }
                }

                const spos = pool.identities.map(item => item.role === 'spo')

                if (!spos.length) {
                    return {
                        status: 'failed',
                        message: 'Pool does not have any SPOs',
                    }
                }

                return {
                    status: 'passed',
                    message: `Pool has ${spos.length} SPOs`,
                }
            })

            return {
                checks,
                status: checks.reduce((prev, curr) => prev.status === 'failed' ? prev.status : curr.status, 'failed'),
            }
        }
    },
    {
        id: 'rule-2',
        resolve: (ctx, { pool }) => {

            const identities = ctx.tables.get('identities')
            const spos = pool.identities
                .filter(item => item.role === 'spo')
                .map(item => item.id)

            const checks = spos.map(spo => {

                const identity = identities.find(item => item.id === spo)
                if (!identity) {

                    return {
                        status: 'failed',
                        message: `SPO not found for identifier ${spo}`
                    }
                }

                const otherPools = ctx.tables.get('pools').filter(item => item.id !== pool.id)

                const otherPoolsBySPO = otherPools.filter(otherPool => {

                    const identities = otherPool.identities.map(identity => identity.id)

                    return identities.includes(spo)
                })

                if (otherPoolsBySPO.length) {
                    return {
                        status: 'failed',
                        message: `SPO [${identity.name}](/identities/${identity.id}) operates ${otherPoolsBySPO.length} pools`,
                    }
                }

                return {
                    status: 'passed',
                    message: `SPO [${identity.name}](/identities/${identity.id}) operates only one pool`,
                }
            })

            return {
                checks,
                status: checks.reduce((prev, curr) => prev.status === 'failed' ? prev.status : curr.status, 'failed'),
            }
        }
    },
    {
        id: 'rule-3',
        resolve: (ctx, { pool }) => {

            const identities = ctx.tables.get('identities')

            const checks = pool.identities
                .filter(item => item.role === 'spo')
                .map(item => {

                    const identity = identities.find(identity => identity.id === item.id)

                    if (!identity) {

                        return {
                            status: 'failed',
                            message: `SPO for ${item.id} could not be found`,
                        }
                    }

                    if (!identity.telegram) {
                        return {
                            status: 'failed',
                            message: `SPO [${identity.name}](/identities/${identity.id}) does not have a Telegram handle`,
                        }
                    }

                    return {
                        status: 'passed',
                        message: `SPO [${identity.name}](/identities/${identity.id}) has a Telegram handle`,
                    }
                })

            return {
                checks,
                status: checks.reduce((prev, curr) => prev.status === 'failed' ? prev.status : curr.status, 'failed'),
            }
        }
    },
    {
        id: 'rule-4',
        resolve: (ctx, { pool }) => {

            const checks = [null].map(() => {

                if (!pool.hasImage) {
                    return {
                        status: 'failed',
                        message: 'Pool does not have an image',
                    }
                }

                return {
                    status: 'passed',
                    message: `Pool has an image`,
                }
            })

            return {
                checks,
                status: checks.reduce((prev, curr) => prev.status === 'failed' ? prev.status : curr.status, 'failed'),
            }
        }
    },
    {
        id: 'rule-5',
        resolve: (ctx, { pool }) => {

            const checks = [null].map(() => {

                if (pool.relays.length < 2) {
                    return {
                        status: 'failed',
                        message: 'Pool does not have enough relays',
                    }
                }

                return {
                    status: 'passed',
                    message: `Pool has ${pool.relays.length} relays`,
                }
            })

            return {
                checks,
                status: checks.reduce((prev, curr) => prev.status === 'failed' ? prev.status : curr.status, 'failed'),
            }
        }
    },
    {
        id: 'rule-6',
        resolve: (ctx, { pool }) => {

            const checks = [null].map(() => {

                if (!pool.nodes) {
                    return {
                        status: 'failed',
                        message: 'Pool does not have nodes',
                    }
                }

                return {
                    status: 'passed',
                    message: `Pool has ${pool.nodes.length} nodes`,
                }
            })

            return {
                checks,
                status: checks.reduce((prev, curr) => prev.status === 'failed' ? prev.status : curr.status, 'failed'),
            }
        }
    },
    {
        id: 'rule-7',
        resolve: (ctx, { pool }) => {

            const checks = [null].map(() => {

                const devices = ctx.tables.get('devices')

                const armDevices = (pool.nodes || [])
                    .map(node =>
                        devices.find(device => device.id === node.deviceId)
                    ).filter(device =>
                        device && device.platform === 'ARM'
                    )

                if (armDevices.length < 1) {

                    return {
                        status: 'failed',
                        message: 'Pool does not have any ARM devices',
                    }
                }

                return {
                    status: 'passed',
                    message: `Pool has ${armDevices.length} ARM devices`,
                }
            })

            return {
                checks,
                status: checks.reduce((prev, curr) => prev.status === 'failed' ? prev.status : curr.status, 'failed'),
            }
        }
    },
    {
        id: 'rule-8',
        resolve: (ctx, { pool }) => {

            const checks = [null].map(() => {

                const devices = ctx.tables.get('devices')

                const armNodes = (pool.nodes || [])
                    .map(node => ({
                        ...node,
                        device: devices.find(device => device.id === node.deviceId),
                    }))
                    .filter(node =>
                        node.device && node.device.platform === 'ARM'
                    )

                const producerOnARM = armNodes.find(node =>
                    node.role === 'producer'
                )

                const relayOnARM = armNodes.find(node =>
                    node.role === 'relay'
                )

                if (!producerOnARM || !relayOnARM) {

                    return {
                        status: 'failed',
                        message: 'Pool does not have all devices on ARM',
                    }
                }

                return {
                    status: 'passed',
                    message: `Pool has all devices on ARM`,
                }
            })

            return {
                checks,
                status: checks.reduce((prev, curr) => prev.status === 'failed' ? prev.status : curr.status, 'failed'),
            }
        }
    }
]

module.exports = rules