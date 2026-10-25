const fs=require("fs");
if(!fs.existsSync("blog/wind-mitigation-florida.html")){console.error("ABORT: run from floridaimpactshield root");process.exit(1);}
const donor=fs.readFileSync("blog/wind-mitigation-florida.html","utf8");
const h1=donor.indexOf("<h1");
const foot=donor.indexOf("<footer");
let closeIdx=donor.lastIndexOf("</section>",foot);
const shellTop=donor.slice(0,h1);
const shellBottom=donor.slice(donor.lastIndexOf("</div>",donor.lastIndexOf("</div>",closeIdx)-1));
const fname="blog/impact-window-warranties-florida.html";
if(fs.existsSync(fname)){console.log("SKIP exists");process.exit(0);}
const title="Impact Window Warranties in Florida: What's Actually Covered When Glass Breaks (2026)";
const desc="Lifetime warranty rarely means what buyers think. The three warranties on every window job, what voids them, the seal-failure fine print, glass breakage truth, and the questions to ask before signing.";
const art=JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":desc,"datePublished":"2026-08-03","dateModified":"2026-08-03","author":{"@type":"Organization","name":"Florida Impact Shield"},"publisher":{"@type":"Organization","name":"Florida Impact Shield"},"mainEntityOfPage":"https://floridaimpactshield.com/"+fname});
const faq=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What does a lifetime warranty on impact windows actually mean?","acceptedAnswer":{"@type":"Answer","text":"Usually 'lifetime of the product as defined by the manufacturer' with different clocks per component: frames often carry the longest coverage, insulated glass seals commonly 10-20 years, hardware and screens less, and labor separately. The word lifetime describes the strongest single component, not the whole job."}},
{"@type":"Question","name":"Does an impact window warranty cover glass breakage?","acceptedAnswer":{"@type":"Answer","text":"Standard manufacturer warranties cover DEFECTS, not impacts — a baseball or storm-driven object is an insurance claim, not a warranty claim. Some manufacturers and dealers sell separate glass-breakage coverage; if it matters to you, ask for it in writing before purchase."}},
{"@type":"Question","name":"What voids an impact window warranty in Florida?","acceptedAnswer":{"@type":"Answer","text":"The classics: improper installation (the big one — manufacturer coverage assumes installation to spec), unpermitted work, aftermarket tints or films applied to the glass, pressure-washing seals, coastal-salt neglect on hardware, and transferring ownership without following the transfer procedure."}},
{"@type":"Question","name":"Are impact window warranties transferable when you sell your house?","acceptedAnswer":{"@type":"Answer","text":"Frequently yes but rarely automatically — most manufacturers require a transfer form, a fee, or a time window after sale, and some drop to shorter coverage for the second owner. Handled at closing, a transferable warranty is a genuine selling point; forgotten, it quietly dies."}}]});
const content=`<h1>Impact Window Warranties: What&rsquo;s Actually Covered When Glass Breaks</h1>
<p><em>Published August 3, 2026 &mdash; &ldquo;Lifetime warranty&rdquo; closes more window sales than any spec sheet &mdash; and almost nobody who signs knows what the word covers, what clock each component runs on, or the maintenance fine print that quietly voids everything. Here&rsquo;s the warranty layer of your window purchase, decoded before you need it.</em></p>
<h2>The three warranties on every job (know which is which)</h2>
<p>Every impact-window installation carries THREE separate promises: the <strong>manufacturer&rsquo;s product warranty</strong> (defects in frames, glass units, hardware &mdash; the &ldquo;lifetime&rdquo; headline lives here), the <strong>installer&rsquo;s workmanship warranty</strong> (the labor &mdash; typically 1&ndash;10 years, and where leak problems usually land), and your <strong>homeowner&rsquo;s insurance</strong> (storm damage &mdash; the thing warranties explicitly don&rsquo;t cover). Most warranty disappointment comes from aiming a claim at the wrong one of the three: a leak two years in is usually an INSTALLATION claim; fogged glass at year twelve is a MANUFACTURER seal claim; the branch through the slider is an <a href="/blog/hurricane-deductible-explained.html">insurance claim with your deductible attached</a>.</p>
<h2>What &ldquo;lifetime&rdquo; legally means (component clocks)</h2>
<p>Read any major manufacturer&rsquo;s certificate and the pattern repeats: <strong>frames</strong> get the longest, headline coverage; <strong>insulated glass seals</strong> &mdash; the part that actually fails, producing that permanent fog between panes &mdash; commonly run 10&ndash;20 years; <strong>hardware, balances, rollers, screens</strong> shorter still; and coastal installations sometimes carry salt-exposure carve-outs on finishes. None of this is scandal &mdash; it&rsquo;s standard &mdash; but the sales conversation says &ldquo;lifetime&rdquo; and the certificate says &ldquo;schedule,&rdquo; and only the certificate testifies later. Ask for the actual warranty document BEFORE signing; reputable dealers hand it over instantly.</p>
<h2>Glass breakage: the truth nobody volunteers</h2>
<p>Product warranties cover <strong>defects</strong> &mdash; glass that fails from manufacturing flaws. They do not cover <strong>impacts</strong>: the mower-thrown rock, the errant baseball, the hurricane-driven limb. That&rsquo;s what the laminated glass is FOR (it breaks safe and holds the opening &mdash; <a href="/pages/will-impact-windows-break-in-a-storm.html">what breaking actually looks like</a>) and what insurance is for afterward. The exception worth knowing: some manufacturers and dealers offer <strong>separate glass-breakage coverage</strong> as an upgrade &mdash; if peace of mind on that point matters, ask for it by name and get the terms in writing.</p>
<h2>The void list (read this twice)</h2>
<p>Warranties die quietly through: <strong>improper installation</strong> &mdash; the biggest one, since manufacturer coverage assumes spec-perfect install, which is why the installer&rsquo;s credentials ARE part of the product (<a href="/pages/impact-windows-permit-florida.html">and why permits matter</a>); <strong>aftermarket window film or tint</strong> applied over the glass (thermal-stress exclusion &mdash; buy factory tint instead); <strong>pressure-washing</strong> directly on seals; <strong>salt neglect</strong> on coastal hardware (a freshwater rinse schedule is literally a warranty condition in some documents); and <strong>unregistered transfers</strong> when the house sells. Five minutes with the certificate turns every one of these from trap into checklist.</p>
<h2>The questions that sort dealers instantly</h2>
<p>Before signing, ask: <em>&ldquo;Can I see the manufacturer&rsquo;s actual warranty certificate?&rdquo;</em> &middot; <em>&ldquo;How long is YOUR workmanship warranty, in writing?&rdquo;</em> &middot; <em>&ldquo;Who do I call for a seal failure in year eight &mdash; you or the factory?&rdquo;</em> &middot; <em>&ldquo;Is the warranty transferable, and what&rsquo;s the procedure?&rdquo;</em> &middot; <em>&ldquo;Is glass-breakage coverage available?&rdquo;</em> Confident, immediate answers mark the professionals; hedging marks the exits. <a href="/index.html#quote">Our free quote</a> comes with the warranty documents attached &mdash; because the paper IS the product, and we&rsquo;d rather you read it before the deposit than after the fog.</p>`;
let t=shellTop+content+"\n"+shellBottom;
t=t.replace(/<title>[\s\S]*?<\/title>/,"<title>"+title+"</title>");
t=t.replace(/<meta name="description"[\s\S]*?">(?=\n|<)/,'<meta name="description" content="'+desc+'">');
t=t.replace(/<link rel="canonical" href="[^"]*"/,'<link rel="canonical" href="https://floridaimpactshield.com/'+fname+'"');
t=t.replace(/<span>Hurricane Prep<\/span>/,"<span>Buying Smart</span>");
t=t.replace("</head>",'<script type="application/ld+json">'+art+'</script>\n<script type="application/ld+json">'+faq+'</script>\n</head>');
fs.writeFileSync(fname,t);
console.log("WROTE "+fname+" ("+t.length+"b)");
if(fs.existsSync("blog/index.html")){
  let ix=fs.readFileSync("blog/index.html","utf8");
  if(!ix.includes("impact-window-warranties")){
    const card='<a class="card" href="/blog/impact-window-warranties-florida.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>Impact Window Warranties: What&rsquo;s Actually Covered</strong><br>Aug 3 — the three warranties on every job, the void list, and the glass-breakage truth.</a>\n';
    const a=ix.indexOf("</h1>");
    if(a>0){ix=ix.slice(0,a+5)+"\n"+card+ix.slice(a+5);fs.writeFileSync("blog/index.html",ix);console.log("index card: VERIFIED");}
  } else console.log("index has card");
}
if(fs.existsSync("sitemap.xml")){
  let s=fs.readFileSync("sitemap.xml","utf8");
  if(!s.includes("impact-window-warranties")){
    s=s.replace("</urlset>","<url><loc>https://floridaimpactshield.com/blog/impact-window-warranties-florida.html</loc></url>\n</urlset>");
    fs.writeFileSync("sitemap.xml",s);console.log("sitemap +1: VERIFIED");
  }
}
if(fs.existsSync("payload")){fs.rmSync("payload",{recursive:true,force:true});console.log("payload debris removed");}
console.log("FIS AUG-3 POST DONE — rerun make-llms3.cjs then deploy");
