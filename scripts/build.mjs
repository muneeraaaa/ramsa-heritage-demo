import {createHash} from 'node:crypto';
import {cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {join, resolve, sep} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const source = join(root, 'src');
const modules = readdirSync(source, {recursive: true}).filter(name => name.endsWith('.js')).sort();
const hash = createHash('sha256');
for (const name of modules) {
  hash.update(name.split(sep).join('/') + '\0');
  hash.update(readFileSync(join(source, name)));
  hash.update('\0');
}
const versionedSource = `src-${hash.digest('hex').slice(0, 12)}`;
const template = readFileSync(join(root, 'index.html'), 'utf8');
const entry = './src/app.js';
if (!template.includes(entry)) throw new Error('The build could not find the app entry point');

rmSync(dist, {recursive: true, force: true});
mkdirSync(dist, {recursive: true});
for (const name of ['styles.css', 'src', 'assets']) {
  cpSync(join(root, name), join(dist, name), {recursive: true});
}
// Old HTML can still load src/ while a fresh HTML response pulls the matching module graph.
cpSync(source, join(dist, versionedSource), {recursive: true});
writeFileSync(join(dist, 'index.html'), template.replace(entry, `./${versionedSource}/app.js`));
writeFileSync(join(dist, '.nojekyll'), '');
console.log('Built static site to dist/. All links are relative, compatible with project GitHub Pages.');
