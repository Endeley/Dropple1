export function createCheckoutSession({ priceId, customerId }) {
  // Placeholder for Stripe session creation.
  return {
    id: `sess_${Math.random().toString(36).slice(2, 8)}`,
    priceId,
    customerId,
    url: "https://stripe.example/checkout",
  };
}
