// FIS Wind Mit Savings Calculator. Run from FIS site root: node fis-calculator.cjs
const fs = require('fs');
const path = require('path');
if (!fs.existsSync('pages')) { console.log('ERROR: run from FIS site root'); process.exit(1); }

const files = fs.readdirSync('pages').filter(f => f.endsWith('.html'));
const tplFile = files.find(f => { const s = fs.readFileSync(path.join('pages', f), 'utf8'); return s.includes('<h1') && /<footer/i.test(s); });
if (!tplFile) { console.log('ERROR: no suitable template page found'); process.exit(1); }
const TPL = fs.readFileSync(path.join('pages', tplFile), 'utf8');
const h1End = TPL.indexOf('</h1>') + 5;
const footIdx = TPL.lastIndexOf('<footer');
if (footIdx < h1End) { console.log('ERROR: footer marker not found'); process.exit(1); }
let TOP = TPL.slice(0, h1End);
const TAIL = TPL.slice(footIdx);

const SLUG = 'florida-wind-mitigation-savings-calculator.html';
const URL = 'https://www.floridaimpactshield.com/pages/' + SLUG;
const TITLE = 'Florida Wind Mitigation Savings Calculator: What Your Report Is Costing You';
const DESC = 'Free tool: decode your Florida wind mitigation report and estimate what missing opening protection is costing you every year on your homeowners premium.';

TOP = TOP.replace(/<title>[\s\S]*?<\/title>/, '<title>' + TITLE + ' | Florida Impact Shield</title>');
TOP = TOP.replace(/<meta name="description" content="[^"]*"\s*\/?>/, '<meta name="description" content="' + DESC + '">');
TOP = TOP.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, '<link rel="canonical" href="' + URL + '">');
TOP = TOP.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, '<meta property="og:url" content="' + URL + '">');
TOP = TOP.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, '<meta property="og:title" content="' + TITLE + '">');
TOP = TOP.replace(/(<h1[^>]*>)[\s\S]*$/, '$1' + 'What Is Your Wind Mitigation Report Costing You?');

