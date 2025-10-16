import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertLeadSchema, type InsertLead, type Service, type Project } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { Check, Code, Database, Cloud, Zap, Shield, BarChart, Mail, ExternalLink, Linkedin, Github } from "lucide-react";

const services: Service[] = [
  {
    id: "setup",
    title: "Setup & Configuration",
    scope: ["Org setup", "User configuration", "Basic customization"],
    price: "$900",
    turnaround: "3–5 business days"
  },
  {
    id: "apex",
    title: "Custom Apex Feature",
    scope: ["1 trigger + handler", "Unit tests", "Documentation"],
    price: "$1,200",
    turnaround: "3–5 business days"
  },
  {
    id: "lwc",
    title: "Lightning Web Component",
    scope: ["1 reusable LWC", "Responsive design", "Integration ready"],
    price: "$1,300",
    turnaround: "4–7 business days"
  },
  {
    id: "flow",
    title: "Flow Automation",
    scope: ["Moderate complexity", "Error handling", "Testing"],
    price: "$650",
    turnaround: "2–4 business days"
  },
  {
    id: "api",
    title: "API Integration",
    scope: ["One system", "Moderate complexity", "Error handling"],
    price: "$2,200",
    turnaround: "7–14 business days"
  },
  {
    id: "portal",
    title: "Experience Cloud Portal",
    scope: ["Starter setup", "Custom branding", "Basic pages"],
    price: "$3,000",
    turnaround: "10–20 business days"
  },
  {
    id: "migration",
    title: "Data Migration",
    scope: ["Up to ~100k records", "Data mapping", "Validation"],
    price: "$1,100",
    turnaround: "3–7 business days"
  },
  {
    id: "reports",
    title: "Reports & Dashboards",
    scope: ["Per dashboard", "Custom charts", "Filters"],
    price: "$450",
    turnaround: "1–3 business days"
  },
  {
    id: "security",
    title: "Security Health Check",
    scope: ["Permission audit", "Optimization", "Best practices"],
    price: "$900",
    turnaround: "2–5 business days"
  },
  {
    id: "support",
    title: "Ongoing Support Pack",
    scope: ["Light care plan", "Bug fixes", "Minor enhancements"],
    price: "$1,200/month",
    turnaround: "Monthly subscription"
  }
];

