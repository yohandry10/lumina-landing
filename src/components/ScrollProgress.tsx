import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        originX: 0,
        background: "var(--gradient-accent)",
      }}
      className="fixed left-0 right-0 top-0 z-[150] h-[2px]"
    />
  );
}
