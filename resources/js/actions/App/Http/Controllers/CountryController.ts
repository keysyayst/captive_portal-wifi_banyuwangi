import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CountryController::index
 * @see app/Http/Controllers/CountryController.php:10
 * @route '/api/countries'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/countries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CountryController::index
 * @see app/Http/Controllers/CountryController.php:10
 * @route '/api/countries'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CountryController::index
 * @see app/Http/Controllers/CountryController.php:10
 * @route '/api/countries'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CountryController::index
 * @see app/Http/Controllers/CountryController.php:10
 * @route '/api/countries'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:44
 * @route '/api/countries/{code}'
 */
export const show = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/countries/{code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:44
 * @route '/api/countries/{code}'
 */
show.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        code: args.code,
                }

    return show.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:44
 * @route '/api/countries/{code}'
 */
show.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:44
 * @route '/api/countries/{code}'
 */
show.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const CountryController = { index, show }

export default CountryController