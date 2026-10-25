// Lists the pages lacking question-form H2s and what they already have. Read-only.
const fs = require('fs'); const path = require('path');
const dirs = ['pages','blog','.'];
const rows = [];
for (const d of dirs) {
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith('.html')) continue;
    const fp = d === '.' ? f : path.join(d, f);
    if (fs.statSync(fp).isDirectory()) continue;
    const s = fs.readFileSync(fp, 'utf8');
    const h2s = [...s.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(x => x[1].replace(/<[^>]+>/g,'').trim());
    const hasQ = h2s.some(h => /^(what|why|how|when|where|who|can|do|does|is|are|should|will)\b/i.test(h) || h.endsWith('?'));
    if (hasQ) continue;
    const faq = /FAQPage/i.test(s);
    const qCount = (s.match(/"@type"\s*:\s*"Question"/g) || []).length;
    const words = (s.split('<body')[1]||'').replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;
    rows.push({ fp, faq, qCount, h2: h2s.length, words });
  }
}
console.log('PAGES WITHOUT QUESTION-FORM H2s: ' + rows.length);
console.log('  of those, already have FAQPage schema: ' + rows.filter(r=>r.faq).length);
console.log('  of those, have NO faq schema either:   ' + rows.filter(r=>!r.faq).length);
console.log('');
console.log('file | hasFAQschema | #Qs | #H2s | words');
rows.sort((a,b)=>a.fp.localeCompare(b.fp)).slice(0,40).forEach(r => console.log(r.fp + ' | ' + r.faq + ' | ' + r.qCount + ' | ' + r.h2 + ' | ' + r.words));
if (rows.length>40) console.log('... +' + (rows.length-40) + ' more');
