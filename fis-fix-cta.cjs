// Fixes dead "#grant-form" CTA buttons on pages that have no grant form.
//   node fis-fix-cta.cjs        -> DRY RUN, lists affected pages
//   node fis-fix-cta.cjs --go   -> rewrites the dead links
const fs = require('fs');
const path = require('path');
const GO = process.argv.includes('--go');
const TARGET = '/pages/florida-wind-mitigation-savings-calculator.html';

const dirs = ['pages', 'blog', '.'];
const broken = [], ok = [];
for (const d of dirs) {
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith('.html')) continue;
    const fp = d === '.' ? f : path.join(d, f);
    if (fs.statSync(fp).isDirectory()) continue;
    const s = fs.readFileSync(fp, 'utf8');
    if (s.indexOf('href="#grant-form"') === -1) continue;
    const hasForm = /id=["']grant-form["']/.test(s) || /name=["']grant-form["']/.test(s);
    if (hasForm) { ok.push(fp); continue; }
    broken.push(fp);
  }
}

console.log('===== CTA AUDIT ' + (GO ? '(APPLYING)' : '(DRY RUN)') + ' =====');
console.log('pages with #grant-form button AND the form present (working): ' + ok.length);
console.log('pages with #grant-form button but NO form (DEAD LINK):        ' + broken.length);
console.log('');
broken.slice(0, 30).forEach(b => console.log('  ' + b));
if (broken.length > 30) console.log('  ... +' + (broken.length - 30) + ' more');
console.log('');
if (!GO) { console.log('New target would be: ' + TARGET); console.log('Nothing written. Run: node fis-fix-cta.cjs --go'); process.exit(0); }

let fixed = 0;
for (const fp of broken) {
  let s = fs.readFileSync(fp, 'utf8');
  s = s.split('href="#grant-form"').join('href="' + TARGET + '"');
  fs.writeFileSync(fp, s, 'utf8');
  fixed++;
}
console.log('rewired: ' + fixed + ' pages -> ' + TARGET);
console.log('Next: npx vercel --prod');
