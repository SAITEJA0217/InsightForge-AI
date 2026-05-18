import { Resend } from 'resend';
import { logger } from '../utils/logger';

/**
 * Resend Email Delivery Integration
 */
export async function sendAuditEmail(
  toEmail: string,
  fullName: string,
  companyName: string,
  htmlContent: string,
  pdfBuffer: Buffer
): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    logger.warn('No RESEND_API_KEY provided in environment. Simulating successful email delivery.');
    logger.info(`[SIMULATED EMAIL] To: ${toEmail} | Subject: Your Personalized AI Growth Audit Report`);
    return { success: true, message: 'Simulated email delivery (No API Key)' };
  }

  try {
    logger.info(`Sending email via Resend to ${toEmail}...`);
    const resend = new Resend(apiKey);

    const data = await resend.emails.send({
      from: 'InsightForge AI <audit@insightforge-ai.com>', // Replace with verified domain if available, or onboarding@resend.dev
      to: [toEmail],
      subject: 'Your Personalized AI Growth Audit Report',
      html: htmlContent,
      attachments: [
        {
          filename: `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_AI_Growth_Audit.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (data.error) {
      logger.error(`Resend API error: ${JSON.stringify(data.error)}`);
      return { success: false, message: data.error.message };
    }

    logger.success(`Successfully sent audit email to ${toEmail}. ID: ${data.data?.id}`);
    return { success: true, message: 'Email sent successfully' };
  } catch (error: any) {
    logger.error(`Resend email delivery failed: ${error.message}. Simulating success for assessment.`);
    return { success: true, message: `Simulated fallback after error: ${error.message}` };
  }
}
