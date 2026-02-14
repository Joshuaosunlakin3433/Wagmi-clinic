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

## Session 0 — Design (Figma AI)

### Prompt 0: Generate high-fidelity UI designs

**Tool:** Figma AI (not code — visual design generation)

```
Design a high-fidelity landing page for a Web3 app called "Wagmi Clinic".
The concept is a "Rehab Center for Crypto Wallets" that scans a user's blockchain
history and prescribes help.

Aesthetic & Vibe:
- Style: "Clinical Brutalism" mixed with "Swiss Design".
- Layout: Grid-based, high contrast, clean lines, plenty of whitespace (like a medical chart).
- Colors: Dominant "Sterile White" and "Slate Gray", with accents of "BNB Gold" (#F0B90B)
  and "Emergency Red" for error states.
- Typography: Large, bold sans-serif headings (Helvetica/Inter style) with monospace
  fonts for data numbers.

Key Sections:
1. Hero Section: "Is Your Wallet Hurting?" headline, wallet address input, "Admit Patient" button.
2. Dashboard Preview (Bento Grid): "Wallet Health Score: 32/100 (Critical Condition)",
   "Loss Trajectory" graph dipping down, "Prescription" list.
3. Treatments Section: Three cards — "Urgent Care", "Physical Therapy", "Group Therapy".
4. Logo: "WAGMI CLINIC" with a "+"/pulse symbol integrated into the branding.
```

**What Figma AI did:**

- Generated 4 high-fidelity screens:
  - `Homepage- 1.png` — Landing page with hero, input, and stats
  - `Patient dashboard - 2.png` — Bento grid diagnosis dashboard
  - `Treatment options- 3.png` — Care programs section
  - `Footer -4.png` — Footer layout
- These designs were then translated into code by Claude 3.5 Sonnet via GitHub Copilot
- Original artifacts preserved in `/assets` folder as proof of the vibecoding workflow

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

## Session 4 — Background Pattern Evolution

### Prompt 6: Replace grid with surgical crosshair pattern

```
Replace the bg-grid-pattern in globals.css with a bg-surgical-pattern — a crosshair "+"
mark SVG pattern. Use #F0B90B stroke, 60px viewBox, 100px background-size, and add a
"breathe" animation that oscillates opacity from 0.1 to 0.25 over 8 seconds.
```

**What AI did:**

- Removed old `.bg-grid-pattern` class entirely
- Created `.bg-surgical-pattern` with an inline SVG crosshair (`M30 25V35M25 30H35`, stroke `#F0B90B`, stroke-width 2)
- Added `@keyframes breathe` (8s ease-in-out, 0.1 → 0.25 opacity)
- The crosshair grid gives the entire site a subtle medical instrument overlay feel

---

### Prompt 7: Add scanline animation + fix background layering

```
Add a scanning beam effect — a yellow-tinted horizontal gradient that sweeps vertically
down the page infinitely. Also restructure layout.tsx so the crosshair pattern is fixed
to the viewport and visible behind all content using a z-index layering system.
```

**What AI did:**

