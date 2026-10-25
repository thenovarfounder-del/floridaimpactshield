const fs=require("fs");
const p=fs.existsSync("index.html")?"index.html":"pages/index.html";
const t=fs.readFileSync(p,"utf8");
console.log("homepage file: "+p);
const i=t.search(/free quote|Free Quote/i);
console.log("=== around the Free Quote button (600 chars) ===");
console.log(t.slice(Math.max(0,i-300),i+300));
