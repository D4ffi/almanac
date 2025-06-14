// src/pages/Home.tsx
import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard Principal</h1>
            </div>

            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50 p-6">
                    <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
                    <p className="text-muted-foreground">Resumen de ventas y productos</p>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 p-6">
                    <h3 className="text-lg font-semibold mb-2">Productos</h3>
                    <p className="text-muted-foreground">Gestión de inventario</p>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 p-6">
                    <h3 className="text-lg font-semibold mb-2">Categorías</h3>
                    <p className="text-muted-foreground">Organización de productos</p>
                </div>
            </div>

            <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-8">
                <h2 className="text-2xl font-bold mb-4">¡Bienvenido a tu aplicación!</h2>
                <p className="text-muted-foreground">
                    Esta es tu aplicación con el sidebar de shadcn/ui funcionando.
                    Puedes navegar entre las diferentes secciones usando el menú lateral
                    o los accesos directos de teclado.
                </p>
            </div>
        </div>
    );
};

export default Home;