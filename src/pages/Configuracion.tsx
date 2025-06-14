// src/pages/Configuracion.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Settings, User, Database, Bell, Shield, Palette } from 'lucide-react';

const Configuracion: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Configuración</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Navegación de configuración */}
                <div className="lg:col-span-1">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold mb-4">Configuración</h2>
                        <nav className="space-y-1">
                            {[
                                { icon: User, label: 'Perfil de Usuario', active: true },
                                { icon: Database, label: 'Base de Datos' },
                                { icon: Bell, label: 'Notificaciones' },
                                { icon: Shield, label: 'Seguridad' },
                                { icon: Palette, label: 'Apariencia' },
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-colors ${
                                        item.active
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Panel de configuración */}
                <div className="lg:col-span-2">
                    <div className="rounded-lg border bg-card p-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold">Perfil de Usuario</h3>
                            <p className="text-sm text-muted-foreground">
                                Gestiona tu información personal y preferencias de cuenta.
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nombre</label>
                                    <Input defaultValue="Juan Pérez" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input defaultValue="juan@empresa.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Empresa</label>
                                <Input defaultValue="Mi Empresa S.A." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Descripción</label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Describe un poco sobre ti..."
                                    defaultValue="Administrador del sistema de gestión de inventario."
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="flex justify-end space-x-2">
                            <Button variant="outline">Cancelar</Button>
                            <Button>Guardar Cambios</Button>
                        </div>
                    </div>

                    {/* Configuración adicional */}
                    <div className="mt-6 rounded-lg border bg-card p-6 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Configuración del Sistema</h3>
                            <p className="text-sm text-muted-foreground">
                                Ajustes generales de la aplicación.
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-medium">Notificaciones por Email</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Recibe notificaciones de cambios importantes
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Configurar
                                </Button>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-medium">Respaldo de Datos</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Configurar respaldo automático de la base de datos
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Configurar
                                </Button>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-medium">Tema de la Aplicación</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Cambiar entre tema claro y oscuro
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Cambiar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuracion;