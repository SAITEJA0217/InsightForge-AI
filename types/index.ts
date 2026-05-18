export interface LeadFormData {
  fullName: string;
  email: string;
  companyName: string;
  websiteUrl: string;
  industry: string;
  businessGoals: string;
  painPoints: string;
}

export interface ScrapedData {
  metaTitle: string;
  metaDescription: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  services: string[];
  productKeywords: string[];
  ctaAnalysis: string[];
  seoObservations: string[];
}

export interface AIAnalysis {
  companyOverview: string;
  industryUnderstanding: string;
  websiteAudit: string;
  uxAnalysis: string;
  seoObservations: string;
  aiAutomationOpportunities: {
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
    effort: 'High' | 'Medium' | 'Low';
  }[];
  growthRecommendations: string[];
  personalizedInsights: string;
  leadNurturingSuggestions: string[];
  aiImplementationRoadmap: {
    phase: string;
    title: string;
    description: string;
    duration: string;
  }[];
  auditScores: {
    overall: number;
    seo: number;
    ux: number;
    aiReadiness: number;
    messaging: number;
  };
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  websiteUrl: string;
  industry: string;
  businessGoals: string;
  painPoints: string;
  timestamp: string;
  reportStatus: 'pending' | 'scraping' | 'analyzing' | 'generating_pdf' | 'completed' | 'failed';
  emailStatus: 'pending' | 'sent' | 'failed';
  pdfArchiveStatus: 'pending' | 'archived' | 'failed';
  scrapedData?: ScrapedData;
  aiAnalysis?: AIAnalysis;
  pdfUrl?: string;
  driveFileId?: string;
  error?: string;
}
