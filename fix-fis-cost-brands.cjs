const fs = require('fs');
const j = JSON.parse(fs.readFileSync('vercel.json','utf8'));
j.redirects = j.redirects || [];
const COST = '/blog/how-much-do-impact-windows-cost-florida-2026.html';
const BRAND = '/pages/best-impact-window-brands-florida-2026.html';
const add = [
  ['/blog/hurricane-impact-windows-cost-florida.html', COST],
  ['/pages/how-much-do-impact-windows-cost-florida.html', COST],
  ['/pages/hurricane-windows-cost-florida.html', COST],
  ['/pages/impact-window-cost-guides-florida.html', COST],
  ['/blog/best-impact-window-brands-florida.html', BRAND],
  ['/pages/best-impact-window-brands-florida-2026-comparison.html', BRAND],
  ['/pages/impact-window-brands-florida.html', BRAND]
];
let added = 0;
add.forEach(([s,d]) => { if(!j.redirects.some(r=>r.source===s)){ j.redirects.push({source:s,destination:d,permanent:true}); added++; } });
fs.writeFileSync('vercel.json', JSON.stringify(j, null, 2));
console.log('ADDED: ' + added + ' | TOTAL: ' + j.redirects.length + ' | REWRITES: ' + j.rewrites.length);
