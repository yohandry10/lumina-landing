import { createAPIFileRoute } from "@tanstack/react-start/api";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const APIRoute = createAPIFileRoute("/api/contact")({
  POST: async ({ request }) => {
    const body = await request.json();
    const { name, company, email, phone, services, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const servicesText = services?.length ? services.join(", ") : "No especificado";

    const { error } = await resend.emails.send({
      from: "Hanan Ingeniería <contacto@hananingenieria.com>",
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
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
});
