/* ============================================
   FLORIDA IMPACT SHIELD — CORE APP JS
   floridaimpactshield.com
   All shared functionality: Eva AI, Lead DB,
   Modal, Toasts, Exit Intent, Sticky Bar
   ============================================ */

'use strict';

// ─── CONFIGURATION ────────────────────────────────────────────────
const CONFIG = {
  siteName: 'Florida Impact Shield',
  domain: 'floridaimpactshield.com',
  phone: '(888) 975-4440',
  phoneRaw: '+18889754440',
  email: 'info@floridaimpactshield.com',
  address: 'Miami, FL 33101',
  license: 'CBC1265XXX',
  anthropicModel: 'claude-sonnet-4-20250514',
  dbKey: 'fis_leads_db',
  newsletterKey: 'fis_newsletter',
  sessionKey: 'fis_session'
};

// ─── LEAD DATABASE (localStorage — replace with Supabase in production) ───
const LeadDB = {
  getAll() {
    try { return JSON.parse(localStorage.getItem(CONFIG.dbKey) || '[]'); }
    catch(e) { return []; }
  },
  save(lead) {
    const leads = this.getAll();
    const existing = leads.findIndex(l => l.email === lead.email);
    const record = {
      ...lead,
      id: lead.id || 'lead_' + Date.now(),
      createdAt: lead.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: lead.source || document.title,
      page: window.location.pathname,
      utm: this.getUTM()
    };
    if (existing >= 0) {
      leads[existing] = { ...leads[existing], ...record };
    } else {
      leads.unshift(record);
    }
    localStorage.setItem(CONFIG.dbKey, JSON.stringify(leads));
    this.notifyAdmin(record);
    return record;
  },
  getUTM() {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
      term: params.get('utm_term') || ''
    };
  },
  notifyAdmin(lead) {
    // In production: POST to /api/leads endpoint → Supabase → email notification
    console.log('[FIS Lead Captured]', lead);
    // Example Supabase call:
    // fetch('/api/leads', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(lead) })
  },
  count() { return this.getAll().length; },
  subscribeNewsletter(email, name) {
    const subs = JSON.parse(localStorage.getItem(CONFIG.newsletterKey) || '[]');
    if (!subs.find(s => s.email === email)) {
      subs.push({ email, name: name || '', subscribedAt: new Date().toISOString() });
      localStorage.setItem(CONFIG.newsletterKey, JSON.stringify(subs));
    }
  }
};

