import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TickerItemController::index
 * @see app/Http/Controllers/TickerItemController.php:14
 * @route '/api/ticker-items'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/ticker-items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TickerItemController::index
 * @see app/Http/Controllers/TickerItemController.php:14
 * @route '/api/ticker-items'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TickerItemController::index
 * @see app/Http/Controllers/TickerItemController.php:14
 * @route '/api/ticker-items'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TickerItemController::index
 * @see app/Http/Controllers/TickerItemController.php:14
 * @route '/api/ticker-items'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TickerItemController::index
 * @see app/Http/Controllers/TickerItemController.php:14
 * @route '/api/ticker-items'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TickerItemController::index
 * @see app/Http/Controllers/TickerItemController.php:14
 * @route '/api/ticker-items'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TickerItemController::index
 * @see app/Http/Controllers/TickerItemController.php:14
 * @route '/api/ticker-items'
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
* @see \App\Http\Controllers\TickerItemController::adminIndex
 * @see app/Http/Controllers/TickerItemController.php:26
 * @route '/api/admin/ticker-items'
 */
export const adminIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

adminIndex.definition = {
    methods: ["get","head"],
    url: '/api/admin/ticker-items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TickerItemController::adminIndex
 * @see app/Http/Controllers/TickerItemController.php:26
 * @route '/api/admin/ticker-items'
 */
adminIndex.url = (options?: RouteQueryOptions) => {
    return adminIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TickerItemController::adminIndex
 * @see app/Http/Controllers/TickerItemController.php:26
 * @route '/api/admin/ticker-items'
 */
adminIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TickerItemController::adminIndex
 * @see app/Http/Controllers/TickerItemController.php:26
 * @route '/api/admin/ticker-items'
 */
adminIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TickerItemController::adminIndex
 * @see app/Http/Controllers/TickerItemController.php:26
 * @route '/api/admin/ticker-items'
 */
    const adminIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TickerItemController::adminIndex
 * @see app/Http/Controllers/TickerItemController.php:26
 * @route '/api/admin/ticker-items'
 */
        adminIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TickerItemController::adminIndex
 * @see app/Http/Controllers/TickerItemController.php:26
 * @route '/api/admin/ticker-items'
 */
        adminIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminIndex.form = adminIndexForm
/**
* @see \App\Http\Controllers\TickerItemController::store
 * @see app/Http/Controllers/TickerItemController.php:36
 * @route '/api/admin/ticker-items'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/ticker-items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TickerItemController::store
 * @see app/Http/Controllers/TickerItemController.php:36
 * @route '/api/admin/ticker-items'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TickerItemController::store
 * @see app/Http/Controllers/TickerItemController.php:36
 * @route '/api/admin/ticker-items'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TickerItemController::store
 * @see app/Http/Controllers/TickerItemController.php:36
 * @route '/api/admin/ticker-items'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TickerItemController::store
 * @see app/Http/Controllers/TickerItemController.php:36
 * @route '/api/admin/ticker-items'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TickerItemController::show
 * @see app/Http/Controllers/TickerItemController.php:43
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
export const show = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/admin/ticker-items/{ticker_item}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TickerItemController::show
 * @see app/Http/Controllers/TickerItemController.php:43
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
show.url = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticker_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticker_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticker_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticker_item: typeof args.ticker_item === 'object'
                ? args.ticker_item.id
                : args.ticker_item,
                }

    return show.definition.url
            .replace('{ticker_item}', parsedArgs.ticker_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TickerItemController::show
 * @see app/Http/Controllers/TickerItemController.php:43
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
show.get = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TickerItemController::show
 * @see app/Http/Controllers/TickerItemController.php:43
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
show.head = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TickerItemController::show
 * @see app/Http/Controllers/TickerItemController.php:43
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
    const showForm = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TickerItemController::show
 * @see app/Http/Controllers/TickerItemController.php:43
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
        showForm.get = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TickerItemController::show
 * @see app/Http/Controllers/TickerItemController.php:43
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
        showForm.head = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\TickerItemController::update
 * @see app/Http/Controllers/TickerItemController.php:48
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
export const update = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/ticker-items/{ticker_item}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TickerItemController::update
 * @see app/Http/Controllers/TickerItemController.php:48
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
update.url = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticker_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticker_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticker_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticker_item: typeof args.ticker_item === 'object'
                ? args.ticker_item.id
                : args.ticker_item,
                }

    return update.definition.url
            .replace('{ticker_item}', parsedArgs.ticker_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TickerItemController::update
 * @see app/Http/Controllers/TickerItemController.php:48
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
update.put = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\TickerItemController::update
 * @see app/Http/Controllers/TickerItemController.php:48
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
update.patch = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TickerItemController::update
 * @see app/Http/Controllers/TickerItemController.php:48
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
    const updateForm = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TickerItemController::update
 * @see app/Http/Controllers/TickerItemController.php:48
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
        updateForm.put = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\TickerItemController::update
 * @see app/Http/Controllers/TickerItemController.php:48
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
        updateForm.patch = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TickerItemController::destroy
 * @see app/Http/Controllers/TickerItemController.php:55
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
export const destroy = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/ticker-items/{ticker_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TickerItemController::destroy
 * @see app/Http/Controllers/TickerItemController.php:55
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
destroy.url = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticker_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticker_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticker_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticker_item: typeof args.ticker_item === 'object'
                ? args.ticker_item.id
                : args.ticker_item,
                }

    return destroy.definition.url
            .replace('{ticker_item}', parsedArgs.ticker_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TickerItemController::destroy
 * @see app/Http/Controllers/TickerItemController.php:55
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
destroy.delete = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TickerItemController::destroy
 * @see app/Http/Controllers/TickerItemController.php:55
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
    const destroyForm = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TickerItemController::destroy
 * @see app/Http/Controllers/TickerItemController.php:55
 * @route '/api/admin/ticker-items/{ticker_item}'
 */
        destroyForm.delete = (args: { ticker_item: number | { id: number } } | [ticker_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const TickerItemController = { index, adminIndex, store, show, update, destroy }

export default TickerItemController