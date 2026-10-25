const fs=require("fs");
for(const f of ["blog/why-hurricane-claims-get-denied.html","blog/after-the-storm-contractor-scams.html"]){
  let t=fs.readFileSync(f,"utf8");
  t=t.split("2026-08-05").join("2026-08-06");
  t=t.split("August 5, 2026").join("August 6, 2026");
  fs.writeFileSync(f,t);
  const c=fs.readFileSync(f,"utf8");
  console.log(f+" | Aug5 remaining: "+(c.includes("August 5, 2026")||c.includes("2026-08-05"))+" | Aug6 present: "+c.includes("August 6, 2026"));
}
