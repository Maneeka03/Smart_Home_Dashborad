interface EnergyChartProps {
  dailyUsage: number
}

export function EnergyChart({ dailyUsage }: EnergyChartProps) {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">10 kWh</div>
        <div className="text-xs text-slate-500">7.5 kWh</div>
        <div className="text-xs text-slate-500">5 kWh</div>
        <div className="text-xs text-slate-500">2.5 kWh</div>
        <div className="text-xs text-slate-500">0 kWh</div>
      </div>

      {/* X-axis grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      {/* Chart lines */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        <svg className="w-full h-full" preserveAspectRatio="none">
          {/* Energy line */}
          <polyline
            points="0,20 40,35 80,30 120,42 160,55 200,30 240,10 280,5 320,10 360,18"
            stroke="url(#energyGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "rgba(168, 85, 247, 0.8)" }} />
              <stop offset="100%" style={{ stopColor: "rgba(216, 180, 254, 0.2)" }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between px-4">
        <div className="text-xs text-slate-500">00:00</div>
        <div className="text-xs text-slate-500">06:00</div>
        <div className="text-xs text-slate-500">12:00</div>
        <div className="text-xs text-slate-500">18:00</div>
        <div className="text-xs text-slate-500">24:00</div>
      </div>
    </div>
  )
}
