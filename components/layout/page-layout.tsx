"use client"

import type React from "react"
import { useTheme } from "next-themes" // Import useTheme

import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { theme, setTheme } = useTheme() // Use useTheme hook

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      {/* No particle effect or loading overlay here, as it's specific to the dashboard */}
      <div className="container mx-auto p-4 relative z-10">
        <Header theme={theme as "dark" | "light"} toggleTheme={toggleTheme} />

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Sidebar />
          </div>

          {/* Main content area for other pages */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
