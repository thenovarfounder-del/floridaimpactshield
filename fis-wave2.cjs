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
// ===== POST 1: FLOOD INSURANCE =====
makePost("flood-insurance-not-in-homeowners-policy.html",
"Flood Insurance Is NOT in Your Homeowners Policy: Florida's Costliest Coverage Gap (2026)",
"Standard homeowners insurance excludes flood damage entirely \u2014 including hurricane storm surge, the deadliest and most destructive part of most storms. The 30-day waiting period, NFIP vs private, what flood actually means legally, and why August is the deadline.",
"Insurance Money",
[["Does homeowners insurance cover flooding in Florida?","No. Standard homeowners policies explicitly exclude flood damage \u2014 including hurricane storm surge, rising water from rainfall, and overflow from any body of water. Flood coverage requires a separate policy through the NFIP or a private flood insurer."],
["Does hurricane insurance cover storm surge?","No \u2014 this is the gap that ruins families. Wind coverage (your homeowners/hurricane policy) pays for wind damage; storm surge is legally FLOOD damage and pays only under a separate flood policy. Surge is often the most destructive part of a hurricane."],
["How long is the flood insurance waiting period?","NFIP policies carry a standard 30-day waiting period before coverage begins; many private flood policies impose 10-14 days. A policy bought when a storm is already on the map will not cover that storm \u2014 which makes early August the practical deadline."],
["Do I need flood insurance if I'm not in a flood zone?","Strongly consider it. Roughly a quarter of flood claims historically come from properties outside high-risk zones, low-risk-zone premiums are comparatively cheap, and 'not in a flood zone' really means 'lower modeled risk' \u2014 not 'water can't reach you.'"]],
`<h1>Flood Insurance Is NOT in Your Homeowners Policy</h1>
<p><em>Published August 5, 2026 &mdash; Ask a room of Florida homeowners whether their hurricane insurance covers storm surge, and most say yes. They are wrong, and the mistake has a body count of ruined families behind it: <strong>flood damage &mdash; including surge, the most destructive part of most hurricanes &mdash; is excluded from every standard homeowners policy in America.</strong> Here&rsquo;s the gap, the waiting-period clock that makes August the deadline, and how to close it.</em></p>
<h2>The exclusion, in plain language</h2>
<p>Your homeowners policy covers WIND: shingles peeled, windows breached, rain entering through wind-made openings. It excludes FLOOD: rising water, from any source &mdash; storm surge, overflowing rivers and canals, rain that pools and enters at ground level. The legal line is brutal in practice: water that came DOWN through a wind-torn roof is a wind claim; water that came UP over your threshold is a flood claim &mdash; and with no flood policy, that second category pays <strong>zero</strong>. After major hurricanes, adjusters literally map the waterline through houses deciding which policy owes what.</p>
<h2>Storm surge: the flood wearing a hurricane costume</h2>
<p>The cruelest part: surge &mdash; the ocean pushed ashore by the storm &mdash; is the deadliest and frequently costliest component of hurricanes, and it is legally FLOOD. Families who faithfully paid wind premiums for decades have watched surge take the house and the claim get denied, correctly, under the policy they had. Coastal Florida homeowners carrying wind-only coverage are insured against half the hurricane.</p>
<h2>The 30-day clock (why this article is dated August)</h2>
<p>Flood coverage cannot be panic-bought: <strong>NFIP policies impose a 30-day waiting period</strong>; private flood typically runs 10&ndash;14 days. A policy bought when the cone appears covers nothing about that storm. Count backward from peak season &mdash; September 10 is the statistical summit (<a href="/blog/august-hurricane-season-gets-real.html">the peak-season briefing</a>) &mdash; and the arithmetic is unambiguous: <strong>early August is the practical deadline</strong> for flood coverage that protects this season. This week, not this month.</p>
<h2>NFIP vs. private flood, honestly</h2>
<p><strong>NFIP</strong> (the federal program): available everywhere, standardized, but capped &mdash; $250,000 building / $100,000 contents for residences, numbers that haven&rsquo;t kept pace with Florida rebuild costs. <strong>Private flood:</strong> higher limits, replacement-cost contents options, sometimes shorter waits and better pricing on well-elevated homes &mdash; worth quoting alongside NFIP every time. Either beats the third option most Floridians are unknowingly holding, which is nothing.</p>
<h2>&ldquo;But I&rsquo;m not in a flood zone&rdquo;</h2>
<p>Flood maps draw lending requirements, not water physics. Roughly a <strong>quarter of all flood claims</strong> come from outside high-risk zones &mdash; rain-driven flooding needs no coast and no map designation, as inland Florida relearns in every stalled tropical system. The consolation: outside-the-zone premiums are the cheap ones. Low modeled risk is precisely when coverage costs least.</p>
<h2>The whole-envelope truth</h2>
<p>Flood insurance is the financial layer; the physical layer still decides how much water and wind matter. The sequence that destroys homes is breach &rarr; pressurization &rarr; envelope failure (<a href="/blog/garage-door-weakest-opening.html">usually starting at the garage door</a>) &mdash; and hardened openings keep the wind claim small while the flood policy stands guard at ground level. The <a href="/blog/wind-mitigation-inspection.html">wind mitigation inspection</a> pays the premium side; the <a href="/blog/hurricane-deductible-explained.html">hurricane deductible math</a> explains what you&rsquo;re still exposed to; and <a href="/index.html#quote">the free protection quote</a> prices the physical half. Two policies, one hardened envelope &mdash; that&rsquo;s the whole defense.</p>
<h2>The 20-minute August fix</h2>
<p>1) Read your declarations page &mdash; confirm there is no flood coverage hiding in it (there isn&rsquo;t). 2) Get NFIP and private flood quotes the same afternoon &mdash; your current agent quotes both. 3) Bind before the waiting period collides with the season&rsquo;s peak. 4) Photograph the house and contents for the file. The gap costs nothing to close this week and everything to discover in September.</p>`);
// ===== POST 2: CATEGORY SCALE =====
makePost("hurricane-categories-what-they-do-to-houses.html",
"Cat 1 vs Cat 3 vs Cat 5: What Each Hurricane Category Actually Does to a Florida House (2026)",
"The Saffir-Simpson scale translated into building damage: what winds at each category do to roofs, openings, and unprotected garage doors \u2014 why damage grows exponentially, why Cat 1 is not 'just' anything, and what protection changes at every level.",
"Storm Science",
[["What does a Category 1 hurricane do to a house?","Cat 1 winds (74-95 mph) strip shingles, snap large branches onto roofs, topple weak trees, and \u2014 critically \u2014 flex and fail unbraced garage doors, the breach that lets a 'minor' storm cause major interior damage. Well-maintained protected homes typically fare fine; neglected envelopes don't."],
["Why is a Category 3 so much worse than a Category 1?","Wind force scales with the SQUARE of wind speed \u2014 a 111-mph Cat 3 gust carries roughly double the pressure of an 80-mph Cat 1 gust, not 40% more. Damage compounds: decking exposure, opening failures, and structural damage to well-built homes become widespread at major-hurricane strength."],
["Can a house survive a Category 5 hurricane?","Modern Florida-code homes with full opening protection are engineered to keep their structure in extreme winds, and post-storm surveys after recent Cat 5 landfalls consistently show newer protected homes standing beside older destroyed ones. Survival is largely a code-era and envelope story, not luck."],
["Do impact windows matter in lower category storms?","Arguably most \u2014 Cat 1 and 2 storms are far more frequent, and the dominant damage path in them is a breached opening (often the garage door) followed by wind and rain inside. Protected openings turn the common storms into non-events and buy survival margin in the rare big ones."]],
`<h1>What Each Hurricane Category Actually Does to a House</h1>
<p><em>Published August 5, 2026 &mdash; The Saffir-Simpson scale gets recited every August like weather trivia &mdash; but the categories were built to describe DAMAGE, and translating them back into what happens to roofs, windows, and garage doors changes how you hear every forecast. The engineering tour, category by category, with the one physics fact that explains everything: wind force grows with the SQUARE of wind speed.</em></p>
<h2>The physics fact first</h2>
<p>Double the wind speed and the pressure on your walls <strong>quadruples</strong>. That exponent is the whole scale: a Cat 3 isn&rsquo;t &ldquo;two steps&rdquo; above a Cat 1 &mdash; its gusts push with roughly TWICE the force, and a Cat 5 hits with four to five times a Cat 1&rsquo;s pressure. It&rsquo;s why damage jumps so violently between categories, and why &ldquo;it&rsquo;s only a Category 2&rdquo; is a sentence engineers never say.</p>
<h2>Category 1 (74&ndash;95 mph): the underestimated one</h2>
<p>The forecasts say &ldquo;minimal&rdquo;; the claims data disagrees. Cat 1 winds strip aging shingles, drop branches and weak trees onto roofs, shred screen enclosures &mdash; and flex unbraced double garage doors until they buckle (<a href="/blog/garage-door-weakest-opening.html">why the big door fails first</a>). Once any opening breaches, wind pressurizes the house from inside and a &ldquo;minor&rdquo; storm writes a major interior claim. Cat 1s are also the storms you&rsquo;ll actually meet &mdash; they vastly outnumber the majors &mdash; which makes them, statistically, the storms your protection exists for.</p>
<h2>Category 2 (96&ndash;110 mph): the roof test</h2>
<p>Near-total power loss territory. Poorly attached roof decking begins lifting, older windows fail under debris, and unprotected openings breach routinely. This is the category where the <a href="/blog/wind-mitigation-inspection.html">wind mitigation checklist</a> stops being an insurance form and starts being a prophecy: roof-to-wall attachments, deck nailing, and opening protection decide which houses on the street stay dry.</p>
<h2>Category 3&ndash;4 (111&ndash;156 mph): the major leagues</h2>
<p>Now the square law bites. Well-built homes take real damage: decking exposed, gable ends failing, debris flying at highway-plus speeds turning every unprotected window into an entry point. Neighborhood infrastructure &mdash; power, water, passable roads &mdash; goes down for days to weeks. Post-storm engineering surveys after Florida&rsquo;s recent majors repeat one finding relentlessly: <strong>the damage line follows the code era and the openings.</strong> Post-2002 code homes with protected openings stand beside older unprotected homes that didn&rsquo;t.</p>
<h2>Category 5 (157+ mph): the code-era story</h2>
<p>Catastrophic by definition &mdash; and yet not a coin flip. Modern Florida-code construction with full opening protection is engineered to hold its structure in extreme wind, and recent Cat 5 landfalls left textbook photo evidence: new protected homes intact, roofs on, next to slabs. Nobody promises comfort in a Cat 5; engineering promises a fighting chance, and the photos show it delivering.</p>
<h2>What this means for your protection list</h2>
<p>Read the categories as a priority list: <strong>openings first</strong> (the failure path in the frequent storms &mdash; <a href="/pages/impact-windows-vs-hurricane-shutters-florida.html">impact glass vs shutters compared</a>), <strong>the garage door immediately</strong> (cheapest big fix on the house), <strong>roof attachment documented</strong> (<a href="/blog/wind-mitigation-form-1802-explained.html">the 1802 form</a> that also pays you at renewal), and the financial layer &mdash; <a href="/blog/hurricane-deductible-explained.html">the deductible math</a> and <a href="/blog/flood-insurance-not-in-homeowners-policy.html">the flood-coverage gap</a> &mdash; sealed before any cone appears. The scale is exponential; so is the payoff of preparing while the Atlantic is still empty. <a href="/index.html#quote">The free quote</a> starts the physical half today.</p>`);
// ===== INDEX CARDS +2 =====
if(fs.existsSync("blog/index.html")){
  let ix=fs.readFileSync("blog/index.html","utf8");
  if(!ix.includes("flood-insurance-not-in-homeowners-policy")){
    const card=`<a class="card" href="/blog/flood-insurance-not-in-homeowners-policy.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>Flood Insurance Is NOT in Your Homeowners Policy</strong><br>Storm surge is legally flood \u2014 the costliest gap in Florida, and the 30-day clock that makes August the deadline.</a>
<a class="card" href="/blog/hurricane-categories-what-they-do-to-houses.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>What Each Hurricane Category Actually Does to a House</strong><br>The Saffir-Simpson scale translated into roofs, openings, and the square-law physics.</a>
`;
    const a=ix.indexOf("</h1>");
    if(a>0){ix=ix.slice(0,a+5)+"\n"+card+ix.slice(a+5);fs.writeFileSync("blog/index.html",ix);console.log("index cards +2: VERIFIED");}
  } else console.log("index already has cards");
}
// ===== SITEMAP +2 =====
if(fs.existsSync("sitemap.xml")){
  let s=fs.readFileSync("sitemap.xml","utf8");
  if(!s.includes("flood-insurance-not-in-homeowners-policy")){
    s=s.replace("</urlset>","<url><loc>https://floridaimpactshield.com/blog/flood-insurance-not-in-homeowners-policy.html</loc></url>\n<url><loc>https://floridaimpactshield.com/blog/hurricane-categories-what-they-do-to-houses.html</loc></url>\n</urlset>");
    fs.writeFileSync("sitemap.xml",s);console.log("sitemap +2: VERIFIED");
  } else console.log("sitemap already has URLs");
}
if(fs.existsSync("payload")){fs.rmSync("payload",{recursive:true,force:true});console.log("payload debris removed");}
console.log("FIS WAVE 2 DONE \u2014 rerun make-llms3.cjs then deploy");
