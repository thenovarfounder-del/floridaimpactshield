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
  slug: 'impact-window-replacement-florida',
  crumb: 'Window Replacement',
  title: 'Impact Window Replacement Florida 2026 | Full-Home Upgrade Service',
  desc: 'Impact window replacement across Florida: how full-home replacement works, retrofit vs new-frame installs, timelines, 2026 costs, insurance savings and MSFH grant funding.',
  h1: 'Impact Window Replacement: The Whole-Home Upgrade, Done Right',
  faqs: [
    {q:'How long does whole-home impact window replacement take?', a:'Most single-family replacements complete in one to three days of on-site installation once product arrives, with the full project timeline, measure, permit, manufacture, install, inspection, typically running six to twelve weeks depending on product lead times and your building department.'},
    {q:'What is the difference between retrofit and new-frame replacement?', a:'Retrofit (flange-over or insert) installs the new window into or over the existing frame, faster and less invasive; new-frame (full tear-out) removes everything to the rough opening, the gold standard for compromised frames and maximum performance. Our estimators recommend per opening based on frame condition.'},
    {q:'Can I replace windows in phases?', a:'Yes, many families phase by elevation or floor, but note that full insurance credits require every opening protected, so the biggest savings unlock when the final opening is done. Grant rules and phasing strategy are worth planning up front, which our estimators map for you.'},
    {q:'Do I need permits for window replacement in Florida?', a:'Yes, window replacement requires permits and inspections throughout Florida, and unpermitted work creates insurance, resale and legal problems. Florida Impact Shield handles permitting and inspections end to end on every project.'},
  ],
  body: `<p>Replacing every window in a Florida home is the single most consequential hardening project most families ever undertake: it changes the hurricane math, the insurance bill, the electric bill, the noise level, and the resale story all at once. It is also a construction project with real sequencing, permits, product lead times, installation logistics, inspection, and doing it right is the difference between a fortress and an expensive disappointment. Here is how Florida Impact Shield runs whole-home replacement, and what it costs in 2026.</p>
<div class="callout"><p><strong>Impact Window Replacement by Florida Impact Shield:</strong> Licensed CBC contractor, end-to-end service, measure, product, permits, installation, inspection, cleanup, with insurance savings and My Safe Florida Home grant funding built into the plan.</p></div>
<h2 ${H2}>How the Project Actually Runs</h2>
<p>Step one is the free in-home assessment: a licensed estimator measures every opening, evaluates frame conditions, and prices the project exactly, including your projected insurance savings and grant eligibility. On approval we order product (the lead-time phase, typically four to ten weeks by manufacturer and season) and pull permits. Installation itself moves fast: an experienced crew completes most single-family homes in one to three days, opening by opening, weather-sealed the same day, your home never left exposed overnight. Final inspection closes the permit, and your <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a> documents the upgrade for insurance credits.</p>
<h2 ${H2}>Retrofit vs New-Frame: The Real Decision</h2>
<p>Every replacement quote answers one technical question per opening: keep the existing frame or tear out to the rough opening? Retrofit installs are faster, cleaner and cheaper where existing frames are sound; new-frame (full tear-out) is the gold standard where frames are corroded, water-damaged or out of square, and for buyers wanting maximum performance and warranty position. Most homes end up mixed, and honest per-opening recommendations, not one-size answers, are where an experienced contractor earns trust.</p>
<h2 ${H2}>2026 Replacement Costs</h2>
<table class="data-table"><tr><th>Project Scope</th><th>Typical Installed Range</th></tr>
<tr><td>Per window (standard sizes)</td><td>$700 - $1,600</td></tr>
<tr><td>Typical 10-15 window home</td><td>$10,000 - $25,000</td></tr>
<tr><td>Larger homes with doors and sliders</td><td>$25,000 - $60,000+</td></tr></table>
<p>Our <a href="/pages/how-much-do-impact-windows-cost-florida.html">full cost guide</a> and <a href="/pages/impact-window-cost-per-window.html">per-window breakdown</a> detail the variables; <a href="/pages/financing.html">0% financing</a> spreads the investment, and the offsets below shrink it.</p>
<h2 ${H2}>The Offsets: Insurance and Grant Money</h2>
<p>Whole-home replacement is exactly what the savings machinery was built for: complete opening protection unlocks wind mitigation credits of up to 35% on the windstorm portion of your premium, year after year, and the <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a> matches $2 for every $1 you spend up to $10,000 for qualifying homeowners. Between grant dollars, premium savings, energy reduction and <a href="/pages/do-impact-windows-increase-home-resale-value-florida.html">resale value</a>, replacement is the rare renovation with a genuine payback schedule.</p>
<h2 ${H2}>Book Your Replacement Assessment</h2>
<p>A licensed estimator visits within 48 hours, measures every opening, and delivers the complete picture, exact price, timeline, insurance savings, grant eligibility, before you spend a dollar. The whole-home upgrade starts with one visit.</p>`,
  related: [['Impact Window Repair','/pages/impact-window-repair-florida.html'],['Impact Door Installation','/pages/impact-door-installation-florida.html'],['Cost Per Window','/pages/impact-window-cost-per-window.html'],['Resale Value Guide','/pages/do-impact-windows-increase-home-resale-value-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-window-repair-florida',
  crumb: 'Window Repair',
  title: 'Impact Window Repair Florida | Seal Failures, Hardware, Glass &amp; When to Replace',
  desc: 'Impact window repair in Florida: foggy glass and seal failures, broken hardware and balances, laminated glass damage, what is repairable vs replaceable, and honest guidance.',
  h1: 'Impact Window Repair: What Can Be Fixed, and When to Stop Fixing',
  faqs: [
    {q:'Can foggy impact windows be repaired?', a:'Fog between panes means the insulated glass seal has failed. The fix is replacing the glass unit (IGU) within the existing frame, a genuine repair far cheaper than window replacement, available when matching approved glass is obtainable for your product line.'},
    {q:'My impact glass is cracked but intact, is that normal?', a:'Yes, that is laminated glass doing its job: it cracks but holds together, keeping the envelope sealed. The glass unit should be replaced to restore full rating, but your home was never breached, which is the entire point of impact glass.'},
    {q:'What impact window problems are worth repairing vs replacing?', a:'Repair-worthy: seal failures, broken balances and hardware, rollers, locks, weatherstripping, and single glass units in otherwise sound windows. Replace-worthy: corroded or water-damaged frames, obsolete product lines without parts, and homes where per-window repair costs approach replacement economics.'},
    {q:'Will repairs affect my insurance credits?', a:'Properly repaired impact windows retain their protection status. What threatens credits is replacing impact glass with non-rated glass or leaving openings unprotected, always repair to the approved specification, which a licensed contractor documents.'},
  ],
  body: `<p>Impact windows are built to take punishment, but nothing built by humans is maintenance-free: seals fail and glass fogs, balances tire, rollers flatten, locks wear, and sometimes laminated glass does exactly its job, cracking but holding, and needs a unit swap afterward. The repair conversation in Florida is plagued by two bad actors: companies that only sell replacement (so everything &quot;needs&quot; replacing) and handymen who void ratings with non-approved glass. Here is the honest middle: what is genuinely repairable, what it costs, and when replacement really is the answer.</p>
<div class="callout"><p><strong>Impact Window Repair by Florida Impact Shield:</strong> Licensed assessment, approved-specification repairs, seal failures, glass units, hardware, and straight answers when repair stops making sense.</p></div>
<h2 ${H2}>The Repairable List</h2>
<p>Seal failures (foggy glass): the insulated glass unit is replaced within your existing frame, restoring clarity and efficiency at a fraction of window cost. Laminated glass damage: cracked-but-holding impact glass gets a unit swap to matching approved glass, restoring full rating. Hardware: balances that no longer hold sashes, worn rollers on sliders, failed locks and cranks, tired weatherstripping, all routine, all parts-dependent. The gating question across every category is parts availability for your product line, which our assessment answers before anyone spends money.</p>
<h2 ${H2}>The Replace-Instead List</h2>
<p>Some conditions end the repair conversation honestly: frames corroded or water-rotted (the structure the rating depends on is gone), obsolete lines with no parts channel, chronic leakage tracing to failed installation rather than components, and the economics case, when several windows each need glass and hardware, per-opening repair totals can approach <a href="/pages/impact-window-replacement-florida.html">replacement</a> pricing that resets warranties and efficiency entirely. We show the arithmetic both ways and let you decide.</p>
<h2 ${H2}>Typical Repair Costs</h2>
<table class="data-table"><tr><th>Repair</th><th>Typical Range</th></tr>
<tr><td>Insulated glass unit (seal failure)</td><td>$250 - $700 per unit</td></tr>
<tr><td>Laminated impact glass unit</td><td>$350 - $900 per unit</td></tr>
<tr><td>Balances / rollers / locks</td><td>$100 - $350 per window</td></tr></table>
<p>Ranges vary by size, product line and access; exact pricing follows assessment. Where repairs cluster, we quote the <a href="/pages/impact-window-replacement-florida.html">replacement alternative</a> beside them, one visit, both answers.</p>
<h2 ${H2}>Protecting Your Ratings and Credits</h2>
<p>The cardinal rule: repair to the approved specification. Swapping impact glass for ordinary glass, or leaving a damaged unit unaddressed, undermines both your protection and the wind mitigation status behind your insurance discounts. Licensed repairs with matching approved components keep your <a href="/pages/wind-mitigation-inspection.html">wind mitigation documentation</a> intact and your up-to-35% credits safe.</p>
<h2 ${H2}>Book a Repair Assessment</h2>
<p>A licensed assessor visits, diagnoses every problem opening, checks parts availability, and delivers repair pricing, with the replacement comparison included wherever the math gets close. Honest fixes, protected ratings, no pressure.</p>`,
  related: [['Impact Window Replacement','/pages/impact-window-replacement-florida.html'],['How Long Windows Last','/pages/how-long-do-impact-windows-last-florida.html'],['Wind Mitigation Inspections','/pages/wind-mitigation-inspection.html'],['Impact Doors Overview','/pages/impact-doors.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-door-installation-florida',
  crumb: 'Door Installation',
  title: 'Impact Door Installation Florida 2026 | Entry, French, Sliding &amp; Garage',
  desc: 'Professional impact door installation across Florida: entry, French, sliding, cabana and garage doors, what correct installation involves, 2026 costs, insurance and grants.',
  h1: 'Impact Door Installation: Where Ratings Meet Reality',
  faqs: [
    {q:'How much does impact door installation cost in Florida?', a:'Installed pricing by type: entry doors $3,500-$7,000; French doors $4,500-$8,500; two-panel sliders $4,000-$8,000; cabana doors $3,000-$6,000; garage doors $2,500-$6,000+. Multi-panel systems and estate entries quote per project. Exact numbers arrive within 48 hours of a free visit.'},
    {q:'Why does door installation quality matter so much?', a:'A door\'s rating assumes the tested anchoring schedule into sound structure with correct flashing. Doors carry bigger loads and more operation cycles than windows, so shortcuts in anchoring, shimming or waterproofing show up as leaks, sag and failed inspections, or worse, storm failures.'},
    {q:'Do you replace door frames or reuse them?', a:'Impact doors install as complete pre-hung systems, door and engineered frame together, anchored to the rough opening. Reusing old frames with new slabs sacrifices the rating; correct practice replaces the system, which every Florida Impact Shield installation does.'},
    {q:'Are impact doors eligible for grants and insurance credits?', a:'Yes. Exterior doors are openings: impact-rated replacements count toward full wind mitigation credits (up to 35% on the windstorm portion) and qualify under the My Safe Florida Home grant, $2 matched per $1 up to $10,000.'},
  ],
  body: `<p>An impact door's laboratory rating is a promise; installation is where the promise is kept or broken. Doors carry the biggest structural loads of any opening, cycle thousands of times a year, and live in the wettest zones of the envelope, which is why correct installation, engineered anchoring, proper flashing, permitted and inspected, matters even more for doors than windows. Florida Impact Shield installs the full impact door family statewide, and this page covers what professional installation actually involves.</p>
<div class="callout"><p><strong>Impact Door Installation by Florida Impact Shield:</strong> Entry, French, sliding, cabana and garage doors installed as complete rated systems by a licensed CBC contractor, permits, flashing, inspection and insurance documentation included.</p></div>
<h2 ${H2}>The Door Family We Install</h2>
<p><a href="/pages/impact-entry-doors-florida.html">Entry doors</a>, curb appeal with fortress cores; <a href="/pages/impact-french-doors-florida.html">French doors</a> in swing and sliding configurations; <a href="/pages/sliding-glass-doors.html">sliding glass doors</a> from classic two-panel to multi-panel glass walls; <a href="/pages/impact-cabana-doors-florida.html">cabana doors</a>, the pool-bath opening inspectors love to flag; and <a href="/pages/hurricane-garage-doors.html">hurricane garage doors</a>, the biggest opening on most homes. Each carries its own engineering, and each installs as a complete rated system, never a slab hung in an old frame.</p>
<h2 ${H2}>What Correct Installation Looks Like</h2>
<p>The tested rating assumes the tested install: anchors of the specified type, size and spacing into sound structure; shimming that keeps frames square under load; sill pans and flashing that manage the water Florida will absolutely deliver; low-expansion sealing that supports rather than distorts; and threshold work that survives both wheelchairs and wind-driven rain. Then the paperwork that protects you: permits pulled, inspections passed, and product approvals (HVHZ NOAs where applicable) documented for your <a href="/pages/wind-mitigation-inspection.html">wind mitigation file</a>. Every step is where cut-rate installs cut.</p>
<h2 ${H2}>2026 Installed Costs</h2>
<table class="data-table"><tr><th>Door Type</th><th>Typical Installed Range</th></tr>
<tr><td>Entry doors</td><td>$3,500 - $7,000</td></tr>
<tr><td>French doors</td><td>$4,500 - $8,500</td></tr>
<tr><td>Sliding doors (2-panel)</td><td>$4,000 - $8,000</td></tr>
<tr><td>Cabana doors</td><td>$3,000 - $6,000</td></tr>
<tr><td>Garage doors</td><td>$2,500 - $6,000+</td></tr></table>
<p><a href="/pages/financing.html">0% financing</a> is available, and every quote itemizes door, installation, permits, and your projected savings.</p>
<h2 ${H2}>The Money That Comes Back</h2>
<p>Doors are openings, and openings are where insurance credits live: impact-rated doors complete the envelope behind wind mitigation discounts of up to 35% on the windstorm portion of your premium, and exterior door replacement qualifies for <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a> matching, $2 per $1, up to $10,000. The overlooked cabana or garage door is frequently the cheapest fix with the fastest insurance payback in the whole plan.</p>
<h2 ${H2}>Book Your Door Assessment</h2>
<p>A licensed estimator visits within 48 hours, evaluates every door opening, and delivers exact installed pricing with insurance and grant numbers attached. Ratings kept, promises delivered.</p>`,
  related: [['Impact Entry Doors','/pages/impact-entry-doors-florida.html'],['Impact French Doors','/pages/impact-french-doors-florida.html'],['Impact Cabana Doors','/pages/impact-cabana-doors-florida.html'],['Hurricane Garage Doors','/pages/hurricane-garage-doors.html']].concat(COMMON_RELATED),
},
{
  slug: 'commercial-impact-windows-florida',
  crumb: 'Commercial',
  title: 'Commercial Impact Windows Florida 2026 | Offices, Retail &amp; Multifamily',
  desc: 'Commercial impact windows and glazing for Florida businesses: offices, retail, restaurants, multifamily and mixed-use, code compliance, project process and cost framework.',
  h1: 'Commercial Impact Windows: Protecting the Buildings That Work',
  faqs: [
    {q:'What commercial properties do you serve?', a:'Retail storefronts, offices, restaurants, medical and professional buildings, multifamily and condo common areas, mixed-use, and small commercial portfolios, projects where impact glazing must be engineered, permitted and installed around live operations.'},
    {q:'How is commercial impact work priced?', a:'By engineered proposal: storefront glazing typically runs $75-$150 per square foot installed, punched-opening windows price per unit similarly to residential lines, and entrance systems per door. Every project gets a site assessment producing an itemized, phased proposal.'},
    {q:'Can you install without shutting down my business?', a:'Yes, phasing is the craft: after-hours and weekend installation, elevation-by-elevation sequencing, dust and security containment, and same-day weatherproof closure so the premises are never exposed overnight. The proposal includes the phasing plan.'},
    {q:'Does commercial impact glazing affect insurance?', a:'Commercial carriers increasingly rate glazing protection the way residential carriers rate wind mitigation, documented impact glazing can improve windstorm terms, and it eliminates the shutter-deployment liability of panels nobody mounts in time. Ask your agent what documentation moves your policy.'},
  ],
  body: `<p>Florida's businesses face the same storms as its homes, with higher stakes per square foot: inventory, equipment, tenants, and the revenue that stops the moment the envelope fails. Commercial impact glazing answers with engineered systems, storefronts, punched-opening windows, entrances, glazed elevations, that meet Florida's wind-borne debris rules and the HVHZ where it applies, installed around live operations by crews who understand that your building has a job. Florida Impact Shield delivers commercial impact projects statewide.</p>
<div class="callout"><p><strong>Commercial Impact Windows by Florida Impact Shield:</strong> Engineered glazing for offices, retail, restaurants, multifamily and mixed-use, code-compliant systems, phased installation around your operations, and documentation your insurer recognizes.</p></div>
<h2 ${H2}>The Commercial Scope</h2>
<p>Storefront and entrance systems, covered in depth on our <a href="/pages/commercial-storefront-impact-windows-florida.html">storefront page</a>; punched-opening replacement windows for offices and multifamily buildings; glazed elevations and clerestories; impact entrance doors with panic hardware and closers; and the condo dimension, common-area glazing and association programs our <a href="/pages/impact-windows-for-condos-florida.html">condo guide</a> addresses, including Florida's milestone-inspection era that has boards hardening envelopes on schedules.</p>
<h2 ${H2}>How Commercial Projects Run</h2>
<p>Site assessment first: elevations measured, wind loads confirmed, existing conditions documented, operations mapped. The proposal that follows is engineered and itemized: systems and glass specifications, product approvals (HVHZ NOAs where applicable), permits, and, decisively, the phasing plan that keeps you open: after-hours installs, sequenced elevations, security and dust containment, same-day weather closure. Then execution to schedule, inspection, and the close-out documentation package, approvals, permits, warranties, your insurer and your file both want.</p>
<h2 ${H2}>Cost Framework</h2>
<table class="data-table"><tr><th>Scope</th><th>Typical Range</th></tr>
<tr><td>Storefront glazing (installed)</td><td>$75 - $150 per sq ft</td></tr>
<tr><td>Punched-opening windows</td><td>$700 - $1,800 per opening</td></tr>
<tr><td>Impact entrance doors</td><td>$4,000 - $10,000 per unit</td></tr>
<tr><td>Multi-elevation programs</td><td>Engineered proposal</td></tr></table>
<h2 ${H2}>The Business Case</h2>
<p>Beyond code compliance: laminated glazing defeats <a href="/pages/smash-and-grab-protection-florida.html">smash-and-grab burglary</a> year-round; staff evacuate before storms instead of hanging panels; reopening beats shuttered competitors by days; energy and noise improvements compound monthly; and documented protection increasingly moves commercial windstorm terms the way <a href="/pages/wind-mitigation-inspection.html">wind mitigation</a> moves residential premiums. Protection that shows up on the P&amp;L.</p>
<h2 ${H2}>Book a Commercial Assessment</h2>
<p>A commercial estimator visits your property, measures the elevations, and delivers an engineered, phased proposal with full pricing. Protect the building that pays for everything else.</p>`,
  related: [['Commercial Storefronts','/pages/commercial-storefront-impact-windows-florida.html'],['Impact Windows for Condos','/pages/impact-windows-for-condos-florida.html'],['Smash-and-Grab Protection','/pages/smash-and-grab-protection-florida.html'],['Impact Entry Doors','/pages/impact-entry-doors-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'new-construction-impact-windows-florida',
  crumb: 'New Construction',
  title: 'New Construction Impact Windows Florida | Builder &amp; Custom Home Packages',
  desc: 'Impact windows for Florida new construction: builder packages, custom home design support, code compliance from day one, scheduling that protects the critical path, and pricing.',
  h1: 'New Construction Impact Windows: Built In, Not Bolted On',
  faqs: [
    {q:'Do new Florida homes have to have impact windows?', a:'New construction in wind-borne debris regions must have impact-rated glazing or code-approved opening protection, and the HVHZ (Miami-Dade and Broward) requires the strictest approvals. Most builders and buyers now choose impact glass outright, permanent protection with no shutters to manage.'},
    {q:'When should windows be ordered in a new build?', a:'Early, at or before permit, because product lead times (four to ten-plus weeks by line and season) sit squarely on the construction critical path. Late window orders stall dry-in, which stalls everything; our builder scheduling exists to prevent exactly that.'},
    {q:'Do you work with builders or only homeowners?', a:'Both: production and custom builders on package supply-and-install terms, and owner-builders or custom-home clients who want design support, product selection, budgeting and installation coordinated with their GC.'},
    {q:'Is new-construction install different from replacement?', a:'Yes, windows anchor into open rough framing with integrated flashing into the weather barrier, the cleanest install condition there is, which is why new-construction is the moment to buy the glass you actually want rather than planning to upgrade later.'},
  ],
  body: `<p>The best time to install impact windows is before the walls close: new construction anchors glass into open framing, integrates flashing into the weather barrier itself, and prices protection at its lifetime minimum, no tear-out, no retrofit compromises, no paying twice. Florida Impact Shield supplies and installs impact windows and doors for new construction statewide, from production builder packages to one-off custom homes, with the scheduling discipline that keeps window lead times off your critical path.</p>
<div class="callout"><p><strong>New Construction Programs by Florida Impact Shield:</strong> Builder packages and custom-home support, product selection, budgeting, supply, installation, and inspection coordination, engineered to your plans and your schedule.</p></div>
<h2 ${H2}>Code From Day One</h2>
<p>Florida's wind-borne debris rules make opening protection a design input, not an afterthought: new homes in designated regions require impact glazing or approved protection, with the High-Velocity Hurricane Zone enforcing Miami-Dade NOAs, the toughest approvals in the country. Speccing impact glass outright, versus shutters over ordinary glass, delivers permanent protection, cleaner elevations, better resale positioning and the insurance profile below, which is why the market has voted decisively for glass.</p>
<h2 ${H2}>The Critical-Path Discipline</h2>
<p>Windows gate dry-in, and dry-in gates everything: drywall, cabinets, floors all wait for a weathertight shell. With product lead times running four to ten-plus weeks, window procurement belongs at permit stage, not framing stage. Our builder program locks specifications and orders early, sequences delivery to your framing schedule, and installs into rough openings with integrated flashing, the cleanest, highest-performing install condition in the industry, then coordinates inspections so the schedule never waits on glass.</p>
<h2 ${H2}>Packages and Pricing</h2>
<table class="data-table"><tr><th>Program</th><th>How It Prices</th></tr>
<tr><td>Production builder packages</td><td>Per-plan pricing, volume terms</td></tr>
<tr><td>Custom homes</td><td>Per-opening from plans; design support included</td></tr>
<tr><td>Owner-builders</td><td>Supply-and-install quotes coordinated with your GC</td></tr></table>
<p>Brand selection runs the full field, <a href="/pages/pgt-impact-windows-florida.html">PGT</a>, <a href="/pages/es-windows-florida.html">ES</a>, <a href="/pages/cgi-impact-windows-florida.html">CGI</a> and beyond, matched to your architecture and budget with the same numbers-first neutrality as our replacement work.</p>
<h2 ${H2}>The Insurance Head Start</h2>
<p>Homes born with full impact protection start life at the best wind mitigation position available: the credits worth up to 35% on the windstorm portion of premiums apply from the first policy, documented via <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a> at closeout. (My Safe Florida Home grants target existing-home retrofits, new builds simply skip straight to the savings.)</p>
<h2 ${H2}>Start at the Plans</h2>
<p>Send the plans or book a consultation: we take off the openings, spec the package, price it exactly, and slot procurement into your schedule. Built in from the beginning, protected from the first storm.</p>`,
  related: [['Commercial Impact Windows','/pages/commercial-impact-windows-florida.html'],['Impact Door Installation','/pages/impact-door-installation-florida.html'],['Best Brands 2026','/pages/best-impact-window-brands-florida-2026.html'],['Impact Window Replacement','/pages/impact-window-replacement-florida.html']].concat(COMMON_RELATED),
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
