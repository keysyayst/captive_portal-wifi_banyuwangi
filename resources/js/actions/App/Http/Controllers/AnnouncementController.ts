import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AnnouncementController::index
 * @see app/Http/Controllers/AnnouncementController.php:18
 * @route '/api/announcements'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnnouncementController::index
 * @see app/Http/Controllers/AnnouncementController.php:18
 * @route '/api/announcements'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementController::index
 * @see app/Http/Controllers/AnnouncementController.php:18
 * @route '/api/announcements'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnnouncementController::index
 * @see app/Http/Controllers/AnnouncementController.php:18
 * @route '/api/announcements'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AnnouncementController::index
 * @see app/Http/Controllers/AnnouncementController.php:18
 * @route '/api/announcements'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AnnouncementController::index
 * @see app/Http/Controllers/AnnouncementController.php:18
 * @route '/api/announcements'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AnnouncementController::index
 * @see app/Http/Controllers/AnnouncementController.php:18
 * @route '/api/announcements'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\AnnouncementController::dashboard
 * @see app/Http/Controllers/AnnouncementController.php:32
 * @route '/dashboard/announcements'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnnouncementController::dashboard
 * @see app/Http/Controllers/AnnouncementController.php:32
 * @route '/dashboard/announcements'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementController::dashboard
 * @see app/Http/Controllers/AnnouncementController.php:32
 * @route '/dashboard/announcements'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnnouncementController::dashboard
 * @see app/Http/Controllers/AnnouncementController.php:32
 * @route '/dashboard/announcements'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AnnouncementController::dashboard
 * @see app/Http/Controllers/AnnouncementController.php:32
 * @route '/dashboard/announcements'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AnnouncementController::dashboard
 * @see app/Http/Controllers/AnnouncementController.php:32
 * @route '/dashboard/announcements'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AnnouncementController::dashboard
 * @see app/Http/Controllers/AnnouncementController.php:32
 * @route '/dashboard/announcements'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\AnnouncementController::store
 * @see app/Http/Controllers/AnnouncementController.php:45
 * @route '/dashboard/announcements'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/announcements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AnnouncementController::store
 * @see app/Http/Controllers/AnnouncementController.php:45
 * @route '/dashboard/announcements'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementController::store
 * @see app/Http/Controllers/AnnouncementController.php:45
 * @route '/dashboard/announcements'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AnnouncementController::store
 * @see app/Http/Controllers/AnnouncementController.php:45
 * @route '/dashboard/announcements'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AnnouncementController::store
 * @see app/Http/Controllers/AnnouncementController.php:45
 * @route '/dashboard/announcements'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AnnouncementController::update
 * @see app/Http/Controllers/AnnouncementController.php:62
 * @route '/dashboard/announcements/{announcement}'
 */
export const update = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/dashboard/announcements/{announcement}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AnnouncementController::update
 * @see app/Http/Controllers/AnnouncementController.php:62
 * @route '/dashboard/announcements/{announcement}'
 */
update.url = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { announcement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.id
                : args.announcement,
                }

    return update.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementController::update
 * @see app/Http/Controllers/AnnouncementController.php:62
 * @route '/dashboard/announcements/{announcement}'
 */
update.patch = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AnnouncementController::update
 * @see app/Http/Controllers/AnnouncementController.php:62
 * @route '/dashboard/announcements/{announcement}'
 */
    const updateForm = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AnnouncementController::update
 * @see app/Http/Controllers/AnnouncementController.php:62
 * @route '/dashboard/announcements/{announcement}'
 */
        updateForm.patch = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\AnnouncementController::destroy
 * @see app/Http/Controllers/AnnouncementController.php:77
 * @route '/dashboard/announcements/{announcement}'
 */
export const destroy = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/announcements/{announcement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AnnouncementController::destroy
 * @see app/Http/Controllers/AnnouncementController.php:77
 * @route '/dashboard/announcements/{announcement}'
 */
destroy.url = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { announcement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.id
                : args.announcement,
                }

    return destroy.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementController::destroy
 * @see app/Http/Controllers/AnnouncementController.php:77
 * @route '/dashboard/announcements/{announcement}'
 */
destroy.delete = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AnnouncementController::destroy
 * @see app/Http/Controllers/AnnouncementController.php:77
 * @route '/dashboard/announcements/{announcement}'
 */
    const destroyForm = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AnnouncementController::destroy
 * @see app/Http/Controllers/AnnouncementController.php:77
 * @route '/dashboard/announcements/{announcement}'
 */
        destroyForm.delete = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AnnouncementController = { index, dashboard, store, update, destroy }

export default AnnouncementController