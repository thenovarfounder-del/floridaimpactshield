const fs = require('fs');
const j = JSON.parse(fs.readFileSync('vercel.json','utf8'));
j.redirects = j.redirects || [];
const add = [
  ['/pages/wind-mitigation-inspection.html', '/blog/what-is-wind-mitigation-inspection-florida.html'],
  ['/pages/wind-mitigation-inspection-what-to-expect.html', '/blog/what-is-wind-mitigation-inspection-florida.html'],
  ['/blog/wind-mitigation-florida.html', '/blog/what-is-wind-mitigation-inspection-florida.html'],
  ['/pages/florida-wind-mitigation-savings-calculator.html', '/pages/wind-mitigation-discount-florida.html'],
  ['/pages/impact-windows-insurance-and-grants-florida.html', '/pages/wind-mitigation-discount-florida.html']
];
let added = 0;
add.forEach(([s,d]) => {
  if (!j.redirects.some(r => r.source === s)) { j.redirects.push({source:s, destination:d, permanent:true}); added++; }
});
fs.writeFileSync('vercel.json', JSON.stringify(j, null, 2));
console.log('ADDED: ' + added);
console.log('TOTAL REDIRECTS: ' + j.redirects.length);
console.log('REWRITES INTACT: ' + j.rewrites.length);
