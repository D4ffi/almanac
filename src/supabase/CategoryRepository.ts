import {
  CategoryType,
  CategoryTypeInsert,
  CategoryUpdate,
  QueryListResponse,
  QueryResponse
} from './types/CategoryTypes'

import { supabaseClient } from './supabase'

export class CategoryRespository {
  static async getAllCategories(businessId: string): Promise<QueryListResponse<CategoryType>> {
    try {
      const { data, error, count } = await supabaseClient
        .from('categories')
        .select('*')
        .eq('business_id', businessId)
        .order('name', { ascending: true })

      if (error) {
        console.error('Error fetching categories:', error)
        return { data: null, error: error.message }
      }

      return { data: data || [], error: null, count }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('Unexpected error fetching categories:', err)
      return { data: null, error: errorMessage }
    }
  }

  static async getCategoryById(id: string): Promise<QueryListResponse<CategoryType>> {
    try {
      const { data, error, count } = await supabaseClient
        .from('categories')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching category by ID:', error)
        return { data: null, error: error.message }
      }

      return { data: data || [], error: null, count }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('Unexpected error fetching category by ID:', err)
      return { data: null, error: errorMessage }
    }
  }
  static async searchCategoriesByName(
    businessId: string,
    searchTerm: string
  ): Promise<QueryListResponse<CategoryType>> {
    try {
      const { data, error, count } = await supabaseClient
        .from('categories')
        .select('*')
        .eq('business_id', businessId)
        .ilike('name', `%${searchTerm}%`)
        .order('name', { ascending: true })

      if (error) {
        console.error('Error searching categories:', error)
        return { data: null, error: error.message }
      }

      return { data: data || [], error: null, count }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('Unexpected error searching categories:', err)
      return { data: null, error: errorMessage }
    }
  }
  static async createCategory(
    categoryData: CategoryTypeInsert
  ): Promise<QueryResponse<CategoryType>> {
    try {
      const { data, error } = await supabaseClient
        .from('categories')
        .insert([categoryData])
        .select()
        .single()

      if (error) {
        console.error('Error creating category:', error)
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('Unexpected error creating category:', err)
      return { data: null, error: errorMessage }
    }
  }
  static async updateCategory(
    id: string,
    updateData: CategoryUpdate
  ): Promise<QueryResponse<CategoryType>> {
    try {
      const { data, error } = await supabaseClient
        .from('categories')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating category:', error)
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('Unexpected error updating category:', err)
      return { data: null, error: errorMessage }
    }
  }
  static async deleteCategory(id: string): Promise<QueryResponse<boolean>> {
    try {
      const { error } = await supabaseClient.from('categories').delete().eq('id', id)

      if (error) {
        console.error('Error deleting category:', error)
        return { data: null, error: error.message }
      }

      return { data: true, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('Unexpected error deleting category:', err)
      return { data: null, error: errorMessage }
    }
  }

  static async getCategoriesCount(businessId: string): Promise<QueryResponse<number>> {
    try {
      const { count, error } = await supabaseClient
        .from('categories')
        .select('*', { count: 'exact', head: true })
        .eq('business_id', businessId)

      if (error) {
        console.error('Error counting categories:', error)
        return { data: null, error: error.message }
      }

      return { data: count || 0, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('Unexpected error counting categories:', err)
      return { data: null, error: errorMessage }
    }
  }
}

// Exportar funciones individuales para mayor flexibilidad
export const {
  getAllCategories,
  getCategoryById,
  searchCategoriesByName,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesCount
} = CategoryRespository
