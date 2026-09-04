import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PortalContentController::store
 * @see app/Http/Controllers/PortalContentController.php:12
 * @route '/dashboard/portal-content'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/portal-content',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PortalContentController::store
 * @see app/Http/Controllers/PortalContentController.php:12
 * @route '/dashboard/portal-content'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalContentController::store
 * @see app/Http/Controllers/PortalContentController.php:12
 * @route '/dashboard/portal-content'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PortalContentController::store
 * @see app/Http/Controllers/PortalContentController.php:12
 * @route '/dashboard/portal-content'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PortalContentController::store
 * @see app/Http/Controllers/PortalContentController.php:12
 * @route '/dashboard/portal-content'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PortalContentController::update
 * @see app/Http/Controllers/PortalContentController.php:28
 * @route '/dashboard/portal-content/{contentType}/{content}'
 */
export const update = (args: { contentType: string | number, content: string | number } | [contentType: string | number, content: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/dashboard/portal-content/{contentType}/{content}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PortalContentController::update
 * @see app/Http/Controllers/PortalContentController.php:28
 * @route '/dashboard/portal-content/{contentType}/{content}'
 */
update.url = (args: { contentType: string | number, content: string | number } | [contentType: string | number, content: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    contentType: args[0],
                    content: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contentType: args.contentType,
                                content: args.content,
                }

    return update.definition.url
            .replace('{contentType}', parsedArgs.contentType.toString())
            .replace('{content}', parsedArgs.content.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalContentController::update
 * @see app/Http/Controllers/PortalContentController.php:28
 * @route '/dashboard/portal-content/{contentType}/{content}'
 */
update.patch = (args: { contentType: string | number, content: string | number } | [contentType: string | number, content: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PortalContentController::update
 * @see app/Http/Controllers/PortalContentController.php:28
 * @route '/dashboard/portal-content/{contentType}/{content}'
 */
    const updateForm = (args: { contentType: string | number, content: string | number } | [contentType: string | number, content: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PortalContentController::update
 * @see app/Http/Controllers/PortalContentController.php:28
 * @route '/dashboard/portal-content/{contentType}/{content}'
 */
        updateForm.patch = (args: { contentType: string | number, content: string | number } | [contentType: string | number, content: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PortalContentController::destroy
 * @see app/Http/Controllers/PortalContentController.php:44
 * @route '/dashboard/portal-content/{contentType}/{content}'
 */
export const destroy = (args: { contentType: string | number, content: string | number } | [contentType: string | number, content: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/portal-content/{contentType}/{content}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PortalContentController::destroy
 * @see app/Http/Controllers/PortalContentController.php:44
 * @route '/dashboard/portal-content/{contentType}/{content}'
 */
destroy.url = (args: { contentType: string | number, content: string | number } | [contentType: string | number, content: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    contentType: args[0],
                    content: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contentType: args.contentType,
                                content: args.content,
                }

    return destroy.definition.url
            .replace('{contentType}', parsedArgs.contentType.toString())
            .replace('{content}', parsedArgs.content.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalContentController::destroy
 * @see app/Http/Controllers/PortalContentController.php:44
 * @route '/dashboard/portal-content/{contentType}/{content}'
 */
destroy.delete = (args: { contentType: string | number, content: string | number } | [contentType: string | number, content: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PortalContentController::destroy
 * @see app/Http/Controllers/PortalContentController.php:44
 * @route '/dashboard/portal-content/{contentType}/{content}'
 */
    const destroyForm = (args: { contentType: string | number, content: string | number } | [contentType: string | number, content: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PortalContentController::destroy
 * @see app/Http/Controllers/PortalContentController.php:44
 * @route '/dashboard/portal-content/{contentType}/{content}'
 */
        destroyForm.delete = (args: { contentType: string | number, content: string | number } | [contentType: string | number, content: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const PortalContentController = { store, update, destroy }

export default PortalContentController