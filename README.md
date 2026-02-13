<p align="center">
  <img src="https://img.shields.io/badge/BNB_Chain-F0B90B?style=for-the-badge&logo=binance&logoColor=black" />
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white" />
  <img src="https://img.shields.io/badge/Wagmi-35495e?style=for-the-badge&logo=ethereum&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<h1 align="center">🏥 Wagmi Clinic</h1>

<p align="center">
  <strong>The AI-Powered Emergency Room for Degen Wallets on BNB Chain</strong>
</p>

<p align="center">
  <em>Get roasted by Dr. Grok. Get prescribed real opportunities. Mint your diagnosis as a Soulbound Token.</em>
</p>

<p align="center">
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-the-problem">The Problem</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-smart-contract">Smart Contract</a> •
  <a href="#-system-architecture--roadmap">Architecture</a> •
  <a href="#-getting-started">Getting Started</a>
</p>

---

## 🎯 The Problem

**Millions of crypto users are losing money — and nobody's helping them learn from it.**

- 90% of retail traders lose money, yet there's no tool that turns those losses into actionable insight.
- Educational content is boring. Nobody reads a 40-page DeFi guide after getting rugged.
- There's no on-chain record of your journey — just scattered transactions across 15 wallets.

## 💡 The Solution

**Wagmi Clinic** is an AI triage center that turns your wallet's worst moments into entertainment, education, and ecosystem opportunities — all on BNB Chain.

> Think of it as WebMD meets Comedy Central, but for your crypto portfolio.

Instead of staring at charts and crying, users:

1. **Get a savage (but accurate) AI diagnosis** of their wallet health
2. **Receive a personalized prescription** of BNB Chain opportunities to recover
3. **Mint their diagnosis as a Soulbound Token** — a permanent, non-transferable on-chain medical record

---

## 🔁 How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│   1. ADMIT      │────▶│   2. DIAGNOSE    │────▶│   3. PRESCRIBE      │
│   Enter wallet  │     │   AI scans &     │     │   BNB ecosystem     │
│   address       │     │   roasts wallet  │     │   opportunities     │
└─────────────────┘     └──────────────────┘     └──────────┬──────────┘
                                                            │
                                                            ▼
                                                 ┌─────────────────────┐
                                                 │   4. MINT SBT       │
                                                 │   On-chain medical  │
                                                 │   record (BSC)      │
                                                 └─────────────────────┘
