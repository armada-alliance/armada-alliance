module.exports = {
    id: 'Header',
    type: 'Component',
    resolve: async (ctx, props) => {

        return {
            ...props,
            image: '/ship-420.png'
        }
    },
    components: [
        { type: 'SearchBox' },
    ]
}