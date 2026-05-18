import { NextResponse } from 'next/server';
import { getLeads } from '@/lib/storage';
import { logger } from '@/utils/logger';

export async function GET() {
  try {
    logger.info('Fetching all leads for admin dashboard...');
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    logger.error(`Error fetching leads: ${error.message}`);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads', message: error.message },
      { status: 500 }
    );
  }
}
