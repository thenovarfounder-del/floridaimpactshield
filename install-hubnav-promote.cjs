const fs=require('fs'),path=require('path');
const GO=process.argv.includes('--go');
if(!fs.existsSync('sitemap.xml')||!fs.existsSync('blog')){console.error('ABORT: wrong dir');process.exit(1);}
const LINKS=' <a href="/blog/wind-mitigation-florida.html">Wind Mitigation Guide</a> <a href="/blog/pace-financing-florida.html">PACE Financing</a> <a href="/blog/quiet-hurricane-season-trap.html">Quiet Season Trap</a> ';
let files=[];
(function walk(d){for(const e of fs.readdirSync(d)){const f=path.join(d,e);const st=fs.statSync(f);
 if(st.isDirectory()&&!['node_modules','.git','.vercel'].includes(e))walk(f);
 else if(e.endsWith('.html')&&!/bak/.test(e))files.push(f);}})(process.cwd());
let patched=0,already=0,noNav=0;
for(const f of files){
  let t=fs.readFileSync(f,'utf8');
  const i=t.indexOf('<nav class="fis-hubnav"');
  if(i===-1){noNav++;continue;}
  const tagEnd=t.indexOf('>',i)+1;
  const navEnd=t.indexOf('</nav>',i);
  if(t.slice(tagEnd,navEnd).includes('wind-mitigation-florida.html')){already++;continue;}
  t=t.slice(0,tagEnd)+LINKS+t.slice(tagEnd);
  if(GO)fs.writeFileSync(f,t);
  patched++;
}
console.log('files:'+files.length+' PATCHED:'+patched+' already:'+already+' noNav:'+noNav);
