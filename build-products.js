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
  slug: 'impact-french-doors-florida',
  crumb: 'Impact French Doors',
  title: 'Impact French Doors Florida | Hurricane-Rated French Doors &amp; Cost',
  desc: 'Hurricane impact French doors for Florida homes: single and double French styles, HVHZ-approved options, 2026 installed costs, insurance savings, and MSFH grant eligibility.',
  h1: 'Impact French Doors in Florida: Hurricane-Rated Elegance',
  faqs: [
    {q:'How much do impact French doors cost in Florida?', a:'Most hurricane-rated French door installations in Florida run between $4,500 and $8,500 for a double (two-panel) unit installed, depending on size, glass package, and hardware. Single French doors typically run $2,800 to $5,000 installed. A Florida Impact Shield estimator provides an exact quote within 48 hours.'},
    {q:'Are impact French doors as strong as regular impact doors?', a:'Yes. Impact French doors carry the same large-missile impact ratings and design pressures as other impact doors, and HVHZ-approved units meet Miami-Dade product approval, the toughest standard in the nation. The classic look conceals laminated glass and reinforced frames engineered for hurricane-force winds.'},
    {q:'Do impact French doors qualify for insurance discounts?', a:'Yes. When all your openings are protected with impact-rated products, including French doors, you qualify for wind mitigation credits that can reduce homeowners insurance premiums by up to 35% on the windstorm portion of your policy.'},
    {q:'Can I use My Safe Florida Home grant money for impact French doors?', a:'Yes. Exterior door replacement with impact-rated doors is an approved hurricane-hardening improvement under the My Safe Florida Home program, which matches $2 for every $1 you spend up to $10,000. Florida Impact Shield is an approved contractor and can guide your application.'},
  ],
  body: `<p>French doors are one of the most requested upgrades in Florida homes, and the modern impact-rated versions mean you no longer choose between elegance and hurricane protection. Today's impact French doors pair the classic divided-glass look with laminated impact glass and reinforced frames that meet the Florida Building Code, including High-Velocity Hurricane Zone (HVHZ) approvals for Miami-Dade and Broward. Florida Impact Shield installs impact French doors across the state, handling design selection, permitting, installation, and every insurance credit you qualify for.</p>
<div class="callout"><p><strong>Impact French Doors from Florida Impact Shield:</strong> Hurricane-rated single and double French doors that meet Florida Building Code and Miami-Dade approvals, qualify for wind mitigation insurance discounts, and are eligible for My Safe Florida Home grant funding.</p></div>
<h2 ${'$'}{'H2'}>Styles That Fit Florida Homes</h2>
<p>The impact French door family covers every configuration Florida homeowners ask for: classic double (two-panel) swing doors opening to patios and pool decks, single French doors for side entries, French doors with sidelites and transoms for grand entrances, and sliding French-style doors that deliver the divided-light look on a space-saving track. Grid patterns (colonial, prairie, or clean no-grid modern) are laminated between the glass on most product lines, which means no cleaning around muntins and no grids to loosen over time.</p>
<h2 ${'$'}{'H2'}>Built for Hurricane Country</h2>
<p>Every impact French door we install carries large-missile impact certification and design pressures matched to your home's engineering requirements. In Miami-Dade and Broward, products carry Notices of Acceptance (NOA) under the HVHZ rules, the strictest product approvals in the country. Laminated glass holds together even when struck, keeping wind and water out of your home and preventing the pressurization that causes catastrophic roof failure. Unlike shutters over ordinary French doors, impact units are always on duty with zero setup when a storm approaches.</p>
<h2 ${'$'}{'H2'}>What Impact French Doors Cost in 2026</h2>
<table class="data-table"><tr><th>Configuration</th><th>Typical Installed Range</th></tr>
<tr><td>Single French door</td><td>$2,800 - $5,000</td></tr>
<tr><td>Double French door (2 panels)</td><td>$4,500 - $8,500</td></tr>
<tr><td>French door + sidelites/transom</td><td>$6,500 - $12,000+</td></tr>
<tr><td>Sliding French-style door</td><td>$4,000 - $8,000</td></tr></table>
<p>Final pricing depends on size, glass package (Low-E, laminated-insulated), hardware grade, and structural conditions. Every Florida Impact Shield quote itemizes the door, installation, permits, and your projected insurance savings so you see the true net cost. See our <a href="/pages/how-much-do-impact-windows-cost-florida.html">full cost guide</a> and <a href="/pages/financing.html">0% financing options</a>.</p>
<h2 ${'$'}{'H2'}>Insurance Savings and Grant Money</h2>
<p>Impact French doors count toward the full opening protection that unlocks wind mitigation credits worth up to 35% off the windstorm portion of your homeowners insurance. They are also an approved improvement under the <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home program</a>, which matches $2 for every $1 you spend up to $10,000. Many Florida families effectively fund their French door upgrade with grant dollars and recover the balance through insurance savings within a few years.</p>
<h2 ${'$'}{'H2'}>Get Your Free French Door Quote</h2>
<p>A licensed estimator visits your home within 48 hours, measures your openings, walks you through door styles and glass options, and delivers an exact price with your projected insurance savings and grant eligibility. Know everything before spending a dollar.</p>`,
  related: [['Impact Entry Doors','/pages/impact-entry-doors-florida.html'],['Impact Patio Doors','/pages/impact-patio-doors-florida.html'],['Sliding Glass Doors','/pages/sliding-glass-doors.html'],['Impact Doors Overview','/pages/impact-doors.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-entry-doors-florida',
  crumb: 'Impact Entry Doors',
  title: 'Impact Front Entry Doors Florida | Hurricane-Proof Front Doors 2026',
  desc: 'Hurricane impact front entry doors for Florida: fiberglass and glass designs, HVHZ approvals, 2026 installed costs, insurance discounts and My Safe Florida Home grant funding.',
  h1: 'Impact Front Entry Doors: First Impressions, Fortress Strength',
  faqs: [
    {q:'How much does an impact front door cost in Florida?', a:'Most hurricane-rated entry doors in Florida run $3,500 to $7,000 installed for a single door, and $6,000 to $12,000+ for double doors or doors with sidelites and transoms, depending on material, glass design, and hardware. Your exact quote arrives within 48 hours of a free in-home visit.'},
    {q:'Are impact entry doors available with decorative glass?', a:'Yes. Modern impact entry doors offer decorative laminated glass designs, from full-lite modern looks to traditional ornamental patterns, all carrying large-missile impact ratings. You do not sacrifice curb appeal for protection.'},
    {q:'Do impact front doors help with insurance?', a:'Yes. Your front door is an opening, and insurers require all openings protected to award full wind mitigation credits. Replacing a standard entry door with an impact-rated unit closes that gap and helps unlock discounts of up to 35% on the windstorm portion of your premium.'},
    {q:'Is an impact front door better than a hurricane panel over my door?', a:'Yes. Impact doors provide permanent, always-on protection with no panels to install, plus everyday benefits: security against forced entry, noise reduction, and energy efficiency. Panels protect only when someone is home to mount them before a storm.'},
  ],
  body: `<p>Your front door is the handshake of your home and, in a hurricane, one of its most vulnerable openings. Impact-rated entry doors solve both jobs at once: architectural presence on the street, laminated glass and engineered cores behind it. Florida Impact Shield installs hurricane-rated front doors across Florida in fiberglass, steel, and aluminum-glass designs, all meeting Florida Building Code and available with Miami-Dade HVHZ approvals.</p>
<div class="callout"><p><strong>Impact Entry Doors from Florida Impact Shield:</strong> Hurricane-rated front doors in modern and traditional designs that meet the toughest Florida approvals, strengthen your insurance position, and qualify for My Safe Florida Home grant funding.</p></div>
<h2 ${'$'}{'H2'}>Design Without Compromise</h2>
<p>The modern impact entry catalog runs from clean contemporary pivot-style doors with full laminated glass to classic raised-panel fiberglass with decorative glass inserts, double-door estate entries, and configurations with sidelites and transoms. Decorative glass is laminated to impact standards, so ornamental does not mean vulnerable. Finishes include factory paint and stain systems engineered for Florida sun and salt air.</p>
<h2 ${'$'}{'H2'}>Engineered for the Worst Day of the Year</h2>
<p>Impact entry doors carry large-missile impact ratings and design pressures matched to your home, with multi-point locking systems that anchor the door to the frame at several locations. In the High-Velocity Hurricane Zone, products carry Miami-Dade NOAs. The same construction that shrugs off hurricane debris also resists forced entry: laminated glass will not shatter open for a burglar, and reinforced frames defeat kick-ins, an everyday benefit our <a href="/pages/impact-windows-home-security.html">home security guide</a> covers in depth.</p>
<h2 ${'$'}{'H2'}>2026 Cost Ranges</h2>
<table class="data-table"><tr><th>Configuration</th><th>Typical Installed Range</th></tr>
<tr><td>Single impact entry door</td><td>$3,500 - $7,000</td></tr>
<tr><td>Entry door with sidelites</td><td>$5,500 - $10,000</td></tr>
<tr><td>Double entry doors</td><td>$6,000 - $12,000+</td></tr></table>
<p>Pricing depends on material, glass design, hardware, and structural work at the opening. Every quote itemizes product, installation, and permits alongside your projected insurance savings, and <a href="/pages/financing.html">0% financing</a> is available.</p>
<h2 ${'$'}{'H2'}>The Insurance and Grant Angle</h2>
<p>Insurers award full wind mitigation credits only when all openings are protected, and a standard front door is the gap that costs many Florida homeowners their discount. Replacing it with an impact-rated door completes the envelope, supporting savings of up to 35% on the windstorm portion of your premium, documented through a <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a>. Entry doors are also approved improvements under the <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a>, with $2 matched for every $1 you spend up to $10,000.</p>
<h2 ${'$'}{'H2'}>Get Your Free Entry Door Quote</h2>
<p>A licensed estimator visits within 48 hours with design samples, measures your opening, and delivers an exact installed price plus your insurance and grant picture. Your best first impression, engineered for the worst weather.</p>`,
  related: [['Impact French Doors','/pages/impact-french-doors-florida.html'],['Impact Doors Overview','/pages/impact-doors.html'],['Home Security Benefits','/pages/impact-windows-home-security.html'],['Wind Mitigation Inspections','/pages/wind-mitigation-inspection.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-casement-windows-florida',
  crumb: 'Impact Casement Windows',
  title: 'Impact Casement Windows Florida | Crank-Out Hurricane Windows 2026',
  desc: 'Impact casement windows for Florida homes: superior wind performance, unobstructed views, 2026 costs, energy efficiency, insurance savings and grant eligibility.',
  h1: 'Impact Casement Windows: The Performance Champion',
  faqs: [
    {q:'How much do impact casement windows cost in Florida?', a:'Most impact casement windows in Florida run $900 to $1,600 per window installed, depending on size, glass package, and frame material. Casements typically price slightly above single-hung windows of similar size because of their hardware and sealing systems. Exact quotes arrive within 48 hours of a free in-home visit.'},
    {q:'Why do casement windows perform so well in hurricanes?', a:'When wind pushes against a closed casement, it presses the sash tighter against the compression seals, so casements routinely achieve the highest design-pressure ratings and best air-and-water infiltration numbers in a product line. It is the geometry working in your favor.'},
    {q:'Are impact casements good for ventilation?', a:'Excellent. The full sash opens outward and can scoop passing breezes into the home, delivering more airflow than a half-opening hung window of the same size, a genuine advantage in Florida\'s shoulder seasons.'},
    {q:'Do impact casement windows qualify for insurance discounts and grants?', a:'Yes. Impact-rated casements count toward full opening protection for wind mitigation credits of up to 35% on the windstorm portion of your insurance, and they are approved improvements under the My Safe Florida Home grant program.'},
  ],
  body: `<p>Ask window engineers which style performs best under hurricane pressure and the answer is consistent: the casement. Hinged at the side and cranking outward, a casement uses wind pressure to seal itself tighter, which is why casements routinely post the highest design pressures and the best air and water infiltration numbers in any product family. Florida Impact Shield installs impact casement windows statewide, from HVHZ-approved lines in Miami-Dade to energy-optimized packages for every Florida climate zone.</p>
<div class="callout"><p><strong>Impact Casement Windows from Florida Impact Shield:</strong> The best-sealing window style in hurricane country, with unobstructed glass, top efficiency numbers, insurance credit eligibility, and My Safe Florida Home grant approval.</p></div>
<h2 ${'$'}{'H2'}>Why Florida Homes Choose Casements</h2>
<p>Beyond raw performance, casements deliver the cleanest view in the catalog: no meeting rail across the middle, just a single pane of laminated glass framed slim. They ventilate brilliantly, catching breezes a hung window misses. They excel over kitchen sinks and in hard-to-reach spots where a crank beats a lift. And their compression seals make them the quietest and most efficient operating style, cutting street noise and cooling costs together, benefits our <a href="/pages/impact-windows-noise-reduction-florida.html">noise reduction</a> and <a href="/pages/impact-windows-energy-savings-florida.html">energy savings</a> guides quantify.</p>
<h2 ${'$'}{'H2'}>Hurricane Performance by Design</h2>
<p>Impact casements pair laminated glass with multi-point locking systems that clamp the sash at several points around the frame. Under storm pressure the sash presses into its seals rather than away from them, the geometric advantage that produces class-leading design pressure ratings. HVHZ-approved casements carry Miami-Dade NOAs, and every installation we perform is engineered to your home's wind zone and permitted accordingly.</p>
<h2 ${'$'}{'H2'}>2026 Cost Picture</h2>
<table class="data-table"><tr><th>Project Scope</th><th>Typical Installed Range</th></tr>
<tr><td>Per casement window</td><td>$900 - $1,600</td></tr>
<tr><td>Casement picture-window combos</td><td>$1,800 - $3,500</td></tr>
<tr><td>Whole-home (varies by count)</td><td>Quoted per opening</td></tr></table>
<p>Casements price modestly above hung windows for their hardware and sealing systems, and repay the difference in efficiency and longevity. Every quote itemizes windows, installation, and permits against your projected <a href="/pages/hurricane-windows-insurance-savings.html">insurance savings</a>.</p>
<h2 ${'$'}{'H2'}>Insurance Credits and Grant Funding</h2>
<p>Impact casements count toward the full opening protection that unlocks wind mitigation discounts of up to 35% on the windstorm portion of your premium, and they are approved under the <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home program</a>, which matches $2 for every $1 spent up to $10,000. Between grant dollars and premium savings, the performance champion often costs less than homeowners expect.</p>
<h2 ${'$'}{'H2'}>Get Your Free Casement Quote</h2>
<p>A licensed estimator visits within 48 hours, assesses your openings, and prices your project exactly, insurance savings and grant eligibility included. See why engineers pick casements, and what yours would cost.</p>`,
  related: [['Impact Awning Windows','/pages/impact-awning-windows-florida.html'],['Impact Picture Windows','/pages/impact-picture-windows-florida.html'],['Impact Double-Hung Windows','/pages/impact-double-hung-windows-florida.html'],['Noise Reduction Guide','/pages/impact-windows-noise-reduction-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-double-hung-windows-florida',
  crumb: 'Impact Double-Hung Windows',
  title: 'Impact Double-Hung Windows Florida | Classic Style, Hurricane Strength',
  desc: 'Impact double-hung windows for Florida: both sashes open, easy cleaning, colonial grid options, 2026 installed costs, insurance discounts and MSFH grant eligibility.',
  h1: 'Impact Double-Hung Windows: The Classic, Armored',
  faqs: [
    {q:'How much do impact double-hung windows cost in Florida?', a:'Most impact double-hung windows in Florida run $850 to $1,500 per window installed depending on size, glass package, and grid options. Whole-home projects are quoted per opening with permits and installation itemized. A free in-home estimate delivers your exact price within 48 hours.'},
    {q:'What is the difference between single-hung and double-hung impact windows?', a:'In a single-hung, only the bottom sash moves; in a double-hung, both sashes operate. Double-hungs cost slightly more but allow top-down ventilation (safer with children and pets) and both sashes typically tilt inward for cleaning from inside your home.'},
    {q:'Can impact double-hungs look like my home\'s original colonial windows?', a:'Yes. Grids-between-glass colonial patterns replicate the traditional divided-light look with none of the maintenance, and frame colors and profiles are available to match historic and HOA aesthetics across Florida neighborhoods.'},
    {q:'Do double-hung impact windows qualify for insurance savings?', a:'Yes. Impact-rated double-hungs count toward full opening protection, supporting wind mitigation credits of up to 35% on the windstorm portion of your homeowners insurance, and they are approved for My Safe Florida Home grant funding.'},
  ],
  body: `<p>The double-hung is America's window, and Florida's impact-rated version keeps everything homeowners love about the classic, both sashes operating, tilt-in cleaning, colonial grid charm, while adding laminated glass and reinforced frames built for hurricane country. Florida Impact Shield installs impact double-hungs statewide, matching historic looks for older neighborhoods and clean modern profiles for new construction alike.</p>
<div class="callout"><p><strong>Impact Double-Hung Windows from Florida Impact Shield:</strong> The traditional two-sash style with full hurricane ratings, tilt-in convenience, insurance credit eligibility, and My Safe Florida Home grant approval.</p></div>
<h2 ${'$'}{'H2'}>Why Homeowners Love the Double-Hung</h2>
<p>Two operating sashes mean ventilation your way: open the top sash to exhaust warm air near the ceiling while keeping the bottom closed, a meaningful safety advantage in homes with children and pets. Tilt-in sashes let you clean exterior glass from inside, no ladders on the second story. And the style itself is the most versatile in the catalog, at home on 1950s ranches, Key West cottages, and brand-new builds, with grids-between-glass patterns that recreate divided-light tradition maintenance-free.</p>
<h2 ${'$'}{'H2'}>Hurricane Engineering Inside a Classic</h2>
<p>Impact double-hungs pair laminated glass in both sashes with reinforced meeting rails and robust locking hardware, achieving design pressures suited to Florida wind zones, with HVHZ-approved lines carrying Miami-Dade NOAs for the state's toughest jurisdictions. The laminated glass that stops flying debris also deters break-ins and cuts outside noise, everyday benefits detailed in our <a href="/pages/impact-windows-home-security.html">security</a> and <a href="/pages/impact-windows-noise-reduction-florida.html">noise</a> guides.</p>
<h2 ${'$'}{'H2'}>2026 Cost Ranges</h2>
<table class="data-table"><tr><th>Project Scope</th><th>Typical Installed Range</th></tr>
<tr><td>Per double-hung window</td><td>$850 - $1,500</td></tr>
<tr><td>Oversized / grid packages</td><td>$1,200 - $2,000</td></tr>
<tr><td>Whole-home replacement</td><td>Quoted per opening</td></tr></table>
<p>Double-hungs typically price a step above single-hungs for the second operating sash. Every Florida Impact Shield quote itemizes windows, installation, and permits, with <a href="/pages/financing.html">0% financing</a> available and your projected insurance savings calculated up front.</p>
<h2 ${'$'}{'H2'}>Insurance Credits and Grant Dollars</h2>
<p>Impact double-hungs count toward the full opening protection that unlocks wind mitigation credits of up to 35% on the windstorm portion of your premium, documented via a <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a>. They are also approved improvements under the <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a>, matching $2 for every $1 you spend up to $10,000, a combination that materially shrinks the true cost of going impact.</p>
<h2 ${'$'}{'H2'}>Get Your Free Double-Hung Quote</h2>
<p>A licensed estimator visits within 48 hours, measures every opening, and delivers exact pricing with your insurance and grant picture included. Classic looks, armored glass, honest numbers.</p>`,
  related: [['Impact Casement Windows','/pages/impact-casement-windows-florida.html'],['Impact Picture Windows','/pages/impact-picture-windows-florida.html'],['Impact Awning Windows','/pages/impact-awning-windows-florida.html'],['Home Security Benefits','/pages/impact-windows-home-security.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-awning-windows-florida',
  crumb: 'Impact Awning Windows',
  title: 'Impact Awning Windows Florida | Rain-Proof Ventilation, Hurricane Rated',
  desc: 'Impact awning windows for Florida: ventilate even during rain, top-hinged design, ideal over doors and in bathrooms, 2026 costs, insurance and grant eligibility.',
  h1: 'Impact Awning Windows: Ventilation Even in the Rain',
  faqs: [
    {q:'How much do impact awning windows cost in Florida?', a:'Most impact awning windows in Florida run $700 to $1,300 per window installed depending on size and glass package. They are often installed in combinations with picture windows, quoted per opening. A free in-home estimate provides your exact price within 48 hours.'},
    {q:'What makes awning windows good for Florida weather?', a:'The top-hinged, outward-tilting sash creates an awning over its own opening, so you can ventilate during Florida\'s daily summer showers without rain entering, something no hung or sliding window can do.'},
    {q:'Where do awning windows work best?', a:'High on walls for privacy with light (bathrooms, hallways), above or below picture windows in combinations, over kitchen counters, and anywhere you want airflow with weather protection. Their compact sizes also fit openings other styles cannot.'},
    {q:'Are impact awnings eligible for insurance discounts and grants?', a:'Yes. Impact-rated awning windows count toward full opening protection for wind mitigation credits of up to 35% on the windstorm portion of your insurance, and they qualify under the My Safe Florida Home grant program.'},
  ],
  body: `<p>Florida's afternoon rain is legendary, and the awning window is the style built for it: hinged at the top and tilting outward, the open sash forms a canopy over its own opening, letting breeze in while rain sheds off the glass. Impact-rated awnings add laminated glass and compression seals to that clever geometry, and like their casement cousins they seal tighter as wind pushes against them. Florida Impact Shield installs impact awnings statewide, standalone and in the picture-window combinations Florida architecture loves.</p>
<div class="callout"><p><strong>Impact Awning Windows from Florida Impact Shield:</strong> Rain-smart ventilation with hurricane-grade laminated glass, compression sealing, insurance credit eligibility, and My Safe Florida Home grant approval.</p></div>
<h2 ${'$'}{'H2'}>Where Awnings Shine</h2>
<p>Awnings excel where other styles compromise: mounted high on bathroom and hallway walls for daylight and airflow with total privacy; stacked beneath or above fixed picture windows to add ventilation to a view wall; over kitchen counters where a crank beats wrestling a sash; and in compact openings where hung windows will not fit. Their scale also makes them one of the most affordable impact styles per opening, a quiet advantage in whole-home projects.</p>
<h2 ${'$'}{'H2'}>The Compression-Seal Advantage</h2>
<p>Like casements, awnings close against compression seals, so storm pressure presses the sash tighter rather than prying it open, yielding excellent design pressures and air-water infiltration numbers. Laminated impact glass handles the debris, multi-point locks anchor the sash, and HVHZ-approved lines carry Miami-Dade NOAs for the state's strictest jurisdictions. The result: ventilation architecture that never becomes a weak point.</p>
<h2 ${'$'}{'H2'}>2026 Cost Ranges</h2>
<table class="data-table"><tr><th>Project Scope</th><th>Typical Installed Range</th></tr>
<tr><td>Per awning window</td><td>$700 - $1,300</td></tr>
<tr><td>Awning + picture combinations</td><td>$1,600 - $3,200</td></tr>
<tr><td>Whole-home projects</td><td>Quoted per opening</td></tr></table>
<p>Every quote itemizes product, installation, and permits, calculates your projected <a href="/pages/hurricane-windows-insurance-savings.html">insurance savings</a>, and lays out <a href="/pages/financing.html">0% financing</a> options.</p>
<h2 ${'$'}{'H2'}>Insurance and Grant Eligibility</h2>
<p>Impact awnings count toward the complete opening protection that unlocks wind mitigation credits of up to 35% on the windstorm portion of your premium, and they are approved improvements under the <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a>, $2 matched for every $1 spent up to $10,000. Smart ventilation that pays for itself twice.</p>
<h2 ${'$'}{'H2'}>Get Your Free Awning Window Quote</h2>
<p>A licensed estimator visits within 48 hours, maps where awnings make sense in your home, and delivers exact pricing with insurance and grant numbers attached. Ventilation for the Florida rain, engineered for the Florida storm.</p>`,
  related: [['Impact Casement Windows','/pages/impact-casement-windows-florida.html'],['Impact Picture Windows','/pages/impact-picture-windows-florida.html'],['Impact Double-Hung Windows','/pages/impact-double-hung-windows-florida.html'],['Energy Savings Guide','/pages/impact-windows-energy-savings-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-picture-windows-florida',
  crumb: 'Impact Picture Windows',
  title: 'Impact Picture Windows Florida | Fixed Hurricane Windows &amp; View Walls',
  desc: 'Impact picture windows for Florida: maximum glass, maximum strength, view walls and combinations, oversized options, 2026 costs, insurance and grant eligibility.',
  h1: 'Impact Picture Windows: The View, Fortified',
  faqs: [
    {q:'How much do impact picture windows cost in Florida?', a:'Standard impact picture windows run $800 to $2,500 installed depending on size, with oversized and mulled view-wall configurations quoted per project. Because they have no operating hardware, picture windows often deliver the most glass per dollar in the impact catalog.'},
    {q:'Are fixed windows stronger than operating windows?', a:'Generally yes. With no moving sash, picture windows achieve the highest design pressures in most product lines and are the go-to choice for oversized openings and high floors where wind loads are greatest.'},
    {q:'How big can an impact picture window be?', a:'Very large. Manufacturers offer oversized fixed units, and multiple units can be structurally mulled into dramatic view walls. Maximum sizes depend on the product line, wind zone, and engineering, which our estimators confirm for your specific opening.'},
    {q:'Do impact picture windows qualify for insurance discounts and grants?', a:'Yes. Impact-rated fixed glass counts toward complete opening protection for wind mitigation credits of up to 35% on the windstorm portion of your insurance, and picture windows are approved under the My Safe Florida Home grant program.'},
  ],
  body: `<p>Florida living is built around the view, the water, the golf course, the mangroves, and the picture window is how homes drink it in. Impact-rated picture windows deliver that glass without the vulnerability: fixed, laminated, and structurally simple, they post the highest design pressures in most product families and anchor the dramatic view walls modern Florida architecture demands. Florida Impact Shield installs impact picture windows statewide, from single fixed units to engineered mulled walls of glass.</p>
<div class="callout"><p><strong>Impact Picture Windows from Florida Impact Shield:</strong> Maximum glass with maximum strength, oversized and view-wall capable, insurance credit eligible, and approved for My Safe Florida Home grant funding.</p></div>
<h2 ${'$'}{'H2'}>Strength Through Simplicity</h2>
<p>No moving parts means nothing to flex: a fixed frame gripping laminated glass on all four sides achieves design pressures operating windows cannot match, which is why picture windows carry the biggest openings, the highest floors, and the most exposed elevations. In the High-Velocity Hurricane Zone, approved lines carry Miami-Dade NOAs, and every oversized or mulled configuration we install is engineered and permitted to your home's wind loads.</p>
<h2 ${'$'}{'H2'}>Designing With Fixed Glass</h2>
<p>Picture windows rarely work alone. The classic Florida play pairs a large fixed center with operating flankers, <a href="/pages/impact-casement-windows-florida.html">casements</a> or <a href="/pages/impact-awning-windows-florida.html">awnings</a>, for ventilation, or stacks awnings beneath a view unit so breeze arrives without interrupting the sightline. Grids, tints, and Low-E packages tune the look and the heat gain; laminated-insulated glass options cut cooling costs on west-facing walls, numbers our <a href="/pages/impact-windows-energy-savings-florida.html">energy guide</a> details.</p>
<h2 ${'$'}{'H2'}>2026 Cost Ranges</h2>
<table class="data-table"><tr><th>Project Scope</th><th>Typical Installed Range</th></tr>
<tr><td>Standard picture window</td><td>$800 - $2,500</td></tr>
<tr><td>Oversized fixed units</td><td>$2,500 - $6,000+</td></tr>
<tr><td>Mulled view walls</td><td>Engineered, quoted per project</td></tr></table>
<p>Fixed units often deliver the most glass per dollar in the catalog. Quotes itemize product, installation, engineering where required, and permits, with your projected <a href="/pages/hurricane-windows-insurance-savings.html">insurance savings</a> calculated alongside.</p>
<h2 ${'$'}{'H2'}>Insurance and Grant Position</h2>
<p>Impact picture windows count toward the complete opening protection behind wind mitigation credits worth up to 35% on the windstorm portion of your premium, and they qualify under the <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home program</a>, $2 matched per $1 up to $10,000. The view pays you back.</p>
<h2 ${'$'}{'H2'}>Get Your Free Picture Window Quote</h2>
<p>A licensed estimator visits within 48 hours, evaluates your openings and view goals, and prices the project exactly, insurance and grant numbers included. Keep the view. Lose the vulnerability.</p>`,
  related: [['Impact Casement Windows','/pages/impact-casement-windows-florida.html'],['Impact Awning Windows','/pages/impact-awning-windows-florida.html'],['Commercial Storefront Windows','/pages/commercial-storefront-impact-windows-florida.html'],['Frameless Impact Windows','/pages/frameless-impact-windows-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-patio-doors-florida',
  crumb: 'Impact Patio Doors',
  title: 'Impact Patio Doors Florida | Hurricane Sliding &amp; Swing Patio Doors',
  desc: 'Hurricane impact patio doors for Florida: sliding, French swing, and multi-panel glass walls, 2026 installed costs, insurance discounts and MSFH grant eligibility.',
  h1: 'Impact Patio Doors: Indoor-Outdoor Living, Hurricane Ready',
  faqs: [
    {q:'How much do impact patio doors cost in Florida?', a:'Standard two-panel impact sliding patio doors run $4,000 to $8,000 installed; French swing patio doors $4,500 to $8,500; and large multi-panel sliders $10,000 to $25,000+ depending on span and configuration. Exact pricing arrives within 48 hours of a free in-home visit.'},
    {q:'Which is better for Florida: sliding or swing patio doors?', a:'Sliders save floor space and suit the classic Florida lanai opening; French swings deliver a traditional look and full clear openings. Both are available with equal impact ratings, so the choice is architecture and lifestyle, not protection.'},
    {q:'Can impact patio doors span large openings?', a:'Yes. Multi-panel sliding systems stack or pocket to open substantial glass walls, engineered and permitted to your wind zone. Spans and configurations depend on the product line, which our estimators match to your opening.'},
    {q:'Do impact patio doors help with insurance and grants?', a:'Yes. Patio doors are openings, and impact-rated units count toward the complete protection behind wind mitigation credits of up to 35% on the windstorm portion of your premium. They are also approved under the My Safe Florida Home grant program.'},
  ],
  body: `<p>The patio door is where Florida homes open to the life outside, the pool, the lanai, the sunset, and it is also the largest glass opening most homes have. Impact-rated patio doors protect that lifestyle: laminated glass, reinforced interlocks, and heavy-duty rollers or hinges engineered for hurricane country. Florida Impact Shield installs the full family statewide: classic sliders, French swing patio doors, and the multi-panel systems that turn walls into openings.</p>
<div class="callout"><p><strong>Impact Patio Doors from Florida Impact Shield:</strong> Sliding, swing, and multi-panel systems with full hurricane ratings, HVHZ approvals available, insurance credit eligibility, and My Safe Florida Home grant approval.</p></div>
<h2 ${'$'}{'H2'}>The Patio Door Family</h2>
<p>Two-panel sliders remain Florida's workhorse, one fixed, one gliding, perfect for lanai openings, covered in depth on our <a href="/pages/sliding-glass-doors.html">sliding glass doors page</a> and <a href="/pages/impact-sliding-glass-door-cost-florida.html">slider cost guide</a>. <a href="/pages/impact-french-doors-florida.html">French swing patio doors</a> trade the track for hinges and a classic look. And multi-panel systems, three, four, and more panels stacking or pocketing away, create the disappearing glass walls of modern Florida architecture, fully engineered to wind zone and permitted accordingly.</p>
<h2 ${'$'}{'H2'}>Engineered for the Biggest Opening in the House</h2>
<p>Because patio doors are large, they carry large wind loads, and impact-rated units answer with laminated glass, reinforced meeting stiles and interlocks, multi-point locking, and rollers built for heavy panels. HVHZ-approved systems carry Miami-Dade NOAs. The same construction resists the smash-and-grab and pry-bar entries that make ordinary sliders a burglar's favorite, an everyday benefit our <a href="/pages/smash-and-grab-protection-florida.html">security guide</a> covers.</p>
<h2 ${'$'}{'H2'}>2026 Cost Ranges</h2>
<table class="data-table"><tr><th>Configuration</th><th>Typical Installed Range</th></tr>
<tr><td>Two-panel impact slider</td><td>$4,000 - $8,000</td></tr>
<tr><td>French swing patio doors</td><td>$4,500 - $8,500</td></tr>
<tr><td>Multi-panel glass wall systems</td><td>$10,000 - $25,000+</td></tr></table>
<p>Quotes itemize product, installation, and permits, with <a href="/pages/financing.html">0% financing</a> available and projected insurance savings calculated up front.</p>
<h2 ${'$'}{'H2'}>Insurance and Grant Money</h2>
<p>Protecting your largest opening matters most to insurers: impact patio doors complete the envelope behind wind mitigation credits of up to 35% on the windstorm portion of your premium, and they are approved improvements under the <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a>, $2 matched per $1 up to $10,000.</p>
<h2 ${'$'}{'H2'}>Get Your Free Patio Door Quote</h2>
<p>A licensed estimator visits within 48 hours, measures your opening, walks the slider-versus-swing decision with you, and delivers exact pricing with insurance and grant numbers attached. Open living, closed to storms.</p>`,
  related: [['Sliding Glass Doors','/pages/sliding-glass-doors.html'],['Impact French Doors','/pages/impact-french-doors-florida.html'],['Slider Cost Guide','/pages/impact-sliding-glass-door-cost-florida.html'],['Smash-and-Grab Protection','/pages/smash-and-grab-protection-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-cabana-doors-florida',
  crumb: 'Impact Cabana Doors',
  title: 'Impact Cabana Doors Florida | Hurricane-Rated Pool &amp; Lanai Doors',
  desc: 'Impact cabana doors for Florida pool baths and lanais: out-swing hurricane-rated single doors with full or partial glass, 2026 costs, insurance and grant eligibility.',
  h1: 'Impact Cabana Doors: The Pool Bath Door, Hurricane-Proofed',
  faqs: [
    {q:'What is a cabana door?', a:'A cabana door is the single out-swinging glass door that connects a pool bath, lanai, or garage directly to the pool deck, a signature of Florida home design. Impact-rated cabana doors bring that opening up to hurricane code with laminated glass and reinforced frames.'},
    {q:'How much does an impact cabana door cost in Florida?', a:'Most impact cabana doors run $3,000 to $6,000 installed depending on glass configuration (full-lite, half-lite), size, and hardware. A free in-home estimate provides your exact price within 48 hours.'},
    {q:'Why do cabana doors swing outward?', a:'Out-swing doors seal tighter under wind pressure (the storm pushes the door into its frame) and keep the swing off your bathroom floor space. Florida code and practice favor out-swing for exposed exterior doors.'},
    {q:'Do impact cabana doors count for insurance discounts?', a:'Yes. Every exterior opening must be protected for full wind mitigation credits, and the cabana door is a commonly missed gap. Upgrading it to impact-rated completes your envelope for discounts of up to 35% on the windstorm portion, and it qualifies for My Safe Florida Home grant funding.'},
  ],
  body: `<p>Every Florida pool home knows the cabana door: the single glass door that lets swimmers into the pool bath without dripping through the house. It is also, in wind mitigation inspections across the state, one of the most commonly missed openings, an old aluminum-and-glass door quietly voiding the insurance credits the rest of the home earned. Florida Impact Shield installs impact-rated cabana doors that close that gap: laminated glass, reinforced out-swing frames, and finishes that stand up to pool chemistry and salt air.</p>
<div class="callout"><p><strong>Impact Cabana Doors from Florida Impact Shield:</strong> Hurricane-rated out-swing doors for pool baths, lanais, and garage-to-deck openings, completing your insurance envelope and qualifying for My Safe Florida Home grants.</p></div>
<h2 ${'$'}{'H2'}>The Overlooked Opening</h2>
<p>Wind mitigation inspectors document every exterior opening, and insurers award full credits only when all of them are protected. Homes with brand-new impact windows routinely lose discounts to a decades-old cabana door, the smallest opening costing the biggest percentage. Replacing it is usually the cheapest line item in a whole-home protection plan and often the one with the fastest insurance payback, a pattern our <a href="/pages/wind-mitigation-inspection.html">wind mitigation guide</a> explains.</p>
<h2 ${'$'}{'H2'}>Built for Poolside Duty</h2>
<p>Impact cabana doors pair laminated glass, full-lite for light, half-lite or blind-embedded for privacy, with reinforced frames and multi-point locks, out-swinging so storm pressure seals the door tighter. Marine-grade hardware and factory finishes shrug off chlorine, salt, and Florida sun. HVHZ-approved units carry Miami-Dade NOAs for the strictest jurisdictions, and every installation is permitted and flashed correctly for the wet-zone exposure poolside doors live in.</p>
<h2 ${'$'}{'H2'}>2026 Cost Ranges</h2>
<table class="data-table"><tr><th>Configuration</th><th>Typical Installed Range</th></tr>
<tr><td>Half-lite cabana door</td><td>$3,000 - $4,500</td></tr>
<tr><td>Full-lite cabana door</td><td>$3,500 - $6,000</td></tr></table>
<p>Quotes itemize door, installation, and permit, with projected <a href="/pages/hurricane-windows-insurance-savings.html">insurance savings</a> calculated, frequently the best savings-per-dollar opening in the whole project, and <a href="/pages/financing.html">financing</a> available.</p>
<h2 ${'$'}{'H2'}>Insurance and Grant Position</h2>
<p>The cabana door completes the opening-protection envelope behind wind mitigation credits of up to 35% on the windstorm portion of your premium, and exterior door replacement qualifies under the <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grant</a>, $2 matched per $1 up to $10,000. Small door, big unlock.</p>
<h2 ${'$'}{'H2'}>Get Your Free Cabana Door Quote</h2>
<p>A licensed estimator visits within 48 hours, checks every opening including the ones inspectors flag, and prices the fix exactly. Close the gap that has been costing you every renewal.</p>`,
  related: [['Impact Entry Doors','/pages/impact-entry-doors-florida.html'],['Impact French Doors','/pages/impact-french-doors-florida.html'],['Impact Doors Overview','/pages/impact-doors.html'],['Wind Mitigation Inspections','/pages/wind-mitigation-inspection.html']].concat(COMMON_RELATED),
},
{
  slug: 'commercial-storefront-impact-windows-florida',
  crumb: 'Commercial Storefront',
  title: 'Commercial Storefront Impact Windows Florida | Hurricane Glazing 2026',
  desc: 'Commercial impact storefront systems for Florida businesses: hurricane-rated glazing, aluminum storefront and entrance systems, code compliance, costs and project process.',
  h1: 'Commercial Storefront Impact Windows: Open for Business, Closed to Storms',
  faqs: [
    {q:'How much do commercial impact storefronts cost in Florida?', a:'Commercial impact storefront glazing typically runs $75 to $150 per square foot installed depending on system, glass specification, spans, and site conditions, with entrance doors priced per unit. Every project receives a detailed proposal after a site assessment.'},
    {q:'Does Florida code require impact glazing for storefronts?', a:'In wind-borne debris regions, new and substantially renovated commercial glazing must be impact-rated or protected, with the High-Velocity Hurricane Zone (Miami-Dade and Broward) enforcing the strictest product approvals. Existing buildings upgrading glazing bring storefronts up to current standards.'},
    {q:'Can impact storefronts handle large glass spans?', a:'Yes. Commercial storefront and curtain-wall systems are engineered for large lites and tall elevations, with structural calculations matched to your wind loads. Oversized and jumbo glass options are available for showcase frontages.'},
    {q:'What business benefits come with impact storefronts beyond hurricanes?', a:'Security is the big one: laminated glass defeats smash-and-grab burglary, protecting inventory year-round. Add noise reduction for street-front locations, UV protection for merchandise, energy savings, and the ability to stay open longer before storms with no shutters to deploy.'},
  ],
  body: `<p>For a Florida business, the storefront is the brand, and in hurricane country it is also the building's most exposed surface. Commercial impact glazing protects both: aluminum storefront systems glazed with laminated impact glass, engineered to Florida wind loads, holding the envelope through the storm and reopening the morning after. Florida Impact Shield delivers commercial impact storefronts across the state, from single-tenant retail frontages to multi-elevation glazing packages, handling engineering, permitting, and installation end to end.</p>
<div class="callout"><p><strong>Commercial Impact Storefronts from Florida Impact Shield:</strong> Hurricane-rated storefront and entrance systems for Florida businesses, code-compliant, security-hardened, and installed with minimal disruption to operations.</p></div>
<h2 ${'$'}{'H2'}>What Commercial Impact Glazing Covers</h2>
<p>The commercial family includes storefront framing systems glazed with laminated impact glass, impact-rated aluminum entrance doors (single, pairs, with panics and closers), transom and clerestory glazing, and jumbo showcase lites for frontages that sell through the glass. Systems are engineered to your building's wind loads and, in Miami-Dade and Broward, carry HVHZ Notices of Acceptance, the approvals your building department and your insurer both recognize.</p>
<h2 ${'$'}{'H2'}>The Business Case Beyond the Storm</h2>
<p>Impact glazing works 365 days a year. Laminated glass defeats smash-and-grab burglary, the after-hours loss that plagues retail, protecting inventory without bars or grilles that fight your brand, a benefit our <a href="/pages/smash-and-grab-protection-florida.html">smash-and-grab guide</a> details. Street noise drops for restaurants and offices. UV filtering protects merchandise from fading. And when a storm approaches, your team evacuates instead of hanging panels, then reopens first while shuttered competitors are still taking plywood down.</p>
<h2 ${'$'}{'H2'}>2026 Cost Framework</h2>
<table class="data-table"><tr><th>Scope</th><th>Typical Range</th></tr>
<tr><td>Storefront glazing (installed)</td><td>$75 - $150 per sq ft</td></tr>
<tr><td>Impact entrance doors</td><td>$4,000 - $10,000 per unit</td></tr>
<tr><td>Multi-elevation packages</td><td>Engineered, proposal per project</td></tr></table>
<p>Every project begins with a site assessment producing a detailed proposal: system specification, glass package, engineering, permits, and installation phasing planned around your business hours.</p>
<h2 ${'$'}{'H2'}>Compliance and Insurance</h2>
<p>Florida's wind-borne debris rules govern commercial glazing statewide, with the HVHZ setting the national benchmark. Impact storefronts satisfy code on new work and renovations, and commercial insurers increasingly price glazing protection into premiums the way residential carriers price <a href="/pages/wind-mitigation-inspection.html">wind mitigation</a>, ask your agent what documented impact glazing does to your policy.</p>
<h2 ${'$'}{'H2'}>Get Your Storefront Assessment</h2>
<p>A commercial estimator visits your location, measures elevations, and delivers a full proposal, systems, specifications, phasing, and price. Protect the frontage that pays the rent.</p>`,
  related: [['Impact Picture Windows','/pages/impact-picture-windows-florida.html'],['Smash-and-Grab Protection','/pages/smash-and-grab-protection-florida.html'],['Impact Windows for Condos','/pages/impact-windows-for-condos-florida.html'],['Impact Entry Doors','/pages/impact-entry-doors-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'frameless-impact-windows-florida',
  crumb: 'Frameless Impact Windows',
  title: 'Frameless Impact Windows Florida | Minimal-Frame Hurricane Glass 2026',
  desc: 'Frameless and minimal-frame impact windows for Florida: the ultra-modern look with full hurricane ratings, where the style works, 2026 costs, and honest trade-offs.',
  h1: 'Frameless Impact Windows: Maximum Glass, Minimum Frame',
  faqs: [
    {q:'Are truly frameless windows hurricane-rated in Florida?', a:'The look homeowners call frameless is delivered by minimal-frame and concealed-frame impact systems: laminated glass carried by slim structural profiles that disappear into the wall. Fully approved impact versions exist, including HVHZ-approved lines, delivering the aesthetic with real ratings.'},
    {q:'How much do frameless-style impact windows cost?', a:'Minimal-frame impact systems are premium products, typically $1,500 to $3,500+ per opening installed and more for oversized fixed lites, reflecting the engineering that hides the structure. Exact pricing follows a design consultation and site assessment.'},
    {q:'Where does the frameless look work best?', a:'Fixed picture applications: view walls, corner glass, stair towers, and modern elevations where sightlines rule. Operating windows in the style exist but the aesthetic is strongest where the glass never moves.'},
    {q:'Do minimal-frame impact windows qualify for insurance credits?', a:'Yes, when the installed products carry impact approvals for your wind zone, they count toward opening protection like any other impact window, supporting wind mitigation discounts of up to 35% on the windstorm portion of your premium.'},
  ],
  body: `<p>Modern Florida architecture keeps asking glass to do more and frame to do less, and the impact industry has answered: minimal-frame and concealed-frame systems that read as frameless from the street while carrying full hurricane ratings behind the sightline. Florida Impact Shield designs and installs these premium systems for contemporary homes across the state, honest about where the look excels, what it costs, and the engineering that makes disappearing frames legal in hurricane country.</p>
<div class="callout"><p><strong>Frameless-Style Impact Windows from Florida Impact Shield:</strong> Minimal-frame hurricane glazing for modern architecture, real impact approvals, engineered installations, and straight answers about the premium.</p></div>
<h2 ${'$'}{'H2'}>What Frameless Really Means</h2>
<p>No glass floats unsupported in a hurricane zone: the frameless look comes from slim structural profiles recessed into the surrounding construction, so drywall and stucco die into the glass and the frame vanishes visually. Laminated impact glass carries the debris rating; the concealed structure carries the wind load; and approved systems, including HVHZ lines with Miami-Dade NOAs, document both. The look is minimal. The engineering is anything but.</p>
<h2 ${'$'}{'H2'}>Where the Style Shines, and Where It Does Not</h2>
<p>The aesthetic is strongest in fixed applications: view walls facing water, structural corner glass, stair towers, and courtyard elevations, places our <a href="/pages/impact-picture-windows-florida.html">picture window guide</a> covers in conventional form. Operating minimal-frame units exist but reintroduce visible hardware; most projects pair frameless fixed glass with discreet <a href="/pages/impact-casement-windows-florida.html">casements</a> or <a href="/pages/impact-awning-windows-florida.html">awnings</a> for ventilation. We will tell you plainly when a conventional slim-frame product delivers 90% of the look for 60% of the price, that honesty is the consultation.</p>
<h2 ${'$'}{'H2'}>2026 Cost Reality</h2>
<table class="data-table"><tr><th>Scope</th><th>Typical Installed Range</th></tr>
<tr><td>Minimal-frame fixed openings</td><td>$1,500 - $3,500+ each</td></tr>
<tr><td>Oversized / corner configurations</td><td>Engineered, quoted per project</td></tr></table>
<p>The premium buys concealed engineering, tighter installation tolerances, and design-grade finishing. Projects begin with a design consultation and site assessment producing an exact, itemized proposal with <a href="/pages/financing.html">financing</a> options.</p>
<h2 ${'$'}{'H2'}>Ratings, Insurance, and Peace of Mind</h2>
<p>Approved minimal-frame systems count toward opening protection exactly like conventional impact windows: wind mitigation credits of up to 35% on the windstorm portion of your premium, documented through a <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a>. Beautiful and defensible, to your insurer and your building department alike.</p>
<h2 ${'$'}{'H2'}>Get Your Design Consultation</h2>
<p>A licensed estimator with modern-project experience visits within 48 hours, reviews your elevations, and prices the frameless look honestly against conventional alternatives. Minimal frames. Full protection. No surprises.</p>`,
  related: [['Impact Picture Windows','/pages/impact-picture-windows-florida.html'],['Impact Casement Windows','/pages/impact-casement-windows-florida.html'],['Commercial Storefront Windows','/pages/commercial-storefront-impact-windows-florida.html'],['Best Brands 2026','/pages/best-impact-window-brands-florida-2026.html']].concat(COMMON_RELATED),
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
