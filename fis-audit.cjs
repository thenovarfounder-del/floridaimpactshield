// FIS link-graph audit. Run from the FIS site root: node fis-audit.cjs
const fs = require('fs');
const path = require('path');

const SKIP = new Set(['node_modules', '.git', '.vercel', '.next', 'dist']);
const pages = [];

function walk(dir, rel) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP.has(e.name)) continue;
      walk(path.join(dir, e.name), rel ? rel + '/' + e.name : e.name);
    } else if (e.name.endsWith('.html')) {
      pages.push({ file: path.join(dir, e.name), rel: (rel ? rel + '/' : '') + e.name });
    }
  }
}
walk('.', '');

if (!pages.length) { console.log('ERROR: no .html files found - run from the FIS site root'); process.exit(1); }

// normalize a page path to a URL-ish key
function keyOf(rel) {
  let k = '/' + rel.replace(/\\/g, '/');
  k = k.replace(/\/index\.html$/, '/');
  k = k.replace(/\.html$/, '');
  if (k === '') k = '/';
  return k;
}
// normalize an href to the same space
function normHref(href, fromRel) {
  if (!href) return null;
  href = href.trim();
  if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) {
    const m = href.match(/^https?:\/\/(www\.)?floridaimpactshield\.com(\/[^"'#?]*)?/i);
    if (!m) return null;
    href = m[2] || '/';
  }
  href = href.split('#')[0].split('?')[0];
  if (!href) return null;
  let abs;
  if (href.startsWith('/')) abs = href;
  else {
    const baseDir = path.posix.dirname('/' + fromRel.replace(/\\/g, '/'));
    abs = path.posix.normalize(baseDir + '/' + href);
  }
  abs = abs.replace(/\/index\.html$/, '/');
  abs = abs.replace(/\.html$/, '');
  if (abs.length > 1 && abs.endsWith('/') && abs !== '/') { /* keep */ }
  return abs;
}

const keys = new Map();      // key -> page
for (const p of pages) { p.key = keyOf(p.rel); keys.set(p.key, p); }

const inbound = new Map();   // key -> Set of sources
const outbound = new Map();
for (const p of pages) {
  let html;
  try { html = fs.readFileSync(p.file, 'utf8'); } catch (e) { continue; }
  p.size = html.length;
  const hrefs = [...html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
  const outs = new Set();
  for (const h of hrefs) {
    const n = normHref(h, p.rel);
    if (!n) continue;
    // resolve trailing-slash variants
    let target = n;
    if (!keys.has(target) && keys.has(target.replace(/\/$/, ''))) target = target.replace(/\/$/, '');
    if (!keys.has(target) && keys.has(target + '/')) target = target + '/';
    if (!keys.has(target)) continue;
    if (target === p.key) continue;
    outs.add(target);
  }
  outbound.set(p.key, outs);
  for (const t of outs) {
    if (!inbound.has(t)) inbound.set(t, new Set());
    inbound.get(t).add(p.key);
  }
}

// BFS depth from home
const home = keys.has('/') ? '/' : (keys.has('/index') ? '/index' : pages[0].key);
const depth = new Map([[home, 0]]);
const q = [home];
while (q.length) {
  const cur = q.shift();
  for (const t of (outbound.get(cur) || [])) {
    if (!depth.has(t)) { depth.set(t, depth.get(cur) + 1); q.push(t); }
  }
}

const orphans = [];
const deep = [];
const unreachable = [];
for (const p of pages) {
  const inb = (inbound.get(p.key) || new Set()).size;
  const d = depth.has(p.key) ? depth.get(p.key) : -1;
  if (inb === 0) orphans.push(p.key);
  if (d === -1) unreachable.push(p.key);
  else if (d >= 4) deep.push(p.key + ' (d' + d + ')');
}

// sitemap cross-check
let smCount = 0, smMissing = 0;
const smFile = ['sitemap.xml', 'sitemap-0.xml'].find(f => fs.existsSync(f));
if (smFile) {
  const sm = fs.readFileSync(smFile, 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  smCount = locs.length;
  for (const l of locs) {
    let pth = l.replace(/^https?:\/\/[^/]+/, '') || '/';
    pth = pth.replace(/\/$/, '') || '/';
    if (!keys.has(pth) && !keys.has(pth + '/') && !keys.has(pth + '.html')) smMissing++;
  }
}

// depth histogram
const hist = {};
for (const p of pages) { const d = depth.has(p.key) ? depth.get(p.key) : 'unreachable'; hist[d] = (hist[d] || 0) + 1; }

// inbound histogram
let zero = 0, one = 0, twoPlus = 0;
for (const p of pages) { const n = (inbound.get(p.key) || new Set()).size; if (n === 0) zero++; else if (n === 1) one++; else twoPlus++; }

console.log('===== FIS LINK AUDIT =====');
console.log('total html pages: ' + pages.length);
console.log('sitemap file: ' + (smFile || 'none') + ' | urls: ' + smCount + ' | urls with no matching file: ' + smMissing);
console.log('');
console.log('INBOUND LINKS: 0 inbound=' + zero + ' | 1 inbound=' + one + ' | 2+ inbound=' + twoPlus);
console.log('CRAWL DEPTH from home: ' + JSON.stringify(hist));
console.log('');
console.log('ORPHANS (0 internal links pointing to them): ' + orphans.length);
console.log(orphans.slice(0, 40).join('\n'));
if (orphans.length > 40) console.log('... +' + (orphans.length - 40) + ' more');
console.log('');
console.log('UNREACHABLE from homepage by clicking: ' + unreachable.length);
console.log(unreachable.slice(0, 25).join('\n'));
if (unreachable.length > 25) console.log('... +' + (unreachable.length - 25) + ' more');
console.log('');
console.log('DEEP (4+ clicks): ' + deep.length);
console.log(deep.slice(0, 20).join('\n'));
console.log('===== END =====');
