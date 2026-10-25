const fs=require("fs"),path=require("path");
function walk(d){let r=[];for(const f of fs.readdirSync(d)){if(["node_modules",".git",".vercel","admin"].includes(f))continue;const p=path.join(d,f);const st=fs.statSync(p);if(st.isDirectory())r=r.concat(walk(p));else if(f.endsWith(".html"))r.push(p.replace(/\\/g,"/"));}return r;}
const pages=walk(".");
console.log("HTML FILES ("+pages.length+"):");
console.log(pages.join(" | "));
const home=fs.readFileSync("index.html","utf8");
const forms=(home.match(/<form/g)||[]).length;
console.log("forms on home:",forms,"| web3forms:",home.includes("web3forms"),"| mailto:",home.includes("mailto:"));
const ctas=[...home.matchAll(/href="([^"]*)"[^>]*>([^<]{0,40}(?:Quote|quote|Assess|Start|Get|Free)[^<]{0,40})</g)].slice(0,8);
console.log("CTA links:",ctas.map(c=>c[1]+" => "+c[2].trim()).join(" | ")||"none obvious");