```

### Step 1: Admit Patient

Enter any wallet address on the landing page. The clinical UI with surgical crosshair patterns and scanline animations sets the mood.

### Step 2: AI Diagnosis

The **Diagnosis Engine** analyzes wallet patterns and generates:

- **Health Score** (0–100) with CRITICAL / UNSTABLE / STABLE status
- **30-Day Wallet Trajectory** chart (Recharts visualization)
- **Savage AI Roast** — one of 15 Grok-style personas that roast your trading habits in a way that's funny to _everyone_, not just crypto natives

### Step 3: T.I.D Prescription Protocol

A medical Rx pad UI delivers **three daily doses**:

| Dose                    | Purpose                 | Example                                                              |
| :---------------------- | :---------------------- | :------------------------------------------------------------------- |
| ☀️ **Morning (Hope)**   | Motivational fuel       | Crypto wisdom from Satoshi, Vitalik, Hal Finney                      |
| 🔨 **Noon (The Grind)** | BNB Chain opportunities | Build on opBNB, DoraHacks hackathons, Binance Labs, Airdrop Alliance |
| 🌙 **Night (Cope)**     | Rest & recovery         | Touch Grass Protocol (lo-fi beats)                                   |

### Step 4: Mint Soulbound Token

One click mints your diagnosis as a **non-transferable ERC-721** on BNB Smart Chain Testnet — a permanent on-chain medical record with:

- Health score as an NFT attribute
- Diagnosis status (CRITICAL/UNSTABLE/STABLE)
- Dr. Grok's roast title
- Fully on-chain metadata (Base64-encoded JSON, no IPFS dependency)

---

## 🛠 Tech Stack

| Layer              | Technology                      | Purpose                                      |
| :----------------- | :------------------------------ | :------------------------------------------- |
| **Framework**      | Next.js 16 (App Router)         | Full-stack React with server components      |
| **Language**       | TypeScript                      | End-to-end type safety                       |
| **Styling**        | Tailwind CSS v4 + shadcn/ui     | Clinical dark/gold design system             |
| **Animations**     | Framer Motion                   | Heartbeat, fadeUp, scanline effects          |
| **Charts**         | Recharts                        | 30-day wallet trajectory visualization       |
| **Wallet**         | Wagmi v3 + Viem                 | BNB Chain wallet connection & contract calls |
| **State**          | TanStack React Query            | Async state management for wallet ops        |
| **Toasts**         | Sonner                          | Themed notification system                   |
| **Icons**          | Lucide React                    | Medical-themed iconography                   |
| **Smart Contract** | Solidity ^0.8.20 + OpenZeppelin | Soulbound ERC-721 with on-chain metadata     |
| **Network**        | BNB Smart Chain Testnet         | Low-cost L1 for SBT minting                  |

---

## 📜 Smart Contract

**WagmiClinicSBT** — Deployed on BNB Smart Chain Testnet

| Detail           | Value                                                                                                                          |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| Contract Address | [`0x51868Fd46910adb4772Ef42CC7D8e426bebCA13e`](https://testnet.bscscan.com/address/0x51868Fd46910adb4772Ef42CC7D8e426bebCA13e) |
| Token Standard   | ERC-721 (Soulbound / Non-Transferable)                                                                                         |
| Network          | BSC Testnet (Chain ID: 97)                                                                                                     |
| Metadata         | Fully on-chain (Base64 JSON, no IPFS)                                                                                          |

### Key Features:

- **`mintDiagnosis(status, score, roast)`** — Public mint, stores diagnosis data on-chain
- **`tokenURI(tokenId)`** — Generates Base64-encoded JSON metadata with attributes
- **Soulbound** — `_update()` override blocks all transfers with: _"Dr. Wagmi says: This medical record is non-transferable."_

---

## 🧠 System Architecture & Roadmap

Wagmi Clinic is built to scale from a "Vibe Demo" to a fully autonomous AI Agent.

| Feature              | 🚧 Hackathon MVP (Current)                                                                   | 🚀 Mainnet Production (Vision)                                                                                                             |
| :------------------- | :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **Diagnosis Engine** | **Deterministic:** Algorithmic scoring based on mock wallet profiles for zero-latency demos. | **LLM-Powered:** Live connection to **Grok API** via LangChain to analyze transaction patterns in real-time.                               |
| **Data Source**      | **Static Snapshot:** Pre-verified list of opportunities (DoraHacks, Airdrops).               | **Live Indexer:** An autonomous crawler that listens to **The Graph** and **BNB Chain Governance** for new proposals and whitelists.       |
| **Smart Contract**   | **Soulbound Record:** Stores diagnosis metadata on-chain.                                    | **Reputation Protocol:** On-chain credit score system that allows users to unlock under-collateralized loans based on their "Wagmi Score." |

### Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  Next.js 16 • Tailwind • Framer Motion • Recharts            │
│  ┌──────────┐  ┌───────────────┐  ┌───────────────────────┐  │
│  │ Landing  │  │  Diagnosis    │  │  Wallet Connection    │  │
│  │ Page     │──│  Dashboard    │──│  (Wagmi + Viem)       │  │
│  └──────────┘  └───────┬───────┘  └───────────┬───────────┘  │
│                        │                      │              │
└────────────────────────┼──────────────────────┼──────────────┘
                         │                      │
                    ┌────▼────┐           ┌─────▼──────┐
                    │  API    │           │  BNB Chain  │
                    │ /api/   │           │  Testnet    │
                    │diagnose │           │  (SBT)     │
                    └─────────┘           └────────────┘
```

---

