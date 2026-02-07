# VIBELOG.md — AI Build Log

> **Project:** Wagmi Clinic — AI-powered wallet diagnosis for Degen traders  
> **Hackathon:** [Good Vibes Only: OpenClaw Edition](https://dorahacks.io/hackathon/goodvibes/detail) (BNB Chain)  
> **Track:** Consumer / DeFi  
> **Builder:** Joshuaosunlakin3433  
> **AI Tool:** GitHub Copilot (Claude) in VS Code  
> **Date Started:** February 7, 2026  

---

## Why This File Exists

The hackathon encourages builders to show how AI was used during development.  
This file is a **prompt-by-prompt log** of every major step — so judges (and anyone else) can **reproduce the entire project** by feeding these prompts into an AI coding assistant.

---

## Session 1 — Project Scaffolding

### Prompt 1: Initialize the project

```
npx create-next-app@latest wagmi-clinic --typescript --tailwind --eslint
cd wagmi-clinic
npx shadcn@latest init
npm install lucide-react framer-motion clsx tailwind-merge
```

**What AI did:**
- Created a Next.js 16 app with TypeScript, Tailwind CSS v4, ESLint, App Router
- Initialized shadcn/ui with default config (Slate theme, CSS variables)
- Installed lucide-react, framer-motion, clsx, tailwind-merge

---

### Prompt 2: Custom theme utilities in globals.css

```
Update app/globals.css to add our "Clinical + Obsidian" theme utilities.

1. Keep the standard Tailwind directives.
2. Add custom utility classes:
   - .bg-noise: Adds a subtle grain texture (base64 SVG noise)
   - .bg-grid-pattern: Background grid pattern (slate-200 light, slate-800 dark)
   - .animate-glow-pulse: Slow breathing opacity animation for gold accents
3. Root Variables:
   - :root — --background: 0 0% 100%; --foreground: 0 0% 0%; --accent: #F0B90B;
   - .dark — --background: 0 0% 3%; --foreground: 0 0% 100%; --border: #F0B90B;
4. Body: min-h-screen font-sans antialiased bg-background text-foreground bg-noise
```

**What AI did:**
- Replaced shadcn's default oklch variables with the clinical theme
- Added `.bg-noise` using an inline SVG `feTurbulence` filter at 4% opacity
- Added `.bg-grid-pattern` with light/dark variants using hardcoded hex colors
- Added `.animate-glow-pulse` keyframes (3s ease-in-out, 0.6 → 1 opacity)
- Fixed Tailwind v4 compatibility: moved custom classes outside `@layer utilities` (Tailwind v4 can't `@apply` classes defined in `@layer utilities`)

**Lesson learned:** Tailwind v4 handles custom utility layers differently than v3. The AI caught and fixed the build error automatically.

---

## Session 2 — Landing Page (Hero)

### Prompt 3: Build the full landing page

```
Rewrite app/page.tsx to build the "Wagmi Clinic" Landing Page.

1. Layout: bg-noise, bg-grid-pattern, min-h-screen flex flex-col
2. Navbar (Fixed): Glassmorphism, "WAGMI CLINIC" logo with Activity icon in #F0B90B,
   nav links, theme toggle, "Emergency Scan" CTA
3. Hero: "IS YOUR WALLET HURTING?" headline (text-7xl, dark mode yellow glow),
   subheadline about AI diagnosis
4. Admit Patient Input: Large bordered input + "Admit Patient" button with ArrowRight
5. Stats Bar: "2,847 wallets treated • $12.4M recovered • 94% success rate" in monospace
6. Use framer-motion fadeUp animations, lucide-react icons, next-themes for dark mode
```

**What AI did:**
- Installed `next-themes`, created `ThemeProvider` wrapper component
- Updated `layout.tsx` with ThemeProvider (attribute="class", suppressHydrationWarning)
- Built the full page with framer-motion `fadeUp` variants (staggered custom delay)
- Added decorative glow blob for dark mode (`bg-[#F0B90B]/10 blur-[120px]`)
- Fixed TypeScript error: cast ease array as `[number, number, number, number]` tuple

---

### Prompt 4: Component-based refactor

```
Refactor app/page.tsx to use component-based approach
```

**What AI did:**
- Extracted shared animation config → `lib/animations.ts`
- Split into 4 focused components:
  - `components/navbar.tsx` — Glassmorphism nav + theme toggle (client component)
  - `components/hero-section.tsx` — Headline + subheadline with fadeUp
  - `components/admit-patient.tsx` — Wallet input with local useState
  - `components/stats-bar.tsx` — Data-driven stats from array
- `app/page.tsx` became a clean ~28-line server component composing everything

---

## Session 3 — Below-the-Fold Sections

### Prompt 5: Patient Dashboard, Care Programs, CTA, Footer

```
Create components for the Patient Dashboard, Care Programs, CTA Banner, and Footer
based on the Figma design screenshots.

Design Rules:
- 3-column grid (1 col mobile)
- Cards: border-2 border-black (light) / border-[#F0B90B]/30 with hover glow (dark)
- Icons: Black box + Yellow icon (light) / Yellow box + Black icon (dark)
- Checklists: lucide-react CheckSquare icons
```

**What AI did:**
- `components/patient-dashboard.tsx` — Wallet Health Score (32/100, critical), Loss Trajectory (-68% with SVG mini-chart), Prescription cards
- `components/care-programs.tsx` — 3 cards (Urgent Care, Physical Therapy, Group Therapy) with icon boxes, CheckSquare checklists, italic footers
- `components/cta-banner.tsx` — Yellow banner with "Ready to start your recovery?" and "Begin Treatment Now" button
- `components/footer.tsx` — Brand column, Services links, Community links, copyright with "NGMI → WAGMI"
- Updated `page.tsx` to import and compose all sections in order

---

## Project Structure (Current)

```
wagmi-clinic/
├── app/
│   ├── globals.css          # Clinical + Obsidian theme, noise/grid/glow utilities
│   ├── layout.tsx           # Root layout with ThemeProvider
│   └── page.tsx             # Composes all section components
├── components/
│   ├── theme-provider.tsx   # next-themes wrapper
│   ├── navbar.tsx           # Fixed glassmorphism nav
│   ├── hero-section.tsx     # Headline + subheadline
│   ├── admit-patient.tsx    # Wallet address input
│   ├── stats-bar.tsx        # Social proof numbers
│   ├── patient-dashboard.tsx # Health score, trajectory, prescription
│   ├── care-programs.tsx    # 3-column treatment cards
│   ├── cta-banner.tsx       # Yellow CTA section
│   └── footer.tsx           # Links + copyright
├── lib/
│   ├── animations.ts        # Shared framer-motion variants
│   └── utils.ts             # cn() helper from shadcn
└── VIBELOG.md               # ← You are here
```

---

## How to Reproduce This Project

1. Create a new folder and open it in VS Code with GitHub Copilot enabled
2. Feed each prompt above (Prompts 1–5) sequentially into the AI chat
3. Accept the generated code and let Copilot fix any build errors
4. Run `npm run dev` to see the result

Each prompt builds on the previous one. The AI handles all file creation, dependency installation, and error fixing.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui | Component primitives |
| framer-motion | Animations |
| lucide-react | Icons |
| next-themes | Dark mode |
| clsx + tailwind-merge | Class utilities |

---

## TODO (Upcoming Sessions)

- [ ] Connect real wallet data (BNB Chain / BSC RPC)
- [ ] Onchain proof: deploy contract or generate tx hash on BSC/opBNB
- [ ] Live demo deployment (Vercel)
- [ ] Actual AI diagnosis logic for wallet analysis
- [ ] Mobile responsive polish
- [ ] Community voting + social sharing features

---

*This log will be updated as development continues.*
