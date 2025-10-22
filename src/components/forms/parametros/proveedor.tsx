import { FieldGroup } from '@/components/ui/field'

export function ProveedorForm({ form }: Readonly<{ form: any }>) {
    return (
        <>
            <FieldGroup>
                <form.AppField name='supplier_id'>
                    {(field) => (
                        <field.TextField label='RUC' placeholder='RUC' />
                    )}
                </form.AppField>
                <form.AppField name='name'>
                    {(field) => (
                        <field.TextField label='Nombre' placeholder='Nombre' />
                    )}
                </form.AppField>
                <form.AppField name='contact_name'>
                    {(field) => (
                        <field.TextField
                            label='Contacto'
                            placeholder='Contacto'
                        />
                    )}
                </form.AppField>
                <form.AppField name='contact_email'>
                    {(field) => (
                        <field.TextField
                            label='Email'
                            placeholder='Email'
                            type='email'
                        />
                    )}
                </form.AppField>
                <form.AppField name='contact_phone'>
                    {(field) => (
                        <field.TextField
                            label='Teléfono'
                            placeholder='Teléfono'
                        />
                    )}
                </form.AppField>
            </FieldGroup>
        </>
    )
}
