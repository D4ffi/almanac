// src/supabase/supabase.ts (versión corregida)
import { createClient } from '@supabase/supabase-js'

// Corregir el typo en la variable de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ennupeggpkbbbetfwgol.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVubnVwZWdncGtiYmJldGZ3Z29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NDYzNzUsImV4cCI6MjA1MDQyMjM3NX0.rKTyG4QSK5aLW3kvYOhUx0A0WV9-WkZJHH-3Ej7t-cw'


// Verificar que las variables estén configuradas
if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Variables de entorno de Supabase no configuradas:');
    if (!supabaseUrl) console.warn('  - SUPABASE_URL no está definida');
    if (!supabaseKey) console.warn('  - SUPABASE_KEY no está definida');
    console.warn('Por favor, configura estas variables en tu archivo .env');
}

// Crear el cliente de Supabase con valores por defecto si las variables no están definidas
export const supabaseClient = createClient(
    supabaseUrl ?? 'https://placeholder.supabase.co',
    supabaseKey ?? 'placeholder-key'
)

// Función para verificar la conexión
export const checkSupabaseConnection = async (): Promise<{
    connected: boolean;
    error?: string;
}> => {
    try {
        if (!supabaseUrl || !supabaseKey) {
            return {
                connected: false,
                error: 'Variables de entorno no configuradas'
            };
        }

        // Intentar una operación simple para verificar la conexión
        const { error } = await supabaseClient.from('categories').select('count', { count: 'exact', head: true });

        if (error && error.code !== 'PGRST116') { // PGRST116 = tabla no encontrada, pero conexión OK
            return {
                connected: false,
                error: error.message
            };
        }

        return { connected: true };
    } catch (err) {
        return {
            connected: false,
            error: err instanceof Error ? err.message : 'Error desconocido'
        };
    }
}

// Exportar información de configuración
export const supabaseConfig = {
    url: supabaseUrl,
    hasValidConfig: !!(supabaseUrl && supabaseKey),
    isPlaceholder: supabaseUrl?.includes('placeholder') || supabaseKey?.includes('placeholder')
}