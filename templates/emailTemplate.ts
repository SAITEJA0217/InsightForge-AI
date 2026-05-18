import { AIAnalysis, LeadFormData } from '../types';

export function getEmailHtmlTemplate(lead: LeadFormData, analysis: AIAnalysis): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Personalized AI Growth Audit Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0b0f19;
      color: #f1f5f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #0b0f19;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .logo {
      display: inline-block;
      padding: 8px 16px;
      background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
      border-radius: 8px;
      font-weight: bold;
      color: #0b0f19;
      font-size: 20px;
      margin-bottom: 16px;
    }
    .title {
      font-size: 28px;
      font-weight: bold;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 16px;
      color: #38bdf8;
      margin: 0;
    }
    .card {
      background-color: #131b2e;
      border: 1px solid #1e293b;
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 32px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      color: #94a3b8;
      margin-bottom: 24px;
    }
    .highlight-box {
      background-color: rgba(56, 189, 248, 0.1);
      border-left: 4px solid #38bdf8;
      padding: 20px;
      border-radius: 0 8px 8px 0;
      margin-bottom: 24px;
    }
    .highlight-title {
      font-weight: bold;
      color: #38bdf8;
      margin-top: 0;
      margin-bottom: 8px;
      font-size: 16px;
    }
    .highlight-text {
      color: #f1f5f9;
      margin: 0;
      font-size: 15px;
      line-height: 1.5;
    }
    .cta-container {
      text-align: center;
      margin-top: 32px;
      margin-bottom: 16px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
      color: #0b0f19;
      font-weight: bold;
      font-size: 16px;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.3);
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #64748b;
      margin-top: 40px;
      border-top: 1px solid #1e293b;
      padding-top: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">IF</div>
      <h1 class="title">InsightForge AI</h1>
      <p class="subtitle">Digital Transformation & AI Strategy</p>
    </div>

    <div class="card">
      <h2 class="greeting">Hello ${lead.fullName},</h2>
      <p class="text">
        Thank you for requesting an AI Growth Audit for <strong>${lead.companyName}</strong>. Our autonomous AI consulting engine has completed a thorough analysis of your digital footprint, website architecture, and market positioning within the ${lead.industry} industry.
      </p>

      <div class="highlight-box">
        <div class="highlight-title">Executive Insight Summary</div>
        <p class="highlight-text">
          ${analysis.personalizedInsights}
        </p>
      </div>

      <p class="text">
        We have attached your comprehensive <strong>4-Page Premium Consulting PDF Report</strong> to this email. Inside, you will find detailed audit scorecards, specific AI automation opportunities to resolve your pain points, and a phased implementation roadmap.
      </p>

      <div class="cta-container">
        <a href="https://${lead.websiteUrl.replace(/https?:\/\//, '')}" class="cta-button">Review Your Audit Report</a>
      </div>
    </div>

    <div class="footer">
      <p>InsightForge AI Consulting &bull; Autonomous Lead Enrichment Platform</p>
      <p>&copy; ${new Date().getFullYear()} InsightForge AI. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
}
