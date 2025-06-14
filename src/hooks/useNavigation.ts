// src/hooks/useNavigation.ts
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export interface NavigationRoute {
    path: string;
    title: string;
    icon?: React.ComponentType;
}

export const routes: NavigationRoute[] = [
    { path: '/home', title: 'Inicio' },
    { path: '/productos', title: 'Productos' },
    { path: '/categorias', title: 'Categorías' },
    { path: '/configuracion', title: 'Configuración' }
];

export const useNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goTo = useCallback((path: string) => {
        navigate(path);
    }, [navigate]);

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const goForward = useCallback(() => {
        navigate(1);
    }, [navigate]);

    const isCurrentRoute = useCallback((path: string) => {
        return location.pathname === path;
    }, [location.pathname]);

    const getCurrentRouteTitle = useCallback(() => {
        const currentRoute = routes.find(route => route.path === location.pathname);
        return currentRoute?.title || 'Página no encontrada';
    }, [location.pathname]);

    return {
        goTo,
        goBack,
        goForward,
        isCurrentRoute,
        getCurrentRouteTitle,
        currentPath: location.pathname,
        location
    };
};

// Hook para obtener información de rutas
export const useRouteInfo = () => {
    const location = useLocation();

    const getRouteInfo = useCallback((path?: string) => {
        const targetPath = path || location.pathname;
        return routes.find(route => route.path === targetPath);
    }, [location.pathname]);

    const getAllRoutes = useCallback(() => {
        return routes;
    }, []);

    return {
        getRouteInfo,
        getAllRoutes,
        currentRoute: getRouteInfo()
    };
};