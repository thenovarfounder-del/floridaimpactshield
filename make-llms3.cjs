const fs=require("fs");
const SKIP=new Set(["node_modules",".git",".vercel","assets","css","js","images","img","fonts","admin","payload"]);
function walk(d){let r=[];for(const f of fs.readdirSync(d)){if(f.startsWith("."))continue;const p=(d==="."?"":d+"/")+f;if(fs.statSync(p).isDirectory()){if(!SKIP.has(f))r=r.concat(walk(p));}else if(f.endsWith(".html"))r.push(p);}return r;}
const files=walk(".");
const groups={};
for(const p of files){
  const dir=p.includes("/")?p.split("/")[0]:"root";
  const t=fs.readFileSync(p,"utf8");
  const m=t.match(/<title>([\s\S]*?)<\/title>/);
  const title=(m?m[1]:p).replace(/\s+/g," ").trim().slice(0,120);
  const url="https://floridaimpactshield.com/"+p;
  (groups[dir]=groups[dir]||[]).push("- ["+title+"]("+url+")");
}
const lines=["# Florida Impact Shield","","> Impact doors and windows for Florida homes: free quotes, wind mitigation guidance, My Safe Florida Home (MSFH) program help, city-by-city service pages, and hurricane protection education. Family-run, statewide.","","Contact: randy@floridaimpactshield.com",""];
const order=Object.keys(groups).sort((a,b)=>a==="root"?-1:b==="root"?1:a.localeCompare(b));
for(const g of order){lines.push("## "+(g==="root"?"Main Pages":g.charAt(0).toUpperCase()+g.slice(1)));lines.push(...groups[g]);lines.push("");}
fs.writeFileSync("llms.txt",lines.join("\n"));
const out=fs.readFileSync("llms.txt","utf8");
console.log("VERIFIED: "+out.length+" bytes | sections: "+order.join(", ")+" | admin gone: "+(!out.includes("/admin/"))+" | payload gone: "+(!out.includes("/payload/")));
