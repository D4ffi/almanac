// src/components/common/LoginForm.tsx
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from '@/context/AuthContext'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [resetEmailSent, setResetEmailSent] = useState(false)

    const { signIn, resetPassword } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    // Obtener la página desde donde se redirigió o ir a home por defecto
    const from = location.state?.from?.pathname || '/home'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (!email || !password) {
            setError('Por favor, completa todos los campos')
            setIsLoading(false)
            return
        }

        const { error } = await signIn(email, password)

        if (error) {
            console.error('Error de login:', error)

            // Manejar diferentes tipos de errores
            switch (error.message) {
                case 'Invalid login credentials':
                    setError('Credenciales inválidas. Verifica tu email y contraseña.')
                    break
                case 'Email not confirmed':
                    setError('Debes confirmar tu email antes de iniciar sesión.')
                    break
                default:
                    setError(error.message || 'Error al iniciar sesión')
            }
        } else {
            // Login exitoso, redirigir
            navigate(from, { replace: true })
        }

        setIsLoading(false)
    }

    const handleResetPassword = async () => {
        if (!email) {
            setError('Por favor, ingresa tu email para restablecer la contraseña')
            return
        }

        const { error } = await resetPassword(email)

        if (error) {
            setError('Error al enviar email de restablecimiento')
        } else {
            setResetEmailSent(true)
            setError('')
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Bienvenido de vuelta</h1>
                                <p className="text-muted-foreground text-balance">
                                    Inicia sesión en tu cuenta
                                </p>
                            </div>

                            {error && (
                                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                    {error}
                                </div>
                            )}

                            {resetEmailSent && (
                                <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                                    Se ha enviado un email para restablecer tu contraseña
                                </div>
                            )}

                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <button
                                        type="button"
                                        onClick={handleResetPassword}
                                        className="ml-auto text-sm underline-offset-2 hover:underline text-primary"
                                        disabled={isLoading}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    'Iniciar sesión'
                                )}
                            </Button>

                            <div className="text-center text-sm">
                                ¿No tienes una cuenta?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate('/register')}
                                    className="underline underline-offset-4 text-primary hover:text-primary/90"
                                    disabled={isLoading}
                                >
                                    Regístrate
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="bg-muted relative hidden md:block">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4">¡Gestiona tu negocio!</h2>
                                <p className="text-muted-foreground">
                                    Controla tu inventario, productos y categorías de forma sencilla y eficiente.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground text-center text-xs text-balance">
                Al continuar, aceptas nuestros{" "}
                <a href="#" className="underline underline-offset-4 hover:text-primary">
                    Términos de Servicio
                </a>{" "}
                y{" "}
                <a href="#" className="underline underline-offset-4 hover:text-primary">
                    Política de Privacidad
                </a>
                .
            </div>
        </div>
    )
}