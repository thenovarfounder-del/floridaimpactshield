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
  slug: 'will-impact-windows-break-in-a-storm',
  crumb: 'Will Impact Windows Break?',
  title: 'Will Impact Windows Break in a Storm? What Actually Happens',
  desc: 'Will hurricane impact windows break during a storm? What laminated glass is designed to do, why cracked-but-holding means success, testing standards, and real Florida evidence.',
  h1: 'Will Impact Windows Break in a Storm? Yes, And That Is the Design',
  faqs: [
    {q:'Can hurricane debris crack impact glass?', a:'Yes, a hard enough strike can crack the outer glass layer. What it cannot do, by design and by test, is punch through: the interlayer holds the cracked glass in place, keeping the opening sealed against wind and water. Cracked-but-holding is the system working exactly as engineered.'},
    {q:'What happens after impact glass cracks in a hurricane?', a:'Your envelope stays sealed through the storm, which is the entire mission. Afterward, the glass unit is replaced to restore full rating, typically an insurance-claimable repair far smaller than the interior and roof damage a breached opening causes.'},
    {q:'How are impact windows tested?', a:'Large-missile testing fires a 9-pound 2x4 at the glass at roughly 50 feet per second, followed by thousands of positive and negative pressure cycles simulating hurricane gusts. Products pass only if the opening stays sealed, with Miami-Dade HVHZ protocols setting the strictest bar.'},
    {q:'Did impact windows actually work in recent Florida hurricanes?', a:'Yes. From Charley through Ian, post-code homes with impact protection consistently kept envelopes sealed while older openings failed, the street-by-street evidence behind Southwest Florida\'s replacement wave and the insurance industry\'s wind mitigation credits.'},
  ],
  body: `<p>Here is the answer nobody in a sales office leads with: yes, impact windows can break in a storm, and that is precisely how they are designed to succeed. The question confuses two different failures. Ordinary glass breaks and disappears, leaving a hole for hurricane wind to pressurize your home. Impact glass may crack, but the crack is where the story ends: the glass stays in the frame, the opening stays sealed, and your roof stays attached. Understanding this distinction is understanding the entire product.</p>
<div class="callout"><p><strong>The one-sentence version:</strong> Impact windows are not unbreakable, they are unbreachable. Cracked-but-holding is a passing grade; a hole in your wall is the failure they exist to prevent.</p></div>
<h2 ${H2}>What Laminated Glass Actually Does</h2>
<p>Impact glass sandwiches a tough polymer interlayer between glass sheets, the same architecture as a car windshield, engineered far stronger. When debris strikes, the glass layers may fracture, but the interlayer grips every shard and keeps the panel in its reinforced frame. Wind cannot enter; rain cannot enter; the pressure differential that lifts roofs never develops. The window has absorbed the hit and kept the envelope, which is the entire assignment.</p>
<h2 ${H2}>Why the Envelope Is Everything</h2>
<p>Hurricane damage compounds through openings: one breached window lets wind pressurize the interior, pushing up on the roof deck and out on the walls while rain destroys everything inside. Post-storm engineering studies keep finding the same sequence, envelope breach first, catastrophe second, which is why Florida code, insurers and the <a href="/pages/wind-mitigation-inspection.html">wind mitigation system</a> all obsess over opening protection. Our <a href="/pages/do-impact-windows-really-work-in-a-hurricane.html">evidence guide</a> assembles the real-storm record.</p>
<h2 ${H2}>The Testing Behind the Promise</h2>
<p>Certification is brutal by design: the large-missile test fires a 9-pound 2x4 at the assembly at roughly 50 feet per second, then the cracked unit endures thousands of pressure cycles simulating gust after gust. Pass means sealed throughout. Miami-Dade's HVHZ protocol, the <a href="/pages/miami-dade-noa-approval-explained.html">NOA system</a>, sets the strictest version, and our <a href="/pages/impact-window-ratings-explained.html">ratings guide</a> decodes DP numbers and missile levels for shoppers.</p>
<h2 ${H2}>If Your Glass Cracks: The Aftermath</h2>
<p>A cracked-but-holding window after a storm did its job and earned retirement: the glass unit gets replaced to restore full rating, a contained <a href="/pages/impact-window-repair-florida.html">repair</a>, frequently insurance-claimable, measured in hundreds, against the tens of thousands a breached envelope costs. Keep the product approvals in your records; they document the rating your replacement must match.</p>
<h2 ${H2}>Protection That Expects the Hit</h2>
<p>A licensed estimator visits within 48 hours, engineers protection to your wind zone, and prices it exactly, with the insurance credits (up to 35% off the windstorm portion) and <a href="/pages/my-safe-florida-home-grants.html">grant funding</a> that reward doing it right. Build for the hit; that is the point.</p>`,
  related: [['Do Impact Windows Really Work','/pages/do-impact-windows-really-work-in-a-hurricane.html'],['Ratings Explained (DP/NOA)','/pages/impact-window-ratings-explained.html'],['Miami-Dade NOA Explained','/pages/miami-dade-noa-approval-explained.html'],['Impact Window Repair','/pages/impact-window-repair-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'do-i-still-need-shutters-with-impact-windows',
  crumb: 'Still Need Shutters?',
  title: 'Do I Still Need Hurricane Shutters With Impact Windows?',
  desc: 'Do impact windows eliminate the need for hurricane shutters? Code, insurance and engineering answers, when belt-and-suspenders makes sense, and what to do with old shutters.',
  h1: 'Do I Still Need Shutters With Impact Windows? The Straight Answer',
  faqs: [
    {q:'Do impact windows meet code without shutters?', a:'Yes. Impact-rated glazing is complete opening protection under the Florida Building Code, no shutters required. Shutters-over-ordinary-glass and impact glass are alternative paths to the same requirement; you need one, not both.'},
    {q:'Will insurance give bigger discounts for shutters plus impact windows?', a:'No. Wind mitigation credits recognize protected openings, and impact glazing already earns the full opening-protection credit. Adding shutters over impact glass does not stack additional discount.'},
    {q:'Should I keep my old shutters after installing impact windows?', a:'It is optional. Some owners keep panels for personal belt-and-suspenders comfort on extreme exposures; most retire them, reclaiming storage and skipping deployment forever. Either way, your code and insurance position is complete with the impact glass alone.'},
    {q:'Is there any case where shutters still make sense?', a:'Shutters remain the budget path for protecting ordinary glass you have not yet replaced, and some owners add them over impact glass on direct oceanfront for redundancy. Engineering-wise, rated impact glazing alone is designed for the full storm.'},
  ],
  body: `<p>It is the question every impact window owner eventually asks while staring at a garage shelf of metal panels: do I still need these? The straight answer: no, impact windows are complete protection on their own, by code, by insurance rules, and by the engineering they are certified under. Shutters and impact glass are two different answers to the same requirement, not two layers of one answer. Here is the full picture, including the honest cases where panels still earn their shelf space.</p>
<div class="callout"><p><strong>The one-sentence version:</strong> Impact glazing satisfies Florida's opening-protection requirement entirely, shutters over it add no code status and no insurance discount, only optional peace of mind.</p></div>
<h2 ${H2}>What the Code Says</h2>
<p>Florida Building Code requires opening protection in wind-borne debris regions and offers alternative compliance paths: impact-rated glazing, or code-approved coverings (shutters, panels) over ordinary glass. Impact glass is not the deluxe add-on to shutters; it is the parallel, permanent path, tested to the same missile-and-pressure standards our <a href="/pages/impact-window-ratings-explained.html">ratings guide</a> decodes. One path, fully taken, is compliance.</p>
<h2 ${H2}>What Insurance Says</h2>
<p>Wind mitigation credits reward protected openings, and impact glazing earns the full credit class on its own, up to 35% off the windstorm portion of your premium, documented through a <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a>. Panels over impact glass stack no additional discount; the opening is already protected in your insurer's eyes. The complete comparison lives in our <a href="/pages/impact-windows-vs-hurricane-shutters-florida.html">windows-vs-shutters guide</a>.</p>
<h2 ${H2}>What the Engineering Says</h2>
<p>Certified impact assemblies are tested for the whole storm: large-missile strikes followed by thousands of pressure cycles, sealed throughout, with <a href="/pages/miami-dade-noa-approval-explained.html">Miami-Dade NOA</a> products passing the strictest version. The design assumption is no shutter in front, the glass takes the hit and holds. Redundancy over that is a personal comfort choice, not an engineering requirement, the same logic as our <a href="/pages/will-impact-windows-break-in-a-storm.html">what-happens-when-it-cracks</a> explainer.</p>
<h2 ${H2}>The Honest Edge Cases</h2>
<p>Two scenarios keep shutters relevant. Unconverted openings: panels remain the budget bridge protecting ordinary glass you have not yet replaced, common in phased projects. Extreme-exposure redundancy: a minority of direct-oceanfront owners keep panels for the once-a-decade monster, engineering says unnecessary, psychology sometimes disagrees, and both are fine. What no longer makes sense is deploying panels over rated glass every August out of habit.</p>
<h2 ${H2}>Retire the Panels Properly</h2>
<p>A licensed estimator visits within 48 hours, confirms your openings are fully rated (the <a href="/pages/impact-cabana-doors-florida.html">forgotten cabana door</a> is the classic gap), documents your wind mitigation position, and prices any remaining conversions, so the shelf can finally be reclaimed. Permanent protection means never lifting a panel again.</p>`,
  related: [['Windows vs Shutters','/pages/impact-windows-vs-hurricane-shutters-florida.html'],['Will Impact Windows Break','/pages/will-impact-windows-break-in-a-storm.html'],['Windows vs Plywood','/pages/impact-windows-vs-plywood-florida.html'],['Wind Mitigation Inspections','/pages/wind-mitigation-inspection.html']].concat(COMMON_RELATED),
},
{
  slug: 'how-long-does-impact-window-installation-take',
  crumb: 'Installation Time',
  title: 'How Long Does Impact Window Installation Take in Florida?',
  desc: 'Impact window installation timelines: per-window minutes, whole-home days, and the real project calendar, measure, permits, manufacturing lead times, install and inspection.',
  h1: 'How Long Does Impact Window Installation Take? The Honest Timeline',
  faqs: [
    {q:'How long does it take to install one impact window?', a:'Experienced crews average 30 to 90 minutes per standard window opening, with doors and oversized units running longer. The install day moves fast; it is the weeks before, product manufacturing and permitting, that set the real calendar.'},
    {q:'How many days does a whole-home installation take?', a:'Most single-family homes complete in one to three on-site days: a typical 10-15 window home is often one long day, larger homes with doors and sliders two to three. Every opening cut is weather-sealed the same day, your home is never left open overnight.'},
    {q:'What is the total project timeline from contract to done?', a:'Plan six to twelve weeks: measure and engineering first, then manufacturing lead times of roughly four to ten weeks depending on product and season, permits processed in parallel, then the one-to-three-day install and final inspection. Ordering before hurricane season beats the rush.'},
    {q:'Can I live in my home during installation?', a:'Yes, virtually everyone does. Crews work opening by opening, room by room, with dust protection and same-day sealing; normal life continues around the work, and pets simply get a closed door away from the action.'},
  ],
  body: `<p>Two clocks run on every impact window project, and confusing them causes most timeline surprises. The install clock is fast: crews average 30 to 90 minutes per window, and whole homes finish in one to three days. The project clock is longer: manufacturing lead times, permitting and inspection wrap the fast install in a six-to-twelve-week calendar. Here is the honest breakdown of both, and how to schedule smart in a state where everyone remembers windows in September.</p>
<div class="callout"><p><strong>The one-sentence version:</strong> Days on site, weeks on the calendar, one to three installation days inside a six-to-twelve-week project driven mostly by product manufacturing.</p></div>
<h2 ${H2}>The Project Calendar, Stage by Stage</h2>
<p>Week zero: the free in-home measure, every opening sized, products selected, exact quote delivered. On approval, two clocks start in parallel: manufacturing (your windows are built to order, typically four to ten weeks by product line and season) and permitting (your city or county processes while the factory builds). Then installation, the fast part below, then final inspection closes the permit and your <a href="/pages/wind-mitigation-inspection.html">wind mitigation inspection</a> documents the insurance credits. Six to twelve weeks contract-to-credit is the honest planning number.</p>
<h2 ${H2}>Installation Days: What Actually Happens</h2>
<p>Crews run opening by opening: old unit out, opening prepped, new unit anchored to the tested schedule, shimmed square, flashed and sealed, 30 to 90 minutes per standard window, longer for <a href="/pages/impact-door-installation-florida.html">doors</a> and oversized glass. A 10-15 window home is commonly one long day; larger homes with sliders and entries run two to three. The iron rule: every opening cut is weather-sealed the same day. Your home is never exposed overnight, whatever the forecast.</p>
<h2 ${H2}>What Moves the Timeline</h2>
<p>Product choice moves it most: standard vinyl lines run the short end of lead times, custom colors, oversized and <a href="/pages/frameless-impact-windows-florida.html">specialty systems</a> the long end. Season moves it second: post-storm and pre-season surges stretch every factory in the state, spring orders install in calm; September orders join a queue. Jurisdiction moves permits modestly, and our project managers keep all three clocks visible from day one.</p>
<h2 ${H2}>Scheduling Smart in Florida</h2>
<p>The pattern to beat: half the state remembers windows when a storm is named, and lead times double. Ordering in the calm months, fall through spring, buys shorter factory queues, calmer install scheduling and full protection before June. Our <a href="/pages/best-time-to-buy-impact-windows-florida.html">best-time-to-buy guide</a> maps the seasonal arithmetic, including how <a href="/pages/my-safe-florida-home-grants.html">grant timing</a> fits the calendar.</p>
<h2 ${H2}>Start Your Clock</h2>
<p>A licensed estimator visits within 48 hours, and the measure that starts everything takes about an hour, exact price, product lead times and your real calendar, delivered before you commit a dollar. The best week to start was last week; the second best is this one.</p>`,
  related: [['Best Time to Buy','/pages/best-time-to-buy-impact-windows-florida.html'],['Impact Window Replacement','/pages/impact-window-replacement-florida.html'],['Impact Door Installation','/pages/impact-door-installation-florida.html'],['Permits in Florida','/pages/impact-windows-permit-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'low-e-glass-impact-windows-explained',
  crumb: 'Low-E Explained',
  title: 'Low-E Glass in Impact Windows Explained | Florida Buyer&apos;s Guide',
  desc: 'What Low-E glass means in Florida impact windows: how the coating works, why it matters in cooling climates, SHGC numbers, tint comparisons and whether it is worth it.',
  h1: 'Low-E Glass Explained: The Invisible Coating That Fights Florida Heat',
  faqs: [
    {q:'What does Low-E mean?', a:'Low-E is short for low emissivity: a microscopically thin metallic coating on the glass that reflects infrared heat while passing visible light. In Florida it is applied to bounce the sun\'s heat back outside, cutting cooling loads without darkening your view.'},
    {q:'Is Low-E worth it on impact windows in Florida?', a:'For most homes, clearly yes: the coating typically adds a modest premium per window and works every sunny day for decades, with west- and south-facing glass paying back fastest. It is the default recommendation on the vast majority of our projects.'},
    {q:'What is SHGC and what number should I want?', a:'Solar Heat Gain Coefficient measures how much solar heat passes through, lower blocks more. Florida\'s cooling climate favors low SHGC glass, with product labels disclosing the number so packages can be compared directly. Your estimator matches targets to each elevation.'},
    {q:'Is Low-E the same as tinted glass?', a:'No. Tint absorbs light and darkens the view to reduce heat; Low-E reflects heat while staying visually clear. They can be combined, but Low-E does the efficiency work without the sunglasses effect, which is why it has become the Florida standard.'},
  ],
  body: `<p>Every impact window quote in Florida eventually says &quot;Low-E,&quot; and most buyers nod without knowing they are being offered the highest-leverage energy upgrade in the package. Low-E, low emissivity, is an invisible metallic coating that treats sunlight like a bouncer treats a guest list: visible light comes in, infrared heat gets turned away. In a state that air-conditions ten months a year, that filter changes the electric bill. Here is the plain-language guide.</p>
<div class="callout"><p><strong>The one-sentence version:</strong> Low-E is a clear heat-reflecting coating that keeps Florida sun from becoming Florida cooling cost, standard-recommendation glass on nearly every project we quote.</p></div>
<h2 ${H2}>How an Invisible Coating Blocks Heat</h2>
<p>Sunlight arrives as visible light you want and infrared heat you do not. The Low-E layer, metal deposited thinner than a soap bubble on a glass surface inside the unit, is transparent to the visible spectrum and reflective to infrared, bouncing solar heat back outside before it loads your AC. The same physics works in reverse on rare cold nights, reflecting interior warmth back in. No dimming, no mirror look on modern coatings, just selective physics on duty every daylight hour.</p>
<h2 ${H2}>The Numbers on the Label</h2>
<p>Two figures decode any glass package. SHGC (Solar Heat Gain Coefficient): the share of solar heat that gets through, Florida wants it low, and Low-E is how packages get there. U-factor: overall insulation, where laminated-insulated impact units already excel. Comparing quotes means comparing these numbers, not adjectives, and our <a href="/pages/impact-windows-energy-savings-florida.html">energy savings guide</a> translates them into monthly-bill terms for Florida homes.</p>
<h2 ${H2}>Low-E vs Tint vs Both</h2>
<p>Tint fights heat by absorption, darkening the glass and the room; Low-E fights it by reflection, staying clear. Modern practice: Low-E as the workhorse everywhere, with light tints added only where glare or privacy argue for them, ocean-facing walls, west exposures, so you keep the view the windows were bought for. The combination decisions are elevation-by-elevation calls your estimator walks with you.</p>
<h2 ${H2}>Worth It? The Florida Arithmetic</h2>
<p>Low-E adds a modest per-window premium and then works free for decades: cooling savings compound monthly, <a href="/pages/impact-windows-uv-protection-florida.html">UV filtering</a> protects floors and furnishings as a bonus, and the coating never wears, needs no maintenance, and never gets deployed or removed. On west and south glass the payback runs fastest; across a whole home it is simply the correct default, which is why it anchors nearly every package we install.</p>
<h2 ${H2}>Get the Right Glass Speced</h2>
<p>A licensed estimator visits within 48 hours, reads your elevations and exposures, and specs Low-E packages elevation by elevation with exact pricing, plus the insurance credits and <a href="/pages/my-safe-florida-home-grants.html">grant funding</a> that offset the whole project. Clear glass, cold house, honest numbers.</p>`,
  related: [['Energy Savings Guide','/pages/impact-windows-energy-savings-florida.html'],['UV Protection','/pages/impact-windows-uv-protection-florida.html'],['Laminated vs Tempered','/pages/laminated-vs-tempered-glass-florida.html'],['Impact Window Costs','/pages/how-much-do-impact-windows-cost-florida.html']].concat(COMMON_RELATED.slice(1)),
},
{
  slug: 'laminated-vs-tempered-glass-florida',
  crumb: 'Laminated vs Tempered',
  title: 'Laminated vs Tempered Glass Florida | Which Is Hurricane-Rated?',
  desc: 'Laminated vs tempered glass for Florida homes: how each breaks, why only laminated earns impact ratings, where tempered belongs, and how the two combine in real windows.',
  h1: 'Laminated vs Tempered Glass: Only One Stops a Hurricane',
  faqs: [
    {q:'Is tempered glass hurricane-proof?', a:'No. Tempered glass is safety glass, four to five times stronger than ordinary glass, breaking into blunt pebbles instead of shards, but when it breaks it vacates the opening entirely, exactly what hurricanes exploit. Only laminated glass earns impact ratings.'},
    {q:'What makes laminated glass impact-rated?', a:'The polymer interlayer bonded between glass sheets: struck glass may crack, but the interlayer holds every piece in the frame, keeping the opening sealed against wind and water through the missile and pressure-cycle tests certification requires.'},
    {q:'Can a window be both laminated and tempered?', a:'Yes, premium impact units often temper the individual glass sheets before laminating them, stacking tempered strength inside laminated integrity. Heat-strengthened glass plays a similar role in many approved makeups.'},
    {q:'Where does tempered glass still belong in my home?', a:'Interior safety locations: shower enclosures, glass railings, furniture, and code-required safety glazing where hurricane rating is not the mission. For any exterior opening in wind-borne debris regions, laminated impact glass is the requirement.'},
  ],
  body: `<p>Both get called &quot;safety glass,&quot; both cost more than ordinary glass, and only one of them will keep a hurricane out of your living room. The laminated-versus-tempered confusion sells a lot of wrong glass in Florida, so here is the clean distinction: tempered glass breaks safely; laminated glass refuses to leave. In a windstorm, that difference is the whole game.</p>
<div class="callout"><p><strong>The one-sentence version:</strong> Tempered breaks into harmless pebbles, and exits the opening; laminated cracks but stays sealed in the frame, which is why every impact rating in Florida belongs to laminated glass.</p></div>
<h2 ${H2}>Two Technologies, Two Missions</h2>
<p>Tempered glass is heat-treated for compression: four to five times ordinary strength, and when it finally breaks it crumbles into blunt granules, engineered to not lacerate, which is why codes demand it in showers, railings and door-adjacent glazing. Laminated glass bonds a tough polymer interlayer between glass sheets: strikes may crack the glass, but the interlayer grips every fragment and keeps the panel sealed in its frame. Tempered protects people from broken glass; laminated protects buildings from open holes.</p>
<h2 ${H2}>Why Hurricanes Only Respect Laminated</h2>
<p>A hurricane does not care how politely glass breaks, it cares whether the opening stays closed. Tempered glass, however strong, vacates completely at failure, handing the storm the breach that pressurizes homes and lifts roofs. Laminated assemblies pass the certification gauntlet, the 2x4 missile strike, then thousands of pressure cycles, precisely because cracked-but-holding keeps the envelope, the design philosophy our <a href="/pages/will-impact-windows-break-in-a-storm.html">what-happens-when-it-breaks</a> guide unpacks and the <a href="/pages/impact-window-ratings-explained.html">ratings system</a> certifies.</p>
<h2 ${H2}>The Premium Move: Both at Once</h2>
<p>High-spec impact units stack the technologies: individual sheets tempered or heat-strengthened first, then laminated together, tempered strength inside laminated integrity, common in large lites, doors and <a href="/pages/impact-picture-windows-florida.html">oversized fixed glass</a> where loads run highest. Add insulated construction and <a href="/pages/low-e-glass-impact-windows-explained.html">Low-E coatings</a> and you have the modern Florida makeup: laminated-insulated Low-E, storm-rated and efficiency-rated in one unit.</p>
<h2 ${H2}>The Buyer&apos;s Checklist</h2>
<p>Exterior openings in wind-borne debris regions: laminated impact glass with product approvals for your zone, <a href="/pages/miami-dade-noa-approval-explained.html">Miami-Dade NOAs</a> in the HVHZ, no exceptions, and beware any pitch implying tempered alone is &quot;hurricane glass.&quot; Interior safety locations: tempered, as code intends. Documentation of the approved makeup goes in your wind mitigation file, where it earns the insurance credits below.</p>
<h2 ${H2}>Get the Right Glass on Your House</h2>
<p>A licensed estimator visits within 48 hours, specs approved laminated makeups to your openings and wind zone, and prices exactly, with wind mitigation credits (up to 35% off the windstorm portion) and <a href="/pages/my-safe-florida-home-grants.html">grant funding</a> in the math. The right glass refuses to leave; so do the savings.</p>`,
  related: [['Will Impact Windows Break','/pages/will-impact-windows-break-in-a-storm.html'],['Ratings Explained','/pages/impact-window-ratings-explained.html'],['Low-E Explained','/pages/low-e-glass-impact-windows-explained.html'],['Miami-Dade NOA Explained','/pages/miami-dade-noa-approval-explained.html']].concat(COMMON_RELATED.slice(1)),
},
{
  slug: 'signs-you-need-new-windows-florida',
  crumb: 'Signs You Need New Windows',
  title: '9 Signs It&apos;s Time to Replace Your Windows in Florida',
  desc: 'How to know your Florida windows need replacing: fog between panes, corrosion, operation failures, water intrusion, energy creep, and the pre-1994 code question.',
  h1: 'Signs It&apos;s Time to Replace Your Windows: Florida&apos;s 9-Point Checkup',
  faqs: [
    {q:'What is the clearest sign a window needs replacement?', a:'Structural frame failure, corrosion, rot, separation from the wall, ends the repair conversation: the frame is what every rating depends on. Fog, hardware failures and drafts can often be repaired; failed frames cannot.'},
    {q:'My windows are original to a pre-1994 Florida home, should I replace them?', a:'Almost certainly yes. Pre-Andrew windows predate modern impact standards entirely: they are unrated openings in hurricane country, and replacement upgrades protection, insurance position and efficiency in one move, with grants offsetting the cost.'},
    {q:'Is foggy glass a replacement sign or a repair?', a:'Fog between panes means a failed seal, repairable by replacing the glass unit if the window is otherwise sound and parts exist. Fog across many windows of the same age usually signals the fleet is failing together, when replacement math takes over.'},
    {q:'Do old windows really raise insurance costs?', a:'Unprotected openings forfeit wind mitigation credits worth up to 35% on the windstorm portion of Florida premiums, so aging non-impact windows cost you every renewal, silently, the strongest financial argument for replacement.'},
  ],
  body: `<p>Windows rarely fail loudly; they fail by inches, a little harder to open each year, a little foggier, a little more expensive on the electric bill, until a storm season asks a question they can no longer answer. Florida adds its own clock: sun, salt, humidity and code eras that date your glass precisely. Here is the 9-point checkup, which signs mean repair, which mean replacement, and which mean now.</p>
<div class="callout"><p><strong>The one-sentence version:</strong> Cosmetic and hardware issues often repair; failed frames, fleet-wide fog, water intrusion and pre-1994 unrated glass are replacement territory, and the insurance math usually agrees.</p></div>
<h2 ${H2}>The Nine Signs</h2>
<p><strong>1. Fog or moisture between panes:</strong> failed seals; unit-replaceable alone, fleet fog means the generation is done. <strong>2. Frames corroding, rotting or separating:</strong> structural, and decisive, ratings die with frames. <strong>3. Windows that fight you:</strong> swollen, racked or hardware-dead units that no longer open (or lock) are failing at their two jobs. <strong>4. Water intrusion during rain:</strong> staining, soft drywall, musty sills, envelope failure in progress. <strong>5. Energy creep:</strong> rooms the AC cannot hold and bills that outrun the neighborhood point at single-pane and dead-seal glass. <strong>6. Noise arriving uninvited:</strong> old glass transmits; modern laminated units hush streets, our <a href="/pages/impact-windows-noise-reduction-florida.html">noise guide</a> explains. <strong>7. UV fade on floors and furniture:</strong> unfiltered glass is bleaching your interior, see <a href="/pages/impact-windows-uv-protection-florida.html">UV protection</a>. <strong>8. Pre-1994 vintage:</strong> pre-Andrew windows predate impact standards entirely, unrated openings in hurricane country. <strong>9. Shutters as your only protection:</strong> panels over aging glass is a deployment gamble, and the modern alternative retires it.</p>
<h2 ${H2}>Repair or Replace: The Honest Line</h2>
<p>One foggy unit, tired balances, worn rollers: <a href="/pages/impact-window-repair-florida.html">repair</a>, and we do it to approved spec. Failed frames, multi-window fog, chronic intrusion, obsolete lines without parts, or per-opening repair totals crowding replacement pricing: the <a href="/pages/impact-window-replacement-florida.html">replacement conversation</a>, where new laminated-insulated impact units reset protection, efficiency and warranties at once. We show both columns of arithmetic and let you choose.</p>
<h2 ${H2}>The Insurance Clock Running Either Way</h2>
<p>Here is the sign hiding on your renewal notice: unprotected openings forfeit wind mitigation credits worth up to 35% of the windstorm portion, so old windows charge you annually while protecting you never. Replacement flips the ledger, credits via <a href="/pages/wind-mitigation-inspection.html">inspection</a>, <a href="/pages/my-safe-florida-home-grants.html">My Safe Florida Home grants</a> matching $2 per $1 up to $10,000, and <a href="/pages/do-impact-windows-increase-home-resale-value-florida.html">resale value</a> that remembers the upgrade.</p>
<h2 ${H2}>Get the 9-Point Checkup Done Professionally</h2>
<p>A licensed estimator visits within 48 hours, runs every opening through the checkup, and delivers the honest verdict with exact pricing both ways, repair where repair wins, replacement where it does not, grants and credits calculated. Windows fail by inches; catch yours before the season asks.</p>`,
  related: [['Impact Window Repair','/pages/impact-window-repair-florida.html'],['Impact Window Replacement','/pages/impact-window-replacement-florida.html'],['How Long Windows Last','/pages/how-long-do-impact-windows-last-florida.html'],['Resale Value Guide','/pages/do-impact-windows-increase-home-resale-value-florida.html']].concat(COMMON_RELATED),
},
{
  slug: 'impact-window-ratings-explained',
  crumb: 'Ratings Explained',
  title: 'Impact Window Ratings Explained | DP, Missile Levels, HVHZ &amp; NOA',
  desc: 'Decode impact window ratings: design pressure (DP) numbers, large vs small missile levels, HVHZ requirements, NOAs and Florida Product Approvals, a plain-language buyer\'s guide.',
  h1: 'Impact Window Ratings Explained: DP, Missiles and the HVHZ, Decoded',
  faqs: [
    {q:'What does a DP rating mean on impact windows?', a:'Design Pressure measures the wind load a window is certified to resist, positive (pushing in) and negative (pulling out), in pounds per square foot. Higher DP means stronger; your required DP comes from your home\'s wind zone, exposure and the opening\'s position, calculated during permitting.'},
    {q:'What is the difference between large and small missile ratings?', a:'Large-missile testing fires a 9-pound 2x4 at the assembly, required for glazing within 30 feet of grade where heavy debris flies; small-missile testing uses steel balls for higher elevations. Residential openings across Florida overwhelmingly require the large-missile standard.'},
    {q:'What is the HVHZ?', a:'The High-Velocity Hurricane Zone, Miami-Dade and Broward counties, where the Florida Building Code imposes its strictest wind provisions and products must carry Miami-Dade NOAs or equivalent HVHZ approvals, the toughest certification in the country.'},
    {q:'How do I verify a window is properly approved for my area?', a:'Ask for the approval document: a Miami-Dade NOA or Florida Product Approval number matching the exact product and configuration quoted, and confirm the DP meets your engineering. Licensed contractors provide this paperwork as standard; treat its absence as a red flag.'},
  ],
  body: `<p>Impact window shopping drops you into alphabet soup, DP-50, large missile Level D, HVHZ, NOA, FL numbers, and the soup matters: these codes are the difference between marketing glass and certified protection. The good news is the system decodes in minutes. Here is the plain-language key to every rating on a Florida window quote, and how to use it to compare bids like an inspector.</p>
<div class="callout"><p><strong>The one-sentence version:</strong> DP numbers measure wind strength, missile levels measure debris resistance, and HVHZ/NOA/Florida approvals prove a lab verified both, ask for the paperwork and the codes read themselves.</p></div>
<h2 ${H2}>Design Pressure: The Strength Number</h2>
<p>DP ratings state the wind load, in pounds per square foot, a unit resists pushing in (positive) and pulling out (negative, usually the harsher demand). Your required DP is not a guess: engineering derives it from wind speed maps, exposure category, building height and each opening's position, corners work harder than centers, during permitting. The buying rule: certified DP meets or beats calculated demand, per opening, on paper.</p>
<h2 ${H2}>Missile Levels: The Debris Test</h2>
<p>Certification fires real objects at real assemblies: the large-missile test launches a 9-pound 2x4 at roughly 50 feet per second, the standard for glazing within 30 feet of grade where roof tiles and lumber fly, then survivors endure thousands of pressure cycles simulating gust after gust, cracked-but-sealed throughout, the philosophy our <a href="/pages/will-impact-windows-break-in-a-storm.html">what-happens-when-it-breaks</a> guide unpacks. Small-missile (steel ball) testing serves higher elevations; virtually all Florida residential work specs large-missile product.</p>
<h2 ${H2}>HVHZ, NOA and Florida Approvals: The Paperwork That Proves It</h2>
<p>Approvals are where claims become certifications. Statewide, Florida Product Approval (FL) numbers document tested compliance; in the High-Velocity Hurricane Zone, Miami-Dade and Broward, products must carry Miami-Dade NOAs, the strictest protocol in the nation and the de facto gold standard everywhere (our <a href="/pages/miami-dade-noa-approval-explained.html">NOA deep-dive</a> covers the system). The approval must match the exact product, size range and configuration quoted, and installation must follow the approved anchoring, which is where licensed installation earns its keep.</p>
<h2 ${H2}>Reading a Quote Like an Inspector</h2>
<p>Four checks: approval numbers present and matching the products quoted; DP ratings stated and meeting your engineering; large-missile certification for grade-level openings; and the installer licensed and permitting, unpermitted work orphans every rating. These same documents feed your <a href="/pages/wind-mitigation-inspection.html">wind mitigation file</a>, where certified protection converts to insurance credits worth up to 35% of the windstorm portion.</p>
<h2 ${H2}>Get Certified Protection, Documented</h2>
<p>A licensed estimator visits within 48 hours, engineers DP requirements to your openings, specs approved product with the paperwork attached, and prices exactly, credits and <a href="/pages/my-safe-florida-home-grants.html">grant funding</a> included. The codes protect buyers who read them; now you do.</p>`,
  related: [['Miami-Dade NOA Explained','/pages/miami-dade-noa-approval-explained.html'],['Will Impact Windows Break','/pages/will-impact-windows-break-in-a-storm.html'],['Laminated vs Tempered','/pages/laminated-vs-tempered-glass-florida.html'],['Permits in Florida','/pages/impact-windows-permit-florida.html']].concat(COMMON_RELATED.slice(1)),
},
{
  slug: 'miami-dade-noa-approval-explained',
  crumb: 'Miami-Dade NOA',
  title: 'Miami-Dade NOA Approval Explained | Why It&apos;s the Gold Standard',
  desc: 'What a Miami-Dade NOA (Notice of Acceptance) means: the testing behind it, where it is required, why it became the national gold standard, and how to verify one.',
  h1: 'Miami-Dade NOA Explained: The Toughest Stamp in American Windows',
  faqs: [
    {q:'What is a Miami-Dade NOA?', a:'A Notice of Acceptance is Miami-Dade County\'s product certification: documentation that a specific window or door system passed the county\'s HVHZ testing protocol, large-missile impact, cyclic pressure, water and structural, and is approved for use in the nation\'s strictest wind jurisdiction.'},
    {q:'Where are NOAs required?', a:'In the High-Velocity Hurricane Zone, Miami-Dade and Broward counties, HVHZ-approved products are mandatory. Outside the HVHZ, Florida Product Approvals govern, but NOA-carrying products are accepted statewide and widely specified as the premium benchmark.'},
    {q:'Why did the NOA become the national gold standard?', a:'Because it was forged by Hurricane Andrew: Miami-Dade rebuilt its product-approval system into the country\'s most demanding after 1992, and manufacturers who pass it advertise it everywhere, an NOA signals a product tested beyond nearly any storm it will meet.'},
    {q:'How do I verify an NOA is real and current?', a:'Every NOA has a number, expiration date and specification document listing exact products, sizes and installation details, verifiable through Miami-Dade\'s public product-approval system. Licensed contractors supply the documents as standard practice; verify the quoted product matches the approved configuration.'},
  ],
  body: `<p>One county's paperwork became the entire industry's trophy: the Miami-Dade NOA, Notice of Acceptance, is the certification manufacturers print in bold and contractors invoke like a credential, because it represents the hardest product gauntlet in American construction. Born from Hurricane Andrew's wreckage, the NOA system turned Miami-Dade County into the world's referee for hurricane products. Here is what the stamp actually certifies, where it is required, and how to verify one on your own quote.</p>
<div class="callout"><p><strong>The one-sentence version:</strong> An NOA is Miami-Dade's proof that a specific product survived the nation's most brutal wind, impact and water testing, mandatory in the HVHZ, and the benchmark everywhere else.</p></div>
<h2 ${H2}>Forged by Andrew</h2>
<p>Hurricane Andrew's 1992 devastation exposed a broken product-approval culture, and Miami-Dade's answer rebuilt it from the studs: a county-run certification system with independent laboratory testing, exact specification documents and renewal requirements, so severe that passing it became a marketing asset nationwide. The High-Velocity Hurricane Zone provisions of the Florida Building Code, covering Miami-Dade and Broward, made the system law where the worst winds live.</p>
<h2 ${H2}>What the Testing Demands</h2>
<p>An NOA product survived the full HVHZ protocol: the large-missile strike (a 9-pound 2x4 at roughly 50 feet per second), then thousands of positive and negative pressure cycles on the cracked assembly, plus water infiltration and structural testing, sealed throughout, the cracked-but-holding philosophy our <a href="/pages/will-impact-windows-break-in-a-storm.html">break-in-a-storm</a> guide explains. The certification covers an exact configuration: product, sizes, glass makeup, anchoring schedule, which is why installation to the approved details is part of the rating itself.</p>
<h2 ${H2}>Where NOAs Rule, and Why They Travel</h2>
<p>Inside the HVHZ, NOA (or equivalent HVHZ) approval is mandatory, no stamp, no permit. Outside it, Florida Product Approvals govern, our <a href="/pages/impact-window-ratings-explained.html">ratings guide</a> maps the full system, yet NOA products are specified statewide anyway: buyers in Tampa and Jacksonville order Miami-grade glass because a product proven for Brickell's winds is comfortably proven for theirs. The stamp travels because the testing does not flatter anyone.</p>
<h2 ${H2}>Verifying Yours</h2>
<p>Every NOA carries a number, expiration date and specification document, publicly verifiable through Miami-Dade's product-approval system, and diligence takes three checks: the number is current, the quoted product matches the approved configuration exactly, and the installer permits and anchors to the approved details (unpermitted installation orphans the certification). Those same documents anchor your <a href="/pages/wind-mitigation-inspection.html">wind mitigation file</a> and the insurance credits it earns.</p>
<h2 ${H2}>Get Gold-Standard Protection, Papered</h2>
<p>A licensed estimator visits within 48 hours, specs NOA-carrying product to your openings, delivers the approval documents with the quote, and prices exactly, wind mitigation credits up to 35% of the windstorm portion and <a href="/pages/my-safe-florida-home-grants.html">grant funding</a> included. The toughest stamp in America, on your paperwork.</p>`,
  related: [['Ratings Explained','/pages/impact-window-ratings-explained.html'],['Will Impact Windows Break','/pages/will-impact-windows-break-in-a-storm.html'],['Laminated vs Tempered','/pages/laminated-vs-tempered-glass-florida.html'],['Wind Mitigation Inspections','/pages/wind-mitigation-inspection.html']].concat(COMMON_RELATED.slice(1)),
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
