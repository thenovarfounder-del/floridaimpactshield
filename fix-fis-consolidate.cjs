const fs = require('fs');
const KEEP = '/pages/my-safe-florida-home-grants.html';
const merge = [
  '/blog/my-safe-florida-home-grant-complete-guide-2026.html',
  '/blog/my-safe-florida-home-program-guide.html',
  '/pages/10000-impact-window-grant.html',
  '/pages/florida-hurricane-hardening-grant.html',
  '/pages/impact-window-grant-florida-2026.html',
  '/pages/impact-windows-grant-florida-homeowners.html',
  '/pages/my-safe-florida-home-grant-2026-funding-renewed.html',
  '/pages/my-safe-florida-home-grant-impact-windows.html'
];
const j = JSON.parse(fs.readFileSync('vercel.json','utf8'));
j.redirects = j.redirects || [];
let added = 0;
merge.forEach(src => {
  if (!j.redirects.some(r => r.source === src)) {
    j.redirects.push({ source: src, destination: KEEP, permanent: true });
    added++;
  }
});
fs.writeFileSync('vercel.json', JSON.stringify(j, null, 2));
console.log('REDIRECTS ADDED: ' + added);
console.log('TOTAL REDIRECTS: ' + j.redirects.length);
console.log('REWRITES INTACT: ' + j.rewrites.length);
