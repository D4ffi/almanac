// src/supabase/supabase.ts (versión corregida)
import { createClient } from '@supabase/supabase-js'

// Corregir el typo en la variable de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ennupeggpkbbbetfwgol.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVubnVwZWdncGtiYmJldGZ3Z29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NDYzNzUsImV4cCI6MjA1MDQyMjM3NX0.rKTyG4QSK5aLW3kvYOhUx0A0WV9-WkZJHH-3Ej7t-cw'

export const supabaseClient = createClient(supabaseUrl, supabaseKey)