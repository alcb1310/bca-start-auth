import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { H2 } from '@/components/ui/typography'
import { useAppForm } from '@/hooks/app.form'
import { signUp } from '@/lib/auth-client'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { type ChangeEvent, type FormEvent, useState } from 'react'

export const Route = createFileRoute('/register')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const form = useAppForm({
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
        onSubmit: async ({ value }) => {
            await signUp.email(
                {
                    email: value.email,
                    password: value.password,
                    name: value.name,
                },
                {
                    onSuccess: () => {
                        setEnabled(false)
                        navigate({ to: '/' })
                    },
                    onError: (error) => {
                        setEnabled(false)
                        console.error(error)
                        alert(error.error.message)
                    },
                },
            )
        },
    })

    const [enabled, setEnabled] = useState<boolean>(false)

    return (
        <div>
            <H2>Register</H2>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <form.AppField name='name'>
                    {(field) => (
                        <field.TextField label='Nombre' placeholder='Nombre' />
                    )}
                </form.AppField>
                <form.AppField name='email'>
                    {(field) => (
                        <field.TextField label='Email' placeholder='Email' />
                    )}
                </form.AppField>
                <form.AppField name='password'>
                    {(field) => (
                        <field.PasswordField
                            label='Contraseña'
                            placeholder='su contraseña'
                        />
                    )}
                </form.AppField>

                <form.AppForm>
                    <form.SuscribeButton
                        label='Login'
                        className='uppercase tracking-wide font-bold'
                    />
                </form.AppForm>
            </form>
        </div>
    )
}
