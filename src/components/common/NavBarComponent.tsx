import { Home, Settings, Search, User, Menu, X } from 'lucide-react'
import React, { useState } from 'react'

function NavBar(): React.JSX.Element {
    const [isExpanded, setIsExpanded] = useState(false)

    const navItems = [
        { icon: Home, label: 'Inicio' },
        { icon: Search, label: 'Buscar' },
        { icon: User, label: 'Perfil' },
        { icon: Settings, label: 'Configuración' }
    ]

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <nav className="fixed top-4 right-4 z-50">
            {/* Contenedor principal con animación coordinada */}
            <div
                className="bg-blue-600/90 rounded-2xl px-2 py-2 shadow-lg backdrop-blur-md border border-blue-500/20 transition-all duration-1000 ease-in-out overflow-hidden"
                style={{
                    // Ajusta este ancho para llenar el espacio. Puedes probar con 320px o más.
                    width: isExpanded ? '300px' : '56px' // Aumentado de 280px a 300px
                }}
            >
                <div className="flex items-center h-10 relative">
                    {/* Botón de burger menu */}
                    <div
                        className={`
                            absolute left-0 top-0 flex items-center justify-center w-10 h-10
                            transition-all duration-1000 ease-in-out
                            ${isExpanded
                            ? 'opacity-0 scale-75 pointer-events-none'
                            : 'opacity-100 scale-100'
                        }
                        `}
                    >
                        <button
                            onClick={toggleNavbar}
                            className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:bg-blue-500 hover:scale-105 group w-10 h-10 cursor-pointer"
                            aria-label="Abrir menú"
                        >
                            <Menu className="w-5 h-5 text-white group-hover:text-blue-100 transition-all duration-300" strokeWidth={2} />
                        </button>
                    </div>

                    {/* Contenedor de íconos de navegación */}
                    <div
                        className={`
                            flex items-center space-x-4 h-10 // Aumentado de space-x-2 a space-x-4 para más separación
                            absolute left-0 top-0
                            ${isExpanded
                            ? 'opacity-100 translate-x-0 transition-all duration-1000 ease-in-out delay-[400ms]'
                            : 'opacity-0 -translate-x-full pointer-events-none transition-all duration-300 ease-in-out'
                        }
                        `}
                    >
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                className={`
                                    flex items-center justify-center p-2 rounded-xl group min-w-[40px] h-10
                                    transition-all duration-300 hover:bg-blue-500 hover:scale-105 cursor-pointer
                                `}
                                aria-label={item.label}
                                title={item.label}
                            >
                                <item.icon
                                    className="w-5 h-5 text-white group-hover:text-blue-100 transition-colors duration-300"
                                    strokeWidth={2}
                                />
                            </button>
                        ))}

                        {/* Botón de cerrar (X) */}
                        <button
                            onClick={toggleNavbar}
                            className={`
                                flex items-center justify-center p-2 rounded-xl transition-all duration-500 group min-w-[40px] h-10 hover:bg-blue-500 hover:scale-105 cursor-pointer
                            `}
                            aria-label="Cerrar menú"
                        >
                            <X className="w-5 h-5 text-white group-hover:text-blue-100 transition-all duration-300" strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay para cerrar en mobile */}
            {isExpanded && (
                <div
                    className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 transition-opacity duration-300"
                    onClick={toggleNavbar}
                />
            )}
        </nav>
    )
}

export default NavBar