## 🎨 Design System

A **Clinical Obsidian** aesthetic — medical precision meets Web3 energy.

| Token      | Light     | Dark                     |
| :--------- | :-------- | :----------------------- |
| Background | `#FFFFFF` | `#050505` (Obsidian)     |
| Foreground | `#000000` | `#FFFFFF`                |
| Accent     | `#F0B90B` | `#F0B90B` (BNB Yellow)   |
| Border     | `black`   | `#F0B90B` at 30% opacity |

**Signature Effects:**

- 🏥 Surgical crosshair pattern (SVG `+` marks with breathing animation)
- 📡 Scanline sweep beam (yellow gradient, 4s infinite loop)
- 🫀 Beating heart emoji in the hero headline
- 💊 Medical Rx prescription pad with "Dr. Wagmi" signature

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask (or any injected wallet) with BNB Testnet configured

### Installation

```bash
# Clone the repo
git clone https://github.com/Joshuaosunlakin3433/Wagmi-clinic.git
cd Wagmi-clinic

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and admit your first patient.

### BNB Testnet Setup

To mint Soulbound Tokens, add BNB Testnet to MetaMask:
| Field | Value |
|:------|:------|
| Network Name | BNB Smart Chain Testnet |
| RPC URL | `https://data-seed-prebsc-1-s1.bnbchain.org:8545` |
| Chain ID | `97` |
| Symbol | `tBNB` |
| Explorer | `https://testnet.bscscan.com` |

Get testnet BNB from the [BNB Faucet](https://www.bnbchain.org/en/testnet-faucet).

---

## 📂 Project Structure

```
wagmi-clinic/
├── app/
│   ├── api/diagnose/route.ts      # Diagnosis engine (scoring, roasts, prescriptions)
│   ├── diagnosis/page.tsx          # Scanner UI → Bento Grid dashboard
│   ├── globals.css                 # Clinical theme + surgical pattern
│   ├── layout.tsx                  # Providers + layered background system
│   └── page.tsx                    # Landing page composition
├── components/
│   ├── diagnosis/
│   │   ├── wallet-chart.tsx        # 30-day trajectory (Recharts)
│   │   ├── prescription-pad.tsx    # Rx pad with 3 daily doses
│   │   └── mint-button.tsx         # On-chain SBT minting
│   ├── providers.tsx               # WagmiProvider + QueryClient + Sonner
│   ├── navbar.tsx                  # Glassmorphism nav + theme toggle
│   ├── hero-section.tsx            # Beating 🫀 headline
│   ├── admit-patient.tsx           # Wallet input + navigation
│   └── ...                         # Stats, cards, footer, CTA
├── contract/
│   └── WagmiClinicSBT.sol          # Soulbound ERC-721 (BSC Testnet)
├── lib/
│   ├── animations.ts               # Shared motion variants
│   └── utils.ts                    # cn() utility
├── VIBELOG.md                      # Full AI build log (prompt-by-prompt)
└── CONTEXT.md                      # Project vision document
```

---

## 🤖 Built with AI

This entire project was built using **GitHub Copilot (Claude)** in VS Code. Every component, animation, API route, and smart contract was generated through conversational prompts.

The full prompt-by-prompt build log is available in [VIBELOG.md](VIBELOG.md) — judges can reproduce the entire project by feeding those prompts sequentially into an AI coding assistant.

---

## 🏆 Hackathon

**Good Vibes Only: OpenClaw Edition** — BNB Chain Hackathon via DoraHacks

| Field   | Detail                                                         |
| :------ | :------------------------------------------------------------- |
| Track   | Consumer / DeFi                                                |
| Chain   | BNB Smart Chain (Testnet)                                      |
| Builder | [@Joshuaosunlakin3433](https://github.com/Joshuaosunlakin3433) |
| AI Tool | GitHub Copilot (Claude)                                        |

---

<p align="center">
  <strong>NGMI → WAGMI</strong><br/>
  <em>Your wallet is sick. We have the cure.</em>
</p>
