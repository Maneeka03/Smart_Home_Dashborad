"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const airQualityData = [
  { name: "00:00", pm25: 12, co2: 400, voc: 0.3 },
  { name: "02:00", pm25: 10, co2: 390, voc: 0.28 },
  { name: "04:00", pm25: 15, co2: 410, voc: 0.35 },
  { name: "06:00", pm25: 20, co2: 450, voc: 0.4 },
  { name: "08:00", pm25: 25, co2: 500, voc: 0.5 },
  { name: "10:00", pm25: 22, co2: 480, voc: 0.48 },
  { name: "12:00", pm25: 18, co2: 430, voc: 0.39 },
  { name: "14:00", pm25: 16, co2: 410, voc: 0.37 },
  { name: "16:00", pm25: 19, co2: 440, voc: 0.42 },
  { name: "18:00", pm25: 28, co2: 550, voc: 0.6 },
  { name: "20:00", pm25: 30, co2: 600, voc: 0.65 },
  { name: "22:00", pm25: 25, co2: 520, voc: 0.55 },
];

export function AirQualityChart() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-100 text-base">
          Air Quality Overview
        </CardTitle>
        <CardDescription className="text-slate-400">
          Daily PM2.5, CO2, and VOC levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            pm25: {
              label: "PM2.5 (µg/m³)",
              color: "#00bcd4", // Cyan
            },
            co2: {
              label: "CO2 (ppm)",
              color: "#8e44ad", // Purple
            },
            voc: {
              label: "VOC (mg/m³)",
              color: "#f39c12", // Amber
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={airQualityData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="pm25"
                stroke="#00bcd4"
                fill="#00bcd4"
                fillOpacity={0.3}
                name="PM2.5"
              />
              <Area
                type="monotone"
                dataKey="co2"
                stroke="#8e44ad"
                fill="#8e44ad"
                fillOpacity={0.3}
                name="CO2"
              />
              <Area
                type="monotone"
                dataKey="voc"
                stroke="#f39c12"
                fill="#f39c12"
                fillOpacity={0.3}
                name="VOC"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
