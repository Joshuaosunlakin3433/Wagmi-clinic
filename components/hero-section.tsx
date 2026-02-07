"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function HeroSection() {
  return (
    <>
      {/* Headline */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="text-6xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] text-center
          text-black
          dark:text-white dark:drop-shadow-[0_0_15px_rgba(240,185,11,0.4)]"
      >
        Is Your Wallet
        <br />
        Hurting?
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="mt-6 text-lg sm:text-xl text-center max-w-xl text-slate-500 dark:text-slate-400"
      >
        AI-powered diagnosis for Degen traders. We fix broken portfolios.
      </motion.p>
    </>
  );
}
