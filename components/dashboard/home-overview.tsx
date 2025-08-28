"use client";

import { Home, RefreshCw, Thermometer, PlugZap, Umbrella } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "./metric-card";
import { DevicesSection } from "./devices-section"; // Import DevicesSection
import { ElectricityConsumptionApplianceChart } from "@/components/graphs/electricity-consumption-appliance-chart"; // Import the chart

interface HomeOverviewProps {
  temperature: number;
  energyUsage: number;
  humidity: number;
  deviceStatus: {
    livingRoomLights: boolean;
    kitchenLights: boolean;
    bedroomLights: boolean;
    thermostat: boolean;
    tv: boolean;
    coffeeMaker: boolean;
  };
  toggleDevice: (device: keyof HomeOverviewProps["deviceStatus"]) => void;
}

export function HomeOverview({
  temperature,
  energyUsage,
  humidity,
  deviceStatus,
  toggleDevice,
}: HomeOverviewProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center">
            <Home className="mr-2 h-5 w-5 text-cyan-500" />
            Home Overview
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
              LIVE
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Temperature"
            value={temperature}
            icon={Thermometer}
            trend="up"
            color="amber"
            detail={`${temperature}°C | ${(temperature * 1.8 + 32).toFixed(
              1
            )}°F`}
            unit="°C"
          />
          <MetricCard
            title="Energy Usage"
            value={energyUsage}
            icon={PlugZap}
            trend="stable"
            color="purple"
            detail={`${energyUsage} kWh today`}
            unit="kWh"
          />
          <MetricCard
            title="Humidity"
            value={humidity}
            icon={Umbrella}
            trend="down"
            color="blue"
            detail={`${humidity}% | Optimal`}
            unit="%"
          />
        </div>

        {/* Devices Section moved here */}
        <div className="mt-8">
          <DevicesSection />
        </div>

        <div className="mt-8">
          {/* Directly rendering the chart without tabs */}
          <ElectricityConsumptionApplianceChart />
        </div>
      </CardContent>
    </Card>
  );
}
