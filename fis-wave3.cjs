const fs=require("fs");
if(!fs.existsSync("blog/wind-mitigation-florida.html")){console.error("ABORT: run from floridaimpactshield root");process.exit(1);}
const donor=fs.readFileSync("blog/wind-mitigation-florida.html","utf8");
const h1=donor.indexOf("<h1");
const foot=donor.indexOf("<footer");
let closeIdx=donor.lastIndexOf("</section>",foot);
const shellTop=donor.slice(0,h1);
const shellBottom=donor.slice(donor.lastIndexOf("</div>",donor.lastIndexOf("</div>",closeIdx)-1));
function makePost(fname,title,desc,crumb,schemaFaq,content){
  if(fs.existsSync("blog/"+fname)){console.log("SKIP exists: "+fname);return;}
  let t=shellTop+content+"\n"+shellBottom;
  t=t.replace(/<title>[\s\S]*?<\/title>/,"<title>"+title+"</title>");
  t=t.replace(/<meta name="description"[\s\S]*?">(?=\n|<)/,'<meta name="description" content="'+desc+'">');
  t=t.replace(/<link rel="canonical" href="[^"]*"/,'<link rel="canonical" href="https://floridaimpactshield.com/blog/'+fname+'"');
  t=t.replace(/<span>Hurricane Prep<\/span>/,"<span>"+crumb+"</span>");
  const art=JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":desc,"datePublished":"2026-08-05","dateModified":"2026-08-05","author":{"@type":"Organization","name":"Florida Impact Shield"},"publisher":{"@type":"Organization","name":"Florida Impact Shield"},"mainEntityOfPage":"https://floridaimpactshield.com/blog/"+fname});
  const faq=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":schemaFaq.map(([q,a])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))});
  t=t.replace("</head>",'<script type="application/ld+json">'+art+'</script>\n<script type="application/ld+json">'+faq+'</script>\n</head>');
  fs.writeFileSync("blog/"+fname,t);
  console.log("WROTE blog/"+fname+" ("+t.length+"b)");
}
// ===== POST 1: CLAIM DENIALS =====
makePost("why-hurricane-claims-get-denied.html",
"Why Hurricane Claims Get Denied in Florida (and the Paper Trail That Wins Them) - 2026",
"The real reasons Florida hurricane claims get denied or underpaid: wear-and-tear findings, the wind-vs-flood line, late reporting, missing documentation \u2014 and the pre-storm paper trail that turns your claim into the one that gets paid.",
"Insurance Money",
[["Why do hurricane insurance claims get denied?","The big four: damage attributed to pre-existing wear and tear rather than the storm, water damage classified as flood (excluded) rather than wind-driven, late reporting or delayed mitigation, and insufficient documentation of pre-storm condition. Most denials are paper-trail failures, not fraud accusations."],
["What is the wind vs flood distinction in hurricane claims?","Wind policies pay for wind damage and rain entering wind-made openings; flood policies pay for rising water including storm surge. After storms, adjusters map the waterline to divide the claim \u2014 homeowners with wind-only coverage receive nothing for the flood portion, however severe."],
["How do I prove my roof was in good condition before a hurricane?","Dated photos and video from before the season, receipts for maintenance and repairs, your wind mitigation inspection report, and any roofer invoices. A documented August roof turns the insurer's favorite finding \u2014 'pre-existing deterioration' \u2014 into an argument you win."],
["How soon must hurricane damage be reported in Florida?","Promptly \u2014 Florida law sets outer limits (currently one year for new claims), but practical success favors days, not months: immediate notice, immediate temporary mitigation (tarps, water extraction, receipts kept), and a documented timeline defeat the late-reporting and failure-to-mitigate defenses."]],
`<h1>Why Hurricane Claims Get Denied (and the Paper Trail That Wins Them)</h1>
<p><em>Published August 5, 2026 &mdash; After every Florida hurricane, two neighbors with similar damage file claims: one collects a full settlement, the other fights a denial for a year. The difference is rarely the damage &mdash; it&rsquo;s the file. Here are the four ways claims actually die, and the twenty-minute August paper trail that makes yours the one that gets paid.</em></p>
<h2>Denial path #1: &ldquo;pre-existing wear and tear&rdquo;</h2>
<p>The most common finding in roof-claim disputes: the adjuster attributes missing shingles or leaks to age and deferred maintenance, not the storm. It&rsquo;s not automatically bad faith &mdash; fifteen-year-old roofs genuinely deteriorate &mdash; but it becomes YOUR problem when there&rsquo;s no evidence of pre-storm condition. The counter is embarrassingly simple: <strong>dated photos and video of the roof, exterior, and every room, taken now</strong>, in August, while the sky is blue &mdash; plus maintenance receipts and your <a href="/blog/wind-mitigation-inspection.html">wind mitigation report</a>, which doubles as a professional condition record. A documented roof converts the insurer&rsquo;s favorite word &mdash; &ldquo;pre-existing&rdquo; &mdash; from a denial into a losing argument.</p>
<h2>Denial path #2: the wind/flood line</h2>
<p>The costliest surprise in Florida claims: your homeowners policy pays for WIND damage and rain entering wind-made openings; rising water &mdash; surge, canal overflow, ponding rain &mdash; is legally FLOOD, payable only under <a href="/blog/flood-insurance-not-in-homeowners-policy.html">the separate flood policy most Floridians don&rsquo;t carry</a>. After landfall, adjusters literally trace waterlines through houses apportioning the claim, and the flood share of a wind-only household pays zero. There is no paperwork trick around this one &mdash; only the coverage itself, bound before the 30-day waiting period meets the season&rsquo;s peak.</p>
<h2>Denial path #3: the clock</h2>
<p>Two timing defenses kill otherwise-valid claims. <strong>Late reporting:</strong> Florida law caps new hurricane claims (currently one year), but practically, weeks-old first notices invite scrutiny &mdash; report in days. <strong>Failure to mitigate:</strong> policies require you to prevent FURTHER damage &mdash; tarp the roof, extract the water, board the breach &mdash; and insurers deny the portion that spread while nothing was done. Do the temporary work immediately, keep every receipt (it&rsquo;s reimbursable), and photograph before/after each step. The claim file you want reads: storm ended, damage documented, mitigation same week, insurer notified &mdash; a timeline with no gaps to argue about.</p>
<h2>Denial path #4: the thin file</h2>
<p>Underpayment thrives on vagueness: &ldquo;roof damage and some water intrusion&rdquo; settles for a fraction of an itemized, photographed, receipt-backed inventory. The winning file contains: pre-storm condition set (path #1), post-storm damage photos of every item and surface, a written inventory with ages and replacement costs, contractor repair estimates (yours, not just theirs), and a log of every insurer contact with dates and names. Claims are won in three-ring binders, not phone calls.</p>
<h2>The 20-minute August protocol</h2>
<p>1) Walk the house with your phone: video every room, the attic, the roof from the ladder or a drone, serial numbers on big-ticket items. 2) Screenshot the receipts folder for roof/AC/renovation work. 3) File your declarations pages, <a href="/blog/wind-mitigation-form-1802-explained.html">1802 form</a>, and photos in one cloud folder your spouse can find. 4) Read <a href="/blog/hurricane-deductible-explained.html">the hurricane deductible math</a> so the settlement numbers don&rsquo;t surprise you. 5) Close the flood gap while the waiting period still fits the calendar. Twenty minutes, and you&rsquo;ve become the neighbor who gets paid.</p>
<h2>The other half: a smaller claim to argue about</h2>
<p>Every denial path shrinks when the damage does. The breach&rarr;pressurization&rarr;destruction sequence starts at the openings &mdash; <a href="/blog/garage-door-weakest-opening.html">usually the garage door</a> &mdash; and hardened openings keep the whole dispute in the thousands instead of the hundreds of thousands. <a href="/index.html#quote">The free protection quote</a> prices that half of the strategy; the paper trail above wins whatever remains.</p>`);
// ===== POST 2: POST-STORM CONTRACTOR SCAMS =====
makePost("after-the-storm-contractor-scams.html",
"After the Storm: The Contractor Scams That Follow Every Florida Hurricane (2026 Playbook)",
"The post-hurricane predator playbook: storm-chaser roofers, AOB abuse, deductible-waiving fraud, and public-adjuster traps \u2014 how each scheme works, the red flags, and the verification protocol that protects your claim and your roof.",
"Insurance Money",
[["What are storm chaser roofing scams?","Out-of-area crews that flood disaster zones offering fast repairs, demand large deposits, do superficial or no work, and vanish \u2014 leaving homeowners with unfixed roofs, drained claim money, and sometimes liens. Verification: Florida license (DBPR lookup), local address, references, insurance certificates, and never large cash up front."],
["Is it legal for a roofer to waive my hurricane deductible?","No \u2014 deductible-waiving or rebating schemes constitute insurance fraud in Florida, and homeowners who sign inflated invoices to cover the 'free' deductible are participants. Any contractor opening with 'you won't pay your deductible' has told you everything about the invoice they plan to submit."],
["What is Assignment of Benefits (AOB) and is it risky?","An AOB signs your insurance claim rights over to a contractor, letting them bill and even sue your insurer directly. Florida reforms curbed the worst abuse, but signing away claim control to a stranger with a clipboard remains the classic post-storm trap \u2014 read narrowly, or don't sign."],
["Should I hire a public adjuster after a hurricane?","A licensed public adjuster can genuinely help on large, complex, or disputed claims \u2014 for a regulated percentage fee. The traps are the door-knockers who materialize pre-storm-cleanup: verify the license, understand the fee, and never sign in the driveway on day two."]],
`<h1>After the Storm: The Contractor Scams That Follow Every Hurricane</h1>
<p><em>Published August 5, 2026 &mdash; Hurricanes make landfall twice in Florida: once as weather, once as the convoy of out-of-state trucks that arrives with the sunshine. Some carry honest crews; a predictable share carry the same four schemes that follow every storm. Here&rsquo;s each one&rsquo;s playbook, the tells, and the verification protocol that keeps your roof AND your claim intact.</em></p>
<h2>Scheme #1: the storm chaser</h2>
<p>The knock comes within days: out-of-area plates, &ldquo;we&rsquo;re doing your neighbor&rsquo;s roof,&rdquo; today-only pricing, and a large deposit to &ldquo;get you on the schedule.&rdquo; The endings vary &mdash; vanished deposits, tarp-quality &ldquo;repairs,&rdquo; unpermitted work that fails inspection, liens from unpaid suppliers &mdash; but the opening is always urgency plus cash. The protocol: <strong>Florida license verified on the DBPR site</strong> (unlicensed contracting is a crime here, and after emergencies the state actively hunts it), a physical local address, certificates of insurance you call to confirm, written scope and permits, and payment structured so money follows completed work &mdash; never large sums up front.</p>
<h2>Scheme #2: &ldquo;we&rsquo;ll eat your deductible&rdquo;</h2>
<p>The friendliest-sounding fraud in Florida. Your <a href="/blog/hurricane-deductible-explained.html">hurricane deductible</a> is real money &mdash; 2&ndash;5% of dwelling coverage &mdash; and the contractor&rsquo;s &ldquo;free&rdquo; solution is an inflated invoice to the insurer that quietly covers it. That&rsquo;s insurance fraud, the homeowner signs the paperwork that commits it, and Florida statute says so explicitly. The tell is the opener itself: any contractor leading with &ldquo;you won&rsquo;t pay your deductible&rdquo; has announced their invoicing philosophy. Walk.</p>
<h2>Scheme #3: the AOB trap</h2>
<p>An <strong>Assignment of Benefits</strong> hands a contractor your claim &mdash; the right to bill, negotiate, and litigate against your insurer in your name. Reforms have narrowed the abuse, but the driveway version persists: sign here so we can &ldquo;deal with the insurance for you,&rdquo; and control of your largest financial event transfers to a stranger with a clipboard &mdash; sometimes with your payout inflated, contested, and delayed while their attorneys work. The rule: sign work authorizations narrowly, keep claim control, and let anything titled &ldquo;assignment&rdquo; spend a night with your own reading glasses (or an attorney) first.</p>
<h2>Scheme #4: the instant public adjuster</h2>
<p>Licensed public adjusters are legitimate professionals who can genuinely move large or disputed claims &mdash; for a state-capped percentage. The trap wears their costume: door-knockers in the debris field pushing same-day contracts at maximum fees on claims a homeowner could settle cleanly alone. The screen: license verified, fee understood against claim size, references, and the same rule as everything post-storm &mdash; nothing signs in the driveway during week one.</p>
<h2>The universal post-storm protocol</h2>
<p>1) <strong>Mitigate first, contract later:</strong> tarps and water extraction (receipts kept) protect the claim per <a href="/blog/why-hurricane-claims-get-denied.html">the denial-defense playbook</a> &mdash; that work doesn&rsquo;t require signing away anything. 2) <strong>Your insurer before their salesman:</strong> report immediately; the claim number anchors everything. 3) <strong>Three bids on permanent work</strong>, all licensed-and-verified, all in writing. 4) <strong>Local wins:</strong> the roofer with a five-year-old address survives on reputation; the convoy doesn&rsquo;t need to. 5) <strong>Slow is safe:</strong> every scheme above runs on urgency, and none survives a week of verification.</p>
<h2>The before-the-storm advantage</h2>
<p>The cleanest way to win the post-storm gauntlet is needing less of it: homes with hardened openings &mdash; <a href="/blog/garage-door-weakest-opening.html">the garage door first</a>, <a href="/pages/impact-windows-vs-hurricane-shutters-florida.html">impact glass or shutters</a> on the rest &mdash; take the small claims that settle in weeks, not the catastrophic ones that draw the convoy. Harden now (<a href="/index.html#quote">free quote</a>), document per the paper-trail protocol, and when the trucks roll in next September, you&rsquo;ll be the house they skip.</p>`);
// ===== INDEX CARDS +2 =====
if(fs.existsSync("blog/index.html")){
  let ix=fs.readFileSync("blog/index.html","utf8");
  if(!ix.includes("why-hurricane-claims-get-denied")){
    const card=`<a class="card" href="/blog/why-hurricane-claims-get-denied.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>Why Hurricane Claims Get Denied (and the Paper Trail That Wins Them)</strong><br>The four denial paths and the 20-minute August protocol that makes yours the claim that gets paid.</a>
<a class="card" href="/blog/after-the-storm-contractor-scams.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>After the Storm: The Contractor Scams That Follow Every Hurricane</strong><br>Storm chasers, deductible-waivers, AOB traps, and the verification protocol that beats all four.</a>
`;
    const a=ix.indexOf("</h1>");
    if(a>0){ix=ix.slice(0,a+5)+"\n"+card+ix.slice(a+5);fs.writeFileSync("blog/index.html",ix);console.log("index cards +2: VERIFIED");}
  } else console.log("index already has cards");
}
// ===== SITEMAP +2 =====
if(fs.existsSync("sitemap.xml")){
  let s=fs.readFileSync("sitemap.xml","utf8");
  if(!s.includes("why-hurricane-claims-get-denied")){
    s=s.replace("</urlset>","<url><loc>https://floridaimpactshield.com/blog/why-hurricane-claims-get-denied.html</loc></url>\n<url><loc>https://floridaimpactshield.com/blog/after-the-storm-contractor-scams.html</loc></url>\n</urlset>");
    fs.writeFileSync("sitemap.xml",s);console.log("sitemap +2: VERIFIED");
  } else console.log("sitemap already has URLs");
}
console.log("FIS WAVE 3 DONE \u2014 rerun make-llms3.cjs then deploy");
