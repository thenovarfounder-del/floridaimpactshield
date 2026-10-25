const fs=require("fs");
function scan(dir,prefix){
  return fs.readdirSync(dir).filter(f=>f.endsWith(".html")).map(f=>{
    const t=fs.readFileSync(dir+"/"+f,"utf8");
    const m=t.match(/<title>([\s\S]*?)<\/title>/);
    const title=(m?m[1]:f).replace(/\s+/g," ").trim();
    const url="https://floridaimpactshield.com"+prefix+"/"+f;
    return "- ["+title+"]("+url+")";
  });
}
const lines=[
"# Florida Impact Shield",
"",
"> Impact doors and windows for Florida homes: free quotes, wind mitigation guidance, My Safe Florida Home (MSFH) program help, and hurricane protection education. Family-run, statewide.",
"",
"Contact: randy@floridaimpactshield.com",
"",
"## Pages",
...scan(".",""),
"",
"## Guides & Blog",
...scan("blog","/blog"),
];
fs.writeFileSync("llms.txt",lines.join("\n")+"\n");
const out=fs.readFileSync("llms.txt","utf8");
console.log("VERIFIED IN FILE: llms.txt "+out.length+" bytes | msfh: "+out.includes("my-safe-florida-home")+" | inspection: "+out.includes("wind-mitigation-inspection"));
