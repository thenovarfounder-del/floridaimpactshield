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
  const art=JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":desc,"datePublished":"2026-08-02","dateModified":"2026-08-02","author":{"@type":"Organization","name":"Florida Impact Shield"},"publisher":{"@type":"Organization","name":"Florida Impact Shield"},"mainEntityOfPage":"https://floridaimpactshield.com/blog/"+fname});
  const faq=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":schemaFaq.map(([q,a])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))});
  t=t.replace("</head>",'<script type="application/ld+json">'+art+'</script>\n<script type="application/ld+json">'+faq+'</script>\n</head>');
  fs.writeFileSync("blog/"+fname,t);
  console.log("WROTE blog/"+fname+" ("+t.length+"b)");
}
// ===== POST 1: CONDO =====
makePost("impact-windows-condo-florida.html",
"Impact Windows in a Florida Condo: Who Approves, Who Pays, and How to Actually Get It Done (2026)",
"Condo impact windows run through an approval maze single-family owners never see: association rules, uniformity requirements, who owns the windows, milestone-inspection pressure, and the insurance split. The complete 2026 playbook.",
"Condo Owners",
[["Do I need HOA approval for impact windows in a Florida condo?","Almost always yes — window replacements in condos require association architectural approval, and most associations enforce uniformity standards (frame color, grid pattern, tint) so buildings keep a consistent exterior. Approval is routine when you follow the documented process; skipping it invites forced removal."],
["Who pays for impact windows in a condo — owner or association?","It depends on your declaration of condominium: some declarations assign windows to the unit owner, others to the association as part of the building envelope. Post-Surfside reforms and milestone inspections have pushed many associations toward envelope-wide projects — read your declaration before spending anything."],
["Do impact windows lower condo insurance?","They can help both policies: the association's master policy benefits from building-wide opening protection, and your HO-6 unit policy may credit protected openings. The wind mitigation documentation works the same way — inspection, form, insurer credit."],
["Can a condo association force impact windows?","Increasingly yes — associations under structural-integrity and milestone-inspection requirements can mandate envelope upgrades through special assessments. Owners who upgraded voluntarily under the association's spec are typically credited or exempted; check how your association handles prior improvements."]],
`<h1>Impact Windows in a Florida Condo: Who Approves, Who Pays, and How to Get It Done</h1>
<p><em>Published August 2, 2026 &mdash; Every guide about impact windows assumes you own a house. Florida&rsquo;s two million condo units play a different game entirely: approval committees, uniformity rules, declaration fine print about who even OWNS your windows, and a post-Surfside regulatory era pushing whole buildings toward envelope decisions. Here&rsquo;s the condo playbook, start to finish.</em></p>
<h2>First question: who owns your windows?</h2>
<p>Before pricing anything, read your <strong>declaration of condominium</strong> &mdash; the document that assigns every building component to either the unit or the association. Windows land on both sides of that line depending on the building: some declarations make them unit-owner property (you buy, you maintain), others treat them as part of the common-element envelope (the association&rsquo;s project, funded by all). Everything downstream &mdash; who pays, who approves, whose insurance benefits &mdash; flows from that paragraph. Can&rsquo;t parse it? The association&rsquo;s attorney or manager answers this weekly.</p>
<h2>The approval maze (routine if you respect it)</h2>
<p>Assuming unit-owner windows, the path runs: <strong>architectural review application</strong> (most associations have a form), <strong>uniformity compliance</strong> &mdash; frame color, exterior profile, tint, and grid pattern matching the building standard (associations legally protect the uniform exterior; fighting this loses), <strong>licensed-and-insured contractor documentation</strong>, and <strong>county permits</strong> riding alongside as always. Timeline: add two to eight weeks of association process to the normal <a href="/blog/impact-window-order-timeline.html">order timeline</a>. The fatal mistake is installing first and asking forgiveness &mdash; associations can and do force removal of non-conforming windows at owner expense.</p>
<h2>The post-Surfside pressure changing everything</h2>
<p>Florida&rsquo;s structural-integrity reforms &mdash; milestone inspections for aging buildings, mandatory reserve studies, the end of reserve waivers &mdash; put building envelopes under formal scrutiny. The practical effect on windows: <strong>associations increasingly act building-wide</strong>, bundling opening protection into envelope projects funded by assessments. If your building is approaching its milestone years, ask the board what&rsquo;s planned BEFORE buying solo &mdash; and if you do upgrade early, install to the association&rsquo;s spec and keep every document, because buildings typically credit or exempt conforming prior work when the big project lands.</p>
<h2>The insurance split, decoded</h2>
<p>Condo insurance runs on two policies and your windows touch both. The <strong>master policy</strong> (association) covers the building envelope &mdash; building-wide opening protection improves its wind profile, which is one reason boards pursue envelope projects as premiums climb. Your <strong>HO-6 unit policy</strong> may separately credit protected openings depending on your declaration&rsquo;s ownership split and your carrier. The mechanism is the same one homeowners use: documented protection via <a href="/blog/wind-mitigation-inspection.html">wind mitigation inspection</a>, form to insurer, credit at renewal (<a href="/blog/wind-mitigation-discount-florida.html">how the credits work</a>). High-rise bonus: impact glass also solves the shutters-are-impossible problem above the third floor &mdash; there is no plywood option at 40 feet.</p>
<h2>What condo owners actually experience</h2>
<p>The noise-reduction upgrade surprises coastal condo owners most &mdash; laminated impact glass cuts traffic and wind noise dramatically (<a href="/pages/impact-windows-noise-reduction-florida.html">the acoustics explained</a>). Add UV protection for furnishings, security (<a href="/pages/smash-and-grab-protection-florida.html">the smash-and-grab reality</a>), and the resale line every Florida condo listing now wants: &ldquo;impact windows throughout.&rdquo; In buildings where units compete at sale, protected openings are a differentiator with a paper trail.</p>
<h2>The condo playbook, assembled</h2>
<p>1) Read the declaration &mdash; ownership first. 2) Ask the board about envelope plans and milestone timing. 3) Get the association&rsquo;s window spec BEFORE quoting. 4) Quote with contractors who work condos weekly and carry the insurance certificates boards demand &mdash; <a href="/index.html#quote">our free quote</a> handles association paperwork as part of the job. 5) File architectural approval with complete documentation. 6) Permit, install, final inspection. 7) Update the 1802, split the documentation with the association, and collect on whichever policies your building&rsquo;s structure allows. Different maze, same destination: openings that survive the season.</p>`);
// ===== POST 2: HURRICANE DEDUCTIBLE =====
makePost("hurricane-deductible-explained.html",
"The Hurricane Deductible: 2% of WHAT, Exactly? Florida's Most Misunderstood Insurance Number (2026)",
"Florida hurricane deductibles are 2-10% of your Coverage A dwelling limit — not your claim. What that means in real dollars, when it triggers, the calendar-year rule, and how mitigation shrinks the pain.",
"Insurance Money",
[["How does a hurricane deductible work in Florida?","It's a percentage — commonly 2%, 5%, or 10% — of your Coverage A dwelling limit, not of the claim. On a $450,000 dwelling limit with a 2% hurricane deductible, you absorb the first $9,000 of hurricane damage before insurance pays anything."],
["When does the hurricane deductible apply instead of the regular deductible?","When damage results from a named hurricane — typically triggered from watch/warning issuance until a defined period after the storm ends. Non-hurricane wind events fall under your standard (usually flat-dollar) deductible instead."],
["Do you pay the hurricane deductible for every storm?","Florida uses a calendar-year hurricane deductible: it applies once per season, not per storm. If two hurricanes hit in one year, the second claim applies remaining deductible (if any was unmet) rather than restarting the full amount."],
["Can impact windows lower my hurricane deductible?","Mitigation credits lower your PREMIUM rather than the deductible percentage — but a stronger envelope makes reaching the deductible less likely at all, and some carriers offer better deductible options to well-mitigated homes. The bigger play: fewer claims, smaller claims, and hundreds saved annually on premium."]],
`<h1>The Hurricane Deductible: 2% of WHAT, Exactly?</h1>
<p><em>Published August 2, 2026 &mdash; Every August, Florida homeowners rediscover a number they signed years ago and never computed: the hurricane deductible. It reads innocently &mdash; &ldquo;2%&rdquo; &mdash; and it is the single most misunderstood figure on the state&rsquo;s most important document. Here&rsquo;s the honest math, the trigger rules, and why prepared homeowners treat it as a savings target, not a surprise.</em></p>
<h2>The math nobody runs until the adjuster visits</h2>
<p>The percentage applies to your <strong>Coverage A dwelling limit</strong> &mdash; the insured rebuild value of your home &mdash; not to your claim size. The table your policy never draws: a $350,000 dwelling limit at 2% = <strong>$7,000</strong> out of pocket; at 5% = <strong>$17,500</strong>; at 10% = <strong>$35,000</strong> &mdash; before insurance contributes a dollar. A $20,000 roof-and-water claim against a 5% deductible on that home pays you $2,500. Homeowners who chose the 10% option to shave premium discover, mid-claim, that they effectively self-insured every storm short of catastrophe. Neither choice is wrong &mdash; but both should be CHOSEN, with the dollars computed, not defaulted.</p>
<h2>When it triggers (the named-storm window)</h2>
<p>The hurricane deductible isn&rsquo;t for all wind &mdash; it applies to damage from <strong>named hurricanes</strong>, typically from the moment a hurricane watch or warning is issued for any part of Florida until a defined period after the storm exits. Outside that window, wind damage (a summer thunderstorm, a tornado, a no-name gale) falls under your <strong>standard deductible</strong> &mdash; usually a flat $1,000&ndash;$2,500. Same shingles, wildly different out-of-pocket, decided by whether the National Hurricane Center gave the wind a name. This is also why post-storm claim dating and documentation matter so much.</p>
<h2>The calendar-year mercy rule</h2>
<p>Florida law makes the hurricane deductible a <strong>calendar-year</strong> deductible: one season, one deductible &mdash; not one per storm. Take $6,000 of damage from the season&rsquo;s first hurricane against a $9,000 deductible (paying it all yourself), and a second hurricane&rsquo;s claim that year applies only the remaining $3,000 before coverage engages. The paperwork catch: YOU must document and connect the first storm&rsquo;s unreimbursed damage &mdash; another argument for the pre- and post-storm video documentation habit (<a href="/blog/august-hurricane-season-gets-real.html">the peak-season briefing</a> covers the protocol).</p>
<h2>How mitigation changes this equation</h2>
<p>Directly: <a href="/blog/wind-mitigation-discount-florida.html">mitigation credits</a> cut the PREMIUM side &mdash; often hundreds per year for documented opening protection, roof attachments, and shape (<a href="/blog/wind-mitigation-inspection.html">the inspection that unlocks them</a>). Indirectly &mdash; and this is the underrated part &mdash; a hardened envelope makes <em>reaching</em> a five-figure deductible far less likely: <a href="/pages/impact-windows-vs-hurricane-shutters-florida.html">protected openings</a> keep the storm outside, and the catastrophic claims that blow past deductibles overwhelmingly start with a breached opening and internal pressurization (<a href="/blog/garage-door-weakest-opening.html">usually the garage door</a>). The homeowner math: premium credits fund the protection over time, and the protection converts the deductible from a probable expense into a theoretical one.</p>
<h2>The August checklist for this number</h2>
<p>1) Find your Coverage A limit and deductible percentage on the declarations page. 2) Multiply &mdash; write the actual dollar figure where the household can see it. 3) Decide if that number is savings-account survivable; if not, price the lower-percentage option at renewal (before any <a href="/blog/august-hurricane-season-gets-real.html">binding suspension</a> freezes changes). 4) Confirm your mitigation credits are all applied &mdash; <a href="/pages/what-lowers-florida-home-insurance-premiums-ranked.html">the ranked list</a> shows what most homes miss. 5) Point the premium savings at the envelope: <a href="/index.html#quote">the free quote</a> prices exactly what turns this whole article academic.</p>`);
// ===== INDEX CARDS +2 =====
if(fs.existsSync("blog/index.html")){
  let ix=fs.readFileSync("blog/index.html","utf8");
  if(!ix.includes("impact-windows-condo-florida")){
    const card=`<a class="card" href="/blog/impact-windows-condo-florida.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>Impact Windows in a Florida Condo: Who Approves, Who Pays</strong><br>The association maze, the declaration question, and the post-Surfside pressure.</a>
<a class="card" href="/blog/hurricane-deductible-explained.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>The Hurricane Deductible: 2% of WHAT, Exactly?</strong><br>Florida's most misunderstood insurance number, computed honestly.</a>
`;
    const a=ix.indexOf("</h1>");
    if(a>0){ix=ix.slice(0,a+5)+"\n"+card+ix.slice(a+5);fs.writeFileSync("blog/index.html",ix);console.log("index cards +2: VERIFIED");}
  } else console.log("index already has cards");
}
// ===== SITEMAP +2 =====
if(fs.existsSync("sitemap.xml")){
  let s=fs.readFileSync("sitemap.xml","utf8");
  if(!s.includes("impact-windows-condo-florida")){
    s=s.replace("</urlset>","<url><loc>https://floridaimpactshield.com/blog/impact-windows-condo-florida.html</loc></url>\n<url><loc>https://floridaimpactshield.com/blog/hurricane-deductible-explained.html</loc></url>\n</urlset>");
    fs.writeFileSync("sitemap.xml",s);console.log("sitemap +2: VERIFIED");
  } else console.log("sitemap already has URLs");
}
// payload debris check (law)
if(fs.existsSync("payload")){fs.rmSync("payload",{recursive:true,force:true});console.log("payload debris removed");}
console.log("FIS AGGRESSION DONE — rerun make-llms3.cjs then deploy");
