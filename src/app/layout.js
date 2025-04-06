import React from "react"
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner"

import { Inter } from "next/font/google"


const inter = Inter({ subsets: ["latin"] })


export const metadata = {
  title: "RealEstate Market",
  description: "Find your dream property",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <div className="flex min-h-screen flex-col">
            <AuthProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Toaster richColors/>
              <Footer />
            </AuthProvider>
          </div>
      </body>
    </html>
  );
}
