"use client"

import * as React from "react"
import { User, Save } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfileContent() {
  const [name, setName] = React.useState("John Doe")
  const [email, setEmail] = React.useState("john.doe@example.com")
  const [phone, setPhone] = React.useState("+1 (555) 123-4567")
  const [address, setAddress] = React.useState("123 Smart Home Ln, Tech City, TX 78701")

  const handleSave = () => {
    // Simulate saving profile data
    console.log("Saving profile:", { name, email, phone, address })
    alert("Profile updated successfully!")
  }

  return (
    <div className="grid gap-6">
      <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-4">
        <div className="flex items-center space-x-2">
          <User className="h-8 w-8 text-cyan-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            MY PROFILE
          </span>
        </div>
      </header>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 flex items-center text-base">
            <User className="mr-2 h-5 w-5 text-slate-400" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=100&width=100" alt="User Avatar" />
              <AvatarFallback className="bg-slate-700 text-cyan-500 text-4xl">JD</AvatarFallback>
            </Avatar>
            <Button  className="text-cyan-400 border-cyan-500/50 bg-blue-950">
              Change Avatar
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
              <Label htmlFor="name" className="text-slate-300">
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-800 border-slate-700 text-slate-100"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-700 text-slate-100"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
              <Label htmlFor="phone" className="text-slate-300">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-slate-800 border-slate-700 text-slate-100"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
              <Label htmlFor="address" className="text-slate-300">
                Address
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-slate-800 border-slate-700 text-slate-100"
              />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* You can add more sections here, e.g., Security Preferences, Connected Accounts */}
    </div>
  )
}
