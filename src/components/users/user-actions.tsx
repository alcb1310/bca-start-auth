import { UserIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function UserActions() {
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
                <DropdownMenuItem>Administrar</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
