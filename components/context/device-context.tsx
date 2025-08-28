"use client";

import * as React from "react";

interface Device {
  id: string;
  name: string;
  type: "light" | "fan" | "window" | "door" | "tv";
  location: string;
  status: boolean;
}

interface Room {
  id: string;
  name: string;
  type: string;
  devices: Device[];
}

interface DeviceContextType {
  devices: Device[];
  rooms: Room[];
  addDevice: (device: Omit<Device, "id">) => void;
  toggleDevice: (deviceId: string) => void;
  addRoom: (name: string, type: string) => void;
  addDeviceToRoom: (
    roomId: string,
    deviceName: string,
    deviceType: Device["type"]
  ) => void;
  getDevicesByRoom: (roomName: string) => Device[];
}

const DeviceContext = React.createContext<DeviceContextType | undefined>(
  undefined
);

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = React.useState<Device[]>([]);
  const [rooms, setRooms] = React.useState<Room[]>([
    { id: "r1", name: "Living Room", type: "living", devices: [] },
    { id: "r2", name: "Bedroom", type: "bedroom", devices: [] },
    { id: "r3", name: "Kitchen", type: "kitchen", devices: [] },
    { id: "r4", name: "Bathroom", type: "bathroom", devices: [] },
    { id: "r6", name: "Entrance", type: "other", devices: [] },
  ]);

  const token = "A*MlaUWI0x2rYph6vng$OPeGFsVSifL8";

  React.useEffect(() => {
    async function fetchDevices() {
      try {
        // --- Living Room API ---
        const livingResponse = await fetch(
          "http://10.100.239.252:8888/Applicances_data",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!livingResponse.ok) {
          throw new Error(`HTTP error! status: ${livingResponse.status}`);
        }

        const livingData = await livingResponse.json();

        const livingDevices: Device[] = Object.entries(livingData).map(
          ([key, value]: [string, any], index) => {
            let deviceType: Device["type"] = "light";

            const lowerKey = key.toLowerCase();
            if (lowerKey.includes("fan")) deviceType = "fan";
            else if (lowerKey.includes("door")) deviceType = "door";
            else if (lowerKey.includes("window")) deviceType = "window";
            else if (lowerKey.includes("tv")) deviceType = "tv";
            else deviceType = "light";

            const statusValue = value?.Condition;
            const status =
              statusValue === "on" || statusValue === 1 || statusValue === true;

            return {
              id: `lr-${index + 1}`,
              name: key,
              type: deviceType,
              location: "Living Room",
              status,
            };
          }
        );

        // --- Bedroom API ---
        const bedroomResponse = await fetch(
          "http://10.100.239.252:8888/Room1_Applicances_data",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${"ApMaXzcFoSvjB*&KlGP0CTtsR#H4N8m7"}`,
            },
          }
        );

        if (!bedroomResponse.ok) {
          throw new Error(`HTTP error! status: ${bedroomResponse.status}`);
        }

        const bedroomData = await bedroomResponse.json();

        const bedroomDevices: Device[] = Object.entries(bedroomData).map(
          ([key, value]: [string, any], index) => {
            let deviceType: Device["type"] = "light";

            const lowerKey = key.toLowerCase();
            if (lowerKey.includes("fan")) deviceType = "fan";
            else if (lowerKey.includes("door")) deviceType = "door";
            else if (lowerKey.includes("window")) deviceType = "window";
            else if (lowerKey.includes("tv")) deviceType = "tv";
            else deviceType = "light";

            const statusValue = value?.Condition;
            const status =
              statusValue === "on" || statusValue === 1 || statusValue === true;

            return {
              id: `br-${index + 1}`,
              name: key,
              type: deviceType,
              location: "Bedroom",
              status,
            };
          }
        );

        // Merge both room devices
        setDevices([...livingDevices, ...bedroomDevices]);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    }

    fetchDevices();
  }, []);

  // keep rooms updated with their devices
  React.useEffect(() => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => ({
        ...room,
        devices: devices.filter((device) => device.location === room.name),
      }))
    );
  }, [devices]);

  const addDevice = React.useCallback((deviceData: Omit<Device, "id">) => {
    const newDevice: Device = {
      ...deviceData,
      id: `d${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    };
    setDevices((prev) => [...prev, newDevice]);
  }, []);

  const toggleDevice = React.useCallback((deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId ? { ...device, status: !device.status } : device
      )
    );
  }, []);

  const addRoom = React.useCallback((name: string, type: string) => {
    const newRoom: Room = {
      id: `r${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      type,
      devices: [],
    };
    setRooms((prev) => [...prev, newRoom]);
  }, []);

  const addDeviceToRoom = React.useCallback(
    (roomId: string, deviceName: string, deviceType: Device["type"]) => {
      const room = rooms.find((r) => r.id === roomId);
      if (room) {
        addDevice({
          name: deviceName,
          type: deviceType,
          location: room.name,
          status: false,
        });
      }
    },
    [rooms, addDevice]
  );

  const getDevicesByRoom = React.useCallback(
    (roomName: string) =>
      devices.filter((device) => device.location === roomName),
    [devices]
  );

  const value = React.useMemo(
    () => ({
      devices,
      rooms,
      addDevice,
      toggleDevice,
      addRoom,
      addDeviceToRoom,
      getDevicesByRoom,
    }),
    [
      devices,
      rooms,
      addDevice,
      toggleDevice,
      addRoom,
      addDeviceToRoom,
      getDevicesByRoom,
    ]
  );

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}

export function useDevices() {
  const context = React.useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevices must be used within a DeviceProvider");
  }
  return context;
}
