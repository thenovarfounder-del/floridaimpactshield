// FIS internal-link rebuild. Run from FIS site root.
//   node fis-links.cjs        -> DRY RUN: shows clusters, plan, and a sample page diff. Changes nothing.
//   node fis-links.cjs --go   -> applies changes (writes hub pages, related blocks, footer links, robots)
const fs = require('fs');
const path = require('path');
const GO = process.argv.includes('--go');

if (!fs.existsSync('pages')) { console.log('ERROR: no pages/ folder here - run from the FIS site root'); process.exit(1); }

const files = fs.readdirSync('pages').filter(f => f.endsWith('.html'));
if (!files.length) { console.log('ERROR: no html files in pages/'); process.exit(1); }

// ---------- cluster rules ----------
const BRANDS = ['pgt','cgi','andersen','eco-window','es-windows','heritage','custom-window','winguard'];
const DOORWORDS = ['door','doors','sliding-glass','french','patio','entry','cabana','garage'];
const COSTWORDS = ['cost','price','pricing','financing','cheap','affordable','worth-it','value'];
const INSWORDS = ['insurance','discount','citizens','grant','premium','savings','my-safe','rebate','wind-mit'];
const TYPEWORDS = ['casement','awning','double-hung','single-hung','picture','frameless','bay-window','horizontal-roller','fixed-window','window-types','impact-glass','laminated'];

function titleFromFile(f) {
  const raw = fs.readFileSync(path.join('pages', f), 'utf8');
  const m = raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || raw.match(/<title>([\s\S]*?)<\/title>/i);
  let t = m ? m[1].replace(/<[^>]+>/g, '').trim() : f.replace(/\.html$/, '').replace(/-/g, ' ');
  t = t.split('|')[0].trim();
  return t.length > 78 ? t.slice(0, 75) + '...' : t;
}

function clusterOf(slug) {
  const s = slug;
  if (INSWORDS.some(w => s.includes(w))) return 'insurance';
  if (COSTWORDS.some(w => s.includes(w))) return 'cost';
  if (BRANDS.some(w => s.includes(w))) return 'brands';
  if (DOORWORDS.some(w => s.includes(w))) return 'doors';
  if (TYPEWORDS.some(w => s.includes(w))) return 'types';
  // city pattern: impact-windows-<place> with no other keyword
  const m = s.match(/^impact-windows?-(.+)$/);
  if (m && !m[1].includes('florida') && m[1].split('-').length <= 3) return 'cities';
  return 'guides';
}

const CLUSTERS = {
  cities:    { hub: 'impact-window-installers-by-city-florida.html', h1: 'Impact Windows by City in Florida', desc: 'Impact window and hurricane door installation across Florida cities. Find local cost ranges, permit notes, and insurance discount details for your area.' },
  types:     { hub: 'impact-window-types-florida.html', h1: 'Impact Window Types: The Complete Florida Guide', desc: 'Every impact window style available in Florida compared: casement, awning, double hung, picture, sliding and more, with cost and use-case notes.' },
  doors:     { hub: 'impact-doors-florida.html', h1: 'Impact Doors in Florida: Every Type Compared', desc: 'Hurricane impact doors for Florida homes: sliding glass, french, entry, patio and cabana doors, with costs, ratings and installation guidance.' },
  brands:    { hub: 'impact-window-brands-florida.html', h1: 'Impact Window Brands Compared for Florida Homes', desc: 'PGT, CGI, Andersen, ES Windows, Eco and more compared for Florida homeowners: ratings, price tiers, warranties and head-to-head matchups.' },
  cost:      { hub: 'impact-window-cost-guides-florida.html', h1: 'Impact Window Cost Guides for Florida', desc: 'What impact windows and doors actually cost in Florida in 2026: per-window pricing, whole-home ranges, financing options and value analysis.' },
  insurance: { hub: 'impact-windows-insurance-and-grants-florida.html', h1: 'Insurance Discounts and Grants for Impact Windows in Florida', desc: 'How impact windows lower Florida home insurance: wind mitigation credits, carrier-specific discounts, Citizens rules, and state grant programs.' },
  guides:    { hub: 'impact-window-guides-florida.html', h1: 'Florida Impact Window Guides', desc: 'Practical guides for Florida homeowners on impact windows and hurricane protection: performance, security, HOA rules, installation and maintenance.' },
};

