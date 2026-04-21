import { motion } from "framer-motion";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      whileHover={{ rotate: 90 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="shrink-0"
    >
      <path
        d="M3 26 L12 11 L18 19 L23 9 L29 26 Z"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="color-mix(in oklab, var(--accent) 12%, transparent)"
      />
      <path
        d="M11 17 L11 26 M21 17 L21 26 M11 21.5 L21 21.5"
        stroke="var(--accent-2)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
