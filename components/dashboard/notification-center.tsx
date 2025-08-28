"use client"

import * as React from "react"
import { Bell, Info, AlertCircle, Check, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area" 

interface Notification {
  id: string
  type: "info" | "warning" | "error" | "success" | "update"
  title: string
  description: string
  time: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "n1",
    type: "warning",
    title: "Motion Detected",
    description: "Front door camera detected unusual movement.",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: "n2",
    type: "info",
    title: "New Device Added",
    description: "A new 'Smart Plug' was added to the Living Room.",
    time: "15 minutes ago",
    read: true,
  },
  {
    id: "n3",
    type: "error",
    title: "Device Offline",
    description: "Bedroom thermostat is currently offline. Check connection.",
    time: "30 minutes ago",
    read: false,
  },
  {
    id: "n4",
    type: "success",
    title: "System Update Complete",
    description: "Your smart home system has been successfully updated.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "n5",
    type: "update",
    title: "Firmware Available",
    description: "Updates are ready for your kitchen appliances.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n6",
    type: "info",
    title: "Energy Usage Alert",
    description: "Your daily energy consumption is higher than average.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "n7",
    type: "warning",
    title: "Low Battery",
    description: "Smoke detector in hallway has low battery.",
    time: "Yesterday",
    read: false,
  },
  {
    id: "n8",
    type: "success",
    title: "Security System Armed",
    description: "Your home security system is now armed.",
    time: "2 days ago",
    read: true,
  },
]

const NotificationIcon: React.FC<{ type: Notification["type"] }> = ({ type }) => {
  switch (type) {
    case "info":
      return <Info className="h-4 w-4 text-blue-400" />
    case "warning":
      return <AlertCircle className="h-4 w-4 text-amber-400" />
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-400" />
    case "success":
      return <Check className="h-4 w-4 text-green-400" />
    case "update":
      return <RefreshCw className="h-4 w-4 text-cyan-400" />
    default:
      return <Info className="h-4 w-4 text-slate-400" />
  }
}

interface NotificationCenterProps {
  children: React.ReactNode
}

export default function NotificationCenter({ children }: NotificationCenterProps) {
  const [open, setOpen] = React.useState(false)
  const [currentNotifications, setCurrentNotifications] = React.useState<Notification[]>(notifications)

  const markAsRead = (id: string) => {
    setCurrentNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const clearAll = () => {
    setCurrentNotifications([])
  }

  const unreadCount = currentNotifications.filter((notif) => !notif.read).length

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {/* The Bell icon button from Header.tsx will be passed as children */}
        <div className="relative">
          {children}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-red-500 text-white text-xs rounded-full z-10">
              {unreadCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] bg-slate-900 border-l border-slate-700/50 text-slate-100 flex flex-col">
        <SheetHeader className="border-b border-slate-700/50 pb-4">
          <SheetTitle className="text-slate-100 flex items-center">
            <Bell className="mr-2 h-6 w-6 text-cyan-500" />
            Notifications
          </SheetTitle>
          <SheetDescription className="text-slate-400">Your recent smart home alerts and updates.</SheetDescription>
        </SheetHeader>
        <div className="flex justify-end py-2">
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-slate-400 hover:text-black">
            Clear All
          </Button>
        </div>
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {currentNotifications.length === 0 ? (
              <div className="text-center text-slate-500 py-8">No new notifications.</div>
            ) : (
              currentNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border ${
                    notif.read ? "bg-slate-800/30 border-slate-700/50" : "bg-slate-800/70 border-cyan-500/30"
                  }`}
                >
                  <div className="mt-0.5">
                    <NotificationIcon type={notif.type} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className={`text-sm font-medium ${notif.read ? "text-slate-400" : "text-slate-200"}`}>
                        {notif.title}
                      </div>
                      <div className="text-xs text-slate-500">{notif.time}</div>
                    </div>
                    <div className="text-xs text-slate-400">{notif.description}</div>
                  </div>
                  {!notif.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notif.id)} className="h-6 w-6 p-0">
                      <Check className="h-3 w-3 text-green-400" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
