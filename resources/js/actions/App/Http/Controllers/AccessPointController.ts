import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AccessPointController::store
 * @see app/Http/Controllers/AccessPointController.php:12
 * @route '/dashboard/ap-management'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/ap-management',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AccessPointController::store
 * @see app/Http/Controllers/AccessPointController.php:12
 * @route '/dashboard/ap-management'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccessPointController::store
 * @see app/Http/Controllers/AccessPointController.php:12
 * @route '/dashboard/ap-management'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AccessPointController::store
 * @see app/Http/Controllers/AccessPointController.php:12
 * @route '/dashboard/ap-management'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AccessPointController::store
 * @see app/Http/Controllers/AccessPointController.php:12
 * @route '/dashboard/ap-management'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })

    store.form = storeForm
/**
* @see \App\Http\Controllers\AccessPointController::update
 * @see app/Http/Controllers/AccessPointController.php:19
 * @route '/dashboard/ap-management/{accessPoint}'
 */
export const update = (args: { accessPoint: number | { id: number } } | [accessPoint: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/dashboard/ap-management/{accessPoint}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AccessPointController::update
 * @see app/Http/Controllers/AccessPointController.php:19
 * @route '/dashboard/ap-management/{accessPoint}'
 */
update.url = (args: { accessPoint: number | { id: number } } | [accessPoint: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { accessPoint: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { accessPoint: args.id }
        }

    if (Array.isArray(args)) {
        args = {
                    accessPoint: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        accessPoint: typeof args.accessPoint === 'object'
                ? args.accessPoint.id
                : args.accessPoint,
                }

    return update.definition.url
            .replace('{accessPoint}', parsedArgs.accessPoint.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccessPointController::update
 * @see app/Http/Controllers/AccessPointController.php:19
 * @route '/dashboard/ap-management/{accessPoint}'
 */
update.patch = (args: { accessPoint: number | { id: number } } | [accessPoint: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AccessPointController::update
 * @see app/Http/Controllers/AccessPointController.php:19
 * @route '/dashboard/ap-management/{accessPoint}'
 */
    const updateForm = (args: { accessPoint: number | { id: number } } | [accessPoint: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AccessPointController::update
 * @see app/Http/Controllers/AccessPointController.php:19
 * @route '/dashboard/ap-management/{accessPoint}'
 */
        updateForm.patch = (args: { accessPoint: number | { id: number } } | [accessPoint: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })

    update.form = updateForm
/**
* @see \App\Http\Controllers\AccessPointController::destroy
 * @see app/Http/Controllers/AccessPointController.php:28
 * @route '/dashboard/ap-management/{accessPoint}'
 */
export const destroy = (args: { accessPoint: number | { id: number } } | [accessPoint: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/ap-management/{accessPoint}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AccessPointController::destroy
 * @see app/Http/Controllers/AccessPointController.php:28
 * @route '/dashboard/ap-management/{accessPoint}'
 */
destroy.url = (args: { accessPoint: number | { id: number } } | [accessPoint: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { accessPoint: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { accessPoint: args.id }
        }

    if (Array.isArray(args)) {
        args = {
                    accessPoint: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        accessPoint: typeof args.accessPoint === 'object'
                ? args.accessPoint.id
                : args.accessPoint,
                }

    return destroy.definition.url
            .replace('{accessPoint}', parsedArgs.accessPoint.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccessPointController::destroy
 * @see app/Http/Controllers/AccessPointController.php:28
 * @route '/dashboard/ap-management/{accessPoint}'
 */
destroy.delete = (args: { accessPoint: number | { id: number } } | [accessPoint: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AccessPointController::destroy
 * @see app/Http/Controllers/AccessPointController.php:28
 * @route '/dashboard/ap-management/{accessPoint}'
 */
    const destroyForm = (args: { accessPoint: number | { id: number } } | [accessPoint: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AccessPointController::destroy
 * @see app/Http/Controllers/AccessPointController.php:28
 * @route '/dashboard/ap-management/{accessPoint}'
 */
        destroyForm.delete = (args: { accessPoint: number | { id: number } } | [accessPoint: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })

    destroy.form = destroyForm
const AccessPointController = { store, update, destroy }

export default AccessPointController
