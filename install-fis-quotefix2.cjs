const fs=require("fs"),path=require("path");
if(!fs.existsSync("pages/wind-mitigation-inspection.html")){console.error("ABORT: run from floridaimpactshield root");process.exit(1);}
const donor=fs.readFileSync("pages/wind-mitigation-inspection.html","utf8");
const bi=donor.indexOf('<div class="breadcrumb">');
const fi=donor.indexOf("<footer");
if(bi<0||fi<0||fi<bi){console.error("donor joints not found (breadcrumb "+bi+", footer "+fi+")");process.exit(1);}
const core=fs.readFileSync(path.join(__dirname,"payload","form-core.html"),"utf8");
const replacement='<div class="breadcrumb"><a href="/">Home</a> <span>/</span> <span>Free Quote</span></div>\n  <div class="article-body">\n'+core+'\n  </div>\n</div>\n';
let page=donor.slice(0,bi)+replacement+donor.slice(fi);
page=page.replace(/<title>[\s\S]*?<\/title>/,'<title>Free Impact Window Quote \u2014 Licensed Florida Pros + MSFH Grant Help | Florida Impact Shield</title>');
page=page.replace(/<meta name="description"[^>]*>/,'<meta name="description" content="Get a free impact window quote from licensed Florida pros \u2014 whole-home or partial, windows and doors, with My Safe Florida Home grant guidance (up to $10,000). One business day response, zero pressure.">');
page=page.replace(/<link rel="canonical"[^>]*>/,'<link rel="canonical" href="https://floridaimpactshield.com/pages/free-quote.html">');
fs.writeFileSync("pages/free-quote.html",page);
const c=fs.readFileSync("pages/free-quote.html","utf8");
console.log("REBUILT pages/free-quote.html in TRUE dress | container classes: "+c.includes('class="article-body"')+" | form: "+c.includes("FIS QUOTE LEAD")+" | canonical: "+c.includes("free-quote.html"));
if(fs.existsSync("payload")){fs.rmSync("payload",{recursive:true,force:true});console.log("payload cleaned");}
console.log("FIS QUOTE PAGE v2 \u2014 run make-llms3.cjs then deploy");
