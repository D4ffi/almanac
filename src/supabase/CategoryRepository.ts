import { supabaseClient } from './supabase'

// Interfaz para la respuesta simplificada de categorías
export interface SimpleCategoryResponse {
  name: string
  description: string | null
}

// Interfaz para crear múltiples categorías
export interface CreateCategoryBatch {
  business_id: string
  categories: Array<{
    name: string
    description?: string | null
  }>
}

export class CategoryDynamicCreator {
  /**
   * Crea múltiples categorías dinámicamente y devuelve solo nombre y descripción
   * @param business_id - ID del negocio
   * @param categories - Array de categorías a crear
   * @returns JSON con nombre y descripción de las categorías creadas
   */
  static async createCategoriesBatch(
      business_id: string,
      categories: Array<{ name: string; description?: string | null }>
  ): Promise<{
    data: SimpleCategoryResponse[] | null
    error: string | null
    count: number
  }> {
    try {
      // Preparar los datos para inserción
      const categoriesToInsert = categories.map(category => ({
        business_id,
        name: category.name,
        description: category.description || null
      }))

      // Insertar las categorías en Supabase
      const { data, error } = await supabaseClient
          .from('categories')
          .insert(categoriesToInsert)
          .select('name, description')

      if (error) {
        console.error('Error creating categories batch:', error)
        return { data: null, error: error.message, count: 0 }
      }

      // Transformar la respuesta para devolver solo nombre y descripción
      const simplifiedData: SimpleCategoryResponse[] = data?.map(item => ({
        name: item.name,
        description: item.description
      })) || []

      return {
        data: simplifiedData,
        error: null,
        count: simplifiedData.length
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('Unexpected error creating categories batch:', err)
      return { data: null, error: errorMessage, count: 0 }
    }
  }

  /**
   * Obtiene todas las categorías de un negocio devolviendo solo nombre y descripción
   * @param business_id - ID del negocio
   * @returns JSON simplificado con nombre y descripción
   */
  static async getCategoriesSimplified(
      business_id: string
  ): Promise<{
    data: SimpleCategoryResponse[] | null
    error: string | null
    count: number
  }> {
    try {
      const { data, error, count } = await supabaseClient
          .from('categories')
          .select('name, description')
          .eq('business_id', business_id)
          .order('name', { ascending: true })

      if (error) {
        console.error('Error fetching simplified categories:', error)
        return { data: null, error: error.message, count: 0 }
      }

      // Los datos ya vienen en el formato correcto
      const simplifiedData: SimpleCategoryResponse[] = data || []

      return {
        data: simplifiedData,
        error: null,
        count: count || simplifiedData.length
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('Unexpected error fetching simplified categories:', err)
      return { data: null, error: errorMessage, count: 0 }
    }
  }

  /**
   * Crea una sola categoría y devuelve solo nombre y descripción
   * @param business_id - ID del negocio
   * @param name - Nombre de la categoría
   * @param description - Descripción opcional
   * @returns JSON con nombre y descripción de la categoría creada
   */
  static async createSingleCategorySimplified(
      business_id: string,
      name: string,
      description?: string | null
  ): Promise<{
    data: SimpleCategoryResponse | null
    error: string | null
  }> {
    try {
      const { data, error } = await supabaseClient
          .from('categories')
          .insert([{
            business_id,
            name,
            description: description || null
          }])
          .select('name, description')
          .single()

      if (error) {
        console.error('Error creating single category:', error)
        return { data: null, error: error.message }
      }

      const simplifiedData: SimpleCategoryResponse = {
        name: data.name,
        description: data.description
      }

      return { data: simplifiedData, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('Unexpected error creating single category:', err)
      return { data: null, error: errorMessage }
    }
  }

  /**
   * Genera categorías predefinidas comunes para un negocio
   * @param business_id - ID del negocio
   * @param type - Tipo de negocio para generar categorías específicas
   * @returns Categorías creadas con nombre y descripción
   */
  static async generateDefaultCategories(
      business_id: string,
      type: 'restaurant' | 'retail' | 'service' | 'general' = 'general'
  ): Promise<{
    data: SimpleCategoryResponse[] | null
    error: string | null
    count: number
  }> {
    const categoryTemplates = {
      restaurant: [
        { name: 'Bebidas', description: 'Refrescos, jugos, agua y otras bebidas' },
        { name: 'Platos Principales', description: 'Comidas principales del menú' },
        { name: 'Postres', description: 'Dulces y postres' },
        { name: 'Entradas', description: 'Aperitivos y entradas' },
        { name: 'Ensaladas', description: 'Ensaladas frescas y saludables' }
      ],
      retail: [
        { name: 'Ropa', description: 'Prendas de vestir' },
        { name: 'Electrónicos', description: 'Dispositivos y gadgets electrónicos' },
        { name: 'Hogar', description: 'Artículos para el hogar' },
        { name: 'Deportes', description: 'Artículos deportivos y fitness' },
        { name: 'Belleza', description: 'Productos de belleza y cuidado personal' }
      ],
      service: [
        { name: 'Consultoría', description: 'Servicios de consultoría especializada' },
        { name: 'Mantenimiento', description: 'Servicios de mantenimiento y reparación' },
        { name: 'Capacitación', description: 'Cursos y programas de capacitación' },
        { name: 'Soporte', description: 'Servicios de soporte técnico' },
        { name: 'Diseño', description: 'Servicios de diseño y creatividad' }
      ],
      general: [
        { name: 'General', description: 'Categoría general para productos diversos' },
        { name: 'Premium', description: 'Productos o servicios premium' },
        { name: 'Básico', description: 'Productos o servicios básicos' },
        { name: 'Especial', description: 'Productos o servicios especiales' }
      ]
    }

    return await this.createCategoriesBatch(business_id, categoryTemplates[type])
  }
}

// Exportar funciones individuales para mayor flexibilidad
export const {
  createCategoriesBatch,
  getCategoriesSimplified,
  createSingleCategorySimplified,
  generateDefaultCategories
} = CategoryDynamicCreator

// Ejemplo de uso:
/*
// Crear categorías específicas
const newCategories = await createCategoriesBatch('business-uuid', [
  { name: 'Tecnología', description: 'Productos tecnológicos' },
  { name: 'Oficina', description: 'Suministros de oficina' }
])

// Obtener categorías simplificadas
const categories = await getCategoriesSimplified('business-uuid')

// Generar categorías predefinidas para restaurante
const defaultCats = await generateDefaultCategories('business-uuid', 'restaurant')

console.log('Categorías creadas:', newCategories.data)
*/