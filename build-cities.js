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

const CITY_RELATED = [
  ['All Florida Cities','/pages/impact-windows-florida-cities-hub.html'],
  ['Insurance Savings','/pages/hurricane-windows-insurance-savings.html'],
  ['My Safe Florida Home Grants','/pages/my-safe-florida-home-grants.html'],
  ['Impact Window Costs','/pages/how-much-do-impact-windows-cost-florida.html'],
  ['Financing Options','/pages/financing.html'],
  ['Wind Mitigation','/pages/wind-mitigation-inspection.html'],
];
function cityFaqs(city, county, extra) {
  return [
    {q:'How much do impact windows cost in ' + city + '?', a:'Impact window costs in ' + city + ' vary by home size, window count, and product selection. A licensed Florida Impact Shield estimator provides an exact quote within 48 hours, along with your projected insurance savings and My Safe Florida Home grant eligibility to offset the cost.'},
    {q:'Can ' + city + ' homeowners get the My Safe Florida Home grant?', a:'Yes. Qualifying homeowners in ' + city + ' and throughout ' + county + ' can apply for My Safe Florida Home grants of up to $10,000 for impact windows and other hurricane hardening, with $2 matched for every $1 spent. Florida Impact Shield is an approved contractor and can guide the process.'},
    {q:'How much can I save on insurance with impact windows in ' + city + '?', a:city + ' homeowners can save up to 35% on homeowners insurance through wind mitigation credits after installing impact windows, applied to the windstorm portion of the policy, the largest share of most ' + county + ' premiums.'},
    extra,
  ];
}
const PAGES = [
{
  slug: 'impact-windows-fisher-island', crumb: 'Fisher Island',
  title: 'Impact Windows Fisher Island FL | Luxury Hurricane Protection',
  desc: 'Impact windows for Fisher Island: white-glove installation on America\'s most exclusive island, HVHZ approvals, oversized glass, condo standards and logistics done right.',
  h1: 'Impact Windows Fisher Island: White-Glove Protection for America&apos;s Most Exclusive Address',
  faqs: cityFaqs('Fisher Island','Miami-Dade County',{q:'How does installation work on a ferry-access island?', a:'Fisher Island projects are logistics projects: ferry scheduling for crews and materials, association approvals and insurance certificates, service-elevator coordination and strict site protocols. Florida Impact Shield plans all of it into the proposal so the project runs invisibly around residence life.'}),
  body: `<p>Fisher Island is the wealthiest zip code in America, reachable only by ferry, governed by exacting associations, and sitting directly in the path of every Atlantic system that threatens Miami. Protecting residences here means HVHZ-approved glazing engineered for oceanfront exposure, delivered through logistics most contractors have never managed: ferry manifests, association protocols, white-glove interior standards. Florida Impact Shield serves Fisher Island with exactly that discipline.</p>
<div class="callout"><p><strong>Fisher Island service from Florida Impact Shield:</strong> HVHZ-approved impact windows and doors for the island's condominiums and residences, association-compliant, logistics-planned, and finished to the standard the address demands.</p></div>
<h2 ${H2}>Oceanfront Exposure, HVHZ Standards</h2>
<p>Fisher Island sits in Miami-Dade's High-Velocity Hurricane Zone with open-water exposure on every side: products here carry Miami-Dade NOAs, the toughest approvals in the nation, engineered for the wind loads and salt environment barrier-island living delivers. Oversized glass, the floor-to-ceiling views island residences are built around, is a specialty, drawing on the jumbo-capable lines our <a href="/pages/es-windows-florida.html">ES Windows</a> and <a href="/pages/impact-picture-windows-florida.html">picture window</a> guides cover.</p>
<h2 ${H2}>The Association and Logistics Craft</h2>
<p>Island projects succeed on process: association architectural approvals and matching building standards, certificates of insurance, ferry and freight scheduling, service-elevator windows, floor and corridor protection, and crews briefed on residence protocols. Our proposals plan every step, and our <a href="/pages/impact-windows-for-condos-florida.html">condo guide</a> covers the association dimension in depth, including matching the approved products your building has standardized.</p>
<h2 ${H2}>Insurance and Documentation</h2>
<p>Even at Fisher Island valuations, wind mitigation credits matter: documented impact protection saves up to 35% on the windstorm portion of premiums, real money on island policies, with the <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a> creating the file your carrier honors. Unit protection also interacts with the association's master policy, a nuance we map for every client.</p>
<h2 ${H2}>Book Your Fisher Island Consultation</h2>
<p>A senior estimator handles island appointments personally: measurements, product and finish selection, association coordination, and an exact proposal, ferry logistics included. Protection at the standard of the address.</p>`,
  related: [['Impact Windows for Condos','/pages/impact-windows-for-condos-florida.html'],['Miami Beach','/pages/impact-windows-miami-beach.html'],['ES Windows Review','/pages/es-windows-florida.html'],['Frameless Impact Windows','/pages/frameless-impact-windows-florida.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-bal-harbour', crumb: 'Bal Harbour',
  title: 'Impact Windows Bal Harbour FL | Oceanfront Hurricane Protection',
  desc: 'Impact windows for Bal Harbour: luxury oceanfront and village residences, HVHZ approvals, oversized glass, condo standards, insurance savings and white-glove installation.',
  h1: 'Impact Windows Bal Harbour: Engineered for the Gold Coast',
  faqs: cityFaqs('Bal Harbour','Miami-Dade County',{q:'Do Bal Harbour condos have special requirements?', a:'Most towers maintain approved product standards and architectural review: unit projects match the building\'s specifications, and Florida Impact Shield handles association submittals, insurance certificates and building protocols as part of every Bal Harbour proposal.'}),
  body: `<p>Bal Harbour packs extraordinary value into one oceanfront village: landmark towers over the beach, estate streets behind the gates, and the retail crown of the Americas at its center, all facing the open Atlantic in Miami-Dade's High-Velocity Hurricane Zone. Impact glazing here is both mandatory engineering and luxury finish, and Florida Impact Shield delivers both: HVHZ-approved systems, oversized ocean-view glass, and installation conducted to tower standards.</p>
<div class="callout"><p><strong>Bal Harbour service from Florida Impact Shield:</strong> HVHZ-approved impact windows and doors for oceanfront towers and village residences, association-coordinated, white-glove installed, insurance-documented.</p></div>
<h2 ${H2}>Front-Row Atlantic Exposure</h2>
<p>Bal Harbour's towers meet the ocean with nothing in between: design pressures here are among the highest residential wind loads in Florida, met by Miami-Dade NOA products engineered for exactly this coastline, with corrosion-resistant finishes for the salt environment. Floor-to-ceiling and oversized glass, the entire point of oceanfront living, draws on the jumbo-capable systems our <a href="/pages/impact-picture-windows-florida.html">picture window</a> and <a href="/pages/es-windows-florida.html">ES Windows</a> guides detail.</p>
<h2 ${H2}>Tower Standards, Village Estates</h2>
<p>Condo projects match building-approved products and clear architectural review, submittals, certificates, elevator scheduling and floor protection all planned into our proposals, with the association dimension covered in our <a href="/pages/impact-windows-for-condos-florida.html">condo guide</a>. Village single-family estates run the classic path: whole-home <a href="/pages/impact-window-replacement-florida.html">replacement</a> with design-grade product selection, from <a href="/pages/impact-french-doors-florida.html">French doors</a> to <a href="/pages/frameless-impact-windows-florida.html">minimal-frame</a> modern glass.</p>
<h2 ${H2}>The Insurance Position</h2>
<p>Wind mitigation credits scale with premiums, and Bal Harbour premiums are substantial: documented impact protection saves up to 35% on the windstorm portion, established through a <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a> and maintained in the file your carrier audits. Qualifying single-family owners can additionally pursue <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a> of up to $10,000.</p>
<h2 ${H2}>Book Your Bal Harbour Consultation</h2>
<p>A senior estimator visits within 48 hours: measurements, product and finish selection, association coordination where applicable, and an exact proposal with insurance numbers attached. Gold Coast views, engineered to stay.</p>`,
  related: [['Impact Windows for Condos','/pages/impact-windows-for-condos-florida.html'],['Miami Beach','/pages/impact-windows-miami-beach.html'],['Aventura','/pages/impact-windows-aventura.html'],['Frameless Impact Windows','/pages/frameless-impact-windows-florida.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-key-biscayne', crumb: 'Key Biscayne',
  title: 'Impact Windows Key Biscayne FL | Island Village Hurricane Protection',
  desc: 'Impact windows for Key Biscayne: the island village\'s Andrew history, HVHZ approvals, oceanfront and bayfront homes, condo standards, insurance savings and grants.',
  h1: 'Impact Windows Key Biscayne: The Island That Remembers Andrew',
  faqs: cityFaqs('Key Biscayne','Miami-Dade County',{q:'Why is hurricane protection such a priority on Key Biscayne?', a:'Hurricane Andrew\'s 1992 devastation of the island village is living memory here, and Key Biscayne\'s exposed position, an island reached by the Rickenbacker Causeway with ocean and bay on all sides, makes impact protection the community standard rather than an upgrade.'}),
  body: `<p>Key Biscayne carries its history in its building culture: Hurricane Andrew came ashore just south in 1992 and mauled the island village, and the community that rebuilt did so with protection as a first principle. Today the Key's oceanfront condos, bayfront estates and village streets sit in Miami-Dade's High-Velocity Hurricane Zone, connected to the mainland by a single causeway, and impact glazing here is simply how serious homes are built. Florida Impact Shield serves the island with HVHZ-approved systems and island-savvy installation.</p>
<div class="callout"><p><strong>Key Biscayne service from Florida Impact Shield:</strong> HVHZ-approved impact windows and doors for the island's condos, estates and village homes, association-coordinated, insurance-documented, installed to the community's post-Andrew standard.</p></div>
<h2 ${H2}>Exposure on Every Side</h2>
<p>An island position means wind from any quadrant finds water first and your walls second: Key Biscayne design pressures are met by Miami-Dade NOA products engineered for open exposure, with the salt-environment finishes barrier living demands. From Ocean Club towers to Harbor Drive estates, oversized glass carries the views, drawing on the jumbo-capable lines our <a href="/pages/impact-picture-windows-florida.html">picture window</a> guide covers, and <a href="/pages/impact-patio-doors-florida.html">multi-panel patio systems</a> open homes to the water the island is about.</p>
<h2 ${H2}>Condos, Estates and the Village</h2>
<p>Tower projects match association-approved products with full submittal support, our <a href="/pages/impact-windows-for-condos-florida.html">condo guide</a> covers the machinery, while single-family work runs whole-home <a href="/pages/impact-window-replacement-florida.html">replacement</a> with the design-grade options island architecture calls for. Cross-causeway logistics, staging, deliveries, village permitting rhythms, are planned into every proposal.</p>
<h2 ${H2}>Insurance Savings and Grants</h2>
<p>Island premiums make wind mitigation credits meaningful: documented impact protection saves up to 35% on the windstorm portion, via <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a>, and qualifying homeowners access <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a> up to $10,000 with $2-per-$1 matching. Protection that pays the island back.</p>
<h2 ${H2}>Book Your Key Biscayne Consultation</h2>
<p>A licensed estimator visits within 48 hours, measures your openings, and delivers an exact proposal with insurance and grant numbers attached. The island learned its lesson once; your home should carry it.</p>`,
  related: [['Impact Windows for Condos','/pages/impact-windows-for-condos-florida.html'],['Coral Gables','/pages/impact-windows-coral-gables.html'],['Miami','/pages/impact-windows-miami.html'],['Impact Patio Doors','/pages/impact-patio-doors-florida.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-palm-beach-island', crumb: 'Palm Beach Island',
  title: 'Impact Windows Palm Beach Island FL | Estate-Grade Hurricane Protection',
  desc: 'Impact windows for the Town of Palm Beach: estate-grade protection, ARCOM-conscious aesthetics, oceanfront engineering, historic architecture solutions and discreet installation.',
  h1: 'Impact Windows Palm Beach: Estate Protection, Estate Standards',
  faqs: cityFaqs('Palm Beach','Palm Beach County',{q:'Can impact windows match Palm Beach\'s historic architecture?', a:'Yes, impact lines now reproduce the profiles, divided-light patterns and finishes the town\'s Mediterranean Revival and Georgian estates require, and our proposals are designed with the town\'s architectural review sensibilities in mind, protection that preserves the look reviewers protect.'}),
  body: `<p>The Town of Palm Beach guards its architecture the way it guards everything: carefully. Estate protection here must satisfy two masters, Atlantic engineering on one side, the town's celebrated aesthetic standards on the other, and modern impact glazing finally serves both: Mediterranean Revival profiles, divided-light patterns and estate finishes over laminated hurricane glass. Florida Impact Shield serves the island's estates, landmarked streets and intracoastal residences with exactly that combination, discreetly.</p>
<div class="callout"><p><strong>Palm Beach service from Florida Impact Shield:</strong> Estate-grade impact windows and doors matching the island's architectural traditions, engineered for oceanfront exposure, installed with the discretion the town expects.</p></div>
<h2 ${H2}>Architecture First, Then Engineering, Then Both</h2>
<p>Palm Beach's Mizner-era Mediterranean Revival, Georgian and Regency estates demand profiles ordinary impact catalogs cannot fake: true divided-light aesthetics via grids-between-glass and simulated patterns, custom colors and estate hardware, on products carrying the approvals oceanfront design pressures require. Our design process starts from the elevations, not the price list, drawing on <a href="/pages/impact-french-doors-florida.html">French door</a>, <a href="/pages/impact-casement-windows-florida.html">casement</a> and custom lines that satisfy the eye the town trains on every facade.</p>
<h2 ${H2}>Ocean to Lake, Estate by Estate</h2>
<p>From oceanfront parcels taking direct Atlantic exposure to Intracoastal estates and the landmarked in-town streets, engineering follows position: design pressures calculated per elevation, salt-environment finishes throughout, and oversized glass for the loggias and ocean rooms the estates are built around. Installation is planned to estate rhythm: staff coordination, site protection, staging that respects grounds, and schedules built around the season.</p>
<h2 ${H2}>The Financial Layer</h2>
<p>Estate premiums make the windstorm portion substantial, and documented impact protection saves up to 35% of it through wind mitigation credits, established via <a href="/pages/wind-mitigation-inspection.html">inspection</a> and maintained in the carrier file. Qualifying homeowners additionally access <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a>; at estate scale the grant is a gesture, but the premium mathematics are not.</p>
<h2 ${H2}>Book Your Palm Beach Consultation</h2>
<p>A senior estimator handles island appointments: elevations reviewed, profiles matched, engineering confirmed, and an exact proposal delivered, quietly. Protection worthy of the architecture it preserves.</p>`,
  related: [['West Palm Beach','/pages/impact-windows-west-palm-beach.html'],['Jupiter','/pages/impact-windows-jupiter.html'],['Wellington','/pages/impact-windows-wellington.html'],['Impact French Doors','/pages/impact-french-doors-florida.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-parkland', crumb: 'Parkland',
  title: 'Impact Windows Parkland FL | Estate Community Hurricane Protection',
  desc: 'Impact windows for Parkland homes: Broward\'s estate community, HOA-conscious installation, large-home packages, insurance savings and My Safe Florida Home grants.',
  h1: 'Impact Windows Parkland: Protection for Broward&apos;s Estate Country',
  faqs: cityFaqs('Parkland','Broward County',{q:'Do Parkland HOAs restrict impact window choices?', a:'Most Parkland communities require architectural approval for exterior changes, typically governing frame colors and styles rather than blocking impact upgrades. Florida Impact Shield prepares HOA submittal packages, product specs, colors, elevations, as part of every Parkland proposal.'}),
  body: `<p>Parkland is Broward County living at estate scale: gated communities, large lots, and homes whose window counts run twice the county average, which means twice the openings to protect and twice the insurance savings waiting. Sitting in Broward's High-Velocity Hurricane Zone, Parkland homes carry HVHZ product requirements, and Florida Impact Shield serves the city's communities, Heron Bay to Parkland Golf &amp; Country Club to the ranches, with large-home packages and HOA-fluent process.</p>
<div class="callout"><p><strong>Parkland service from Florida Impact Shield:</strong> HVHZ-approved impact windows and doors for estate-scale homes, HOA submittals handled, large-project pricing, insurance and grant funding built into the plan.</p></div>
<h2 ${H2}>Estate Homes, Estate Window Counts</h2>
<p>Twenty-five to forty openings is normal in Parkland, great rooms with glass walls, oversized sliders to summer kitchens, master suites wrapped in windows, and volume changes the project: per-opening pricing sharpens, phasing options matter, and product mixing (vinyl where it wins, aluminum where openings demand) pays visibly. Our <a href="/pages/impact-window-replacement-florida.html">replacement guide</a> covers the whole-home craft; the <a href="/pages/impact-patio-doors-florida.html">multi-panel door systems</a> Parkland great rooms love get their own page.</p>
<h2 ${H2}>The HOA Dimension, Handled</h2>
<p>Parkland's communities review exterior changes, and smooth projects submit properly: product specifications, frame colors, elevation drawings, approval timelines built into scheduling. We prepare the package, and impact upgrades, which protect community property values, approve routinely when presented professionally. HVHZ approvals (Miami-Dade NOAs honored across Broward) anchor every specification.</p>
<h2 ${H2}>The Savings at Parkland Scale</h2>
<p>Big homes carry big premiums, and wind mitigation credits scale accordingly: up to 35% off the windstorm portion, year after year, documented via <a href="/pages/wind-mitigation-inspection.html">inspection</a>. Qualifying homeowners add <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a>, $2 matched per $1 up to $10,000, and <a href="/pages/financing.html">0% financing</a> spreads estate-scale projects sensibly. Our <a href="/pages/my-safe-florida-home-broward.html">Broward grant guide</a> covers county specifics.</p>
<h2 ${H2}>Get Your Parkland Quote</h2>
<p>A licensed estimator visits within 48 hours, measures every opening, preps the HOA package, and delivers exact pricing with insurance and grant numbers attached. Estate protection, estate arithmetic.</p>`,
  related: [['Coral Springs','/pages/impact-windows-coral-springs.html'],['Coconut Creek','/pages/impact-windows-coconut-creek.html'],['Broward County','/pages/impact-windows-broward.html'],['MSFH Broward Guide','/pages/my-safe-florida-home-broward.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-coconut-creek', crumb: 'Coconut Creek',
  title: 'Impact Windows Coconut Creek FL | Butterfly Capital Hurricane Protection',
  desc: 'Impact windows for Coconut Creek: Broward HVHZ requirements, community-friendly installation, townhome and single-family packages, insurance savings and grants.',
  h1: 'Impact Windows Coconut Creek: The Butterfly Capital, Hardened',
  faqs: cityFaqs('Coconut Creek','Broward County',{q:'Do you serve Coconut Creek townhomes and villas?', a:'Yes, townhome and villa projects are a Coconut Creek staple, with association coordination, party-wall considerations and community architectural standards handled as part of every proposal alongside classic single-family work.'}),
  body: `<p>Coconut Creek built its identity on planning, the Butterfly Capital's greenways, master-planned neighborhoods and MainStreet vision, and protection deserves the same intentionality. Sitting in Broward's High-Velocity Hurricane Zone, the city's mix of single-family streets, townhome communities and villa associations all carry HVHZ product requirements, and Florida Impact Shield serves them all with community-fluent installation and the insurance mathematics that make protection pay.</p>
<div class="callout"><p><strong>Coconut Creek service from Florida Impact Shield:</strong> HVHZ-approved impact windows and doors for single-family, townhome and villa living, association-coordinated, insurance-documented, grant-guided.</p></div>
<h2 ${H2}>Every Housing Type, One Standard</h2>
<p>Coconut Creek's housing runs the range, Winston Park and Regency Lakes single-family, Township's villa and townhome fabric, newer communities along Lyons Road, and each type projects differently: whole-home <a href="/pages/impact-window-replacement-florida.html">replacement</a> for houses, association-matched packages for attached homes where community standards govern colors and styles. HVHZ approvals (Miami-Dade NOAs honored in Broward) anchor everything, and our <a href="/pages/impact-windows-for-condos-florida.html">condo and association guide</a> covers the shared-wall world.</p>
<h2 ${H2}>The Practical Coconut Creek Project</h2>
<p>Most homes here complete in one to two installation days after product arrival, permits pulled through the city, inspections passed, openings weather-sealed same-day. The product conversation typically lands on value-strong vinyl for standard openings, <a href="/pages/pgt-impact-windows-florida.html">PGT</a> and <a href="/pages/lawson-windows-florida.html">Lawson</a> territory, with aluminum sliders where patio openings call for it, quoted brand-neutral so arithmetic decides.</p>
<h2 ${H2}>Insurance Savings and Grant Funding</h2>
<p>Broward premiums make wind mitigation credits real money: up to 35% off the windstorm portion after full opening protection, documented via <a href="/pages/wind-mitigation-inspection.html">inspection</a>. Qualifying homeowners stack <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a>, $2 matched per $1 up to $10,000, with our <a href="/pages/my-safe-florida-home-broward.html">Broward grant guide</a> mapping county specifics, and <a href="/pages/financing.html">0% financing</a> covering the balance.</p>
<h2 ${H2}>Get Your Coconut Creek Quote</h2>
<p>A licensed estimator visits within 48 hours, measures your openings, and delivers exact pricing with insurance savings and grant eligibility attached. Planned city, planned protection.</p>`,
  related: [['Coral Springs','/pages/impact-windows-coral-springs.html'],['Margate','/pages/impact-windows-margate.html'],['Pompano Beach','/pages/impact-windows-pompano-beach.html'],['MSFH Broward Guide','/pages/my-safe-florida-home-broward.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-lighthouse-point', crumb: 'Lighthouse Point',
  title: 'Impact Windows Lighthouse Point FL | Waterfront Hurricane Protection',
  desc: 'Impact windows for Lighthouse Point: canal-front living, salt-environment engineering, HVHZ approvals, big-glass waterfront homes, insurance savings and grants.',
  h1: 'Impact Windows Lighthouse Point: Canal-Front Living, Fortified',
  faqs: cityFaqs('Lighthouse Point','Broward County',{q:'What matters most for canal-front window projects?', a:'Salt-environment durability and big-glass engineering: marine-grade finishes and hardware that shrug off canal air, plus the oversized sliders and picture glass waterfront rooms are built around, engineered to HVHZ design pressures. Waterfront is our Lighthouse Point specialty.'}),
  body: `<p>Lighthouse Point is Broward's Venice: a city laced with canals where most homes touch the water and living rooms open to docks through walls of glass. That waterfront geometry defines protection here, big openings facing open exposure, salt air working on every finish, HVHZ requirements underneath it all, and Florida Impact Shield serves the Point with marine-minded engineering: oversized impact glass, corrosion-resistant systems, and installations that respect seawall-lot logistics.</p>
<div class="callout"><p><strong>Lighthouse Point service from Florida Impact Shield:</strong> HVHZ-approved impact windows and doors engineered for canal-front exposure, big-glass capable, salt-durable, insurance-documented.</p></div>
<h2 ${H2}>The Waterfront Window Problem, Solved</h2>
<p>Canal homes concentrate their glass toward the water: multi-panel sliders to pool decks, picture walls framing dock views, master suites glazed to the sunrise. Those openings carry the biggest wind loads on the lot and want the strongest engineering, <a href="/pages/impact-patio-doors-florida.html">multi-panel door systems</a>, <a href="/pages/impact-picture-windows-florida.html">oversized fixed glass</a>, and the aluminum lines (our <a href="/pages/es-windows-florida.html">ES</a> coverage applies) whose profiles and marine finishes suit the environment. Miami-Dade NOAs, honored across Broward's HVHZ, anchor every specification.</p>
<h2 ${H2}>Salt, Storms and the Long Game</h2>
<p>Canal air is patient: it finds cheap hardware, thin finishes and shortcut installations within a few seasons. Point projects specify marine-grade hardware and factory finishes built for the exposure, flash and seal to waterfront rain loads, and install to schedules that respect dock-side staging and neighbor courtesies on the Point's tight, beautiful streets.</p>
<h2 ${H2}>Insurance Mathematics on the Water</h2>
<p>Waterfront premiums are Broward's steepest, which makes wind mitigation credits their most valuable: up to 35% off the windstorm portion after full protection, documented via <a href="/pages/wind-mitigation-inspection.html">inspection</a>. Qualifying homeowners add <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a> ($2 per $1, up to $10,000, county details in our <a href="/pages/my-safe-florida-home-broward.html">Broward guide</a>), and <a href="/pages/financing.html">0% financing</a> carries the balance.</p>
<h2 ${H2}>Get Your Lighthouse Point Quote</h2>
<p>A licensed estimator visits within 48 hours, measures the waterfront glass and everything behind it, and delivers exact pricing with insurance and grant numbers attached. The view stays; the vulnerability goes.</p>`,
  related: [['Pompano Beach','/pages/impact-windows-pompano-beach.html'],['Deerfield Beach','/pages/impact-windows-deerfield-beach.html'],['Boca Raton','/pages/impact-windows-boca-raton.html'],['Impact Patio Doors','/pages/impact-patio-doors-florida.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-punta-gorda', crumb: 'Punta Gorda',
  title: 'Impact Windows Punta Gorda FL | Charley to Ian, Protection Proven',
  desc: 'Impact windows for Punta Gorda: the city Charley rebuilt and Ian retested, Charlotte County requirements, canal homes, insurance savings and My Safe Florida Home grants.',
  h1: 'Impact Windows Punta Gorda: The City That Rebuilt Right',
  faqs: cityFaqs('Punta Gorda','Charlotte County',{q:'Did impact windows prove themselves in Punta Gorda?', a:'Emphatically. Homes rebuilt to post-Charley standards with impact protection came through Hurricane Ian dramatically better than older construction, the local before-and-after evidence that has made impact windows the Punta Gorda default.'}),
  body: `<p>Punta Gorda holds a unique place in Florida's hurricane story: Charley shattered it in 2004, the city rebuilt to modern code, and when Ian delivered a second direct-region blow in 2022, the rebuilt city passed its retest, homes hardened after Charley visibly outperforming everything older. Few places on earth have run the experiment twice; Punta Gorda did, and the results are why impact windows are simply how this city builds now. Florida Impact Shield serves Punta Gorda and Charlotte County with the protection the evidence endorses.</p>
<div class="callout"><p><strong>Punta Gorda service from Florida Impact Shield:</strong> Impact windows and doors meeting Charlotte County requirements, canal-home engineering, insurance documentation and My Safe Florida Home grant guidance, protection this city has watched work.</p></div>
<h2 ${H2}>Twice-Tested Proof</h2>
<p>The Charley-to-Ian record is Punta Gorda's civic dataset: modern impact-protected construction kept envelopes sealed while pre-code structures failed, the difference between cleanup and catastrophe playing out street by street. Impact glass holds when struck, preventing the internal pressurization that lifts roofs, exactly the mechanism the city watched decide outcomes twice, covered in our <a href="/pages/do-impact-windows-really-work-in-a-hurricane.html">do-they-really-work</a> analysis.</p>
<h2 ${H2}>Canal Country Engineering</h2>
<p>Punta Gorda Isles and the canal neighborhoods concentrate glass toward the water, big sliders to pool cages, picture glass on harbor views, and those waterfront openings get waterfront engineering: <a href="/pages/impact-patio-doors-florida.html">multi-panel door systems</a>, <a href="/pages/impact-picture-windows-florida.html">oversized fixed glass</a>, salt-capable finishes and design pressures calculated to open-water exposure. Inland streets and downtown's historic fabric get the same code-right treatment scaled to their openings.</p>
<h2 ${H2}>Insurance Relief Where It Is Needed Most</h2>
<p>Southwest Florida's post-Ian insurance market makes wind mitigation credits genuinely consequential: full impact protection saves up to 35% on the windstorm portion, documented via <a href="/pages/wind-mitigation-inspection.html">inspection</a>, relief measured in four figures for many Charlotte County homes. Qualifying homeowners stack <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a>, $2 matched per $1 up to $10,000, and <a href="/pages/financing.html">0% financing</a> bridges the rest.</p>
<h2 ${H2}>Get Your Punta Gorda Quote</h2>
<p>A licensed estimator visits within 48 hours, measures your openings, and delivers exact pricing with insurance savings and grant eligibility attached. This city proved what works, twice. Put the proof on your house.</p>`,
  related: [['Cape Coral','/pages/impact-windows-cape-coral.html'],['Fort Myers','/pages/impact-windows-fort-myers.html'],['Do Impact Windows Really Work','/pages/do-impact-windows-really-work-in-a-hurricane.html'],['Impact Patio Doors','/pages/impact-patio-doors-florida.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-estero', crumb: 'Estero',
  title: 'Impact Windows Estero FL | Gated Community Hurricane Protection',
  desc: 'Impact windows for Estero: Lee County\'s gated-community corridor, Ian-era urgency, HOA-fluent installation, insurance savings and My Safe Florida Home grants.',
  h1: 'Impact Windows Estero: The Corridor Between the Storms',
  faqs: cityFaqs('Estero','Lee County',{q:'How do Estero\'s gated communities affect projects?', a:'Smoothly, when handled right: architectural review submittals, gate and vendor logistics, and community standards on colors and styles are routine parts of every Estero proposal, and impact upgrades approve readily because they protect community values.'}),
  body: `<p>Estero grew up between Fort Myers and Naples as Lee County's master-planned corridor, mile after mile of gated communities, coach homes and golf-course estates, and Hurricane Ian's 2022 run through the county converted protection from consideration to priority across every one of them. Florida Impact Shield serves Estero's communities with HOA-fluent process and the insurance mathematics that post-Ian Lee County premiums make urgent.</p>
<div class="callout"><p><strong>Estero service from Florida Impact Shield:</strong> Impact windows and doors for the corridor's gated communities and estates, architectural review handled, Ian-era insurance relief documented, grants guided.</p></div>
<h2 ${H2}>Community Living, Community Process</h2>
<p>From West Bay and Pelican Sound to The Brooks, Bella Terra and the Corkscrew corridor's newer builds, Estero projects run through architectural review: product specs, frame colors, elevations, gate logistics, all prepared as part of our proposals, approvals moving quickly because hardening protects everyone's values. Attached coach homes and villas add association coordination our <a href="/pages/impact-windows-for-condos-florida.html">condo and association guide</a> maps.</p>
<h2 ${H2}>What Ian Taught the Corridor</h2>
<p>Ian's surge took the islands, but its wind and rain schooled inland Lee County too: protected homes stayed sealed while unprotected openings turned wind events into water events. Impact glass holds when struck, keeping the envelope intact, the mechanism our <a href="/pages/do-impact-windows-really-work-in-a-hurricane.html">evidence guide</a> details, and the reason Estero's replacement wave has run hot since. Lanai-facing glass walls, the corridor's signature <a href="/pages/impact-patio-doors-florida.html">multi-panel sliders</a>, headline most projects.</p>
<h2 ${H2}>Post-Ian Insurance Relief</h2>
<p>Lee County's insurance market rewards documented protection like never before: wind mitigation credits save up to 35% on the windstorm portion after full opening protection, established via <a href="/pages/wind-mitigation-inspection.html">inspection</a>, four-figure relief for many Estero households. Qualifying homeowners stack <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a> at $2 per $1 up to $10,000, with <a href="/pages/financing.html">0% financing</a> carrying the balance.</p>
<h2 ${H2}>Get Your Estero Quote</h2>
<p>A licensed estimator visits within 48 hours, measures your openings, preps the community submittal, and delivers exact pricing with insurance and grant numbers attached. The corridor is hardening; join it on the right side of the premium table.</p>`,
  related: [['Bonita Springs','/pages/impact-windows-bonita-springs.html'],['Fort Myers','/pages/impact-windows-fort-myers.html'],['Naples','/pages/impact-windows-naples.html'],['Impact Patio Doors','/pages/impact-patio-doors-florida.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-bonita-springs', crumb: 'Bonita Springs',
  title: 'Impact Windows Bonita Springs FL | Coastal Lee County Protection',
  desc: 'Impact windows for Bonita Springs: Ian-tested coastal living, beach-to-gates community range, salt-environment engineering, insurance savings and MSFH grants.',
  h1: 'Impact Windows Bonita Springs: From the Beach to the Gates',
  faqs: cityFaqs('Bonita Springs','Lee County',{q:'Which Bonita Springs areas need the strongest engineering?', a:'Barrier-beach and bay-front homes carry the highest design pressures and salt exposure, engineered accordingly with marine-grade finishes, while the inland gated corridor follows standard Lee County wind loads. Every proposal calculates to your actual position and exposure.'}),
  body: `<p>Bonita Springs runs the full Southwest Florida gradient in one city: Gulf-front on Bonita Beach, bay and Imperial River waterfront behind it, then the gated golf communities marching east along Bonita Beach Road, and Hurricane Ian graded every mile of it in 2022. The lesson the city took: protection engineered to position. Florida Impact Shield serves Bonita Springs beach to gates with exposure-matched impact systems and the post-Ian insurance documentation Lee County premiums demand.</p>
<div class="callout"><p><strong>Bonita Springs service from Florida Impact Shield:</strong> Impact windows and doors engineered from Gulf-front loads to inland community standards, association-coordinated, insurance-documented, grant-guided.</p></div>
<h2 ${H2}>Exposure-Matched Engineering</h2>
<p>Beach and bay-front homes take open-water design pressures and relentless salt: specifications here run marine-grade finishes, corrosion-capable hardware and the oversized glass Gulf views are built around, <a href="/pages/impact-picture-windows-florida.html">picture walls</a> and <a href="/pages/impact-patio-doors-florida.html">multi-panel sliders</a> engineered to the load. The gated interior, Bonita Bay to Palmira to Hawthorne, follows community architectural standards with review submittals we prepare as routine.</p>
<h2 ${H2}>The Ian Standard</h2>
<p>Ian's landfall just north made Bonita Springs a demonstration project: sealed envelopes versus breached ones decided which homes cleaned up and which rebuilt. Impact glass cracks but holds, keeping wind and water outside, the mechanism our <a href="/pages/do-impact-windows-really-work-in-a-hurricane.html">evidence guide</a> documents, and the reason the city's replacement pace has not slowed since. Protection here is no longer sold; it is remembered.</p>
<h2 ${H2}>Insurance Relief and Grant Funding</h2>
<p>Lee County's post-Ian market prices protection into every renewal: full impact coverage earns wind mitigation credits up to 35% on the windstorm portion, documented via <a href="/pages/wind-mitigation-inspection.html">inspection</a>, meaningful four-figure relief across Bonita's housing stock. Qualifying homeowners stack <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a>, $2 matched per $1 up to $10,000, with <a href="/pages/financing.html">0% financing</a> completing the funding picture.</p>
<h2 ${H2}>Get Your Bonita Springs Quote</h2>
<p>A licensed estimator visits within 48 hours, reads your exposure, measures your openings, and delivers exact pricing with insurance and grant numbers attached. Beach to gates, engineered to position.</p>`,
  related: [['Estero','/pages/impact-windows-estero.html'],['Naples','/pages/impact-windows-naples.html'],['Fort Myers','/pages/impact-windows-fort-myers.html'],['Cape Coral','/pages/impact-windows-cape-coral.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-sanibel-captiva', crumb: 'Sanibel &amp; Captiva',
  title: 'Impact Windows Sanibel &amp; Captiva FL | Rebuilding the Islands Right',
  desc: 'Impact windows for Sanibel and Captiva: rebuilding after Ian\'s ground zero, island logistics, elevated-home engineering, salt durability and insurance documentation.',
  h1: 'Impact Windows Sanibel &amp; Captiva: Rebuilding Ground Zero, Properly',
  faqs: cityFaqs('Sanibel','Lee County',{q:'What makes island installation different post-Ian?', a:'Causeway and logistics planning, elevated-home access work, coordination with ongoing reconstruction trades, and specifications that assume the worst case just happened, because on Sanibel and Captiva, it did. Our island proposals plan all of it explicitly.'}),
  body: `<p>Hurricane Ian made Sanibel and Captiva the most scrutinized rebuild in America: the causeway severed, homes gutted by surge and wind, and an island community deciding, parcel by parcel, how to build back. The answer taking shape is the right one, elevated, hardened, impact-protected, and Florida Impact Shield is part of it, delivering island-logistics installation and the engineering the islands' exposure has always demanded and now insists upon.</p>
<div class="callout"><p><strong>Sanibel &amp; Captiva service from Florida Impact Shield:</strong> Impact windows and doors for rebuilds and hardening projects, island logistics planned, elevated-home capable, salt-engineered, insurance-documented.</p></div>
<h2 ${H2}>Rebuilding to the Real Standard</h2>
<p>Post-Ian reconstruction is the moment to specify correctly: impact glazing engineered to open-Gulf design pressures, marine-grade finishes for the islands' relentless salt, and the <a href="/pages/new-construction-impact-windows-florida.html">new-construction integration</a>, glass anchored into rough framing with flashing built into the envelope, that rebuilds allow and retrofits envy. Elevated homes add access logistics our island crews plan as routine, and the oversized Gulf-view glass that defines island architecture draws on <a href="/pages/impact-picture-windows-florida.html">jumbo-capable fixed lines</a>.</p>
<h2 ${H2}>Island Logistics, Solved</h2>
<p>Causeway scheduling, material staging on constrained lots, coordination with the trades still rebuilding around you, and the environmental care Sanibel's character demands, island projects are logistics projects, and our proposals plan them explicitly: delivery windows, staging, protection, cleanup. The islands are rebuilding around a community standard; installation should honor it.</p>
<h2 ${H2}>Insurance in the Post-Ian Era</h2>
<p>Nowhere in Florida is protection documentation worth more: full impact coverage earns wind mitigation credits up to 35% on the windstorm portion, via <a href="/pages/wind-mitigation-inspection.html">inspection</a>, and insurability itself increasingly follows demonstrated hardening on the islands. Qualifying homeowners access <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a> ($2 per $1, up to $10,000) toward the work, with <a href="/pages/financing.html">financing</a> bridging rebuild budgets.</p>
<h2 ${H2}>Book Your Island Consultation</h2>
<p>An estimator experienced in island work visits, reads your rebuild or hardening scope, and delivers an exact, logistics-inclusive proposal with insurance documentation planned. Ground zero deserves the gold standard.</p>`,
  related: [['Fort Myers','/pages/impact-windows-fort-myers.html'],['Cape Coral','/pages/impact-windows-cape-coral.html'],['New Construction Programs','/pages/new-construction-impact-windows-florida.html'],['Bonita Springs','/pages/impact-windows-bonita-springs.html']].concat(CITY_RELATED.slice(0,4)),
},
{
  slug: 'impact-windows-port-charlotte', crumb: 'Port Charlotte',
  title: 'Impact Windows Port Charlotte FL | Waterfront Value, Hardened',
  desc: 'Impact windows for Port Charlotte: Charlotte County\'s canal-country value market, Ian-era urgency, retiree-friendly financing, insurance savings and MSFH grants.',
  h1: 'Impact Windows Port Charlotte: Canal Country&apos;s Value Fortress',
  faqs: cityFaqs('Port Charlotte','Charlotte County',{q:'Is impact protection affordable on Port Charlotte budgets?', a:'That is exactly where the funding stack shines: My Safe Florida Home grants match $2 per $1 up to $10,000, wind mitigation credits cut premiums up to 35% on the windstorm portion, and 0% financing spreads the balance, bringing full protection within reach of the fixed-income households Port Charlotte is famous for.'}),
  body: `<p>Port Charlotte is Southwest Florida's great value story: canal-laced neighborhoods where waterfront living costs a fraction of the coasts, home to retirees and working families who watched Charley in 2004 and Ian in 2022 bracket their community with proof of what protection means. Florida Impact Shield serves Port Charlotte with the same engineering the luxury coasts get, delivered with the funding stack, grants, credits, financing, that value-market budgets deserve.</p>
<div class="callout"><p><strong>Port Charlotte service from Florida Impact Shield:</strong> Impact windows and doors for canal country's homes, value-engineered packages, grant and financing guidance, and the insurance documentation Charlotte County premiums reward.</p></div>
<h2 ${H2}>Canal Country Coverage</h2>
<p>From the waterway grids off Edgewater and Midway to the Harbor-view streets and inland ranches, Port Charlotte projects center on the Florida classics: single-hungs and horizontal rollers at value pricing (the <a href="/pages/lawson-windows-florida.html">Lawson</a> and <a href="/pages/pgt-impact-windows-florida.html">PGT</a> conversation), <a href="/pages/impact-patio-doors-florida.html">sliders</a> to lanais and docks, and per-opening arithmetic that respects the budget. Waterfront lots get salt-appropriate finishes and exposure-calculated pressures as standard.</p>
<h2 ${H2}>Between Charley and Ian</h2>
<p>Port Charlotte has watched both regional benchmarks: Charley's wind lesson in 2004 and Ian's water-and-wind exam in 2022, and the community conclusion matches the engineering: sealed envelopes decide outcomes, and impact glass keeps envelopes sealed, the evidence our <a href="/pages/do-impact-windows-really-work-in-a-hurricane.html">proof guide</a> assembles. In a market where many homes predate modern code, the upgrade gap is the whole story.</p>
<h2 ${H2}>The Funding Stack That Makes It Possible</h2>
<p>This is where Port Charlotte wins: <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a> match $2 per $1 up to $10,000 for qualifying homeowners, wind mitigation credits then cut premiums up to 35% on the windstorm portion via <a href="/pages/wind-mitigation-inspection.html">inspection</a>, and <a href="/pages/financing.html">0% financing</a>, plus our <a href="/pages/impact-windows-financing-bad-credit-florida.html">credit-flexible options</a>, carry the balance. Full protection, fixed-income arithmetic, honestly mapped.</p>
<h2 ${H2}>Get Your Port Charlotte Quote</h2>
<p>A licensed estimator visits within 48 hours, measures your openings, and delivers exact pricing with the complete funding stack calculated, grant, credits, financing, before you spend a dollar. Value living deserves fortress protection.</p>`,
  related: [['Punta Gorda','/pages/impact-windows-punta-gorda.html'],['Cape Coral','/pages/impact-windows-cape-coral.html'],['Financing Bad Credit','/pages/impact-windows-financing-bad-credit-florida.html'],['Sarasota','/pages/impact-windows-sarasota.html']].concat(CITY_RELATED.slice(0,4)),
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
