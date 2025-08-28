"use client";

import dynamic from "next/dynamic";
import {
  Bell,
  Home,
  Moon,
  Search,
  Sun,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dynamically import NotificationCenter to prevent hydration mismatch
const NotificationCenter = dynamic(() => import("./notification-center"), {
  ssr: false,
});

interface HeaderProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
      <div className="flex items-center space-x-2">
        <Home className="h-8 w-8 text-cyan-500" />
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          SMART HOME
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search devices..."
            className="bg-transparent border-none focus:outline-none text-sm w-full max-w-[100px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[250px] placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <NotificationCenter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-slate-400 hover:text-black"
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </NotificationCenter>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="text-slate-400 hover:text-black"
                >
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback className="bg-slate-700 text-cyan-500">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-slate-900 border-slate-700 text-slate-100"
              align="end"
              forceMount
            >
              <DropdownMenuItem className="flex items-center gap-2 text-slate-200">
                <User className="h-4 w-4" />
                <Link href="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-slate-200">
                <Settings className="h-4 w-4" />
                <Link href="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700/50" />
              <DropdownMenuItem className="flex items-center gap-2 text-red-400">
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
