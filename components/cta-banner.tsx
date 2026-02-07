"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function CtaBanner() {
  return (
    <section className="w-full py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="bg-[#F0B90B] border-2 border-black dark:border-[#F0B90B] p-12 sm:p-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
            Ready to start your recovery?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-black/70 max-w-lg mx-auto">
            Join thousands of traders who&apos;ve transformed their portfolios with our proven treatment plans.
          </p>
          <button className="mt-8 inline-flex items-center gap-2 px-10 py-4 bg-black text-white font-bold text-base rounded-lg hover:bg-black/85 transition-colors">
            Begin Treatment Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
