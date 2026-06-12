/* ============================================
   FLORIDA IMPACT SHIELD - CORE APP JS
   floridaimpactshield.com
   ============================================ */
'use strict';

const CONFIG = {
  siteName: 'Florida Impact Shield',
  domain: 'floridaimpactshield.com',
  phone: '(888) 975-4440',
  phoneRaw: '+18889754440',
  email: 'info@floridaimpactshield.com',
  address: 'Miami, FL 33101',
  license: 'CBC1265XXX',
  anthropicModel: 'claude-sonnet-4-5',
  dbKey: 'fis_leads_db',
  newsletterKey: 'fis_newsletter',
  sessionKey: 'fis_session'
};

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
    console.log('[FIS Lead Captured]', record);
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
  count() { return this.getAll().length; },
  subscribeNewsletter(email, name) {
    const subs = JSON.parse(localStorage.getItem(CONFIG.newsletterKey) || '[]');
    if (!subs.find(s => s.email === email)) {
      subs.push({ email, name: name || '', subscribedAt: new Date().toISOString() });
      localStorage.setItem(CONFIG.newsletterKey, JSON.stringify(subs));
    }
  }
};

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
    LeadDB.save({
      firstName: first, lastName: last, email, phone,
      county, windowCount: windows, annualPremium: premium,
      notes, type: 'quote_request', status: 'new'
    });
    LeadDB.subscribeNewsletter(email, first + ' ' + last);
    document.getElementById('modal-form').style.display = 'none';
    document.getElementById('modal-success').style.display = 'block';
    if (typeof gtag !== 'undefined') gtag('event', 'quote_request', { email, county });
  }
};

