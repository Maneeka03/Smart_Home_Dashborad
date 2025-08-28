"use client"

import * as React from "react"
import { ShieldCheck, ShieldAlert, History } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SecurityDeviceCard } from "./security-device-card"
import { SecurityEventItem } from "./security-event-item"

interface SecurityDevice {
  id: string
  name: string
  type: "camera" | "motion" | "door" | "window"
  location: string
  status: boolean // true for active/open, false for inactive/closed
  armedOnly?: boolean // true if device only active when system is armed
}

interface SecurityEvent {
  type: "motion" | "door" | "window" | "camera" | "system" | "alert"
  description: string
  time: string
  status: "info" | "warning" | "success" | "error"
}

export default function SecurityContent() {
  const [isArmed, setIsArmed] = React.useState(true) // Overall system armed status
  const [securityDevices, setSecurityDevices] = React.useState<SecurityDevice[]>([
    { id: "cam1", name: "Front Door Camera", type: "camera", location: "Entrance", status: true, armedOnly: false },
    { id: "mot1", name: "Living Room Motion", type: "motion", location: "Living Room", status: true, armedOnly: true },
    { id: "door1", name: "Back Door Sensor", type: "door", location: "Kitchen", status: false, armedOnly: true },
    { id: "win1", name: "Bedroom Window", type: "window", location: "Bedroom", status: false, armedOnly: true },
    { id: "cam2", name: "Backyard Camera", type: "camera", location: "Exterior", status: true, armedOnly: false },
  ])
  const [securityEvents, setSecurityEvents] = React.useState<SecurityEvent[]>([
    { type: "system", description: "System Armed", time: "Just now", status: "success" },
    { type: "motion", description: "Motion detected in Living Room", time: "2 min ago", status: "warning" },
    { type: "camera", description: "Front Door Camera online", time: "10 min ago", status: "info" },
    { type: "door", description: "Back Door opened", time: "30 min ago", status: "error" },
    { type: "system", description: "System Disarmed", time: "1 hour ago", status: "info" },
  ])

  const toggleSystemArm = () => {
    setIsArmed((prev) => {
      const newStatus = !prev
      setSecurityEvents((prevEvents) => [
        {
          type: "system",
          description: `System ${newStatus ? "Armed" : "Disarmed"}`,
          time: "Just now",
          status: newStatus ? "success" : "info",
        },
        ...prevEvents,
      ])
      return newStatus
    })
  }

  const toggleDeviceStatus = (id: string) => {
    setSecurityDevices((prevDevices) =>
      prevDevices.map((device) => (device.id === id ? { ...device, status: !device.status } : device)),
    )
  }

  return (
    <div className="grid gap-6">
      <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-8 w-8 text-cyan-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            SECURITY
          </span>
        </div>
        <Button
          onClick={toggleSystemArm}
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
            isArmed ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {isArmed ? "Disarm System" : "Arm System"}
        </Button>
      </header>

      {/* Overall Security Status */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 flex items-center text-base">
            {isArmed ? (
              <ShieldCheck className="mr-2 h-5 w-5 text-green-500" />
            ) : (
              <ShieldAlert className="mr-2 h-5 w-5 text-amber-500" />
            )}
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">Current State:</div>
            <Badge
              className={`${
                isArmed
                  ? "bg-green-500/20 text-green-400 border-green-500/50"
                  : "bg-amber-500/20 text-amber-400 border-amber-500/50"
              }`}
            >
              {isArmed ? "Armed" : "Disarmed"}
            </Badge>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm text-slate-400">Last Activity:</div>
            <div className="text-sm text-slate-300">{securityEvents[0]?.description || "No recent activity"}</div>
          </div>
        </CardContent>
      </Card>

      {/* Security Devices */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 text-base">Security Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {securityDevices.map((device) => (
              <SecurityDeviceCard
                key={device.id}
                device={device}
                onToggle={toggleDeviceStatus}
                isSystemArmed={isArmed}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 flex items-center text-base">
            <History className="mr-2 h-5 w-5 text-slate-400" />
            Recent Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.map((event, index) => (
              <SecurityEventItem
                key={index}
                type={event.type}
                description={event.description}
                time={event.time}
                status={event.status}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
