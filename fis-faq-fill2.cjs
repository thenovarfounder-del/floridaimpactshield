// Adds FAQ sections (question H2s + FAQPage schema) to pages that lack them.
// Run from FIS site root: node fis-faq-fill.cjs
const fs = require('fs');
const path = require('path');
if (!fs.existsSync('pages')) { console.log('ERROR: run from FIS site root'); process.exit(1); }

const CALC = '/pages/florida-wind-mitigation-savings-calculator.html';

// [relative file, [ [question, answer], ... ] ]
const SETS = [
['blog/condo-vs-single-family-impact-window-responsibility-florida.html', [
['Who pays for impact windows in a Florida condo?','It depends on the declaration and Florida condominium law, which vary by association and situation. Windows are often unit-owner responsibility while the association controls exterior appearance and approval. Read your declaration and ask the board before planning any project.'],
['Do I need HOA approval for impact windows?','Almost always yes for exterior-visible changes. Associations typically maintain approved product and appearance standards. Submit your application before signing a contract, since approval conditions can affect product selection.'],
['Can a condo association require impact windows?','Associations can adopt requirements and, in some circumstances, undertake building-wide projects assessed to owners. Milestone inspection and structural reserve requirements have also increased attention on building envelope work in Florida.'],
['Does a condo owner get the insurance credit?','Unit owner policies and association master policies work differently. Building-wide opening protection generally affects the master policy, while unit-owner coverage may see different effects. Ask your agent how your specific structure is rated.'],
]],
['blog/mid-hurricane-season-home-check-florida-2026.html', [
['What should I check mid-hurricane season?','Verify shutter hardware and panels are complete and accessible, check window and door seals, confirm your wind mitigation report is current, photograph your home for claims documentation, and review your policy deductible so the dollar figure is not a surprise.'],
['Is it too late to install impact windows during hurricane season?','Lead times lengthen during the season, but projects are installed year-round. Beginning during the season generally means completion later in it. Planning ahead of the following season usually produces better pricing and scheduling.'],
['How do I document my home before a storm?','Photograph every room, exterior elevation and major system, and store the images off-device in cloud storage. Keep policy documents and your wind mitigation report with them. Documentation before damage is what makes claims straightforward.'],
['What if my wind mitigation report expired?','Schedule a new inspection. Expired reports can cause credits to drop off at renewal, and a current report may reveal credits you already qualify for without any construction.'],
]],
];

function faqHtml(pairs) {
  let h = '\n<!-- FIS-FAQ-START -->\n<section class="fis-faq" style="max-width:820px;margin:40px auto 0;padding:0 20px">\n';
  h += '<h2 style="font-size:26px;margin:0 0 16px">Frequently asked questions</h2>\n';
  h += '<div itemscope itemtype="https://schema.org/FAQPage">\n';
  for (const [q, a] of pairs) {
    h += '<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="margin-bottom:20px">';
    h += '<h2 itemprop="name" style="font-size:19px;margin:0 0 6px">' + q + '</h2>';
    h += '<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text" style="margin:0">' + a + '</p></div>';
    h += '</div>\n';
  }
  h += '</div>\n';
  h += '<p style="margin:22px 0 0;padding:16px 18px;border-left:4px solid #c8102e;background:rgba(200,16,46,.06)"><strong>Not sure what your wind mitigation report is costing you?</strong> Try the free <a href="' + CALC + '">Wind Mitigation Savings Calculator</a>.</p>\n';
  h += '</section>\n<!-- FIS-FAQ-END -->\n';
  return h;
}

let done = 0, missing = 0, already = 0;
for (const [rel, pairs] of SETS) {
  const fp = rel.replace(/\//g, path.sep);
  if (!fs.existsSync(fp)) { console.log('not found, skipping: ' + rel); missing++; continue; }
  let s = fs.readFileSync(fp, 'utf8');
  if (s.indexOf('FIS-FAQ-START') !== -1) { console.log('already has FAQ block: ' + rel); already++; continue; }
  // insert before the related-links block if present, else before footer
  let idx = s.indexOf('<!-- FIS-LINKS-START -->');
  if (idx < 0) idx = s.indexOf('<!-- FIS-HUBNAV-START -->');
  if (idx < 0) idx = s.lastIndexOf('<footer');
  if (idx < 0) idx = s.lastIndexOf('</body>');
  if (idx < 0) { console.log('no insertion point: ' + rel); missing++; continue; }
  s = s.slice(0, idx) + faqHtml(pairs) + s.slice(idx);
  fs.writeFileSync(fp, s, 'utf8');
  console.log('FAQ added: ' + rel + ' (' + pairs.length + ' questions)');
  done++;
}
console.log('');
console.log('DONE: ' + done + ' pages updated, ' + already + ' already had blocks, ' + missing + ' not found.');
console.log('Next: npx vercel --prod');
