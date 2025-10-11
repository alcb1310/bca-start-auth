import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import {
    BanknoteArrowDownIcon,
    BrickWallIcon,
    CableIcon,
    ChartBarStackedIcon,
    ChartCandlestickIcon,
    ChartSplineIcon,
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
            <SidebarContent>
                {menuObjects.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}
