import React from "react";
import "../globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import AdminDashboardLayout from "@/lib/layouts/admin-layout";
import { AdminSessionGuard } from "@/lib/layouts/admin-session-guard";
import Providers from "@/app/providers";
import { auth } from "@/lib/config/auth";
import { redirect } from "next/navigation";
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
async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");
  if (!session.user.isAdmin) redirect("/");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-full flex flex-col ${montserrat.variable} font-montserrat`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers session={session}>
            <AdminSessionGuard>
              <AdminDashboardLayout>
                <TooltipProvider>{children}</TooltipProvider>
              </AdminDashboardLayout>
            </AdminSessionGuard>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default AdminLayout;
