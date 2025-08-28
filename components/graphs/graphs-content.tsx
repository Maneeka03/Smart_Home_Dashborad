"use client"

import { AirQualityChart } from "./air-quality-chart"
import { ElectricityConsumptionApplianceChart } from "./electricity-consumption-appliance-chart"
import { ElectricityConsumptionRoomChart } from "./electricity-consumption-room-chart"

export default function GraphsContent() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          ANALYTICS
        </span>
      </div>
      <AirQualityChart />
      <ElectricityConsumptionApplianceChart />
      <ElectricityConsumptionRoomChart />
    </div>
  )
}
