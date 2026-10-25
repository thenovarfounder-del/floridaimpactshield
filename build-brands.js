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
  slug: 'es-windows-florida',
  crumb: 'ES Windows',
  title: 'ES Windows Florida Review 2026 | Impact Windows &amp; Doors Guide',
  desc: 'ES Windows (Energia Solar / Tecnoglass) impact windows for Florida: product lines, HVHZ approvals, strengths, typical pricing position, and how ES compares to PGT and CGI.',
  h1: 'ES Windows in Florida: The High-Rise Heavyweight Comes Home',
  faqs: [
    {q:'Who makes ES Windows?', a:'ES Windows is the flagship brand of Tecnoglass, a vertically integrated glass and window manufacturer whose products are engineered for Florida and carry approvals for the state\'s toughest jurisdictions, including Miami-Dade HVHZ Notices of Acceptance on qualifying lines.'},
    {q:'Are ES Windows good for hurricanes?', a:'Yes. ES built its reputation glazing South Florida high-rises and commercial towers, some of the most wind-exposed structures in the state, and brings that engineering to residential impact windows and doors with large-missile ratings and strong design pressures on approved lines.'},
    {q:'How do ES Windows prices compare to PGT?', a:'ES typically positions competitively against PGT WinGuard, often winning on larger openings and aluminum products where its commercial DNA shows, while PGT counters with the state\'s deepest dealer network and vinyl breadth. Exact pricing depends on your opening sizes and glass packages, which a free quote pins down.'},
    {q:'Does Florida Impact Shield install ES Windows?', a:'We match products to projects: our estimators quote ES alongside PGT, CGI and other approved brands so you compare real numbers for your actual openings rather than brand marketing. The right brand is the one that wins on your quote sheet.'},
  ],
  body: `<p>Drive through Miami and look up: a remarkable share of the impact glass on the skyline came from ES Windows, the flagship brand of vertically integrated manufacturer Tecnoglass. That commercial pedigree, towers engineered for the worst wind loads in America, is exactly why ES has become one of the most requested residential brands in Florida. This guide covers what ES does well, where it fits, and how it stacks against the PGT and CGI lines Florida homeowners usually cross-shop.</p>
<div class="callout"><p><strong>Brand guides from Florida Impact Shield:</strong> We are installers, not a brand's sales channel. Our estimators quote multiple approved manufacturers against your actual openings, so the winner is chosen by numbers, not logos.</p></div>
<h2 ${H2}>The ES Story: Vertical Integration</h2>
<p>Tecnoglass makes its own glass, laminates its own interlayers, extrudes aluminum, and assembles finished windows and doors, a vertical integration few competitors match. For buyers, that translates into supply-chain control (a real advantage in post-storm demand surges), consistent glass quality, and aggressive capability on large and custom openings where commercial engineering pays off. ES products serving Florida carry the approvals that matter, including Miami-Dade HVHZ Notices of Acceptance on qualifying lines, the toughest product standard in the nation.</p>
<h2 ${H2}>Where ES Shines</h2>
<p>Three patterns from the field. Large openings: oversized sliders, big fixed lites and mulled walls are ES home turf, the commercial DNA showing. Aluminum strength: buyers wanting aluminum frames for slim profiles and structural capacity find ES among the strongest catalogs. Modern aesthetics: clean lines and big-glass architecture suit the brand's tower heritage. For classic vinyl single-hungs on a 1980s ranch, the comparison gets closer, which is why we quote rather than preach; our <a href="/pages/best-impact-window-brands-florida-2026.html">brand comparison guide</a> maps the whole field.</p>
<h2 ${H2}>ES vs the Field</h2>
<table class="data-table"><tr><th>Consideration</th><th>ES Windows Position</th></tr>
<tr><td>HVHZ approvals</td><td>Yes, on qualifying lines (Miami-Dade NOA)</td></tr>
<tr><td>Sweet spot</td><td>Large openings, aluminum, modern designs</td></tr>
<tr><td>Supply chain</td><td>Vertically integrated (glass to finished unit)</td></tr>
<tr><td>Main rivals</td><td><a href="/pages/pgt-impact-windows-florida.html">PGT WinGuard</a>, <a href="/pages/cgi-impact-windows-florida.html">CGI</a></td></tr></table>
<p>The head-to-head Florida homeowners ask about most, ES against PGT, gets its own deep dive in our <a href="/pages/es-windows-vs-pgt-florida.html">ES vs PGT comparison</a>.</p>
<h2 ${H2}>Insurance, Grants, and the Install That Matters</h2>
<p>Any approved impact brand unlocks the same fundamentals: wind mitigation credits worth up to 35% on the windstorm portion of your insurance, documented via a <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a>, and eligibility under the <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a>, $2 matched per $1 up to $10,000. The variable that actually decides performance is installation: anchoring, flashing, and permitting to your wind zone, which is where a licensed CBC contractor earns the fee regardless of the sticker on the glass.</p>
<h2 ${H2}>Get ES Quoted Against the Field</h2>
<p>A licensed estimator visits within 48 hours, measures your openings, and prices ES alongside its rivals for your actual project, with insurance savings and grant eligibility calculated. Let the brands compete for your house.</p>`,
  related: [['ES vs PGT Comparison','/pages/es-windows-vs-pgt-florida.html'],['PGT Impact Windows','/pages/pgt-impact-windows-florida.html'],['CGI Impact Windows','/pages/cgi-impact-windows-florida.html'],['Best Brands 2026','/pages/best-impact-window-brands-florida-2026.html']].concat(COMMON_RELATED),
},
{
  slug: 'es-windows-vs-pgt-florida',
  crumb: 'ES vs PGT',
  title: 'ES Windows vs PGT 2026 | Which Impact Windows Win in Florida?',
  desc: 'ES Windows vs PGT WinGuard compared for Florida homes: strengths, product fit, aluminum vs vinyl, pricing dynamics, availability, and how to make the call for your project.',
  h1: 'ES Windows vs PGT: Florida&apos;s Heavyweight Title Fight',
  faqs: [
    {q:'Which is better, ES Windows or PGT?', a:'Neither wins universally; they win by project. ES typically leads on large openings, aluminum products and modern big-glass designs; PGT leads on vinyl breadth, the state\'s deepest dealer and service network, and the classic WinGuard track record. The honest answer comes from quoting both against your actual openings.'},
    {q:'Is PGT more expensive than ES?', a:'Pricing crosses over by product: PGT vinyl often prices sharply on standard openings while ES gets competitive, sometimes decisively, on oversized and aluminum work. Glass packages, sizes and dealer dynamics move the needle more than brand alone.'},
    {q:'Do both brands have Miami-Dade approvals?', a:'Yes, both carry HVHZ Notices of Acceptance on qualifying lines, meeting the toughest product standard in the country. Approval parity is why the decision comes down to product fit, availability and price rather than protection level.'},
    {q:'Can I mix brands in one project?', a:'Yes, and it is often smart: for example, PGT vinyl hungs for the bedrooms with ES aluminum for the oversized great-room slider. Approvals are per product, and a good installer engineers the package to your openings.'},
  ],
  body: `<p>Ask three Florida contractors to name the top impact brands and ES Windows and PGT will headline all three answers, then the argument starts. It is the state's real head-to-head: the vertically integrated tower-glass heavyweight against the Venice-built institution whose WinGuard line practically defined residential impact windows. Here is the comparison without the logo worship, and how to decide for your actual house.</p>
<div class="callout"><p><strong>The honest frame:</strong> Both brands carry HVHZ approvals on qualifying lines and both protect your family. This fight is decided on product fit, availability, and your quote sheet, not on protection.</p></div>
<h2 ${H2}>Where Each Brand Wins</h2>
<table class="data-table"><tr><th>Category</th><th>Edge</th><th>Why</th></tr>
<tr><td>Vinyl breadth (hungs, sliders)</td><td>PGT</td><td>Deep vinyl catalog, decades of WinGuard iteration</td></tr>
<tr><td>Oversized openings and glass walls</td><td>ES</td><td>Commercial engineering, jumbo glass capability</td></tr>
<tr><td>Aluminum products</td><td>ES</td><td>Extrusion-to-finish integration, slim strong profiles</td></tr>
<tr><td>Dealer and service network</td><td>PGT</td><td>The state's most established distribution</td></tr>
<tr><td>Supply resilience post-storm</td><td>ES</td><td>Makes its own glass, controls its chain</td></tr>
<tr><td>Classic Florida replacement look</td><td>PGT</td><td>The default homeowners and inspectors know</td></tr></table>
<h2 ${H2}>The Product-Fit Logic</h2>
<p>Standard 1990s ranch with a dozen hung windows and a slider: PGT's vinyl lines quote hard to beat, with the <a href="/pages/pgt-winguard-impact-windows-florida-review.html">WinGuard review</a> covering the details. Modern build with a 16-foot glass wall, oversized fixed lites and aluminum aesthetics: ES's tower DNA typically shows in both capability and price. Mixed houses, most houses, often end mixed-brand: vinyl where vinyl wins, aluminum where the openings demand it. Approvals are per product line, so a properly engineered package can draw from both catalogs.</p>
<h2 ${H2}>What Actually Decides It: The Quote Sheet</h2>
<p>Brand debates end when real numbers arrive. Sizes, glass packages (Low-E, laminated-insulated), color, and current dealer dynamics move totals more than brand identity, and availability windows matter when hurricane season is close. Our process quotes both brands (plus <a href="/pages/cgi-impact-windows-florida.html">CGI</a> where it fits) against your measured openings, then lets arithmetic pick the winner, the same discipline behind our <a href="/pages/cgi-vs-pgt-impact-windows-florida.html">CGI vs PGT</a> comparison.</p>
<h2 ${H2}>Same Insurance Math Either Way</h2>
<p>Whichever badge wins, the financial fundamentals are identical: full opening protection unlocks wind mitigation credits up to 35% on the windstorm portion of your premium, and both brands' installations qualify for <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a> ($2 matched per $1, up to $10,000). Installation quality, anchoring, flashing, permits, decides real-world performance more than the ES-vs-PGT choice ever will.</p>
<h2 ${H2}>Settle It With Numbers</h2>
<p>A licensed estimator visits within 48 hours, measures every opening, and delivers both brands priced side by side with your insurance savings and grant eligibility attached. The title fight ends at your kitchen table, with you holding the scorecard.</p>`,
  related: [['ES Windows Review','/pages/es-windows-florida.html'],['PGT Impact Windows','/pages/pgt-impact-windows-florida.html'],['PGT WinGuard Review','/pages/pgt-winguard-impact-windows-florida-review.html'],['CGI vs PGT','/pages/cgi-vs-pgt-impact-windows-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'mr-glass-windows-florida',
  crumb: 'MR Glass',
  title: 'MR Glass Impact Windows Florida 2026 | Miami-Made Review &amp; Guide',
  desc: 'MR Glass impact windows and doors for Florida: the Miami manufacturer\'s aluminum lines, HVHZ approvals, where the brand fits, pricing position and comparisons.',
  h1: 'MR Glass: Miami&apos;s Homegrown Impact Manufacturer',
  faqs: [
    {q:'Who is MR Glass?', a:'MR Glass Doors & Windows is a Miami-based manufacturer of aluminum impact windows and doors, building products in South Florida for South Florida conditions, with Miami-Dade HVHZ Notices of Acceptance on qualifying lines.'},
    {q:'Are MR Glass windows good quality?', a:'MR Glass has built a solid reputation in the South Florida market, particularly for aluminum products, sliders and doors, at competitive price points, which is why comparisons like ES vs MR Glass have become common homeowner research. As with any brand, specific product lines and installation quality decide outcomes.'},
    {q:'How does MR Glass compare to ES Windows?', a:'Both are aluminum-strong South Florida manufacturers. ES brings tower-scale vertical integration and jumbo-glass capability; MR Glass competes on local manufacturing, lead times and sharp pricing in residential aluminum. On many projects the real decision is made by quotes for your specific openings.'},
    {q:'Does Florida Impact Shield quote MR Glass?', a:'We quote approved brands that fit your project, MR Glass included where its catalog matches your openings, always alongside alternatives so you compare real numbers rather than reputations.'},
  ],
  body: `<p>Not every serious impact brand ships from a national campus; some are forged a few miles from the buildings they protect. MR Glass Doors &amp; Windows manufactures aluminum impact windows and doors in Miami, engineering for the High-Velocity Hurricane Zone because the HVHZ is literally the home market. For homeowners cross-shopping the aluminum field, ES, CGI, Eco, MR Glass has become a fixture of the short list, and this guide covers why.</p>
<div class="callout"><p><strong>Brand guides from Florida Impact Shield:</strong> installer-neutral, numbers-first. We quote MR Glass where it fits your openings, beside its rivals, and let your quote sheet declare the winner.</p></div>
<h2 ${H2}>The Local-Manufacturer Advantage</h2>
<p>Building in Miami means engineering to Miami: qualifying MR Glass lines carry HVHZ Notices of Acceptance, the strictest product approvals in the country, and the factory's proximity shows up in practical ways, lead times that beat cross-country freight, responsive custom sizing, and service that does not route through three states. In the post-storm demand surges when national supply chains stretch, local manufacturing has repeatedly proven its worth across the South Florida trade.</p>
<h2 ${H2}>Where MR Glass Fits</h2>
<p>The brand's center of gravity is aluminum: sliders and French-style doors, horizontal rollers, single-hungs and fixed lites in the clean-lined aluminum idiom South Florida architecture favors. Buyers wanting vinyl-first packages usually shop the <a href="/pages/pgt-impact-windows-florida.html">PGT</a> catalog; buyers in the aluminum lane comparing capability and price across <a href="/pages/es-windows-florida.html">ES</a>, <a href="/pages/cgi-impact-windows-florida.html">CGI</a> and MR Glass are exactly who this brand courts, frequently winning on value for standard residential openings while the tower-scale jumbo work tilts toward ES.</p>
<h2 ${H2}>MR Glass at a Glance</h2>
<table class="data-table"><tr><th>Consideration</th><th>MR Glass Position</th></tr>
<tr><td>Made in</td><td>Miami, Florida</td></tr>
<tr><td>HVHZ approvals</td><td>Yes, on qualifying lines (Miami-Dade NOA)</td></tr>
<tr><td>Material focus</td><td>Aluminum windows and doors</td></tr>
<tr><td>Sweet spot</td><td>Residential aluminum at sharp value; sliders and doors</td></tr>
<tr><td>Main rivals</td><td>ES Windows, CGI, Eco Window Systems</td></tr></table>
<h2 ${H2}>Insurance and Grant Fundamentals</h2>
<p>Approved is approved: MR Glass installations unlock the same wind mitigation credits, up to 35% off the windstorm portion of your premium via a <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a>, and the same <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a> eligibility ($2 matched per $1, up to $10,000) as any national brand. Your protection and your savings ride on approvals and installation quality, not marketing budgets.</p>
<h2 ${H2}>Get MR Glass on Your Quote Sheet</h2>
<p>A licensed estimator visits within 48 hours, measures your openings, and prices MR Glass against the aluminum field for your actual project, insurance savings and grant numbers included. Local steel, honest arithmetic.</p>`,
  related: [['ES Windows Review','/pages/es-windows-florida.html'],['CGI Impact Windows','/pages/cgi-impact-windows-florida.html'],['Eco Window Systems','/pages/eco-window-systems-florida.html'],['Best Brands 2026','/pages/best-impact-window-brands-florida-2026.html']].concat(COMMON_RELATED),
},
{
  slug: 'eco-window-systems-florida',
  crumb: 'Eco Window Systems',
  title: 'Eco Window Systems Florida 2026 | Impact Windows Review &amp; Guide',
  desc: 'Eco Window Systems impact windows for Florida: the Medley-based aluminum manufacturer\'s lines, HVHZ approvals, condo and multifamily strength, and how Eco compares.',
  h1: 'Eco Window Systems: The Volume Builder&apos;s Favorite',
  faqs: [
    {q:'Who is Eco Window Systems?', a:'Eco Window Systems is a South Florida manufacturer (based in the Medley/Miami industrial corridor) producing aluminum impact windows and doors, with HVHZ Notices of Acceptance on qualifying lines and a strong footprint in condo, multifamily and volume residential work.'},
    {q:'Are Eco windows good for single-family homes?', a:'Yes. The same aluminum lines that glaze condo towers serve single-family projects well, particularly sliders, horizontal rollers, single-hungs and fixed lites, typically at competitive value pricing in the aluminum category.'},
    {q:'Why do condo associations often choose Eco?', a:'Volume capability, consistent lead times, HVHZ approvals and value pricing make Eco a frequent winner in association-wide replacement bids, and that same combination benefits individual owners matching building standards.'},
    {q:'How does Eco compare to ES and MR Glass?', a:'All three are South Florida aluminum manufacturers with HVHZ approvals. ES leads jumbo and custom work, MR Glass competes on local value, and Eco\'s edge is volume consistency and multifamily pedigree. Quotes for your actual openings settle most projects.'},
  ],
  body: `<p>Look at the replacement projects running across South Florida's condo canyons and one name keeps appearing on the shop drawings: Eco Window Systems. The Medley-based manufacturer built its reputation delivering aluminum impact windows and doors at building scale, association bids, multifamily programs, volume residential, and that pedigree now makes it a fixture on single-family short lists too. Here is where Eco fits and how it compares.</p>
<div class="callout"><p><strong>Brand guides from Florida Impact Shield:</strong> installer-neutral and numbers-first. We quote Eco where it suits your project, beside ES, MR Glass, CGI and PGT, and let your openings pick the brand.</p></div>
<h2 ${H2}>Built for Building Scale</h2>
<p>Eco's core competence is consistency at volume: qualifying lines carry Miami-Dade HVHZ Notices of Acceptance, production is engineered for the repeat precision association projects demand, and lead-time reliability has made the brand a bid-sheet regular for property managers. For our <a href="/pages/impact-windows-for-condos-florida.html">condo clients</a>, matching an association's approved product often means matching Eco, and individual owners upgrading units inherit the same approvals and aesthetics the building standardized on.</p>
<h2 ${H2}>The Single-Family Case</h2>
<p>The same catalog serves houses: aluminum sliders and horizontal rollers, single-hungs, fixed lites and door systems in the clean profiles South Florida favors, generally priced at sharp value within the aluminum category. Buyers comparing the aluminum field, <a href="/pages/es-windows-florida.html">ES</a> for jumbo capability, <a href="/pages/mr-glass-windows-florida.html">MR Glass</a> for local value, <a href="/pages/cgi-impact-windows-florida.html">CGI</a> for its Sentinel pedigree, find Eco competing hardest where openings are standard and count is high, exactly where volume DNA pays.</p>
<h2 ${H2}>Eco at a Glance</h2>
<table class="data-table"><tr><th>Consideration</th><th>Eco Position</th></tr>
<tr><td>Made in</td><td>Medley (Miami), Florida</td></tr>
<tr><td>HVHZ approvals</td><td>Yes, on qualifying lines (Miami-Dade NOA)</td></tr>
<tr><td>Material focus</td><td>Aluminum windows and doors</td></tr>
<tr><td>Sweet spot</td><td>Condo/multifamily programs; high-count residential at value</td></tr>
<tr><td>Main rivals</td><td>ES Windows, MR Glass, CGI</td></tr></table>
<h2 ${H2}>Insurance and Grant Fundamentals</h2>
<p>Eco installations unlock the standard financial stack: wind mitigation credits up to 35% on the windstorm portion of your premium, documented via a <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a>, and <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a> eligibility at $2 matched per $1 up to $10,000. For condo owners, the insurance conversation runs through the association's master policy and your HO-6, a nuance our <a href="/pages/impact-windows-for-condos-florida.html">condo guide</a> unpacks.</p>
<h2 ${H2}>Get Eco Quoted for Your Project</h2>
<p>A licensed estimator visits within 48 hours, whether it is a single-family home or a unit matching building standards, and prices Eco against the field with insurance and grant numbers attached. Volume pedigree, personal arithmetic.</p>`,
  related: [['Impact Windows for Condos','/pages/impact-windows-for-condos-florida.html'],['ES Windows Review','/pages/es-windows-florida.html'],['MR Glass Review','/pages/mr-glass-windows-florida.html'],['CGI Impact Windows','/pages/cgi-impact-windows-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'lawson-windows-florida',
  crumb: 'Lawson Windows',
  title: 'Lawson Industries Impact Windows Florida 2026 | Review &amp; Guide',
  desc: 'Lawson Industries impact windows for Florida: the Hialeah manufacturer\'s aluminum and vinyl lines, HVHZ approvals, value position, and how Lawson compares to the field.',
  h1: 'Lawson Industries: The Hialeah Veteran of Impact Glass',
  faqs: [
    {q:'Who is Lawson Industries?', a:'Lawson Industries is a long-established Hialeah, Florida window and door manufacturer producing aluminum and vinyl impact products, with Miami-Dade HVHZ Notices of Acceptance on qualifying lines and decades of South Florida manufacturing history.'},
    {q:'Does Lawson make vinyl impact windows?', a:'Yes, Lawson is notable among South Florida manufacturers for producing both aluminum and vinyl impact lines, giving buyers a local option in the vinyl category that PGT typically dominates.'},
    {q:'Are Lawson windows a good value?', a:'Lawson competes on value pricing with local manufacturing advantages, sensible lead times, local service, competitive quotes, particularly on standard residential openings. As always, specific lines and installation quality decide real-world outcomes.'},
    {q:'How does Lawson compare to PGT and the aluminum brands?', a:'Against PGT, Lawson offers a local vinyl alternative at sharp pricing; against the aluminum field (ES, MR Glass, Eco), Lawson competes as the veteran generalist with both materials in-house. Quotes for your actual openings are the honest referee.'},
  ],
  body: `<p>Before impact windows were an industry, they were a South Florida necessity, and Lawson Industries was already building windows in Hialeah. The veteran manufacturer brings something uncommon to the local field: both aluminum and vinyl impact lines under one Florida roof, HVHZ approvals on qualifying products, and the value pricing of a factory that never had to ship across the country. Here is where Lawson fits in the 2026 brand landscape.</p>
<div class="callout"><p><strong>Brand guides from Florida Impact Shield:</strong> installer-neutral, numbers-first. We quote Lawson where its catalog fits, beside PGT, ES, CGI, MR Glass and Eco, and let your quote sheet crown the winner.</p></div>
<h2 ${H2}>The Two-Material Local</h2>
<p>Most South Florida manufacturers pick a lane, aluminum, overwhelmingly. Lawson runs both: aluminum single-hungs, rollers, sliders and doors in the regional idiom, plus vinyl impact lines that give buyers a locally made alternative in the category <a href="/pages/pgt-impact-windows-florida.html">PGT</a> built its empire on. For value-focused replacements, standard openings, sensible glass packages, that combination frequently produces the sharpest quote on the table, with local service standing behind it.</p>
<h2 ${H2}>Where Lawson Wins Projects</h2>
<p>The field patterns: whole-home replacements on classic Florida ranches where per-opening value compounds across fifteen windows; landlords and <a href="/pages/impact-windows-rental-property-florida.html">rental-property owners</a> hardening portfolios on disciplined budgets; and buyers who simply prefer a Florida-made product with a factory they can drive to. Buyers chasing jumbo glass walls or designer aesthetics usually land with <a href="/pages/es-windows-florida.html">ES</a> or premium lines, different tools, different jobs, which is the entire point of quoting the field.</p>
<h2 ${H2}>Lawson at a Glance</h2>
<table class="data-table"><tr><th>Consideration</th><th>Lawson Position</th></tr>
<tr><td>Made in</td><td>Hialeah, Florida (decades established)</td></tr>
<tr><td>HVHZ approvals</td><td>Yes, on qualifying lines (Miami-Dade NOA)</td></tr>
<tr><td>Material focus</td><td>Both aluminum and vinyl</td></tr>
<tr><td>Sweet spot</td><td>Value replacements; local vinyl alternative</td></tr>
<tr><td>Main rivals</td><td>PGT (vinyl); ES, MR Glass, Eco (aluminum)</td></tr></table>
<h2 ${H2}>Insurance and Grant Fundamentals</h2>
<p>Approved Lawson installations deliver the standard financial stack: wind mitigation credits up to 35% on the windstorm portion of your homeowners premium via a <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a>, and <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a> eligibility, $2 matched per $1 up to $10,000. Value pricing plus grant matching is how budget-minded Florida families reach full protection sooner than they expected.</p>
<h2 ${H2}>Get Lawson on Your Quote Sheet</h2>
<p>A licensed estimator visits within 48 hours, measures your openings, and prices Lawson against the field with your insurance savings and grant eligibility calculated. The veteran versus the majors, refereed by arithmetic at your kitchen table.</p>`,
  related: [['PGT Impact Windows','/pages/pgt-impact-windows-florida.html'],['MR Glass Review','/pages/mr-glass-windows-florida.html'],['Eco Window Systems','/pages/eco-window-systems-florida.html'],['Rental Property Guide','/pages/impact-windows-rental-property-florida.html']].concat(COMMON_RELATED),
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
