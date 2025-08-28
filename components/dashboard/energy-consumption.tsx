import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EnergyConsumptionProps {
  energyUsage: number
}

export function EnergyConsumption({ energyUsage }: EnergyConsumptionProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 text-base">Energy Consumption</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-slate-400">Lighting</div>
              <div className="text-xs text-cyan-400">12% of total</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"
                style={{ width: "12%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-slate-400">Climate Control</div>
              <div className="text-xs text-purple-400">38% of total</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: "38%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-slate-400">Appliances</div>
              <div className="text-xs text-blue-400">50% of total</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/50">
            <div className="flex items-center justify-between text-sm">
              <div className="text-slate-400">Daily Usage</div>
              <div className="text-cyan-400">{energyUsage} kWh</div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
              <div>Monthly Estimate</div>
              <div>{energyUsage * 30} kWh</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
