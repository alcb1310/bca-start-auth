import { Button } from '@/components/ui/button'
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
    proyectResponseSchema,
    type proyectsResponseType,
    updateProyect,
} from '@/queries/parametros/proyectos'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PencilIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function ProyectSheet({
    proyect,
    token,
}: Readonly<{ proyect: proyectsResponseType; token: string }>) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState<boolean>(false)
    const form = useAppForm({
        defaultValues: {
            id: proyect.id,
            name: proyect.name,
            is_active: proyect.is_active,
            gross_area: proyect.gross_area,
            net_area: proyect.net_area,
        } satisfies proyectsResponseType as proyectsResponseType,
        validators: {
            // @ts-ignore
            onSubmit: proyectResponseSchema,
        },
        onSubmit: async ({ value }) => {
            const proyecto = proyectResponseSchema.parse(value)
            mutation.mutate(proyecto)
        },
    })

    const mutation = useMutation({
        mutationFn: async (data: proyectsResponseType) =>
            await updateProyect({ data: { token, data } }),
        onSuccess: () => {
            toast.success('Proyecto actualizado con exito')
            setOpen(false)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['proyectos'],
            })
        },
        onError: (error) => {
            toast.error('Error al actualizar el proyecto', {
                description: error.message,
                position: 'top-center',
            })
        },
    })

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        form.reset()
    }, [open])

    return (
        <Sheet modal={false} open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant='ghost' className='text-warning' size='sm'>
                    <PencilIcon />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Editar proyecto</SheetTitle>
                    <SheetDescription>
                        Actualiza la infomración del proyecto
                    </SheetDescription>
                </SheetHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <div className='px-4'>
                        <form.AppField name='name'>
                            {(field) => (
                                <field.TextField
                                    label='Nombre *'
                                    placeholder='Nombre del proyecto'
                                />
                            )}
                        </form.AppField>
                        <form.AppField name='gross_area'>
                            {(field) => (
                                <field.TextField
                                    label='Area Bruta'
                                    placeholder='Area Bruta'
                                />
                            )}
                        </form.AppField>
                        <form.AppField name='net_area'>
                            {(field) => (
                                <field.TextField
                                    label='Area Neta'
                                    placeholder='Area Neta'
                                />
                            )}
                        </form.AppField>
                        <form.AppField name='is_active'>
                            {(field) => <field.SwitchField label='Activo' />}
                        </form.AppField>
                    </div>
                    <SheetFooter>
                        <form.AppForm>
                            <form.SuscribeButton
                                label='Guardar with suscribe'
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
