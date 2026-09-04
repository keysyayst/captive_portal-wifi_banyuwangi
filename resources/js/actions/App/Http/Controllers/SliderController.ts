import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SliderController::store
 * @see app/Http/Controllers/SliderController.php:21
 * @route '/dashboard/slider'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/slider',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SliderController::store
 * @see app/Http/Controllers/SliderController.php:21
 * @route '/dashboard/slider'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SliderController::store
 * @see app/Http/Controllers/SliderController.php:21
 * @route '/dashboard/slider'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SliderController::store
 * @see app/Http/Controllers/SliderController.php:21
 * @route '/dashboard/slider'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SliderController::store
 * @see app/Http/Controllers/SliderController.php:21
 * @route '/dashboard/slider'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })

    store.form = storeForm
/**
* @see \App\Http\Controllers\SliderController::destroy
 * @see app/Http/Controllers/SliderController.php:35
 * @route '/dashboard/slider/{slider}'
 */
export const destroy = (args: { slider: number | { id: number } } | [slider: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/slider/{slider}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SliderController::destroy
 * @see app/Http/Controllers/SliderController.php:35
 * @route '/dashboard/slider/{slider}'
 */
destroy.url = (args: { slider: number | { id: number } } | [slider: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { slider: args.id }
        }

    if (Array.isArray(args)) {
        args = {
                    slider: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slider: typeof args.slider === 'object'
                ? args.slider.id
                : args.slider,
                }

    return destroy.definition.url
            .replace('{slider}', parsedArgs.slider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SliderController::destroy
 * @see app/Http/Controllers/SliderController.php:35
 * @route '/dashboard/slider/{slider}'
 */
destroy.delete = (args: { slider: number | { id: number } } | [slider: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SliderController::destroy
 * @see app/Http/Controllers/SliderController.php:35
 * @route '/dashboard/slider/{slider}'
 */
    const destroyForm = (args: { slider: number | { id: number } } | [slider: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SliderController::destroy
 * @see app/Http/Controllers/SliderController.php:35
 * @route '/dashboard/slider/{slider}'
 */
        destroyForm.delete = (args: { slider: number | { id: number } } | [slider: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })

    destroy.form = destroyForm
const SliderController = { store, destroy }

export default SliderController
