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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address") || "0x???";

  // Simulated processing delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const isCritical = address.toLowerCase().startsWith("0x00");

  const score = isCritical
    ? Math.floor(Math.random() * 25) + 10 // 10–34
    : Math.floor(Math.random() * 40) + 50; // 50–89

  const status = score < 35 ? "CRITICAL" : score < 60 ? "UNSTABLE" : "STABLE";

  const history = generateHistory(isCritical);

  return NextResponse.json({
    address,
    score,
    status,
    history,
  });
}
