"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { WalletChart } from "@/components/diagnosis/wallet-chart";
import { PrescriptionPad } from "@/components/diagnosis/prescription-pad";
import { Activity, ShieldAlert, Printer, Stethoscope } from "lucide-react";

// ── Types ──
interface Dose {
  label: string;
  title: string;
  subtext: string;
  url: string;
  icon: string;
}

interface DiagnosisData {
  address: string;
  score: number;
  status: "CRITICAL" | "UNSTABLE" | "STABLE";
  history: { day: string; value: number }[];
  roast: { title: string; message: string };
  prescription: { morning: Dose; noon: Dose; night: Dose };
}

// ── Scanner messages ──
const scanMessages = [
  "Checking Shitcoins...",
  "Analyzing Rug Pulls...",
  "Calculating Trauma...",
  "Reviewing Paper Hands History...",
  "Scanning for Diamond Hands...",
  "Evaluating Degen Score...",
];

// ── Status badge colors ──
const statusStyles: Record<string, string> = {
  CRITICAL: "bg-red-500 text-white",
  UNSTABLE: "bg-amber-500 text-black",
  STABLE: "bg-emerald-500 text-white",
};

const scoreColor: Record<string, string> = {
  CRITICAL: "text-red-500",
  UNSTABLE: "text-amber-500",
  STABLE: "text-emerald-500",
};

// ── Shared card class (Glassy Obsidian) ──
const card =
  "border border-[#F0B90B]/30 bg-white/80 dark:bg-black/40 backdrop-blur-sm p-6";

function DiagnosisContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "0x???";

  const [loading, setLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [data, setData] = useState<DiagnosisData | null>(null);

  // Cycle scan messages every 800ms
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % scanMessages.length);
    }, 800);
    return () => clearInterval(interval);
  }, [loading]);

  // Fetch diagnosis from API
  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/diagnose?address=${encodeURIComponent(address)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json: DiagnosisData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Diagnosis fetch failed:", err);
          setData({
            address,
            score: 32,
            status: "CRITICAL",
            history: [],
            roast: {
              title: "Connection Error",
              message: "Could not reach the diagnostic server. Try again.",
            },
            prescription: {
              morning: {
                label: "Morning (Hope)",
                title: "Retry",
                subtext: "Try again later.",
                url: "#",
                icon: "Sun",
              },
              noon: {
                label: "Noon (Grind)",
                title: "Retry",
                subtext: "Try again later.",
                url: "#",
                icon: "Briefcase",
              },
              night: {
                label: "Night (Cope)",
                title: "Retry",
                subtext: "Try again later.",
                url: "#",
                icon: "Moon",
              },
            },
          });
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [address]);

  // ─── Loading: Medical Scanner UI ───
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <Activity className="w-16 h-16 text-[#F0B90B]" strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center text-black dark:text-white font-mono">
          SCANNING WALLET HISTORY...
        </h1>

        <div className="w-64 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#F0B90B] rounded-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            style={{ width: "40%" }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-mono text-slate-500 dark:text-slate-400"
          >
            {scanMessages[messageIndex]}
          </motion.p>
        </AnimatePresence>

        <p className="text-xs font-mono text-slate-400 dark:text-slate-600 break-all max-w-sm text-center">
          Patient: {address}
        </p>
      </div>
    );
  }

  if (!data) return null;

  const { score, status, history, roast, prescription } = data;

  // ─── Loaded: Bento Grid Dashboard ───
  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-[#F0B90B]" />
            Diagnosis Complete
          </h1>
          <button
            className="p-2 border border-[#F0B90B]/30 text-slate-400 hover:text-[#F0B90B] hover:border-[#F0B90B]/60 transition-colors"
            title="Print report"
          >
            <Printer className="w-5 h-5" />
          </button>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ── Top Left: Patient Info Card ── */}
          <motion.div
            className={card}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Patient File
              </h2>
              <span
                className={`px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-sm font-mono ${statusStyles[status]}`}
              >
                {status}
              </span>
            </div>

            {/* Address */}
            <div className="mb-5">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Wallet
              </span>
              <p className="mt-1 text-sm font-mono text-black dark:text-white break-all">
                {address}
              </p>
            </div>

            {/* Score */}
            <div className="flex items-end gap-2">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Health Score
              </span>
            </div>
            <p
              className={`mt-2 text-5xl font-extrabold font-mono ${scoreColor[status]}`}
            >
              {score}
              <span className="text-lg text-slate-500 dark:text-slate-400 font-normal">
                /100
              </span>
            </p>
          </motion.div>

          {/* ── Top Right: Wallet Chart ── */}
          <motion.div
            className={card}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-[#F0B90B]" />
              <h2 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Wallet Trajectory (30d)
              </h2>
            </div>
            <WalletChart history={history} status={status} />
          </motion.div>

          {/* ── Bottom Row: Diagnosis / Roast Card (spans full width) ── */}
          <motion.div
            className={`${card} md:col-span-2`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Stethoscope className="w-5 h-5 text-[#F0B90B]" />
              <h2 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Diagnosis
              </h2>
            </div>

            {/* Roast */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F0B90B] mb-3">
              {roast.title}
            </h3>
            <p className="text-sm font-mono leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
              {roast.message}
            </p>
          </motion.div>

          {/* ── Bottom Row: Prescription Pad (spans full width) ── */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {prescription && <PrescriptionPad data={prescription} />}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function DiagnosisPage() {
  return (
    <div className="min-h-screen flex flex-col text-foreground relative z-10">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <Activity className="w-8 h-8 animate-spin text-[#F0B90B]" />
          </div>
        }
      >
        <DiagnosisContent />
      </Suspense>
    </div>
  );
}
