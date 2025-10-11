import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarSeparator,
} from '@/components/ui/sidebar'
import {
    BanknoteArrowDownIcon,
    BrickWallIcon,
    CableIcon,
    ChartBarStackedIcon,
    ChartCandlestickIcon,
    ChartSplineIcon,
    ChevronDown,
    ClipboardClockIcon,
    CreditCardIcon,
    FolderKanbanIcon,
    FolderOpenIcon,
    LayoutListIcon,
    type LucideProps,
    ScaleIcon,
    ShellIcon,
    ShoppingBasketIcon,
    ShoppingCartIcon,
} from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible'

type MenuItem = {
    title: string
    url: string
    icon?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
}
type MenuGroup = {
    title: string
    items: MenuItem[]
}

const menuObjects: MenuGroup[] = [
    {
        title: 'Transacciones',
        items: [
            { title: 'Presupuesto', url: '#', icon: ShoppingCartIcon },
            { title: 'Facturas', url: '#', icon: CreditCardIcon },
            {
                title: 'Cierre mensual',
                url: '#',
                icon: ChartCandlestickIcon,
            },
        ],
    },
    {
        title: 'Reportes',
        items: [
            { title: 'Actual', url: '#', icon: FolderOpenIcon },
            { title: 'Cuadre', url: '#', icon: ScaleIcon },
            {
                title: 'Gastado por partida',
                url: '#',
                icon: BanknoteArrowDownIcon,
            },
            { title: 'Historico', url: '#', icon: ClipboardClockIcon },
        ],
    },
    {
        title: 'Parametros',
        items: [
            { title: 'Partidas', url: '#', icon: LayoutListIcon },
            { title: 'Categorias', url: '#', icon: ChartBarStackedIcon },
            { title: 'Materiales', url: '#', icon: BrickWallIcon },
            { title: 'Proyectos', url: '#', icon: FolderKanbanIcon },
            { title: 'Proveedores', url: '#', icon: CableIcon },
            { title: 'Rubros', url: '#', icon: ShoppingBasketIcon },
        ],
    },
    {
        title: 'Analisis',
        items: [
            { title: 'Cantidades', url: '#', icon: ShellIcon },
            { title: 'Analisis', url: '#', icon: ChartSplineIcon },
        ],
    },
]

export function AppSidebar({
    variant = 'sidebar',
    collapsible = 'offcanvas',
}: {
    variant?: 'sidebar' | 'floating' | 'inset'
    collapsible?: 'offcanvas' | 'icon' | 'none'
}) {
    return (
        <Sidebar variant={variant} collapsible={collapsible}>
            <SidebarHeader>BCA</SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                {menuObjects.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <Collapsible
                                    defaultOpen
                                    className='group/collapsible'
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                {group.title}
                                                <ChevronDown className='ml-auto' />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            {group.items.map((item) => (
                                                <SidebarMenuSub
                                                    key={item.title}
                                                >
                                                    <SidebarMenuSubItem className='flex gap-4 my-1'>
                                                        {item.icon && (
                                                            <item.icon
                                                                size={16}
                                                            />
                                                        )}
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            ))}
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}
