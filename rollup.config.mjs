import terser from '@rollup/plugin-terser';
import fs from 'fs';
import path from 'path';

const filesToPrepend = [
  'libs/vjavascript.js',
  'libs/base64.js',
  'libs/handlebars.js',
];

const combinedBanner = filesToPrepend
  .map(filePath => fs.readFileSync(path.resolve(filePath), 'utf-8'))
  .join('\n\n'); // Adds double spacing between file contents

// rollup.config.mjs
export default {
  input: 'libs/cirrus.js',
  output: [
    {
      file: 'builds/cirrus.min.js',
      format: 'cjs',
      plugins: [terser()]
    },
    {
      file: 'builds/cirrus.min.test.js',
      format: 'cjs',
      banner: combinedBanner
    }
  ],
};