// ─── MODAL ────────────────────────────────────────────────────────
const Modal = {
  open() {
    const el = document.getElementById('quoteModal');
    if (el) el.classList.add('open');
  },
  close() {
    const el = document.getElementById('quoteModal');
    if (el) el.classList.remove('open');
  },
  submit() {
    const first = document.getElementById('mf-first')?.value?.trim();
    const last = document.getElementById('mf-last')?.value?.trim();
    const email = document.getElementById('mf-email')?.value?.trim();
    const phone = document.getElementById('mf-phone')?.value?.trim();
    const county = document.getElementById('mf-county')?.value;
    const windows = document.getElementById('mf-windows')?.value;
    const premium = document.getElementById('mf-premium')?.value?.trim();
    const notes = document.getElementById('mf-notes')?.value?.trim();

    if (!first || !email || !phone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    const lead = LeadDB.save({
      firstName: first, lastName: last, email, phone,
      county, windowCount: windows, annualPremium: premium,
      notes, type: 'quote_request', status: 'new'
    });

    LeadDB.subscribeNewsletter(email, first + ' ' + last);

    // Show success
    document.getElementById('modal-form').style.display = 'none';
    document.getElementById('modal-success').style.display = 'block';

    // Track conversion
    if (typeof gtag !== 'undefined') gtag('event', 'quote_request', { email, county });
  }
};

// ─── EVA AI CHATBOT ───────────────────────────────────────────────
const Eva = {
  open: false,
  firstOpen: true,
  history: [],
  qualScore: 0,
  leadData: {},
  emailCaptured: false,

  SYSTEM: `You are Eva, the AI sales assistant for Florida Impact Shield (floridaimpactshield.com). You are warm, sharp, and genuinely helpful. You help Florida homeowners understand impact windows, insurance savings, and state grants.

COMPANY INFO:
- Name: Florida Impact Shield
- Phone: (888) 975-4440
- Website: floridaimpactshield.com
- License: CBC1265XXX (Florida Certified Building Contractor)
- Service: All Florida counties
- Specialty: Hurricane impact windows & doors, My Safe Florida Home grants

KEY FACTS:
- Insurance savings: 25-45% on windstorm portion (state mandated)
- HVHZ zones (Miami-Dade, Broward): up to 45% reduction
- Average FL homeowner premium 2025: ~$9,462/yr
- My Safe Florida Home grant: up to $10,000, we handle all paperwork
- Window cost: $700-$1,600 per opening installed, typical home $18K-$45K
- 0% financing 60 months available
- Payback through insurance savings: 8-12 years
- Wind resistance: 200+ mph

YOUR MISSION — in order:
1. Capture EMAIL within first 2-3 messages ("What email should I send your personalized savings report to?")
2. Capture PHONE if they're warm ("What's the best number to reach you?")
3. Qualify: county → insurance premium → window count → homeowner status → timeline
4. Calculate their EXACT dollar savings when you have their premium
5. Push for appointment (quote) or phone call to (888) 975-4440
6. Check My Safe Florida Home grant eligibility

CONVERSATION RULES:
- Messages: 2-4 sentences max unless explaining calculations
- Ask ONE question per message
- When you have their premium, always calculate: savings = premium × 0.33 (adjust by county)
- Miami-Dade/Broward: ×0.40, Palm Beach: ×0.35, Lee/Collier: ×0.33, Tampa/Pinellas: ×0.30, Orlando: ×0.27
- Be a knowledgeable friend, not a pusher
- If they ask about competitors, be confident but not negative
- If they express urgency (storm approaching, renewal coming), escalate to phone immediately
- Always sign messages: — Eva

CLOSING: "Based on what you've told me, you could save [calculated amount]/year on insurance. I'd love to connect you with one of our licensed estimators for a free in-home visit — usually within 48 hours. Should I set that up, or would you prefer to call us directly at (888) 975-4440?"`,

  toggle() {
    this.open = !this.open;
    const win = document.getElementById('evaWindow');
    const btn = document.getElementById('evaBtn');
    const notify = document.getElementById('evaNotify');
    if (this.open) {
      win?.classList.add('open');
      if (btn) btn.innerHTML = '✕';
      if (notify) notify.remove();
      if (this.firstOpen) { this.firstOpen = false; this.start(); }
    } else {
      win?.classList.remove('open');
      if (btn) btn.innerHTML = '🤖';
    }
  },

  start() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.addMsg(`Hi! I'm Eva 👋 I help Florida homeowners find out exactly how much they can save on insurance with impact windows — and whether they qualify for the My Safe Florida Home grant (up to $10,000).\n\nWhat county are you in?`, 'agent', time);
    this.setQR(['Miami-Dade', 'Broward', 'Palm Beach', 'Lee County', 'Hillsborough / Tampa', 'Other county']);
  },

  addMsg(text, role, time) {
    const msgs = document.getElementById('evaMsgs');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = `eva-msg ${role}`;
    div.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (time) {
      const t = document.createElement('div');
      t.className = 'msg-time';
      t.textContent = time;
      div.appendChild(t);
    }
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  },

  showTyping() {
    const msgs = document.getElementById('evaMsgs');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'eva-typing'; div.id = 'evaTyping';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  },

  removeTyping() {
    document.getElementById('evaTyping')?.remove();
  },

  setQR(opts) {
    const wrap = document.getElementById('evaQR');
    if (!wrap) return;
    wrap.innerHTML = '';
    opts.forEach(o => {
      const btn = document.createElement('button');
      btn.className = 'eva-qr';
      btn.textContent = o;
      btn.onclick = () => Eva.send(o);
      wrap.appendChild(btn);
    });
  },

  clearQR() {
    const wrap = document.getElementById('evaQR');
    if (wrap) wrap.innerHTML = '';
  },

  updateProgress(pct) {
    const prog = document.getElementById('evaProgress');
    const fill = document.getElementById('evaFill');
    const label = document.getElementById('evaPct');
    if (prog) prog.classList.add('show');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = pct + '%';
    this.qualScore = pct;
  },

  captureEmail() {
    const input = document.getElementById('evaEmailInput');
    const email = input?.value?.trim();
    if (!email || !email.includes('@')) {
      if (input) input.style.borderColor = 'var(--red)';
      return;
    }
    this.emailCaptured = true;
    this.leadData.email = email;
    LeadDB.save({ email, type: 'eva_email_capture', status: 'prospect' });
    LeadDB.subscribeNewsletter(email);
    const strip = document.getElementById('evaLeadStrip');
    if (strip) strip.innerHTML = `<span style="color:var(--green);font-weight:600">✓ Report will be sent to ${email}</span>`;
    this.updateProgress(20);
    if (!this.open) this.toggle();
  },

  async send(text) {
    this.clearQR();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.addMsg(text, 'user', time);
    this.history.push({ role: 'user', content: text });

    // Update qualification score
    const lc = text.toLowerCase();
    let np = this.qualScore;
    if (/miami|broward|palm|county|lee|tampa|florida|naples|orlando|sarasota/.test(lc)) np = Math.max(np, 25);
    if (/\$[\d,]+|\d{4,}|premium|insurance/.test(lc)) np = Math.max(np, 50);
    if (/\d+\s*window|windows|doors|opening/.test(lc)) np = Math.max(np, 65);
    if (/own|rent|homeowner|my home/.test(lc)) np = Math.max(np, 80);
    if (/soon|asap|ready|quote|yes|book|call/.test(lc)) np = Math.max(np, 95);
    if (np > this.qualScore) this.updateProgress(np);

    // Extract lead data
    if (text.includes('@')) this.leadData.email = text;
    if (/\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/.test(text)) this.leadData.phone = text.match(/[\d\s().+-]{10,}/)?.[0];

    this.showTyping();

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: CONFIG.anthropicModel,
          max_tokens: 400,
          system: this.SYSTEM,
          messages: this.history
        })
      });

      this.removeTyping();
      if (!res.ok) throw new Error('API error ' + res.status);

      const data = await res.json();
      const reply = data.content?.[0]?.text || "I hit a snag — but our team is ready! Call (888) 975-4440 or book online.";
      const rtime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.addMsg(reply, 'agent', rtime);
      this.history.push({ role: 'assistant', content: reply });

      // Save to lead DB if we have enough data
      if (this.leadData.email || this.leadData.phone) {
        LeadDB.save({ ...this.leadData, type: 'eva_conversation', status: 'engaged', conversation: this.history.length });
      }

      // Smart quick replies
      const rl = reply.toLowerCase();
      if (/county|where are you/.test(rl)) this.setQR(['Miami-Dade', 'Broward', 'Palm Beach', 'Lee County', 'Other']);
      else if (/premium|insurance cost|pay for/.test(rl)) this.setQR(['Under $5K/yr', '$5K–$8K/yr', '$8K–$12K/yr', 'Over $12K/yr', 'Not sure']);
      else if (/how many|windows|openings/.test(rl)) this.setQR(['Under 10 windows', '10–15 windows', '15–25 windows', '25+ windows']);
      else if (/own|homeowner/.test(rl)) this.setQR(['Yes, I own it', 'Renting']);
      else if (/timeline|when|how soon/.test(rl)) this.setQR(['ASAP — storm season!', 'Within 3 months', 'Just researching']);
      else if (/set that up|appointment|48 hours/.test(rl)) this.setQR(['Yes, book me in! ✅', "I'll call instead", 'More info first']);
      else if (/call us|888/.test(rl)) this.setQR(['Book online 📋', 'Call now 📞']);

    } catch (err) {
      this.removeTyping();
      this.addMsg("I hit a snag — but our team is standing by!\n\n📞 Call us: **(888) 975-4440**\n\nOr tap below to book your free quote.", 'agent');
      this.setQR(['📋 Book Free Quote', '📞 Call (888) 975-4440']);
    }
  },

  sendInput() {
    const inp = document.getElementById('evaInput');
    const text = inp?.value?.trim();
    if (!text) return;
    if (inp) { inp.value = ''; inp.style.height = 'auto'; }
    this.send(text);
  }
};

