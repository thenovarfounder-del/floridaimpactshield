const fs=require("fs");
if(!fs.existsSync("blog/wind-mitigation-florida.html")){console.error("ABORT: run from floridaimpactshield root");process.exit(1);}
const donor=fs.readFileSync("blog/wind-mitigation-florida.html","utf8");
// split donor: head+shell up to <h1, and from <footer to end
const h1=donor.indexOf("<h1");
const foot=donor.indexOf("<footer");
const bodyEndMarker=donor.lastIndexOf("</div>",foot); // close of blog-body/container before footer — conservative: rebuild segment
// Simpler robust approach: take shell = up to start of <h1 ... then we inject h1+content, then find the closing sequence right before <footer.
const shellTop=donor.slice(0,h1);
const shellBottom=donor.slice(donor.lastIndexOf("</div>\n</div>\n</section>",foot)>0?donor.lastIndexOf("</div>\n</div>\n</section>",foot):foot- ("</div></div></section>".length), );
// Fallback: locate section close before footer generically
let closeIdx=donor.lastIndexOf("</section>",foot);
const shellBottom2=donor.slice(closeIdx- "</div>\n  </div>\n".length*3 <0?closeIdx:donor.lastIndexOf("</div>",closeIdx-30)>0?donor.lastIndexOf("</div>",donor.lastIndexOf("</div>",closeIdx)-1):closeIdx);
function makePage(fname,title,desc,canonical,crumb,content){
  let t=shellTop+content+"\n"+donor.slice(donor.lastIndexOf("</div>",donor.lastIndexOf("</div>",closeIdx)-1));
  // swap title/desc/canonical in head
  t=t.replace(/<title>[\s\S]*?<\/title>/,"<title>"+title+"</title>");
  t=t.replace(/<meta name="description"[\s\S]*?">(?=\n|<)/, '<meta name="description" content="'+desc+'">');
  t=t.replace(/<link rel="canonical" href="[^"]*"/,'<link rel="canonical" href="'+canonical+'"');
  t=t.replace(/<span>Hurricane Prep<\/span>/,"<span>"+crumb+"</span>");
  if(fs.existsSync("blog/"+fname)){console.log("SKIP exists: "+fname);return;}
  fs.writeFileSync("blog/"+fname,t);
  console.log("WROTE blog/"+fname+" ("+t.length+" bytes)");
}
const MSFH=`<h1>My Safe Florida Home (MSFH): The 2026 Program Guide</h1>
<p><em>MSFH is the state program that inspects your home for free and then matches your hurricane-hardening dollars $2-for-$1 &mdash; up to $10,000 in state money. It is also chronically misunderstood, periodically sold out, and surrounded by myths. This is the straight guide: eligibility, the money, the process, and the timing that decides who actually benefits.</em></p>
<h2>What the program actually gives you</h2>
<p>Two things, in sequence. First, a <strong>free wind mitigation inspection</strong> by a state-arranged inspector &mdash; the same class of inspection that unlocks insurance premium credits (see our <a href="/blog/wind-mitigation-florida.html">complete wind mitigation guide</a>). Second, for homes that qualify after inspection, a <strong>matching grant</strong>: the state contributes $2 for every $1 you spend on approved hardening upgrades, capped at $10,000 of state money against your $5,000. Approved categories center on opening protection &mdash; impact-rated windows and doors, garage door reinforcement, and roof-related improvements identified by your inspection report.</p>
<h2>Who qualifies</h2>
<p>Core requirements have included: site-built, single-family, owner-occupied homes serving as your homestead; a valid homestead exemption; located in Florida (with priority historically given to homes in the wind-borne debris region); an insured value within program limits; and a completed MSFH inspection before any grant application. Renters, condos above certain configurations, and investment properties sit outside the core program. Rules shift between funding cycles &mdash; always confirm the current cycle&rsquo;s terms on the official state portal before planning.</p>
<h2>The funding-cycle reality nobody tells you</h2>
<p>MSFH runs on legislative appropriations &mdash; when a cycle&rsquo;s money is spoken for, applications pause until the next round. The families who capture grants are the ones with a completed inspection IN HAND when a window opens, because the queue forms in hours, not weeks. The play: request the free inspection as soon as the portal allows, complete any application steps immediately, and treat funding announcements like storm warnings &mdash; act on day one.</p>
<h2>The process, start to finish</h2>
<p><strong>1.</strong> Apply for the free inspection on the official MSFH portal (never pay anyone to &ldquo;register&rdquo; you). <strong>2.</strong> Inspector documents your home&rsquo;s existing features and lists eligible improvements. <strong>3.</strong> If grant funding is open and you qualify, apply with your inspection report. <strong>4.</strong> Upon approval, hire your contractor for approved work &mdash; keep every invoice. <strong>5.</strong> Submit completion documents; the state pays its match. <strong>6.</strong> Take your new wind mitigation certificate to your insurer and collect the premium credits that keep paying every year after.</p>
<h2>The double payoff most homeowners miss</h2>
<p>The grant is the headline; the <strong>insurance credits are the annuity</strong>. Impact windows and doors installed under MSFH qualify for the same statutory premium discounts any wind mitigation features earn &mdash; hundreds per year, every year. A $5,000 homeowner contribution that triggers $10,000 of state-funded protection AND a permanent premium reduction is the best math in Florida homeownership.</p>
<h2>Where impact doors and windows fit</h2>
<p>Opening protection is the heart of both the grant categories and the insurance credits &mdash; and it&rsquo;s what we do. If your MSFH inspection flags unprotected openings, <a href="/index.html#quote">get our free impact door and window quote</a> and bring real numbers to your grant application. We work with MSFH timelines and paperwork weekly.</p>`;
const WMI=`<h1>Wind Mitigation Inspection in Florida: Cost, Process &amp; What It Unlocks (2026)</h1>
<p><em>A wind mitigation inspection is a $75&ndash;$150 visit that routinely unlocks hundreds of dollars in annual insurance credits &mdash; and it&rsquo;s the gateway document for My Safe Florida Home grants. Here&rsquo;s exactly what happens, what it costs, what the inspector looks for, and how the money flows afterward.</em></p>
<h2>What it costs and how long it takes</h2>
<p>Expect roughly <strong>$75&ndash;$150</strong> from licensed private inspectors, 30&ndash;60 minutes on site, and a completed <strong>Uniform Mitigation Verification form (OIR-B1-1802)</strong> delivered within days. Through the <a href="/blog/my-safe-florida-home-msfh.html">My Safe Florida Home program</a>, the same inspection is <strong>free</strong> when program funding is active &mdash; the smart first stop before paying privately.</p>
<h2>The seven things the inspector documents</h2>
<p>The 1802 form covers seven categories: <strong>roof covering</strong> (age and installation standard), <strong>roof deck attachment</strong> (nail size and spacing), <strong>roof-to-wall connection</strong> (toe nails vs clips vs single or double wraps &mdash; the biggest single credit), <strong>roof geometry</strong> (hip roofs earn more), <strong>secondary water resistance</strong>, <strong>opening protection</strong> (impact-rated windows, doors, and shutters &mdash; the category you can most easily upgrade), and gable-end bracing where applicable. You earn credits for what EXISTS; the report doubles as your upgrade shopping list.</p>
<h2>What the credits are actually worth</h2>
<p>Florida law requires insurers to credit documented mitigation features. Real-world results vary by home, insurer, and county, but hundreds per year is routine and four-figure annual savings happen on wind-heavy policies with strong feature sets. Against a sub-$150 inspection, payback is typically measured in months &mdash; then repeats every renewal. Full credit mechanics live in our <a href="/blog/wind-mitigation-florida.html">complete wind mitigation guide</a>.</p>
<h2>Inspection vs. grant: the order of operations</h2>
<p><strong>Inspection first, always.</strong> It costs little or nothing, unlocks credits immediately, and becomes your required ticket if <a href="/blog/my-safe-florida-home-msfh.html">MSFH grant funding</a> opens &mdash; the queue rewards homeowners whose paperwork already exists. There is no scenario where waiting helps.</p>
<h2>Common failure points (avoid these)</h2>
<p>Using an unlicensed &ldquo;inspector&rdquo; whose form insurers reject; losing the 1802 (insurers want the current form, typically valid five years); assuming your insurer applied credits automatically &mdash; SEND the form and confirm the discount line by line; and upgrading openings without impact-rated, code-approved products that actually earn the credit. On that last one &mdash; impact doors and windows are our trade: <a href="/index.html#quote">free quote here</a>, and we&rsquo;ll make sure what you install is what the form rewards.</p>`;
makePage("my-safe-florida-home-msfh.html",
 "My Safe Florida Home (MSFH): The 2026 Program Guide — Grants, Eligibility & Timing",
 "The MSFH program explained: free wind mitigation inspections, $2-for-$1 matching grants up to $10,000, eligibility rules, the funding-cycle timing that decides winners, and the insurance credits after.",
 "https://floridaimpactshield.com/blog/my-safe-florida-home-msfh.html",
 "MSFH Program",MSFH);
makePage("wind-mitigation-inspection.html",
 "Wind Mitigation Inspection Florida: Cost, Process & Credits (2026)",
 "What a Florida wind mitigation inspection costs ($75-$150 or free via MSFH), the seven categories on Form 1802, what the insurance credits are worth, and the mistakes that void them.",
 "https://floridaimpactshield.com/blog/wind-mitigation-inspection.html",
 "Wind Mitigation Inspection",WMI);
// link them from blog index if exists
if(fs.existsSync("blog/index.html")){
  let ix=fs.readFileSync("blog/index.html","utf8");
  if(!ix.includes("my-safe-florida-home-msfh")){
    const card=`<a class="card" href="/blog/my-safe-florida-home-msfh.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>My Safe Florida Home (MSFH): The 2026 Program Guide</strong><br>Free inspections, $2-for-$1 grants up to $10,000, and the timing that decides winners.</a>
<a class="card" href="/blog/wind-mitigation-inspection.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>Wind Mitigation Inspection: Cost, Process &amp; Credits</strong><br>The $75-$150 visit that unlocks hundreds a year — and the seven things inspectors check.</a>
`;
    const anchor=ix.indexOf("<h1");
    const insertAt=ix.indexOf("</h1>",anchor);
    if(insertAt>0){ix=ix.slice(0,insertAt+5)+"\n"+card+ix.slice(insertAt+5);fs.writeFileSync("blog/index.html",ix);console.log("blog index cards: "+(ix.includes("msfh")?"VERIFIED":"FAILED"));}
    else console.log("blog index anchor not found — cards skipped");
  } else console.log("blog index already has cards");
}
// sitemap append if exists
if(fs.existsSync("sitemap.xml")){
  let s=fs.readFileSync("sitemap.xml","utf8");
  if(!s.includes("my-safe-florida-home-msfh")){
    s=s.replace("</urlset>","<url><loc>https://floridaimpactshield.com/blog/my-safe-florida-home-msfh.html</loc></url>\n<url><loc>https://floridaimpactshield.com/blog/wind-mitigation-inspection.html</loc></url>\n</urlset>");
    fs.writeFileSync("sitemap.xml",s);
    console.log("sitemap: "+(s.includes("msfh")?"VERIFIED +2 URLs":"FAILED"));
  } else console.log("sitemap already has URLs");
} else console.log("no sitemap.xml at root — tell Claude");
console.log("MSFH STRIKE INSTALLED — deploy next");
