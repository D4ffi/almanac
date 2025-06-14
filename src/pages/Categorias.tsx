import {useState} from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Tag, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';

// ID del negocio fijo como se solicitó
const BUSINESS_ID = '9cb60178-7b59-41b9-bf5b-c5286e82b688';

const Categorias: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Usar el hook personalizado para manejar las categorías
    const {
        categorias,
        loading,
        error,
        isCreating,
        createCategory,
        createDefaultCategories,
        createMultipleCategories,
        refreshCategories,
        clearError
    } = useCategories({ businessId: BUSINESS_ID });

    // Crear categorías predeterminadas
    const handleCreateDefaultCategories = async () => {
        const success = await createDefaultCategories('general');
        if (success) {
            console.log('Categorías predeterminadas creadas exitosamente');
        }
    };

    // Crear una nueva categoría individual
    const handleCreateCategory = async (name: string, description?: string) => {
        const success = await createCategory(name, description);
        if (success) {
            console.log('Categoría creada exitosamente');
        }
    };

    // Crear múltiples categorías de ejemplo
    const handleCreateExampleCategories = async () => {
        const exampleCategories = [
            { name: 'Electrónicos', description: 'Dispositivos y gadgets tecnológicos' },
            { name: 'Ropa', description: 'Prendas de vestir y accesorios' },
            { name: 'Hogar', description: 'Artículos para el hogar y decoración' }
        ];

        const success = await createMultipleCategories(exampleCategories);
        if (success) {
            console.log('Categorías de ejemplo creadas exitosamente');
        }
    };

    // Filtrar categorías según el término de búsqueda
    const filteredCategorias = categorias.filter(categoria =>
        categoria.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (categoria.description && categoria.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Componente de loading
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Categorías</h1>
                </div>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex items-center space-x-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="text-muted-foreground">Cargando categorías...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Componente de error
    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Categorías</h1>
                    <Button onClick={refreshCategories} variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reintentar
                    </Button>
                </div>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center space-y-4 text-center max-w-md">
                        <AlertCircle className="h-12 w-12 text-destructive" />
                        <h3 className="text-lg font-semibold">Error al cargar categorías</h3>
                        <p className="text-muted-foreground">{error}</p>
                        <Button onClick={refreshCategories}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reintentar
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Estado vacío - sin categorías
    if (categorias.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Categorías</h1>
                    <div className="flex space-x-2">
                        <Button
                            onClick={handleCreateDefaultCategories}
                            disabled={isCreating}
                            variant="outline"
                        >
                            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Crear Predeterminadas
                        </Button>
                        <Button
                            onClick={handleCreateExampleCategories}
                            disabled={isCreating}
                            variant="outline"
                        >
                            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Crear Ejemplos
                        </Button>
                        <Button onClick={() => handleCreateCategory('Nueva Categoría', 'Descripción de ejemplo')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Agregar Categoría
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center space-y-4 text-center max-w-md">
                        <Tag className="h-12 w-12 text-muted-foreground" />
                        <h3 className="text-lg font-semibold">No hay categorías</h3>
                        <p className="text-muted-foreground">
                            Comienza agregando algunas categorías para organizar tus productos.
                        </p>
                        <div className="flex space-x-2">
                            <Button
                                onClick={handleCreateDefaultCategories}
                                disabled={isCreating}
                                variant="outline"
                            >
                                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Crear Predeterminadas
                            </Button>
                            <Button
                                onClick={handleCreateExampleCategories}
                                disabled={isCreating}
                                variant="outline"
                            >
                                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Crear Ejemplos
                            </Button>
                            <Button onClick={() => handleCreateCategory('Mi Primera Categoría', 'Categoría de ejemplo')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Crear Primera Categoría
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Categorías</h1>
                <div className="flex space-x-2">
                    <Button onClick={refreshCategories} variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refrescar
                    </Button>
                    <Button
                        onClick={handleCreateDefaultCategories}
                        disabled={isCreating}
                        variant="outline"
                    >
                        {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Crear Predeterminadas
                    </Button>
                    <Button
                        onClick={handleCreateExampleCategories}
                        disabled={isCreating}
                        variant="outline"
                    >
                        {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Crear Ejemplos
                    </Button>
                    <Button onClick={() => handleCreateCategory('Nueva Categoría', 'Descripción de la nueva categoría')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Categoría
                    </Button>
                </div>
            </div>

            {/* Información de estado */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Total: {categorias.length} categorías</span>
                <span>Business ID: {BUSINESS_ID}</span>
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
                {filteredCategorias.map((categoria, index) => (
                    <div key={`${categoria.name}-${index}`} className="rounded-lg border bg-card p-6 space-y-4 hover:shadow-md transition-shadow">
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
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    title="Eliminar categoría"
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
        </div>
    );
};

export default Categorias;