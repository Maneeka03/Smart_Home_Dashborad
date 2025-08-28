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

const applianceConsumptionData = [
  { name: "TV", usage: 1.5 },
  { name: "Fridge", usage: 2.8 },
  { name: "AC", usage: 4.2 },
  { name: "Lights", usage: 1.0 },
  { name: "Heater", usage: 3.5 },
  { name: "Computer", usage: 0.7 },
  { name: "Washing Machine", usage: 2.0 },
];

export function ElectricityConsumptionApplianceChart() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-100 text-base">
          Electricity Consumption (Appliances)
        </CardTitle>
        <CardDescription className="text-slate-400">
          Daily energy usage per appliance (kWh)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            usage: {
              label: "Usage (kWh)",
              color: "hsl(var(--chart-4))", // Green-like
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={applianceConsumptionData}
              margin={{ top: 10, right: 50, left: 0, bottom: 0 }}
            >
              {/* Increased right margin from 30 to 50 to prevent overflow */}
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
                fill="#22d3ee"
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
