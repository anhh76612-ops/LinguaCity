const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { buildSync } = require('../../city-web/node_modules/esbuild');

const bundle = buildSync({
  stdin: { contents: "export { findRoadDetour } from './road-detour'; export { planSlicedRoad } from './road-drawing';",
    resolveDir: __dirname },
  nodePaths: [path.resolve(__dirname, '../../city-web/node_modules')],
  bundle: true, write: false, platform: 'node', format: 'cjs',
}).outputFiles[0].text;
const loaded = { exports: {} };
new Function('module', 'exports', bundle)(loaded, loaded.exports);
const { findRoadDetour, planSlicedRoad } = loaded.exports;
const bounds = { left: -2, right: 62, top: -6, bottom: 8 };
const origin = [.5, .5], end = [12.5, .5];

test('A–B detours on land, verifies the whole width and keeps both chosen endpoints', () => {
  const obstacle = cell => cell.x >= 4 && cell.x <= 7 && cell.z === 0;
  const waterAt = (_x, z) => z > 2 && z < 3 ? { kind: 'river', y: 0 } : null;
  const surfaceY = () => .5;
  const distance = width => {
    const result = findRoadDetour({ origin, end, width, bounds, obstacle, waterAt, surfaceY,
      tryRoute: route => planSlicedRoad({ roads: new Map(), route, width, surfaceY, waterAt,
        obstacle: cell => obstacle(cell) ? 'Móng' : '', material: 'dirt' }) });
    assert.equal(result?.trial.error, '');
    assert.deepEqual(result.route.points[0], origin);
    assert.deepEqual(result.route.points.at(-1), end);
    assert.ok(!result.route.cells.some(obstacle));
    return result.route.length;
  };
  assert.ok(distance(3) > distance(1));
});

test('A–B refuses a dry detour that exceeds 60 even though the straight distance is within range', () => {
  let used = false;
  const result = findRoadDetour({ origin, end: [59.5, .5], width: 1, bounds, surfaceY: () => 1,
    obstacle: cell => cell.x === 28 && cell.z >= -1 && cell.z <= 1,
    waterAt: () => null, tryRoute: () => { used = true; return { error: '' }; } });
  assert.equal(result, null);
  assert.equal(used, false);
});

test('A–B tries another corridor when full-width grading fails on the first candidate', () => {
  const seen = [];
  const result = findRoadDetour({ origin, end, width: 2, bounds, surfaceY: () => 1,
    obstacle: () => false, waterAt: () => null, autoGrade: true,
    tryRoute(route) {
      seen.push(route.points);
      return seen.length === 1 ? { error: 'Dốc ngang', errorCell: { x: 6, z: 0 } } : { error: '' };
    } });
  assert.ok(result);
  assert.equal(seen.length, 2);
  assert.notDeepEqual(seen[0], seen[1]);
});
test('A–B prefers a wider corridor with clearance over a tight obstacle-hugging corridor when lengths are comparable', () => {
  const obstacle = cell => cell.x === 6 && cell.z === 0;
  const result = findRoadDetour({
    origin: [.5, .5], end: [12.5, .5], width: 2, bounds, obstacle,
    waterAt: () => null, surfaceY: () => .5,
    tryRoute: route => planSlicedRoad({
      roads: new Map(), route, width: 2, surfaceY: () => .5, waterAt: () => null,
      obstacle: cell => obstacle(cell) ? 'Móng' : '', material: 'dirt',
    }),
  });
  assert.ok(result);
  assert.equal(result.clearance, 1);
  assert.ok(!result.route.cells.some(c => c.x === 6 && Math.abs(c.z) <= 1));
});
