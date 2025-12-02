import { motion } from "framer-motion";

export default function PerformanceToggle({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-200">{label}</span>

      <motion.button
        onClick={() => onChange(!value)}
        className={`w-10 h-5 rounded-full flex items-center p-1 transition ${
          value ? "bg-violet-500" : "bg-gray-600"
        }`}
      >
        <motion.div layout className="w-4 h-4 bg-white rounded-full shadow" />
      </motion.button>
    </div>
  );
}
