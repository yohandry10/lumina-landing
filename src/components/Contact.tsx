import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Section, SectionHeading, containerVariants, itemVariants } from "./Section";

const CONTACT_ICONS = {
  office: MapPin,
  phone: Phone,
  email: Mail,
} as const;

export function Contact() {
  const { content } = useLanguage();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [activeServices, setActiveServices] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setError(false);

    const form = e.currentTarget;
    const formData = {
      name: (form.querySelector("#contact-name") as HTMLInputElement).value,
      company: (form.querySelector("#contact-company") as HTMLInputElement).value,
      email: (form.querySelector("#contact-email") as HTMLInputElement).value,
      phone: (form.querySelector("#contact-phone") as HTMLInputElement).value,
      services: activeServices,
      message: (form.querySelector("#contact-message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al enviar");

      setSent(true);
      form.reset();
      setActiveServices([]);
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  const toggleService = (label: string) => {
    setActiveServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
    );
  };

  return (
    <Section id="contacto" className="bg-[color:var(--deep)]">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-stretch">
        <div>
          <SectionHeading
            overline={content.contact.overline}
            title={
              <>
                {content.contact.titlePrefix}
                <span className="text-gradient">{content.contact.titleHighlight}</span>
                {content.contact.titleSuffix}
              </>
            }
            subtitle={content.contact.subtitle}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-10 space-y-4"
          >
            {content.contact.cards.map(({ id, title, lines }, i) => {
              const Icon = CONTACT_ICONS[id];

              return (
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
                    {lines.map((line, index) => (
                      <div key={index} className="mt-1 text-[13px] text-muted-foreground">
                        {line}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div>
          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            onSubmit={handleSubmit}
            className="contact-form glass-panel h-full space-y-3 p-4 md:p-5"
          >
            <motion.div variants={itemVariants} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  {content.contact.form.overline}
                </p>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                  {content.contact.form.intro}
                </p>
              </div>
              <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-[color:var(--surface)] text-[color:var(--accent)] md:flex">
                <Send size={18} strokeWidth={1.7} />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FieldWrap fieldId="contact-name" label={content.contact.form.nameLabel} required>
                <input
                  type="text"
                  id="contact-name"
                  required
                  placeholder={content.contact.form.namePlaceholder}
                  className="contact-input"
                />
              </FieldWrap>
              <FieldWrap fieldId="contact-company" label={content.contact.form.companyLabel}>
                <input
                  type="text"
                  id="contact-company"
                  placeholder={content.contact.form.companyPlaceholder}
                  className="contact-input"
                />
              </FieldWrap>
              <FieldWrap fieldId="contact-email" label={content.contact.form.emailLabel} required>
                <input
                  type="email"
                  id="contact-email"
                  required
                  placeholder={content.contact.form.emailPlaceholder}
                  className="contact-input"
                />
              </FieldWrap>
              <FieldWrap fieldId="contact-phone" label={content.contact.form.phoneLabel}>
                <input
                  type="tel"
                  id="contact-phone"
                  placeholder={content.contact.form.phonePlaceholder}
                  className="contact-input"
                />
              </FieldWrap>
            </div>

            <FieldWrap label={content.contact.form.serviceLabel} required>
              <div className="flex flex-wrap gap-1">
                {content.contact.serviceOptions.map((option) => (
                  <ServiceChip
                    key={option}
                    label={option}
                    active={activeServices.includes(option)}
                    onToggle={() => toggleService(option)}
                  />
                ))}
              </div>
            </FieldWrap>

            <FieldWrap fieldId="contact-message" label={content.contact.form.messageLabel} required>
              <textarea
                id="contact-message"
                required
                rows={1}
                placeholder={content.contact.form.messagePlaceholder}
                className="contact-input min-h-[46px] resize-none"
              />
            </FieldWrap>

            <div className="flex flex-col items-stretch justify-between gap-2 border-t border-[color:var(--color-border)] pt-3 sm:flex-row sm:items-center">
              <p className="text-[12px] text-muted-foreground">
                {error ? (
                  <span className="text-red-400">Error al enviar. Intenta de nuevo.</span>
                ) : (
                  content.contact.form.privacy
                )}
              </p>
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-pill btn-primary"
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={16} />
                    {content.contact.form.sent}
                  </>
                ) : sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    {content.contact.form.submit}
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
  fieldId,
  label,
  required,
  children,
}: {
  fieldId?: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={itemVariants}>
      {fieldId ? (
        <label
          htmlFor={fieldId}
          className="block text-[12px] font-medium uppercase tracking-wider text-muted-foreground"
        >
          {label} {required && <span style={{ color: "var(--accent)" }}>*</span>}
        </label>
      ) : (
        <span className="block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
          {label} {required && <span style={{ color: "var(--accent)" }}>*</span>}
        </span>
      )}
      <div className="mt-1.5">{children}</div>
    </motion.div>
  );
}

function ServiceChip({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      data-active={active ? "true" : "false"}
      className="contact-chip"
    >
      {label}
    </button>
  );
}
