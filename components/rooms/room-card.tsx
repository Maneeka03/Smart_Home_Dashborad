"use client";
import {
  Lightbulb,
  Fan,
  Maximize,
  DoorOpen,
  Thermometer,
  Tv,
  Coffee,
  Speaker,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AddDeviceToRoomDialog } from "./add-device-to-room-dialog"; // Import the new dialog

// Reusing the Device interface and deviceIcons from devices-section.tsx
interface Device {
  id: string;
  name: string;
  type:
    | "light"
    | "fan"
    | "window"
    | "door"
    | "thermostat"
    | "tv"
    | "coffeeMaker"
    | "speaker";
  location: string;
  status: boolean; // true for on/open, false for off/closed
}

const deviceIcons: Record<Device["type"], LucideIcon> = {
  light: Lightbulb,
  fan: Fan,
  window: Maximize,
  door: DoorOpen,
  thermostat: Thermometer,
  tv: Tv,
  coffeeMaker: Coffee,
  speaker: Speaker,
};

interface RoomCardProps {
  room: {
    id: string;
    name: string;
    type: string;
    devices: Device[];
  };
  onToggleDevice: (roomId: string, deviceId: string) => void;
  onAddDeviceToRoom: (
    roomId: string,
    deviceName: string,
    deviceType: Device["type"]
  ) => void; // New prop
}

export function RoomCard({
  room,
  onToggleDevice,
  onAddDeviceToRoom,
}: RoomCardProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-slate-100 text-base">{room.name}</CardTitle>
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className="bg-slate-800/50 text-slate-400 border-slate-700/50 text-xs"
          >
            {room.type}
          </Badge>
          <AddDeviceToRoomDialog
            roomId={room.id}
            roomName={room.name}
            onAddDevice={onAddDeviceToRoom}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {room.devices.length === 0 ? (
            <p className="text-slate-500 text-sm col-span-2 text-center py-4">
              No devices in this room yet.
            </p>
          ) : (
            room.devices.map((device) => {
              const Icon = deviceIcons[device.type];
              const cardClasses = device.status
                ? "bg-cyan-900/50 border-cyan-500/50"
                : "bg-slate-800/50 border-slate-700/50";
              return (
                <Card
                  key={device.id}
                  className={`relative overflow-hidden h-[140px] ${cardClasses}`}
                >
                  <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                    <div className="mb-2">
                      <Icon
                        className={`h-6 w-6 ${
                          device.status ? "text-cyan-400" : "text-slate-400"
                        }`}
                      />
                    </div>
                    <div className="text-sm font-semibold text-slate-100 mb-1 text-center">
                      {device.name}
                    </div>
                    <Switch
                      checked={device.status}
                      onCheckedChange={() => onToggleDevice(room.id, device.id)}
                    />
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
