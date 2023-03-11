import { globby } from 'globby';
import { dirname, join, resolve, sep } from 'path/posix';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');
const input = (await globby(join(root, '**', 'index.html'))).reduce((result, path) => {
  const folder = dirname(resolve(path));
  result[folder === root ? 'main' : folder.split(sep).pop()] = path;
  return result;
}, {});

export default defineConfig({
  root,
  base: '/fontend-mentor-challenges/',
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input
    }
  },
  publicDir
});