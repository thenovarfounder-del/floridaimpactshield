# Florida Impact Shield — Complete Website
**floridaimpactshield.com**

## Quick Start (Vercel)
1. Push this folder to GitHub
2. Import in Vercel → Deploy
3. Add custom domain: floridaimpactshield.com
4. Update DNS A records per Vercel instructions

## Before Going Live — Required Steps

### 1. Anthropic API Key (Eva Chatbot)
In `/assets/js/app.js`, the Eva chatbot calls the Anthropic API directly.
**For production:** proxy the API key through your backend to avoid exposing it.
- Create a Vercel Edge Function at `/api/chat` that calls Anthropic
- Change Eva's fetch URL from `https://api.anthropic.com/...` to `/api/chat`
- Store key as `ANTHROPIC_API_KEY` env var in Vercel dashboard

### 2. Lead Database (Supabase — replace localStorage)
In `/assets/js/app.js` — `LeadDB.save()`:
```javascript
// Replace the localStorage line with:
await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(lead)
});
```
Create Vercel serverless function at `/api/leads.js`:
- Inserts to Supabase `leads` table
- Sends email notification via Resend to info@floridaimpactshield.com

### 3. Google Analytics
Replace `G-XXXXXXXXXX` in `index.html` with your real GA4 Measurement ID.

### 4. Google Search Console
After DNS propagates (24–48hrs), submit:
`https://floridaimpactshield.com/sitemap.xml`

### 5. License Number
Replace `CBC1265XXX` everywhere with your actual license number.

## Site Structure
```
/                              → Homepage with calculator
/pages/impact-windows-miami    → Miami-Dade county page
/pages/impact-windows-broward  → Broward county page
/pages/impact-windows-palm-beach → Palm Beach county page
/pages/impact-windows-naples   → Naples/Lee/Collier
/pages/impact-windows-tampa    → Tampa Bay area
/pages/impact-windows-orlando  → Orlando/Central FL
/pages/hurricane-windows-insurance-savings → Insurance guide
/pages/my-safe-florida-home-grants → MSFH grant guide
/pages/impact-windows-cost     → Cost guide 2026
/pages/financing               → 0% financing
/pages/about                   → About us
/pages/contact                 → Contact form
/pages/privacy-policy          → Privacy policy
/pages/terms                   → Terms of service
/blog/                         → Blog index
/blog/impact-windows-insurance-discount-florida → Blog post 1
/admin/                        → Admin dashboard (leads, newsletter, AI blog gen)
```

## Lead Machine Features
- **Eva AI Chatbot** — Claude-powered, qualifies leads, captures email/phone, books quotes
- **Lead Database** — All form fills, Eva conversations, newsletter subs saved to localStorage → replace with Supabase
- **Quote Modal** — On every page, full lead form with consent tracking
- **Social Proof Toasts** — 8 rotating customer stories, fires at 6s then every 13s
- **Sticky Bottom Bar** — Appears at 600px scroll, quote + call CTAs
- **Exit Intent Banner** — Fires on mouse-leave, last-chance CTA
- **Newsletter Capture** — Homepage + blog, lead magnet offer
- **Insurance Calculator** — Live, county-specific, drives engagement and quote submissions

## Admin Dashboard (/admin/)
- **Leads table** — All leads with CSV export, filterable by type
- **Newsletter composer** — Broadcast to all subscribers
- **AI Blog Generator** — One-click Claude-powered SEO post generation
- **Analytics setup guide** — GA4, Search Console, Supabase, Resend
- **Settings panel** — API keys, license, contact info

## SEO Keywords Targeted
- impact windows Florida
- hurricane impact windows Florida
- impact windows Miami-Dade / Broward / Palm Beach / Naples / Tampa / Orlando
- hurricane windows insurance savings Florida
- My Safe Florida Home Program 2026
- MSFH grant impact windows
- impact windows cost Florida 2026
- wind mitigation discount Florida
- hurricane impact windows reduce insurance

© 2026 Florida Impact Shield, LLC
