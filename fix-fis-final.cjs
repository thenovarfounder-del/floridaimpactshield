const fs = require('fs');
const j = JSON.parse(fs.readFileSync('vercel.json','utf8'));
j.redirects = j.redirects || [];
const add = [
  ['/blog/hurricane-ian-impact-windows-lesson.html','/blog/hurricane-ian-lessons-why-impact-windows-matter.html'],
  ['/blog/hurricane-season-2026-florida-home-ready.html','/blog/hurricane-season-2026-is-your-florida-home-ready.html'],
  ['/blog/pace-financing-impact-windows-florida.html','/blog/pace-financing-florida.html'],
  ['/blog/renew-financial-pace-florida.html','/blog/pace-financing-florida.html'],
  ['/blog/hurricane-deductible-explained.html','/pages/florida-hurricane-deductible-explained.html'],
  ['/blog/citizens-insurance-impact-windows.html','/pages/citizens-insurance-impact-windows-florida.html'],
  ['/pages/how-long-does-impact-window-installation-take.html','/blog/how-long-does-impact-window-installation-take-florida.html'],
  ['/pages/do-impact-windows-prevent-break-ins.html','/pages/smash-and-grab-protection-florida.html'],
  ['/pages/can-burglars-break-impact-windows.html','/pages/smash-and-grab-protection-florida.html'],
  ['/pages/burglar-proof-windows-florida.html','/pages/smash-and-grab-protection-florida.html'],
  ['/pages/home-invasion-protection-florida.html','/pages/smash-and-grab-protection-florida.html'],
  ['/pages/impact-windows-home-security.html','/pages/smash-and-grab-protection-florida.html'],
  ['/pages/do-impact-windows-increase-home-resale-value-florida.html','/pages/impact-windows-increase-home-value-florida.html'],
  ['/pages/how-to-lower-florida-home-insurance.html','/blog/how-to-lower-florida-homeowners-insurance-2026.html'],
  ['/pages/florida-insurance-savings-center.html','/pages/hurricane-windows-insurance-savings.html'],
  ['/pages/florida-insurance-savings-impact-windows-worth-it.html','/pages/hurricane-windows-insurance-savings.html'],
  ['/pages/pgt-winguard-impact-windows-florida-review.html','/pages/pgt-impact-windows-florida.html'],
  ['/pages/do-impact-windows-really-work-in-a-hurricane.html','/pages/will-impact-windows-break-in-a-storm.html']
];
let added = 0;
add.forEach(([s,d]) => { if(!j.redirects.some(r=>r.source===s)){ j.redirects.push({source:s,destination:d,permanent:true}); added++; } });
fs.writeFileSync('vercel.json', JSON.stringify(j, null, 2));
console.log('ADDED: ' + added + ' | TOTAL: ' + j.redirects.length + ' | REWRITES: ' + j.rewrites.length);
