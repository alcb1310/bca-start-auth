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
    createProyect,
    type proyectCreateType,
} from '@/queries/parametros/proyectos'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function NewProyectSheet({ token }: Readonly<{ token: string }>) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState<boolean>(false)
    const form = useAppForm({
        defaultValues: {
            name: '',
            is_active: false,
            gross_area: 0,
            net_area: 0,
        },
        onSubmit: async ({ value }) => {
            const project: proyectCreateType = {
                name: value.name,
                is_active: value.is_active,
                gross_area:
                    typeof value.gross_area === 'string'
                        ? Number.parseFloat(value.gross_area)
                        : value.gross_area,
                net_area:
                    typeof value.net_area === 'string'
                        ? Number.parseFloat(value.net_area)
                        : value.net_area,
            }
            mutation.mutate(project)
        },
    })

    const mutation = useMutation({
        mutationFn: async (data: proyectCreateType) =>
            await createProyect({ data: { token, data } }),
        onSuccess: () => {
            toast.success('Proyecto creado con exito')
            setOpen(false)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['proyectos'],
            })
        },
        onError: (error) => {
            toast.error('Error al crear el proyecto', {
                description: error.message,
                position: 'top-center',
            })
        },
    })

    // biome-ignore lint/correctness/useExhaustiveDependencies: Reset form on open
    useEffect(() => {
        form.reset()
    }, [open])

    return (
        <Sheet modal={false} open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant={'link'}>
                    <PlusIcon />
                    Crear Proyecto
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Crear proyecto</SheetTitle>
                    <SheetDescription>Crea un nuevo proyecto</SheetDescription>
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
                                    required
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
