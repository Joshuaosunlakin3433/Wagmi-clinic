"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const stats = [
  { value: "2,847", label: "wallets treated" },
  { value: "$12.4M", label: "portfolios recovered" },
  { value: "94%", label: "success rate" },
];

export function StatsBar() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={3}
      className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-sm opacity-70 text-slate-600 dark:text-slate-400"
    >
      {stats.map((stat, i) => (
        <span key={stat.value} className="flex items-center gap-1.5">
          {i > 0 && (
            <span className="hidden sm:inline mr-1.5">•</span>
          )}
          <strong className="text-black dark:text-white">{stat.value}</strong>{" "}
          {stat.label}
        </span>
      ))}
    </motion.div>
  );
}
