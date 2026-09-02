import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/stats'
 */
        statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stats.form = statsForm
/**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/api/dashboard/active-users'
 */
const activeUsers9a044b30daf9b14571439ccaa28caa7f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activeUsers9a044b30daf9b14571439ccaa28caa7f.url(options),
    method: 'get',
})

activeUsers9a044b30daf9b14571439ccaa28caa7f.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/active-users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/api/dashboard/active-users'
 */
activeUsers9a044b30daf9b14571439ccaa28caa7f.url = (options?: RouteQueryOptions) => {
    return activeUsers9a044b30daf9b14571439ccaa28caa7f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/api/dashboard/active-users'
 */
activeUsers9a044b30daf9b14571439ccaa28caa7f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activeUsers9a044b30daf9b14571439ccaa28caa7f.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/api/dashboard/active-users'
 */
activeUsers9a044b30daf9b14571439ccaa28caa7f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activeUsers9a044b30daf9b14571439ccaa28caa7f.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/api/dashboard/active-users'
 */
    const activeUsers9a044b30daf9b14571439ccaa28caa7fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: activeUsers9a044b30daf9b14571439ccaa28caa7f.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/api/dashboard/active-users'
 */
        activeUsers9a044b30daf9b14571439ccaa28caa7fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: activeUsers9a044b30daf9b14571439ccaa28caa7f.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/api/dashboard/active-users'
 */
        activeUsers9a044b30daf9b14571439ccaa28caa7fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: activeUsers9a044b30daf9b14571439ccaa28caa7f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    activeUsers9a044b30daf9b14571439ccaa28caa7f.form = activeUsers9a044b30daf9b14571439ccaa28caa7fForm
    /**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/dashboard/active-users'
 */
const activeUsers2370df3ce5aa63799349af99d0599b68 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activeUsers2370df3ce5aa63799349af99d0599b68.url(options),
    method: 'get',
})

activeUsers2370df3ce5aa63799349af99d0599b68.definition = {
    methods: ["get","head"],
    url: '/dashboard/active-users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/dashboard/active-users'
 */
activeUsers2370df3ce5aa63799349af99d0599b68.url = (options?: RouteQueryOptions) => {
    return activeUsers2370df3ce5aa63799349af99d0599b68.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/dashboard/active-users'
 */
activeUsers2370df3ce5aa63799349af99d0599b68.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activeUsers2370df3ce5aa63799349af99d0599b68.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/dashboard/active-users'
 */
activeUsers2370df3ce5aa63799349af99d0599b68.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activeUsers2370df3ce5aa63799349af99d0599b68.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/dashboard/active-users'
 */
    const activeUsers2370df3ce5aa63799349af99d0599b68Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: activeUsers2370df3ce5aa63799349af99d0599b68.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/dashboard/active-users'
 */
        activeUsers2370df3ce5aa63799349af99d0599b68Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: activeUsers2370df3ce5aa63799349af99d0599b68.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::activeUsers
 * @see app/Http/Controllers/DashboardController.php:52
 * @route '/dashboard/active-users'
 */
        activeUsers2370df3ce5aa63799349af99d0599b68Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: activeUsers2370df3ce5aa63799349af99d0599b68.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    activeUsers2370df3ce5aa63799349af99d0599b68.form = activeUsers2370df3ce5aa63799349af99d0599b68Form

/**
* Multiple routes resolve to \App\Http\Controllers\DashboardController::activeUsers, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `activeUsers['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const activeUsers = {
    '/api/dashboard/active-users': activeUsers9a044b30daf9b14571439ccaa28caa7f,
    '/dashboard/active-users': activeUsers2370df3ce5aa63799349af99d0599b68,
}

/**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/api/dashboard/login-history'
 */
const loginHistory885c5e2e2d22542a23f911a7d4194464 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loginHistory885c5e2e2d22542a23f911a7d4194464.url(options),
    method: 'get',
})

loginHistory885c5e2e2d22542a23f911a7d4194464.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/login-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/api/dashboard/login-history'
 */
loginHistory885c5e2e2d22542a23f911a7d4194464.url = (options?: RouteQueryOptions) => {
    return loginHistory885c5e2e2d22542a23f911a7d4194464.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/api/dashboard/login-history'
 */
loginHistory885c5e2e2d22542a23f911a7d4194464.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loginHistory885c5e2e2d22542a23f911a7d4194464.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/api/dashboard/login-history'
 */
loginHistory885c5e2e2d22542a23f911a7d4194464.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loginHistory885c5e2e2d22542a23f911a7d4194464.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/api/dashboard/login-history'
 */
    const loginHistory885c5e2e2d22542a23f911a7d4194464Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: loginHistory885c5e2e2d22542a23f911a7d4194464.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/api/dashboard/login-history'
 */
        loginHistory885c5e2e2d22542a23f911a7d4194464Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loginHistory885c5e2e2d22542a23f911a7d4194464.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/api/dashboard/login-history'
 */
        loginHistory885c5e2e2d22542a23f911a7d4194464Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loginHistory885c5e2e2d22542a23f911a7d4194464.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    loginHistory885c5e2e2d22542a23f911a7d4194464.form = loginHistory885c5e2e2d22542a23f911a7d4194464Form
    /**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/dashboard/login-history'
 */
const loginHistoryee5fe52b972da42f26943713528422e2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loginHistoryee5fe52b972da42f26943713528422e2.url(options),
    method: 'get',
})

