import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
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
                        navigate({ to: '/' })
                    },
                    onError: (error) => {
                        console.error(error)
                        alert(error.error.message)
                    },
                },
            )
        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            <Card className='w-3/4 mx-auto'>
                <CardHeader>
                    <CardTitle>Registrarse</CardTitle>
                    <CardDescription>
                        Ingrese la informacion para crear una cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <form.AppField name='name'>
                        {(field) => (
                            <field.TextField
                                label='Nombre'
                                placeholder='Nombre'
                            />
                        )}
                    </form.AppField>
                    <form.AppField name='email'>
                        {(field) => (
                            <field.TextField
                                label='Email'
                                placeholder='Email'
                            />
                        )}
                    </form.AppField>
                    <form.AppField name='password'>
                        {(field) => (
                            <field.PasswordField
                                label='Contraseña'
                                placeholder='Contraseña'
                            />
                        )}
                    </form.AppField>
                </CardContent>
                <CardFooter>
                    <form.AppForm>
                        <form.SuscribeButton
                            label='Crear Cuenta'
                            className='w-full'
                        />
                    </form.AppForm>
                </CardFooter>
            </Card>
        </form>
    )
}
