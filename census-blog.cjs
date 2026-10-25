const fs=require("fs");
const files=fs.readdirSync("blog").filter(f=>f.endsWith(".html"));
console.log("=== blog files ("+files.length+") ===");
for(const f of files){
  const t=fs.readFileSync("blog/"+f,"utf8");
  const ti=(t.match(/<title>([\s\S]*?)<\/title>/)||[,""])[1].replace(/\s+/g," ").trim().slice(0,80);
  const dt=(t.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+2026/)||[""])[0];
  console.log(f+" | "+(dt||"NO DATE")+" | "+ti);
}
