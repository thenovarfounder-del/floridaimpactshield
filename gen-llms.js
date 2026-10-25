// Regenerate llms.txt from sitemap.xml — run from FIS root: node gen-llms.js
const fs = require('fs');
const sm = fs.readFileSync('sitemap.xml', 'utf8');
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const today = '2026-07-19';
let out = '# Florida Impact Shield\n';
out += '# https://floridaimpactshield.com\n';
out += '# Hurricane impact windows and doors across Florida: installation, replacement, repair,\n';
out += '# insurance savings (wind mitigation), My Safe Florida Home grants, brand comparisons,\n';
out += '# city service pages, and technical guides (ratings, NOA, glass technology).\n';
out += '# Licensed CBC contractor. MSFH approved. Updated: ' + today + '\n\n';
for (const u of urls) out += u + '\n';
fs.writeFileSync('llms.txt', out, 'utf8');
console.log('llms.txt written with ' + urls.length + ' URLs, dated ' + today);
