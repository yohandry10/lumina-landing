import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading, containerVariants, itemVariants } from "./Section";

const SERVICE_OPTIONS = [
  "Diseño civil / hidráulico",
  "Geotecnia",
  "Hidrología",
  "Hidrogeología",
  "Supervisión EPCM",
  "Ambiental",
  "Otro",
];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section id="contacto" className="bg-[color:var(--deep)]">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            overline="Contacto"
            title={
              <>
                Hablemos de tu <span className="text-gradient">próximo proyecto</span>.
              </>
            }
            subtitle="Cuéntanos sobre tu proyecto y nuestro equipo técnico responderá con una propuesta a la medida en menos de 48 horas."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-10 space-y-5"
          >
            {[
              {
                Icon: MapPin,
                title: "Oficina principal",
                lines: ["Av. Circunvalación 12M, Piso 3", "Abancay · Apurímac · Perú"],
              },
              {
                Icon: Phone,
                title: "Teléfono",
                lines: ["+51 000 000 000", "Lun – Vie · 8:00 – 18:00"],
              },
              {
                Icon: Mail,
                title: "Correo",
                lines: ["informes@hananingenieria.com", "Respuesta < 48h"],
              },
            ].map(({ Icon, title, lines }, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4 rounded-[var(--radius-card)] border border-border bg-[color:var(--surface)] p-5"
              >
                <div className="icon-tile">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <div className="font-display text-[15px] font-bold text-foreground">
                    {title}
                  </div>
                  {lines.map((l, j) => (
                    <div key={j} className="mt-1 text-[13px] text-muted-foreground">
                      {l}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
            }}
            className="glass-panel p-6 md:p-10"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FieldWrap label="Nombre completo" required>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="input-base"
                />
              </FieldWrap>
              <FieldWrap label="Empresa / Institución">
                <input type="text" placeholder="Tu empresa" className="input-base" />
              </FieldWrap>
              <FieldWrap label="Correo" required>
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  className="input-base"
                />
              </FieldWrap>
              <FieldWrap label="Teléfono">
                <input type="tel" placeholder="+51" className="input-base" />
              </FieldWrap>
            </div>

            <FieldWrap label="Servicio de interés" required className="mt-5">
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((s) => (
                  <ServiceChip key={s} label={s} />
                ))}
              </div>
            </FieldWrap>

            <FieldWrap label="Cuéntanos sobre tu proyecto" required className="mt-5">
              <textarea
                required
                rows={5}
                placeholder="Alcance, ubicación, plazos esperados…"
                className="input-base resize-none"
              />
            </FieldWrap>

            <div className="mt-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-[12px] text-muted-foreground">
                Al enviar aceptas nuestra política de privacidad. No compartimos tus datos.
              </p>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-pill btn-primary"
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={16} />
                    Enviado
                  </>
                ) : (
                  <>
                    Enviar solicitud
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </Section>
  );
}

function FieldWrap({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.label variants={itemVariants} className={`block ${className}`}>
      <span className="block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
        {label} {required && <span style={{ color: "var(--accent)" }}>*</span>}
      </span>
      <div className="mt-2">{children}</div>
      <style>{`
        .input-base {
          width: 100%;
          background: color-mix(in oklab, var(--surface) 70%, transparent);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 12px 14px;
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--foreground);
          transition: var(--transition-smooth);
          outline: none;
        }
        .input-base::placeholder { color: var(--muted-foreground); }
        .input-base:focus {
          border-color: color-mix(in oklab, var(--accent) 60%, transparent);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 18%, transparent);
        }
      `}</style>
    </motion.label>
  );
}

function ServiceChip({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className="rounded-full border px-4 py-1.5 text-[12px] font-medium transition-all"
      style={{
        background: on
          ? "color-mix(in oklab, var(--accent) 18%, transparent)"
          : "transparent",
        borderColor: on
          ? "color-mix(in oklab, var(--accent) 50%, transparent)"
          : "var(--color-border)",
        color: on ? "var(--accent)" : "var(--muted-foreground)",
      }}
    >
      {label}
    </button>
  );
}
