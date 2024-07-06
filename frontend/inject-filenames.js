import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = resolve(__dirname, 'dist');
const indexPath = join(distDir, 'index.html');
const files = readdirSync(join(distDir, 'assets'));

let indexHtml = readFileSync(indexPath, 'utf8');

files.forEach(file => {
  if (file.endsWith('.js')) {
    indexHtml = indexHtml.replace('src="/assets/index.js"', `src="/assets/${file}"`);
  }
  if (file.endsWith('.css')) {
    indexHtml = indexHtml.replace('href="/assets/index.css"', `href="/assets/${file}"`);
  }
});

writeFileSync(indexPath, indexHtml);