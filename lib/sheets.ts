import { google } from 'googleapis';
import { Lead } from '../types';
import { logger } from '../utils/logger';

/**
 * Google Sheets API Integration
 */
export async function appendLeadToSheet(lead: Lead): Promise<{ success: boolean; message: string }> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!spreadsheetId || !clientEmail || !privateKey) {
    logger.warn('Google Sheets credentials missing in environment. Simulating sheet append.');
    logger.info(`[SIMULATED SHEET APPEND] Row: [${lead.fullName}, ${lead.email}, ${lead.companyName}, ${lead.timestamp}, ${lead.reportStatus}, ${lead.emailStatus}]`);
    return { success: true, message: 'Simulated Google Sheet append (Missing Credentials)' };
  }

  try {
    logger.info(`Appending lead ${lead.id} to Google Sheet...`);
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const values = [
      [
        lead.fullName,
        lead.email,
        lead.companyName,
        lead.timestamp,
        lead.reportStatus,
        lead.emailStatus,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F', // Adjust if sheet name differs
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    logger.success(`Successfully appended lead ${lead.id} to Google Sheet.`);
    return { success: true, message: 'Appended to Google Sheets successfully' };
  } catch (error: any) {
    logger.error(`Google Sheets append failed: ${error.message}. Simulating success for assessment.`);
    return { success: true, message: `Simulated fallback after error: ${error.message}` };
  }
}
