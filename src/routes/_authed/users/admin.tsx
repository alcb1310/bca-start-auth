import { Button } from '@/components/ui/button'
import { H4, Parragraph } from '@/components/ui/typography'
import { authClient } from '@/lib/auth-client'
import { createFileRoute, Link } from '@tanstack/react-router'
import { PlusIcon, TrashIcon } from 'lucide-react'

export const Route = createFileRoute('/_authed/users/admin')({
    component: RouteComponent,
    loader: async () => {
        const { data } = await authClient.admin.listUsers({
            query: {
                searchValue: undefined,
                searchField: undefined,
                searchOperator: undefined,
                limit: 100,
                offset: undefined,
                sortBy: undefined,
                sortDirection: undefined,
                filterField: undefined,
                filterValue: undefined,
                filterOperator: undefined,
            },
        })

        return {
            users: data ? data.users : [],
        }
    },
})

function RouteComponent() {
    const { users } = Route.useLoaderData()

    return (
        <div>
            <H4>Administrar Usuarios</H4>

            <Button variant='link'>
                <Link to='/users/register' className='flex items-center gap-2'>
                    <PlusIcon />
                    Crear Usuario
                </Link>
            </Button>

            {users.map((user) => (
                <div key={user.id}>
                    <Parragraph>
                        {user.name} / {user.email} / {user.role} /
                        <Button
                            size='icon-sm'
                            variant='ghost'
                            className='text-destructive'
                        >
                            <TrashIcon />
                        </Button>
                    </Parragraph>
                </div>
            ))}
        </div>
    )
}
