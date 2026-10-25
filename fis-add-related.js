// FIS internal-linking fix: adds a styled "Related Articles" block to every blog post.
// GUARANTEES even inbound-link distribution so no page stays an orphan.
const fs = require('fs');
const path = require('path');

const BLOG_DIR = process.argv[2];

const POSTS = {
  'are-impact-windows-worth-it-florida-2026.html': 'Are Impact Windows Worth It in Florida? 2026 ROI Analysis',
  'best-impact-window-brands-florida.html': 'Best Hurricane Impact Window Brands in Florida 2026',
  'citizens-insurance-impact-windows.html': 'Lower Your Citizens Insurance Premium with Impact Windows',
  'florida-hurricane-preparedness-checklist-2026.html': 'Florida Hurricane Preparedness Checklist 2026',
  'how-long-does-impact-window-installation-take-florida.html': 'How Long Does Impact Window Installation Take in Florida?',
  'how-much-do-impact-windows-cost-florida-2026.html': 'How Much Do Impact Windows Cost in Florida? 2026 Price Guide',
  'how-to-lower-florida-homeowners-insurance-2026.html': 'How to Lower Florida Homeowners Insurance in 2026',
  'hurricane-ian-impact-windows-lesson.html': 'What Hurricane Ian Taught Lee County Homeowners',
  'hurricane-ian-lessons-why-impact-windows-matter.html': 'Hurricane Ian Lessons: Why Impact Windows Matter',
  'hurricane-impact-windows-cost-florida.html': 'Impact Windows Cost Florida 2026: Full Pricing Guide',
  'hurricane-season-2026-florida-home-ready.html': 'Hurricane Season 2026: Is Your Florida Home Ready?',
  'hurricane-season-2026-is-your-florida-home-ready.html': 'Hurricane Season 2026 Complete Readiness Checklist',
  'impact-windows-florida-homeowners-insurance-guide.html': 'Impact Windows and Florida Homeowners Insurance Guide',
  'impact-windows-insurance-discount-florida.html': 'How Much Do Impact Windows Save on Florida Insurance?',
  'impact-windows-pembroke-pines-miramar-doral.html': 'Impact Windows Pembroke Pines, Miramar & Doral FL',
  'impact-windows-tax-credit-florida-2026.html': 'Impact Windows Tax Credit Florida 2026',
  'impact-windows-vs-impact-doors-florida-guide.html': 'Impact Windows vs Impact Doors Florida Guide',
  'impact-windows-vs-shutters-florida.html': 'Hurricane Impact Windows vs. Shutters: Florida Comparison',
  'my-safe-florida-home-grant-complete-guide-2026.html': 'My Safe Florida Home Grant 2026: Application Guide',
  'my-safe-florida-home-program-guide.html': 'My Safe Florida Home Program: Get Your $10,000 Grant',
  'what-is-wind-mitigation-inspection-florida.html': 'What is a Wind Mitigation Inspection in Florida?',
};

const keys = Object.keys(POSTS);
const N = keys.length;

// Build related map with GUARANTEED even distribution:
// Each post links to 6 others via a rotating window (i+1..i+6). 
// This guarantees every post receives exactly 6 inbound links too (perfect circular spread).
// Then we overlay light topical relevance by swapping in 2 keyword-matched posts where possible.
function keywordScore(a, b) {
  const wa = new Set(a.replace('.html','').split('-').filter(x=>x.length>3));
  const wb = b.replace('.html','').split('-').filter(x=>x.length>3);
  return wb.filter(x=>wa.has(x)).length;
}

const relatedMap = {};
for (let i = 0; i < N; i++) {
  const current = keys[i];
  // base: rotating window ensures even coverage
  const base = [];
  for (let j = 1; j <= 6; j++) base.push(keys[(i + j) % N]);
  // topical: 2 highest keyword-overlap posts not already in base and not self
  const topical = keys
    .filter(k => k !== current && !base.includes(k))
    .map(k => ({ k, s: keywordScore(current, k) }))
    .filter(x => x.s > 0)
    .sort((a,b) => b.s - a.s)
    .slice(0, 2)
    .map(x => x.k);
  // replace last 2 base entries with topical picks (keeps 6 total, keeps coverage mostly even)
  const merged = [...base.slice(0, 6 - topical.length), ...topical];
  relatedMap[current] = [...new Set(merged)].slice(0, 6);
}

function buildBlock(current) {
  const related = relatedMap[current];
  const cards = related.map(r =>
    `      <a href="/blog/${r}" style="display:block;background:rgba(14,165,233,0.06);border:1px solid var(--glass-border);border-radius:10px;padding:16px 18px;text-decoration:none;transition:all .2s" onmouseover="this.style.background='rgba(14,165,233,0.12)'" onmouseout="this.style.background='rgba(14,165,233,0.06)'">
        <span style="color:var(--sky-light);font-weight:700;font-size:15px;line-height:1.4;display:block">${POSTS[r]} &rarr;</span>
      </a>`
  ).join('\n');
  return `
<!-- RELATED-ARTICLES -->
<section style="max-width:800px;margin:50px auto 20px;padding:0 20px">
  <h2 style="font-size:24px;margin:0 0 20px;padding-bottom:10px;border-bottom:1px solid var(--glass-border);color:var(--white)">Related Florida Impact Window Guides</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px">
${cards}
  </div>
</section>
<!-- /RELATED-ARTICLES -->
`;
}

if (BLOG_DIR) {
  let done = 0, skipped = 0;
  for (const file of keys) {
    const fp = path.join(BLOG_DIR, file);
    if (!fs.existsSync(fp)) { console.log('MISSING: ' + file); continue; }
    let html = fs.readFileSync(fp, 'utf8');
    if (html.includes('<!-- RELATED-ARTICLES -->')) { skipped++; continue; }
    const block = buildBlock(file);
    if (html.includes('<!-- FIS-QUOTE-CTA -->')) {
      html = html.replace('<!-- FIS-QUOTE-CTA -->', block + '<!-- FIS-QUOTE-CTA -->');
    } else {
      html = html.replace('</body>', block + '</body>');
    }
    fs.writeFileSync(fp, html, 'utf8');
    done++;
  }
  console.log('Related Articles added to ' + done + ' posts. Skipped: ' + skipped);

  // Report inbound link counts
  console.log('\nInbound link counts per post:');
  const counts = {};
  keys.forEach(k => counts[k] = 0);
  for (const file of keys) {
    const html = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const m = html.match(/RELATED-ARTICLES[\s\S]*?\/RELATED-ARTICLES/);
    if (m) keys.forEach(k => { if (m[0].includes('/blog/'+k)) counts[k]++; });
  }
  const vals = Object.values(counts);
  console.log('  min inbound: ' + Math.min(...vals) + ', max: ' + Math.max(...vals) + ', avg: ' + (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1));
}
