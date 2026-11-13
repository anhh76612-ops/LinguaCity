const path = require('node:path');
const esbuild = require('../../city-web/node_modules/esbuild');

esbuild.buildSync({
  absWorkingDir: __dirname,
  entryPoints: { 'preview.bundle': 'preview.js', 'terrain.bundle': 'terrain-preview.js' },
  outdir: __dirname,
  nodePaths: [path.resolve(__dirname, '../../city-web/node_modules')],
  bundle: true,
  format: 'iife',
  minify: true,
  legalComments: 'inline',
});