const BODY = `</h1>
<main class="fis-calc" style="max-width:820px;margin:0 auto;padding:14px 20px 56px;line-height:1.7">
<p style="font-size:17px;margin:0 0 8px">Every Florida homeowner with a wind mitigation inspection holds a form full of codes almost nobody explains. One line on that form &mdash; <strong>opening protection</strong> &mdash; is usually the largest single discount available on a Florida policy, and most homeowners have no idea what missing it costs them each year.</p>
<p style="margin:0 0 26px">Answer six questions below for a free estimate. No account, no obligation.</p>

<div id="calc-card" style="border:1px solid rgba(0,0,0,.14);border-radius:12px;padding:22px 22px 26px;background:rgba(0,0,0,.02)">
  <div id="step-inputs">
    <label style="display:block;font-weight:700;margin:14px 0 6px">Your county</label>
    <select id="county" style="width:100%;padding:11px;border:1px solid rgba(0,0,0,.2);border-radius:7px;font-size:16px">
      <option value="1.15">Miami-Dade</option><option value="1.15">Broward</option><option value="1.12">Palm Beach</option>
      <option value="1.08">Monroe (Keys)</option><option value="1.05">Lee</option><option value="1.05">Collier</option>
      <option value="1.03">Pinellas</option><option value="1.03">Hillsborough</option><option value="1.02">Sarasota</option>
      <option value="1.02">Manatee</option><option value="1.00" selected>Other Florida county</option>
    </select>

    <label style="display:block;font-weight:700;margin:18px 0 6px">Year your home was built</label>
    <select id="year" style="width:100%;padding:11px;border:1px solid rgba(0,0,0,.2);border-radius:7px;font-size:16px">
      <option value="pre1994">Before 1994</option>
      <option value="1994-2001" selected>1994 &ndash; 2001</option>
      <option value="2002plus">2002 or later</option>
    </select>

    <label style="display:block;font-weight:700;margin:18px 0 6px">Current annual homeowners premium</label>
    <input id="premium" type="number" min="0" step="100" placeholder="e.g. 6200" style="width:100%;padding:11px;border:1px solid rgba(0,0,0,.2);border-radius:7px;font-size:16px">

    <label style="display:block;font-weight:700;margin:18px 0 6px">Opening protection on your wind mit report</label>
    <select id="opening" style="width:100%;padding:11px;border:1px solid rgba(0,0,0,.2);border-radius:7px;font-size:16px">
      <option value="none" selected>None &mdash; no shutters or impact glass</option>
      <option value="partial">Partial &mdash; some openings protected</option>
      <option value="full">Full &mdash; all openings protected</option>
      <option value="unknown">I don't know / haven't had an inspection</option>
    </select>

    <label style="display:block;font-weight:700;margin:18px 0 6px">Roof-to-wall attachment (if shown on your report)</label>
    <select id="roofwall" style="width:100%;padding:11px;border:1px solid rgba(0,0,0,.2);border-radius:7px;font-size:16px">
      <option value="toenail">Toe nail</option><option value="clip">Clips</option>
      <option value="wrap">Single or double wraps</option><option value="unknown" selected>Not sure</option>
    </select>

    <label style="display:block;font-weight:700;margin:18px 0 6px">Number of windows and exterior doors</label>
    <input id="openings" type="number" min="1" max="80" value="14" style="width:100%;padding:11px;border:1px solid rgba(0,0,0,.2);border-radius:7px;font-size:16px">

    <button id="calc-btn" type="button" style="margin-top:22px;width:100%;padding:15px;border:0;border-radius:8px;font-size:17px;font-weight:800;cursor:pointer;background:#c8102e;color:#fff">See My Estimate &rarr;</button>
    <p style="font-size:12px;opacity:.7;margin:12px 0 0">Estimates only. Actual credits are set by your carrier based on a certified wind mitigation inspection.</p>
  </div>

  <div id="step-teaser" style="display:none">
    <p style="font-family:monospace;font-size:12px;letter-spacing:.1em;opacity:.65;margin:0 0 8px">YOUR ESTIMATE</p>
    <p style="margin:0 0 6px;font-size:15px">Based on what you entered, your missing wind mitigation credits are likely costing you about</p>
    <p id="teaser-number" style="font-size:38px;font-weight:800;line-height:1.15;margin:0 0 6px;color:#c8102e"></p>
    <p id="teaser-sub" style="margin:0 0 22px;font-size:15px"></p>
    <div style="border-top:1px solid rgba(0,0,0,.12);padding-top:20px">
      <p style="font-weight:800;margin:0 0 4px;font-size:17px">See your full breakdown</p>
      <p style="margin:0 0 16px;font-size:15px">Enter your details for the complete report: every credit you're missing, what each one is worth, what opening protection would cost for your home, and your estimated payback period.</p>
      <form action="https://api.web3forms.com/submit" method="POST" id="lead-form">
        <input type="hidden" name="access_key" value="0eb8fd14-c890-4a80-972a-37d45b597d6f">
        <input type="hidden" name="subject" value="FIS CALCULATOR LEAD - wind mit savings estimate">
        <input type="hidden" name="from_name" value="FIS Wind Mit Calculator">
        <input type="hidden" name="lead_detail" id="lead_detail">
        <input type="checkbox" name="botcheck" style="display:none">
        <input name="name" required placeholder="Full name" style="width:100%;padding:12px;margin-bottom:10px;border:1px solid rgba(0,0,0,.2);border-radius:7px;font-size:16px">
        <input name="email" type="email" required placeholder="Email address" style="width:100%;padding:12px;margin-bottom:10px;border:1px solid rgba(0,0,0,.2);border-radius:7px;font-size:16px">
        <input name="phone" type="tel" required placeholder="Phone number" style="width:100%;padding:12px;margin-bottom:10px;border:1px solid rgba(0,0,0,.2);border-radius:7px;font-size:16px">
        <button type="submit" style="width:100%;padding:15px;border:0;border-radius:8px;font-size:17px;font-weight:800;cursor:pointer;background:#c8102e;color:#fff">Show My Full Breakdown &rarr;</button>
        <p style="font-size:12px;opacity:.7;margin:12px 0 0">We use your details to send your report and discuss options. No spam, and we never sell your information.</p>
      </form>
    </div>
  </div>

  <div id="step-full" style="display:none">
    <p style="font-family:monospace;font-size:12px;letter-spacing:.1em;opacity:.65;margin:0 0 10px">YOUR FULL BREAKDOWN</p>
    <div id="full-body"></div>
    <p style="margin:24px 0 0"><a href="/pages/contact.html" style="display:inline-block;padding:14px 26px;border-radius:8px;background:#c8102e;color:#fff;font-weight:800;text-decoration:none">Get My Free Quote &rarr;</a></p>
  </div>
</div>

<h2 style="font-size:24px;margin:40px 0 12px">How wind mitigation credits actually work in Florida</h2>
<p>Florida law requires insurers to provide premium discounts for construction features that reduce windstorm damage. A certified inspector documents those features on a standard form (the OIR-B1-1802), and your carrier applies credits based on what's verified. The categories that carry the most weight are roof covering, roof deck attachment, roof-to-wall attachment, roof geometry, secondary water resistance, and <strong>opening protection</strong>.</p>
<p>Opening protection is the one most homeowners are missing, and it is typically the largest single credit available &mdash; because unprotected windows and doors are how wind gets inside a house. Once an opening fails in a storm, internal pressure does the structural damage. Insurers price that risk accordingly.</p>
<p>The credit requires protection on <em>every</em> opening rated to the appropriate impact standard &mdash; which is why partial coverage often yields little or nothing. It is all-or-nothing on most policies.</p>

<h2 style="font-size:24px;margin:34px 0 12px">Reading the lines on your report</h2>
<ul style="margin:0 0 16px 22px">
<li><strong>Opening Protection: None / N</strong> &mdash; no verified impact-rated protection. The largest credit on the form is unclaimed.</li>
<li><strong>Roof to Wall: Toe Nail</strong> &mdash; the weakest attachment category, common in older homes.</li>
<li><strong>Roof to Wall: Clips / Single Wrap / Double Wrap</strong> &mdash; progressively stronger, progressively better credits.</li>
<li><strong>SWR: No</strong> &mdash; no secondary water resistance barrier under the roof covering.</li>
<li><strong>Roof Deck Attachment: A through D</strong> &mdash; nail pattern and fastener type. D is strongest.</li>
</ul>
<p>If your report shows "None" for opening protection, that single line is usually worth more than everything else on the form combined &mdash; and it is the only category you can change without touching your roof.</p>

<h2 style="font-size:24px;margin:34px 0 12px">Frequently asked questions</h2>
<div itemscope itemtype="https://schema.org/FAQPage">
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="margin-bottom:16px">
<p itemprop="name" style="font-weight:700;margin:0 0 4px">How much do impact windows lower Florida insurance?</p>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text" style="margin:0">It varies by carrier, county, home age and construction, but opening protection is typically the largest wind mitigation credit available on a Florida policy. Homeowners in high-wind counties generally see the biggest reductions. Your carrier determines the actual credit from a certified inspection.</p></div></div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="margin-bottom:16px">
<p itemprop="name" style="font-weight:700;margin:0 0 4px">Do I need to protect every window to get the discount?</p>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text" style="margin:0">Generally yes. Most carriers require all openings &mdash; windows, doors, skylights and garage doors &mdash; to carry rated protection before the opening protection credit applies. Partial protection often yields little or no credit, which is why leaving one or two openings unprotected can cost you the entire discount.</p></div></div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="margin-bottom:16px">
<p itemprop="name" style="font-weight:700;margin:0 0 4px">How long is a wind mitigation inspection good for?</p>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text" style="margin:0">A wind mitigation inspection report is generally valid for five years in Florida. If you add impact windows or doors after your last inspection, you need a new inspection to claim the improved credits &mdash; the discount is not applied automatically.</p></div></div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="margin-bottom:16px">
<p itemprop="name" style="font-weight:700;margin:0 0 4px">Will my premium drop immediately after installing impact windows?</p>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text" style="margin:0">Not automatically. You need a new certified wind mitigation inspection documenting the protection, submitted to your carrier. Many carriers apply the credit from the date the report is received, and some will prorate mid-term. Ask your agent how yours handles it before you install.</p></div></div>
</div>

<script>
(function(){
  var btn = document.getElementById('calc-btn');
  if (!btn) return;
  var state = {};
  function money(n){ return '$' + Math.round(n).toLocaleString(); }
  btn.addEventListener('click', function(){
    var premium = parseFloat(document.getElementById('premium').value) || 0;
    if (premium <= 0) { alert('Please enter your current annual premium.'); return; }
    var county = parseFloat(document.getElementById('county').value) || 1;
    var year = document.getElementById('year').value;
    var opening = document.getElementById('opening').value;
    var roofwall = document.getElementById('roofwall').value;
    var openings = parseInt(document.getElementById('openings').value) || 14;

    var lowPct = 0, highPct = 0, items = [];
    if (opening === 'none' || opening === 'unknown') {
      lowPct += 0.10; highPct += 0.25;
      items.push(['Opening protection', 'Not credited. Typically the largest single wind mitigation credit available.']);
    } else if (opening === 'partial') {
      lowPct += 0.08; highPct += 0.20;
      items.push(['Opening protection', 'Partial coverage. Most carriers require every opening rated before the credit applies, so partial protection often earns little or nothing.']);
    }
    if (roofwall === 'toenail') {
      lowPct += 0.03; highPct += 0.08;
      items.push(['Roof-to-wall attachment', 'Toe nail is the weakest category. Upgrading to clips or wraps improves this credit, though it is roof work rather than window work.']);
    } else if (roofwall === 'unknown') {
      items.push(['Roof-to-wall attachment', 'Not documented. A current wind mitigation inspection may reveal credits you are already entitled to.']);
    }
    if (year === 'pre1994') {
      lowPct += 0.02; highPct += 0.05;
      items.push(['Home age', 'Built before 1994, so pre-dates the strengthened Florida wind codes. Homes of this era usually have the most unclaimed credit available.']);
    } else if (year === '1994-2001') {
      lowPct += 0.01; highPct += 0.03;
      items.push(['Home age', 'Built before the 2002 Florida Building Code, so original glazing is almost certainly non-impact.']);
    }
    lowPct *= county; highPct *= county;
    var low = premium * lowPct, high = premium * highPct;
    if (high < 150) { high = 150; }
    state = { premium: premium, low: low, high: high, items: items, openings: openings, opening: opening, year: year, roofwall: roofwall };

    document.getElementById('teaser-number').textContent = money(low) + ' \\u2013 ' + money(high) + ' / year';
    document.getElementById('teaser-sub').textContent = 'That is roughly ' + Math.round(lowPct*100) + '% to ' + Math.round(highPct*100) + '% of your current premium, every year, for credits you are not claiming.';
    var det = 'Premium: ' + money(premium) + ' | Est. annual savings: ' + money(low) + '-' + money(high) + ' | Opening protection: ' + opening + ' | Year: ' + year + ' | Roof-to-wall: ' + roofwall + ' | Openings: ' + openings;
    document.getElementById('lead_detail').value = det;
    document.getElementById('step-inputs').style.display = 'none';
    document.getElementById('step-teaser').style.display = 'block';
    document.getElementById('calc-card').scrollIntoView({behavior:'smooth', block:'start'});
  });

  var form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var fd = new FormData(form);
      fetch('https://api.web3forms.com/submit', { method:'POST', body: fd }).catch(function(){});
      var lowEst = state.openings * 750, highEst = state.openings * 1400;
      var years = state.high > 0 ? (lowEst / state.high) : 0;
      var html = '';
      html += '<p style="margin:0 0 14px;font-size:16px">Estimated annual savings from claiming full wind mitigation credits: <strong style="color:#c8102e">' + money(state.low) + ' &ndash; ' + money(state.high) + '</strong></p>';
      html += '<p style="font-weight:700;margin:18px 0 8px">Credits you are likely missing</p><ul style="margin:0 0 4px 20px">';
      for (var i=0;i<state.items.length;i++){ html += '<li style="margin-bottom:8px"><strong>' + state.items[i][0] + ':</strong> ' + state.items[i][1] + '</li>'; }
      html += '</ul>';
      html += '<p style="font-weight:700;margin:20px 0 8px">What opening protection would cost your home</p>';
      html += '<p style="margin:0 0 10px">For ' + state.openings + ' openings, impact window and door projects in Florida commonly run <strong>' + money(lowEst) + ' &ndash; ' + money(highEst) + '</strong> installed, depending on sizes, frame material and product line. Financing and the state grant program can reduce out-of-pocket significantly.</p>';
      if (years > 0) { html += '<p style="margin:0 0 10px"><strong>Insurance payback:</strong> at the upper end of your estimated savings, insurance credits alone offset the investment in roughly ' + Math.round(years) + ' years &mdash; before counting energy savings, noise reduction, storm protection and resale value.</p>'; }
      html += '<p style="font-weight:700;margin:20px 0 8px">Your next three steps</p><ol style="margin:0 0 4px 20px">';
      html += '<li style="margin-bottom:8px">Get a current wind mitigation inspection if yours is over five years old &mdash; you may already be owed credits.</li>';
      html += '<li style="margin-bottom:8px">Check eligibility for the <a href="/pages/florida-hurricane-hardening-grant.html">Florida hurricane hardening grant</a>, which can match a portion of your project cost.</li>';
      html += '<li style="margin-bottom:8px">Get itemized quotes covering <em>every</em> opening &mdash; partial projects usually forfeit the credit entirely.</li></ol>';
      html += '<p style="font-size:12px;opacity:.7;margin:18px 0 0">All figures are estimates for planning purposes. Your carrier determines actual credits from a certified inspection. Project costs vary by home.</p>';
      document.getElementById('full-body').innerHTML = html;
      document.getElementById('step-teaser').style.display = 'none';
      document.getElementById('step-full').style.display = 'block';
      document.getElementById('calc-card').scrollIntoView({behavior:'smooth', block:'start'});
    });
  }
})();
</script>
</main>
`;

