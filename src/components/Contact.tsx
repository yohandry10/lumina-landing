import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
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

  return (
    <Section id="contacto" className="bg-[color:var(--deep)]">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
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
            className="glass-panel space-y-6 p-6 md:p-8"
          >
            <motion.div variants={itemVariants} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  {content.contact.form.overline}
                </p>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted-foreground">
                  {content.contact.form.intro}
                </p>
              </div>
              <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--surface)] text-[color:var(--accent)] md:flex">
                <Send size={18} strokeWidth={1.7} />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              <div className="flex flex-wrap gap-2">
                {content.contact.serviceOptions.map((option) => (
                  <ServiceChip key={option} label={option} />
                ))}
              </div>
            </FieldWrap>

            <FieldWrap fieldId="contact-message" label={content.contact.form.messageLabel} required>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder={content.contact.form.messagePlaceholder}
                className="contact-input min-h-[160px] resize-none"
              />
            </FieldWrap>

            <div className="flex flex-col items-stretch justify-between gap-4 border-t border-[color:var(--color-border)] pt-5 sm:flex-row sm:items-center">
              <p className="text-[12px] text-muted-foreground">{content.contact.form.privacy}</p>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-pill btn-primary"
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={16} />
                    {content.contact.form.sent}
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
      <div className="mt-2">{children}</div>
    </motion.div>
  );
}

function ServiceChip({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((value) => !value)}
      data-active={on ? "true" : "false"}
      className="contact-chip"
    >
      {label}
    </button>
  );
}
