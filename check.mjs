import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
const root=resolve(import.meta.dirname,'..');
const files=['index.html','styles.css','src/app.js','src/shared.js','src/components/ui.js','src/pages/overview.js','src/features/government.js','src/features/experiences.js','src/features/community.js','assets/video/pearl-diving.mp4','assets/video/palm-weaving.mp4'];
let failures=0;
for (const rel of files){if(!existsSync(resolve(root,rel))){console.error('MISSING:',rel);failures++;continue}if(rel.endsWith('.js'))try{execFileSync(process.execPath,['--check',resolve(root,rel)],{stdio:'pipe'})}catch{console.error('INVALID JS:',rel);failures++}}
const html=readFileSync(resolve(root,'index.html'),'utf8');
if(!html.includes('./src/app.js')){console.error('Incorrect module entrypoint');failures++}
for(let i=1;i<=7;i++)if(!existsSync(resolve(root,`assets/future-visions/vision-${i}.webp`))){console.error('MISSING concept:',i);failures++}
console.log(`${files.length+7} presence/syntax checks; failures: ${failures}`);if(failures)process.exit(1);
