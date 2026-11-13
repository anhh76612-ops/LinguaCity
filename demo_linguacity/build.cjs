const path = require('node:path');
const esbuild = require('../city-web/node_modules/esbuild');

const options = {
  absWorkingDir: __dirname,
  nodePaths: [path.resolve(__dirname, '../city-web/node_modules')],
  bundle: true,
  format: 'iife',
  minify: true,
  legalComments: 'inline',
};

esbuild.buildSync({
  ...options,
  entryPoints: ['world.js'],
  outfile: path.join(__dirname, 'world.bundle.js'),
  globalName: 'TownScene',
});

esbuild.buildSync({
  ...options,
  entryPoints: ['index.js'],
  outfile: path.join(__dirname, 'index.bundle.js'),
});
