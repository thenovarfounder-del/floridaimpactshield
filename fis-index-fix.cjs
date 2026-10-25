// FIS blog index repair: removes the 3 inline-styled July cards, inserts proper .blog-card versions. Run from FIS root: node fis-index-fix.cjs
const fs = require('fs');
const IX = 'blog/index.html';
let ix = fs.readFileSync(IX, 'utf8');

const POSTS = [
  { file: 'mid-hurricane-season-home-check-florida-2026.html', badge: 'Hurricane Prep',
    title: 'The Mid-Season Hurricane Check: 7 July Verifications',
    desc: 'July is the calm inside the season \u2014 the 7-point check that closes every gap before the August\u2013October peak.', mins: '8 min' },
  { file: 'impact-windows-2026-insurance-renewal-florida.html', badge: 'Insurance Savings',
    title: 'Impact Windows & Your 2026 Insurance Renewal',
    desc: 'Renewal notices are landing. Every opening-protection credit to verify before you pay \u2014 and the re-inspection that unlocks them.', mins: '8 min' },
  { file: 'condo-vs-single-family-impact-window-responsibility-florida.html', badge: 'Buyer Guides',
    title: 'Condo vs Single-Family: Who Owns the Impact Window Duty?',
    desc: 'The declaration decides \u2014 and thousands of owners get it wrong. Who pays, who approves, who insures, in both worlds.', mins: '8 min' },
];

// 1) remove the misfit inline cards (match each by href + strip that whole <a ...>...</a> block)
let removed = 0;
for (const p of POSTS) {
  const hrefTag = '<a href="/blog/' + p.file + '"';
  let idx;
  while ((idx = ix.indexOf(hrefTag)) !== -1) {
    // only remove if it's one of MY inline-styled cards (contains style="display:block;background:rgba(14,165,233,0.06)")
    const end = ix.indexOf('</a>', idx) + 4;
    const block = ix.slice(idx, end);
    if (block.indexOf('display:block;background:rgba(14,165,233,0.06)') !== -1) {
      // also swallow one trailing newline
      let cut = end;
      if (ix[cut] === '\n') cut++;
      ix = ix.slice(0, idx) + ix.slice(cut);
      removed++;
    } else break; // a proper card already exists — leave it
  }
}
console.log('misfit cards removed: ' + removed);

// 2) insert proper house-class cards before the first existing blog-card
if (ix.indexOf('blog/' + POSTS[0].file) !== -1) {
  console.log('house cards already present, skipping insert');
} else {
  const CARD = (p) => `      <a href="/blog/${p.file}" class="blog-card">
        <span class="blog-card-badge">${p.badge}</span>
        <div class="blog-card-title">${p.title}</div>
        <div class="blog-card-desc">${p.desc}</div>
        <div class="blog-card-meta"><span>July 20, 2026</span><span>${p.mins}</span></div>
        <span class="blog-card-arrow">&rarr;</span>
      </a>\n`;
  const anchor = ix.indexOf('<a href="/blog/');
  const anchorLine = ix.lastIndexOf('\n', anchor) + 1;
  if (anchor === -1) { console.log('ERROR: no blog-card anchor found'); process.exit(1); }
  ix = ix.slice(0, anchorLine) + POSTS.map(CARD).join('') + ix.slice(anchorLine);
  console.log('3 house-class cards inserted at top of grid');
}

fs.writeFileSync(IX, ix, 'utf8');
console.log('DONE. Deploy: npx vercel --prod');
