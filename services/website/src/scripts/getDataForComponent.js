const perf = require('execution-time')()
const components = require('./components')

const componentsById = components.reduce((result, component) => {
    result[component.id] = component
    return result
}, {})

let cache = {}

async function writeCache(key, value) {
    cache[key] = value
}

async function readCache(key) {
    return cache[key]
}

const createCacheKey = input => JSON.stringify(input)

const getDataForComponent = ctx => async ({ id, type, props, invalidate, resolve }) => {

    const cacheKey = createCacheKey({ component: { type, version: 1 }, props })

    perf.start(cacheKey)

    id = id || type

    let error = null
    let status = "resolved"
    let cachedObj = null
    let updateCache = false
    let resolvedComponents = {}

    try {

        cachedObj = await readCache(cacheKey)

        updateCache = !cachedObj || invalidate

        if (updateCache) {
            props = resolve ? await resolve(ctx, props) : props
        } else {
            props = cachedObj.props
        }

        const component = componentsById[type]

        if (component) {

            if (updateCache) {
                props = component.resolve ? await component.resolve(ctx, props) : props
            }

            const components = component.components || []

            const componentsWithData = await Promise.all(
                components.map(async child => {

                    return {
                        child,
                        data: await getDataForComponent(ctx)({
                            type: child.type,
                            invalidate,
                            resolve: async (ctx, input) => child.resolve ? await child.resolve(ctx, { ...props, ...input }) : {}
                        })
                    }
                })
            )

            resolvedComponents = componentsWithData.reduce((result, item) => {
                result[item.data.id] = item.data
                return result
            }, {})
        }

    } catch (e) {

        status = "error"
        error = e.message
    }

    const perfResult = perf.stop(cacheKey)

    if (updateCache) {
        cachedObj = {
            _cachedAt: new Date().toISOString(),
            _cachedIn: perfResult.words,
            props
        }

        await writeCache(cacheKey, cachedObj)
    }

    const _resolvedIn = perfResult.words
    const { _cachedAt, _cachedIn } = cachedObj

    const attrs = {
        "component-type": type,
        "component-id": id,
        "component-cached-at": _cachedAt,
        "component-cached-in": _cachedIn,
        "component-resolved-in": _resolvedIn,
    }

    if (error) {
        attrs["component-error"] = error
    }

    const result = {
        _cacheKey: cacheKey,
        _fromCache: !updateCache,
        _cachedAt,
        _cachedIn,
        _resolvedIn,
        id,
        type,
        status,
        error,
        props,
        attrs,
        components: resolvedComponents,
    }

    return result
}

module.exports = getDataForComponent