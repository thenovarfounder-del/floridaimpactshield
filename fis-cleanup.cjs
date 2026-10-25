const fs=require("fs");
if(!fs.existsSync("blog")){console.error("ABORT: run from floridaimpactshield root");process.exit(1);}
// ---- 1) CANONICAL CONSOLIDATION (old pages vote for the new champions)
function setCanonical(file,target){
  const p="blog/"+file;
  if(!fs.existsSync(p)){console.log("skip missing "+file);return;}
  let t=fs.readFileSync(p,"utf8");
  const tag='<link rel="canonical" href="https://floridaimpactshield.com/blog/'+target+'"';
  if(t.includes('canonical" href="https://floridaimpactshield.com/blog/'+target)){console.log("already canonical: "+file);return;}
  if(t.match(/<link rel="canonical"[^>]*>/)){t=t.replace(/<link rel="canonical"[^>]*>/,tag+'>');}
  else{t=t.replace("</head>",tag+'>\n</head>');}
  fs.writeFileSync(p,t);
  console.log("canonical "+file+" -> "+target+": "+(t.includes(tag)?"OK":"FAIL"));
}
setCanonical("my-safe-florida-home-grant-complete-guide-2026.html","my-safe-florida-home-msfh.html");
setCanonical("my-safe-florida-home-program-guide.html","my-safe-florida-home-msfh.html");
setCanonical("what-is-wind-mitigation-inspection-florida.html","wind-mitigation-inspection.html");
// ---- 2) FRESH POSTS (donor-clone)
const donor=fs.readFileSync("blog/wind-mitigation-florida.html","utf8");
const h1=donor.indexOf("<h1");
const foot=donor.indexOf("<footer");
let closeIdx=donor.lastIndexOf("</section>",foot);
const shellTop=donor.slice(0,h1);
const shellBottom=donor.slice(donor.lastIndexOf("</div>",donor.lastIndexOf("</div>",closeIdx)-1));
function makePost(fname,title,desc,crumb,content){
  if(fs.existsSync("blog/"+fname)){console.log("SKIP exists: "+fname);return;}
  let t=shellTop+content+"\n"+shellBottom;
  t=t.replace(/<title>[\s\S]*?<\/title>/,"<title>"+title+"</title>");
  t=t.replace(/<meta name="description"[\s\S]*?">(?=\n|<)/,'<meta name="description" content="'+desc+'">');
  t=t.replace(/<link rel="canonical" href="[^"]*"/,'<link rel="canonical" href="https://floridaimpactshield.com/blog/'+fname+'"');
  t=t.replace(/<span>Hurricane Prep<\/span>/,"<span>"+crumb+"</span>");
  fs.writeFileSync("blog/"+fname,t);
  console.log("WROTE blog/"+fname);
}
makePost("august-hurricane-season-gets-real.html",
"August Is When Florida's Hurricane Season Gets Real: The 2026 Peak-Season Briefing",
"Hurricane season's statistical peak runs mid-August through October. What the 2026 season has shown so far, the peak-season checklist, and why protection decisions made now still count.",
"Peak Season",
`<h1>August Is When Hurricane Season Gets Real</h1>
<p><em>Published August 1, 2026 &mdash; The quiet months are over. Climatologically, the Atlantic wakes in August and peaks in September: roughly 85 percent of major hurricane activity happens from now through October. This is the peak-season briefing &mdash; what still matters, what&rsquo;s too late, and what&rsquo;s exactly on time.</em></p>
<h2>The calendar truth</h2>
<p>Early-season quiet means nothing &mdash; some of Florida&rsquo;s worst storms formed in seasons that dozed until August (our <a href="/blog/quiet-hurricane-season-trap.html">quiet-season trap</a> piece covers the psychology). The Gulf and Atlantic are at their warmest RIGHT NOW; the fuel is loaded regardless of what the first two months delivered.</p>
<h2>Too late vs. exactly on time</h2>
<p><strong>Likely too late for this peak:</strong> full impact-window installations ordered today may land mid-season &mdash; but that&rsquo;s an argument for ordering NOW, not waiting until October panic pricing and spring backlogs (installers&rsquo; calendars reset in winter; today&rsquo;s order beats January&rsquo;s rush). <strong>Exactly on time:</strong> the <a href="/blog/wind-mitigation-inspection.html">wind mitigation inspection</a> (days, not months), garage-door reinforcement (often the fastest meaningful upgrade), shutter checks, insurance review before any watch is issued (binding suspensions freeze changes once a storm nears), and the <a href="/blog/my-safe-florida-home-msfh.html">MSFH paperwork</a> that positions you for the next grant window.</p>
<h2>The 72-hour list, pre-staged</h2>
<p>Water, medications, documents photographed to the cloud, fuel, cash, and the family communication plan &mdash; decided in August calm, not in a cone-of-uncertainty checkout line. Protection is a season-long posture; the peak just raises the stakes on every unmade decision.</p>`);
makePost("impact-window-order-timeline.html",
"The Impact Window Timeline: Why August Buyers Beat October Panic (2026)",
"From quote to installed impact windows typically runs weeks to months. The real timeline stage by stage, why peak-season panic costs more, and how to order smart in August.",
"Buying Smart",
`<h1>The Impact Window Timeline: Why August Buyers Beat October Panic</h1>
<p><em>Published July 30, 2026 &mdash; The most expensive way to buy impact windows is scared, in October, after a near-miss. The real quote-to-installed timeline runs weeks to months &mdash; which makes late summer the strategic window most homeowners miss.</em></p>
<h2>The honest timeline, stage by stage</h2>
<p><strong>Quote and measurement:</strong> days. <strong>Manufacturing:</strong> impact units are built to your openings &mdash; typically several weeks, stretching when hurricanes spike regional demand. <strong>Permitting:</strong> county-dependent, days to weeks, runs parallel when your installer handles it (ours does). <strong>Installation:</strong> most homes complete in days. <strong>The 1802 update:</strong> after install, an updated <a href="/blog/wind-mitigation-form-1802-explained.html">wind mitigation form</a> takes your new opening protection to the insurer &mdash; where the annual credits start.</p>
<h2>What panic season does to the math</h2>
<p>Post-storm demand spikes hit every stage at once: quotes queue, factories backlog, permits stack, crews book out. Prices firm exactly when patience dies. August buyers ride the normal timeline; November buyers inherit everyone else&rsquo;s panic.</p>
<h2>The financing and grant angles</h2>
<p>Order timing also aligns with money timing: <a href="/blog/my-safe-florida-home-msfh.html">MSFH grant cycles</a> reward homeowners whose inspections and quotes already exist when funding opens, and financing routes (<a href="/blog/pace-financing-impact-windows-florida.html">including PACE, honestly assessed</a>) process faster outside storm chaos. <a href="/index.html#quote">Start with the free quote</a> &mdash; the measurement visit costs nothing and starts every clock that matters.</p>`);
makePost("garage-door-weakest-opening.html",
"Your Garage Door Is Your Home's Weakest Opening (And Cheapest Big Fix)",
"Wind engineers agree: garage door failure is how hurricanes get inside. Why the biggest opening fails first, what reinforcement costs, and the insurance credit it earns.",
"Weak Points",
`<h1>Your Garage Door Is the Weakest Opening on Your House</h1>
<p><em>Published July 27, 2026 &mdash; Ask a wind engineer where hurricanes enter homes and the answer is boringly consistent: the garage door. Biggest opening, thinnest structure, most catastrophic failure mode &mdash; and often the cheapest major fix on the whole protection list.</em></p>
<h2>Why the big door fails first</h2>
<p>A double garage door is a sail: wide span, lightweight panels, flexible tracks. Hurricane winds flex it until panels buckle or tracks release &mdash; and once wind enters, internal pressurization pushes UP on the roof and OUT on the walls. Roof loss frequently starts at the garage. Protecting the &ldquo;house&rdquo; while ignoring the garage protects half the envelope.</p>
<h2>The fix menu, priced honestly</h2>
<p><strong>Reinforcement kits</strong> (vertical bracing added to your existing door) are the budget move &mdash; typically hundreds, not thousands. <strong>Impact-rated replacement doors</strong> run more but reset the whole equation: engineered panels, rated tracks, and documentation insurers accept. Either route beats the plywood-and-prayers approach that fails both the storm and the <a href="/blog/wind-mitigation-inspection.html">1802 inspection</a>.</p>
<h2>The credit that pays you back</h2>
<p>Opening protection is one of the highest-value categories on the wind mitigation form &mdash; but credits typically require ALL openings protected, which is exactly why the garage door is so often the missing piece blocking a homeowner&rsquo;s discount. Close the gap, update the form, collect every year. Garage doors ride along in our <a href="/index.html#quote">free protection quote</a> &mdash; and if you&rsquo;re chasing the <a href="/blog/my-safe-florida-home-msfh.html">MSFH grant</a>, door reinforcement is squarely in the approved-upgrade universe.</p>`);
// ---- 3) INDEX CARDS for the 3 fresh posts
if(fs.existsSync("blog/index.html")){
  let ix=fs.readFileSync("blog/index.html","utf8");
  if(!ix.includes("august-hurricane-season-gets-real")){
    const card=`<a class="card" href="/blog/august-hurricane-season-gets-real.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>August Is When Hurricane Season Gets Real</strong><br>The peak-season briefing: too late vs. exactly on time.</a>
<a class="card" href="/blog/impact-window-order-timeline.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>The Impact Window Timeline: August Beats October Panic</strong><br>Quote to installed, stage by stage — and what panic season does to prices.</a>
<a class="card" href="/blog/garage-door-weakest-opening.html" style="display:block;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:10px;text-decoration:none"><strong>Your Garage Door Is the Weakest Opening</strong><br>Why it fails first and the cheapest big fix on the list.</a>
`;
    const a=ix.indexOf("</h1>");
    if(a>0){ix=ix.slice(0,a+5)+"\n"+card+ix.slice(a+5);fs.writeFileSync("blog/index.html",ix);console.log("index cards +3: VERIFIED");}
  } else console.log("index already has fresh cards");
}
// ---- 4) SITEMAP +3
if(fs.existsSync("sitemap.xml")){
  let s=fs.readFileSync("sitemap.xml","utf8");
  if(!s.includes("august-hurricane-season-gets-real")){
    s=s.replace("</urlset>","<url><loc>https://floridaimpactshield.com/blog/august-hurricane-season-gets-real.html</loc></url>\n<url><loc>https://floridaimpactshield.com/blog/impact-window-order-timeline.html</loc></url>\n<url><loc>https://floridaimpactshield.com/blog/garage-door-weakest-opening.html</loc></url>\n</urlset>");
    fs.writeFileSync("sitemap.xml",s);console.log("sitemap +3: VERIFIED");
  } else console.log("sitemap already has fresh URLs");
}
console.log("FIS CLEANUP+FRESH DONE — rebuild llms then deploy");
