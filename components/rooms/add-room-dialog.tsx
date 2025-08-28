"use client";

import * as React from "react";
import { Plus } from "lucide-react";

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

interface AddRoomDialogProps {
  onAddRoom: (name: string, type: string) => void;
}

export function AddRoomDialog({ onAddRoom }: AddRoomDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [roomName, setRoomName] = React.useState("");
  const [roomType, setRoomType] = React.useState("living");

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRoom(roomName, roomType);
    setRoomName("");
    setRoomType("living");
    setIsDialogOpen(false);
  };

  const roomTypes = [
    { value: "living", label: "Living Room" },
    { value: "bedroom", label: "Bedroom" },
    { value: "kitchen", label: "Kitchen" },
    { value: "bathroom", label: "Bathroom" },
    // { value: "hallway", label: "Hallway" },
    { value: "garage", label: "Garage" },
    { value: "dining", label: "Dining Room" },
    { value: "office", label: "Office" },
    { value: "other", label: "Other" },
  ];

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          // variant="secondary"
          className="text-cyan-400 border-cyan-500/50 hover:bg-white"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-slate-100">Add New Room</DialogTitle>
          <DialogDescription className="text-slate-400">
            Enter the details for your new smart home room.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddRoom} className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label
              htmlFor="roomName"
              className="text-right text-slate-300 sm:col-span-1"
            >
              Name
            </Label>
            <Input
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="col-span-full sm:col-span-3 bg-slate-800 border-slate-700 text-slate-100"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label
              htmlFor="roomType"
              className="text-right text-slate-300 sm:col-span-1"
            >
              Type
            </Label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger className="col-span-full sm:col-span-3 bg-slate-800 border-slate-700 text-slate-100">
                <SelectValue placeholder="Select a room type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {roomTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="hover:bg-slate-700"
                  >
                    {type.label}
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
              Add Room
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
