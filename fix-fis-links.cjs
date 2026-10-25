const fs = require('fs');
const path = require('path');
const KEEP = '/pages/my-safe-florida-home-grants.html';
const dead = {
  '/pages/10000-impact-window-grant.html': KEEP,
  '/pages/florida-hurricane-hardening-grant.html': KEEP,
  '/pages/impact-window-grant-florida-2026.html': KEEP,
  '/pages/impact-windows-grant-florida-homeowners.html': KEEP,
  '/pages/my-safe-florida-home-grant-2026-funding-renewed.html': KEEP,
  '/pages/my-safe-florida-home-grant-impact-windows.html': KEEP,
  '/blog/my-safe-florida-home-grant-complete-guide-2026.html': KEEP,
  '/blog/my-safe-florida-home-program-guide.html': KEEP
};
function walk(d, out) {
  fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!/node_modules|\.vercel|\.git|_merged/.test(e.name)) walk(p, out); }
    else if (e.name.endsWith('.html')) out.push(p);
  });
  return out;
}
const files = walk('.', []);
let filesTouched = 0, total = 0;
files.forEach(f => {
  let s = fs.readFileSync(f, 'utf8'); const orig = s;
  Object.entries(dead).forEach(([from, to]) => {
    const rel = from.replace(/^\//, '');
    [from, rel, '..' + from].forEach(v => {
      if (v === to) return;
      const parts = s.split(v);
      if (parts.length > 1) { total += parts.length - 1; s = parts.join(to); }
    });
  });
  if (s !== orig) { fs.writeFileSync(f, s); filesTouched++; }
});
console.log('FILES CHANGED: ' + filesTouched);
console.log('LINKS REPOINTED: ' + total);
