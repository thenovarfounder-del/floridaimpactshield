const fs=require("fs"),path=require("path");
if(!fs.existsSync("index.html")||!fs.existsSync("pages")){console.error("ABORT: run from floridaimpactshield root");process.exit(1);}
// 1) build the quote page in the site's own dress (donor: wind-mitigation-inspection.html)
const donorPath=["pages/wind-mitigation-inspection.html","pages/wind-mitigation-florida.html","pages/impact-windows.html"].find(f=>fs.existsSync(f));
const donor=fs.readFileSync(donorPath,"utf8");
function block(t,open,close){const i=t.indexOf(open);if(i<0)return null;const j=t.indexOf(close,i);return j<0?null:t.slice(i,j+close.length);}
const style=block(donor,"<style>","</style>")||"";
const nav=block(donor,"<nav","</nav>")||block(donor,"<header","</header>")||"";
const footer=block(donor,"<footer","</footer>")||"";
console.log("dress: style "+style.length+"b nav "+nav.length+"b footer "+footer.length+"b (donor "+donorPath+")");
const body=fs.readFileSync(path.join(__dirname,"payload","free-quote-body.html"),"utf8");
const page='<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>Free Impact Window Quote \u2014 Licensed Florida Pros + MSFH Grant Help | Florida Impact Shield</title>\n<meta name="description" content="Get a free impact window quote from licensed Florida pros \u2014 whole-home or partial, windows and doors, with My Safe Florida Home grant guidance (up to $10,000). One business day response, zero pressure.">\n<link rel="canonical" href="https://floridaimpactshield.com/pages/free-quote.html">\n'+style+'\n</head>\n<body>\n'+nav+'\n'+body+'\n'+footer+'\n</body>\n</html>\n';
if(!fs.existsSync("pages/free-quote.html")){fs.writeFileSync("pages/free-quote.html",page);console.log("WROTE pages/free-quote.html");}
else console.log("quote page exists \u2014 left alone");
// 2) rewire dead # CTAs everywhere
function walk(d){let r=[];for(const f of fs.readdirSync(d)){if(["node_modules",".git",".vercel","admin"].includes(f))continue;const p=path.join(d,f);const st=fs.statSync(p);if(st.isDirectory())r=r.concat(walk(p));else if(f.endsWith(".html"))r.push(p);}return r;}
let filesFixed=0,linksFixed=0;
for(const p of walk(".")){
  if(p.endsWith("free-quote.html"))continue;
  let t=fs.readFileSync(p,"utf8");
  const before=t;
  t=t.replace(/href="#"([^>]*>[^<]{0,60}?(?:Free Quote|Book Free|Free In-Home Quote|Get.{0,10}Quote|Free Assessment)[^<]{0,60}?<)/gi,'href="/pages/free-quote.html"$1');
  if(t!==before){
    const n=(before.match(/href="#"/g)||[]).length-(t.match(/href="#"/g)||[]).length;
    linksFixed+=n;filesFixed++;
    fs.writeFileSync(p,t);
  }
}
console.log("CTA rewire: "+linksFixed+" dead buttons fixed across "+filesFixed+" files");
// 3) sitemap
if(fs.existsSync("sitemap.xml")){
  let s=fs.readFileSync("sitemap.xml","utf8");
  if(!s.includes("free-quote")){s=s.replace("</urlset>","<url><loc>https://floridaimpactshield.com/pages/free-quote.html</loc></url>\n</urlset>");fs.writeFileSync("sitemap.xml",s);console.log("sitemap +1: VERIFIED");}
  else console.log("sitemap has it");
} else console.log("no sitemap.xml at root");
if(fs.existsSync("payload")){fs.rmSync("payload",{recursive:true,force:true});console.log("payload cleaned");}
console.log("FIS QUOTE MACHINE INSTALLED \u2014 run make-llms3.cjs then deploy");
