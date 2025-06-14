export interface CategoryType {
  id: string // uuid
  created_at: string // timestamp - now()
  business_id: string // uuid
  name: string // varchar
  description: string | null // text
}

export interface CategoryTypeInsert {
  business_id: string // uuid
  name: string // varchar
  description?: string | null // text
}

export interface CategoryUpdate {
  name?: string // varchar
  description?: string | null // text
}

export interface QueryResponse<T> {
  business_id?: string // optional, for filtering by business
  data: T | null // T is a generic type
  error: string | null
}

export interface QueryListResponse<T> {
  data: T[] | null // T is a generic type
  error: string | null
  count?: number | null // optional, for pagination
}
