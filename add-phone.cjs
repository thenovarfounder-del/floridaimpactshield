const fs=require("fs");
let t=fs.readFileSync("index.html","utf8");
if(t.includes("561-887-4553")){console.log("phone already placed");process.exit(0);}
const OLD='<a href="/pages/free-quote.html" onclick="Modal.open();return false;" class="nav-cta-btn">Free Quote</a>';
if(!t.includes(OLD)){console.error("button anchor not found \u2014 markup differs");process.exit(1);}
const NEW=OLD+'<a href="tel:5618874553" class="nav-phone" style="display:block;text-align:center;margin-top:5px;font-size:13.5px;font-weight:800;color:var(--amber);text-decoration:none;letter-spacing:.02em">\u260E 561-887-4553</a>';
t=t.replace(OLD,NEW);
// wrap nav-right vertically so phone sits UNDER the button
t=t.replace('<div class="nav-right">','<div class="nav-right" style="display:flex;flex-direction:column;align-items:center">');
fs.writeFileSync("index.html",t);
console.log("phone planted under Free Quote: "+t.includes("561-887-4553"));
