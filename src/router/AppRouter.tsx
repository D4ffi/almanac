// src/router/AppRouter.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/common/Layout';

// Importar las páginas
import Home from '@/pages/Home';
import Productos from '@/pages/Productos';
import Categorias from '@/pages/Categorias';
import Configuracion from '@/pages/Configuracion';

// Página 404
const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            <h2 className="text-2xl font-semibold">Página no encontrada</h2>
            <p className="text-muted-foreground text-center max-w-md">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
            <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
                Volver atrás
            </button>
        </div>
    );
};

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Ruta principal - redirige a home */}
                    <Route path="/" element={<Navigate to="/home" replace />} />

                    {/* Rutas principales */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/configuracion" element={<Configuracion />} />

                    {/* Ruta 404 - debe ir al final */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default AppRouter;