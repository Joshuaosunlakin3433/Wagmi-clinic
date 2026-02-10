"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WalletChartProps {
  history: { day: string; value: number }[];
  status: string;
}

export function WalletChart({ history, status }: WalletChartProps) {
  const color = status === "CRITICAL" ? "#ef4444" : "#F0B90B";

  return (
    <div className="w-full" style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={history}
          margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666", fontSize: 11, fontFamily: "monospace" }}
            interval={4}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666", fontSize: 11, fontFamily: "monospace" }}
            width={45}
          />
          <Tooltip
            contentStyle={{
              background: "#000",
              border: "1px solid #F0B90B",
              borderRadius: 0,
              fontFamily: "monospace",
              fontSize: 12,
              color: "#fff",
            }}
            labelFormatter={(label) => `Day ${label}`}
            formatter={(value) => [`$${value}`, "Value"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorValue)"
            dot={false}
            activeDot={{
              r: 4,
              fill: color,
              stroke: "#000",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
