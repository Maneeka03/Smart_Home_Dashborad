"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
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

const roomConsumptionData = [
  { name: "Living Room", usage: 5.2 },
  { name: "Kitchen", usage: 7.8 },
  { name: "Bedroom", usage: 3.1 },
  { name: "Bathroom", usage: 1.9 },
  // { name: "Hallway", usage: 0.8 },
  { name: "Garage", usage: 2.5 },
];

export function ElectricityConsumptionRoomChart() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-100 text-base">
          Electricity Consumption (Rooms)
        </CardTitle>
        <CardDescription className="text-slate-400">
          Daily energy usage per room (kWh)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            usage: {
              label: "Usage (kWh)",
              color: "#c9a300", // Dark yellow
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={roomConsumptionData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar
                dataKey="usage"
                fill="#e1c85bff" // Dark yellow color applied here
                radius={[4, 4, 0, 0]}
                name="Usage"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
