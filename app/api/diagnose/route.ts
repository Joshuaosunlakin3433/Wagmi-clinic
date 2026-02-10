import { NextRequest, NextResponse } from "next/server";

// Generate 30-day mock history based on wallet pattern
function generateHistory(
  isCritical: boolean,
): { day: string; value: number }[] {
  const history: { day: string; value: number }[] = [];

  if (isCritical) {
    // Downward trend — starts high, bleeds out
    let value = 1000;
    for (let i = 1; i <= 30; i++) {
      const drop = Math.random() * 60 + 10; // lose 10–70 per day
      const bounce = Math.random() < 0.2 ? Math.random() * 30 : 0; // occasional dead-cat bounce
      value = Math.max(50, value - drop + bounce);
      history.push({ day: String(i), value: Math.round(value) });
    }
  } else {
    // Volatile chop / slight upward trend
    let value = 500;
    for (let i = 1; i <= 30; i++) {
      const swing = (Math.random() - 0.4) * 80; // biased slightly positive
      value = Math.max(100, value + swing);
      history.push({ day: String(i), value: Math.round(value) });
    }
  }

  return history;
}

// ── GROK_ROASTS: 15 savage wallet diagnoses ──
const GROK_ROASTS: Record<string, { title: string; message: string }[]> = {
  CRITICAL: [
    {
      title: "Financial Crime Scene",
      message:
        "Your wallet looks like a horror movie. You bought at the top every single time — like you have a gift for losing money. If losing money was a sport, you'd have an Olympic gold medal.",
    },
    {
      title: "Human ATM Machine",
      message:
        "Every time you invest, rich people get richer. You're basically a charity for billionaires. Your investment strategy is 'see hype, throw money, cry later.' Rinse and repeat.",
    },
    {
      title: "The Reverse Midas",
      message:
        "Everything you touch turns to dust. You bought a coin that went up 10,000%... AFTER you sold it for a loss. Your timing is so bad, you'd miss the bus even if you lived on it.",
    },
    {
      title: "Professional Bag Holder",
      message:
        "You're still holding coins from 2021 that lost 99% of their value. 'It'll come back' — no it won't. That's not investing, that's hoarding trash and calling it a collection.",
    },
    {
      title: "Scam Subscriber",
      message:
        "You fell for a coin called 'SafeElonMoonRocket' and you're wondering why you're broke? The red flags were redder than your portfolio. Even the scammers feel bad for you at this point.",
    },
  ],
  UNSTABLE: [
    {
      title: "Panic Button Champion",
      message:
        "You sell the moment anything drops 2% and then watch it go up 500% the next day. You don't have paper hands, you have INVISIBLE hands — because you can never hold onto anything.",
    },
    {
      title: "Trend Chaser Deluxe",
      message:
        "AI coins Monday, dog coins Tuesday, some random thing your cousin texted you about on Wednesday. Your portfolio looks like a toddler's finger painting — colorful, messy, and worth nothing.",
    },
    {
      title: "3 AM Decision Maker",
      message:
        "Your worst trades all happened at 3 AM after watching a YouTube video titled 'THIS COIN WILL 1000X.' You don't need a financial advisor, you need a bedtime. And maybe a therapist.",
    },
    {
      title: "FOMO Patient Zero",
      message:
        "You only buy things AFTER they've already gone up 400%. By the time you show up to the party, everyone's already left and you're standing there holding the bill. Every. Single. Time.",
    },
    {
      title: "The Overthinker",
      message:
        "You spent 6 hours researching a coin, bought it, then sold it 11 minutes later because someone on the internet said 'meh.' Your portfolio doesn't need analysis. It needs a restraining order from YOU.",
    },
  ],
  STABLE: [
    {
      title: "The Human Savings Account",
      message:
        "Your portfolio hasn't moved in 8 months. You turned the most exciting technology in finance into the digital equivalent of putting cash under your mattress. Congrats, I guess?",
    },
    {
      title: "Allergic to Fun",
      message:
        "You've been in crypto for 3 years and your wildest move was... switching from one stable coin to another. That's not a trade, that's a lateral pass. Your portfolio needs a Red Bull.",
    },
    {
      title: "The HODLer Fossil",
      message:
        "You bought and then just... sat there. For years. Your wallet has cobwebs. You won the game but you're still sitting on the couch watching everyone else play. Cash out or live a little.",
    },
    {
      title: "Spreadsheet Surgeon",
      message:
        "You track every penny across 47 spreadsheet tabs. Your portfolio is green but your social life is DEEP red. When's the last time you went outside? The sun misses you. Probably.",
    },
    {
      title: "The Quiet Winner",
      message:
        "You're actually making money and you haven't told a single person. No tweets, no flexing, just silent gains. Honestly? Respect. But also, incredibly boring. Like watching paint dry. Green paint, but still.",
    },
  ],
};

