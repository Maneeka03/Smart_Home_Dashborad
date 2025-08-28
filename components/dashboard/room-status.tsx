import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RoomStatusItem } from "./room-status-item"

interface RoomStatusProps {
  deviceStatus: {
    livingRoomLights: boolean
    kitchenLights: boolean
    bedroomLights: boolean
  }
}

export function RoomStatus({ deviceStatus }: RoomStatusProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 text-base">Room Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <RoomStatusItem
            name="Living Room"
            temperature={21.5}
            humidity={45}
            lights={deviceStatus.livingRoomLights ? "on" : "off"}
          />
          <RoomStatusItem
            name="Kitchen"
            temperature={22.0}
            humidity={48}
            lights={deviceStatus.kitchenLights ? "on" : "off"}
          />
          <RoomStatusItem
            name="Bedroom"
            temperature={20.5}
            humidity={42}
            lights={deviceStatus.bedroomLights ? "on" : "off"}
          />
          <RoomStatusItem name="Bathroom" temperature={23.0} humidity={65} lights="off" />
        </div>
      </CardContent>
    </Card>
  )
}
