import { motion } from "framer-motion";

export function Logo({
  className = "",
  imageClassName = "",
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <motion.img
        src="/logo.png"
        alt="Hanan Ingeniería"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`absolute left-1/2 top-1/2 h-[184%] w-[184%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain ${imageClassName}`}
      />
    </span>
  );
}
