"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { fadeUp } from "@/lib/animations";

export function AdmitPatient() {
  const [address, setAddress] = useState("");
  const [isAdmitting, setIsAdmitting] = useState(false);
  const router = useRouter();

  const handleAdmit = async () => {
    if (!address.trim()) return;
    setIsAdmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/diagnosis?address=" + encodeURIComponent(address.trim()));
  };

  return (
    <motion.div
      id="admit-patient"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={2}
      className="mt-12 w-full max-w-xl scroll-mt-24"
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdmit()}
          placeholder="Enter Wallet Address (0x...)"
          disabled={isAdmitting}
          className="flex-1 px-5 py-4 text-base bg-transparent outline-none placeholder:text-slate-400
            dark:placeholder:text-slate-500 text-black dark:text-white disabled:opacity-50"
        />
        <motion.button
          onClick={handleAdmit}
          disabled={isAdmitting}
          whileHover={isAdmitting ? {} : { scale: 1.05 }}
          whileTap={isAdmitting ? {} : { scale: 0.98 }}
          className={`group flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all
            bg-black text-white hover:bg-black/85
            dark:bg-[#F0B90B] dark:text-black dark:hover:bg-[#F0B90B]/90
            whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed
            ${isAdmitting ? "animate-pulse" : ""}`}
        >
          {isAdmitting ? "Admitting..." : "Admit Patient"}
          {isAdmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
