"use client";

import * as React from "react";
import {
  Lightbulb,
  Fan,
  Maximize,
  DoorOpen,
  Thermometer,
  Tv,
  Coffee,
  Speaker,
  Plus,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
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
import { useDevices } from "../context/device-context";

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

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string) => void;
}

function DeviceCard({ device, onToggle }: DeviceCardProps) {
  const Icon = deviceIcons[device.type];
  const cardClasses = device.status
    ? "bg-cyan-900/50 border-cyan-500/50"
    : "bg-slate-900/50 border-slate-700/50";

  const getIconClasses = () => {
    let baseClasses = `h-8 w-8 ${
      device.status ? "text-cyan-400" : "text-slate-400"
    }`;

    if (device.status) {
      if (device.type === "fan") {
        baseClasses += " animate-spin";
      }
      // Removed glowing effect for light
    }

    return baseClasses;
  };

  return (
    <Card className={`relative overflow-hidden h-[180px] ${cardClasses}`}>
      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
        <div className="mb-3">
          <Icon className={getIconClasses()} />
        </div>
        <div className="text-lg font-semibold text-slate-100 mb-1">
          {device.name}
        </div>
        <div className="text-xs text-slate-400 mb-4">{device.location}</div>
        <Switch
          checked={device.status}
          onCheckedChange={() => onToggle(device.id)}
        />
      </CardContent>
    </Card>
  );
}

export function DevicesSection() {
  const { devices, addDevice, toggleDevice } = useDevices();

  const [isAddDeviceDialogOpen, setIsAddDeviceDialogOpen] =
    React.useState(false);
  const [newDeviceName, setNewDeviceName] = React.useState("");
  const [newDeviceLocation, setNewDeviceLocation] = React.useState("");
  const [newDeviceType, setNewDeviceType] =
    React.useState<Device["type"]>("light");

  const handleToggleDevice = (id: string) => {
    toggleDevice(id);
  };

  const handleAddNewDevice = (e: React.FormEvent) => {
    e.preventDefault();
    addDevice({
      name: newDeviceName,
      type: newDeviceType,
      location: newDeviceLocation,
      status: false, // New devices start as off/closed
    });
    setNewDeviceName("");
    setNewDeviceLocation("");
    setNewDeviceType("light");
    setIsAddDeviceDialogOpen(false);
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-slate-100 text-base">My Devices</CardTitle>
        <Dialog
          open={isAddDeviceDialogOpen}
          onOpenChange={setIsAddDeviceDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="text-cyan-400 border-cyan-500/50 bg-blue-950 "
            >
              <Plus className="h-4 w-4 mr-2" /> Add Device
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-blue-950 border-slate-700 text-slate-100">
            <DialogHeader>
              <DialogTitle className="text-slate-100">
                Add New Device
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Fill in the details for your new smart home device.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddNewDevice} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-slate-300">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                  className="col-span-3 bg-slate-800 border-slate-700 text-slate-100"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right text-slate-300">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newDeviceLocation}
                  onChange={(e) => setNewDeviceLocation(e.target.value)}
                  className="col-span-3 bg-slate-800 border-slate-700 text-slate-100"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right text-slate-300">
                  Type
                </Label>
                <Select
                  value={newDeviceType}
                  onValueChange={(value) =>
                    setNewDeviceType(value as Device["type"])
                  }
                >
                  <SelectTrigger className="col-span-3 bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select a device type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    {Object.keys(deviceIcons).map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="hover:bg-slate-700 "
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
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Add Device
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[376px] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onToggle={handleToggleDevice}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
