import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertLeadSchema } from "@shared/schema";
import { saveLead } from "./leadsStore";
import { sendConfirmationEmail } from "./email";
import rateLimit from "express-rate-limit";

// Rate limiter: 15 requests per minute
const leadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15,
  message: { error: "Too many submissions, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // POST /api/lead - Submit lead form
  app.post("/api/lead", leadLimiter, async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertLeadSchema.parse(req.body);

      // Honeypot check - if filled, it's a bot
      if (validatedData.contact_me_by_fax) {
        return res.status(400).json({ error: "Invalid submission" });
      }

      // Get client IP
      const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || 
                 req.socket.remoteAddress || 
                 "unknown";

      // Save lead to file
      const lead = await saveLead(validatedData, ip);

      // Send confirmation email (don't block response on email)
      sendConfirmationEmail(validatedData.email, validatedData.name).catch((err) => {
        console.error("Failed to send confirmation email:", err.message);
      });

      res.json({ 
        success: true, 
        message: "Lead submitted successfully",
        leadId: lead.id 
      });
    } catch (error: any) {
      console.error("Lead submission error:", error.message);
      
      if (error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      
      res.status(500).json({ error: "Failed to submit lead" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
