"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const metrics = [
  { label: "Risk Level", value: "HIGH", color: "text-red-500" },
  { label: "Assets", value: "47", color: "text-foreground" },
  { label: "Tx Count", value: "1,284", color: "text-foreground" },
];

const prescriptions = [
  { dose: "1x", title: "Hackathon Entry", desc: "Build something useful" },
  { dose: "2x", title: "Risk Management Videos", desc: "Learn position sizing" },
  { dose: "3x", title: "Community Workshops", desc: "Connect with mentors" },
];

export function PatientDashboard() {
  return (
    <section className="w-full bg-slate-50 dark:bg-white/[0.02] py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-black text-white dark:bg-[#F0B90B] dark:text-black rounded-sm font-mono">
            Patient Dashboard
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white">
            Your Medical Chart
          </h2>
        </motion.div>

        {/* Dashboard Cards Row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Diagnosis Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="p-6 border-2 border-black dark:border-[#F0B90B]/30 bg-white dark:bg-black/50
              dark:hover:shadow-[0_0_20px_rgba(240,185,11,0.08)] transition-shadow"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 font-mono">
                Diagnosis
              </span>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="mt-2 text-lg font-bold text-black dark:text-white">
              Wallet Health Score
            </h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-6xl font-extrabold text-red-500">32</span>
              <span className="text-2xl text-slate-400 dark:text-slate-500">/ 100</span>
            </div>
            <span className="mt-3 inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-red-500 text-white rounded-sm font-mono">
              Critical Condition
            </span>

            <hr className="my-5 border-slate-200 dark:border-white/10" />

            <div className="grid grid-cols-3 gap-4">
              {metrics.map((m) => (
                <div key={m.label}>
                  <span className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 font-mono">
                    {m.label}
                  </span>
                  <p className={`mt-1 text-lg font-bold ${m.color}`}>{m.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trajectory Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="p-6 border-2 border-black dark:border-[#F0B90B]/30 bg-white dark:bg-black/50
              dark:hover:shadow-[0_0_20px_rgba(240,185,11,0.08)] transition-shadow"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 font-mono">
              Trajectory
            </span>
            <h3 className="mt-2 text-lg font-bold text-black dark:text-white">
              Loss Trajectory
            </h3>
            <div className="mt-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <span className="text-3xl font-extrabold text-red-500">-68%</span>
            </div>

            {/* Mini chart placeholder */}
            <div className="mt-6 h-24 relative">
              <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d="M0,10 Q30,8 60,15 T120,25 T180,45 T240,60 T300,70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-red-400"
                />
              </svg>
            </div>

            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              Last 90 days
            </span>
          </motion.div>
        </div>

        {/* Prescription Card (Full Width) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="mt-6 p-6 border-2 border-black dark:border-[#F0B90B]/30 bg-white dark:bg-black/50
            dark:hover:shadow-[0_0_20px_rgba(240,185,11,0.08)] transition-shadow"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 font-mono">
            Treatment Plan
          </span>
          <h3 className="mt-2 text-lg font-bold text-black dark:text-white">
            Prescription
          </h3>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {prescriptions.map((rx) => (
              <div key={rx.title} className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0
                  bg-[#F0B90B] text-black dark:bg-[#F0B90B] dark:text-black rounded-sm font-bold text-sm">
                  ■
                </div>
                <div>
                  <p className="font-bold text-black dark:text-white">
                    {rx.dose} {rx.title}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    {rx.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
