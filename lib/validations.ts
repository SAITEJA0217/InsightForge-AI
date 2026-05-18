import { z } from "zod";

export const leadFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name is too long"),
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name is too long"),
  websiteUrl: z.string().url("Please enter a valid URL (e.g., https://example.com)").refine((val) => val.startsWith('http://') || val.startsWith('https://'), {
    message: "URL must start with http:// or https://",
  }),
  industry: z.string().min(2, "Please specify your industry"),
  businessGoals: z.string().min(10, "Please provide more detail about your business goals (min 10 chars)"),
  painPoints: z.string().min(10, "Please provide more detail about your pain points (min 10 chars)"),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;
