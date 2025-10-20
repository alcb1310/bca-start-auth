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
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

export function NewProyectSheet() {
    const [open, setOpen] = useState<boolean>(false)
    const form = useAppForm({
        defaultValues: {
            name: '',
            is_active: false,
            gross_area: 0,
            net_area: 0,
        },
        onSubmit: async ({ value }) => {
            console.log('data', value)
            setOpen(false)
        },
    })

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
                        console.log('submit')
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
