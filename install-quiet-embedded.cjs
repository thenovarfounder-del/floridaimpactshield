const EMBED="<p><em>Every hurricane season begins with a forecast — and in the years the forecast says &ldquo;quiet,&rdquo; something dangerous happens to human behavior. Preparation spending drops. Grant programs go under-used. Shutters stay in garages. This page is about the most expensive trap in hurricane country: <strong>believing a calm outlook is a promise.</strong> The record says otherwise, and the record has a name: Andrew.</em></p>\n\n<h2>1992: the quiet season that rewrote Florida</h2>\n<p>The 1992 Atlantic season was forecast to be below average — and it delivered on that forecast, producing only a handful of storms. One of them was <strong>Hurricane Andrew</strong>, which struck South Florida as a Category 5, destroyed or damaged well over 100,000 homes, and remains one of the costliest disasters in American history. It rewrote Florida's building codes, collapsed insurers, and taught the lesson every forecaster now repeats: <strong>seasonal outlooks predict activity levels, not landfalls.</strong> A &ldquo;quiet&rdquo; season with one bad storm in the wrong place is worse than a busy season that stays at sea. The National Hurricane Center's own refrain exists for exactly this reason: <em>it only takes one.</em></p>\n\n<h2>What seasonal forecasts actually are (and aren't)</h2>\n<p>Seasonal outlooks from NOAA and university teams estimate <strong>how many storms may form basin-wide</strong> — shaped by factors like El Ni&ntilde;o/La Ni&ntilde;a and Atlantic sea-surface temperatures. They are legitimate science doing exactly what they claim. What they have never claimed to do is tell you <strong>whether a storm will reach your street</strong>. Landfall is a matter of steering currents in a given week — unknowable months ahead. Treating an activity forecast as a personal all-clear isn't reading the science; it's misreading it. And storms forming near Florida during seasons framed as calm — as has already happened in recent seasons — isn't the forecast &ldquo;failing.&rdquo; It's the fine print doing what fine print does.</p>\n\n<h2>The complacency gap: where quiet years cost the most</h2>\n<p>Industry and emergency-management surveys find the same pattern every cycle: <strong>preparedness activity tracks the forecast, not the risk.</strong> In louder years, inspection bookings, shutter orders and grant applications surge — often into backlogs. In quiet-forecast years, they slump. The result is a gap measured in unclaimed money and unprotected openings: statutory <a href=\"/blog/wind-mitigation-florida.html\">wind-mitigation insurance credits</a> that go unfiled, <a href=\"/blog/my-safe-florida-home-grant-complete-guide-2026.html\">My Safe Florida Home matching grants</a> — $2 of state money per $1 of homeowner spending, up to $10,000 — that go unapplied-for, and hardening projects deferred into the exact years when installers are booked solid and prices peak.</p>\n\n<h2>The contrarian math: quiet years are the buying opportunity</h2>\n<p>Set aside fear entirely — the calm-season case for hardening is <strong>financial</strong>: contractors have open calendars instead of storm-rush backlogs; grant funding rounds are likelier to have money left; and the <a href=\"/blog/wind-mitigation-form-1802-explained.html\">insurance credits</a> a hardened home earns start paying <em>immediately</em> — hundreds to thousands per year off the premium — whether or not a storm ever comes. Protection bought in a quiet year is cheaper to schedule, partially state-funded, and cash-flowing before the first advisory of the next busy season. The homeowners who wait for a cone on the map pay rush prices for the same windows.</p>\n\n<h2>The honest checklist for a &ldquo;quiet&rdquo; season</h2>\n<p><strong>One:</strong> get the <a href=\"/blog/what-is-wind-mitigation-inspection-florida.html\">$75&ndash;$150 wind-mitigation inspection</a> and file the 1802 — five years of validity, credits that pay in any weather. <strong>Two:</strong> check <a href=\"/blog/my-safe-florida-home-program-guide.html\">MSFH</a> application status while funding lasts. <strong>Three:</strong> count your openings — the credit for <a href=\"/blog/impact-windows-insurance-discount-florida.html\">opening protection</a> is all-or-nothing, and one forgotten garage window voids it. <strong>Four:</strong> keep the <a href=\"/blog/florida-hurricane-preparedness-checklist-2026.html\">preparedness basics</a> current, because the <a href=\"/blog/florida-hurricane-statistics.html\">forty-percent state</a> doesn't take seasons off. Complacency is the storm before the storm — and unlike the weather, it's entirely within your control.</p>\n";
// install-windmitigation-fis2.cjs — QUIET SEASON TRAP — press-campaign pillar.
// Clone-shell from the proven donor; validates every internal spoke link against YOUR disk before shipping.
// node install-quiet-embedded.cjs --go
const fs = require('fs'); const path = require('path');
const GO = process.argv.includes('--go');
function die(m){console.error('ABORT: '+m);process.exit(1);}
console.log('===== FIS4 — QUIET SEASON PILLAR ' + (GO?'(APPLYING)':'(DRY RUN — add --go)') + ' =====');
const donor = path.join(process.cwd(),'blog','florida-hurricane-preparedness-checklist-2026.html');
const smPath = path.join(process.cwd(),'sitemap.xml');
if(!fs.existsSync(donor)) die('donor blog page not found — run from the floridaimpactshield root.');
if(!fs.existsSync(smPath)) die('sitemap.xml not found.');
const PAGES=[
 {slug:'quiet-hurricane-season-trap', payload:'quiet.html',
  title:'The Quiet Season Trap: Why Calm Hurricane Forecasts Are the Most Dangerous Ones',
  desc:'Seasonal outlooks predict activity, not landfalls — 1992 was forecast quiet and delivered Andrew. Why preparation drops exactly when the math favors it, and the quiet-year checklist for Florida homeowners.',
  hero:'The Quiet Season Trap: Why Calm Forecasts Breed the Costliest Mistakes'}
];
function buildPage(P){
  let html = fs.readFileSync(donor,'utf8');
  const URL='https://floridaimpactshield.com/blog/'+P.slug+'.html';
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>'+P.title+'</title>');
  html = html.replace(/(<meta name="description" content=")[^"]*(")/,'$1'+P.desc+'$2');
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,'$1'+P.title+'$2');
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,'$1'+P.desc+'$2');
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/,'$1'+URL+'$2');
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,'$1'+URL+'$2');
  const SCHEMA={"@context":"https://schema.org","@type":"BlogPosting","headline":P.title,"description":P.desc,"url":URL,"datePublished":"July 25, 2026","publisher":{"@type":"Organization","name":"Florida Impact Shield","url":"https://floridaimpactshield.com"}};
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,'<script type="application/ld+json">\n'+JSON.stringify(SCHEMA)+'\n</script>');
  if(!/<h1 style="font-size:clamp/.test(html)) die('hero h1 anchor not found in donor.');
  html = html.replace(/<h1 style="font-size:clamp[^>]*>[\s\S]*?<\/h1>/,'<h1 style="font-size:clamp(28px,4vw,44px);margin-bottom:16px">'+P.hero+'</h1>');
  const bi = html.indexOf('class="blog-body"'); const hi = html.indexOf('<nav class="fis-hubnav"');
  if(bi===-1||hi===-1) die('blog-body / fis-hubnav anchors not found.');
  const openEnd = html.indexOf('>',bi)+1;
  const content = EMBED;
  return {html: html.slice(0,openEnd)+'\n<h1>'+P.hero+'</h1>\n'+content+'\n</div>\n'+html.slice(hi), URL};
}
// LINK VALIDATION: every /blog/*.html href in payloads must exist on disk (except the two new pages)
const newSlugs = PAGES.map(p=>'/blog/'+p.slug+'.html');
let broken=0, checked=0;
for(const P of PAGES){
  const c = EMBED;
  for(const m of c.matchAll(/href="(\/blog\/[^"]+)"/g)){
    checked++;
    if(newSlugs.includes(m[1])) continue;
    if(!fs.existsSync(path.join(process.cwd(), m[1].replace(/^\//,'')))){ broken++; console.log('  MISSING SPOKE: '+m[1]); }
  }
}
console.log('Spoke links validated: '+checked+' checked, '+broken+' missing');
if(broken>0) die('spoke links point at files that do not exist — tell me the MISSING lines above and I re-aim.');
// write pages
for(const P of PAGES){
  const {html} = buildPage(P);
  const out = path.join(process.cwd(),'blog',P.slug+'.html');
  if(GO){ if(fs.existsSync(out)) fs.copyFileSync(out,out+'.fis4bak'); fs.writeFileSync(out,html); }
  console.log((GO?'WROTE ':'WILL WRITE ')+'blog/'+P.slug+'.html');
}
// sitemap
let sm = fs.readFileSync(smPath,'utf8');
let added=0;
for(const P of PAGES){
  if(sm.includes(P.slug)) continue;
  if(!sm.includes('</urlset>')) die('</urlset> not found.');
  sm = sm.replace('</urlset>', '  <url>\n    <loc>https://floridaimpactshield.com/blog/'+P.slug+'.html</loc>\n    <lastmod>2026-07-25</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>');
  added++;
}
if(GO && added){ fs.copyFileSync(smPath,smPath+'.fis4bak'); fs.writeFileSync(smPath,sm); }
console.log((added? (GO?'PATCHED':'WILL PATCH')+' sitemap.xml (+'+added+')' : 'sitemap already registers both — skipping.'));
console.log('\nDONE. New: /blog/quiet-hurricane-season-trap.html');
console.log('Next: npx vercel --prod');
