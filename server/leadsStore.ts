import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import path from "path";
import type { Lead, InsertLead } from "@shared/schema";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

export async function saveLead(insertLead: InsertLead, ip: string): Promise<Lead> {
  // Mask IP address (keep first two octets)
  const maskedIp = ip.split(".").slice(0, 2).join(".") + ".xxx.xxx";
  
  const lead: Lead = {
    ...insertLead,
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    maskedIp,
  };

  // Read existing leads
  const fileContent = await fs.readFile(LEADS_FILE, "utf-8");
  const leads: Lead[] = JSON.parse(fileContent);

  // Add new lead
  leads.push(lead);

  // Write atomically by writing to temp file first
  const tempFile = `${LEADS_FILE}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(leads, null, 2));
  await fs.rename(tempFile, LEADS_FILE);

  return lead;
}

export async function getAllLeads(): Promise<Lead[]> {
  const fileContent = await fs.readFile(LEADS_FILE, "utf-8");
  return JSON.parse(fileContent);
}
