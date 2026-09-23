import React from 'react';
import "../globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "next-themes"
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import AdminDashboardLayout from "@/lib/layouts/admin-layout"
// import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
});

export const metadata: Metadata = {
    title: "My Next App",
    description: "My Next.js application",
};
function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body className={`min-h-full flex flex-col ${montserrat.variable} font-montserrat`}>
                <AdminDashboardLayout>

                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <TooltipProvider>{children}</TooltipProvider>
                    </ThemeProvider>
                </AdminDashboardLayout>
            </body>
        </html >
    )
}

export default AdminLayout