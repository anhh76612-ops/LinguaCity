const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { buildSync } = require('../../city-web/node_modules/esbuild');

const bundle = buildSync({
  stdin: {
    contents: "export { makeTerrain, waterAt } from './terrain'; export { makeTownTerrain } from './town-terrain'; export { makeTerrainEditor } from './terrain-edit'; export { strokeRibbon } from './stroke-ribbon'; export { sliceRoadStroke, planSlicedRoad } from './road-drawing';",
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
const { makeTerrain, makeTownTerrain, waterAt, makeTerrainEditor, strokeRibbon, sliceRoadStroke, planSlicedRoad } = moduleExports.exports;

function terrainForEditing() {
  return makeTerrain({ showHillDetails: false, gradeGround: (x, z) => .12 * x + .08 * z + .10 * Math.sin(x * 2) });
}

test('road grading levels across the full 3× corridor, keeps protected vertices and is reversible', () => {
  const terrain = makeTerrain({ showHillDetails: false, gradeGround: (x, z) => .18 + .09 * x + .27 * z });
  const editor = makeTerrainEditor(terrain);
  const route = sliceRoadStroke([[3.5, 4.5], [13.5, 4.5]], 3);
  const road = { roads: new Map(), width: 3, route, material: 'dirt', surfaceY: terrain.surfaceY, waterAt: () => null };
  assert.match(planSlicedRoad(road).error, /nghiêng ngang/);
  const protectedAt = (_x, z) => z < 2;
  const before = terrain.surfaceY(9.5, 3.5);
  const grading = editor.planRoadCorridor(route, { mode: 'slope', width: 3, isLocked: protectedAt });
  assert.equal(grading.error, '');
  assert.ok(grading.transition.length > 0 && grading.maxChange > 0);
  assert.ok(grading.changes.every(edit => terrain.ground.geometry.attributes.position.getZ(edit.index) >= 2));
  const overrides = new Map(grading.changes.map(({ index, newY }) => [index, newY]));
  assert.equal(planSlicedRoad({ ...road, surfaceY: (x, z) => terrain.surfaceY(x, z, overrides) }).error, '');
  assert.equal(terrain.surfaceY(9.5, 3.5), before);
  editor.apply(grading.changes);
  assert.notEqual(terrain.surfaceY(9.5, 3.5), before);
  editor.apply(grading.changes, false);
  assert.equal(terrain.surfaceY(9.5, 3.5), before);
  const flat = editor.planRoadCorridor(route, { mode: 'flatten', width: 3 });
  assert.equal(flat.error, '');
  assert.equal(flat.targetAt(5, 4), flat.targetAt(12, 5));
});

test('a real 2× riverside road with a 30 percent cross slope becomes buildable after grading dry land', () => {
  const terrain = makeTownTerrain(), editor = makeTerrainEditor(terrain), { surfaceY } = terrain;
  const route = sliceRoadStroke([[-7.5, 3.5], [-3.5, 5.5]], 2);
  const road = { roads: new Map(), width: 2, route, material: 'dirt', surfaceY, waterAt };
  assert.match(planSlicedRoad(road).error, /nghiêng ngang 30%/);
  const grading = editor.planRoadCorridor(route, { mode: 'slope', width: 2 });
  assert.equal(grading.error, '');
  assert.ok(grading.changes.length);
  const positions = terrain.ground.geometry.attributes.position;
  assert.ok(grading.changes.every(({ index }) => !waterAt(positions.getX(index), positions.getZ(index))));
  const overrides = new Map(grading.changes.map(({ index, newY }) => [index, newY]));
  assert.equal(planSlicedRoad({ ...road, surfaceY: (x, z) => surfaceY(x, z, overrides) }).error, '');
});

test('continuous slope makes a 2× corridor with a shared target height across its width', () => {
  const terrain = terrainForEditing(), editor = makeTerrainEditor(terrain);
  const from = { x: 4, z: 2 }, to = { x: 8, z: 6 };
  const ribbon = strokeRibbon([[4.5, 2.5], [8.5, 6.5]], 2, 1);
  const trial = editor.planBrush({ mode: 'slope', from, to, ribbon });
  assert.equal(trial.error, '');
  assert.ok(trial.changes.length && trial.grade < .35);
  assert.ok(Math.abs(trial.targetAt(6.1, 4.9) - trial.targetAt(6.9, 4.1)) < 1e-6);
  assert.ok(Math.abs(trial.targetAt(4.5, 2.5) - terrain.surfaceY(4.5, 2.5)) < 1e-6);
  assert.ok(Math.abs(trial.targetAt(8.5, 6.5) - terrain.surfaceY(8.5, 6.5)) < 1e-6);
});

test('water query distinguishes banks, sea and falls and follows the river profile', () => {
  const firstRiverAt = z => {
    for (let x = -16; x < -10; x += .125) {
      const water = waterAt(x, z);
      if (water?.kind === 'river') return water;
    }
  };
  assert.equal(waterAt(4, 0), null);
  assert.equal(waterAt(10, 30).kind, 'sea');
  assert.equal(waterAt(0, -36.1).kind, 'falls');
  assert.ok(firstRiverAt(-10).y > firstRiverAt(-7).y);
});

test('flatten updates the live surface, uploads local ranges and supports exact undo/redo', () => {
  const terrain = terrainForEditing();
  const editor = makeTerrainEditor(terrain);
  const target = terrain.surfaceY(3.5, 2.5);
  const before = terrain.surfaceY(5.5, 3.5);
  const outside = terrain.surfaceY(11, 4);
  const delta = editor.planBrush({ mode: 'flatten', from: { x: 3, z: 2 }, to: { x: 6, z: 4 } });
  assert.equal(delta.error, '');
  assert.ok(delta.changes.length);
  assert.equal(terrain.surfaceY(5.5, 3.5), before);
  editor.apply(delta.changes);
  assert.ok(Math.abs(terrain.surfaceY(5.5, 3.5) - target) < 1e-5);
  assert.equal(terrain.surfaceY(11, 4), outside);
  const position = terrain.ground.geometry.getAttribute('position');
  const normal = terrain.ground.geometry.getAttribute('normal');
  assert.ok(position.version > 0 && position.updateRanges.length);
  assert.ok(normal.version > 0 && normal.updateRanges.length);
  const persisted = editor.heightDeltas();
  editor.apply(delta.changes, false);
  assert.equal(terrain.surfaceY(5.5, 3.5), before);
  assert.deepEqual(editor.heightDeltas(), []);
  editor.apply(delta.changes);
  assert.deepEqual(editor.heightDeltas(), persisted);

  const restoredTerrain = terrainForEditing();
  const restored = makeTerrainEditor(restoredTerrain);
  assert.equal(restored.restoreDeltas([...persisted, persisted[0]]), false);
  assert.equal(restoredTerrain.surfaceY(5.5, 3.5), before);
  assert.equal(restored.restoreDeltas(persisted), true);
  assert.equal(restoredTerrain.surfaceY(5.5, 3.5), terrain.surfaceY(5.5, 3.5));
});

test('each flatten size levels every selected tile while limiting changes to one ring', () => {
  for (const size of [1, 3, 4]) {
    const terrain = terrainForEditing(), editor = makeTerrainEditor(terrain);
    const from = { x: 3, z: 2 }, to = from;
    const expected = terrain.surfaceY(3.5, 2.5);
    const plan = editor.planBrush({ mode: 'flatten', size, from, to });
    assert.equal(plan.error, '');
    assert.equal(plan.core.length, size * size);
    const left = Math.min(...plan.core.map(cell => cell.x)), top = Math.min(...plan.core.map(cell => cell.z));
    const pos = terrain.ground.geometry.getAttribute('position');
    assert.ok(plan.changes.every(({ index }) => pos.getX(index) >= left - 1 && pos.getX(index) < left + size + 1 &&
      pos.getZ(index) >= top - 1 && pos.getZ(index) < top + size + 1));
    const outside = terrain.surfaceY(left + size + 1.8, top + .5);
    editor.apply(plan.changes);
    for (const { x, z } of plan.core) for (const u of [.01, .15, .5, .85, .99]) for (const v of [.01, .5, .99]) {
      assert.ok(Math.abs(terrain.surfaceY(x + u, z + v) - expected) < 1e-5, `Unlevel sample in ${size}×${size} at ${x + u}, ${z + v}`);
    }
    assert.equal(terrain.surfaceY(left + size + 1.8, top + .5), outside);
  }
});

test('drag levels the full rectangle and preserves a protected tile', () => {
  const terrain = terrainForEditing(), editor = makeTerrainEditor(terrain);
  const from = { x: 3, z: 2 }, to = { x: 9, z: 7 };
  const target = terrain.surfaceY(3.5, 2.5);
  const protectedY = terrain.surfaceY(6.5, 4.5);
  const plan = editor.planBrush({ mode: 'flatten', size: 1, from, to, lockCell: cell => cell.x === 6 && cell.z === 4 });
  assert.equal(plan.error, '');
  assert.ok(plan.skipped.some(cell => cell.x === 6 && cell.z === 4));
  assert.ok(plan.core.length > 25 && plan.core.length < 42);
  editor.apply(plan.changes);
  assert.equal(terrain.surfaceY(6.5, 4.5), protectedY);
  for (const { x, z } of plan.core) for (const u of [.01, .5, .99]) for (const v of [.01, .5, .99]) {
    assert.ok(Math.abs(terrain.surfaceY(x + u, z + v) - target) < 1e-5);
  }
});

test('a long flatten drag is capped around the original selection', () => {
  const editor = makeTerrainEditor(terrainForEditing());
  const plan = editor.planBrush({ mode: 'flatten', from: { x: 16, z: 2 }, to: { x: 0, z: -18 }, size: 3 });
  assert.equal(plan.error, '');
  assert.equal(plan.capped, true);
  assert.equal(plan.core.length, 144);
  assert.ok(plan.core.every(cell => cell.x >= 5 && cell.x <= 16 && cell.z >= -9 && cell.z <= 2));
});

test('curved slope uses the entire gesture and rejects repeated cells', () => {
  const terrain = terrainForEditing(), editor = makeTerrainEditor(terrain);
  const cells = [{ x: 3, z: 2 }, { x: 4, z: 2 }, { x: 5, z: 2 }, { x: 5, z: 3 },
    { x: 5, z: 4 }, { x: 5, z: 5 }, { x: 4, z: 5 }, { x: 3, z: 5 }];
  const from = cells[0], to = cells.at(-1);
  const plan = editor.planBrush({ mode: 'slope', from, to, cells });
  assert.equal(plan.error, '');
  assert.equal(plan.length, 7);
  assert.deepEqual(plan.core, cells);
  assert.ok(plan.grade < .05);
  assert.match(editor.planBrush({ mode: 'slope', from, to: from, cells: [...cells, { x: 3, z: 4 },
    { x: 3, z: 3 }, from] }).error, /giao/);
  const narrow = [{ x: 3, z: 2 }, { x: 4, z: 2 }, { x: 5, z: 2 }, { x: 5, z: 3 }, { x: 4, z: 3 }];
  assert.match(editor.planBrush({ mode: 'slope', from: narrow[0], to: narrow.at(-1), cells: narrow }).error, /ô đệm/);
});

test('cut slopes change local ground colors and undo restores them exactly', () => {
  const terrain = terrainForEditing(), editor = makeTerrainEditor(terrain);
  const geometry = terrain.ground.geometry;
  const positions = geometry.getAttribute('position'), color = geometry.getAttribute('color');
  const index = Array.from({ length: positions.count }, (_, i) => i).find(i =>
    positions.getX(i) > 4 && positions.getX(i) < 5 && positions.getZ(i) > 3 && positions.getZ(i) < 4);
  const oldY = positions.getY(index);
  const original = color.array.slice();
  const changes = [{ index, oldY, newY: oldY + 3 }];
  editor.apply(changes);
  assert.notDeepEqual(color.array, original);
  assert.ok(color.updateRanges.length);
  editor.apply(changes, false);
  assert.deepEqual(color.array, original);
});

test('terrain-only view keeps the same ground and water without props or scenery blockers', () => {
  const town = makeTownTerrain();
  const bare = makeTownTerrain({ showScenery: false });
  const original = makeTerrain({ showScenery: false });
  assert.ok(town.blockers.length > 0);
  assert.equal(bare.blockers.length, 0);
  assert.equal(original.blockers.length, 0);
  assert.equal(original.group.getObjectByName('Hàng rào an toàn'), undefined);
  assert.ok(bare.group.children.every(item => item.isMesh));
  assert.ok(original.group.children.every(item => item.isMesh));
  assert.deepEqual(bare.ground.geometry.getAttribute('position').array, town.ground.geometry.getAttribute('position').array);
  assert.deepEqual(bare.waterAt(-12, 20), town.waterAt(-12, 20));
});

test('earth colors distinguish exposed soil and stone without changing terrain geometry', () => {
  const plain = makeTerrain({ showScenery: false }).ground.geometry;
  const earth = makeTerrain({ showScenery: false, groundPalette: 'earth' }).ground.geometry;
  const { position, normal, color } = earth.attributes;
  assert.deepEqual(position.array, plain.attributes.position.array);
  assert.deepEqual(normal.array, plain.attributes.normal.array);
  assert.ok(color.array.some((value, i) => value !== plain.attributes.color.array[i]));

  const samples = { flat: [], soil: [], stone: [] };
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i), y = position.getY(i), z = position.getZ(i);
    if (x < -34 || x > 25 || z < -32 || z > 10 || y < 1.8 || y > 5) continue;
    const slope = Math.hypot(normal.getX(i), normal.getZ(i)) / normal.getY(i);
    const band = slope < .18 ? 'flat' : slope >= .50 && slope <= .58 ? 'soil' : slope >= 1.05 ? 'stone' : null;
    if (band) samples[band].push(color.getX(i) - color.getY(i));
  }
  const warmth = Object.fromEntries(Object.entries(samples).map(([band, values]) => {
    assert.ok(values.length > 30, band);
    return [band, values.reduce((sum, value) => sum + value, 0) / values.length];
  }));
  console.log('earth warmth', warmth);
  assert.ok(warmth.soil > warmth.flat + .025);
  assert.ok(warmth.soil > warmth.stone + .065);
});

test('scenery can be cleared and restored by ground footprint without clearing an unrelated tree', () => {
  const terrain = makeTerrain({ editableScenery: true });
  const tree = terrain.blockers.find(item => item.x === -7.15 && item.z === 10.75);
  const neighbor = terrain.blockers.find(item => item.x === 10.4 && item.z === 4.6);
  assert.ok(Number.isInteger(tree.sceneryId) && Number.isInteger(neighbor.sceneryId));
  const removed = terrain.scenery.removals([{ x: -8, z: 10 }], []);
  assert.ok(removed.includes(tree.sceneryId) && !removed.includes(neighbor.sceneryId));
  terrain.scenery.apply(removed, true);
  assert.ok(terrain.scenery.hidden.has(tree.sceneryId));
  assert.ok(!terrain.scenery.hidden.has(neighbor.sceneryId));
  terrain.scenery.apply(removed, false);
  assert.ok(!terrain.scenery.hidden.has(tree.sceneryId));
});

test('road grading includes the blend ring in the lock check', () => {
  const terrain = terrainForEditing();
  const editor = makeTerrainEditor(terrain);
  const edits = [{ x: 5.5, z: 3.5, y: .55, axis: 1, width: 2 }];
  const grade = editor.planRoad(edits);
  assert.equal(grade.error, '');
  assert.ok(grade.changes.length);
  const locked = editor.planRoad(edits, (_x, z) => z > 4.6);
  assert.match(locked.error, /Quá sát/);
  assert.deepEqual(locked.changes, []);
  assert.deepEqual(editor.heightDeltas(), []);
});

test('cut-only bridge ramps follow directional endpoints without raising terrain', () => {
  const terrain = terrainForEditing();
  const editor = makeTerrainEditor(terrain);
  const edits = [
    { x: 5.5, z: 3.5, y: .5, startY: .4, endY: .6, axis: 1, width: 2, cutOnly: true },
    { x: 6.5, z: 3.5, y: .8, startY: .6, endY: 1, axis: 1, width: 2, cutOnly: true },
  ];
  const grade = editor.planRoad(edits);
  assert.equal(grade.error, '');
  assert.ok(grade.changes.length);
  assert.ok(grade.changes.every(({ oldY, newY }) => newY <= oldY));
  editor.apply(grade.changes);
  assert.ok(terrain.surfaceY(5.8, 3.5) > terrain.surfaceY(5.3, 3.5));
  assert.ok(terrain.surfaceY(6.3, 3.5) > terrain.surfaceY(5.8, 3.5));
});

test('slope projects onto the direction selected and preserves its endpoint levels', () => {
  const terrain = terrainForEditing();
  const editor = makeTerrainEditor(terrain);
  const from = { x: 3, z: 2 }, to = { x: 8, z: 3 };
  const startY = terrain.surfaceY(3.5, 2.5), endY = terrain.surfaceY(8.5, 3.5);
  const ramp = editor.planBrush({ mode: 'slope', from, to });
  assert.equal(ramp.error, '');
  editor.apply(ramp.changes);
  assert.ok(Math.abs(terrain.surfaceY(6, 3) - (startY + endY) / 2) < 1e-5);
  assert.ok(editor.planBrush({ mode: 'slope', from, to: from }).error);
});
