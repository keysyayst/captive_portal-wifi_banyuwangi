import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LocationWeatherController::show
 * @see app/Http/Controllers/LocationWeatherController.php:11
 * @route '/api/location/weather'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/location/weather',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationWeatherController::show
 * @see app/Http/Controllers/LocationWeatherController.php:11
 * @route '/api/location/weather'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationWeatherController::show
 * @see app/Http/Controllers/LocationWeatherController.php:11
 * @route '/api/location/weather'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocationWeatherController::show
 * @see app/Http/Controllers/LocationWeatherController.php:11
 * @route '/api/location/weather'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocationWeatherController::show
 * @see app/Http/Controllers/LocationWeatherController.php:11
 * @route '/api/location/weather'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocationWeatherController::show
 * @see app/Http/Controllers/LocationWeatherController.php:11
 * @route '/api/location/weather'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocationWeatherController::show
 * @see app/Http/Controllers/LocationWeatherController.php:11
 * @route '/api/location/weather'
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
const LocationWeatherController = { show }

export default LocationWeatherController