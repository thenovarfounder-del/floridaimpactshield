const fs = require('fs');
const dead = ['10000-impact-window-grant','florida-hurricane-hardening-grant','impact-window-grant-florida-2026','impact-windows-grant-florida-homeowners','my-safe-florida-home-grant-2026-funding-renewed','my-safe-florida-home-grant-impact-windows','my-safe-florida-home-grant-complete-guide-2026','my-safe-florida-home-program-guide'];
let s = fs.readFileSync('sitemap.xml','utf8');
const before = (s.match(/<url>/g)||[]).length;
dead.forEach(d => {
  const re = new RegExp('\\s*<url>(?:(?!<\\/url>)[\\s\\S])*?' + d + '[\\s\\S]*?<\\/url>','g');
  s = s.replace(re, '');
});
const after = (s.match(/<url>/g)||[]).length;
fs.writeFileSync('sitemap.xml', s);
console.log('URLS BEFORE: ' + before);
console.log('URLS AFTER:  ' + after);
console.log('REMOVED:     ' + (before - after));
