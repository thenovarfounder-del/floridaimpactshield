// FIS Phase 1 — Product-Type Pages Generator
// Run from the floridaimpactshield root:  node build-products.js
// Clones pages/impact-windows-fort-pierce.html as the living template,
// transplants head/schema/article per product, updates sitemap.xml.
const fs = require('fs');
const path = require('path');

const TPL_PATH = path.join('pages', 'impact-windows-fort-pierce.html');
const BASE = 'https://floridaimpactshield.com';
const TODAY = '2026-07-19';

function faqHtml(faqs) {
  return faqs.map(f =>
    '      <div style="border-bottom:1px solid var(--glass-border);padding:20px 0"><h3 style="font-size:18px;margin:0 0 8px;color:var(--sky-light)">' + f.q + '</h3><p style="margin:0;line-height:1.8">' + f.a + '</p></div>'
  ).join('\n');
}
function faqSchema(faqs) {
  return JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqs.map(f=>({"@type":"Question","name":f.q.replace(/&amp;/g,'&'),"acceptedAnswer":{"@type":"Answer","text":f.a.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&')}}))});
}
function relatedHtml(links) {
  return '    <ul style="list-style:none;padding:0;columns:2">\n' + links.map(l =>
    '      <li style="margin-bottom:8px"><a href="' + l[1] + '" style="color:var(--sky-light);text-decoration:none">' + l[0] + '</a></li>'
  ).join('\n') + '\n    </ul>';
}

const CTA = `    <div style="background:linear-gradient(135deg,rgba(14,165,233,0.1),rgba(14,165,233,0.05));border:1px solid var(--glass-border);border-radius:14px;padding:32px;text-align:center;margin-top:48px">
      <h3 style="font-size:22px;margin-bottom:12px;color:var(--white)">Protect your Florida home today</h3>
      <p style="margin-bottom:24px">A licensed estimator visits within 48 hours. Know your exact costs and savings before spending a dollar.</p>
      <a href="#" onclick="Modal.open();return false;" class="btn btn-amber">Book Free In-Home Quote &rarr;</a>
    </div>`;

const H2 = 'style="font-size:26px;margin:44px 0 16px;padding-bottom:10px;border-bottom:1px solid var(--glass-border)"';

const COMMON_RELATED = [
  ['Impact Window Costs','/pages/how-much-do-impact-windows-cost-florida.html'],
  ['Insurance Savings','/pages/hurricane-windows-insurance-savings.html'],
  ['My Safe Florida Home Grants','/pages/my-safe-florida-home-grants.html'],
  ['0% Financing Options','/pages/financing.html'],
];

const PAGES = [
{
  slug: 'impact-window-contractor-checklist-florida',
  crumb: 'Contractor Checklist',
  title: 'Impact Window Contractor Checklist Florida | 10 Questions Before You Sign',
  desc: 'The 10-point checklist for vetting any Florida impact window contractor: license verification, insurance, NOAs, permits, itemized quotes, MSFH approval and red flags.',
  h1: 'The Impact Window Contractor Checklist: 10 Questions Before You Sign Anything',
  faqs: [
    {q:'How do I verify a Florida contractor\'s license?', a:'Search the license number on the Florida DBPR website (myfloridalicense.com): confirm it is active, matches the company name on your contract, and is the right license class, impact window and door work is properly performed under certified building contractor (CBC or CGC) licensure. Verify yourself; never accept a photocopy as proof.'},
    {q:'Why do permits matter so much for window work?', a:'Permits trigger the inspections that verify code-compliant installation, and unpermitted work voids product ratings in practice, creates insurance claim problems, surfaces at resale, and can require costly retroactive permitting. A contractor who suggests skipping permits has told you everything.'},
    {q:'What paperwork should a legitimate quote include?', a:'Itemized products with approval numbers (NOA or Florida Product Approval), quantities and sizes, installation scope, permit handling, timeline, payment schedule tied to milestones, and warranty terms in writing. Vague one-line quotes hide the corners that get cut later.'},
    {q:'What is the biggest red flag of all?', a:'Pressure. Today-only pricing, demands for large cash deposits, reluctance to show licenses or approvals, and discouraging permits are the four horsemen of window-contractor regret. Legitimate contractors welcome scrutiny, this checklist exists because we pass it.'},
  ],
  body: `<p>The impact window industry has a quality spread wider than the products themselves: the same glass installed by two different contractors can mean a fortress or a lawsuit. This checklist is the ten-question filter, the exact scrutiny we invite on our own work, published so every Florida homeowner can hold every contractor to it, including us. Print it, ask it, and watch how each company reacts; the reaction is itself the answer.</p>
<div class="callout"><p><strong>Use this on everyone, including Florida Impact Shield.</strong> A contractor who welcomes this checklist has nothing to hide; one who bristles at it just saved you a very expensive lesson.</p></div>
<h2 ${H2}>The 10-Point Checklist</h2>
<p><strong>1. License, verified by you:</strong> active CBC/CGC on the state DBPR site, matching the contract name, not a photocopy, not a &quot;partner's&quot; license. <strong>2. Insurance certificates:</strong> current general liability and workers' comp, issued to you by the insurer on request. <strong>3. Product approvals in writing:</strong> NOA or Florida Product Approval numbers on the quote, matching the exact products, our <a href="/pages/impact-window-ratings-explained.html">ratings guide</a> shows how to read them. <strong>4. Permits, always:</strong> pulled by the contractor, inspections passed, no exceptions and no &quot;save you the fee&quot; offers. <strong>5. Itemized quote:</strong> products, sizes, quantities, scope, timeline, warranty, in writing. <strong>6. Payment schedule tied to milestones:</strong> modest deposit, progress payments, final on completed inspection, never large cash up front. <strong>7. MSFH approval where grants apply:</strong> <a href="/pages/msfh-approved-contractor-florida.html">program-approved contractors</a> are vetted and can process your grant. <strong>8. Installation crew answers:</strong> who installs, employees or subs, and who supervises. <strong>9. Warranty clarity:</strong> product warranty and workmanship warranty, separately stated, in writing. <strong>10. References and record:</strong> recent local projects, review history, and years operating under the same name.</p>
<h2 ${H2}>The Red Flags, Ranked</h2>
<p>Pressure tactics lead the list, expiring prices, sign-tonight bonuses, followed by big cash deposits, permit avoidance, unverifiable licenses, and quotes that fit on a napkin. Storm-chasing out-of-state operations spike after every hurricane; the checklist filters them in one conversation, because none of them can pass items 1, 4 and 7 together.</p>
<h2 ${H2}>Why We Published the Test We Have to Pass</h2>
<p>Florida Impact Shield is a licensed CBC contractor and <a href="/pages/msfh-approved-contractor-florida.html">My Safe Florida Home approved</a>: every quote we issue carries approval numbers, every project is permitted and inspected, every payment schedule ties to milestones, and every warranty is written. Publishing the checklist costs us nothing and costs bad contractors everything, which is exactly the market we want to compete in.</p>
<h2 ${H2}>Put Us Through It</h2>
<p>A licensed estimator visits within 48 hours with the paperwork this checklist demands, license, approvals, itemized pricing, and your insurance savings and <a href="/pages/my-safe-florida-home-grants.html">grant eligibility</a> calculated. Ten questions, honest answers, then your decision.</p>`,
  related: [['MSFH Approved Contractor','/pages/msfh-approved-contractor-florida.html'],['Ratings Explained','/pages/impact-window-ratings-explained.html'],['Permits in Florida','/pages/impact-windows-permit-florida.html'],['Manufacturers We Install','/pages/impact-window-manufacturers-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-window-manufacturers-florida',
  crumb: 'Manufacturers',
  title: 'Impact Window Manufacturers Florida 2026 | Brands We Install &amp; Compare',
  desc: 'The Florida impact window manufacturer landscape: PGT, CGI, ES Windows, Andersen, MR Glass, Eco, Lawson, who makes what, where each wins, and how we quote them against each other.',
  h1: 'Impact Window Manufacturers: The Florida Field, Mapped',
  faqs: [
    {q:'Which impact window manufacturer is best?', a:'None wins universally, they win by project: PGT leads vinyl breadth, ES leads jumbo and aluminum, CGI carries premium pedigree, and the local aluminum houses (MR Glass, Eco, Lawson) win on value and lead times. The best brand is the one that wins on your quote sheet for your openings.'},
    {q:'Do you install all of these brands?', a:'We quote and install across the approved field, matching products to projects rather than pushing one label. Installer-neutral quoting is the entire point: your openings, sizes and budget pick the manufacturer, not our margins.'},
    {q:'Are Florida-made windows better for Florida homes?', a:'Local manufacturing brings real advantages, HVHZ-native engineering, shorter lead times, responsive service, and most of the field builds in-state. National lines counter with distribution depth and product breadth. Both routinely carry identical approvals, which is what actually matters.'},
    {q:'How should I compare manufacturers on a quote?', a:'Compare approvals (NOA/FL numbers), DP ratings, glass packages and warranty terms line by line, then price, our ratings guide decodes the paperwork. Adjectives are marketing; the specification sheet is the truth.'},
  ],
  body: `<p>Florida grows impact window manufacturers the way it grows storms, locally and in quantity, and shopping the field means navigating a dozen serious names with overlapping claims. This is the map: who makes what, where each manufacturer actually wins, and how our installer-neutral quoting turns brand marketing back into arithmetic. Every name below links to its full profile.</p>
<div class="callout"><p><strong>How Florida Impact Shield uses this map:</strong> we quote across the approved field for your specific openings, vinyl where vinyl wins, aluminum where openings demand it, and let the specification sheets and prices decide. Brands compete; you referee.</p></div>
<h2 ${H2}>The Majors</h2>
<p><strong><a href="/pages/pgt-impact-windows-florida.html">PGT</a>:</strong> the Venice-built institution whose <a href="/pages/pgt-winguard-impact-windows-florida-review.html">WinGuard line</a> defined residential impact, deepest vinyl catalog and dealer network in the state. <strong><a href="/pages/cgi-impact-windows-florida.html">CGI</a>:</strong> premium pedigree, the Sentinel and Estate lines, under the same corporate family as PGT, compared head-to-head in our <a href="/pages/cgi-vs-pgt-impact-windows-florida.html">CGI vs PGT</a> guide. <strong><a href="/pages/es-windows-florida.html">ES Windows</a>:</strong> the vertically integrated tower-glass heavyweight, jumbo capability and aluminum strength, faced off in <a href="/pages/es-windows-vs-pgt-florida.html">ES vs PGT</a>. <strong><a href="/pages/andersen-impact-windows-florida.html">Andersen</a>:</strong> the national name's coastal impact lines for buyers wanting its wood-interior aesthetics with Florida ratings.</p>
<h2 ${H2}>The Florida Aluminum Houses</h2>
<p><strong><a href="/pages/mr-glass-windows-florida.html">MR Glass</a>:</strong> Miami-made aluminum with sharp residential value and local lead times. <strong><a href="/pages/eco-window-systems-florida.html">Eco Window Systems</a>:</strong> the volume specialist behind countless condo and multifamily programs, Medley-built. <strong><a href="/pages/lawson-windows-florida.html">Lawson Industries</a>:</strong> the Hialeah veteran running both aluminum and vinyl under one Florida roof, the value play with local service. Together they form the value-and-logistics tier that keeps the majors honest on every bid.</p>
<h2 ${H2}>How the Field Sorts by Project</h2>
<p>Classic vinyl replacement (ranches, standard openings): PGT territory with Lawson pressing on value. Jumbo glass, modern aluminum, oversized sliders: ES leads, MR Glass and Eco compete hard on standard aluminum. Condo programs matching building standards: Eco's home field. Premium and design-driven work: CGI, Andersen and the <a href="/pages/frameless-impact-windows-florida.html">minimal-frame specialists</a>. Every path runs through identical fundamentals, approvals verified (our <a href="/pages/impact-window-ratings-explained.html">ratings guide</a> and <a href="/pages/miami-dade-noa-approval-explained.html">NOA explainer</a> decode them) and installation to the approved details, where projects are truly won or lost.</p>
<h2 ${H2}>Same Money Machinery, Any Badge</h2>
<p>Whichever manufacturer wins your quote, the financial stack is constant: wind mitigation credits up to 35% off the windstorm portion via <a href="/pages/wind-mitigation-inspection.html">inspection</a>, <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a> at $2 per $1 up to $10,000, and <a href="/pages/financing.html">0% financing</a> on the balance. Brands are the menu; the math is the meal.</p>
<h2 ${H2}>Make Them Compete for Your House</h2>
<p>A licensed estimator visits within 48 hours, measures every opening, and returns the field quoted head-to-head, specifications, approvals and prices aligned, with your savings calculated. The map is above; the referee is you.</p>`,
  related: [['Best Brands 2026','/pages/best-impact-window-brands-florida-2026.html'],['ES vs PGT','/pages/es-windows-vs-pgt-florida.html'],['CGI vs PGT','/pages/cgi-vs-pgt-impact-windows-florida.html'],['Contractor Checklist','/pages/impact-window-contractor-checklist-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-window-projects-florida',
  crumb: 'Our Work',
  title: 'Impact Window Projects Florida | The Work We Do, Project by Project',
  desc: 'The project types Florida Impact Shield delivers: whole-home replacements, luxury and oversized glass, condo and association work, commercial glazing and grant-funded hardening.',
  h1: 'Our Work: The Projects Behind the Promise',
  faqs: [
    {q:'What does a typical Florida Impact Shield project look like?', a:'The backbone of our work is whole-home replacement: 10 to 25 openings, one to three installation days, permits and inspections handled, wind mitigation documented, delivered across single-family Florida from value ranches to waterfront estates.'},
    {q:'Do you handle luxury and oversized glass work?', a:'Yes, oversized fixed lites, multi-panel glass walls, minimal-frame systems and estate-grade design work are a core project category, including the island and coastal logistics (associations, access, salt-environment specs) that luxury addresses demand.'},
    {q:'Can you work with my condo association?', a:'Association work is its own discipline we practice constantly: matching building-approved products, submittals and certificates, elevator and scheduling protocols, both for individual units and building-wide programs.'},
    {q:'Do you take on grant-funded projects?', a:'Constantly, as a My Safe Florida Home approved contractor, grant-funded hardening is one of our signature project types: inspection coordination, approved-scope installation and the documentation the program requires, start to finish.'},
  ],
  body: `<p>A contractor's marketing tells you what they want to sell; their project mix tells you what they actually do. This page is our mix, the five project types that fill Florida Impact Shield's calendar, what each involves, and what doing them well requires, so you can see where your project fits before an estimator ever visits.</p>
<div class="callout"><p><strong>Licensed CBC contractor, MSFH approved, serving Florida since 2018:</strong> every project type below runs the same spine, approved products, pulled permits, passed inspections, documented insurance position.</p></div>
<h2 ${H2}>Whole-Home Replacements: The Backbone</h2>
<p>Our bread and butter: complete window and door replacement on single-family homes, 10 to 25 openings, one to three install days, from value-focused ranches assembled around sharp vinyl arithmetic to coastal homes engineered for exposure. The craft is sequencing, product mix (vinyl where it wins, aluminum where openings demand), same-day weather sealing, and the <a href="/pages/impact-window-replacement-florida.html">full-process discipline</a> that ends with a closed permit and a documented wind mitigation file.</p>
<h2 ${H2}>Luxury and Oversized Glass</h2>
<p>The projects where engineering meets design: <a href="/pages/impact-picture-windows-florida.html">oversized fixed lites</a> and view walls, <a href="/pages/impact-patio-doors-florida.html">multi-panel door systems</a>, <a href="/pages/frameless-impact-windows-florida.html">minimal-frame modern work</a>, and the estate-grade profile matching our <a href="/pages/impact-windows-palm-beach-island.html">Palm Beach</a> and island pages describe, plus the logistics (ferries, associations, staff coordination, salt-environment specifications) that make luxury addresses their own trade.</p>
<h2 ${H2}>Condo and Association Work</h2>
<p>Unit upgrades matching building standards and building-wide programs alike: submittal packages, certificates of insurance, elevator scheduling, floor protection and the product-matching discipline our <a href="/pages/impact-windows-for-condos-florida.html">condo guide</a> details. Association work rewards process, and process is the product.</p>
<h2 ${H2}>Commercial Glazing</h2>
<p>Storefronts, offices, restaurants and multifamily buildings, engineered systems installed around live operations: after-hours phasing, security containment, same-day closure, covered across our <a href="/pages/commercial-impact-windows-florida.html">commercial</a> and <a href="/pages/commercial-storefront-impact-windows-florida.html">storefront</a> pages. The building keeps working while it gets stronger.</p>
<h2 ${H2}>Grant-Funded Hardening</h2>
<p>The signature Florida project of this era: <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home</a> installations as a program-approved contractor, inspection coordination, approved scopes, $2-per-$1 matched funding up to $10,000, and the paperwork done right, protection that arrives with most of the bill already spoken for.</p>
<h2 ${H2}>Where Does Your Project Fit?</h2>
<p>A licensed estimator visits within 48 hours, reads your project against the mix above, and delivers exact pricing with insurance savings and grant eligibility attached. The work speaks; come add yours to it.</p>`,
  related: [['Window Replacement','/pages/impact-window-replacement-florida.html'],['Commercial Projects','/pages/commercial-impact-windows-florida.html'],['Condo Guide','/pages/impact-windows-for-condos-florida.html'],['Contractor Checklist','/pages/impact-window-contractor-checklist-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'referral-program-florida',
  crumb: 'Referral Program',
  title: 'Referral Program | Earn Rewards for Referring Florida Impact Shield',
  desc: 'The Florida Impact Shield referral program: earn a reward for every referred neighbor, friend or family member whose impact window project completes. Simple terms, real thanks.',
  h1: 'The Referral Program: Good Neighbors, Rewarded',
  faqs: [
    {q:'How does the referral program work?', a:'Tell a friend, neighbor or family member about Florida Impact Shield and have them mention your name when they book their free quote (or send us their info with permission). When their project completes, your referral reward is issued, simple as that.'},
    {q:'What is the referral reward?', a:'A cash reward is issued for every completed referred project, with the current reward amount confirmed when you register the referral. There is no limit: refer three neighbors, earn three rewards.'},
    {q:'Do I need to be a past customer to refer?', a:'No, anyone can refer. Past customers are our most natural referrers because they have seen the work, but neighbors, realtors, property managers and community members are all welcome in the program.'},
    {q:'When is the reward paid?', a:'After the referred project completes and passes final inspection, the milestone that matters. We confirm your reward at referral registration and issue it promptly at completion.'},
  ],
  body: `<p>Half of our best projects arrive the same way: a homeowner stands in a neighbor's newly protected living room, hears the quote-to-inspection story, and asks for the number. Word of mouth built this company, and the referral program is how we thank it, properly, in cash, every time a referred project completes. No games, no gift-card mazes, no limits.</p>
<div class="callout"><p><strong>The program in one line:</strong> refer someone, they mention your name at their free quote, their project completes, your reward is issued. Repeat as often as your neighborhood allows.</p></div>
<h2 ${H2}>How It Works, Start to Finish</h2>
<p>Step one: tell them, the neighbor pricing shutters, the friend staring at a renewal notice, the family member with 1990s glass, and have them mention your name when booking their <a href="/free-quote.html">free quote</a>, or send us their info with their permission and we make the call. Step two: we do what we do, licensed estimate within 48 hours, exact pricing, insurance and <a href="/pages/my-safe-florida-home-grants.html">grant math</a> included. Step three: their project completes and passes final inspection, and your reward is issued. Every referral is tracked from registration so nothing falls through.</p>
<h2 ${H2}>Who Refers Best</h2>
<p>Past customers lead naturally, your project is the demonstration, but the program is open: neighbors coordinating community upgrades (adjacent projects can share crew scheduling), realtors whose listings need protection stories, property managers hardening portfolios, and community members who simply know who is shopping. There is no cap: three referrals, three rewards.</p>
<h2 ${H2}>Why Referrals Get Our Best Work</h2>
<p>A referral spends two reputations, ours and yours, and we protect both: referred projects run the same spine as everything we do (licensed CBC contractor, <a href="/pages/msfh-approved-contractor-florida.html">MSFH approved</a>, permits pulled, inspections passed, wind mitigation documented) with your name attached to the file as the person who sent them. Send us someone; we will make you look good for it.</p>
<h2 ${H2}>The Easiest Version</h2>
<p>Forward them our <a href="/pages/impact-window-contractor-checklist-florida.html">contractor checklist</a> and tell them to run every bidder through it, including us. The checklist wins us the comparison, your friend gets protected properly, and your reward follows their final inspection. Everyone leaves the table better off.</p>
<h2 ${H2}>Register a Referral</h2>
<p>Call, use the quote form with your name in the notes, or mention it to any team member, referrals register in one minute, rewards confirm at registration, and payment follows completion. Good neighbors built this company; the program keeps the books square.</p>`,
  related: [['Free Quote','/free-quote.html'],['Contractor Checklist','/pages/impact-window-contractor-checklist-florida.html'],['Our Work','/pages/impact-window-projects-florida.html'],['About Us','/pages/about.html']].concat(COMMON_RELATED.slice(0,3)),
},
];

// ---- build ----
const tpl = fs.readFileSync(TPL_PATH, 'utf8');
let made = 0;
for (const p of PAGES) {
  const url = BASE + '/pages/' + p.slug + '.html';
  let html = tpl;
  // head swaps
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>' + p.title + '</title>');
  html = html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + p.desc + '">');
  html = html.replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + url + '">');
  html = html.replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="' + url + '">');
  html = html.replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="' + p.title + '">');
  html = html.replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="' + p.desc + '">');
  // schema swaps
  const plain = t => t.replace(/&amp;/g, '&');
  const artSchema = JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":plain(p.title),"description":plain(p.desc),"url":url,"publisher":{"@type":"Organization","name":"Florida Impact Shield","url":"https://floridaimpactshield.com"}});
  const bcSchema = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://floridaimpactshield.com/"},{"@type":"ListItem","position":2,"name":plain(p.crumb),"item":url}]});
  html = html.replace(/<script type="application\/ld\+json">\s*\{"@context":"https:\/\/schema\.org","@type":"Article"[\s\S]*?<\/script>/, '<script type="application/ld+json">\n' + artSchema + '\n</script>');
  html = html.replace(/<script type="application\/ld\+json">\s*\{"@context":"https:\/\/schema\.org","@type":"BreadcrumbList"[\s\S]*?<\/script>/, '<script type="application/ld+json">\n' + bcSchema + '\n</script>');
  html = html.replace(/<script type="application\/ld\+json">\s*\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?<\/script>/, '<script type="application/ld+json">\n' + faqSchema(p.faqs) + '\n</script>');
  // body/section swap
  const body = p.body.split('${H2}').join(H2);
  const section = `<section style="padding:140px 0 60px">
<div class="container">
  <div class="breadcrumb"><a href="/">Home</a> <span>/</span> <span>` + p.crumb + `</span></div>
  <div class="article-body">
    <span class="badge badge-sky" style="margin-bottom:16px">Florida Impact Shield</span>
    <h1 style="font-size:clamp(28px,4vw,44px);margin-bottom:16px">` + p.h1 + `</h1>
    <div style="display:flex;gap:16px;align-items:center;margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid var(--glass-border)">
      <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--sky-dim),var(--navy));display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0">FIS</div>
      <div><div style="font-size:14px;font-weight:600;color:var(--white)">Florida Impact Shield Team</div><div style="font-size:12px;color:var(--slate)">Updated July 2026 &middot; Licensed CBC Contractor</div></div>
    </div>
` + body + `
    <h2 ` + H2 + `>Frequently Asked Questions</h2>
` + faqHtml(p.faqs) + `
    <h2 ` + H2 + `>Related Resources</h2>
` + relatedHtml(p.related) + `
` + CTA + `
  </div>
</div>
</section>`;
  html = html.replace(/<section style="padding:140px 0 60px">[\s\S]*?<\/section>/, section);
  fs.writeFileSync(path.join('pages', p.slug + '.html'), html, 'utf8');
  made++;
  console.log('WROTE pages/' + p.slug + '.html  (' + html.length + ' bytes)');
}

// ---- sitemap ----
let sm = fs.readFileSync('sitemap.xml', 'utf8');
let added = 0;
for (const p of PAGES) {
  const url = BASE + '/pages/' + p.slug + '.html';
  if (sm.indexOf(url) === -1) {
    sm = sm.replace('</urlset>', '  <url><loc>' + url + '</loc><lastmod>' + TODAY + '</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n</urlset>');
    added++;
  }
}
fs.writeFileSync('sitemap.xml', sm, 'utf8');
console.log('DONE: ' + made + ' pages written, ' + added + ' sitemap URLs added.');
