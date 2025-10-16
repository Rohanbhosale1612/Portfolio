# Design Guidelines: RBH Premium Salesforce Developer Portfolio

## Design Essence
Calm, confident, modern — a premium dark portfolio communicating technical authority and approachability. Think "SaaS design polish + enterprise trust" with glassmorphism and soft-glow gradients.

## Color System

**Backgrounds:**
- Primary: Deep navy/slate (#071021 or #0f172a)
- Surface cards: Soft translucent (rgba white with low opacity)

**Accents:**
- Primary: Indigo/violet (#6366F1)
- Secondary: Sky blue (#0ea5e9)

**Text:**
- Primary: Off-white (#F8FAFC)
- Muted: Cool gray (#94A3B8)

**Feedback:**
- Error: Pink/rose (#F472B6)
- Success: Green (#34D399)

## Typography

**Headline Fonts:** Inter / Poppins / Outfit — bold, large, high contrast
**Body Font:** Inter / Roboto — medium weight, generous line-height

**Sizes:**
- Hero: ≥40–48px desktop
- Section headings: 20–28px
- Body: 16px
- Small uppercase labels: slight tracking

## Layout & Spacing

**Container:** Max content width 1150–1300px
**Grid:** 12-column base with breakpoints at 640/768/1024px
**Spacing rhythm:** 24/16/12px scales with large leading in hero
**Responsive:** 1 column mobile → 2 columns ≥768px → 3-4 columns for icon grids

## Surface Treatment (Glassmorphism)

**Cards:**
- Translucent background with subtle 1px rgba border
- Soft shadow with 12–16px border-radius
- Background: layered blurs with soft circular radial gradients (indigo → cyan) at very low opacity
- Decorative blurred "blobs" behind hero section

## Icons & Imagery

**Icons:** SVG only — Heroicons/Lucide/Feather style
- Stroke: 1.6–2.0 weight
- Monochrome with accent fills on hover
- No stock photos; if portrait needed use simple vector avatar or outline illustration

## Micro-Interactions

**Buttons:**
- Hover: translateY -2 to -4px with enhanced shadow
- Subtle color shift on hover
- Smooth transition easing

**Cards:**
- Lift + border-glow on hover
- Small delay and easing

**Form Inputs:**
- Focus ring using accent color (#6366F1)
- Smooth transition

**Success Messages:**
- Inline banner with ✅ check emoji
- Fade in/out with 4s auto-hide

## Page Structure

**Sections (in order):**
1. Hero: Name, title, 1–2 line summary, primary CTA "Contact Me" + secondary "View Projects" with soft blurred gradient blobs background
2. About: Brief introduction
3. Skills: Expanded Salesforce skills with SVG icons
4. Projects: 4 project cards with glassmorphic treatment
5. Experience: Single role card
6. Services & Pricing: 10 cards using custom CSS grid (not Tailwind) for consistent behavior
7. Contact: Lead intake form
8. Footer: Minimal, clean

**Pricing Cards Must Include:**
- Service title
- 2–4 scope bullets
- Price (USD)
- Turnaround timeline
- Footnote: "Pricing shown in USD. Final quote confirmed after a short discovery call; complex scopes may require a custom estimate."

## Form UX

**Validation:**
- Client-side and server-side validation
- Inline error messages
- Required fields: name, email, message, at least one service selected
- Honeypot field (hidden): contact_me_by_fax

**Success State:**
- Message: "✅ Thanks! Rohan will reach out to you soon."
- Clear form after submission
- Auto-hide success banner after 4s

## Accessibility

- WCAG AA contrast for all text
- Focus states for keyboard users
- Labels properly associated with inputs
- aria-live for success messages

## Tone & Microcopy

Friendly, confident, direct with short sentences and bulleted skill lists
- CTAs: "Contact Me", "Request Quote", "View Projects"
- Professional yet approachable language throughout

## Visual References

- Glass/blur cards: Apple Music UI aesthetic
- SaaS hero gradients: Linear-style gradients
- Layout/spacing: Stripe and Vercel marketing pages (minimal, spacious)
- Micro-interactions: Subtle hover lift with soft shadows

## Images

No hero image required. Use decorative blurred gradient blobs and glassmorphic elements to create visual interest in the hero section instead of traditional imagery.