const Eva = {
  open: false,
  firstOpen: true,
  history: [],
  qualScore: 0,
  leadData: {},
  qrShown: false,
  SYSTEM: `You are Eva, the AI sales assistant for Florida Impact Shield (floridaimpactshield.com). You are warm, sharp, and genuinely helpful. You help Florida homeowners understand impact windows, insurance savings, and state grants.
COMPANY INFO:
- Name: Florida Impact Shield
- Phone: (888) 975-4440
- Website: floridaimpactshield.com
- License: CBC1265XXX (Florida Certified Building Contractor)
- Service: All Florida counties
- Specialty: Hurricane impact windows and doors, My Safe Florida Home grants
KEY FACTS:
- Insurance savings: 25-45% on windstorm portion (state mandated)
- HVHZ zones (Miami-Dade, Broward): up to 45% reduction
- Average FL homeowner premium 2025: around $9,462/yr
- My Safe Florida Home grant: up to $10,000, we handle all paperwork
- Window cost: $700-$1,600 per opening installed, typical home $18K-$45K
- 0% financing 60 months available
- Payback through insurance savings: 8-12 years
- Wind resistance: 200+ mph
YOUR MISSION in order:
1. Get their FIRST NAME first - greet them by name in every response after
2. IMPORTANT: We ONLY serve Florida. NEVER ask what state they are in. Ask ONLY which Florida COUNTY they are in. Say: "Which county in Florida are you in?" Options: Miami-Dade, Broward, Palm Beach, Lee County, Hillsborough/Tampa, or Other
3. After 2 exchanges capture EMAIL - ask: What email should I send your personalized savings report to?
4. Capture PHONE if they are warm - ask: What is the best number to reach you?
5. Calculate their EXACT dollar savings when you have their premium
6. Push for appointment - tell them to click the Book Free Quote button or call (888) 975-4440
7. Check My Safe Florida Home grant eligibility
CONVERSATION RULES:
- Messages: 2-4 sentences max unless explaining calculations
- Ask ONE question per message
- When you have their premium, always calculate: savings = premium x 0.33 (adjust by county)
- Miami-Dade/Broward: x0.40, Palm Beach: x0.35, Lee/Collier: x0.33, Tampa/Pinellas: x0.30, Orlando: x0.27
- Be a knowledgeable friend, not a pusher
- Always sign messages: - Eva
CLOSING: Based on what you have told me, you could save [calculated amount]/year on insurance. I would love to connect you with one of our licensed estimators for a free in-home visit usually within 48 hours. Should I set that up, or would you prefer to call us directly at (888) 975-4440?`,


  scrollToBottom() {
    const msgs = document.getElementById('evaMsgs');
    if (msgs) {
      const m = document.getElementById('evaMsgs'); if(m) m.scrollTop = m.scrollHeight;
      setTimeout(() => { const m = document.getElementById('evaMsgs'); if(m) m.scrollTop = m.scrollHeight; }, 100);
      setTimeout(() => { const m = document.getElementById('evaMsgs'); if(m) m.scrollTop = m.scrollHeight; }, 300);
    }
  },
  toggle() {
    this.open = !this.open;
    const win = document.getElementById('evaWindow');
    const btn = document.getElementById('evaBtn');
    const notify = document.getElementById('evaNotify');
    if (this.open) {
      win?.classList.add('open');
      if (btn) btn.innerHTML = '\u2715';
      if (notify) notify.remove();
      if (this.firstOpen) { this.firstOpen = false; this.start(); }
    } else {
      win?.classList.remove('open');
      if (btn) btn.innerHTML = '<img src="/assets/images/eva-avatar.png" style="width:42px;height:42px;border-radius:50%;object-fit:cover;" alt="Eva" onerror="this.outerHTML=\'\\uD83E\\uDD16\'">';
    }
  },

  start() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.addMsg("Hi! I'm Eva \uD83D\uDC4B Florida's #1 hurricane window AI assistant.\n\nI help Florida homeowners find out exactly how much they can save on insurance with impact windows \u2014 and whether they qualify for the My Safe Florida Home grant (up to $10,000).\n\nFirst, what's your name?", 'agent', time);
  },

  addMsg(text, role, time) {
    const msgs = document.getElementById('evaMsgs');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'eva-msg ' + role;
    div.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (time) {
      const t = document.createElement('div');
      t.className = 'msg-time';
      t.textContent = time;
      div.appendChild(t);
    }
    msgs.appendChild(div);
  },

  showTyping() {
    const msgs = document.getElementById('evaMsgs');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'eva-typing';
    div.id = 'evaTyping';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
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
      btn.onclick = () => {
        wrap.innerHTML = '';
        document.getElementById('evaQR').innerHTML = '';
        if (o === 'Book Free Quote Now') {
          Modal.open();
          Eva.toggle();
        } else if (o === 'Call (888) 975-4440') {
          window.location.href = 'tel:+18889754440';
        } else {
          Eva.send(o);
        }
      };
      wrap.appendChild(btn);
    });
    const m = document.getElementById('evaMsgs'); if(m) m.scrollTop = m.scrollHeight;
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
    this.leadData.email = email;
    LeadDB.save({ email, type: 'eva_email_capture', status: 'prospect' });
    LeadDB.subscribeNewsletter(email);
    const strip = document.getElementById('evaLeadStrip');
    if (strip) strip.innerHTML = '<span style="color:var(--green);font-weight:600">\u2714 Report will be sent to ' + email + '</span>';
    this.updateProgress(20);
    if (!this.open) this.toggle();
  },

  async send(text) {
    this.clearQR();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.addMsg(text, 'user', time);
    this.history.push({ role: 'user', content: text });

    const lc = text.toLowerCase();
    let np = this.qualScore;
    if (/miami|broward|palm|county|lee|tampa|florida|naples|orlando|sarasota/.test(lc)) np = Math.max(np, 25);
    if (/\$[\d,]+|\d{4,}|premium|insurance/.test(lc)) np = Math.max(np, 50);
    if (/\d+\s*window|windows|doors|opening/.test(lc)) np = Math.max(np, 65);
    if (/own|rent|homeowner|my home/.test(lc)) np = Math.max(np, 80);
    if (/soon|asap|ready|quote|yes|book|call/.test(lc)) np = Math.max(np, 95);
    if (np > this.qualScore) this.updateProgress(np);

    if (!this.leadData.firstName && this.history.length <= 4 && !text.includes('@') && !/\d{3}/.test(text) && text.length < 30) {
      this.leadData.firstName = text.trim();
    }
    if (text.includes('@')) {
      this.leadData.email = text;
      LeadDB.save({ ...this.leadData, type: 'eva_conversation', status: 'new' });
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: this.leadData.firstName || '',
          email: text,
          phone: this.leadData.phone || '',
          county: this.leadData.county || '',
          type: 'eva_conversation',
          status: 'new',
          source: 'Eva Chatbot',
          page: window.location.pathname,
          conversationLength: this.history.length
        })
      }).catch(e => console.log('Eva lead save error:', e));
      setTimeout(() => {
        const rtime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        Eva.addMsg("Perfect! I've saved your details \u2705\n\nThe last step is to book your FREE in-home quote \u2014 a licensed estimator visits within 48 hours, measures every opening, and gives you exact pricing plus your grant eligibility.\n\nClick the button below to schedule!", 'agent', rtime);
        Eva.setQR(['Book Free Quote Now', 'Call (888) 975-4440']);
      }, 1000);
    }
    if (/\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/.test(text)) {
      this.leadData.phone = text.match(/[\d\s().+-]{10,}/)?.[0];
    }

    this.showTyping();
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: this.SYSTEM, messages: this.history })
      });
      this.removeTyping();
      if (!res.ok) throw new Error('API error ' + res.status);
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I hit a snag \u2014 but our team is ready! Call (888) 975-4440 or book online.";
      const rtime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.addMsg(reply, 'agent', rtime);
      this.history.push({ role: 'assistant', content: reply });
      // Force email capture after 4 exchanges
      if (!this.leadData.email && this.history.length >= 8) {
        setTimeout(() => {
          const rtime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          Eva.addMsg("By the way — what email should I send your personalized savings report to? — Eva", 'agent', rtime);
          Eva.history.push({ role: 'assistant', content: "What email should I send your personalized savings report to?" });
        }, 1500);
      }
      // Force email capture after 4 exchanges
      if (!this.leadData.email && this.history.length >= 8) {
        setTimeout(() => {
          const rtime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          Eva.addMsg("By the way — what email should I send your personalized savings report to? — Eva", 'agent', rtime);
          Eva.history.push({ role: 'assistant', content: "What email should I send your personalized savings report to?" });
        }, 1500);
      }
      // Force email capture after 4 exchanges
      if (!this.leadData.email && this.history.length >= 8) {
        setTimeout(() => {
          const rtime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          Eva.addMsg("By the way — what email should I send your personalized savings report to? — Eva", 'agent', rtime);
          Eva.history.push({ role: 'assistant', content: "What email should I send your personalized savings report to?" });
        }, 1500);
      }

      if (this.leadData.email || this.leadData.phone) {
        LeadDB.save({ ...this.leadData, type: 'eva_conversation', status: 'engaged', conversation: this.history.length });
      }

      const rl = reply.toLowerCase();
      this.clearQR();
      if (/what.s your|your name|first name/.test(rl)) {
        // no buttons for name question
      } else if (/what county|which county|where in florida/.test(rl)) {
        this.setQR(['Miami-Dade', 'Broward', 'Palm Beach', 'Lee County', 'Tampa', 'Other']);
      } else if (/insurance premium|how much.*insurance|annual.*premium/.test(rl)) {
        this.setQR(['Under $5K/yr', '$5K-$8K/yr', '$8K-$12K/yr', 'Over $12K/yr', 'Not sure']);
      } else if (/how many window|number of window|how many opening/.test(rl)) {
        this.setQR(['Under 10', '10-15', '15-25', '25+']);
      } else if (/do you own|homeowner|rent/.test(rl) && !this.ownRentShown) {
        this.ownRentShown = true;
        this.setQR(['Yes I own it', 'Renting']);
      } else if (/when.*looking|timeline|how soon/.test(rl)) {
        this.setQR(['ASAP', 'Within 3 months', 'Just researching']);
      } else if (/book|schedule|appointment|free quote|48 hours/.test(rl)) {
        this.setQR(['Book Free Quote Now', 'Call (888) 975-4440']);
      }

    } catch (err) {
      this.removeTyping();
      this.addMsg("I hit a snag \u2014 but our team is standing by!\n\nCall us: (888) 975-4440\n\nOr tap below to book your free quote.", 'agent');
      this.setQR(['Book Free Quote Now', 'Call (888) 975-4440']);
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

const Toasts = { data:[], idx:0, show() {}, init() {} };

const ExitIntent = { shown:true, init() {}, hide() {} };

const StickyBar = { shown:true, init() {} };

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

const ScrollReveal = {
  init() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement?.children || []);
          siblings.forEach((c, i) => {
            if (c.classList.contains('reveal')) c.style.transitionDelay = i * 0.07 + 's';
          });
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }
};

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
      el.textContent = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
    }, 1000);
  }
};

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
    if (payEl) payEl.textContent = '~' + payback + 'yr payback';
    if (grantEl) grantEl.textContent = premium > 4000 ? 'May qualify for $10K grant' : 'Check grant eligibility';
    const slider = document.getElementById('calcPremium');
    if (slider) {
      const pct = ((premium - 2000) / (20000 - 2000)) * 100;
      slider.style.background = 'linear-gradient(to right,var(--sky) ' + pct + '%,rgba(100,116,139,0.3) ' + pct + '%)';
    }
  }
};

