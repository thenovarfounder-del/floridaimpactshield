const fs = require('fs');
const path = require('path');
const j = JSON.parse(fs.readFileSync('vercel.json','utf8'));
const map = {};
j.redirects.forEach(r => { map[r.source] = r.destination; });
const order = Object.keys(map).sort((a,b)=>b.length-a.length);
function walk(d,out){ fs.readdirSync(d,{withFileTypes:true}).forEach(e=>{ const p=path.join(d,e.name); if(e.isDirectory()){ if(!/node_modules|\.vercel|\.git/.test(e.name)) walk(p,out);} else if(e.name.endsWith('.html')) out.push(p); }); return out; }
let touched=0,total=0;
walk('.',[]).forEach(f=>{
  const norm='/'+f.replace(/\\/g,'/').replace(/^\.\//,'');
  if (Object.values(map).includes(norm)) return;
  let s=fs.readFileSync(f,'utf8'); const orig=s;
  order.forEach(from=>{
    if(norm===from) return;
    const to=map[from];
    [from, from.slice(1), '..'+from].forEach(v=>{
      const rep = v===from ? to : (v.startsWith('..') ? '..'+to : to.slice(1));
      const parts=s.split(v);
      if(parts.length>1){ total+=parts.length-1; s=parts.join(rep); }
    });
  });
  if(s!==orig){ fs.writeFileSync(f,s); touched++; }
});
console.log('FILES: '+touched+' | LINKS: '+total);
let sm=fs.readFileSync('sitemap.xml','utf8');
const b=(sm.match(/<url>/g)||[]).length;
order.forEach(d=>{ const re=new RegExp('\\s*<url>(?:(?!<\\/url>)[\\s\\S])*?'+d.replace(/[.\/-]/g,'\\$&')+'[\\s\\S]*?<\\/url>','g'); sm=sm.replace(re,''); });
const a=(sm.match(/<url>/g)||[]).length;
fs.writeFileSync('sitemap.xml',sm);
console.log('SITEMAP: '+b+' -> '+a);
let lm=fs.readFileSync('llms.txt','utf8');
const lb=lm.split('\n').length;
const slugs=order.map(d=>d.replace('.html','').replace(/.*\//,''));
const lo=lm.split('\n').filter(l=>!slugs.some(sg=>l.includes(sg)));
fs.writeFileSync('llms.txt',lo.join('\n'));
console.log('LLMS: '+lb+' -> '+lo.length);
