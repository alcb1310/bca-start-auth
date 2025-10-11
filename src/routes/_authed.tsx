import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { Button } from '@/components/ui/button'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { signOut } from '@/lib/auth-client'
import { getUser } from '@/lib/auth-server'
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

        if (!user || !user.id) {
            throw redirect({ to: '/login' })
        }

        return { user }
    },
})

function RouteComponent() {
    const navigate = useNavigate()

    function handleLogout() {
        signOut(
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
                    <div>
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
