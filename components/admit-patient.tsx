"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";

export function AdmitPatient() {
  const [wallet, setWallet] = useState("");

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={2}
      className="mt-12 w-full max-w-xl"
    >
      <div
        className="flex flex-col sm:flex-row gap-3 w-full p-2
          border-2 border-black rounded-2xl
          dark:border dark:border-[#F0B90B]/50 dark:rounded-2xl
          bg-white dark:bg-white/5
          shadow-sm dark:shadow-[0_0_30px_rgba(240,185,11,0.06)]"
      >
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Enter Wallet Address (0x...)"
          className="flex-1 px-5 py-4 text-base bg-transparent outline-none placeholder:text-slate-400
            dark:placeholder:text-slate-500 text-black dark:text-white"
        />
        <button
          className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all
            bg-black text-white hover:bg-black/85
            dark:bg-[#F0B90B] dark:text-black dark:hover:bg-[#F0B90B]/90
            whitespace-nowrap"
        >
          Admit Patient
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
