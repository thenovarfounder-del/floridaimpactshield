// FIS blog index TRUE repair: removes the 3 July cards from the nav (where they were wrongly inserted), re-inserts them INSIDE .blog-grid. Run from FIS root: node fis-index-fix2.cjs
const fs = require('fs');
const IX = 'blog/index.html';
let ix = fs.readFileSync(IX, 'utf8');

const FILES = [
  'mid-hurricane-season-home-check-florida-2026.html',
  'impact-windows-2026-insurance-renewal-florida.html',
  'condo-vs-single-family-impact-window-responsibility-florida.html',
];
const META = {
  'mid-hurricane-season-home-check-florida-2026.html': { badge: 'Hurricane Prep', title: 'The Mid-Season Hurricane Check: 7 July Verifications', desc: 'July is the calm inside the season \u2014 the 7-point check that closes every gap before the August\u2013October peak.', mins: '8 min' },
  'impact-windows-2026-insurance-renewal-florida.html': { badge: 'Insurance Savings', title: 'Impact Windows & Your 2026 Insurance Renewal', desc: 'Renewal notices are landing. Every opening-protection credit to verify before you pay \u2014 and the re-inspection that unlocks them.', mins: '8 min' },
  'condo-vs-single-family-impact-window-responsibility-florida.html': { badge: 'Buyer Guides', title: 'Condo vs Single-Family: Who Owns the Impact Window Duty?', desc: 'The declaration decides \u2014 and thousands of owners get it wrong. Who pays, who approves, who insures, in both worlds.', mins: '8 min' },
};

// 1) remove EVERY existing card/block for these three files, wherever it sits (nav, grid, anywhere)
let removed = 0;
for (const f of FILES) {
  const tag = '<a href="/blog/' + f + '"';
  let idx;
  while ((idx = ix.indexOf(tag)) !== -1) {
    const end = ix.indexOf('</a>', idx) + 4;
    if (end < 4) break;
    let cut = end;
    while (ix[cut] === '\n' || ix[cut] === ' ') { if (ix[cut] === '\n') { cut++; break; } cut++; }
    ix = ix.slice(0, idx) + ix.slice(cut);
    removed++;
  }
}
console.log('stray July cards removed (from nav or elsewhere): ' + removed);

// 2) insert proper cards INSIDE the blog grid — first card slot AFTER class="blog-grid"
const gridIdx = ix.indexOf('class="blog-grid"');
if (gridIdx === -1) { console.log('ERROR: blog-grid not found'); process.exit(1); }
const firstCard = ix.indexOf('<a href="/blog/', gridIdx);
if (firstCard === -1) { console.log('ERROR: no card found inside grid'); process.exit(1); }
const lineStart = ix.lastIndexOf('\n', firstCard) + 1;

const CARD = (f) => { const p = META[f]; return `      <a href="/blog/${f}" class="blog-card">
        <span class="blog-card-badge">${p.badge}</span>
        <div class="blog-card-title">${p.title}</div>
        <div class="blog-card-desc">${p.desc}</div>
        <div class="blog-card-meta"><span>July 20, 2026</span><span>${p.mins}</span></div>
        <span class="blog-card-arrow">&rarr;</span>
      </a>\n`; };

ix = ix.slice(0, lineStart) + FILES.map(CARD).join('') + ix.slice(lineStart);
console.log('3 July cards inserted INSIDE .blog-grid (top of grid)');

// 3) sanity: nav must contain no blog-card markup between <nav and </nav> / mobile-nav
const navZone = ix.slice(0, ix.indexOf('class="blog-grid"'));
const strayInNav = FILES.filter(f => navZone.indexOf(f) !== -1);
if (strayInNav.length) { console.log('WARNING: still referenced before grid: ' + strayInNav.join(', ')); }
else console.log('nav zone clean \u2014 no July references before the grid');

fs.writeFileSync(IX, ix, 'utf8');
console.log('DONE. Deploy: npx vercel --prod');
