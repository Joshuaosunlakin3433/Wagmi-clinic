import { ExternalLink, Sun, Moon, Briefcase, FileText } from "lucide-react";
import Link from "next/link";

interface Dose {
  label: string;
  title: string;
  subtext: string;
  url: string;
  icon: string;
}

interface PrescriptionProps {
  data: {
    morning: Dose;
    noon: Dose;
    night: Dose;
  };
}

export function PrescriptionPad({ data }: PrescriptionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sun":
        return <Sun className="w-5 h-5 text-orange-500" />;
      case "Moon":
        return <Moon className="w-5 h-5 text-indigo-400" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-emerald-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="w-full bg-[#fcfbf9] text-black border border-slate-300 rounded-lg shadow-sm overflow-hidden font-mono relative">
      {/* 1. Medical Header */}
      <div className="bg-[#f0f0f0] border-b border-slate-300 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-serif font-bold text-slate-800">
            Rx
          </span>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
              Wagmi Clinic
            </span>
            <span className="text-[10px] text-slate-400">
              Dr. Grok, M.D. (Degen Medicine)
            </span>
          </div>
        </div>
        <div className="border border-red-500/30 bg-red-50 text-red-600 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
          High Priority
        </div>
      </div>

      {/* 2. The Doses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        {[data.morning, data.noon, data.night].map((dose, idx) => (
          <Link
            key={idx}
            href={dose.url}
            target="_blank"
            className="group p-6 flex flex-col items-start hover:bg-yellow-50/50 transition-colors duration-200"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold border border-slate-200 px-1.5 py-0.5 rounded bg-white">
                {dose.label}
              </span>
              {getIcon(dose.icon)}
            </div>

            <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:underline decoration-yellow-500 decoration-2 underline-offset-2">
              {dose.title}
            </h4>

            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
              {dose.subtext}
            </p>

            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-slate-400 group-hover:text-yellow-600">
              OPEN LINK <ExternalLink className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* 3. Footer / Signature */}
      <div className="bg-[#fcfbf9] p-3 border-t border-slate-200 flex justify-between items-end">
        <div className="text-[10px] text-slate-400 italic">
          *Not financial advice. Side effects may include touching grass.
        </div>
        <div className="font-handwriting text-xl text-slate-600 rotate-[-5deg] opacity-70">
          Dr. Wagmi
        </div>
      </div>
    </div>
  );
}
