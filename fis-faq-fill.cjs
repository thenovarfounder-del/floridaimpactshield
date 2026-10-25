// Adds FAQ sections (question H2s + FAQPage schema) to pages that lack them.
// Run from FIS site root: node fis-faq-fill.cjs
const fs = require('fs');
const path = require('path');
if (!fs.existsSync('pages')) { console.log('ERROR: run from FIS site root'); process.exit(1); }

const CALC = '/pages/florida-wind-mitigation-savings-calculator.html';

// [relative file, [ [question, answer], ... ] ]
const SETS = [

['pages/impact-window-installers-by-city-florida.html', [
['How much do impact windows cost in Florida?','Costs vary by city, home size, window count, frame material and product line. Most Florida projects are quoted per opening, and whole-home projects commonly run into five figures. Local permitting requirements and access difficulty also affect installed pricing, which is why itemized quotes from multiple installers are worth collecting.'],
['Does my city require a permit for impact windows?','Yes. Every Florida municipality requires permits for window and door replacement, and inspections are part of the process. A licensed installer pulls the permit as part of the job. Permitted, inspected work is also what lets you document the improvement for insurance credits.'],
['Do impact window prices differ between Florida cities?','Somewhat. Coastal and high-velocity hurricane zone areas often require higher-rated products, and labor and permitting costs vary by municipality. The larger cost drivers remain your window count, sizes and product selection.'],
['How do I choose an installer in my city?','Verify the license and insurance, confirm they pull permits, ask for local references, and require itemized quotes covering every opening. Partial projects usually forfeit the insurance credit entirely, so confirm the quote is complete.'],
]],

['pages/impact-window-types-florida.html', [
['What types of impact windows are available in Florida?','Common styles include single and double hung, casement, awning, horizontal roller, picture and fixed windows, plus specialty shapes. All can be manufactured as impact-rated units; the style affects ventilation, egress and cost more than protection level.'],
['Which impact window type is most affordable?','Fixed and picture windows are generally the least expensive per square foot because they have no operating hardware. Casement and specialty shapes typically cost more. The right choice depends on ventilation needs and egress requirements, not price alone.'],
['Do all impact window types earn the same insurance credit?','The credit depends on impact rating and coverage of every opening, not window style. Any properly rated product installed to code contributes to opening protection; the style itself does not change the credit.'],
['Can I mix window types in one home?','Yes, and most homes do. Bedrooms may need egress-capable styles, living areas may prioritize views with picture windows, and bathrooms may use awning windows for ventilation and privacy. All must be impact rated for the credit to apply.'],
]],

['pages/impact-doors-florida.html', [
['Do impact doors matter as much as impact windows?','Yes. Doors are openings, and the opening protection credit generally requires every opening protected, including entry doors, sliders, french doors and garage doors. A single unprotected door can forfeit the credit and, more importantly, is a real failure point in a storm.'],
['Are sliding glass doors available as impact rated?','Yes. Impact-rated sliding glass doors are widely available in Florida, including large multi-panel configurations. They cost more than standard sliders due to reinforced frames and laminated glass, and installation requires proper structural attachment.'],
['Does my garage door need to be impact rated?','For the insurance credit, generally yes. Garage doors are large openings, and a failed garage door is a documented pathway to interior pressurization during a hurricane. Many homeowners protect windows and overlook the garage.'],
['Can I keep my existing front door and still get the credit?','Only if it is already impact rated and documented. An unrated entry door typically prevents the opening protection credit even when everything else is protected, because most carriers require complete coverage.'],
]],

['pages/impact-window-brands-florida.html', [
['Which impact window brand is best for Florida homes?','There is no single best brand. What matters is the product line rating for your zone, the warranty terms, the installer\u2019s experience with that product, and documented Florida product approval. A well-installed mid-tier product outperforms a premium product installed poorly.'],
['Does brand affect my insurance discount?','Not directly. The credit depends on documented impact ratings and complete coverage of every opening, not manufacturer name. Any properly rated and approved product qualifies when installed to code and verified by inspection.'],
['What should I compare between brands?','Impact rating and Florida product approval numbers, frame material, warranty length and what it actually covers, glass options for energy performance, available sizes for your openings, and lead times, which can vary substantially during busy seasons.'],
['Are more expensive brands worth it?','Sometimes. Higher tiers typically offer better frame finishes, wider size ranges, improved energy performance and stronger warranties. For pure storm protection and insurance credit, a properly rated lower-tier product performs the same function.'],
]],

['pages/impact-window-cost-guides-florida.html', [
['What do impact windows cost per window in Florida?','Per-opening pricing varies widely with size, style, frame material and product tier. Small fixed windows sit at the low end; large sliders and custom shapes at the high end. Installed quotes should itemize each opening so you can compare bids fairly.'],
['Why do quotes vary so much between installers?','Differences in product tier, frame material, installation method, permit handling, structural repairs discovered during removal, and warranty terms. A cheap quote that omits permits, disposal or full coverage is not comparable to a complete one.'],
['Is financing available for impact windows in Florida?','Commonly yes, through contractor financing programs, home improvement loans, and in some cases PACE-style financing. Compare total cost including interest, and check whether any grant program is currently accepting applications before financing the full amount.'],
['Does the cost pay for itself?','On insurance savings alone, payback typically takes years and depends heavily on your premium and county. Grants, energy savings, storm protection, noise reduction and resale value all shorten the effective payback. Run your own numbers rather than a generic percentage.'],
]],

['pages/impact-windows-insurance-and-grants-florida.html', [
['How much can impact windows lower my Florida insurance?','Opening protection is typically the largest wind mitigation credit available on a Florida policy, but the dollar amount depends on your premium, county, carrier and home. Homeowners with high premiums in high-wind counties see the largest reductions.'],
['Do I need a new inspection after installing impact windows?','Yes. Credits are not applied automatically. A new certified wind mitigation inspection documenting the protection must be submitted to your carrier, which is how the opening protection credit gets claimed.'],
['Are there grants for impact windows in Florida?','Florida has operated matching-grant programs for wind mitigation improvements. Funding rounds open and close, so verify current availability and eligibility before planning around a grant.'],
['Will I get partial credit for protecting some openings?','Usually not. Most carriers require every opening rated before the opening protection credit applies, which is why partial projects often earn nothing while still costing substantially.'],
]],

['pages/impact-window-guides-florida.html', [
['Do impact windows actually work in a hurricane?','Impact-rated windows are tested against large and small missile impact plus cyclic pressure loading. They can crack or spider under severe impact while remaining in the frame, which is the point: keeping the building envelope sealed prevents the internal pressurization that causes structural failure.'],
['How long do impact windows last in Florida?','Quality impact windows are long-lived assets, though salt air, sun exposure and maintenance affect frame and seal life. Warranties vary by manufacturer and component, with glass, frame and hardware often covered differently.'],
['Do impact windows help with noise and energy bills?','Yes on both counts. Laminated impact glass reduces sound transmission noticeably, and insulated impact units typically outperform the single-pane glass found in older Florida homes, which matters given year-round cooling loads.'],
['Are impact windows better than shutters?','For insurance credit purposes, code-approved shutters covering every opening can qualify equally. The practical difference is deployment: impact glazing is always in place, while shutters must be installed before every storm and stored between them.'],
]],

['blog/hurricane-impact-windows-cost-florida.html', [
['What is the average cost of hurricane impact windows in Florida?','Costs are quoted per opening and vary with size, style, frame material and product tier. Whole-home projects commonly reach five figures. The most reliable approach is collecting itemized quotes from multiple licensed installers covering every opening.'],
['Why is impact window installation more expensive in Florida?','Products must meet Florida product approval and, in high-velocity hurricane zones, stricter standards. Permitting and inspection requirements add cost, and structural attachment requirements are more demanding than standard window replacement.'],
['Can I install impact windows myself to save money?','No. Permits and inspections are required, and improper structural attachment defeats the protection and voids both warranty and insurance credit. The inspection that documents your credit requires permitted, code-compliant installation.'],
['Does replacing windows in phases cost more overall?','Usually yes, because mobilization, permitting and minimum-order costs repeat. It can also forfeit the insurance credit entirely, since most carriers require every opening protected before the credit applies.'],
]],

['blog/impact-windows-vs-shutters-florida.html', [
['Which is cheaper, impact windows or shutters?','Shutters generally cost less upfront. Impact windows cost more but require no deployment, provide energy and noise benefits, and do not need storage space. Total cost of ownership narrows the gap over time.'],
['Do shutters and impact windows earn the same insurance credit?','Both can qualify for opening protection when code-approved products cover every opening and are documented by a certified inspection. The credit is based on rated protection, not the method.'],
['What happens if I am away when a storm approaches?','This is the practical case for impact glazing. Shutters require someone present to deploy them, while impact windows protect the home whether you are there or not.'],
['Can I combine shutters and impact windows?','Yes, and many homes do, protecting some openings with impact units and others with shutters. For the credit, what matters is that every opening carries approved protection.'],
]],

['blog/hurricane-ian-impact-windows-lesson.html', [
['What did Hurricane Ian reveal about window protection?','Post-storm assessments in Florida have consistently shown that homes maintaining a sealed building envelope suffer dramatically less structural damage. Once an opening fails, wind enters and pressurizes the interior, which is what removes roofs and collapses walls.'],
['Does plywood protect windows as well as impact products?','No. Plywood is not an approved opening protection method for insurance credit purposes, and its performance depends entirely on thickness, fastening and installation quality. It also requires deployment before every storm.'],
['Are newer Florida homes safer in hurricanes?','Generally yes. Homes built to the strengthened Florida codes, particularly after 2002, perform measurably better. This is precisely why insurers price older homes differently and why retrofitting opening protection changes an older home\u2019s risk profile.'],
['What is the most common failure point in a hurricane?','Openings, and among them garage doors and unprotected windows. Roof damage often follows an opening failure rather than beginning independently, which is why opening protection carries such weight with insurers.'],
]],

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

['pages/hurricane-windows-cost-florida.html', [
['What drives hurricane window pricing in Florida?','Window count and sizes, frame material, product tier and rating, installation complexity, permitting, and any structural repairs discovered during removal. Quotes should itemize each opening so bids are comparable.'],
['Should I get multiple quotes?','Yes, at least three, all itemized and all covering every opening. Confirm each includes permits, disposal, and full product approval documentation, since incomplete quotes are not comparable to complete ones.'],
['Are cheaper impact windows worth considering?','Lower-tier products that carry proper ratings and Florida approval provide the same storm protection and insurance credit. The differences appear in frame finish, size availability, energy performance and warranty terms.'],
['Does the quote include permits and inspection?','It should. Ask explicitly. Permitted and inspected installation is required for code compliance and is what allows the work to be documented for wind mitigation credit.'],
]],

['pages/hurricane-impact-windows-vs-plywood-florida.html', [
['Is plywood acceptable for hurricane protection in Florida?','Plywood is a last-resort measure, not an approved opening protection method for insurance credit. Its performance depends entirely on thickness, fastening pattern and installation quality, and it must be installed before every storm.'],
['Will plywood lower my insurance premium?','No. Opening protection credit requires approved, rated products documented by a certified inspection. Plywood does not qualify.'],
['Why do people still use plywood?','Cost and immediacy. It is inexpensive and available before a storm. The tradeoffs are labor before every event, storage between events, no energy or noise benefit, no insurance credit, and unpredictable performance.'],
['What is the minimum acceptable alternative to impact windows?','Code-approved shutters or panels covering every opening can earn the same insurance credit and provide tested protection, at lower upfront cost than impact glazing but with deployment required before each storm.'],
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
  if (idx < 0) { console.log('no insertion point: ' + rel); missing++; continue; }
  s = s.slice(0, idx) + faqHtml(pairs) + s.slice(idx);
  fs.writeFileSync(fp, s, 'utf8');
  console.log('FAQ added: ' + rel + ' (' + pairs.length + ' questions)');
  done++;
}
console.log('');
console.log('DONE: ' + done + ' pages updated, ' + already + ' already had blocks, ' + missing + ' not found.');
console.log('Next: npx vercel --prod');
