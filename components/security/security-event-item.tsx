import { AlertCircle, Info, ShieldAlert, Video, Activity, DoorOpen, Maximize } from "lucide-react" // Corrected import

interface SecurityEventItemProps {
  type: "motion" | "door" | "window" | "camera" | "system" | "alert"
  description: string
  time: string
  status: "info" | "warning" | "success" | "error"
}

export function SecurityEventItem({ type, description, time, status }: SecurityEventItemProps) {
  const getIconAndColor = () => {
    switch (type) {
      case "motion":
        return { icon: Activity, color: "text-amber-500" } // Changed to Activity
      case "door":
        return { icon: DoorOpen, color: "text-red-500" }
      case "window":
        return { icon: Maximize, color: "text-red-500" }
      case "camera":
        return { icon: Video, color: "text-blue-500" }
      case "system":
        return { icon: ShieldAlert, color: "text-cyan-500" }
      case "alert":
        return { icon: AlertCircle, color: "text-red-500" }
      default:
        return { icon: Info, color: "text-slate-400" }
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "info":
        return "text-blue-400"
      case "warning":
        return "text-amber-400"
      case "success":
        return "text-green-400"
      case "error":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  const { icon: Icon, color: iconColor } = getIconAndColor()
  const statusColor = getStatusColor()

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1.5 rounded-full bg-slate-700/50 border border-slate-600/30`}>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <div>
        <div className="flex items-center">
          <div className="text-sm font-medium text-slate-200">{description}</div>
          <div className={`ml-2 text-xs ${statusColor}`}>{time}</div>
        </div>
        <div className="text-xs text-slate-400">
          {status === "success" && "System OK"}
          {status === "info" && "Information"}
          {status === "warning" && "Action Recommended"}
          {status === "error" && "Immediate Attention Required"}
        </div>
      </div>
    </div>
  )
}
