// FIS schema audit (read-only). Run from FIS site root: node fis-schema-audit.cjs
const fs = require('fs');
const path = require('path');
if (!fs.existsSync('pages')) { console.log('ERROR: run from FIS site root'); process.exit(1); }

const dirs = ['pages', 'blog', '.'];
const all = [];
for (const d of dirs) {
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith('.html')) continue;
    const fp = d === '.' ? f : path.join(d, f);
    if (fs.statSync(fp).isDirectory()) continue;
    all.push(fp);
  }
}

let hasJsonLd = 0, hasFaqSchema = 0, hasOrgSchema = 0, hasLocalBiz = 0, hasBreadcrumb = 0, none = 0;
let qHeaders = 0, noQHeaders = 0;
const noSchema = [];
const types = {};

for (const fp of all) {
  const s = fs.readFileSync(fp, 'utf8');
  const jsonld = /<script[^>]*application\/ld\+json/i.test(s);
  const micro = /itemtype="https:\/\/schema\.org/i.test(s);
  const faq = /FAQPage/i.test(s);
  const org = /"@type"\s*:\s*"Organization"/i.test(s);
  const lb = /LocalBusiness|HomeAndConstructionBusiness|Contractor/i.test(s);
  const bc = /BreadcrumbList/i.test(s);
  if (jsonld) hasJsonLd++;
  if (faq) hasFaqSchema++;
  if (org) hasOrgSchema++;
  if (lb) hasLocalBiz++;
  if (bc) hasBreadcrumb++;
  if (!jsonld && !micro) { none++; noSchema.push(fp); }
  // capture @type values
  const m = s.match(/"@type"\s*:\s*"([^"]+)"/g) || [];
  for (const t of m) { const v = t.split('"')[3]; types[v] = (types[v]||0)+1; }
  // question-form h2s
  const h2s = [...s.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(x => x[1].replace(/<[^>]+>/g,'').trim());
  if (h2s.some(h => /^(what|why|how|when|where|who|can|do|does|is|are|should|will)\b/i.test(h) || h.endsWith('?'))) qHeaders++; else noQHeaders++;
}

console.log('===== FIS SCHEMA AUDIT =====');
console.log('pages scanned: ' + all.length);
console.log('');
console.log('SCHEMA COVERAGE');
console.log('  JSON-LD present:        ' + hasJsonLd);
console.log('  FAQPage schema:         ' + hasFaqSchema);
console.log('  Organization schema:    ' + hasOrgSchema);
console.log('  LocalBusiness/Contractor: ' + hasLocalBiz);
console.log('  BreadcrumbList:         ' + hasBreadcrumb);
console.log('  NO schema at all:       ' + none);
console.log('');
console.log('SCHEMA TYPES FOUND: ' + (Object.keys(types).length ? JSON.stringify(types) : 'none'));
console.log('');
console.log('AI-EXTRACTABLE STRUCTURE');
console.log('  pages with question-form H2s: ' + qHeaders);
console.log('  pages without:                ' + noQHeaders);
console.log('');
console.log('SAMPLE PAGES WITH NO SCHEMA (first 15):');
console.log(noSchema.slice(0,15).join('\n'));
if (noSchema.length > 15) console.log('... +' + (noSchema.length-15) + ' more');
console.log('===== END =====');
