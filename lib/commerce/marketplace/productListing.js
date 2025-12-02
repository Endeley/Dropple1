export function createProduct({ title, price = 0, type = "template", seller = "dropple" }) {
  return {
    id: `prod_${Math.random().toString(36).slice(2, 8)}`,
    title,
    price,
    type,
    seller,
    createdAt: Date.now(),
  };
}
