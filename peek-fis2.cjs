const fs=require("fs");
const t=fs.readFileSync("index.html","utf8");
const hits=[...t.matchAll(/free.{0,3}quote/gi)].map(m=>m.index);
console.log("free-quote mentions at: "+hits.join(", "));
for(const i of hits.slice(1,4)){
  console.log("=== chunk @"+i+" ===");
  console.log(t.slice(Math.max(0,i-250),i+150).replace(/\s+/g," "));
}
const nav=t.search(/<header|<nav/i);
console.log("=== header open (500) ===");
console.log(t.slice(nav,nav+500).replace(/\s+/g," "));
