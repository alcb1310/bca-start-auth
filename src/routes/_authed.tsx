import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { Button } from '@/components/ui/button'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { H4 } from '@/components/ui/typography'
import { UserActions } from '@/components/users/user-actions'
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import { getUser } from '@/lib/auth-server'
import { headers } from '@/lib/headers'
import {
    Outlet,
    createFileRoute,
    redirect,
    useNavigate,
} from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'

export const Route = createFileRoute('/_authed')({
    component: RouteComponent,
    beforeLoad: async () => {
        const user = await getUser()

        const h = await headers()
        const { token } = await auth.api.getToken({
            headers: h,
        })

        if (!user || !user.id) {
            throw redirect({ to: '/login' })
        }

        return { user, token }
    },
})

function RouteComponent() {
    const navigate = useNavigate()

    function handleLogout() {
        authClient.signOut(
            {},
            {
                onSuccess: () => {
                    navigate({ to: '/' })
                },
            },
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar variant='inset' collapsible='icon' />
            <SidebarInset>
                <nav className='flex items-center justify-between p-4'>
                    <SidebarTrigger />
                    <H4>Sistema Control Presupuestario</H4>
                    <div>
                        <UserActions />
                        <ModeToggle />
                        <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={handleLogout}
                        >
                            <LogOutIcon />
                        </Button>
                    </div>
                </nav>
                <main className='px-4'>
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
