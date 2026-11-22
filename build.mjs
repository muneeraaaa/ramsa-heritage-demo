import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const dist=join(root,'dist');
rmSync(dist,{recursive:true,force:true});mkdirSync(dist,{recursive:true});
for (const name of ['index.html','styles.css','src','assets']) cpSync(join(root,name),join(dist,name),{recursive:true});
writeFileSync(join(dist,'.nojekyll'),'');
console.log('Built static site to dist/. All links are relative, compatible with project GitHub Pages.');
