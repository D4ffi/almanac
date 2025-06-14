import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSideBar.tsx"
import React from "react";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-1 flex-col">
                {/* Header con trigger del sidebar */}
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-semibold">Mi Dashboard</h1>
                    </div>
                </header>

                {/* Contenido principal */}
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}