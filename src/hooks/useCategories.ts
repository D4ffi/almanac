// src/hooks/useCategories.ts
import { useState, useEffect, useCallback } from 'react';
import {
    getCategoriesSimplified,
    createSingleCategorySimplified,
    generateDefaultCategories,
    createCategoriesBatch,
    type SimpleCategoryResponse
} from '@/supabase/CategoryRepository';

interface CategoriaWithCount extends SimpleCategoryResponse {
    productos: number;
}

interface UseCategoriesOptions {
    businessId: string;
    autoLoad?: boolean;
}

interface UseCategoriesReturn {
    categorias: CategoriaWithCount[];
    loading: boolean;
    error: string | null;
    isCreating: boolean;
    loadCategorias: () => Promise<void>;
    createCategory: (name: string, description?: string) => Promise<boolean>;
    createDefaultCategories: (type?: 'restaurant' | 'retail' | 'service' | 'general') => Promise<boolean>;
    createMultipleCategories: (categories: Array<{ name: string; description?: string }>) => Promise<boolean>;
    refreshCategories: () => Promise<void>;
    clearError: () => void;
}

export const useCategories = ({
                                  businessId,
                                  autoLoad = true
                              }: UseCategoriesOptions): UseCategoriesReturn => {
    const [categorias, setCategorias] = useState<CategoriaWithCount[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Función para simular el conteo de productos (reemplazar con datos reales)
    const simulateProductCount = useCallback(() => {
        return Math.floor(Math.random() * 50) + 1;
    }, []);

    // Cargar categorías desde Supabase
    const loadCategorias = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getCategoriesSimplified(businessId);

            if (response.error) {
                setError(response.error);
                setCategorias([]);
                return;
            }

            // Transformar las categorías agregando un conteo simulado de productos
            const categoriasConConteo: CategoriaWithCount[] = (response.data || []).map(categoria => ({
                ...categoria,
                productos: simulateProductCount()
            }));

            setCategorias(categoriasConConteo);
        } catch (err) {
            console.error('Error loading categories:', err);
            setError('Error inesperado al cargar las categorías');
            setCategorias([]);
        } finally {
            setLoading(false);
        }
    }, [businessId, simulateProductCount]);

    // Crear una nueva categoría
    const createCategory = useCallback(async (name: string, description?: string): Promise<boolean> => {
        try {
            setIsCreating(true);
            setError(null);

            const response = await createSingleCategorySimplified(businessId, name, description);

            if (response.error) {
                setError(response.error);
                return false;
            }

            // Recargar las categorías después de crear una nueva
            await loadCategorias();
            return true;
        } catch (err) {
            console.error('Error creating category:', err);
            setError('Error al crear la categoría');
            return false;
        } finally {
            setIsCreating(false);
        }
    }, [businessId, loadCategorias]);

    // Crear categorías predeterminadas
    const createDefaultCategories = useCallback(async (
        type: 'restaurant' | 'retail' | 'service' | 'general' = 'general'
    ): Promise<boolean> => {
        try {
            setIsCreating(true);
            setError(null);

            const response = await generateDefaultCategories(businessId, type);

            if (response.error) {
                setError(response.error);
                return false;
            }

            // Recargar las categorías después de crear las predeterminadas
            await loadCategorias();
            return true;
        } catch (err) {
            console.error('Error creating default categories:', err);
            setError('Error al crear categorías predeterminadas');
            return false;
        } finally {
            setIsCreating(false);
        }
    }, [businessId, loadCategorias]);

    // Crear múltiples categorías
    const createMultipleCategories = useCallback(async (
        categories: Array<{ name: string; description?: string }>
    ): Promise<boolean> => {
        try {
            setIsCreating(true);
            setError(null);

            const response = await createCategoriesBatch(businessId, categories);

            if (response.error) {
                setError(response.error);
                return false;
            }

            // Recargar las categorías después de crear múltiples
            await loadCategorias();
            return true;
        } catch (err) {
            console.error('Error creating multiple categories:', err);
            setError('Error al crear múltiples categorías');
            return false;
        } finally {
            setIsCreating(false);
        }
    }, [businessId, loadCategorias]);

    // Refrescar categorías (alias para loadCategorias para mayor claridad semántica)
    const refreshCategories = useCallback(async () => {
        await loadCategorias();
    }, [loadCategorias]);

    // Limpiar error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Cargar categorías automáticamente al montar el componente
    useEffect(() => {
        if (autoLoad && businessId) {
            loadCategorias();
        }
    }, [autoLoad, businessId, loadCategorias]);

    return {
        categorias,
        loading,
        error,
        isCreating,
        loadCategorias,
        createCategory,
        createDefaultCategories,
        createMultipleCategories,
        refreshCategories,
        clearError
    };
};