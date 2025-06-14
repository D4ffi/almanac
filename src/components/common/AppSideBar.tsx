// src/components/common/AppSideBar.tsx
import { useNavigate, useLocation } from 'react-router-dom'
import {
    Home,
    Search,
    Settings,
    User2,
    ChevronUp,
    BoxesIcon,
    TagIcon,
    LogOut
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/context/AuthContext'

// Items del menú principal
const items = [
    {
        title: "Inicio",
        url: "/home",
        icon: Home,
    },
    {
        title: "Buscar",
        url: "#",
        icon: Search,
    },
    {
        title: "Productos",
        url: "/productos",
        icon: BoxesIcon,
    },
    {
        title: "Categorías",
        url: "/categorias",
        icon: TagIcon,
    },
    {
        title: "Configuración",
        url: "/configuracion",
        icon: Settings,
    },
]

export function AppSidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, signOut } = useAuth()

    const handleNavigation = (url: string) => {
        if (url !== '#') {
            navigate(url)
        }
    }

    const handleSignOut = async () => {
        const { error } = await signOut()
        if (error) {
            console.error('Error al cerrar sesión:', error)
        } else {
            navigate('/login')
        }
    }

    return (
        <Sidebar>
            {/* Header del sidebar */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <button onClick={() => navigate('/home')}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Home className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Tlakatl
                  </span>
                                    <span className="truncate text-xs">
                    Dashboard
                  </span>
                                </div>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Contenido principal del sidebar */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = location.pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <button
                                                onClick={() => handleNavigation(item.url)}
                                                className="w-full"
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer del sidebar con dropdown funcional */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <User2 className="size-4" />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.user_metadata?.full_name || 'Usuario'}
                    </span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                    <ChevronUp className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-popper-anchor-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem onClick={() => navigate('/configuracion')}>
                                    <User2 className="mr-2 size-4" />
                                    <span>Mi cuenta</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/configuracion')}>
                                    <Settings className="mr-2 size-4" />
                                    <span>Configuración</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleSignOut}
                                    className="text-red-600 focus:text-red-600"
                                >
                                    <LogOut className="mr-2 size-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}