import fs from 'fs/promises';
import path from 'path';
import { Lead } from '../types';
import { logger } from '../utils/logger';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

export async function getLeads(): Promise<Lead[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(data) as Lead[];
  } catch (error) {
    // If file doesn't exist, return initial mock leads or empty array
    const mockLeads: Lead[] = [
      {
        id: 'mock-1',
        fullName: 'Sarah Connor',
        email: 'sarah@skynet-defense.com',
        companyName: 'Cyberdyne Defense',
        websiteUrl: 'https://vercel.com', // use a real working site for scraping demo if needed
        industry: 'Artificial Intelligence',
        businessGoals: 'Automate lead scoring and increase conversion rates by 40%',
        painPoints: 'Manual qualification takes 20 hours per week and leads get cold',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        reportStatus: 'completed',
        emailStatus: 'sent',
        pdfArchiveStatus: 'archived',
        pdfUrl: '/api/pdf/mock-1',
        aiAnalysis: {
          companyOverview: 'Cyberdyne Defense is an emerging leader in enterprise AI automation solutions.',
          industryUnderstanding: 'The AI automation sector is experiencing hyper-growth, with 73% of enterprises adopting autonomous workflows.',
          websiteAudit: 'Modern architecture detected. High performance scores but missing clear conversational CTA funnels.',
          uxAnalysis: 'Clean navigation structure. Hero messaging could be optimized for enterprise decision makers.',
          seoObservations: 'Strong domain authority. Missing structured schema markup for core AI product offerings.',
          aiAutomationOpportunities: [
            { title: 'Autonomous Lead Enrichment', description: 'Deploy an automated workflow to scrape and qualify inbound enterprise leads instantly.', impact: 'High', effort: 'Low' },
            { title: 'Conversational Sales AI', description: 'Implement an interactive AI agent trained on your technical whitepapers to handle tier-1 inquiries.', impact: 'High', effort: 'Medium' }
          ],
          growthRecommendations: ['Implement dynamic personalization on landing pages', 'Deploy automated PDF audit generation for inbound prospects', 'Integrate CRM with predictive scoring models'],
          personalizedInsights: 'By automating your initial technical qualification, Cyberdyne Defense can reduce sales cycle duration by an estimated 14 days.',
          leadNurturingSuggestions: ['Send automated case study sequence on day 3', 'Invite to private AI executive roundtable on day 7'],
          aiImplementationRoadmap: [
            { phase: 'Phase 1', title: 'Data Pipeline & Scraper Setup', description: 'Set up automated data ingestion from inbound forms.', duration: '2 Weeks' },
            { phase: 'Phase 2', title: 'Custom AI Agent Training', description: 'Fine-tune LLM on sales collateral and technical documentation.', duration: '3 Weeks' },
            { phase: 'Phase 3', title: 'Full Automation Deployment', description: 'Integrate with CRM and launch automated email workflows.', duration: '2 Weeks' }
          ],
          auditScores: { overall: 88, seo: 85, ux: 90, aiReadiness: 95, messaging: 82 }
        }
      }
    ];
    await fs.writeFile(LEADS_FILE, JSON.stringify(mockLeads, null, 2), 'utf-8');
    return mockLeads;
  }
}

export async function saveLead(lead: Lead): Promise<void> {
  await ensureDataDir();
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === lead.id);
  if (index >= 0) {
    leads[index] = lead;
  } else {
    leads.unshift(lead);
  }
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  logger.success(`Lead ${lead.id} saved to local storage.`);
}

export async function getLeadById(id: string): Promise<Lead | undefined> {
  const leads = await getLeads();
  return leads.find((l) => l.id === id);
}

export async function updateLeadStatus(
  id: string,
  updates: Partial<Pick<Lead, 'reportStatus' | 'emailStatus' | 'pdfArchiveStatus' | 'scrapedData' | 'aiAnalysis' | 'pdfUrl' | 'driveFileId' | 'error'>>
): Promise<Lead | undefined> {
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index >= 0) {
    leads[index] = { ...leads[index], ...updates };
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    logger.info(`Updated lead ${id} status.`, updates);
    return leads[index];
  }
  return undefined;
}
