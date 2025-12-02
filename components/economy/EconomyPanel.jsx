"use client";

import { useState } from "react";
import { addCredits, spendCredits, getBalance } from "@/lib/ai-economy-engine/credits/creditManager";
import { trackUsage, listUsage } from "@/lib/ai-economy-engine/credits/usageTracker";
import { priceAsset } from "@/lib/ai-economy-engine/marketplace/pricingEngine";
import { splitRoyalties } from "@/lib/ai-economy-engine/marketplace/royalties";
import { payout } from "@/lib/ai-economy-engine/marketplace/payouts";
import { tierFor } from "@/lib/ai-economy-engine/creators/tierSystem";
import { distributeFund } from "@/lib/ai-economy-engine/creators/creatorFund";

export default function EconomyPanel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    addCredits("user_1", 100);
    spendCredits("user_1", 25);
    trackUsage("user_1", "ai_gen", 5);

    const price = priceAsset(12, 1.2);
    const royalty = splitRoyalties(10, ["A", "B", "C"]);
    const paid = payout("creator_1", 42, "stripe");
    const tier = tierFor({ sales: 300 });
    const fund = distributeFund(500, ["c1", "c2", "c3"]);

    setLog((l) => [
      ...l,
      `Balance: ${getBalance("user_1")}`,
      `Usage entries: ${listUsage("user_1").length}`,
      `Price: ${price}`,
      `Royalty total: ${royalty.total}`,
      `Payout: ${paid.status}`,
      `Tier: ${tier}`,
      `Fund split: ${fund.map((f) => f.amount).join(", ")}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">AI Economy Engine</h3>
        <button
          onClick={demo}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Demo
        </button>
      </div>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
