import type { LucideIcon } from "lucide-react"

interface ScheduleItemProps {
  icon: LucideIcon
  title: string
  time: string
  description: string
  active?: boolean
}

export function ScheduleItem({ icon: Icon, title, time, description, active = true }: ScheduleItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <div
        className={`mt-0.5 p-1.5 rounded-full ${
          active ? "bg-cyan-500/10 border border-cyan-500/30" : "bg-slate-700/50 border border-slate-600/30"
        }`}
      >
        <Icon className={`h-4 w-4 ${active ? "text-cyan-400" : "text-slate-400"}`} />
      </div>
      <div>
        <div className="flex items-center">
          <div className="text-sm font-medium text-slate-200">{title}</div>
          <div className="ml-2 text-xs text-cyan-400">{time}</div>
        </div>
        <div className="text-xs text-slate-400">{description}</div>
      </div>
    </div>
  )
}
