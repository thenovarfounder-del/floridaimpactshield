const fs=require("fs"),path=require("path");
let files=[];(function walk(d){for(const e of fs.readdirSync(d)){const f=path.join(d,e);const st=fs.statSync(f);
 if(st.isDirectory()&&!["node_modules",".git",".vercel"].includes(e))walk(f);
 else if(e.endsWith(".html")&&!/bak/.test(e))files.push(f);}})(process.cwd());
let patched=0;
for(const f of files){let t=fs.readFileSync(f,"utf8");
 if(!t.includes(">Wind Mitigation Guide</a>"))continue;
 t=t.replace(/>Wind Mitigation Guide<\/a>/g,">Wind Mitigation Inspection Guide</a>");
 fs.writeFileSync(f,t);patched++;}
console.log("ANCHOR UPGRADED on "+patched+" pages");
