// install-windmitigation-fis2.cjs — QUIET SEASON TRAP — press-campaign pillar.
// Clone-shell from the proven donor; validates every internal spoke link against YOUR disk before shipping.
// node install-quiet-fis4.cjs --go
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
  const content = fs.readFileSync(path.join(__dirname,'payload',P.payload),'utf8');
  return {html: html.slice(0,openEnd)+'\n<h1>'+P.hero+'</h1>\n'+content+'\n</div>\n'+html.slice(hi), URL};
}
// LINK VALIDATION: every /blog/*.html href in payloads must exist on disk (except the two new pages)
const newSlugs = PAGES.map(p=>'/blog/'+p.slug+'.html');
let broken=0, checked=0;
for(const P of PAGES){
  const c = fs.readFileSync(path.join(__dirname,'payload',P.payload),'utf8');
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
