import * as LucideIcons from "lucide-react";

// Lightweight wrapper to safely resolve lucide icons by name.
export function Icons({ name = "Circle", size = 18, className }) {
  const Icon = LucideIcons[name] || LucideIcons.Circle;
  return <Icon size={size} className={className} />;
}
