const fs = require('fs');
const p = 'index.html';
let s = fs.readFileSync(p, 'utf8');
const host = 'floridaimpactshield' + String.fromCharCode(46) + 'com';
const oldT = '<link rel="canonical" href="https://' + host + '">';
const newT = '<link rel="canonical" href="https://www' + String.fromCharCode(46) + host + '/">';
if (s.includes(oldT)) { fs.writeFileSync(p, s.replace(oldT, newT)); console.log('INDEX: PATCHED'); }
else { console.log('INDEX: PATTERN NOT FOUND'); }
const check = fs.readFileSync(p, 'utf8').match(/<link rel="canonical"[^>]*>/);
console.log('now reads length: ' + (check ? check[0].length : 'none'));
