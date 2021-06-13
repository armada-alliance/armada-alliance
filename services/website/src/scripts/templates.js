const fetch = require('./fetch')
const pools = require('../pools_extended.json')
const fs = require('fs/promises')
const fm = require('front-matter')
const path = require('path')
const preprocessMarkdown = require('./preprocessMarkdown')

const contentPath = path.join(__dirname, '..', '..', 'content')

const templates = {
    BlogDetailPage: {
        getProps: async ({ params }) => {

            const string = await fs.readFile(path.join(contentPath, params.source), 'utf-8')

            const data = fm(string)

            console.log('data', data)

            return {
                body: preprocessMarkdown(data.body)
            }
        }
    },
    TermDetailPage: {
        getProps: async ({ params }) => {

            const string = await fs.readFile(path.join(contentPath, params.source), 'utf-8')

            const data = fm(string)

            console.log('data', data)

            return {
                body: preprocessMarkdown(data.body)
            }
        }
    },
    PoolDetailPage: {
        getProps: async ({ params }) => {

            const pool = pools.find(pool => pool.id === params.poolId)
            const { data: feed } = await fetch(`https://pool.pm/feed/${params.poolId}`)
            const { data: stake } = await fetch(`https://pool.pm/stake/${params.poolId}`)
            // const { data: { data: { devices } } } = await fetch(`https://pool.sublayer.io/metrics`)
            const devices = []

            return {
                feed,
                stake,
                devices,
                pool
            }
        }
    }
}

module.exports = templates