// ─── SOCIAL PROOF TOASTS ──────────────────────────────────────────
const Toasts = {
  data: [
    { initials: 'MR', name: 'Maria R. in Coral Gables', action: 'just booked a free in-home quote', time: '2 min ago' },
    { initials: 'DK', name: 'David K. in Boca Raton', action: 'saved $4,200/yr on insurance', time: '5 min ago' },
    { initials: 'JS', name: 'Jennifer S. in Fort Myers', action: 'received a $9,800 MSFH grant', time: '8 min ago' },
    { initials: 'TM', name: 'Tom M. in Tampa', action: 'is getting a free quote today', time: '11 min ago' },
    { initials: 'LV', name: 'Lisa V. in Naples', action: 'installed 18 impact windows', time: '15 min ago' },
    { initials: 'RC', name: 'Roberto C. in Miami Beach', action: 'saved 38% on Citizens insurance', time: '19 min ago' },
    { initials: 'PH', name: 'Patricia H. in Sarasota', action: 'qualified for the $10K grant', time: '23 min ago' },
    { initials: 'JB', name: 'James B. in Palm Beach', action: 'replaced 24 windows & doors', time: '28 min ago' }
  ],
  idx: 0,
  show() {
    const t = this.data[this.idx % this.data.length];
    this.idx++;
    const toast = document.getElementById('siteToast');
    if (!toast) return;
    const av = toast.querySelector('.toast-avatar');
    const name = toast.querySelector('.toast-name');
    const action = toast.querySelector('.toast-action');
    const time = toast.querySelector('.toast-time');
    if (av) av.textContent = t.initials;
    if (name) name.textContent = t.name;
    if (action) action.textContent = t.action;
    if (time) time.textContent = t.time;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4200);
  },
  init() {
    setTimeout(() => { this.show(); setInterval(() => this.show(), 13000); }, 6000);
  }
};

