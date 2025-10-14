import { Parragraph } from '@/components/ui/typography'
import { getHealth } from '@/queries/health'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
    loader: async ({ context }) => {
        const health = await context.queryClient.ensureQueryData({
            queryKey: ['health'],
            queryFn: () => getHealth({ data: { token: context.token } }),
        })
        return { health }
    },
})

function RouteComponent() {
    const { user } = Route.useRouteContext()
    const { health } = Route.useLoaderData()

    return (
        <div>
            <Parragraph> User: {user.name}</Parragraph>

            <Parragraph>Server Health {health.message}</Parragraph>
        </div>
    )
}
