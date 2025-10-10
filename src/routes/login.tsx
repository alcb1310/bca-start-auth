import { Button } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'
import { useAppForm } from '@/hooks/app.form'
import { signIn } from '@/lib/auth-client'
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
            await signIn.email(
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
        <div>
            <H1>Login</H1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
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
            <Button variant='link' size='sm'>
                <Link to='/register'>Register</Link>
            </Button>
        </div>
    )
}
