"use client";

import * as React from "react";
import { LayoutGrid } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomCard } from "./room-card";
import { AddRoomDialog } from "./add-room-dialog";
import { useDevices } from "../context/device-context";

export function RoomsPage() {
  const { rooms, addRoom, toggleDevice, addDeviceToRoom } = useDevices();

  const [activeFilter, setActiveFilter] = React.useState("all");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddRoom = (name: string, type: string) => {
    addRoom(name, type);
  };

  const handleToggleDevice = (roomId: string, deviceId: string) => {
    toggleDevice(deviceId);
  };

  const handleAddDeviceToRoom = (
    roomId: string,
    deviceName: string,
    deviceType: any
  ) => {
    addDeviceToRoom(roomId, deviceName, deviceType);
  };

  const filteredRooms = rooms.filter(
    (room) => activeFilter === "all" || room.type === activeFilter
  );

  const roomTypes = [
    { value: "all", label: "All Rooms" },
    { value: "living", label: "Living Room" },
    { value: "bedroom", label: "Bedroom" },
    { value: "kitchen", label: "Kitchen" },
    { value: "bathroom", label: "Bathroom" },
    { value: "garage", label: "Garage" },
    { value: "dining", label: "Dining Room" },
    { value: "office", label: "Office" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="container mx-auto p-4 relative z-10">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">
              SMART HOME INITIALIZING
            </div>
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
            <div className="flex items-center space-x-2">
              <LayoutGrid className="h-8 w-8 text-cyan-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ROOMS
              </span>
            </div>
            <AddRoomDialog onAddRoom={handleAddRoom} />
          </header>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-100 text-base">
                Filter Rooms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeFilter}
                onValueChange={setActiveFilter}
                className="w-full"
              >
                <TabsList className="bg-slate-800/50 p-1 flex flex-wrap h-auto">
                  {roomTypes.map((type) => (
                    <TabsTrigger
                      key={type.value}
                      value={type.value}
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 flex-grow"
                    >
                      {type.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.length === 0 ? (
              <p className="text-slate-500 text-center col-span-full py-8">
                No rooms found for the selected filter.
              </p>
            ) : (
              filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onToggleDevice={handleToggleDevice}
                  onAddDeviceToRoom={handleAddDeviceToRoom}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
