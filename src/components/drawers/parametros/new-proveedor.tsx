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
    createProveedor,
    suppliersCreateSchema,
    type suppliersCreateType,
} from '@/queries/parametros/proveedores'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function NewProveedorSheet({ token }: Readonly<{ token: string }>) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState<boolean>(false)
    const form = useAppForm({
        defaultValues: {
            supplier_id: '',
            name: '',
            contact_name: '',
            contact_email: '',
            contact_phone: '',
        } satisfies suppliersCreateType as suppliersCreateType,
        validators: {
            onSubmit: suppliersCreateSchema,
        },
        onSubmit: async ({ value }) => {
            mutation.mutate(value)
        },
    })

    const mutation = useMutation({
        mutationFn: async (data: suppliersCreateType) =>
            await createProveedor({ data: { token, data } }),
        onError: (errors) => {
            console.log(errors)
            toast.error(`Error al crear el proveedor: ${errors.message}`)
        },
        onSuccess: () => {
            toast.success('Proveedor creado con exito')
            setOpen(false)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['proveedores'],
            })
        },
    })

    // biome-ignore lint/correctness/useExhaustiveDependencies: Reseet form on open
    useEffect(() => {
        form.reset()
    }, [open])

    return (
        <Sheet open={open} onOpenChange={setOpen} modal={false}>
            <SheetTrigger asChild>
                <Button variant={'link'}>
                    <PlusIcon />
                    Crear Proveedor
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Crear Proveedor</SheetTitle>
                    <SheetDescription>Crea un nuevo proveedor</SheetDescription>
                </SheetHeader>
                <div className='p-4'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}
                    >
                        <FieldGroup>
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
                </div>
            </SheetContent>
        </Sheet>
    )
}
