import { Link, useNavigate } from '@tanstack/react-router'
import { UserIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function UserActions() {
    const navigate = useNavigate()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon-sm'>
                    <UserIcon className='h-[1.2rem] w-[1.2rem]' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Cambiar Contraseña</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => navigate({ to: '/users/admin' })}
                >
                    Administrar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
