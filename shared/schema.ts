import { z } from "zod";

// Lead submission schema
export const insertLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  contact_me_by_fax: z.string().max(0, "Invalid submission"), // honeypot field
});

export const leadSchema = insertLeadSchema.extend({
  id: z.string(),
  timestamp: z.string(),
  maskedIp: z.string(),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = z.infer<typeof leadSchema>;

// Service type for pricing cards
export interface Service {
  id: string;
  title: string;
  scope: string[];
  price: string;
  turnaround: string;
}

// Project type
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}
