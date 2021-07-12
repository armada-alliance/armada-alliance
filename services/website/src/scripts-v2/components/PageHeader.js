const compact = require('lodash/compact')

module.exports = {
    id: 'PageHeader',
    name: 'PageHeader',
    type: 'Component',
    resolve: (ctx, props) => {

        let identities = null

        if (props.identities) {
            identities = props.identities.map(pageIdentity => {

                const identity = ctx.tables.get('identities').find(identity => identity.id === pageIdentity.id)

                if (!identity) {
                    return null
                }

                return {
                    ...identity,
                    role: pageIdentity.role
                }
            })
        }

        return {
            ...props,
            identities: compact(identities)
        }
    }
}