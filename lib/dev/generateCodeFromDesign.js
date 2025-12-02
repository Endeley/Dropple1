import extractDesign from "./extractDesign";
import layoutEngine from "./layoutEngine";
import generateHTML from "./generators/html";
import generateTailwind from "./generators/tailwind";
import generateReact from "./generators/react";
import generateNextjs from "./generators/nextjs";
import generateFramer from "./generators/framer";
import generateEmail from "./generators/email";

export default async function generateCodeFromDesign(type) {
  const design = extractDesign();
  const payload = layoutEngine(design);

  switch (type) {
    case "html":
      return generateHTML(payload);
    case "tailwind":
      return generateTailwind(payload);
    case "react":
      return generateReact(payload);
    case "nextjs":
      return generateNextjs(payload);
    case "framer":
      return generateFramer(payload);
    case "email":
      return generateEmail(payload);
    default:
      return "// Unsupported export type";
  }
}
