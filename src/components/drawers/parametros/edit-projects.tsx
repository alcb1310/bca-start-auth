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
import type { proyectsResponseType } from '@/queries/parametros/proyectos'
import { PencilIcon } from 'lucide-react'

export function ProyectSheet({
    proyect,
}: Readonly<{ proyect: proyectsResponseType }>) {
    const form = useAppForm({
        defaultValues: {
            name: proyect.name,
            is_active: proyect.is_active,
            gross_area: proyect.gross_area,
            net_area: proyect.net_area,
        },
        onSubmit: async ({ value }) => {
            console.log('data', value)
        },
    })

    return (
        <Sheet>
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