loginHistoryee5fe52b972da42f26943713528422e2.definition = {
    methods: ["get","head"],
    url: '/dashboard/login-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/dashboard/login-history'
 */
loginHistoryee5fe52b972da42f26943713528422e2.url = (options?: RouteQueryOptions) => {
    return loginHistoryee5fe52b972da42f26943713528422e2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/dashboard/login-history'
 */
loginHistoryee5fe52b972da42f26943713528422e2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loginHistoryee5fe52b972da42f26943713528422e2.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/dashboard/login-history'
 */
loginHistoryee5fe52b972da42f26943713528422e2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loginHistoryee5fe52b972da42f26943713528422e2.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/dashboard/login-history'
 */
    const loginHistoryee5fe52b972da42f26943713528422e2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: loginHistoryee5fe52b972da42f26943713528422e2.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/dashboard/login-history'
 */
        loginHistoryee5fe52b972da42f26943713528422e2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loginHistoryee5fe52b972da42f26943713528422e2.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::loginHistory
 * @see app/Http/Controllers/DashboardController.php:93
 * @route '/dashboard/login-history'
 */
        loginHistoryee5fe52b972da42f26943713528422e2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loginHistoryee5fe52b972da42f26943713528422e2.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    loginHistoryee5fe52b972da42f26943713528422e2.form = loginHistoryee5fe52b972da42f26943713528422e2Form

/**
* Multiple routes resolve to \App\Http\Controllers\DashboardController::loginHistory, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `loginHistory['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const loginHistory = {
    '/api/dashboard/login-history': loginHistory885c5e2e2d22542a23f911a7d4194464,
    '/dashboard/login-history': loginHistoryee5fe52b972da42f26943713528422e2,
}

/**
* @see \App\Http\Controllers\DashboardController::locationStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/location-stats'
 */
export const locationStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locationStats.url(options),
    method: 'get',
})

locationStats.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/location-stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::locationStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/location-stats'
 */
locationStats.url = (options?: RouteQueryOptions) => {
    return locationStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::locationStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/location-stats'
 */
locationStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locationStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::locationStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/location-stats'
 */
locationStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: locationStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::locationStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/location-stats'
 */
    const locationStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: locationStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::locationStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/location-stats'
 */
        locationStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: locationStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::locationStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/api/dashboard/location-stats'
 */
        locationStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: locationStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    locationStats.form = locationStatsForm
/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
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
* @see \App\Http\Controllers\DashboardController::exportLoginHistory
 * @see app/Http/Controllers/DashboardController.php:151
 * @route '/dashboard/login-history/export'
 */
export const exportLoginHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportLoginHistory.url(options),
    method: 'get',
})

exportLoginHistory.definition = {
    methods: ["get","head"],
    url: '/dashboard/login-history/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::exportLoginHistory
 * @see app/Http/Controllers/DashboardController.php:151
 * @route '/dashboard/login-history/export'
 */
exportLoginHistory.url = (options?: RouteQueryOptions) => {
    return exportLoginHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::exportLoginHistory
 * @see app/Http/Controllers/DashboardController.php:151
 * @route '/dashboard/login-history/export'
 */
exportLoginHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportLoginHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::exportLoginHistory
 * @see app/Http/Controllers/DashboardController.php:151
 * @route '/dashboard/login-history/export'
 */
exportLoginHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportLoginHistory.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::exportLoginHistory
 * @see app/Http/Controllers/DashboardController.php:151
 * @route '/dashboard/login-history/export'
 */
    const exportLoginHistoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportLoginHistory.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::exportLoginHistory
 * @see app/Http/Controllers/DashboardController.php:151
 * @route '/dashboard/login-history/export'
 */
        exportLoginHistoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportLoginHistory.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::exportLoginHistory
 * @see app/Http/Controllers/DashboardController.php:151
 * @route '/dashboard/login-history/export'
 */
        exportLoginHistoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportLoginHistory.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportLoginHistory.form = exportLoginHistoryForm
/**
* @see \App\Http\Controllers\DashboardController::apManagement
 * @see app/Http/Controllers/DashboardController.php:225
 * @route '/dashboard/ap-management'
 */
export const apManagement = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apManagement.url(options),
    method: 'get',
})

apManagement.definition = {
    methods: ["get","head"],
    url: '/dashboard/ap-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::apManagement
 * @see app/Http/Controllers/DashboardController.php:225
 * @route '/dashboard/ap-management'
 */
apManagement.url = (options?: RouteQueryOptions) => {
    return apManagement.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::apManagement
 * @see app/Http/Controllers/DashboardController.php:225
 * @route '/dashboard/ap-management'
 */
apManagement.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apManagement.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::apManagement
 * @see app/Http/Controllers/DashboardController.php:225
 * @route '/dashboard/ap-management'
 */
apManagement.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apManagement.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::apManagement
 * @see app/Http/Controllers/DashboardController.php:225
 * @route '/dashboard/ap-management'
 */
    const apManagementForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: apManagement.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::apManagement
 * @see app/Http/Controllers/DashboardController.php:225
 * @route '/dashboard/ap-management'
 */
        apManagementForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: apManagement.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::apManagement
 * @see app/Http/Controllers/DashboardController.php:225
 * @route '/dashboard/ap-management'
 */
        apManagementForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: apManagement.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    apManagement.form = apManagementForm
const DashboardController = { stats, activeUsers, loginHistory, locationStats, index, exportLoginHistory, apManagement }

export default DashboardController