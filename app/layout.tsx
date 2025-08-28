import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { DeviceProvider } from "../components/context/device-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Home Dashboard",
  description: "Control your smart home devices",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DeviceProvider>{children}</DeviceProvider>
      </body>
    </html>
  )
}
