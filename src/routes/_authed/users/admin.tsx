import { DataTable } from '@/components/ui/DataTable'
import { Button } from '@/components/ui/button'
import { H4, Parragraph } from '@/components/ui/typography'
import { authClient } from '@/lib/auth-client'
import { listUsers } from '@/queries/users'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import type { UserWithRole } from 'better-auth/plugins'
import { PlusIcon, TrashIcon } from 'lucide-react'

export const Route = createFileRoute('/_authed/users/admin')({
    component: RouteComponent,
    errorComponent: ({ error }) => (
        <p>
            {error.name} / {error.message} / {error.stack}
        </p>
    ),
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData({
            queryKey: ['users'],
            queryFn: () => listUsers({ token: context.token }),
        })
    },
})

function RouteComponent() {
    const { user, token, queryClient } = Route.useRouteContext()
    const {
        data: users,
        isError,
        error,
    } = useSuspenseQuery({
        queryKey: ['users'],
        queryFn: () => listUsers({ token: token }),
    })

    if (isError) {
        return <Parragraph>Error: {error.message}</Parragraph>
    }

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
                                authClient.admin.removeUser(
                                    {
                                        userId: row.original.id,
                                    },
                                    {
                                        onResponse: () => {
                                            queryClient.invalidateQueries({
                                                queryKey: ['users'],
                                            })
                                        },
                                    },
                                )
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
