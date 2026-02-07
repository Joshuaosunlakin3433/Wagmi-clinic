# PROJECT: Wagmi Clinic (BNB Chain Hackathon Entry)
# TECH STACK: Next.js (Latest/App Router), Tailwind CSS, ShadCN UI, Wagmi/Viem (BNB Chain), OpenAI API.

## THE VISION
"Wagmi Clinic" is an AI-powered triage center for crypto users.
1. **Admit Patient:** User connects BNB Wallet.
2. **Triage (Scan):** System fetches portfolio/transactions (Mocked or Moralis API).
3. **Diagnosis (AI):** A personality-driven AI analyzes the "health" of the wallet (Paper hands, Degen, Holder).
4. **Prescription (Recovery):** The system generates a list of "Recovery Links" (Hackathons to earn, Docs to learn, Videos to cope).

## CORE FEATURES
1. **The Dashboard (Patient Chart):** Visual display of wallet health (Red/Green indicators).
2. **The Chief of Surgery (AI Agent):** Generates the roast and the summary.
3. **The Pharmacy (Opportunities):** A mapped list of opportunities (DoraHacks, Airdrops, Jobs) provided based on the specific diagnosis.

## DATA STRUCTURES
### Opportunity Interface
type Opportunity = {
  id: string;
  category: 'URGENT_CARE' (Quick money/Airdrops) | 'PHYSICAL_THERAPY' (Education) | 'PSYCHIATRY' (Motivation);
  title: string;
  url: string;
  description: string;
}

## DESIGN VIBE
- Clean Medical Aesthetic but Web3.
- White, Light Grays, "Healthy" Greens, "Critical" Reds.
- Typography: Clean Sans-Serif (Inter/Geist).

## RULES FOR AI CODING
- Use `use client` for all interactive components.
- Use `lucide-react` for medical icons (Stethoscope, Activity, Pill).
- Ensure compatibility with Next.js Latest (Server Components by default).