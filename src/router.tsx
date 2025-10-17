import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'

export function getRouter() {
    const queryClient = new QueryClient()

    const router = createRouter({
        routeTree,
        scrollRestoration: true,
        defaultPreload: 'intent',
        context: { queryClient },
        defaultNotFoundComponent: () => <div>Not found</div>,
        defaultErrorComponent: ({ error }) => (
            <div className='text-destructive'>Error {error.message}</div>
        ),
    })

    setupRouterSsrQueryIntegration({
        router,
        queryClient,
    })

    return router
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof getRouter>
    }
}
