const path = require('node:path');
const { buildSync } = require('../../city-web/node_modules/esbuild');

const bundle = buildSync({
  stdin: {
    contents: "export { makeTerrain } from './terrain';",
    resolveDir: __dirname,
  },
  nodePaths: [path.resolve(__dirname, '../../city-web/node_modules')],
  bundle: true,
  write: false,
  platform: 'node',
  format: 'cjs',
}).outputFiles[0].text;
const moduleExports = { exports: {} };
new Function('module', 'exports', bundle)(moduleExports, moduleExports.exports);
const { makeTerrain } = moduleExports.exports;

const earth = makeTerrain({ showScenery: false, groundPalette: 'earth' }).ground.geometry;
const { position, normal, color } = earth.attributes;

const samples = { flat: [], soil: [], stone: [] };
for (let i = 0; i < position.count; i++) {
  const x = position.getX(i), y = position.getY(i), z = position.getZ(i);
  if (x < -34 || x > 25 || z < -32 || z > 10 || y < 1.8 || y > 5) continue;
  const slope = Math.hypot(normal.getX(i), normal.getZ(i)) / normal.getY(i);
  const band = slope < .18 ? 'flat' : slope >= .50 && slope <= .58 ? 'soil' : slope >= 1.05 ? 'stone' : null;
  if (band) samples[band].push(color.getX(i) - color.getY(i));
}
for (const [band, values] of Object.entries(samples)) {
  const avg = values.reduce((s, v) => s + v, 0) / values.length;
  console.log(`${band}: count=${values.length}, avg warmth=${avg.toFixed(4)}`);
}
const warmth = Object.fromEntries(Object.entries(samples).map(([band, values]) =>
  [band, values.reduce((sum, value) => sum + value, 0) / values.length]
));
console.log(`\nsoil - flat = ${(warmth.soil - warmth.flat).toFixed(4)} (need > 0.025)`);
console.log(`soil - stone = ${(warmth.soil - warmth.stone).toFixed(4)} (need > 0.065)`);
