"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActionButton } from "./action-button"
import { Fan, Lightbulb, Lock, Power } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <ActionButton icon={Lock} label="Lock All" onClick={() => console.log("Lock All clicked")} />
          <ActionButton icon={Lightbulb} label="All Lights" onClick={() => console.log("All Lights clicked")} />
          <ActionButton icon={Fan} label="Climate" onClick={() => console.log("Climate clicked")} />
          <ActionButton icon={Power} label="Power Off" onClick={() => console.log("Power Off clicked")} />
        </div>
      </CardContent>
    </Card>
  )
}
