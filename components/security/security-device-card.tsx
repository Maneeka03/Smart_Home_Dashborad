"use client"

import { Camera, SwitchCameraIcon as MotionSensor, DoorOpen, Maximize, type LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface SecurityDevice {
  id: string
  name: string
  type: "camera" | "motion" | "door" | "window"
  location: string
  status: boolean // true for active/open, false for inactive/closed
  armedOnly?: boolean // true if device only active when system is armed
}

const securityDeviceIcons: Record<SecurityDevice["type"], LucideIcon> = {
  camera: Camera,
  motion: MotionSensor,
  door: DoorOpen,
  window: Maximize,
}

interface SecurityDeviceCardProps {
  device: SecurityDevice
  onToggle: (id: string) => void
  isSystemArmed: boolean
}

export function SecurityDeviceCard({ device, onToggle, isSystemArmed }: SecurityDeviceCardProps) {
  const Icon = securityDeviceIcons[device.type]
  const isActive = device.status && (!device.armedOnly || isSystemArmed)
  const cardClasses = isActive ? "bg-cyan-900/50 border-cyan-500/50" : "bg-slate-900/50 border-slate-700/50"
  const statusText =
    device.type === "door" || device.type === "window"
      ? device.status
        ? "Open"
        : "Closed"
      : device.status
        ? "Active"
        : "Inactive"

  return (
    <Card className={`relative overflow-hidden h-[180px] ${cardClasses}`}>
      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
        <div className="mb-3">
          <Icon className={`h-8 w-8 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
        </div>
        <div className="text-lg font-semibold text-slate-100 mb-1">{device.name}</div>
        <div className="text-xs text-slate-400 mb-2">{device.location}</div>
        <Badge
          variant="outline"
          className={`${
            isActive
              ? "bg-green-500/10 text-green-400 border-green-500/30"
              : "bg-slate-500/10 text-slate-400 border-slate-500/30"
          } text-xs mb-3`}
        >
          {statusText}
        </Badge>
        <Switch checked={device.status} onCheckedChange={() => onToggle(device.id)} />
      </CardContent>
    </Card>
  )
}
