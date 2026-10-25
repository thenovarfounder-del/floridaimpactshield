const fs=require("fs");
let t=fs.readFileSync("index.html","utf8");
if(!t.includes("561-887-4553")){console.log("old number not found \u2014 checking if already swapped: "+t.includes("954-840-4577"));process.exit(0);}
t=t.split("561-887-4553").join("954-840-4577");
t=t.split("tel:5618874553").join("tel:9548404577");
fs.writeFileSync("index.html",t);
console.log("swapped \u2014 new number in file: "+t.includes("954-840-4577")+" | old gone: "+(!t.includes("561-887-4553")));
