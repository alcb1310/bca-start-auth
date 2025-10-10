import { getUser } from '@/lib/auth-server'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
    component: RouteComponent,
    beforeLoad: async () => {
        const user = await getUser()

        if (!user || !user.id) {
            throw redirect({ to: '/login' })
        }

        return { user }
    },
})

function RouteComponent() {
    return <Outlet />
}
