import { Activity } from "lucide-react";

const serviceLinks = [
  { label: "Wallet Analysis", href: "#" },
  { label: "Portfolio Recovery", href: "#" },
  { label: "Education Hub", href: "#" },
];

const communityLinks = [
  { label: "Discord", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Telegram", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-1 select-none">
              <span className="text-xl font-extrabold tracking-tighter text-black dark:text-white">
                WAGMI CLINI
              </span>
              <Activity
                className="w-5 h-5 text-[#F0B90B] -ml-0.5"
                strokeWidth={3}
              />
            </a>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Professional rehabilitation services for distressed crypto
              portfolios. Not financial advice.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-black dark:text-white">Services</h4>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-bold text-black dark:text-white">Community</h4>
            <ul className="mt-4 space-y-3">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 font-mono">
            © 2026 WAGMI CLINIC. All rights reserved. NGMI → WAGMI
          </p>
        </div>
      </div>
    </footer>
  );
}
