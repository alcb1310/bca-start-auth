import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useAppForm } from '@/hooks/app.form'
import { authClient } from '@/lib/auth-client'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/users/register')({
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
            await authClient.signUp.email(
                {
                    email: value.email,
                    password: value.password,
                    name: value.name,
                },
                {
                    onSuccess: () => {
                        navigate({ to: '/users/admin' })
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
                            <field.TextField
                                type='password'
                                label='Contraseña'
                                placeholder='Contraseña'
                                description='Mínimo 8 caracteres'
                            />
                        )}
                    </form.AppField>
                </CardContent>
                <CardFooter className='flex flex-col gap-4'>
                    <form.AppForm>
                        <form.SuscribeButton
                            label='Crear Cuenta'
                            className='w-full'
                        />
                    </form.AppForm>

                    <Button
                        type='button'
                        variant={'secondary'}
                        onClick={() => navigate({ to: '/users/admin' })}
                        className='w-full'
                    >
                        Regresar
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
