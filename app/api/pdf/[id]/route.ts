import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getLeadById } from '@/lib/storage';
import { getPdfHtmlTemplate } from '@/templates/pdfTemplate';
import { generatePdfBuffer } from '@/lib/puppeteer';
import { logger } from '@/utils/logger';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  try {
    logger.info(`Serving PDF for lead ID: ${id}`);
    const pdfFilePath = path.join(process.cwd(), 'data', 'pdfs', `${id}.pdf`);

    try {
      const buffer = await fs.readFile(pdfFilePath);
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="Audit_Report_${id}.pdf"`,
        },
      });
    } catch {
      // If file not found on disk, check if lead exists and generate on the fly
      logger.warn(`PDF file not found on disk for ${id}. Attempting on-the-fly generation...`);
      const lead = await getLeadById(id);
      if (!lead || !lead.scrapedData || !lead.aiAnalysis) {
        return NextResponse.json({ success: false, error: 'PDF not found and cannot be generated' }, { status: 404 });
      }

      const pdfHtml = getPdfHtmlTemplate(lead as any, lead.scrapedData, lead.aiAnalysis);
      const pdfBuffer = await generatePdfBuffer(pdfHtml);

      // Save it for future requests
      const pdfDir = path.join(process.cwd(), 'data', 'pdfs');
      try {
        await fs.access(pdfDir);
      } catch {
        await fs.mkdir(pdfDir, { recursive: true });
      }
      await fs.writeFile(pdfFilePath, pdfBuffer);

      return new NextResponse(new Uint8Array(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="Audit_Report_${id}.pdf"`,
        },
      });
    }
  } catch (error: any) {
    logger.error(`Error serving PDF ${id}: ${error.message}`);
    return NextResponse.json(
      { success: false, error: 'Failed to serve PDF', message: error.message },
      { status: 500 }
    );
  }
}
