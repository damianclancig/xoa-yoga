"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1).max(255),
  honeypot: z.string().optional(),
});

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function createEmailHtml(name: string, email: string, message: string, phone?: string): string {
    const escapedMessage = escapeHtml(message).replace(/\n/g, '<br>');

    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Mensaje de Contacto</title>
        <style>
          body {
            font-family: 'PT Sans', Arial, sans-serif;
            background-color: #f7f8fa; /* approx background: 240 25% 97% */
            color: #262629; /* approx foreground: 240 10% 15% */
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e6e6e6; /* approx border: 240 20% 90% */
          }
          .header {
            background-color: #6b85d8; /* approx primary: 240 40% 60% */
            color: #ffffff;
            padding: 24px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 24px 32px;
            line-height: 1.6;
          }
          .content p {
            margin: 0 0 16px;
          }
          .info-list {
            list-style: none;
            padding: 0;
            margin: 0 0 24px 0;
            border-left: 3px solid #ced8f7; /* approx secondary: 240 67% 94% */
            padding-left: 16px;
          }
          .info-list li {
            margin-bottom: 8px;
          }
          .info-list strong {
            color: #6b85d8; /* approx primary: 240 40% 60% */
          }
          .message-box {
            background-color: #f7f8fa;
            border-radius: 8px;
            padding: 16px;
            font-style: italic;
            color: #4b4b57;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #7a7a8c; /* approx muted-foreground: 240 5% 45% */
            padding: 16px;
          }
          a {
            color: #6b85d8; /* approx primary: 240 40% 60% */
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Nuevo mensaje desde XoanaYoga!</h1>
          </div>
          <div class="content">
            <p>Hola Xoana,</p>
            <p>Has recibido una nueva consulta a través de tu página web. Aquí están los detalles:</p>
            <ul class="info-list">
              <li><strong>Nombre:</strong> ${escapeHtml(name)}</li>
              <li><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></li>
              ${phone ? `<li><strong>Teléfono:</strong> ${escapeHtml(phone)}</li>` : ''}
            </ul>
            <p><strong>Mensaje:</strong></p>
            <div class="message-box">
              <p>${escapedMessage}</p>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>Este es un correo automático enviado desde tu sitio web.</p>
        </div>
      </body>
      </html>
    `;
}


export async function sendEmail(formData: unknown) {
  const parsedData = formSchema.safeParse(formData);

  if (!parsedData.success) {
    return { success: false, error: "Datos inválidos." };
  }

  // Honeypot check
  if (parsedData.data.honeypot) {
    // It's a bot. Return success to not alert the bot.
    return { success: true };
  }


  const { name, email, phone, message } = parsedData.data;
  
  const mailTo = process.env.MAIL_TO;
  const apiKey = process.env.MAILEROO_API_KEY;
  const mailDomain = process.env.MAIL_DOMAIN;

  if (!mailTo || !apiKey || !mailDomain) {
    console.error("Una o más variables de entorno (MAIL_TO, MAILEROO_API_KEY, MAIL_DOMAIN) no están configuradas.");
    return { success: false, error: "Error de configuración del servidor." };
  }

  const emailHtml = createEmailHtml(name, email, message, phone);

  try {
    const response = await fetch("https://smtp.maileroo.com/api/v2/emails", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            from: {
                address: `hola@${mailDomain}`,
                display_name: "Xoana Yoga Web",
            },
            to: {
                address: mailTo,
            },
            reply_to: {
                address: email,
                display_name: name,
            },
            subject: `Nuevo mensaje de ${name} desde tu web`,
            html: emailHtml,
        }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Error al enviar el correo desde Maileroo:", result);
      return { success: false, error: result.message || "Hubo un problema con el servicio de correo." };
    }

    return { success: true, data: result };

  } catch (error) {
    console.error("Fallo al enviar el correo:", error);
    return { success: false, error: "Ocurrió un error inesperado al contactar el servicio." };
  }
}
