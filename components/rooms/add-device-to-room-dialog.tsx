"use client";

import * as React from "react";
import {
  Plus,
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

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Reusing the Device interface and deviceIcons from devices-section.tsx for consistency
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
  status: boolean;
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

interface AddDeviceToRoomDialogProps {
  roomId: string;
  roomName: string;
  onAddDevice: (
    roomId: string,
    deviceName: string,
    deviceType: Device["type"]
  ) => void;
}

export function AddDeviceToRoomDialog({
  roomId,
  roomName,
  onAddDevice,
}: AddDeviceToRoomDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [deviceName, setDeviceName] = React.useState("");
  const [deviceType, setDeviceType] = React.useState<Device["type"]>("light");

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDevice(roomId, deviceName, deviceType);
    setDeviceName("");
    setDeviceType("light");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="text-cyan-400 border-cyan-500/50 h-7 w-7 p-0"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add Device to {roomName}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-slate-100">
            Add Device to {roomName}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Add a new smart home device to this room.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddDevice} className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label
              htmlFor="deviceName"
              className="text-right text-slate-300 sm:col-span-1"
            >
              Name
            </Label>
            <Input
              id="deviceName"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              className="col-span-full sm:col-span-3 bg-slate-800 border-slate-700 text-slate-100"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label
              htmlFor="deviceType"
              className="text-right text-slate-300 sm:col-span-1"
            >
              Type
            </Label>
            <Select
              value={deviceType}
              onValueChange={(value) => setDeviceType(value as Device["type"])}
            >
              <SelectTrigger className="col-span-full sm:col-span-3 bg-slate-800 border-slate-700 text-slate-100">
                <SelectValue placeholder="Select a device type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {Object.keys(deviceIcons).map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="hover:bg-slate-700 hover:text-black"
                  >
                    {type.charAt(0).toUpperCase() +
                      type.slice(1).replace(/([A-Z])/g, " $1")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan text-white"
            >
              Add Device
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
