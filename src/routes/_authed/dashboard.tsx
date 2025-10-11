import { Parragraph } from '@/components/ui/typography'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    const { user } = Route.useRouteContext()

    return (
        <div>
            <Parragraph> User: {user.name}</Parragraph>
        </div>
    )
}
