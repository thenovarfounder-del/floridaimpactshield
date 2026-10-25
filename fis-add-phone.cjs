const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\randy\\Downloads\\floridaimpactshield-turnkey\\floridaimpactshield';

// Find all HTML files
function getHtmlFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      results.push(...getHtmlFiles(full));
    } else if (item.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const files = getHtmlFiles(BASE);
let updated = 0;

// The phone link to add — sits before the Free Quote button in nav-right
const PHONE_HTML = '<a href="tel:+19177256501" class="nav-phone-link" style="color:#fff;font-weight:600;font-size:15px;text-decoration:none;margin-right:16px;">&#128222; 917-725-6501</a>';

// Match the nav-right div opening tag and insert phone before existing content
const OLD = '<div class="nav-right">';
const NEW = '<div class="nav-right">' + PHONE_HTML;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(OLD) && !html.includes('9177256501')) {
    html = html.replace(OLD, NEW);
    fs.writeFileSync(file, html, 'utf8');
    console.log('OK  ' + path.relative(BASE, file));
    updated++;
  }
}

console.log('\nDone — ' + updated + ' files updated');
console.log('Next: cd ' + BASE);
console.log('      npx vercel --prod');
