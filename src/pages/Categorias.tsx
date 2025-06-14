// src/pages/Categorias.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Tag } from 'lucide-react';

interface Categoria {
    id: string;
    nombre: string;
    descripcion: string;
    productos: number;
}

const Categorias: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Datos de ejemplo
    const categorias: Categoria[] = [
        { id: '1', nombre: 'Electrónicos', descripcion: 'Dispositivos electrónicos y gadgets', productos: 25 },
        { id: '2', nombre: 'Accesorios', descripcion: 'Accesorios para computadoras y móviles', productos: 15 },
        { id: '3', nombre: 'Pantallas', descripcion: 'Monitores y pantallas de diferentes tamaños', productos: 8 },
        { id: '4', nombre: 'Audio', descripcion: 'Auriculares, altavoces y equipos de audio', productos: 12 },
    ];

    const filteredCategorias = categorias.filter(categoria =>
        categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoria.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Categorías</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Categoría
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar categorías..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategorias.map((categoria) => (
                    <div key={categoria.id} className="rounded-lg border bg-card p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Tag className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold">{categoria.nombre}</h3>
                            </div>
                            <div className="flex space-x-1">
                                <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground">{categoria.descripcion}</p>

                        <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-medium">
                {categoria.productos} productos
              </span>
                            <Button variant="outline" size="sm">
                                Ver productos
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categorias;