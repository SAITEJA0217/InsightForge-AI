import { NextResponse } from 'next/server';
import { getLeadById } from '@/lib/storage';
import { logger } from '@/utils/logger';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  try {
    logger.info(`Fetching lead details for ID: ${id}`);
    const lead = await getLeadById(id);
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    logger.error(`Error fetching lead ${id}: ${error.message}`);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lead details', message: error.message },
      { status: 500 }
    );
  }
}
