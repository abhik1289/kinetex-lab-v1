import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/common/Navbar";
import KinetexFooter from "@/components/common/footer";



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
  return (
    <html
      lang="en"
      className={`${montserrat.variable}  h-full antialiased  font-montserrat`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <KinetexFooter />
      </body>
    </html>
  );
}