- Added `@keyframes scanline` (translateY from -100% to 100vh, 4s linear infinite)
- Created `.animate-scanline` class (fixed position, yellow gradient `rgba(240,185,11,0.1)`, pointer-events:none)
- Restructured `layout.tsx` with a 4-layer z-index system:
  - z-[-2] — Solid base layer (bg-white / dark:bg-[#050505])
  - z-[-1] — Surgical crosshair pattern (fixed, full viewport)
  - z-[0] — Scanline sweep beam
  - z-[10] — Main content
- Removed `bg-background` from `<body>` to prevent overlap

**Lesson learned:** Fixed backgrounds need explicit z-index layering in Next.js layouts, not just stacking on `<body>`.

---

### Prompt 8: Transparent containers

```
Make all section containers (patient-dashboard, care-programs, cta-banner, footer)
transparent so the crosshair pattern flows seamlessly behind everything. Cards keep
their backgrounds for readability.
```

**What AI did:**

- Stripped `bg-white`, `bg-slate-50`, `bg-black`, `bg-[#050505]` from all section wrappers
- Kept card-level backgrounds (white/black) for contrast and readability
- The crosshair pattern now flows uninterrupted from hero to footer

---

## Session 5 — Interactivity + Micro-animations

### Prompt 9: Beating heart emoji in hero

```
Add a beating heart animation — the 🫀 emoji in the hero headline should pulse with
framer-motion scale [1, 1.2, 1] infinitely at 0.8s intervals.
```

**What AI did:**

- Wrapped `🫀` in a `motion.span` with `animate={{ scale: [1, 1.2, 1] }}` and `transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}`
- The heart now beats in the headline "Is Your W🫀llet Hurting?" — a subtle but memorable touch

---

### Prompt 10: Admit Patient input functionality

```
Make the "Admit Patient" input functional: useState for address, loading state
(isAdmitting), Enter key support, 800ms delay, then navigate to /diagnosis?address=...
Also add whileHover/whileTap framer-motion on the button.
```

**What AI did:**

- Added `useState(address)`, `useRouter()`, `isAdmitting` loading state
- `handleAdmit()`: validates input, sets loading, 800ms delay, then `router.push("/diagnosis?address=" + encodeURIComponent(address))`
- Enter key: `onKeyDown={(e) => e.key === "Enter" && handleAdmit()}`
- Button: `whileHover={{ scale: 1.05 }}`, `whileTap={{ scale: 0.98 }}`, swaps ArrowRight → Loader2 spinner when loading
- Disabled state styling during admission

---

## Session 6 — Diagnosis Page

### Prompt 11: Create the diagnosis route

```
Create app/diagnosis/page.tsx — a medical scanner UI:

Loading state (3 seconds):
- Pulsing Activity icon (scale + opacity animation)
- "SCANNING WALLET HISTORY..." title in monospace
- Animated progress bar (yellow, slides back and forth)
- Cycling scan messages every 800ms: "Checking Shitcoins...", "Analyzing Rug Pulls...",
  "Calculating Trauma...", etc.
- Show the wallet address being scanned

Loaded state:
- "Diagnosis Complete" card with ShieldAlert icon
- Truncated wallet address, CRITICAL status badge (red), 32/100 health score
- Placeholder for full treatment plan

Use Suspense boundary for useSearchParams, AnimatePresence for message transitions.
```

**What AI did:**

- Created `app/diagnosis/page.tsx` with `DiagnosisContent` (reads `?address=` from search params) wrapped in Suspense
- Loading state: `motion.div` pulsing icon, `AnimatePresence mode="wait"` for cycling messages, progress bar with `animate={{ x: ["-100%", "100%"] }}`
- Loaded state: bordered card with patient info table (address, CRITICAL badge, 32/100 score)
- 6 cycling scan messages for entertainment during the 3s fake scan
- Clean `font-mono` medical aesthetic throughout

---

## Session 7 — API Route + Diagnosis Dashboard

### Prompt 12: Create the diagnosis API route with chart data

```
Create app/api/diagnose/route.ts with mock wallet diagnosis logic.

1. Keep simulated delay (2.5s), score calculation.
2. Add generateHistory() — 30 data points representing last 30 days.
   - If address starts with "0x00" (Critical): downward trend (start high, end low).
   - Otherwise: volatile chop or upward trend.
3. Return JSON: { address, score, status, history: [{ day, value }] }
```

**What AI did:**

- Created `app/api/diagnose/route.ts` with GET handler
- `generateHistory(isCritical)`: generates 30 `{ day, value }` data points — critical wallets bleed from ~1000 with dead-cat bounces, healthy wallets chop around ~500 with upward bias
- Score logic: `0x00` addresses get 10–34 (CRITICAL), others get 50–89 (STABLE/UNSTABLE)
- Status derived from score thresholds: <35 CRITICAL, <60 UNSTABLE, else STABLE
- Full JSON response: `{ address, score, status, history }`

---

### Prompt 13: Create the WalletChart component

```
Create components/diagnosis/wallet-chart.tsx using recharts.

1. AreaChart with linearGradient fill, 300px height, transparent background.
2. Color: CRITICAL = red (#ef4444), else yellow (#F0B90B).
3. Hide axis lines, keep tick text (fill: #666, monospace).
4. Tooltip: black background, yellow border, white text.
5. Props: history: { day, value }[] and status: string.
```

**What AI did:**

- Created `components/diagnosis/wallet-chart.tsx` with Recharts `ResponsiveContainer` + `AreaChart`
- `linearGradient` id `colorValue` fading from 40% opacity to transparent
- Color-coded by status: red for CRITICAL, BNB yellow for everything else
- Clean monospace tick text, hidden axis lines, custom dark tooltip with `#F0B90B` border
- Installed `recharts` dependency

---

### Prompt 14: Add roasts and treatments to API

```
Update app/api/diagnose/route.ts to include roasts and treatments.

1. getRoast(status): Returns { title, message } — "Terminal Bagholder" (CRITICAL),
   "Paper Hands" (UNSTABLE), "Stablecoin Sedative" (STABLE).
2. getTreatments(status): Returns array of { title, url, type } links —
   DoraHacks/McDonalds/Wendy's for critical, Leverage Docs/Airdrops for stable.
3. Return expanded JSON with roast and treatments fields.
```

**What AI did:**

- Added `getRoast()` switch-case returning themed roast titles and messages per status
- Added `getTreatments()` returning 3 prescription links with type badges (Earn/Job/Cope for critical, Risk/Alpha/Wellness for stable)
- Updated GET response: `{ address, score, status, history, roast, treatments }`

---

### Prompt 15: Refactor diagnosis page to full bento grid dashboard

```
Refactor app/diagnosis/page.tsx to display the full diagnosis dashboard.

1. Bento Grid layout:
   - Top Left: Patient Info Card (wallet address, status badge, large health score)
   - Top Right: WalletChart component (30-day trajectory)
   - Bottom (full width): Diagnosis Card — roast title (yellow heading), roast message
     (monospace), treatments as clickable link buttons with type badges
2. Glassy Obsidian styling: bg-black/40 border border-[#F0B90B]/30 backdrop-blur-sm
3. Decorative Print button icon in header (just for vibe)
4. Fetch from /api/diagnose, with abort controller + error fallback
```

**What AI did:**

- Updated `DiagnosisData` type to include `roast: { title, message }` and `treatments: [{ title, url, type }]`
- Replaced single diagnosis card with 2-column CSS Grid bento layout
- Top Left: Patient file card with full address, dynamic status badge, `5xl` color-coded health score
- Top Right: `WalletChart` component consuming `history` data from API
- Bottom: Full-width diagnosis card — `roast.title` as large `#F0B90B` heading, `roast.message` in monospace, treatments rendered as styled `<a>` links with color-coded type badges (Earn=green, Job=amber, Cope=red, Risk=purple, Alpha=blue)
- Added Printer icon button in header for clinical aesthetic
- Error fallback includes empty roast/treatments so UI never breaks
- Staggered `motion.div` entrance animations on each card

---

## Session 8 — Grok Roasts + Prescription Pad

### Prompt 16: Populate GROK_ROASTS with 15 savage roasts

```
Populate the GROK_ROASTS constant with 15 hardcoded savage roasts.
Persona: Grok — savage, unhinged, loves roasting crypto degens.
Categories: CRITICAL (exit liquidity), UNSTABLE (paper hands), STABLE (boring).
Must be funny to AVERAGE people, not just crypto natives.
```

**What AI did:**

- Replaced the old 3-roast `getRoast()` switch with a `GROK_ROASTS` dictionary containing 15 roasts (5 per status)
- CRITICAL: "Financial Crime Scene", "Human ATM Machine", "The Reverse Midas", "Professional Bag Holder", "Scam Subscriber"
- UNSTABLE: "Panic Button Champion", "Trend Chaser Deluxe", "3 AM Decision Maker", "FOMO Patient Zero", "The Overthinker"
- STABLE: "The Human Savings Account", "Allergic to Fun", "The HODLer Fossil", "Spreadsheet Surgeon", "The Quiet Winner"
- Random selection per request so repeat visits get different roasts
- Rewrote all messages to be universally funny (no heavy crypto jargon)

---

### Prompt 17: Replace treatments with T.I.D Prescription system

```
Replace the old getTreatments() with a T.I.D (three times daily) prescription protocol.

1. YOUTUBE_VIDEOS array — 6 motivational video links
2. CRYPTO_QUOTES array — 6 crypto quotes (Satoshi, Vitalik, etc.)
3. getPrescription(status) returns { morning, noon, night } doses:
   - Morning (Hope): Random motivational video + truncated quote
   - Noon (Grind): DoraHacks for critical/unstable, BNB Airdrops for stable
   - Night (Cope): Touch Grass Protocol (lo-fi beats link)
4. Updated GET response: "prescription" replaces "treatments"
```

**What AI did:**

- Added `YOUTUBE_VIDEOS` (6 motivational links) and `CRYPTO_QUOTES` (6 quotes from Satoshi, Vitalik, Hal Finney, Saylor)
- Created `getPrescription(status)` returning 3 doses with `{ label, title, subtext, url, icon }` each
- Morning dose randomizes video + quote, Noon adapts by status, Night is always Touch Grass
- API response now returns `prescription: { morning, noon, night }` instead of `treatments: []`

---

### Prompt 18: Create PrescriptionPad component + wire into dashboard

```
Create components/diagnosis/prescription-pad.tsx — a medical Rx pad UI.

1. Medical header with "Rx" serif logo, "Wagmi Clinic" branding, "High Priority" badge
2. 3-column dose grid (morning/noon/night) with icon mapping (Sun/Moon/Briefcase)
3. Each dose is a clickable Link with hover underline + "OPEN LINK" footer
4. Footer with italic disclaimer + "Dr. Wagmi" signature (rotated handwriting style)
5. Wire into diagnosis page, replacing old treatments section
```

**What AI did:**

- Created `components/diagnosis/prescription-pad.tsx` with `PrescriptionPad` component
- Medical header: serif "Rx", clinic name, "Dr. Grok, M.D. (Degen Medicine)", red High Priority badge
- 3-column responsive grid with `divide-x` separators, hover states (`bg-yellow-50/50`)
- Icon mapping via `getIcon()` switch (Sun → orange, Moon → indigo, Briefcase → emerald)
- Footer: "\*Not financial advice. Side effects may include touching grass." + tilted signature
- Updated `DiagnosisData` type to use `prescription: { morning, noon, night }` instead of `treatments`
- Removed unused imports (`ExternalLink`, `Pill`) and `typeBadge` constant from diagnosis page
- Error fallback includes placeholder prescription doses

---

## Project Structure (Current)

```
wagmi-clinic/
├── app/
│   ├── api/
│   │   └── diagnose/
│   │       └── route.ts         # GET /api/diagnose (score, history, roast, prescription)
│   ├── diagnosis/
│   │   └── page.tsx             # Scanner loading UI → Bento Grid dashboard
│   ├── globals.css              # Clinical theme, surgical pattern, scanline, breathe
│   ├── layout.tsx               # ThemeProvider + 4-layer z-index background system
│   └── page.tsx                 # Composes all landing page sections
├── components/
│   ├── diagnosis/
│   │   ├── wallet-chart.tsx     # Recharts AreaChart (color-coded by status)
│   │   └── prescription-pad.tsx # Medical Rx pad (3 doses, clickable links)
│   ├── theme-provider.tsx       # next-themes wrapper
│   ├── navbar.tsx               # Fixed glassmorphism nav with theme toggle
│   ├── hero-section.tsx         # Beating 🫀 headline + subheadline
│   ├── admit-patient.tsx        # Wallet input with loading state + navigation
│   ├── stats-bar.tsx            # Social proof numbers
│   ├── patient-dashboard.tsx    # Health score, loss trajectory, prescriptions
│   ├── care-programs.tsx        # 3-column treatment cards
│   ├── cta-banner.tsx           # Yellow CTA section
│   └── footer.tsx               # Links + NGMI → WAGMI copyright
├── lib/
│   ├── animations.ts            # Shared fadeUp variants (typed ease tuple)
│   └── utils.ts                 # cn() helper from shadcn
├── CONTEXT.md                   # Project vision document
└── VIBELOG.md                   # ← You are here
```

---

## How to Reproduce This Project

1. Create a new folder and open it in VS Code with GitHub Copilot enabled
2. Feed each prompt above (Prompts 1–18) sequentially into the AI chat
3. Accept the generated code and let Copilot fix any build errors
4. Run `npm run dev` to see the result

Each prompt builds on the previous one. The AI handles all file creation, dependency installation, and error fixing.

---

## Tech Stack

| Tool                    | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| Next.js 16 (App Router) | Framework                                    |
| TypeScript              | Type safety                                  |
| Tailwind CSS v4         | Styling                                      |
| shadcn/ui               | Component primitives                         |
| framer-motion           | Animations (fadeUp, heartbeat, scanline)     |
| lucide-react            | Icons (Activity, ShieldAlert, Loader2, etc.) |
| next-themes             | Dark mode (class-based)                      |
| recharts                | Chart visualization (AreaChart, Tooltip)     |
| clsx + tailwind-merge   | Class utilities                              |

---

## Design System

| Token      | Light     | Dark                   |
| ---------- | --------- | ---------------------- |
| Background | `#FFFFFF` | `#050505` (Obsidian)   |
| Foreground | `#000000` | `#FFFFFF`              |
| Accent     | `#F0B90B` | `#F0B90B` (BNB Yellow) |
| Border     | `black`   | `#F0B90B/30`           |
| Cards      | `white`   | `black/50`             |

**Background Layers (layout.tsx):**

- z-[-2]: Solid color base
- z-[-1]: Surgical crosshair pattern (SVG "+" marks, breathing animation)
- z-[0]: Scanline sweep beam (yellow gradient, 4s loop)
- z-[10]: Content
- z-[50]: Navbar

---

## Session 9 — Smart Contract + On-Chain Integration

### Prompt 19: Create Soulbound Token (SBT) contract

```
Create a Solidity smart contract (WagmiClinicSBT.sol) that mints a non-transferable
ERC-721 "Soulbound Token" for each diagnosis.

1. Stores diagnosis data: status, score, roast title, timestamp.
2. Generates fully on-chain tokenURI with Base64-encoded JSON metadata.
3. Blocks transfers (Soulbound) with a custom revert message.
4. Uses OpenZeppelin ERC721 + Ownable.
```

**What AI did:**

- Created `contract/WagmiClinicSBT.sol` using Solidity ^0.8.20
- `Diagnosis` struct storing status, score, roast, and date
- `mintDiagnosis()` public function — anyone can mint their record
- `tokenURI()` generates fully on-chain JSON (name, description, image, attributes) encoded in Base64
- `_update()` override blocks all transfers with: `"Dr. Wagmi says: This medical record is non-transferable."`
- Deployed to BNB Smart Chain Testnet at `0x51868Fd46910adb4772Ef42CC7D8e426bebCA13e`

---

### Prompt 20: Wagmi/Viem providers + wallet connection setup

```
Create a Providers component that wraps the app with WagmiProvider (BSC Testnet),
TanStack QueryClientProvider, and Sonner toast notifications. Configure injected
wallet connector with BNB Testnet RPC.
```

**What AI did:**

- Created `components/providers.tsx` with `WagmiProvider`, `QueryClientProvider`, Sonner `Toaster`
- Configured `createConfig` for `bscTestnet` chain with injected connector and public RPC
- Styled toast notifications to match the dark/gold clinical theme
- Updated `layout.tsx` to wrap app with `<Providers>`

---

### Prompt 21: MintButton component — on-chain SBT minting

```
Create components/diagnosis/mint-button.tsx — a button that mints the user's diagnosis
as a Soulbound Token on BNB Testnet.

1. Connect wallet if not connected (injected connector).
2. Auto-switch to BSC Testnet (chainId 97) if on wrong chain.
3. Call mintDiagnosis(status, score, roast) on the deployed contract.
4. Show states: Connect → Switch Chain → Mint → Confirming → Success (with tx link).
5. Use wagmi hooks: useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt.
```

**What AI did:**

- Created `MintButton` with full state machine: disconnected → wrong chain → ready → pending → confirming → success
- Each state renders a unique button (Wallet icon, AlertTriangle, Stamp, Loader2, CheckCircle2)
- Success state links to BscScan testnet explorer with the transaction hash
- Wired into the diagnosis dashboard with `status`, `score`, and `roast` props
- Uses `sonner` toasts for error feedback

---

### Prompt 22: Dynamic GRIND_OPPORTUNITIES + prescription refinements

```
Add a GRIND_OPPORTUNITIES array with BNB ecosystem links (opBNB, Airdrop Alliance,
DoraHacks, Binance Labs). Update getPrescription to randomly pick from this array for
CRITICAL/UNSTABLE wallets, and show DeFi Alpha for STABLE wallets. Use full quotes
for morning subtext instead of truncating.
```

**What AI did:**

- Added `GRIND_OPPORTUNITIES` array (4 entries: opBNB, Airdrop Alliance, DoraHacks, Binance Labs)
- Noon dose: CRITICAL/UNSTABLE randomly selects from grind opportunities; STABLE gets "DeFi Leverage Strategies"
- Morning subtext now shows full `randomQuote` instead of `.substring(0, 50) + "..."`
- Added "Lawyer Up" comment block at top of `route.ts` explaining the architecture for judges

---

## Project Structure (Current)

```
wagmi-clinic/
├── app/
│   ├── api/
│   │   └── diagnose/
│   │       └── route.ts         # GET /api/diagnose (score, history, roast, prescription)
│   ├── diagnosis/
│   │   └── page.tsx             # Scanner loading UI → Bento Grid dashboard
│   ├── globals.css              # Clinical theme, surgical pattern, scanline, breathe
│   ├── layout.tsx               # Providers + ThemeProvider + 4-layer z-index system
│   └── page.tsx                 # Composes all landing page sections
├── components/
│   ├── diagnosis/
│   │   ├── wallet-chart.tsx     # Recharts AreaChart (color-coded by status)
│   │   ├── prescription-pad.tsx # Medical Rx pad (3 doses, clickable links)
│   │   └── mint-button.tsx      # On-chain SBT minting (BSC Testnet)
│   ├── providers.tsx            # WagmiProvider + QueryClient + Sonner
│   ├── theme-provider.tsx       # next-themes wrapper
│   ├── navbar.tsx               # Fixed glassmorphism nav with theme toggle
│   ├── hero-section.tsx         # Beating 🫀 headline + subheadline
│   ├── admit-patient.tsx        # Wallet input with loading state + navigation
│   ├── stats-bar.tsx            # Social proof numbers
│   ├── patient-dashboard.tsx    # Health score, loss trajectory, prescriptions
│   ├── care-programs.tsx        # 3-column treatment cards
│   ├── cta-banner.tsx           # Yellow CTA section
│   └── footer.tsx               # Links + NGMI → WAGMI copyright
├── contract/
│   └── WagmiClinicSBT.sol       # Soulbound ERC-721 (deployed on BSC Testnet)
├── lib/
│   ├── animations.ts            # Shared fadeUp variants (typed ease tuple)
│   └── utils.ts                 # cn() helper from shadcn
├── CONTEXT.md                   # Project vision document
├── VIBELOG.md                   # ← You are here
└── README.md                    # Hackathon submission README
```

---

## How to Reproduce This Project

1. Create a new folder and open it in VS Code with GitHub Copilot enabled
2. Feed each prompt above (Prompts 1–22) sequentially into the AI chat
3. Accept the generated code and let Copilot fix any build errors
4. Run `npm run dev` to see the result

Each prompt builds on the previous one. The AI handles all file creation, dependency installation, and error fixing.

---

## Tech Stack

| Tool                    | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| Next.js 16 (App Router) | Framework                                      |
| TypeScript              | Type safety                                    |
| Tailwind CSS v4         | Styling                                        |
| shadcn/ui               | Component primitives                           |
| framer-motion           | Animations (fadeUp, heartbeat, scanline)       |
| lucide-react            | Icons (Activity, ShieldAlert, Loader2, etc.)   |
| next-themes             | Dark mode (class-based)                        |
| recharts                | Chart visualization (AreaChart, Tooltip)       |
| wagmi + viem            | Wallet connection + contract interaction (BSC) |
| @tanstack/react-query   | Async state management for wagmi               |
| @rainbow-me/rainbowkit  | Wallet UI kit                                  |
| sonner                  | Toast notifications                            |
| OpenZeppelin            | ERC-721 + Ownable contracts                    |
| clsx + tailwind-merge   | Class utilities                                |

---

## Design System

| Token      | Light     | Dark                   |
| ---------- | --------- | ---------------------- |
| Background | `#FFFFFF` | `#050505` (Obsidian)   |
| Foreground | `#000000` | `#FFFFFF`              |
| Accent     | `#F0B90B` | `#F0B90B` (BNB Yellow) |
| Border     | `black`   | `#F0B90B/30`           |
| Cards      | `white`   | `black/50`             |

**Background Layers (layout.tsx):**

- z-[-2]: Solid color base
- z-[-1]: Surgical crosshair pattern (SVG "+" marks, breathing animation)
- z-[0]: Scanline sweep beam (yellow gradient, 4s loop)
- z-[10]: Content
- z-[50]: Navbar

---

## TODO (Upcoming Sessions)

- [x] API route with mock diagnosis logic + chart data
- [x] WalletChart component (Recharts AreaChart)
- [x] AI roast logic — personalized wallet roast based on status
- [x] Grok-style roasts — 15 universally funny savage roasts
- [x] T.I.D Prescription system (morning/noon/night doses)
- [x] PrescriptionPad component (medical Rx pad UI)
- [x] Bento Grid diagnosis dashboard
- [x] Smart contract: Soulbound ERC-721 (deployed on BSC Testnet)
- [x] Wallet connection: WagmiProvider + injected connector
- [x] MintButton: on-chain SBT minting from diagnosis page
- [x] GRIND_OPPORTUNITIES: dynamic ecosystem links in prescription
- [ ] Connect real wallet data (BNB Chain / BSC RPC)
- [ ] Live Grok API integration (xAI) for real-time roasts
- [ ] Live demo deployment (Vercel)
- [ ] Mobile responsive polish

---

_This log will be updated as development continues._
