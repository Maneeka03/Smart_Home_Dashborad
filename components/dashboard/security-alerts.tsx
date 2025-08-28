import { Lock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SecurityAlertsProps {
  securityStatus: number
  deviceStatus: {
    frontDoor: boolean
    backDoor: boolean
    garageDoor: boolean
  }
}

export function SecurityAlerts({ securityStatus, deviceStatus }: SecurityAlertsProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 flex items-center text-base">
          <Lock className="mr-2 h-5 w-5 text-green-500" />
          Security Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">Front Door</div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              {deviceStatus.frontDoor ? "Locked" : "Unlocked"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">Back Door</div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              {deviceStatus.backDoor ? "Locked" : "Unlocked"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">Garage Door</div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              {deviceStatus.garageDoor ? "Closed" : "Open"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">Alarm System</div>
            <div className="text-sm text-cyan-400">
              Armed <span className="text-slate-500">since 22:00</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
