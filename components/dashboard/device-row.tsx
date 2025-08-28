"use client"

import { Power } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DeviceRowProps {
  id: string
  name: string
  location: string
  power: string
  status: "on" | "off"
  onToggle: () => void
}

export function DeviceRow({ id, name, location, power, status, onToggle }: DeviceRowProps) {
  return (
    <div className="grid grid-cols-12 items-center p-3">
      <div className="col-span-1 text-slate-500">{id}</div>
      <div className="col-span-4 text-slate-300">{name}</div>
      <div className="col-span-2 text-slate-400">{location}</div>
      <div className="col-span-2 text-purple-400">{power}</div>
      <div className="col-span-2">
        <Badge
          variant="outline"
          className={`${
            status === "on"
              ? "bg-green-500/10 text-green-400 border-green-500/30"
              : "bg-slate-500/10 text-slate-400 border-slate-500/30"
          } text-xs`}
        >
          {status}
        </Badge>
      </div>
      <div className="col-span-1">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onToggle}>
          <Power className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
