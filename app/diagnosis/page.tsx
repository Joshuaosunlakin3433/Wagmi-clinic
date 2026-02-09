"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { WalletChart } from "@/components/diagnosis/wallet-chart";
import { Activity, ShieldAlert, TrendingDown, Pill } from "lucide-react";

// ── Types ──
interface DiagnosisData {
  address: string;
  score: number;
  status: "CRITICAL" | "UNSTABLE" | "STABLE";
  history: { day: string; value: number }[];
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

// ── Shared card class ──
const card = "border border-[#F0B90B]/30 bg-white dark:bg-black/50 p-6";

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
          // Fallback so UI doesn't hang
          setData({
            address,
            score: 32,
            status: "CRITICAL",
            history: [],
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
        {/* Pulsing icon */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <Activity className="w-16 h-16 text-[#F0B90B]" strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center text-black dark:text-white font-mono">
          SCANNING WALLET HISTORY...
        </h1>

        {/* Pulsing bar */}
        <div className="w-64 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#F0B90B] rounded-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            style={{ width: "40%" }}
          />
        </div>

        {/* Cycling messages */}
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

        {/* Address being scanned */}
        <p className="text-xs font-mono text-slate-400 dark:text-slate-600 break-all max-w-sm text-center">
          Patient: {address}
        </p>
      </div>
    );
  }

  if (!data) return null;

  const { score, status, history } = data;

  // ─── Loaded: Bento Grid Dashboard ───
  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Section title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white mb-8 flex items-center gap-3">
          <ShieldAlert className="w-7 h-7 text-[#F0B90B]" />
          Diagnosis Complete
        </h1>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ── Top Row: Patient Info (spans full width) ── */}
          <motion.div
            className={`${card} md:col-span-2`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Patient */}
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Patient
                </span>
                <p className="mt-1 text-sm font-mono text-black dark:text-white break-all">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              </div>

              {/* Status */}
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Status
                </span>
                <div className="mt-1">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-sm font-mono ${statusStyles[status]}`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* Health Score */}
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Health Score
                </span>
                <p
                  className={`mt-1 text-3xl font-extrabold font-mono ${scoreColor[status]}`}
                >
                  {score}
                  <span className="text-base text-slate-400">/100</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Middle Left: Roast Card ── */}
          <motion.div
            className={card}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-[#F0B90B]" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                Doctor&apos;s Notes
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {status === "CRITICAL"
                ? "This wallet shows signs of severe portfolio hemorrhaging. Multiple rug-pull exposure events detected. The patient bought every top and sold every bottom with clinical precision. Immediate intervention required."
                : status === "UNSTABLE"
                  ? "The patient exhibits classic degen behavior — impulsive swaps, chasing narratives, and diamond-handing bags to zero. There is hope, but the prognosis remains uncertain."
                  : "A surprisingly healthy portfolio. The patient shows restraint, diversification, and actual profit-taking behavior. Rare specimen in this market. Continue monitoring."}
            </p>
            <p className="mt-4 text-xs font-mono text-slate-400 italic">
              — Dr. Wagmi, Chief Degen Surgeon
            </p>
          </motion.div>

          {/* ── Middle Right: Wallet Chart ── */}
          <motion.div
            className={card}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-[#F0B90B]" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                Wallet Trajectory (30d)
              </h2>
            </div>
            <WalletChart data={history} status={status} />
          </motion.div>

          {/* ── Bottom Row: Prescriptions placeholder (spans full width) ── */}
          <motion.div
            className={`${card} md:col-span-2`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Pill className="w-5 h-5 text-[#F0B90B]" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                Prescriptions
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 italic font-mono">
              Treatment plan loading... The pharmacy is being prepared.
            </p>
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