fs.writeFileSync(path.join('pages', SLUG), TOP + BODY + TAIL, 'utf8');
console.log('created: pages/' + SLUG + ' (template: ' + tplFile + ')');

// link from insurance hub if present
const hub = 'pages/impact-windows-insurance-and-grants-florida.html';
if (fs.existsSync(hub)) {
  let h = fs.readFileSync(hub, 'utf8');
  if (h.indexOf(SLUG) === -1) {
    h = h.replace('<ul style="list-style:none;padding:0;margin:0;display:grid', '<p style="margin:0 0 22px;padding:14px 16px;border-left:4px solid #c8102e;background:rgba(200,16,46,.06)"><strong><a href="/pages/' + SLUG + '">Free tool: Wind Mitigation Savings Calculator &rarr;</a></strong> &mdash; see what your report is costing you each year.</p>\n<ul style="list-style:none;padding:0;margin:0;display:grid');
    fs.writeFileSync(hub, h, 'utf8');
    console.log('linked from insurance hub');
  } else console.log('hub link already present');
}

// sitemap
if (fs.existsSync('sitemap.xml')) {
  let sm = fs.readFileSync('sitemap.xml', 'utf8');
  if (sm.indexOf(URL) === -1) {
    sm = sm.replace('</urlset>', '<url><loc>' + URL + '</loc><lastmod>2026-07-21</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n</urlset>');
    fs.writeFileSync('sitemap.xml', sm, 'utf8');
    console.log('sitemap: +1 URL');
  } else console.log('sitemap already has it');
}
console.log('DONE. Deploy: npx vercel --prod');
