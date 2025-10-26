import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const legacySources = [
  'libs/vjavascript.js',
  'libs/base64.js',
  'libs/v7_render.js',
  'libs/handlebars.js',
  'libs/cirrus.js',
];

function legacyBundlePlugin({ files, testFileName }) {
  const virtualEntryRequest = 'virtual:legacy-entry';
  const virtualEntryId = '\0legacy-entry';
  let rootDir = process.cwd();
  let concatenatedSource = '';

  return {
    name: 'legacy-concat-bundle',
    configResolved(config) {
      rootDir = config.root;
    },
    buildStart() {
      concatenatedSource = files
        .map((relativePath) => {
          const absolutePath = path.resolve(rootDir, relativePath);
          this.addWatchFile(absolutePath);
          return fs.readFileSync(absolutePath, 'utf8');
        })
        .join('\n;\n');
    },
    resolveId(id) {
      if (id === virtualEntryRequest) {
        return virtualEntryId;
      }
      return null;
    },
    load(id) {
      if (id === virtualEntryId) {
        return concatenatedSource;
      }
      return null;
    },
    generateBundle(_options, bundle) {
      Object.values(bundle).forEach((chunk) => {
        if (chunk.type === 'chunk') {
          chunk.code = chunk.code.replace(/module\.exports\s*=\s*wApp\s*;?/, '');
        }
      });
    },
    writeBundle(options) {
      const outputDir = options.dir
        ? path.resolve(rootDir, options.dir)
        : rootDir;
      const targetPath = path.resolve(outputDir, testFileName);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, concatenatedSource, 'utf8');
    },
  };
}

export default defineConfig({
  root: __dirname,
  build: {
    outDir: 'builds',
    emptyOutDir: false,
    rollupOptions: {
      input: 'virtual:legacy-entry',
      output: {
        entryFileNames: 'cirrus.min.js',
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
  plugins: [
    legacyBundlePlugin({
      files: legacySources,
      testFileName: 'cirrus.min.test.js',
    }),
  ],
});
