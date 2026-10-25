const fs = require('fs');
const path = require('path');
const map = {
  '/pages/wind-mitigation-inspection.html': '/blog/what-is-wind-mitigation-inspection-florida.html',
  '/pages/wind-mitigation-inspection-what-to-expect.html': '/blog/what-is-wind-mitigation-inspection-florida.html',
  '/blog/wind-mitigation-florida.html': '/blog/what-is-wind-mitigation-inspection-florida.html',
  '/pages/florida-wind-mitigation-savings-calculator.html': '/pages/wind-mitigation-discount-florida.html',
  '/pages/impact-windows-insurance-and-grants-florida.html': '/pages/wind-mitigation-discount-florida.html'
};
function walk(d, out) {
  fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!/node_modules|\.vercel|\.git/.test(e.name)) walk(p, out); }
    else if (e.name.endsWith('.html')) out.push(p);
  });
  return out;
}
let touched = 0, total = 0;
walk('.', []).forEach(f => {
  const norm = '/' + f.replace(/\\/g,'/').replace(/^\.\//,'');
  let s = fs.readFileSync(f,'utf8'); const orig = s;
  Object.entries(map).forEach(([from,to]) => {
    if (norm === from) return;
    [from, from.slice(1), '..'+from].forEach(v => {
      if (v === to) return;
      const parts = s.split(v);
      if (parts.length > 1) { total += parts.length-1; s = parts.join(to); }
    });
  });
  if (s !== orig) { fs.writeFileSync(f,s); touched++; }
});
console.log('FILES CHANGED: ' + touched);
console.log('LINKS REPOINTED: ' + total);
let sm = fs.readFileSync('sitemap.xml','utf8');
const before = (sm.match(/<url>/g)||[]).length;
Object.keys(map).forEach(d => {
  const slug = d.split('/').pop().replace('.html','');
  const re = new RegExp('\\s*<url>(?:(?!<\\/url>)[\\s\\S])*?' + slug + '\\.html[\\s\\S]*?<\\/url>','g');
  sm = sm.replace(re,'');
});
const after = (sm.match(/<url>/g)||[]).length;
fs.writeFileSync('sitemap.xml', sm);
console.log('SITEMAP: ' + before + ' -> ' + after + '  (removed ' + (before-after) + ')');
