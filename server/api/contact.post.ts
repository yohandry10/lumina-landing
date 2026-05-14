import { Resend } from "resend";
import { defineEventHandler, readBody, createError } from "h3";

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, company, email, phone, services, message } = body;

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: "Faltan campos requeridos" });
  }

  const servicesText = services?.length ? services.join(", ") : "No especificado";

  const { error } = await resend.emails.send({
    from: "Hanan Ingeniería <onboarding@resend.dev>",
    to: "contacto@hananingenieria.com",
    replyTo: email,
    subject: `Nuevo contacto: ${name} — ${servicesText}`,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;font-weight:bold;">Nombre</td><td style="padding:8px;">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Empresa</td><td style="padding:8px;">${company || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Correo</td><td style="padding:8px;">${email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Teléfono</td><td style="padding:8px;">${phone || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Servicios</td><td style="padding:8px;">${servicesText}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Mensaje</td><td style="padding:8px;">${message}</td></tr>
      </table>
    `,
  });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { success: true };
});
