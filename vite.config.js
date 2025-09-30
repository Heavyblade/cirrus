const path = require('path');
const { defineConfig } = require('vite');


module.exports = defineConfig(({ mode }) => {
  const isTestBuild = mode === 'test';

  return {
    build: {
      sourcemap: false,
      outDir: 'builds',
      emptyOutDir: false,
      minify: isTestBuild ? false : 'esbuild',
      lib: {
        entry: path.resolve(__dirname, isTestBuild ? 'libs/entries/cirrus-node.js' : 'libs/cirrus.js'),
        name: 'wApp',
        formats: [isTestBuild ? 'cjs' : 'umd'],
        fileName: () => (isTestBuild ? 'cirrus.min.test.js' : 'cirrus.min.js')
      },
      commonjsOptions: {
        include: [/libs/, /node_modules/]
      },
      rollupOptions: {
        external: isTestBuild
          ? (id) => id === 'jsonfile' || id.includes(`${path.sep}libs${path.sep}handlebars.js`)
          : undefined,
        output: {
          strict: false,
          exports: isTestBuild ? 'auto' : 'named',
          paths: isTestBuild
            ? (id) => (id.includes(`${path.sep}libs${path.sep}handlebars.js`) ? '../libs/handlebars.js' : undefined)
            : undefined
        }
      }
    }
  };
});
