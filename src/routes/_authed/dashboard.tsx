import { Button } from '@/components/ui/button'
import { H2, Parragraph } from '@/components/ui/typography'
import { signOut } from '@/lib/auth-client'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    const { user } = Route.useRouteContext()

    return (
        <div>
            <H2>Dashboard</H2>
            <Parragraph> User: {user.name}</Parragraph>
        </div>
    )
}
