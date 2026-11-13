const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { buildSync } = require('../../city-web/node_modules/esbuild');

const bundle = buildSync({
  stdin: { contents: "export { flattenPlanPreview } from './flatten-preview'; export { GreaterDepth } from 'three';", resolveDir: __dirname },
  nodePaths: [path.resolve(__dirname, '../../city-web/node_modules')],
  bundle: true, write: false, platform: 'node', format: 'cjs',
}).outputFiles[0].text;
const loaded = { exports: {} };
new Function('module', 'exports', bundle)(loaded, loaded.exports);
const { flattenPlanPreview, GreaterDepth } = loaded.exports;

test('target plane outlines the actual flat footprint and leaves skipped holes open', () => {
  const core = [];
  for (let x = 0; x < 3; x++) for (let z = 0; z < 3; z++) {
    if (x !== 1 || z !== 1) core.push({ x, z });
  }
  const { children: [fill, solid, hidden] } = flattenPlanPreview({ core, transition: [], targetY: 2.5 }, () => 5);
  const positions = fill.geometry.getAttribute('position');
  for (let i = 0; i < positions.count; i++) {
    assert.equal(positions.getY(i), 2.5);
    assert.ok(!(positions.getX(i) > 1 && positions.getX(i) < 2 && positions.getZ(i) > 1 && positions.getZ(i) < 2));
  }
  assert.equal(solid.geometry.getAttribute('position').count, 32);
  assert.equal(hidden.material.depthFunc, GreaterDepth);
});

test('soft transition adds hatching to its terrain-following boundary', () => {
  const trial = { core: [], transition: [{ x: 0, z: 0 }], targetY: 2.5 };
  const boundary = soft => flattenPlanPreview(trial, (x, z) => x + z, soft).children[0];
  const plain = boundary(false).geometry.getAttribute('position');
  const hatched = boundary(true).geometry.getAttribute('position');
  assert.equal(plain.count, 32);
  assert.ok(hatched.count > plain.count);
  for (let i = plain.count; i < hatched.count; i++) {
    assert.ok(Math.abs(hatched.getY(i) - hatched.getX(i) - hatched.getZ(i) - .10) < 1e-6);
  }
});

test('a sloping preview uses the same outline layers at the planned ground elevation', () => {
  const targetAt = x => 2 + .18 * x;
  const { children: [fill, solid] } = flattenPlanPreview({
    core: [{ x: 0, z: 0 }, { x: 1, z: 0 }], transition: [], targetAt,
  }, () => 5);
  for (const item of [fill, solid]) {
    const positions = item.geometry.getAttribute('position');
    for (let i = 0; i < positions.count; i++) {
      assert.ok(Math.abs(positions.getY(i) - targetAt(positions.getX(i))) < 1e-6);
    }
  }
});
