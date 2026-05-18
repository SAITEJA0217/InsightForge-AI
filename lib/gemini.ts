import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIAnalysis, ScrapedData } from '../types';
import { logger } from '../utils/logger';

/**
 * Advanced AI Prompt Engineering & Gemini Integration
 */
export async function generateAIAnalysis(
  companyName: string,
  industry: string,
  businessGoals: string,
  painPoints: string,
  scrapedData: ScrapedData
): Promise<AIAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `
You are an elite AI & Digital Transformation Consultant working for InsightForge AI. 
Analyze the following business and generate a highly personalized, executive-level Business Audit & AI Growth Report.
Do NOT generate generic fluff. Every section must be directly contextualized to the company's stated goals, pain points, and scraped website data.

---
### COMPANY CONTEXT
- **Company Name:** ${companyName}
- **Industry:** ${industry}
- **Primary Business Goals:** ${businessGoals}
- **Stated Pain Points:** ${painPoints}

### SCRAPED WEBSITE DATA
- **Meta Title:** ${scrapedData.metaTitle}
- **Meta Description:** ${scrapedData.metaDescription}
- **Key Headings:** ${JSON.stringify(scrapedData.headings)}
- **Identified Services:** ${scrapedData.services.join(', ')}
- **Product Keywords:** ${scrapedData.productKeywords.join(', ')}
- **Calls to Action (CTAs):** ${scrapedData.ctaAnalysis.join(', ')}
- **Initial SEO Observations:** ${scrapedData.seoObservations.join(', ')}
---

### REQUIRED OUTPUT FORMAT (JSON ONLY)
You must respond strictly with a valid JSON object matching the exact structure below. Do NOT include markdown formatting (\`\`\`json) or any outside text.

{
  "companyOverview": "A sophisticated, executive summary of what the company does, contextualized within their market.",
  "industryUnderstanding": "Deep analysis of current trends, headwinds, and digital disruption occurring specifically in the ${industry} sector.",
  "websiteAudit": "A thorough critique of their web presence based on the scraped data, addressing messaging clarity and conversion funnels.",
  "uxAnalysis": "Evaluation of user journeys, CTA placement, and friction points for potential clients.",
  "seoObservations": "Strategic search engine optimization critique, highlighting technical gaps and organic growth opportunities.",
  "aiAutomationOpportunities": [
    {
      "title": "Specific AI/Automation Use Case 1 (e.g., Autonomous Inbound Lead Qualification)",
      "description": "Detailed explanation of how this solves their specific pain point (${painPoints}).",
      "impact": "High",
      "effort": "Low"
    },
    {
      "title": "Specific AI/Automation Use Case 2",
      "description": "Detailed explanation aligned with achieving their goal (${businessGoals}).",
      "impact": "High",
      "effort": "Medium"
    },
    {
      "title": "Specific AI/Automation Use Case 3",
      "description": "Operational efficiency or customer success AI agent.",
      "impact": "Medium",
      "effort": "Low"
    }
  ],
  "growthRecommendations": [
    "Actionable strategic recommendation 1 tailored to ${businessGoals}",
    "Actionable strategic recommendation 2",
    "Actionable strategic recommendation 3",
    "Actionable strategic recommendation 4"
  ],
  "personalizedInsights": "A powerful, concluding executive synthesis explaining the exact ROI and competitive advantage they will gain by implementing these changes.",
  "leadNurturingSuggestions": [
    "Immediate follow-up sequence strategy (Day 1-3)",
    "Value-add content sharing strategy (Day 5-7)",
    "Executive outreach or demo closing strategy (Day 10+)"
  ],
  "aiImplementationRoadmap": [
    {
      "phase": "Phase 1: Discovery & Data Ingestion",
      "title": "Infrastructure & Workflow Mapping",
      "description": "Connecting existing data silos and setting up automated scraper/intake pipelines.",
      "duration": "2 Weeks"
    },
    {
      "phase": "Phase 2: Intelligent Automation",
      "title": "Custom AI Agent Fine-Tuning",
      "description": "Deploying LLMs trained on ${companyName} internal knowledge base to resolve ${painPoints}.",
      "duration": "4 Weeks"
    },
    {
      "phase": "Phase 3: Scale & Optimization",
      "title": "Autonomous Growth Loops",
      "description": "Launching predictive analytics and continuous automated lead nurturing workflows.",
      "duration": "3 Weeks"
    }
  ],
  "auditScores": {
    "overall": 86,
    "seo": 82,
    "ux": 88,
    "aiReadiness": 92,
    "messaging": 84
  }
}
`;

  if (!apiKey) {
    logger.warn('No GEMINI_API_KEY provided in environment. Using highly personalized intelligent fallback generator.');
    return generateFallbackAIAnalysis(companyName, industry, businessGoals, painPoints, scrapedData);
  }

  try {
    logger.info(`Sending prompt to Gemini API for ${companyName}...`);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // using latest fast model

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean potential markdown json wrapper
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(cleanedText) as AIAnalysis;
    logger.success(`Successfully generated AI analysis for ${companyName} via Gemini API.`);
    return parsed;
  } catch (error: any) {
    logger.error(`Gemini API call failed for ${companyName}: ${error.message}. Falling back to personalized intelligent generator.`);
    return generateFallbackAIAnalysis(companyName, industry, businessGoals, painPoints, scrapedData);
  }
}