const pagesByCluster = {};
const allPages = [];
for (const f of files) {
  const slug = f.replace(/\.html$/, '');
  if (Object.values(CLUSTERS).some(c => c.hub === f)) continue; // skip hubs themselves
  const c = clusterOf(slug);
  const rec = { file: f, slug, cluster: c, title: titleFromFile(f), url: '/pages/' + f };
  (pagesByCluster[c] = pagesByCluster[c] || []).push(rec);
  allPages.push(rec);
}

// ---------- template discovery ----------
const tplFile = files.find(f => { const s = fs.readFileSync(path.join('pages', f), 'utf8'); return s.includes('<h1') && /<footer|class="footer|id="footer/i.test(s); });
if (!tplFile) { console.log('ERROR: could not find a template page with <h1> and a footer'); process.exit(1); }
const TPL = fs.readFileSync(path.join('pages', tplFile), 'utf8');
const h1End = TPL.indexOf('</h1>') + 5;
let footIdx = -1, footMark = '';
for (const mk of ['<footer', '<!-- FOOTER', '<div class="footer', '<div id="footer']) {
  const i = TPL.lastIndexOf(mk);
  if (i > h1End) { footIdx = i; footMark = mk; break; }
}
if (footIdx === -1) { console.log('ERROR: no footer marker found in template ' + tplFile); process.exit(1); }
const TOP = TPL.slice(0, h1End);
const TAIL = TPL.slice(footIdx);

// ---------- builders ----------
function relatedBlock(rec) {
  const sibs = (pagesByCluster[rec.cluster] || []).filter(p => p.slug !== rec.slug);
  const pick = sibs.sort(() => 0.5 - Math.random()).slice(0, 6);
  const hub = CLUSTERS[rec.cluster];
  if (!pick.length) return '';
  const links = pick.map(p => '<li><a href="' + p.url + '">' + p.title + '</a></li>').join('');
  return '\n<!-- FIS-LINKS-START -->\n<section class="fis-related" style="max-width:1100px;margin:40px auto;padding:24px 20px;border-top:1px solid rgba(0,0,0,.12)">\n' +
    '<h2 style="font-size:22px;margin:0 0 14px">Related Guides</h2>\n' +
    '<ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px 24px;line-height:1.7">' + links + '</ul>\n' +
    '<p style="margin:16px 0 0"><a href="/pages/' + hub.hub + '"><strong>See all: ' + hub.h1 + '</strong></a></p>\n' +
    '</section>\n<!-- FIS-LINKS-END -->\n';
}

function hubHtml(key) {
  const c = CLUSTERS[key];
  const kids = (pagesByCluster[key] || []).slice().sort((a, b) => a.title.localeCompare(b.title));
  const url = 'https://www.floridaimpactshield.com/pages/' + c.hub;
  let top = TOP;
  top = top.replace(/<title>[\s\S]*?<\/title>/, '<title>' + c.h1 + ' | Florida Impact Shield</title>');
  top = top.replace(/<meta name="description" content="[^"]*"\s*\/?>/, '<meta name="description" content="' + c.desc + '">');
  top = top.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, '<link rel="canonical" href="' + url + '">');
  top = top.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, '<meta property="og:url" content="' + url + '">');
  top = top.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, '<meta property="og:title" content="' + c.h1 + '">');
  top = top.replace(/(<h1[^>]*>)[\s\S]*$/, '$1' + c.h1);
  const items = kids.map(k => '<li style="margin-bottom:8px"><a href="' + k.url + '">' + k.title + '</a></li>').join('\n');
  const otherHubs = Object.keys(CLUSTERS).filter(k => k !== key && (pagesByCluster[k] || []).length)
    .map(k => '<a href="/pages/' + CLUSTERS[k].hub + '">' + CLUSTERS[k].h1 + '</a>').join(' &middot; ');
  const body = '</h1>\n<main style="max-width:1100px;margin:0 auto;padding:10px 20px 50px;line-height:1.75">\n' +
    '<p style="font-size:17px;margin:0 0 26px">' + c.desc + '</p>\n' +
    '<ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:4px 28px">\n' + items + '\n</ul>\n' +
    '<p style="margin:34px 0 0;padding-top:18px;border-top:1px solid rgba(0,0,0,.12)"><strong>More sections:</strong> ' + otherHubs + '</p>\n' +
    '</main>\n';
  return top + body + TAIL;
}

