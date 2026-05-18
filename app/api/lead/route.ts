import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { leadFormSchema } from '@/lib/validations';
import { saveLead, updateLeadStatus } from '@/lib/storage';
import { scrapeWebsite } from '@/lib/scraper';
import { generateAIAnalysis } from '@/lib/gemini';
import { getPdfHtmlTemplate } from '@/templates/pdfTemplate';
import { generatePdfBuffer } from '@/lib/puppeteer';
import { getEmailHtmlTemplate } from '@/templates/emailTemplate';
import { sendAuditEmail } from '@/lib/resend';
import { uploadPdfToDrive } from '@/lib/drive';
import { appendLeadToSheet } from '@/lib/sheets';
import { Lead } from '@/types';
import { logger } from '@/utils/logger';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    logger.info('Received new lead submission:', body);

    // STEP 1: Validate all fields
    const validationResult = leadFormSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn('Lead validation failed:', validationResult.error.format());
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const leadData = validationResult.data;
    const leadId = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = new Date().toISOString();

    // Initial Lead Object
    const initialLead: Lead = {
      id: leadId,
      ...leadData,
      timestamp,
      reportStatus: 'scraping',
      emailStatus: 'pending',
      pdfArchiveStatus: 'pending',
    };

    // Save initial state
    await saveLead(initialLead);

    // Run the rest of the workflow asynchronously or await it
    // Awaiting ensures the frontend gets the completed state immediately for the beautiful success animation
    logger.info(`Starting automation workflow for lead ${leadId}...`);

    // STEP 2: Scrape website data
    await updateLeadStatus(leadId, { reportStatus: 'scraping' });
    const scrapedData = await scrapeWebsite(leadData.websiteUrl, leadData.companyName, leadData.industry);

    // STEP 3: Generate AI Analysis
    await updateLeadStatus(leadId, { reportStatus: 'analyzing', scrapedData });
    const aiAnalysis = await generateAIAnalysis(
      leadData.companyName,
      leadData.industry,
      leadData.businessGoals,
      leadData.painPoints,
      scrapedData
    );

    // STEP 4: Generate Premium PDF
    await updateLeadStatus(leadId, { reportStatus: 'generating_pdf', aiAnalysis });
    const pdfHtml = getPdfHtmlTemplate(leadData, scrapedData, aiAnalysis);
    const pdfBuffer = await generatePdfBuffer(pdfHtml);

    // Save PDF buffer locally for instant download/preview
    const pdfDir = path.join(process.cwd(), 'data', 'pdfs');
    try {
      await fs.access(pdfDir);
    } catch {
      await fs.mkdir(pdfDir, { recursive: true });
    }
    const pdfFilePath = path.join(pdfDir, `${leadId}.pdf`);
    await fs.writeFile(pdfFilePath, pdfBuffer);
    const pdfUrl = `/api/pdf/${leadId}`;

    // STEP 5: Email the PDF to the lead
    const emailHtml = getEmailHtmlTemplate(leadData, aiAnalysis);
    const emailResult = await sendAuditEmail(
      leadData.email,
      leadData.fullName,
      leadData.companyName,
      emailHtml,
      pdfBuffer
    );
    const emailStatus = emailResult.success ? 'sent' : 'failed';

    // STEP 6: Archive generated PDF into Google Drive
    const fileName = `${leadData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_Audit_${leadId}.pdf`;
    const driveResult = await uploadPdfToDrive(fileName, pdfBuffer);
    const pdfArchiveStatus = driveResult.success ? 'archived' : 'failed';

    // STEP 7: Save lead details into Google Sheets
    const finalLeadState: Lead = {
      ...initialLead,
      reportStatus: 'completed',
      emailStatus,
      pdfArchiveStatus,
      scrapedData,
      aiAnalysis,
      pdfUrl,
      driveFileId: driveResult.fileId,
    };
    await updateLeadStatus(leadId, {
      reportStatus: 'completed',
      emailStatus,
      pdfArchiveStatus,
      scrapedData,
      aiAnalysis,
      pdfUrl,
      driveFileId: driveResult.fileId,
    });
    await appendLeadToSheet(finalLeadState);

    logger.success(`Automation workflow completed successfully for lead ${leadId}.`);
    return NextResponse.json({
      success: true,
      leadId,
      message: 'Workflow completed successfully',
      data: finalLeadState,
    });
  } catch (error: any) {
    logger.error(`Unhandled error in lead automation workflow: ${error.message}`);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