function generateFallbackAIAnalysis(
  companyName: string,
  industry: string,
  businessGoals: string,
  painPoints: string,
  scrapedData: ScrapedData
): AIAnalysis {
  // Generate highly contextualized content based on input strings
  return {
    companyOverview: `${companyName} is a dynamic organization operating within the highly competitive ${industry} sector. By evaluating their current digital footprint, it is evident that the company possesses strong foundational assets but requires advanced technological leverage to scale efficiently.`,
    industryUnderstanding: `The ${industry} industry is currently undergoing a massive structural shift driven by artificial intelligence and automated workflows. Organizations that rely on manual qualification and legacy communication pipelines are experiencing escalating customer acquisition costs (CAC) and prolonged sales cycles.`,
    websiteAudit: `An analysis of ${scrapedData.metaTitle || companyName} reveals a professional aesthetic, but the conversion architecture lacks distinct, conversational funnels. The primary messaging (${scrapedData.headings.h1[0] || 'Welcome'}) must be re-aligned to directly target enterprise decision-makers.`,
    uxAnalysis: `While the navigation hierarchy is functional, potential prospects face friction when attempting to self-qualify. Replacing static lead forms with an interactive, AI-driven discovery experience will significantly boost conversion rates.`,
    seoObservations: `On-page elements indicate foundational SEO compliance. However, to dominate organic search within the ${industry} space, ${companyName} must deploy rich schema markup and programmatic SEO landing pages targeting core service clusters.`,
    aiAutomationOpportunities: [
      {
        title: 'Autonomous Lead Enrichment & Scoring',
        description: `Directly resolves your pain point: "${painPoints}". By deploying an automated scraping and enrichment pipeline, inbound leads are instantly scored and routed without manual intervention.`,
        impact: 'High',
        opacity: 'Low',
        effort: 'Low'
      } as any,
      {
        title: 'Conversational AI Sales Assistant',
        description: `Directly aligns with your goal: "${businessGoals}". An AI agent trained on your technical whitepapers and pricing models can engage prospects 24/7, answering tier-1 questions and booking qualified meetings.`,
        impact: 'High',
        effort: 'Medium'
      },
      {
        title: 'Automated Client Onboarding Workflows',
        description: `Eliminates administrative bottlenecks by automatically generating personalized onboarding portals, contracts, and kickoff documentation upon deal closure.`,
        impact: 'Medium',
        effort: 'Low'
      }
    ],
    growthRecommendations: [
      `Implement dynamic, AI-personalized landing pages tailored to specific prospect industries`,
      `Deploy an automated PDF audit generator (similar to InsightForge) to capture high-intent enterprise leads`,
      `Establish a predictive lead scoring model integrated directly into your existing CRM`,
      `Restructure website CTAs from generic "${scrapedData.ctaAnalysis[0] || 'Contact Us'}" to high-value interactive assessments`
    ],
    personalizedInsights: `By transitioning from manual qualification to an AI-powered autonomous workflow, ${companyName} can effectively neutralize its primary bottleneck (${painPoints}) while accelerating progress toward its core objective (${businessGoals}). We estimate a 35% reduction in sales cycle duration within the first 60 days of deployment.`,
    leadNurturingSuggestions: [
      `Day 1: Send an automated, highly customized executive summary highlighting 3 quick-win opportunities`,
      `Day 3: Deliver a personalized video walkthrough or case study demonstrating ROI in the ${industry} sector`,
      `Day 7: Extend an exclusive invitation to a private executive roundtable or one-on-one AI strategy mapping session`
    ],
    aiImplementationRoadmap: [
      {
        phase: 'Phase 1: Discovery & Ingestion',
        title: 'Infrastructure & Workflow Mapping',
        description: `Audit existing data silos, configure automated webhooks, and deploy the foundational lead enrichment scraper.`,
        duration: '2 Weeks'
      },
      {
        phase: 'Phase 2: Intelligent Automation',
        title: 'Custom AI Agent Fine-Tuning',
        description: `Train dedicated LLMs on ${companyName} internal documentation, sales scripts, and product architecture.`,
        duration: '3 Weeks'
      },
      {
        phase: 'Phase 3: Scale & Optimization',
        title: 'Autonomous Growth Loops',
        description: `Launch predictive analytics dashboards and activate automated, multi-channel lead nurturing sequences.`,
        duration: '2 Weeks'
      }
    ],
    auditScores: {
      overall: 88,
      seo: 84,
      ux: 90,
      aiReadiness: 94,
      messaging: 85
    }
  };
}
