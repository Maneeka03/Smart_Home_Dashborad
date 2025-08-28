"use client";

import Link from "next/link"; // Import Link for client-side navigation
import {
  Home,
  Settings,
  type LucideIcon,
  LayoutGrid,
  BarChart3,
  LifeBuoy,
  CreditCard,
  Zap,
  ShieldCheck,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation"; // Import usePathname to get current path

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; // Import Separator for visual breaks

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string; // Added href prop for navigation
  active?: boolean;
  isSubItem?: boolean; // New prop to style sub-items differently
}

function NavItem({
  icon: Icon,
  label,
  href,
  active,
  isSubItem = false,
}: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        active
          ? "bg-slate-800/70 text-cyan-400"
          : "text-slate-400 hover:text-black "
      } ${isSubItem ? "pl-8 text-sm" : ""}`}
      asChild 
    >
      <Link href={href}>
        <Icon className={`mr-2 h-4 w-4 ${isSubItem ? "text-slate-500" : ""}`} />
        {label}
      </Link>
    </Button>
  );
}

interface SidebarProps {
  temperature: number;
  securityStatus: number;
  energyUsage: number;
}

export function Sidebar({}: SidebarProps) {
  const pathname = usePathname();
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
      <CardContent className="p-4">
        <nav className="space-y-2">
          <NavItem
            icon={Home}
            label="Dashboard"
            href="/"
            active={pathname === "/"}
          />
          <NavItem
            icon={LayoutGrid}
            label="Rooms"
            href="/rooms"
            active={pathname === "/rooms"}
          />
          <NavItem
            icon={BarChart3}
            label="Graphs"
            href="/graphs"
            active={pathname === "/graphs"}
          />
          <NavItem
            icon={ShieldCheck}
            label="Security"
            href="/security"
            active={pathname === "/security"}
          />
          <NavItem
            icon={LifeBuoy}
            label="Help & Support"
            href="/help"
            active={pathname === "/help"}
          />
          <Separator className="my-4 bg-slate-700/50" />
          {/* Account Section */}
          <div className="space-y-1">
            <div className="text-xs text-slate-500 mb-2 font-mono uppercase tracking-wider px-2">
              Account
            </div>
            <NavItem
              icon={User}
              label="Profile"
              href="/profile"
              active={pathname === "/profile"}
            />
            <NavItem
              icon={Settings}
              label="Settings"
              href="/settings"
              active={pathname === "/settings"}
            />
          </div>
          <Separator className="my-4 bg-slate-700/50" />
          {/* Subscription Section */}
          <div className="space-y-1">
            <div className="text-xs text-slate-500 mb-2 font-mono uppercase tracking-wider px-2">
              Subscription
            </div>
            <NavItem
              icon={Zap}
              label="Electricity Bill"
              href="/subscription/electricity-bill"
            />{" "}
            {/* Sub-item */}
          </div>
        </nav>
      </CardContent>
    </Card>
  );
}