// ── 3. DATABASE: The Prescription (T.I.D Protocol) ──

const YOUTUBE_VIDEOS = [
  "https://www.youtube.com/watch?v=JNW0wnPRAKs",
  "https://www.youtube.com/watch?v=uOPMnjPR5DA",
  "https://www.youtube.com/watch?v=I1DwIc5dHdg",
  "https://www.youtube.com/watch?v=G5exseZHBkY",
  "https://www.youtube.com/watch?v=YLAH0ONhjbg",
  "https://www.youtube.com/watch?v=JtsCKpCAVbQ",
];

const CRYPTO_QUOTES = [
  "Lost coins only make everyone else's coins worth slightly more. Think of it as a donation to everyone. — Satoshi Nakamoto",
  "The computer can be used as a tool to liberate and protect people, rather than to control them. — Hal Finney",
  "If you don't believe it or don't get it, I don't have the time to try to convince you, sorry. — Satoshi Nakamoto",
  "Whereas most technologies tend to automate workers on the periphery doing menial tasks, blockchains automate away the center. — Vitalik Buterin",
  "A lot of people automatically dismiss e-currency as a lost cause because of all the companies that failed since the 1990's. I hope it's obvious it was only the centrally controlled nature of those systems that doomed them. — Satoshi Nakamoto",
  "Bitcoin is a swarm of cyber hornets serving the goddess of wisdom, feeding on the fire of truth, exponentially growing ever smarter, faster, and stronger behind a wall of encrypted energy. — Michael Saylor",
];

function getPrescription(status: string) {
  const randomVideo =
    YOUTUBE_VIDEOS[Math.floor(Math.random() * YOUTUBE_VIDEOS.length)];
  const randomQuote =
    CRYPTO_QUOTES[Math.floor(Math.random() * CRYPTO_QUOTES.length)];

  // 1. Morning Dose (Hope/Motivation)
  const morning = {
    label: "Morning (Hope)",
    title: "Watch Daily Motivation",
    subtext: randomQuote.split("—")[0].substring(0, 50) + "...",
    url: randomVideo,
    icon: "Sun",
  };

  // 2. Noon Dose (The Grind - Based on Status)
  let noon;
  if (status === "CRITICAL" || status === "UNSTABLE") {
    noon = {
      label: "Noon (Grind)",
      title: "Build to Earn (DoraHacks)",
      subtext: "Stop trading, start building.",
      url: "https://dorahacks.io/hackathon/goodvibes/detail",
      icon: "Briefcase",
    };
  } else {
    noon = {
      label: "Noon (Alpha)",
      title: "BNB Chain Airdrops",
      subtext: "Find the next opportunity.",
      url: "https://dappbay.bnbchain.org/airdrops",
      icon: "Search",
    };
  }

  // 3. Night Dose (Cope/Rest)
  const night = {
    label: "Night (Cope)",
    title: "Touch Grass Protocol",
    subtext: "Disconnect before you wreck yourself.",
    url: "https://www.youtube.com/watch?v=lTRiuFIWV54",
    icon: "Moon",
  };

  return { morning, noon, night };
}

// ── 4. MAIN HANDLER ──
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address") || "0x???";

  // Simulate AI Processing Delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Determine Profile
  const isCritical = address.toLowerCase().startsWith("0x00");
  const score = isCritical
    ? Math.floor(Math.random() * 25) + 10 // 10–34
    : Math.floor(Math.random() * 40) + 50; // 50–89
  const status = score < 35 ? "CRITICAL" : score < 60 ? "UNSTABLE" : "STABLE";

  // Compile Data
  const history = generateHistory(isCritical);
  const roastPool = GROK_ROASTS[status] || GROK_ROASTS["STABLE"];
  const roast = roastPool[Math.floor(Math.random() * roastPool.length)];
  const prescription = getPrescription(status);

  return NextResponse.json({
    address,
    score,
    status,
    history,
    roast,
    prescription,
  });
}
