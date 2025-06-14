// src/components/common/Layout.tsx
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSideBar"
import { useAuth } from '@/context/AuthContext'
import { Button } from "@/components/ui/button"
import { LogOut, User } from 'lucide-react'

interface LayoutProps {
    children: React.ReactNode
}

// Mapeo de rutas a títulos
const routeTitles: Record<string, string> = {
    '/home': 'Dashboard Principal',
    '/productos': 'Gestión de Productos',
    '/categorias': 'Gestión de Categorías',
    '/configuracion': 'Configuración del Sistema'
}

// Componente Breadcrumb funcional
const CustomBreadcrumb: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const pathSegments = location.pathname.split('/').filter(Boolean)

    if (pathSegments.length === 0 || location.pathname === '/home') {
        return null
    }

    const handleBreadcrumbClick = (path: string) => {
        navigate(path)
    }

    return (
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
            <button
                onClick={() => handleBreadcrumbClick('/home')}
                className="hover:text-foreground transition-colors cursor-pointer"
            >
                Inicio
            </button>
            {pathSegments.map((segment, index) => {
                const path = `/${pathSegments.slice(0, index + 1).join('/')}`
                const isLast = index === pathSegments.length - 1
                const title = routeTitles[path] || segment.charAt(0).toUpperCase() + segment.slice(1)

                return (
                    <React.Fragment key={path}>
                        <span className="text-muted-foreground/50">/</span>
                        {isLast ? (
                            <span className="text-foreground font-medium">
                {title}
              </span>
                        ) : (
                            <button
                                onClick={() => handleBreadcrumbClick(path)}
                                className="hover:text-foreground transition-colors cursor-pointer"
                            >
                                {title}
                            </button>
                        )}
                    </React.Fragment>
                )
            })}
        </nav>
    )
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, signOut } = useAuth()

    const currentTitle = routeTitles[location.pathname] || 'Mi Aplicación'

    const handleSignOut = async () => {
        const { error } = await signOut()
        if (error) {
            console.error('Error al cerrar sesión:', error)
        } else {
            navigate('/login')
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-1 flex-col">
                {/* Header con trigger del sidebar */}
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">{currentTitle}</h1>
                            <CustomBreadcrumb />
                        </div>

                        {/* Información del usuario en el header */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>{user?.email}</span>
                                <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                                <span>{new Date().toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleSignOut}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Cerrar sesión
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Contenido principal */}
                <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}