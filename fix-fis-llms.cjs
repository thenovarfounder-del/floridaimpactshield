const fs = require('fs');
const dead = ['10000-impact-window-grant','florida-hurricane-hardening-grant','impact-window-grant-florida-2026','impact-windows-grant-florida-homeowners','my-safe-florida-home-grant-2026-funding-renewed','my-safe-florida-home-grant-impact-windows','my-safe-florida-home-grant-complete-guide-2026','my-safe-florida-home-program-guide','wind-mitigation-inspection-what-to-expect','florida-wind-mitigation-savings-calculator','impact-windows-insurance-and-grants-florida'];
if (!fs.existsSync('llms.txt')) { console.log('llms.txt NOT FOUND in repo root'); process.exit(1); }
let s = fs.readFileSync('llms.txt','utf8');
const before = s.split('\n').length;
const out = s.split('\n').filter(l => !dead.some(d => l.includes(d)));
fs.writeFileSync('llms.txt', out.join('\n'));
console.log('LINES: ' + before + ' -> ' + out.length + '  (removed ' + (before-out.length) + ')');
