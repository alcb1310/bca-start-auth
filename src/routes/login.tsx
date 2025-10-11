import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useAppForm } from '@/hooks/app.form'
import { authClient } from '@/lib/auth-client'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()

    const form = useAppForm({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            await authClient.signIn.email(
                {
                    email: value.email,
                    password: value.password,
                },
                {
                    onSuccess: () => {
                        navigate({ to: '/dashboard' })
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
            <Card className='w-full max-w-xl mx-auto'>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Ingrese sus credenciales para ingresar al sistema
                    </CardDescription>
                    <CardAction>
                        <Button variant='link'>
                            <Link to='/register' className='text-xs'>
                                Registrarse
                            </Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className='space-y-4'>
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
                                label='Contraseña'
                                placeholder='Contraseña'
                                type='password'
                            />
                        )}
                    </form.AppField>
                </CardContent>
                <CardFooter>
                    <form.AppForm>
                        <form.SuscribeButton label='Login' className='w-full' />
                    </form.AppForm>
                </CardFooter>
            </Card>
        </form>
    )
}
