import { ProveedorForm } from '@/components/forms/parametros/proveedor'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useAppForm } from '@/hooks/app.form'
import {
    suppliersResponseSchema,
    type suppliersResponseType,
    updateProveedor,
} from '@/queries/parametros/proveedores'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PencilIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function EditProveedorSheet({
    token,
    proveedor,
}: Readonly<{ token: string; proveedor: suppliersResponseType }>) {
    const [open, setOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const form = useAppForm({
        defaultValues: {
            id: proveedor.id,
            supplier_id: proveedor.supplier_id,
            name: proveedor.name,
            contact_name: proveedor.contact_name ? proveedor.contact_name : '',
            contact_email: proveedor.contact_email
                ? proveedor.contact_email
                : '',
            contact_phone: proveedor.contact_phone
                ? proveedor.contact_phone
                : '',
        },
        validators: {
            // @ts-ignore
            onSubmit: suppliersResponseSchema,
        },
        onSubmit: async ({ value }) => {
            mutation.mutate(value)
        },
    })

    const mutation = useMutation({
        mutationFn: async (data: suppliersResponseType) =>
            await updateProveedor({ data: { token, data } }),
        onSuccess: () => {
            toast.success('Proveedor actualizado con exito')
            setOpen(false)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['proveedores'],
            })
        },
        onError: (error) => {
            console.error(error)
            toast.error(`Error al actualizar el proveedor: ${error.message}`)
        },
    })

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        form.reset()
    }, [open])

    return (
        <Sheet open={open} onOpenChange={setOpen} modal={false}>
            <SheetTrigger asChild>
                <Button variant='ghost'>
                    <PencilIcon className='text-warning' />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Editar Proveedor</SheetTitle>
                    <SheetDescription>
                        Edita la informacion del proveedor
                    </SheetDescription>
                </SheetHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup className='px-4'>
                        <ProveedorForm form={form} />
                    </FieldGroup>
                    <SheetFooter>
                        <form.AppForm>
                            <form.SuscribeButton
                                label='Guardar'
                                className='w-full'
                            />
                        </form.AppForm>
                        <SheetClose asChild>
                            <Button variant='outline'>Cancelar</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
