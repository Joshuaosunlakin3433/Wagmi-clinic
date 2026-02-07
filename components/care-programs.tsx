"use client";

import { motion } from "framer-motion";
import { Zap, BookOpen, Users, CheckSquare } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface CareCard {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  items: string[];
  footer: string;
}

const cards: CareCard[] = [
  {
    icon: Zap,
    title: "Urgent Care",
    subtitle: "Instant analysis of shitcoins",
    items: [
      "Real-time token scanning",
      "Rug-pull detection AI",
      "Contract security audit",
      "Liquidity health check",
    ],
    footer: "Emergency intervention within 60 seconds",
  },
  {
    icon: BookOpen,
    title: "Physical Therapy",
    subtitle: "Educational docs to rebuild strength",
    items: [
      "DeFi fundamentals course",
      "Risk management framework",
      "Portfolio diversification guide",
      "Tax optimization strategies",
    ],
    footer: "Strengthen your trading foundation",
  },
  {
    icon: Users,
    title: "Group Therapy",
    subtitle: "Community support & mentorship",
    items: [
      "Weekly community calls",
      "Expert trader Q&A sessions",
      "Recovery story sharing",
      "Accountability partnerships",
    ],
    footer: "You're not alone in this journey",
  },
];

export function CarePrograms() {
  return (
    <section className="w-full py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-[#F0B90B] text-black rounded-sm font-mono">
            Treatment Options
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white">
            Our Care Programs
          </h2>
          <p className="mt-3 text-lg text-slate-500 dark:text-slate-400 max-w-xl">
            Evidence-based recovery protocols for every type of wallet injury.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                className="flex flex-col p-6 border-2 border-black dark:border-[#F0B90B]/30
                  bg-white dark:bg-black/50
                  dark:hover:shadow-[0_0_20px_rgba(240,185,11,0.08)] transition-shadow"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 flex items-center justify-center
                  bg-black dark:bg-[#F0B90B] rounded-lg">
                  <Icon className="w-7 h-7 text-[#F0B90B] dark:text-black" />
                </div>

                {/* Title & Subtitle */}
                <h3 className="mt-5 text-xl font-bold text-black dark:text-white">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 italic">
                  {card.subtitle}
                </p>

                {/* Checklist */}
                <ul className="mt-5 space-y-3 flex-1">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckSquare className="w-4 h-4 mt-0.5 shrink-0 text-slate-800 dark:text-[#F0B90B]/70" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <hr className="my-5 border-slate-200 dark:border-white/10" />
                <p className="text-sm text-slate-500 dark:text-slate-400 font-mono italic">
                  {card.footer}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
