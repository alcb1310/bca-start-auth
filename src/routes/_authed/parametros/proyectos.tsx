import { ProyectSheet } from '@/components/drawers/parametros/edit-projects'
import { NewProyectSheet } from '@/components/drawers/parametros/new-project'
import { DataTable } from '@/components/ui/DataTable'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { H4 } from '@/components/ui/typography'
import {
    getAllProyectos,
    type proyectsResponseType,
} from '@/queries/parametros/proyectos'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { TrashIcon } from 'lucide-react'

export const Route = createFileRoute('/_authed/parametros/proyectos')({
    component: RouteComponent,
    loader: async ({ context }) => {
        context.queryClient.invalidateQueries({
            queryKey: ['proyectos'],
        })
        await context.queryClient.ensureQueryData({
            queryKey: ['proyectos'],
            queryFn: () => getAllProyectos({ data: { token: context.token } }),
        })
    },
})

function RouteComponent() {
    const { token } = Route.useRouteContext()
    const { data: proyectos } = useSuspenseQuery({
        queryKey: ['proyectos'],
        queryFn: () => getAllProyectos({ data: { token } }),
    })

    const column: ColumnDef<proyectsResponseType>[] = [
        { header: 'Nombre', accessorKey: 'name' },
        {
            header: 'Area Bruta',
            size: 400,
            accessorKey: 'gross_area',
            cell: ({ row }) => (
                <span className='block text-right'>
                    {row.original.gross_area.toLocaleString('es-EC', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
            ),
        },
        {
            header: 'Area Neta',
            accessorKey: 'net_area',
            cell: ({ row }) => (
                <span className='block text-right'>
                    {row.original.net_area.toLocaleString('es-EC', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
            ),
        },
        {
            header: 'Activo',
            accessorKey: 'is_active',
            cell: ({ row }) => {
                return (
                    <div className='flex items-center justify-center'>
                        <Switch checked={row.original.is_active} disabled />
                    </div>
                )
            },
        },
        {
            header: 'Acciones',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className='flex items-center gap-2'>
                    <Button
                        variant='ghost'
                        className='text-destructive'
                        size='sm'
                    >
                        <TrashIcon />
                    </Button>
                    <ProyectSheet proyect={row.original} />
                </div>
            ),
        },
    ]

    return (
        <div>
            <H4>Proyectos</H4>
            <NewProyectSheet token={token} />

            <DataTable data={proyectos} columns={column} />
        </div>
    )
}