function footerLinks() {
  const links = Object.keys(CLUSTERS).filter(k => (pagesByCluster[k] || []).length)
    .map(k => '<a href="/pages/' + CLUSTERS[k].hub + '" style="margin-right:16px">' + CLUSTERS[k].h1 + '</a>').join('');
  return '\n<!-- FIS-HUBNAV-START -->\n<nav class="fis-hubnav" style="max-width:1100px;margin:0 auto;padding:18px 20px;font-size:14px;line-height:2">' + links + '</nav>\n<!-- FIS-HUBNAV-END -->\n';
}

// ---------- report ----------
console.log('===== FIS LINK REBUILD ' + (GO ? '(APPLYING)' : '(DRY RUN - nothing written)') + ' =====');
console.log('template page: pages/' + tplFile + ' | footer marker: "' + footMark + '"');
console.log('pages scanned: ' + allPages.length);
for (const k of Object.keys(CLUSTERS)) {
  const n = (pagesByCluster[k] || []).length;
  if (n) console.log('  ' + k.padEnd(10) + n + ' pages -> hub: /pages/' + CLUSTERS[k].hub);
}
console.log('');

if (!GO) {
  const sample = allPages.find(p => (pagesByCluster[p.cluster] || []).length > 3) || allPages[0];
  console.log('--- SAMPLE: what gets ADDED to pages/' + sample.file + ' (nothing else changes) ---');
  console.log(relatedBlock(sample).trim().slice(0, 900));
  console.log('');
  console.log('--- FOOTER NAV added to every page (above existing footer) ---');
  console.log(footerLinks().trim().slice(0, 500));
  console.log('');
  console.log('Nothing was written. Run: node fis-links.cjs --go');
  process.exit(0);
}

// ---------- apply ----------
let hubsMade = 0, patched = 0, skipped = 0;
for (const k of Object.keys(CLUSTERS)) {
  if (!(pagesByCluster[k] || []).length) continue;
  fs.writeFileSync(path.join('pages', CLUSTERS[k].hub), hubHtml(k), 'utf8');
  hubsMade++;
}
const HUBNAV = footerLinks();
function patchFile(fp) {
  let s = fs.readFileSync(fp, 'utf8');
  const orig = s;
  if (s.indexOf('FIS-HUBNAV-START') === -1) {
    let i = -1;
    for (const mk of ['<footer', '<!-- FOOTER', '<div class="footer', '<div id="footer']) {
      const j = s.lastIndexOf(mk);
      if (j > 0) { i = j; break; }
    }
    if (i > 0) s = s.slice(0, i) + HUBNAV + s.slice(i);
  }
  if (s !== orig) { fs.writeFileSync(fp, s, 'utf8'); return true; }
  return false;
}
for (const rec of allPages) {
  const fp = path.join('pages', rec.file);
  let s = fs.readFileSync(fp, 'utf8');
  if (s.indexOf('FIS-LINKS-START') !== -1) { skipped++; continue; }
  let i = -1;
  for (const mk of ['<footer', '<!-- FOOTER', '<div class="footer', '<div id="footer']) {
    const j = s.lastIndexOf(mk);
    if (j > 0) { i = j; break; }
  }
  if (i < 0) { skipped++; continue; }
  s = s.slice(0, i) + relatedBlock(rec) + s.slice(i);
  fs.writeFileSync(fp, s, 'utf8');
  patched++;
}
// hub nav on every page incl hubs, blog, root
let navAdded = 0;
const targets = [];
for (const f of fs.readdirSync('pages')) if (f.endsWith('.html')) targets.push(path.join('pages', f));
if (fs.existsSync('blog')) for (const f of fs.readdirSync('blog')) if (f.endsWith('.html')) targets.push(path.join('blog', f));
for (const f of fs.readdirSync('.')) if (f.endsWith('.html')) targets.push(f);
for (const t of targets) { if (patchFile(t)) navAdded++; }

// robots
let rb = fs.existsSync('robots.txt') ? fs.readFileSync('robots.txt', 'utf8') : 'User-agent: *\nAllow: /\n';
for (const d of ['/admin/', '/harvest/', '/assets/partials/']) {
  if (rb.indexOf('Disallow: ' + d) === -1) rb = rb.replace(/(User-agent: \*\n)/, '$1Disallow: ' + d + '\n');
}
fs.writeFileSync('robots.txt', rb, 'utf8');

console.log('hub pages written: ' + hubsMade);
console.log('related blocks added: ' + patched + ' (skipped ' + skipped + ')');
console.log('hub nav added to: ' + navAdded + ' files');
console.log('robots.txt updated (admin/harvest/partials blocked)');
console.log('NEXT: add the new hub URLs to sitemap.xml, then deploy.');
