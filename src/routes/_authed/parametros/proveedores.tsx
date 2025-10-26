import { EditProveedorSheet } from '@/components/drawers/parametros/edit-proveedor'
import { NewProveedorSheet } from '@/components/drawers/parametros/new-proveedor'
import { DataTable } from '@/components/ui/DataTable'
import { H4 } from '@/components/ui/typography'
import {
    getAllProveeodres,
    type suppliersResponseType,
} from '@/queries/parametros/proveedores'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

export const Route = createFileRoute('/_authed/parametros/proveedores')({
    component: RouteComponent,
    loader: async ({ context }) => {
        context.queryClient.invalidateQueries({
            queryKey: ['proveedores'],
        })
        await context.queryClient.ensureQueryData({
            queryKey: ['proveedores'],
            queryFn: () =>
                getAllProveeodres({ data: { token: context.token } }),
        })
    },
})

function RouteComponent() {
    const { token } = Route.useRouteContext()
    const { data: proveedores } = useSuspenseQuery({
        queryKey: ['proveedores'],
        queryFn: () => getAllProveeodres({ data: { token: token } }),
    })

    const column: ColumnDef<suppliersResponseType>[] = [
        { header: 'RUC', accessorKey: 'supplier_id' },
        { header: 'Nombre', accessorKey: 'name' },
        { header: 'Contacto', accessorKey: 'contact_name' },
        { header: 'Email', accessorKey: 'contact_email' },
        { header: 'Telefono', accessorKey: 'contact_phone' },
        {
            header: 'Acciones',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <EditProveedorSheet token={token} proveedor={row.original} />
            ),
        },
    ]

    return (
        <div>
            <H4>Proveedores</H4>
            <NewProveedorSheet token={token} />

            <DataTable columns={column} data={proveedores} />
        </div>
    )
}
