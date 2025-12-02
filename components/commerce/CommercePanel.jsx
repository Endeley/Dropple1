"use client";

import { useState } from "react";
import { plans } from "@/lib/commerce/products/plans";
import { createSubscription, changePlan, cancel } from "@/lib/commerce/billing/subscriptionManager";
import { createCheckoutSession } from "@/lib/commerce/payments/stripeService";
import { createProduct } from "@/lib/commerce/marketplace/productListing";
import { checkLicence } from "@/lib/commerce/licensing/licenceManager";

export default function CommercePanel() {
  const [sub, setSub] = useState(null);
  const [product, setProduct] = useState(null);
  const [log, setLog] = useState([]);

  const startSub = () => {
    const s = createSubscription({ userId: "user_1", plan: "pro" });
    setSub(s);
    setLog((l) => [...l, `Subscribed to ${s.plan}`]);
  };

  const change = () => {
    if (!sub) return;
    const s = changePlan(sub, "team");
    setSub(s);
    setLog((l) => [...l, `Changed to ${s.plan}`]);
  };

  const stop = () => {
    if (!sub) return;
    const s = cancel(sub);
    setSub(s);
    setLog((l) => [...l, `Canceled subscription`]);
  };

  const checkout = () => {
    const session = createCheckoutSession({ priceId: "price_123", customerId: "cust_1" });
    setLog((l) => [...l, `Checkout session: ${session.url}`]);
  };

  const createProd = () => {
    const p = createProduct({ title: "Neon Template Pack", price: 9.99, type: "template" });
    setProduct(p);
    setLog((l) => [...l, `Product created: ${p.title}`]);
  };

  const checkLicense = () => {
    const res = checkLicence("asset_1", "personal", "personal");
    setLog((l) => [...l, `Licence ok: ${res.ok}`]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Commerce Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={startSub}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Subscribe
          </button>
          <button
            onClick={change}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Change Plan
          </button>
          <button
            onClick={stop}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={checkout}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Checkout
          </button>
          <button
            onClick={createProd}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Create Product
          </button>
          <button
            onClick={checkLicense}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Check Licence
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs text-white/60">Current plan: {sub?.plan || "none"}</p>
      <p className="text-xs text-white/60">Product: {product?.title || "none"}</p>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