const Newsletter = {
  submit(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const email = form.querySelector('[name="email"]')?.value?.trim();
    const name = form.querySelector('[name="name"]')?.value?.trim();
    if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
    LeadDB.subscribeNewsletter(email, name);
    LeadDB.save({ email, name, type: 'newsletter', status: 'subscriber' });
    form.innerHTML = '<p style="color:var(--green);font-weight:600;text-align:center">You are subscribed! Check your inbox for your free savings guide.</p>';
  }
};

function autoOpenEva() {
  const session = sessionStorage.getItem(CONFIG.sessionKey);
  if (!session) {
    sessionStorage.setItem(CONFIG.sessionKey, '1');
    setTimeout(() => { if (!Eva.open) Eva.toggle(); }, 35000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Nav.init();
  ScrollReveal.init();
  StickyBar.init();
  ExitIntent.init();
  Toasts.init();
  Countdown.init('grantCountdown');
  Calculator.update();
  autoOpenEva();
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { Modal.close(); if (Eva.open) Eva.toggle(); }
  });
  document.getElementById('quoteModal')?.addEventListener('click', function(e) {
    if (e.target === this) Modal.close();
  });
  document.getElementById('evaInput')?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); Eva.sendInput(); }
  });
  document.getElementById('evaInput')?.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });
});
