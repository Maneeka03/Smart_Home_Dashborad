"use client";

import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function ActionButton({
  icon: Icon,
  label,
  onClick,
}: ActionButtonProps) {
  return (
    <Button
      // variant="secondary"
      className="w-full justify-center text-cyan-400 border-cyan-500/50 bg-blue-950 "
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
