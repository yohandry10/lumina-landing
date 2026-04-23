import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language";
import { MAP_EMBED_SRC, MAP_SECTION_ID } from "../lib/location";

export function MapSection() {
  const { content } = useLanguage();

  return (
    <motion.section
      id={MAP_SECTION_ID}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full overflow-hidden"
      aria-label={content.map.sectionAria}
    >
      <div className="relative h-[380px] w-full md:h-[460px] lg:h-[520px]">
        <iframe
          src={MAP_EMBED_SRC}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={content.map.iframeTitle}
        />
      </div>
    </motion.section>
  );
}
