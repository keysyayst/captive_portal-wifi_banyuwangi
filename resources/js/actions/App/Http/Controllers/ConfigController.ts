import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ConfigController::show
 * @see app/Http/Controllers/ConfigController.php:27
 * @route '/api/config'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ConfigController::show
 * @see app/Http/Controllers/ConfigController.php:27
 * @route '/api/config'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ConfigController::show
 * @see app/Http/Controllers/ConfigController.php:27
 * @route '/api/config'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ConfigController::show
 * @see app/Http/Controllers/ConfigController.php:27
 * @route '/api/config'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ConfigController::show
 * @see app/Http/Controllers/ConfigController.php:27
 * @route '/api/config'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ConfigController::show
 * @see app/Http/Controllers/ConfigController.php:27
 * @route '/api/config'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ConfigController::show
 * @see app/Http/Controllers/ConfigController.php:27
 * @route '/api/config'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ConfigController::terms
 * @see app/Http/Controllers/ConfigController.php:45
 * @route '/api/terms'
 */
export const terms = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})

terms.definition = {
    methods: ["get","head"],
    url: '/api/terms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ConfigController::terms
 * @see app/Http/Controllers/ConfigController.php:45
 * @route '/api/terms'
 */
terms.url = (options?: RouteQueryOptions) => {
    return terms.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ConfigController::terms
 * @see app/Http/Controllers/ConfigController.php:45
 * @route '/api/terms'
 */
terms.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ConfigController::terms
 * @see app/Http/Controllers/ConfigController.php:45
 * @route '/api/terms'
 */
terms.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: terms.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ConfigController::terms
 * @see app/Http/Controllers/ConfigController.php:45
 * @route '/api/terms'
 */
    const termsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: terms.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ConfigController::terms
 * @see app/Http/Controllers/ConfigController.php:45
 * @route '/api/terms'
 */
        termsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terms.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ConfigController::terms
 * @see app/Http/Controllers/ConfigController.php:45
 * @route '/api/terms'
 */
        termsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terms.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    terms.form = termsForm
const ConfigController = { show, terms }

export default ConfigController