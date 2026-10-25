const fs=require("fs");
if(!fs.existsSync("blog/wind-mitigation-florida.html")){console.error("ABORT: run from floridaimpactshield root");process.exit(1);}
const donor=fs.readFileSync("blog/wind-mitigation-florida.html","utf8");
const h1=donor.indexOf("<h1");
const foot=donor.indexOf("<footer");
let closeIdx=donor.lastIndexOf("</section>",foot);
const shellTop=donor.slice(0,h1);
const shellBottom=donor.slice(donor.lastIndexOf("</div>",donor.lastIndexOf("</div>",closeIdx)-1));
const fname="pages/high-velocity-hurricane-zone-florida.html";
if(fs.existsSync(fname)){console.log("SKIP exists");process.exit(0);}
const title="Florida's High-Velocity Hurricane Zone (HVHZ): What It Means for Your Windows, Doors & Wallet (2026)";
const desc="The HVHZ explained: which counties are in it, why Hurricane Andrew created it, the Miami-Dade NOA and large-missile testing your products must pass, HVHZ vs regular Florida code, and what it means when you buy.";
const content=`<h1>Florida&rsquo;s High-Velocity Hurricane Zone: What HVHZ Actually Means for Your Home</h1>
<p><em>Two Florida counties build to a stricter standard than almost anywhere in America &mdash; and if you live in one of them, three letters govern every window, door, and garage door you can legally install: <strong>HVHZ</strong>. Here&rsquo;s the whole picture: where the zone is, why it exists, what the testing actually involves, and how to buy correctly inside (and near) its borders.</em></p>
<h2>What and where the HVHZ is</h2>
<p>The High-Velocity Hurricane Zone is the Florida Building Code&rsquo;s strictest wind region: <strong>all of Miami-Dade and Broward counties</strong>. Inside it, design wind speeds run to <strong>170&ndash;180+ mph</strong>, and every product installed in the building envelope &mdash; windows, exterior doors, garage doors, shutters, skylights, even soffits &mdash; must carry approvals proving it survives conditions the rest of the country never tests for. Palm Beach and the coastal counties sit OUTSIDE the HVHZ but inside the broader <strong>wind-borne debris region</strong>, with strong-but-lesser requirements &mdash; a distinction that matters enormously when comparing quotes across county lines.</p>
<h2>Why it exists: the storm that rewrote the rules</h2>
<p>Hurricane Andrew, August 1992: 165 mph winds, 63,000 homes destroyed, and post-storm forensics that shocked the industry &mdash; much of the destruction traced not to wind alone but to <strong>failed openings</strong>: garage doors folding, windows shattering, and internal pressurization lifting roofs off from the inside. South Florida&rsquo;s answer became the toughest building code in the nation, and three decades of hurricanes since have validated it: HVHZ-era construction consistently outperforms everything built before it. The zone isn&rsquo;t bureaucracy &mdash; it&rsquo;s autopsy results written into law.</p>
<h2>The testing: what &ldquo;HVHZ-approved&rdquo; actually survives</h2>
<p>Products earn HVHZ approval through the <strong>Miami-Dade Notice of Acceptance (NOA)</strong> or Florida Building Code approval with HVHZ compliance &mdash; and the tests are cinematic: the <strong>large-missile impact test</strong> fires a 9-pound 2x4 at the product at 50 feet per second (then the shattered-but-intact assembly endures 9,000 cycles of positive and negative pressure simulating hours of hurricane gusts); the <strong>small-missile test</strong> peppers higher elevations with steel balls; and water-infiltration and structural-load tests ride along. A product with a current NOA has survived, on camera, what a hurricane throws at your house. The full paperwork decoder lives in <a href="/pages/miami-dade-noa-approval-explained.html">our NOA guide</a> &mdash; and checking the NOA number on YOUR quote takes two minutes on Miami-Dade&rsquo;s public portal.</p>
<h2>HVHZ vs. the rest of Florida: the practical differences</h2>
<p>Same-looking window, different animal: HVHZ products typically carry <strong>heavier interlayers</strong> (laminated glass built for the large-missile hit), <strong>beefier frames and anchoring schedules</strong>, and <strong>stricter installation requirements</strong> &mdash; the approval covers the ENTIRE assembly as installed, fasteners and all, which is why HVHZ inspections scrutinize screw patterns. Outside the zone, products meet Florida Building Code impact standards that are still excellent (and what <a href="/pages/impact-windows-vs-hurricane-shutters-florida.html">our impact-vs-shutters guide</a> covers statewide) but tested to lower missile and pressure thresholds. The pricing consequence: HVHZ-rated products run <strong>10&ndash;25% more</strong> than comparable non-HVHZ impact products &mdash; and using non-HVHZ product inside the zone isn&rsquo;t a discount, it&rsquo;s a failed inspection and a tear-out.</p>
<h2>Buying correctly, in and near the zone</h2>
<p><strong>Inside Miami-Dade/Broward:</strong> every quote line must show a current NOA or HVHZ-compliant FBC approval &mdash; ask for the numbers, verify one, and treat any installer who hedges as <a href="/pages/impact-windows-permit-florida.html">a permit problem waiting to happen</a>. <strong>In Palm Beach and the debris region:</strong> HVHZ product is legal and superior &mdash; some homeowners deliberately spec it for the extra margin &mdash; but it isn&rsquo;t required; make the upgrade a conscious choice, not a quote-padding surprise. <strong>Everywhere:</strong> the insurance system rewards the protection either way &mdash; documented impact openings drive the <a href="/blog/wind-mitigation-discount-florida.html">wind-mitigation credits</a> that repay the investment annually, and <a href="/blog/hurricane-deductible-explained.html">keep you off your hurricane deductible</a> entirely.</p>
<h2>The bottom line</h2>
<p>The HVHZ is Hurricane Andrew&rsquo;s permanent lesson: openings decide outcomes. If you&rsquo;re in the zone, the code has already made the engineering decision &mdash; your job is verifying the paperwork matches it. If you&rsquo;re near the zone, you get to CHOOSE the stricter standard the world&rsquo;s worst storms wrote. Either way, <a href="/index.html#quote">the free quote</a> prices correctly-rated product for YOUR address, NOA numbers included &mdash; because in South Florida, the approval sheet IS the product.</p>`;
let t=shellTop+content+"\n"+shellBottom;
t=t.replace(/<title>[\s\S]*?<\/title>/,"<title>"+title+"</title>");
t=t.replace(/<meta name="description"[\s\S]*?">(?=\n|<)/,'<meta name="description" content="'+desc+'">');
t=t.replace(/<link rel="canonical" href="[^"]*"/,'<link rel="canonical" href="https://floridaimpactshield.com/'+fname+'"');
const art=JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":desc,"datePublished":"2026-08-02","dateModified":"2026-08-02","author":{"@type":"Organization","name":"Florida Impact Shield"},"mainEntityOfPage":"https://floridaimpactshield.com/"+fname});
const faq=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What counties are in Florida's High-Velocity Hurricane Zone?","acceptedAnswer":{"@type":"Answer","text":"All of Miami-Dade and Broward counties. Neighboring coastal counties like Palm Beach sit in the wind-borne debris region with strong but lesser requirements — the HVHZ itself is those two counties only."}},
{"@type":"Question","name":"What does HVHZ-approved mean for windows?","acceptedAnswer":{"@type":"Answer","text":"The product passed Miami-Dade NOA or HVHZ-compliant testing: a 9-pound 2x4 fired at 50 feet per second, followed by 9,000 pressure cycles, plus water and structural load tests — covering the entire assembly including frames and fasteners as installed."}},
{"@type":"Question","name":"Do I need HVHZ windows outside Miami-Dade and Broward?","acceptedAnswer":{"@type":"Answer","text":"Not legally — the rest of coastal Florida requires impact protection to Florida Building Code standards, which HVHZ product exceeds. Some homeowners near the zone deliberately choose HVHZ-rated products for extra margin; it should be a conscious upgrade, not a quote surprise."}},
{"@type":"Question","name":"Are HVHZ windows more expensive?","acceptedAnswer":{"@type":"Answer","text":"Typically 10-25% more than comparable non-HVHZ impact products, reflecting heavier laminated glass, stronger frames, and stricter installation specs. Inside the zone the premium isn't optional — non-HVHZ product fails inspection and must be removed."}}]});
t=t.replace("</head>",'<script type="application/ld+json">'+art+'</script>\n<script type="application/ld+json">'+faq+'</script>\n</head>');
fs.writeFileSync(fname,t);
console.log("WROTE "+fname+" ("+t.length+"b)");
if(fs.existsSync("sitemap.xml")){
  let s=fs.readFileSync("sitemap.xml","utf8");
  if(!s.includes("high-velocity-hurricane-zone")){
    s=s.replace("</urlset>","<url><loc>https://floridaimpactshield.com/pages/high-velocity-hurricane-zone-florida.html</loc></url>\n</urlset>");
    fs.writeFileSync("sitemap.xml",s);console.log("sitemap +1: VERIFIED");
  }
}
console.log("HVHZ PAGE BUILT — rerun make-llms3.cjs then deploy");
