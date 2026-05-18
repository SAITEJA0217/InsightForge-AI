import { AIAnalysis, LeadFormData, ScrapedData } from '../types';

export function getPdfHtmlTemplate(
  lead: LeadFormData,
  scrapedData: ScrapedData,
  analysis: AIAnalysis
): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI Growth Audit Report - ${lead.companyName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800&display=swap');

    :root {
      --bg-main: #0b0f19;
      --bg-card: #131b2e;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --accent-glow: rgba(56, 189, 248, 0.2);
      --border: #1e293b;
      --gradient-brand: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg-main);
      color: var(--text-main);
      line-height: 1.6;
      font-size: 14px;
      -webkit-print-color-adjust: exact;
    }

    /* Page Setup */
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 25mm 20mm;
      position: relative;
      page-break-after: always;
      overflow: hidden;
      background-color: var(--bg-main);
    }

    /* Background Glows */
    .glow-circle-1 {
      position: absolute;
      top: -100px;
      right: -100px;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(11,15,25,0) 70%);
      z-index: 1;
    }

    .glow-circle-2 {
      position: absolute;
      bottom: -100px;
      left: -100px;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(129,140,248,0.15) 0%, rgba(11,15,25,0) 70%);
      z-index: 1;
    }

    .content-wrapper {
      position: relative;
      z-index: 2;
    }

    /* Typography */
    h1, h2, h3, h4 {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .text-gradient {
      background: var(--gradient-brand);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Cover Page */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 247mm; /* Full page height minus padding */
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-logo {
      width: 36px;
      height: 36px;
      background: var(--gradient-brand);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 20px;
      color: #0b0f19;
    }

    .brand-name {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    .cover-title-container {
      margin-top: 60px;
      margin-bottom: 40px;
    }

    .cover-subtitle {
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: var(--accent);
      margin-bottom: 16px;
      font-weight: 600;
    }

    .cover-title {
      font-size: 52px;
      line-height: 1.1;
      margin-bottom: 24px;
    }

    .cover-company {
      font-size: 32px;
      color: var(--text-muted);
      font-weight: 400;
    }

    .meta-box {
      background-color: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 32px;
      margin-top: auto;
      margin-bottom: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }

    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .meta-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      font-weight: 600;
    }

    .meta-val {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-main);
    }

    /* Inner Pages */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 16px;
      margin-bottom: 32px;
    }

    .page-header-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .section-title {
      font-size: 28px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    /* Score Cards */
    .score-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 32px;
    }

    .score-card {
      background-color: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .score-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: var(--gradient-brand);
    }

    .score-val {
      font-size: 48px;
      font-weight: 800;
      font-family: 'Outfit', sans-serif;
      margin-bottom: 8px;
    }

    .score-label {
      font-size: 14px;
      color: var(--text-muted);
      font-weight: 500;
    }

    /* Progress Bar */
    .progress-container {
      width: 100%;
      background-color: var(--border);
      height: 8px;
      border-radius: 4px;
      margin-top: 12px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: var(--gradient-brand);
      border-radius: 4px;
    }

    /* Content Cards */
    .card {
      background-color: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 24px;
    }

    .card-title {
      font-size: 20px;
      margin-bottom: 16px;
      color: var(--accent);
    }

    .card-text {
      color: var(--text-muted);
      margin-bottom: 16px;
      line-height: 1.7;
    }

    .card-text:last-child {
      margin-bottom: 0;
    }

    /* AI Opportunities */
    .opportunity-card {
      background: linear-gradient(180deg, var(--bg-card) 0%, rgba(19, 27, 46, 0.6) 100%);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 24px;
      position: relative;
      overflow: hidden;
    }

    .opp-badge-container {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    .badge {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .badge-impact {
      background-color: rgba(56, 189, 248, 0.15);
      color: var(--accent);
      border: 1px solid rgba(56, 189, 248, 0.3);
    }

    .badge-effort {
      background-color: rgba(148, 163, 184, 0.15);
      color: var(--text-muted);
      border: 1px solid rgba(148, 163, 184, 0.3);
    }

    /* Roadmap */
    .roadmap-timeline {
      position: relative;
      padding-left: 32px;
      margin-top: 24px;
    }

    .roadmap-timeline::before {
      content: '';
      position: absolute;
      top: 0;
      left: 7px;
      width: 2px;
      height: 100%;
      background-color: var(--border);
    }

    .roadmap-item {
      position: relative;
      margin-bottom: 32px;
    }

    .roadmap-item:last-child {
      margin-bottom: 0;
    }

    .roadmap-dot {
      position: absolute;
      left: -32px;
      top: 4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--gradient-brand);
      border: 4px solid var(--bg-main);
      box-shadow: 0 0 10px var(--accent);
    }

    .roadmap-phase {
      font-size: 13px;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
    }

    .roadmap-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .roadmap-desc {
      color: var(--text-muted);
      font-size: 14px;
    }

    /* Footer Branding */
    .page-footer {
      position: absolute;
      bottom: 20mm;
      left: 20mm;
      right: 20mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border);
      padding-top: 16px;
      font-size: 12px;
      color: var(--text-muted);
    }
  </style>
