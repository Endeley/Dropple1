import { ConvexHttpClient } from "convex/browser";
import { seed } from "./seed";

const convexUrl =
  process.env.CONVEX_URL ??
  process.env.NEXT_PUBLIC_CONVEX_URL ??
  "http://127.0.0.1:3400";

async function main() {
  if (!process.env.CONVEX_URL && !process.env.NEXT_PUBLIC_CONVEX_URL) {
    console.warn(
      "CONVEX_URL/NEXT_PUBLIC_CONVEX_URL not set, defaulting to http://127.0.0.1:3400"
    );
  }

  const client = new ConvexHttpClient(convexUrl);
  await seed(client);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
