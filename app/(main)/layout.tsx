// "use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";

// import { usePathname } from "next/navigation";
import MainLayout from "@/lib/layouts/main-layout";
import "@/app/globals.css"


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Next App",
  description: "My Next.js application",
};


export default function RootLayout({ children }: LayoutProps<"/">) {


  // const location = usePathname();



  return (
    <html
      lang="en"
      className={`${montserrat.variable}  h-full antialiased  font-montserrat`}>
      <body className="min-h-full flex flex-col">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
