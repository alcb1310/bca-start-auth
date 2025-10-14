import { DataTable } from '@/components/ui/DataTable'
import { Button } from '@/components/ui/button'
import { H4 } from '@/components/ui/typography'
import { authClient } from '@/lib/auth-client'
import { Link, createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import type { UserWithRole } from 'better-auth/plugins'
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
    const { user } = Route.useRouteContext()
    const { users } = Route.useLoaderData()

    const columns: ColumnDef<UserWithRole>[] = [
        {
            header: 'Nombre',
            accessorKey: 'name',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Rol',
            accessorKey: 'role',
        },
        {
            header: 'Acciones',
            accessorKey: 'actions',
            enableSorting: false,
            enableHiding: false,
            cell: ({ row }) => (
                <div className='flex items-center gap-2'>
                    {user.id !== row.original.id && (
                        <Button
                            variant='ghost'
                            className='text-destructive'
                            size='sm'
                            onClick={() =>
                                authClient.admin.removeUser({
                                    userId: row.original.id,
                                })
                            }
                        >
                            <TrashIcon />
                        </Button>
                    )}
                </div>
            ),
        },
    ]

    return (
        <div>
            <H4>Administrar Usuarios</H4>

            <Button variant='link'>
                <Link to='/users/register' className='flex items-center gap-2'>
                    <PlusIcon />
                    Crear Usuario
                </Link>
            </Button>

            <DataTable columns={columns} data={users} />
        </div>
    )
}
