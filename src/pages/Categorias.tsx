import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Tag } from 'lucide-react';

// Interfaz para las categorías
interface Categoria {
    id: string;
    name: string;
    description: string | null;
    productos: number;
}

// Datos de muestra
const categoriasEjemplo: Categoria[] = [
    {
        id: '1',
        name: 'Electrónicos',
        description: 'Dispositivos y gadgets tecnológicos',
        productos: 25
    },
    {
        id: '2',
        name: 'Ropa',
        description: 'Prendas de vestir y accesorios',
        productos: 18
    },
    {
        id: '3',
        name: 'Hogar',
        description: 'Artículos para el hogar y decoración',
        productos: 32
    },
    {
        id: '4',
        name: 'Deportes',
        description: 'Artículos deportivos y fitness',
        productos: 15
    },
    {
        id: '5',
        name: 'Libros',
        description: 'Literatura, educación y entretenimiento',
        productos: 40
    },
    {
        id: '6',
        name: 'Belleza',
        description: 'Productos de belleza y cuidado personal',
        productos: 22
    }
];

const Categorias: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categorias, setCategorias] = useState<Categoria[]>(categoriasEjemplo);

    // Simular creación de nueva categoría
    const handleCreateCategory = () => {
        const newCategory: Categoria = {
            id: Date.now().toString(),
            name: 'Nueva Categoría',
            description: 'Descripción de la nueva categoría',
            productos: Math.floor(Math.random() * 30) + 1
        };
        setCategorias([...categorias, newCategory]);
        console.log('Categoría creada:', newCategory.name);
    };

    // Simular eliminación de categoría
    const handleDeleteCategory = (id: string) => {
        setCategorias(categorias.filter(cat => cat.id !== id));
        console.log('Categoría eliminada');
    };

    // Simular edición de categoría
    const handleEditCategory = (id: string) => {
        console.log('Editando categoría con ID:', id);
        // Aquí podrías abrir un modal de edición
    };

    // Filtrar categorías según el término de búsqueda
    const filteredCategorias = categorias.filter(categoria =>
        categoria.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (categoria.description && categoria.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Categorías</h1>
                <Button onClick={handleCreateCategory}>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Categoría
                </Button>
            </div>

            {/* Información de estado */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Total: {categorias.length} categorías</span>
                <span>Datos de muestra</span>
            </div>

            {/* Barra de búsqueda */}
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
                {searchTerm && (
                    <span className="text-sm text-muted-foreground">
                        {filteredCategorias.length} de {categorias.length} categorías
                    </span>
                )}
            </div>

            {/* Grid de categorías */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategorias.map((categoria) => (
                    <div
                        key={categoria.id}
                        className="rounded-lg border bg-card p-6 space-y-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Tag className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold">{categoria.name}</h3>
                            </div>
                            <div className="flex space-x-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    title="Editar categoría"
                                    onClick={() => handleEditCategory(categoria.id)}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    title="Eliminar categoría"
                                    onClick={() => handleDeleteCategory(categoria.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            {categoria.description || 'Sin descripción'}
                        </p>

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

            {/* Estado de búsqueda sin resultados */}
            {searchTerm && filteredCategorias.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[200px] space-y-2">
                    <Search className="h-8 w-8 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">No se encontraron categorías</h3>
                    <p className="text-muted-foreground text-center">
                        No hay categorías que coincidan con "{searchTerm}".
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => setSearchTerm('')}
                        size="sm"
                    >
                        Limpiar búsqueda
                    </Button>
                </div>
            )}

            {/* Estado vacío (si no hay categorías) */}
            {categorias.length === 0 && !searchTerm && (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center space-y-4 text-center max-w-md">
                        <Tag className="h-12 w-12 text-muted-foreground" />
                        <h3 className="text-lg font-semibold">No hay categorías</h3>
                        <p className="text-muted-foreground">
                            Comienza agregando algunas categorías para organizar tus productos.
                        </p>
                        <Button onClick={handleCreateCategory}>
                            <Plus className="mr-2 h-4 w-4" />
                            Crear Primera Categoría
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categorias;