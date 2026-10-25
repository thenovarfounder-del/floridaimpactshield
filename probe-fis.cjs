const fs=require("fs"),path=require("path");
function walk(d){let r=[];for(const f of fs.readdirSync(d)){if(["node_modules",".git",".vercel"].includes(f))continue;const p=path.join(d,f);const st=fs.statSync(p);if(st.isDirectory())r=r.concat(walk(p));else if(f==="index.html")r.push(p.replace(/\\\\/g,"/"));}return r;}
const pages=walk(".");
console.log("PAGES ("+pages.length+"):",pages.map(p=>p.replace("/index.html","")).join(" | "));
const home=fs.readFileSync("index.html","utf8");
console.log("sticky bar: "+home.includes("sticky"));
console.log("form on home: "+home.includes("<form"));
const qc=["quote","free-quote","contact","get-quote"].filter(d=>fs.existsSync(d+"/index.html"));
console.log("quote-ish pages:",qc.join(" | ")||"NONE");
if(qc[0]){const t=fs.readFileSync(qc[0]+"/index.html","utf8");const i=t.indexOf("<form");console.log(i>=0?("=== FORM (first 1200) ===\n"+t.slice(i,i+1200)):"no <form> on "+qc[0]);}
