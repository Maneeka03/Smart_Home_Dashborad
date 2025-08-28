"use client"

import * as React from "react"
import { Settings, Bell, User, Globe } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function SettingsContent() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [securityAlerts, setSecurityAlerts] = React.useState(true)
  const [energyUsageAlerts, setEnergyUsageAlerts] = React.useState(false)
  const [deviceStatusAlerts, setDeviceStatusAlerts] = React.useState(true)
  const [language, setLanguage] = React.useState("en")
  const [timeZone, setTimeZone] = React.useState("utc-5") // Example: EST

  return (
    <div className="grid gap-6">
      <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-4">
        <div className="flex items-center space-x-2">
          <Settings className="h-8 w-8 text-cyan-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            SETTINGS
          </span>
        </div>
      </header>

      {/* General Settings */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 flex items-center text-base">
            <Globe className="mr-2 h-5 w-5 text-slate-400" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <Label htmlFor="language" className="text-slate-300">
              Language
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-700 text-slate-100">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <Label htmlFor="time-zone" className="text-slate-300">
              Time Zone
            </Label>
            <Select value={timeZone} onValueChange={setTimeZone}>
              <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-700 text-slate-100">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                <SelectItem value="utc-5">EST (UTC-5)</SelectItem>
                <SelectItem value="utc-8">PST (UTC-8)</SelectItem>
                <SelectItem value="utc+1">CET (UTC+1)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="theme-toggle" className="text-slate-300">
              Dark Mode
            </Label>
            <Switch
              id="theme-toggle"
              checked={true}
              onCheckedChange={() => alert("Theme toggle not yet implemented in settings!")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 flex items-center text-base">
            <Bell className="mr-2 h-5 w-5 text-slate-400" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-notifications" className="text-slate-300">
              Enable All Notifications
            </Label>
            <Switch
              id="enable-notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          <div className="space-y-3 pl-4 border-l border-slate-700/50">
            <div className="flex items-center justify-between">
              <Label htmlFor="security-alerts" className="text-slate-400">
                Security Alerts
              </Label>
              <Switch
                id="security-alerts"
                checked={securityAlerts && notificationsEnabled}
                onCheckedChange={setSecurityAlerts}
                disabled={!notificationsEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="energy-alerts" className="text-slate-400">
                Energy Usage Alerts
              </Label>
              <Switch
                id="energy-alerts"
                checked={energyUsageAlerts && notificationsEnabled}
                onCheckedChange={setEnergyUsageAlerts}
                disabled={!notificationsEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="device-status-alerts" className="text-slate-400">
                Device Status Changes
              </Label>
              <Switch
                id="device-status-alerts"
                checked={deviceStatusAlerts && notificationsEnabled}
                onCheckedChange={setDeviceStatusAlerts}
                disabled={!notificationsEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 flex items-center text-base">
            <User className="mr-2 h-5 w-5 text-slate-400" />
            Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="current-password" className="text-slate-300">
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter current password"
              className="bg-slate-800 border-slate-700 text-slate-100"
            />
            <Label htmlFor="new-password" className="text-slate-300">
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              className="bg-slate-800 border-slate-700 text-slate-100"
            />
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white mt-2">Change Password</Button>
          </div>
          <div className="pt-4 border-t border-slate-700/50">
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
