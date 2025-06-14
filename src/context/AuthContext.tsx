// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabaseClient } from '@/supabase/supabase'

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
    signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>
    signOut: () => Promise<{ error: AuthError | null }>
    resetPassword: (email: string) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Obtener sesión inicial
        const getInitialSession = async () => {
            const { data: { session } } = await supabaseClient.auth.getSession()
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        }

        getInitialSession()

        // Escuchar cambios de autenticación
        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth event:', event)
                setSession(session)
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
        try {
            setLoading(true)
            const { error } = await supabaseClient.auth.signInWithPassword({
                email,
                password,
            })
            return { error }
        } catch (error) {
            console.error('Error en signIn:', error)
            return { error: error as AuthError }
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (email: string, password: string) => {
        try {
            setLoading(true)
            const { error } = await supabaseClient.auth.signUp({
                email,
                password,
            })
            return { error }
        } catch (error) {
            console.error('Error en signUp:', error)
            return { error: error as AuthError }
        } finally {
            setLoading(false)
        }
    }

    const signOut = async () => {
        try {
            setLoading(true)
            const { error } = await supabaseClient.auth.signOut()
            return { error }
        } catch (error) {
            console.error('Error en signOut:', error)
            return { error: error as AuthError }
        } finally {
            setLoading(false)
        }
    }

    const resetPassword = async (email: string) => {
        try {
            const { error } = await supabaseClient.auth.resetPasswordForEmail(email)
            return { error }
        } catch (error) {
            console.error('Error en resetPassword:', error)
            return { error: error as AuthError }
        }
    }

    const value = {
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}