const fs=require("fs"),path=require("path");
if(!fs.existsSync("blog/wind-mitigation-florida.html")){console.error("ABORT: run from floridaimpactshield root");process.exit(1);}
const donor=fs.readFileSync("blog/wind-mitigation-florida.html","utf8");
const h1i=donor.indexOf("<h1");
let tailStart=donor.indexOf("<footer");
if(tailStart<0)tailStart=donor.lastIndexOf("</main>");
if(h1i<0||tailStart<0){console.error("ABORT joints");process.exit(1);}
let top=donor.slice(0,h1i);
const tail=donor.slice(tailStart);
top=top.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g,"");
const slug="evacuation-zones-vs-flood-zones-florida";
const meta=fs.readFileSync(path.join(__dirname,"payload","meta.txt"),"utf8").split("\n");
const body=fs.readFileSync(path.join(__dirname,"payload","body.html"),"utf8");
let t=top.replace(/<title>[\s\S]*?<\/title>/,"<title>"+meta[0]+"</title>");
t=t.replace(/<meta name="description" content="[^"]*"/,'<meta name="description" content="'+meta[1].replace(/"/g,"&quot;")+'"');
t=t.replace(/<link rel="canonical" href="[^"]*"/,'<link rel="canonical" href="https://www.floridaimpactshield.com/blog/'+slug+'.html"');
t=t.replace(/<meta property="og:title" content="[^"]*"/,'<meta property="og:title" content="'+meta[0].replace(/"/g,"&quot;")+'"');
t=t.replace(/<meta property="og:url" content="[^"]*"/,'<meta property="og:url" content="https://www.floridaimpactshield.com/blog/'+slug+'.html"');
t=t.replace(/<meta property="og:description" content="[^"]*"/,'<meta property="og:description" content="'+meta[1].replace(/"/g,"&quot;")+'"');
if(!fs.existsSync("blog/"+slug+".html")){fs.writeFileSync("blog/"+slug+".html",t+body+"\n"+tail);
console.log("WROTE blog/"+slug+".html | Aug7: "+fs.readFileSync("blog/"+slug+".html","utf8").includes("August 7, 2026"));}
else console.log("SKIP exists");
if(fs.existsSync("sitemap.xml")){
  let s=fs.readFileSync("sitemap.xml","utf8");
  if(!s.includes(slug)){s=s.replace("</urlset>","<url><loc>https://www.floridaimpactshield.com/blog/"+slug+".html</loc></url>\n</urlset>");fs.writeFileSync("sitemap.xml",s);console.log("sitemap +1: VERIFIED");}
  else console.log("sitemap has it");
}
if(fs.existsSync("payload")){fs.rmSync("payload",{recursive:true,force:true});console.log("payload cleaned");}
console.log("FIS WAVE 4 INSTALLED \u2014 run make-llms3.cjs, then deploy");
