import http from 'node:http';
import {createReadStream,statSync,existsSync} from 'node:fs';
import {resolve,join,extname,sep} from 'node:path';
const base=resolve(import.meta.dirname,'..',process.argv[2]||'.');
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg','.mp4':'video/mp4','.woff2':'font/woff2','.ico':'image/x-icon'};
http.createServer((req,res)=>{
 let url;try{url=new URL(req.url,'http://localhost')}catch{res.writeHead(400);res.end();return}
 let file=resolve(base,'.'+decodeURIComponent(url.pathname));
 if(file!==base&&!file.startsWith(base+sep)){res.writeHead(403);res.end();return}
 if(!existsSync(file)||statSync(file).isDirectory())file=join(base,'index.html');
 if(!existsSync(file)){res.writeHead(404);res.end('Not found');return}
 const total=statSync(file).size;
 res.setHeader('Content-Type',mime[extname(file).toLowerCase()]||'application/octet-stream');
 res.setHeader('Accept-Ranges','bytes');
 const match=/bytes=(\d*)-(\d*)/.exec(req.headers.range||'');
 if(match){const start=match[1]?Number(match[1]):0;const end=match[2]?Math.min(Number(match[2]),total-1):total-1;
  if(start> end||start>=total){res.writeHead(416,{'Content-Range':`bytes */${total}`});res.end();return}
  res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${total}`,'Content-Length':end-start+1});createReadStream(file,{start,end}).pipe(res);return;
 }
 res.setHeader('Content-Length',total);res.writeHead(200);createReadStream(file).pipe(res);
}).listen(port,'127.0.0.1',()=>console.log(`RAMSA preview: http://127.0.0.1:${port}/`));
