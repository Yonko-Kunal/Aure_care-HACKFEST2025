"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export function ConditionalSidebar({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