// ─── EXIT INTENT ──────────────────────────────────────────────────
const ExitIntent = {
  shown: false,
  init() {
    document.addEventListener('mouseleave', e => {
      if (e.clientY < 10 && !this.shown) {
        this.shown = true;
        const banner = document.getElementById('exitBanner');
        if (banner) banner.classList.add('show');
      }
    });
  },
  hide() {
    const banner = document.getElementById('exitBanner');
    if (banner) banner.classList.remove('show');
  }
};

// ─── STICKY BAR ───────────────────────────────────────────────────
const StickyBar = {
  shown: false,
  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600 && !this.shown) {
        this.shown = true;
        const bar = document.getElementById('stickyBar');
        if (bar) bar.classList.add('show');
      }
    });
  }
};

// ─── NAV SCROLL ───────────────────────────────────────────────────
const Nav = {
  init() {
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('siteNav');
      if (nav) {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      }
    });
  }
};

// ─── SCROLL REVEAL ────────────────────────────────────────────────
const ScrollReveal = {
  init() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement?.children || []);
          siblings.forEach((c, i) => {
            if (c.classList.contains('reveal')) c.style.transitionDelay = `${i * 0.07}s`;
          });
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }
};

// ─── COUNTDOWN TIMER ──────────────────────────────────────────────
const Countdown = {
  init(elementId, hours = 47, mins = 23, secs = 11) {
    let total = hours * 3600 + mins * 60 + secs;
    const el = document.getElementById(elementId);
    if (!el) return;
    setInterval(() => {
      total = Math.max(0, total - 1);
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000);
  }
};

// ─── INSURANCE CALCULATOR ─────────────────────────────────────────
const Calculator = {
  multipliers: {
    miami: 0.40, broward: 0.38, palm: 0.35, lee: 0.33,
    collier: 0.33, hillsborough: 0.30, orange: 0.27,
    pinellas: 0.29, sarasota: 0.31, stlucie: 0.28
  },
  update() {
    const premium = parseInt(document.getElementById('calcPremium')?.value || 6000);
    const county = document.getElementById('calcCounty')?.value || 'miami';
    const windows = parseInt(document.getElementById('calcWindows')?.value || 10);
    const dispEl = document.getElementById('calcPremiumDisplay');
    if (dispEl) dispEl.textContent = premium.toLocaleString();
    const mult = this.multipliers[county] || 0.33;
    const savings = Math.round(premium * mult);
    const jobCost = windows * 1400;
    const payback = Math.round(jobCost / savings);
    const savEl = document.getElementById('calcSavings');
    const payEl = document.getElementById('calcPayback');
    const grantEl = document.getElementById('calcGrant');
    if (savEl) {
      savEl.textContent = savings.toLocaleString();
      savEl.style.transform = 'scale(1.05)';
      savEl.style.color = 'var(--sky-light)';
      setTimeout(() => { savEl.style.transform = ''; savEl.style.color = ''; }, 200);
    }
    if (payEl) payEl.textContent = `⏱ ~${payback}yr payback`;
    if (grantEl) grantEl.textContent = premium > 4000 ? '🏠 May qualify for $10K grant' : '🏠 Check grant eligibility';
    // Update slider gradient
    const slider = document.getElementById('calcPremium');
    if (slider) {
      const pct = ((premium - 2000) / (20000 - 2000)) * 100;
      slider.style.background = `linear-gradient(to right,var(--sky) ${pct}%,rgba(100,116,139,0.3) ${pct}%)`;
    }
  }
};

// ─── NEWSLETTER ───────────────────────────────────────────────────
const Newsletter = {
  submit(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const email = form.querySelector('[name="email"]')?.value?.trim();
    const name = form.querySelector('[name="name"]')?.value?.trim();
    if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
    LeadDB.subscribeNewsletter(email, name);
    LeadDB.save({ email, name, type: 'newsletter', status: 'subscriber' });
    form.innerHTML = '<p style="color:var(--green);font-weight:600;text-align:center">✓ You\'re subscribed! Check your inbox for your free savings guide.</p>';
  }
};

// ─── AUTO-OPEN EVA ────────────────────────────────────────────────
function autoOpenEva() {
  const session = sessionStorage.getItem(CONFIG.sessionKey);
  if (!session) {
    sessionStorage.setItem(CONFIG.sessionKey, '1');
    setTimeout(() => { if (!Eva.open) Eva.toggle(); }, 35000);
  }
}

// ─── INIT ALL ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Nav.init();
  ScrollReveal.init();
  StickyBar.init();
  ExitIntent.init();
  Toasts.init();
  Countdown.init('grantCountdown');
  Calculator.update();
  autoOpenEva();

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { Modal.close(); if (Eva.open) Eva.toggle(); }
  });

  // Click outside modal
  document.getElementById('quoteModal')?.addEventListener('click', function(e) {
    if (e.target === this) Modal.close();
  });

  // Eva textarea auto-resize + enter to send
  document.getElementById('evaInput')?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); Eva.sendInput(); }
  });
  document.getElementById('evaInput')?.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });
});
