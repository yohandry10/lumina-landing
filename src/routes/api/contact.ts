import { createFileRoute } from "@tanstack/react-router";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getResendApiKey = () => process.env.RESEND_API_KEY?.replace(/\uFEFF/g, "").trim();

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const resendApiKey = getResendApiKey();

          if (!resendApiKey) {
            return json({ error: "RESEND_API_KEY no está configurada" }, 500);
          }

          const body = await request.json();
          const { name, company, email, phone, services, message } = body;

          if (!name || !email || !message) {
            return json({ error: "Faltan campos requeridos" }, 400);
          }

          const servicesText =
            Array.isArray(services) && services.length ? services.join(", ") : "No especificado";

          const { Resend } = await import("resend");
          const resend = new Resend(resendApiKey);

          const { error } = await resend.emails.send({
            from: "Hanan Ingenieria <contacto@hananingenieria.com>",
            to: "contacto@hananingenieria.com",
            replyTo: email,
            subject: `Nuevo contacto: ${name} - ${servicesText}`,
            html: `
              <h2>Nuevo mensaje de contacto</h2>
              <table style="border-collapse:collapse;width:100%;max-width:600px;">
                <tr><td style="padding:8px;font-weight:bold;">Nombre</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Empresa</td><td style="padding:8px;">${escapeHtml(company || "-")}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Correo</td><td style="padding:8px;">${escapeHtml(email)}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Teléfono</td><td style="padding:8px;">${escapeHtml(phone || "-")}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Servicios</td><td style="padding:8px;">${escapeHtml(servicesText)}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Mensaje</td><td style="padding:8px;">${escapeHtml(message)}</td></tr>
              </table>
            `,
          });

          if (error) {
            return json({ error: error.message }, 500);
          }

          return json({ success: true });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Error al enviar el correo";
          return json({ error: message }, 500);
        }
      },
    },
  },
});
