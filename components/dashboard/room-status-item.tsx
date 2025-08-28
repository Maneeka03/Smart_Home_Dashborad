import { Thermometer, Umbrella } from "lucide-react"

import { Badge } from "@/components/ui/badge"

interface RoomStatusItemProps {
  name: string
  temperature: number
  humidity: number
  lights: "on" | "off"
}

export function RoomStatusItem({ name, temperature, humidity, lights }: RoomStatusItemProps) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-slate-300">{name}</div>
        <Badge
          className={`bg-${lights === "on" ? "amber" : "slate"}-500/20 text-${lights === "on" ? "amber" : "slate"}-400 border-${lights === "on" ? "amber" : "slate"}-500/50`}
        >
          Lights {lights}
        </Badge>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-slate-400">
          <Thermometer className="h-3 w-3 mr-1 text-amber-500" />
          {temperature}°C
        </div>
        <div className="flex items-center text-slate-400">
          <Umbrella className="h-3 w-3 mr-1 text-blue-500" />
          {humidity}%
        </div>
      </div>
    </div>
  )
}
