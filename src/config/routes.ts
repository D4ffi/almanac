// src/config/routes.ts
import { Home, BoxesIcon, TagIcon, Settings } from 'lucide-react';
import React from "react";

export interface RouteConfig {
    path: string;
    title: string;
    description?: string;
    icon: React.ComponentType<any>;
    showInSidebar: boolean;
    requiresAuth?: boolean;
}

export const routesConfig: RouteConfig[] = [
    {
        path: '/home',
        title: 'Inicio',
        description: 'Dashboard principal con estadísticas y resumen',
        icon: Home,
        showInSidebar: true,
        requiresAuth: false
    },
    {
        path: '/productos',
        title: 'Productos',
        description: 'Gestión completa del inventario de productos',
        icon: BoxesIcon,
        showInSidebar: true,
        requiresAuth: true
    },
    {
        path: '/categorias',
        title: 'Categorías',
        description: 'Organización y gestión de categorías de productos',
        icon: TagIcon,
        showInSidebar: true,
        requiresAuth: true
    },
    {
        path: '/configuracion',
        title: 'Configuración',
        description: 'Configuración del sistema y preferencias de usuario',
        icon: Settings,
        showInSidebar: true,
        requiresAuth: true
    }
];

// Utilidades para trabajar con rutas
export const getRouteByPath = (path: string): RouteConfig | undefined => {
    return routesConfig.find(route => route.path === path);
};

export const getSidebarRoutes = (): RouteConfig[] => {
    return routesConfig.filter(route => route.showInSidebar);
};

export const getProtectedRoutes = (): RouteConfig[] => {
    return routesConfig.filter(route => route.requiresAuth);
};

// Breadcrumb helpers
export const getBreadcrumbSegments = (pathname: string) => {
    pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Agregar inicio
    breadcrumbs.push({
        path: '/home',
        title: 'Inicio',
        isLast: pathname === '/home'
    });

    // Agregar segmentos de la ruta actual
    if (pathname !== '/home') {
        const currentRoute = getRouteByPath(pathname);
        if (currentRoute) {
            breadcrumbs.push({
                path: currentRoute.path,
                title: currentRoute.title,
                isLast: true
            });
        }
    }

    return breadcrumbs;
};