</head>
<body>

  <!-- PAGE 1: COVER -->
  <div class="page">
    <div class="glow-circle-1"></div>
    <div class="glow-circle-2"></div>
    <div class="content-wrapper cover-page">
      
      <div class="header-brand">
        <div class="brand-logo">IF</div>
        <div class="brand-name">InsightForge <span class="text-gradient">AI</span></div>
      </div>

      <div class="cover-title-container">
        <div class="cover-subtitle">Executive Business Audit & AI Growth Strategy</div>
        <h1 class="cover-title">Digital Transformation & AI Readiness Report</h1>
        <div class="cover-company">Prepared for: <span class="text-gradient">${lead.companyName}</span></div>
      </div>

      <div class="meta-box">
        <div class="meta-grid">
          <div class="meta-item">
            <div class="meta-label">Primary Contact</div>
            <div class="meta-val">${lead.fullName}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Email Address</div>
            <div class="meta-val">${lead.email}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Industry</div>
            <div class="meta-val">${lead.industry}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Date Generated</div>
            <div class="meta-val">${currentDate}</div>
          </div>
        </div>
      </div>

      <div style="font-size: 12px; color: var(--text-muted); text-align: center;">
        CONFIDENTIAL & PROPRIETARY &bull; INSIGHTFORGE AI CONSULTING
      </div>

    </div>
  </div>

  <!-- PAGE 2: EXECUTIVE SUMMARY & SCORE CARDS -->
  <div class="page">
    <div class="glow-circle-1"></div>
    <div class="content-wrapper">
      
      <div class="page-header">
        <div class="page-header-title">Executive Summary & Audit Scores</div>
        <div class="header-brand" style="gap: 8px;">
          <div class="brand-logo" style="width: 24px; height: 24px; font-size: 12px;">IF</div>
          <div class="brand-name" style="font-size: 16px;">InsightForge</div>
        </div>
      </div>

      <h2 class="section-title">Audit Scorecards</h2>
      
      <div class="score-grid">
        <div class="score-card">
          <div class="score-val text-gradient">${analysis.auditScores.overall}%</div>
          <div class="score-label">Overall AI Readiness</div>
          <div class="progress-container"><div class="progress-bar" style="width: ${analysis.auditScores.overall}%"></div></div>
        </div>
        <div class="score-card">
          <div class="score-val text-gradient">${analysis.auditScores.seo}%</div>
          <div class="score-label">SEO & Discoverability</div>
          <div class="progress-container"><div class="progress-bar" style="width: ${analysis.auditScores.seo}%"></div></div>
        </div>
        <div class="score-card">
          <div class="score-val text-gradient">${analysis.auditScores.ux}%</div>
          <div class="score-label">UX & Conversion Funnel</div>
          <div class="progress-container"><div class="progress-bar" style="width: ${analysis.auditScores.ux}%"></div></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Company Overview</h3>
        <p class="card-text">${analysis.companyOverview}</p>
      </div>

      <div class="card">
        <h3 class="card-title">Industry Understanding (${lead.industry})</h3>
        <p class="card-text">${analysis.industryUnderstanding}</p>
      </div>

      <div class="page-footer">
        <div>InsightForge AI &bull; Confidential</div>
        <div>Page 2</div>
      </div>

    </div>
  </div>

  <!-- PAGE 3: WEBSITE AUDIT & OPPORTUNITIES -->
  <div class="page">
    <div class="glow-circle-2"></div>
    <div class="content-wrapper">
      
      <div class="page-header">
        <div class="page-header-title">Website Audit & AI Opportunities</div>
        <div class="header-brand" style="gap: 8px;">
          <div class="brand-logo" style="width: 24px; height: 24px; font-size: 12px;">IF</div>
          <div class="brand-name" style="font-size: 16px;">InsightForge</div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Website & UX Analysis</h3>
        <p class="card-text"><strong>Website Audit:</strong> ${analysis.websiteAudit}</p>
        <p class="card-text" style="margin-top: 12px;"><strong>User Experience (UX) Critique:</strong> ${analysis.uxAnalysis}</p>
        <p class="card-text" style="margin-top: 12px;"><strong>SEO Observations:</strong> ${analysis.seoObservations}</p>
      </div>

      <h2 class="section-title" style="margin-top: 36px;">AI Automation Opportunities</h2>
      
      ${analysis.aiAutomationOpportunities.map((opp) => `
        <div class="opportunity-card">
          <div class="opp-badge-container">
            <div class="badge badge-impact">Impact: ${opp.impact}</div>
            <div class="badge badge-effort">Effort: ${opp.effort}</div>
          </div>
          <h3 class="card-title" style="color: var(--text-main); font-size: 22px;">${opp.title}</h3>
          <p class="card-text">${opp.description}</p>
        </div>
      `).join('')}

      <div class="page-footer">
        <div>InsightForge AI &bull; Confidential</div>
        <div>Page 3</div>
      </div>

    </div>
  </div>

  <!-- PAGE 4: ROADMAP & STRATEGIC RECOMMENDATIONS -->
  <div class="page">
    <div class="glow-circle-1"></div>
    <div class="content-wrapper">
      
      <div class="page-header">
        <div class="page-header-title">Implementation Roadmap & Recommendations</div>
        <div class="header-brand" style="gap: 8px;">
          <div class="brand-logo" style="width: 24px; height: 24px; font-size: 12px;">IF</div>
          <div class="brand-name" style="font-size: 16px;">InsightForge</div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Strategic Growth Recommendations</h3>
        <ul style="padding-left: 20px; color: var(--text-muted); line-height: 1.8;">
          ${analysis.growthRecommendations.map((rec) => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
        </ul>
      </div>

      <h2 class="section-title" style="margin-top: 36px;">AI Implementation Roadmap</h2>
      
      <div class="roadmap-timeline">
        ${analysis.aiImplementationRoadmap.map((item) => `
          <div class="roadmap-item">
            <div class="roadmap-dot"></div>
            <div class="roadmap-phase">${item.phase} (${item.duration})</div>
            <div class="roadmap-title">${item.title}</div>
            <div class="roadmap-desc">${item.description}</div>
          </div>
        `).join('')}
      </div>

      <div class="card" style="margin-top: 36px; border-color: var(--accent);">
        <h3 class="card-title" style="color: var(--accent);">Personalized Executive Insights</h3>
        <p class="card-text" style="color: var(--text-main); font-size: 15px;">${analysis.personalizedInsights}</p>
      </div>

      <div class="page-footer">
        <div>InsightForge AI &bull; Confidential</div>
        <div>Page 4</div>
      </div>

    </div>
  </div>

</body>
</html>
`;
}
