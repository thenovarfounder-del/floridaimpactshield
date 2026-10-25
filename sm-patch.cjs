// Adds the 7 hub URLs to sitemap.xml. Run from FIS root: node sm-patch.cjs
const fs = require('fs');
if (!fs.existsSync('sitemap.xml')) { console.log('ERROR: sitemap.xml not found'); process.exit(1); }
const hubs = ['impact-window-installers-by-city-florida','impact-window-types-florida','impact-doors-florida','impact-window-brands-florida','impact-window-cost-guides-florida','impact-windows-insurance-and-grants-florida','impact-window-guides-florida'];
let sm = fs.readFileSync('sitemap.xml', 'utf8');
let added = 0;
for (const h of hubs) {
  const loc = 'https://www.floridaimpactshield.com/pages/' + h + '.html';
  if (sm.indexOf(loc) !== -1) continue;
  sm = sm.replace('</urlset>', '<url><loc>' + loc + '</loc><lastmod>2026-07-21</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n</urlset>');
  added++;
}
fs.writeFileSync('sitemap.xml', sm, 'utf8');
const n = (sm.match(/<loc>/g) || []).length;
console.log('hub URLs added: ' + added + ' | sitemap now has ' + n + ' URLs');
