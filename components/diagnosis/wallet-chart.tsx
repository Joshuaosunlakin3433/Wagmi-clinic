"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WalletChartProps {
  data: { day: string; value: number }[];
  status: "CRITICAL" | "UNSTABLE" | "STABLE";
}

const statusColor = {
  CRITICAL: "#ef4444",
  UNSTABLE: "#f59e0b",
  STABLE: "#22c55e",
};

export function WalletChart({ data, status }: WalletChartProps) {
  const color = statusColor[status] || "#F0B90B";

  return (
    <div className="w-full h-full min-h-55">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(240,185,11,0.08)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 10, fill: "#6b7280", fontFamily: "monospace" }}
            axisLine={{ stroke: "rgba(240,185,11,0.15)" }}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#6b7280", fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            contentStyle={{
              background: "#0a0a0a",
              border: "1px solid rgba(240,185,11,0.3)",
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
            fill="url(#chartGradient)"
            dot={false}
            activeDot={{
              r: 4,
              fill: color,
              stroke: "#0a0a0a",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
