import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendLicenseKeyParams {
  email: string;
  name: string;
  key: string;
  plan: string;
  interval: string;
}

export async function sendLicenseKey({ email, name, key, plan, interval }: SendLicenseKeyParams): Promise<boolean> {
  if (!resend) {
    console.warn("[Email] RESEND_API_KEY not configured, skipping email");
    return false;
  }

  try {
    let intervalLabel: string;
    if (interval === "annual") {
      intervalLabel = "12 meses";
    } else if (interval === "quarterly") {
      intervalLabel = "3 meses";
    } else {
      intervalLabel = "1 mês";
    }

    await resend.emails.send({
      from: "BCRM <noreply@bcrm.com>",
      to: email,
      subject: `Sua chave de licença BCRM - Plano ${plan}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f5;">
          <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h1 style="color: #18181b; font-size: 24px; margin-bottom: 8px;">Sua chave de licença</h1>
            <p style="color: #71717a; font-size: 16px;">Olá, ${name}!</p>
            <p style="color: #71717a; font-size: 16px;">Seu pagamento foi confirmado. Use a chave abaixo para ativar sua conta:</p>
            
            <div style="background: #f4f4f5; padding: 24px; border-radius: 8px; text-align: center; margin: 24px 0;">
              <p style="font-family: monospace; font-size: 28px; font-weight: bold; letter-spacing: 3px; color: #18181b; margin: 0;">
                ${key}
              </p>
            </div>
            
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <p style="color: #166534; font-size: 14px; margin: 0;"><strong>Plano:</strong> ${plan.charAt(0).toUpperCase() + plan.slice(1)}</p>
              <p style="color: #166534; font-size: 14px; margin: 8px 0 0 0;"><strong>Validade:</strong> ${intervalLabel}</p>
            </div>
            
            <p style="color: #71717a; font-size: 16px;">Ative sua conta clicando no link abaixo:</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/activate" style="display: inline-block; background: #18181b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; margin: 16px 0;">
              Ativar Minha Conta
            </a>
            
            <p style="color: #a1a1aa; font-size: 14px; margin-top: 32px; border-top: 1px solid #e4e4e7; padding-top: 16px;">
              Esta chave é válida por ${intervalLabel} a partir da data de compra. Se você não solicitou esta chave, ignore este e-mail.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log(`[Email] License key sent to ${email}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send license key:", error);
    return false;
  }
}
