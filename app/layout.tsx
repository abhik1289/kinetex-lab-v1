import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import KinetexFooter from "@/components/common/footer";
// import Header from "./components/common/header";
// import Footer from "./components/common/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "KINETEX LAB | Technology Research Society at KIIT",
    template: "%s | KINETEX LAB",
  },
  icons:{
     icon: "/favicon.ico",
  },
  description:
    "KINETEX LAB at KIIT is a technology research society exploring Quantum Computing, AI, Machine Learning, and Automation through innovation, collaboration, and hands-on projects.",
  keywords: [
    "KINETEX LAB",
    "KIIT",
    "Quantum Computing",
    "Artificial Intelligence",
    "Machine Learning",
    "Technology Research",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <KinetexFooter />
      </body>
    </html>
  );
}
