// src/pages/Productos.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

interface Producto {
    id: string;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
}

const Productos: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Datos de ejemplo
    const productos: Producto[] = [
        { id: '1', nombre: 'Laptop Dell XPS 13', categoria: 'Electrónicos', precio: 999.99, stock: 15 },
        { id: '2', nombre: 'Mouse Logitech MX Master', categoria: 'Accesorios', precio: 79.99, stock: 30 },
        { id: '3', nombre: 'Teclado Mecánico RGB', categoria: 'Accesorios', precio: 129.99, stock: 20 },
        { id: '4', nombre: 'Monitor 4K 27"', categoria: 'Pantallas', precio: 349.99, stock: 8 },
    ];

    const filteredProductos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Productos</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Producto
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProductos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell className="font-medium">{producto.nombre}</TableCell>
                                <TableCell>{producto.categoria}</TableCell>
                                <TableCell>${producto.precio.toFixed(2)}</TableCell>
                                <TableCell>{producto.stock}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="ghost" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Productos;