// FIS date stagger: spreads the 3 July posts across the month (cards + articles + schema). Run from FIS root: node fis-dates-fix.cjs
const fs = require('fs');

const DATES = {
  'mid-hurricane-season-home-check-florida-2026.html': 'July 8, 2026',
  'impact-windows-2026-insurance-renewal-florida.html': 'July 14, 2026',
  'condo-vs-single-family-impact-window-responsibility-florida.html': 'July 19, 2026',
};

// 1) blog index cards
let ix = fs.readFileSync('blog/index.html', 'utf8');
let fixed = 0;
for (const [f, date] of Object.entries(DATES)) {
  const i = ix.indexOf('/blog/' + f);
  if (i === -1) { console.log('WARN: card not found for ' + f); continue; }
  const end = ix.indexOf('</a>', i);
  const block = ix.slice(i, end);
  if (block.indexOf(date) !== -1) { console.log('index already dated: ' + f); continue; }
  const nb = block.replace('July 20, 2026', date);
  if (nb === block) { console.log('WARN: July 20 not found in card for ' + f); continue; }
  ix = ix.slice(0, i) + nb + ix.slice(end);
  fixed++;
}
fs.writeFileSync('blog/index.html', ix, 'utf8');
console.log('index cards re-dated: ' + fixed);

// 2) each article: byline + schema datePublished
for (const [f, date] of Object.entries(DATES)) {
  const p = 'blog/' + f;
  if (!fs.existsSync(p)) { console.log('MISSING: ' + f); continue; }
  let s = fs.readFileSync(p, 'utf8');
  if (s.indexOf('July 20, 2026') === -1) { console.log('article already dated: ' + f); continue; }
  s = s.split('July 20, 2026').join(date);
  fs.writeFileSync(p, s, 'utf8');
  console.log('article re-dated: ' + f + ' -> ' + date);
}

// 3) sitemap lastmod stagger
let sm = fs.readFileSync('sitemap.xml', 'utf8');
const SMD = { 'mid-hurricane-season-home-check-florida-2026.html': '2026-07-08', 'impact-windows-2026-insurance-renewal-florida.html': '2026-07-14', 'condo-vs-single-family-impact-window-responsibility-florida.html': '2026-07-19' };
for (const [f, d] of Object.entries(SMD)) {
  const i = sm.indexOf(f);
  if (i === -1) continue;
  const seg = sm.slice(i, sm.indexOf('</url>', i));
  sm = sm.slice(0, i) + seg.replace('2026-07-20', d) + sm.slice(sm.indexOf('</url>', i));
}
fs.writeFileSync('sitemap.xml', sm, 'utf8');
console.log('sitemap lastmod staggered');
console.log('DONE. Deploy: npx vercel --prod');