const projects: Project[] = [
  {
    id: "1",
    title: "Master Client Portal",
    description: "Built comprehensive Experience Cloud portal for client self-service with real-time data access and document management.",
    technologies: ["Experience Cloud", "LWC", "Apex", "Integration"]
  },
  {
    id: "2",
    title: "360 SMS Integration",
    description: "Integrated 360 SMS platform with Salesforce for automated customer communications and notification workflows.",
    technologies: ["API Integration", "Apex", "Flow", "SMS"]
  },
  {
    id: "3",
    title: "SMS Round-Robin Engine",
    description: "Developed intelligent lead distribution system using round-robin SMS assignment for mortgage loan officers.",
    technologies: ["Apex", "Flow Automation", "Custom Logic"]
  },
  {
    id: "4",
    title: "Mortgage Industry Integration",
    description: "Built seamless integrations between Salesforce and LOS systems for mortgage processing workflows.",
    technologies: ["API", "Financial Services", "Data Sync"]
  }
];

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      services: [],
      contact_me_by_fax: "",
    },
  });

  const submitLead = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await apiRequest("POST", "/api/lead", data);
      return response;
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      setSelectedServices([]);
      setTimeout(() => setShowSuccess(false), 4000);
    },
  });

  const onSubmit = (data: InsertLead) => {
    submitLead.mutate(data);
  };

  const handleServiceToggle = (serviceId: string) => {
    const updated = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];
    
    setSelectedServices(updated);
    form.setValue("services", updated);
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
        <div className="gradient-blob gradient-blob-1" />
        <div className="gradient-blob gradient-blob-2" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Rohan Bhosale
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Salesforce Developer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Results-driven Salesforce Developer with 3+ years of experience in Financial Services and Mortgage (LOS) solutions. Specializing in LWC, Aura, Apex, and Experience Cloud to deliver end-to-end Salesforce implementations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-lift px-8"
              onClick={scrollToContact}
              data-testid="button-contact-hero"
            >
              Contact Me
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-lift px-8"
              onClick={scrollToProjects}
              data-testid="button-view-projects"
            >
              View Projects
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" data-testid="heading-about">About</h2>
          <div className="glass-card rounded-lg p-8 transition-smooth">
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-about-description">
              With a deep passion for Salesforce development, I bring technical expertise and business acumen to every project. 
              My experience spans across Financial Services and Mortgage industries, where I've successfully delivered solutions 
              that streamline operations, enhance user experiences, and drive business growth. I specialize in building scalable, 
              maintainable code using modern Salesforce technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-testid="heading-skills">Skills & Expertise</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: <Code className="w-8 h-8" />, name: "Lightning Web Components" },
              { icon: <Zap className="w-8 h-8" />, name: "Apex Development" },
              { icon: <Cloud className="w-8 h-8" />, name: "Experience Cloud" },
              { icon: <Database className="w-8 h-8" />, name: "SOQL & Data Modeling" },
              { icon: <Shield className="w-8 h-8" />, name: "Security & Permissions" },
              { icon: <BarChart className="w-8 h-8" />, name: "Reports & Dashboards" },
              { icon: <Zap className="w-8 h-8" />, name: "Flow Automation" },
              { icon: <Code className="w-8 h-8" />, name: "API Integrations" },
            ].map((skill, index) => (
              <div 
                key={index} 
                className="glass-card rounded-lg p-6 flex flex-col items-center text-center transition-smooth hover-elevate"
                data-testid={`skill-${index}`}
              >
                <div className="text-primary mb-3">{skill.icon}</div>
                <p className="text-sm font-medium">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-testid="heading-projects">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="glass-card rounded-lg p-8 transition-smooth"
                data-testid={`project-${project.id}`}
              >
                <h3 className="text-2xl font-semibold mb-4" data-testid={`project-title-${project.id}`}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`project-description-${project.id}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                      data-testid={`project-tech-${project.id}-${idx}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-testid="heading-experience">Experience</h2>
          
          <div className="glass-card rounded-lg p-8 transition-smooth max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-2" data-testid="text-job-title">Salesforce Developer</h3>
            <p className="text-primary font-medium mb-4" data-testid="text-company">Inflooens</p>
            <p className="text-muted-foreground mb-6" data-testid="text-duration">April 2022 – September 2025</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Developed and maintained Salesforce solutions for Financial Services and Mortgage industries</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Built custom Lightning Web Components and Apex solutions for complex business requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Implemented API integrations with third-party systems including LOS and SMS platforms</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Created Experience Cloud portals for enhanced client self-service capabilities</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" data-testid="heading-services">Services & Fixed Pricing</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Transparent, fixed-price Salesforce services tailored to your needs
          </p>
          
          <div className="services-grid mb-8">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="glass-card rounded-lg p-6 transition-smooth flex flex-col"
                data-testid={`service-${service.id}`}
              >
                <h3 className="text-xl font-semibold mb-4" data-testid={`service-title-${service.id}`}>
                  {service.title}
                </h3>
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.scope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border">
                  <p className="text-2xl font-bold text-primary mb-1" data-testid={`service-price-${service.id}`}>
                    {service.price}
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid={`service-turnaround-${service.id}`}>
                    {service.turnaround}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground text-center" data-testid="text-pricing-footnote">
            Pricing shown in USD. Final quote confirmed after a short discovery call; complex scopes may require a custom estimate.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 px-6 bg-accent/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" data-testid="heading-contact">Get In Touch</h2>
          <p className="text-muted-foreground text-center mb-12">
            Ready to start your Salesforce project? Fill out the form below and I'll get back to you soon.
          </p>
          
          {showSuccess && (
            <div 
              className="mb-8 p-4 bg-[hsl(var(--success))]/20 border border-[hsl(var(--success))] rounded-lg text-center"
              role="alert"
              aria-live="polite"
              data-testid="alert-success"
            >
              <p className="text-[hsl(var(--success))] font-medium">
                ✅ Thanks! Rohan will reach out to you soon.
              </p>
            </div>
          )}
          
          <div className="glass-card rounded-lg p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Your name"
                          data-testid="input-name"
                          className="bg-background/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          placeholder="your.email@example.com"
                          data-testid="input-email"
                          className="bg-background/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Tell me about your project..."
                          rows={5}
                          data-testid="input-message"
                          className="bg-background/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel className="mb-4 block">Services Interested In *</FormLabel>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={service.id}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                          data-testid={`checkbox-service-${service.id}`}
                        />
                        <label
                          htmlFor={service.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {service.title}
                        </label>
                      </div>
                    ))}
                  </div>
                  {form.formState.errors.services && (
                    <p className="text-sm text-destructive mt-2">{form.formState.errors.services.message}</p>
                  )}
                </div>

                {/* Honeypot field - hidden from users */}
                <FormField
                  control={form.control}
                  name="contact_me_by_fax"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} tabIndex={-1} autoComplete="off" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full btn-lift"
                  disabled={submitLead.isPending}
                  data-testid="button-submit-contact"
                >
                  {submitLead.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground" data-testid="text-footer-copyright">
              © 2025 Rohan Bhosale. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a 
                href="mailto:rohan@example.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
                data-testid="link-email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
                data-testid="link-github"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
