// install-statistics-fis1.cjs — FIS STRIKE: /blog/florida-hurricane-statistics.html link magnet.
// Clones the preparedness-checklist blog shell, swaps head metas + hero h1 + body content, registers in sitemap.xml.
// node install-statistics-fis1.cjs --go
const fs = require('fs'); const path = require('path');
const GO = process.argv.includes('--go');
function die(m){console.error('ABORT: '+m);process.exit(1);}
console.log('===== FIS1 — HURRICANE STATISTICS PAGE ' + (GO?'(APPLYING)':'(DRY RUN — add --go)') + ' =====');
const donor = path.join(process.cwd(),'blog','florida-hurricane-preparedness-checklist-2026.html');
const smPath = path.join(process.cwd(),'sitemap.xml');
if(!fs.existsSync(donor)) die('donor blog page not found — run from the floridaimpactshield root.');
if(!fs.existsSync(smPath)) die('sitemap.xml not found.');
const TITLE='Florida Hurricane Statistics 2026: Landfalls, Costs & Insurance Data';
const DESC='Florida hurricane statistics: 120+ landfalls since 1851, the costliest storms (Ian ~$112B), homeowners insurance premium data, and the statutory wind-mitigation discounts — compiled from NOAA, NHC and III. Free to cite.';
const URL='https://floridaimpactshield.com/blog/florida-hurricane-statistics.html';
const HERO='Florida Hurricane &amp; Impact Statistics (2026): The Data Page';
let html = fs.readFileSync(donor,'utf8');
html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>'+TITLE+'</title>');
html = html.replace(/(<meta name="description" content=")[^"]*(")/, '$1'+DESC+'$2');
html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, '$1'+TITLE+'$2');
html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, '$1'+DESC+'$2');
html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, '$1'+URL+'$2');
html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, '$1'+URL+'$2');
const SCHEMA={"@context":"https://schema.org","@type":"BlogPosting","headline":TITLE,"description":DESC,"url":URL,"datePublished":"July 25, 2026","publisher":{"@type":"Organization","name":"Florida Impact Shield","url":"https://floridaimpactshield.com"}};
html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '<script type="application/ld+json">\n'+JSON.stringify(SCHEMA)+'\n</script>');
// hero h1 (the clamp-styled one)
if(!/<h1 style="font-size:clamp/.test(html)) die('hero h1 anchor not found.');
html = html.replace(/<h1 style="font-size:clamp[^>]*>[\s\S]*?<\/h1>/, '<h1 style="font-size:clamp(28px,4vw,44px);margin-bottom:16px">'+HERO+'</h1>');
// body swap: from blog-body opening tag end to fis-hubnav start
const bi = html.indexOf('class="blog-body"');
const hi = html.indexOf('<nav class="fis-hubnav"');
if(bi===-1||hi===-1) die('blog-body / fis-hubnav anchors not found.');
const openEnd = html.indexOf('>', bi) + 1;
const content = fs.readFileSync(path.join(__dirname,'payload','content.html'),'utf8');
html = html.slice(0,openEnd) + '\n<h1>'+HERO+'</h1>\n' + content + '\n</div>\n' + html.slice(hi);
const outFile = path.join(process.cwd(),'blog','florida-hurricane-statistics.html');
if(GO){ if(fs.existsSync(outFile)) fs.copyFileSync(outFile,outFile+'.fis1bak'); fs.writeFileSync(outFile,html); }
console.log((GO?'WROTE':'WILL WRITE')+' blog/florida-hurricane-statistics.html (shell cloned)');
let sm = fs.readFileSync(smPath,'utf8');
if(sm.includes('florida-hurricane-statistics')){ console.log('sitemap already registers page — skipping.'); }
else {
  if(!sm.includes('</urlset>')) die('</urlset> not found.');
  sm = sm.replace('</urlset>', '  <url>\n    <loc>'+URL+'</loc>\n    <lastmod>2026-07-25</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>');
  if(GO){ fs.copyFileSync(smPath,smPath+'.fis1bak'); fs.writeFileSync(smPath,sm); }
  console.log((GO?'PATCHED':'WILL PATCH')+' sitemap.xml (+hurricane-statistics)');
}
console.log('\nDONE. New page: /blog/florida-hurricane-statistics.html');
console.log('Next: npx vercel --prod');
