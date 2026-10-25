const fs=require("fs");
const p="blog/wind-mitigation-form-1802-explained.html";
let s=fs.readFileSync(p,"utf8");
if(s.includes("Rev. 04/26")){console.log("already updated");process.exit(0);}

// 1. Alert near the top, after the intro paragraph
const introAnchor = "The basics: who, what, how long";
if(s.includes(introAnchor)){
  const alert = `<div style="background:#fff8e6;border-left:4px solid #c9922e;padding:16px 18px;margin:22px 0;border-radius:4px;font-size:15.5px;line-height:1.6"><strong>Updated for the 2026 form.</strong> Florida revised the 1802 effective 1 April 2026 &mdash; inspections on or after that date must use <strong>OIR-B1-1802 (Rev. 04/26)</strong>. The seven-section structure and the credits below are unchanged. What is new is covered in the section at the end of this page.</div>\n<h2>The basics: who, what, how long`;
  s = s.replace("<h2>The basics: who, what, how long", alert);
  console.log("ALERT ADDED");
}

// 2. New section before the prep checklist
const prepAnchor = "Prep checklist";
const i = s.indexOf("<h2>"+prepAnchor);
if(i<0){console.log("PREP ANCHOR NOT FOUND");process.exit(1);}
const newSection = `<h2>What changed in the 2026 revision</h2>
<p>The Office of Insurance Regulation revised the form effective <strong>1 April 2026</strong>, following the 2024 ARA Residential Wind-Loss Mitigation Study. Every inspection dated on or after that day must be documented on <strong>OIR-B1-1802 (Rev. 04/26)</strong>. Reports completed on the prior version before that date remain valid for their five-year term &mdash; you do not need a new inspection simply because the form changed.</p>
<p><strong>New fields on the form.</strong> The revision adds <strong>design wind speed region</strong>, <strong>roof slope</strong>, and <strong>FORTIFIED designation</strong>. The wind speed region ties the property to the mapped design wind speed for its location. Roof slope is now recorded because slope affects uplift behaviour. And a FORTIFIED designation &mdash; the IBHS standard for roof and structural resilience &mdash; is captured directly rather than being described in the margins.</p>
<p><strong>Performance-based roof-to-wall options.</strong> The old classification ladder &mdash; toe nails, clips, single wraps, double wraps &mdash; remains, but the revised form adds performance-based alternatives alongside it. This matters for homes using engineered connectors or systems that do not map neatly onto the traditional categories; previously those had to be forced into the closest box, sometimes to the homeowner's disadvantage.</p>
<p><strong>Tighter documentation.</strong> The revision requires more photographs and more product documentation to support each answer. In practice this means the inspection takes longer, attic access matters more than ever, and having your permits and product approval numbers ready before the inspector arrives has moved from helpful to close to necessary.</p>
<p><strong>What did not change.</strong> The credit logic underneath is the same. Hip roof geometry still turns on the 10 percent non-hip perimeter test. Opening protection is still all-or-nothing across every exterior opening. Secondary water resistance still needs documentation from the roof job. Roof deck attachment is still measured by nail type and spacing from the attic. If you have read the sections above, you understand the form.</p>
<p>If your existing report predates April 2026 and you are shopping carriers, ask your agent whether the receiving insurer will accept it or wants a current inspection &mdash; practice varies between carriers, and the answer is worth having before you pay for a second inspection you may not need.</p>
`;
s = s.slice(0,i) + newSection + s.slice(i);
fs.writeFileSync(p,s);
console.log("SECTION ADDED");
console.log("size now: " + Math.round(s.length/1024) + " KB");
