// install-shield-funnel.cjs — THE SHIELD BRIEFING funnel for FIS: bottom band + mid-article bar on every page.
// Static-site patcher: walks all .html files, inserts both catchers, idempotent, backs up nothing it doesn't touch.
// node install-shield-funnel.cjs --go   (from the floridaimpactshield root)
const fs=require('fs'),path=require('path');
const GO=process.argv.includes('--go');
const SUB='https://shieldbriefing.beehiiv.com/subscribe';
function die(m){console.error('ABORT: '+m);process.exit(1);}
console.log('===== SHIELD BRIEFING FUNNEL '+(GO?'(APPLYING)':'(DRY RUN — add --go)')+' =====');
if(!fs.existsSync(path.join(process.cwd(),'sitemap.xml')) || !fs.existsSync(path.join(process.cwd(),'blog'))) die('run from the floridaimpactshield root (needs sitemap.xml + blog/).');
const BAND=`
<section class="sb-signup" style="background:#0f2436;color:#fff;padding:30px 20px;margin-top:40px">
  <div style="max-width:720px;margin:0 auto;text-align:center">
    <div style="font-size:12.5px;letter-spacing:.08em;color:#d6a44e;font-weight:700;margin-bottom:8px">FREE FLORIDA MONEY ALERTS</div>
    <div style="font-size:23px;font-weight:800;line-height:1.25;margin-bottom:10px">Hear about the money FIRST.</div>
    <p style="font-size:15px;color:#c9d6de;margin:0 0 16px">My Safe Florida Home grant windows open and run out. Insurance rules change every season. The Shield Briefing emails you the day it happens \u2014 free, plain English, from this site's team.</p>
    <a href="${SUB}?utm_source=floridaimpactshield" rel="noopener" style="display:inline-block;background:#d6a44e;color:#0f2436;font-weight:800;padding:12px 28px;border-radius:6px;text-decoration:none;font-size:15.5px">Get Free Florida Alerts &rarr;</a>
    <div style="font-size:11.5px;color:#8fa2ae;margin-top:9px">No spam. Unsubscribe anytime.</div>
  </div>
</section>
`;
const MIDJS=`
<script>
(function(){
  function sb(){
    if(document.getElementById('sb-midbar')) return;
    var scope=document.querySelector('.blog-body')||document.querySelector('article')||document.querySelector('main');
    if(!scope) return;
    var heads=scope.querySelectorAll('h2'); var target=null;
    if(heads.length>=2) target=heads[1];
    else { var ps=scope.querySelectorAll('p'); if(ps.length>=5) target=ps[4]; }
    if(!target) return;
    var bar=document.createElement('div');
    bar.id='sb-midbar';
    bar.style.cssText='background:#0f2436;border-radius:8px;padding:13px 17px;margin:24px 0;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap';
    bar.innerHTML='<div style="color:#fff;font-size:14.5px;line-height:1.4"><strong style="color:#d6a44e">\\u26A1 Free Florida money alerts</strong><span style="color:#c9d6de"> \\u2014 grant windows, insurance changes, storm deadlines.</span></div><a href="${SUB}?utm_source=floridaimpactshield&utm_medium=midbar" rel="noopener" style="background:#d6a44e;color:#0f2436;font-weight:800;padding:8px 16px;border-radius:5px;text-decoration:none;font-size:13.5px;white-space:nowrap">Join free \\u2192</a>';
    target.parentNode.insertBefore(bar,target);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',sb); else sb();
})();
</script>
`;
let files=[];
function collect(d){for(const e of fs.readdirSync(d)){const f=path.join(d,e);const st=fs.statSync(f);
  if(st.isDirectory()&&!['node_modules','.git','.vercel'].includes(e)) collect(f);
  else if(e.endsWith('.html')&&!e.includes('.bak')&&!/\.(fis|sc|sb)\d?bak/.test(e)) files.push(f);}}
collect(process.cwd());
console.log('HTML files found: '+files.length);
let banded=0, jsed=0, skipped=0;
for(const f of files){
  let t=fs.readFileSync(f,'utf8');
  if(t.includes('sb-signup')){skipped++;continue;}
  let changed=false;
  // bottom band: before fis-hubnav if present, else before <footer
  if(t.includes('<nav class="fis-hubnav"')){ t=t.replace('<nav class="fis-hubnav"', BAND+'\n<nav class="fis-hubnav"'); changed=true; }
  else if(/<footer/.test(t)){ t=t.replace(/<footer/, BAND+'\n<footer'); changed=true; }
  // midbar script before </body>
  if(t.includes('</body>')){ t=t.replace('</body>', MIDJS+'\n</body>'); changed=true; jsed++; }
  if(changed){ if(GO) fs.writeFileSync(f,t); banded++; }
}
console.log((GO?'PATCHED ':'WILL PATCH ')+banded+' pages (band+midbar), '+skipped+' already done.');
console.log('\nDONE. Next: npx vercel --prod');
