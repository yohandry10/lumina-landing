import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ParallaxBand() {
  return (
    <section className="relative h-[480px] w-full overflow-hidden">
      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(9,9,11,0.88), rgba(9,9,11,0.88))",
        }}
      />
      {/* Animated gradient layer */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--accent) 20%, transparent), color-mix(in oklab, var(--accent-2) 12%, transparent), transparent)",
          backgroundSize: "200% 100%",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.svg
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          width="120"
          height="2"
          viewBox="0 0 120 2"
        >
          <motion.line
            x1="0"
            y1="1"
            x2="120"
            y2="1"
            stroke="var(--accent)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </motion.svg>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-3xl font-display font-bold leading-[1.1] text-foreground"
          style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
        >
          ¿Listo para llevar tu proyecto al{" "}
          <span className="text-gradient">siguiente nivel</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 max-w-xl text-[18px] leading-[1.7] text-foreground/70"
        >
          Conversemos sobre cómo podemos aportar ingeniería de excelencia,
          presupuesto acorde a tu perfil y compromiso con los plazos.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          href="#contacto"
          className="btn-pill btn-primary group mt-8 !px-9 !py-4 !text-[16px]"
        >
          Solicitar cotización
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>
    </section>
  );
}
