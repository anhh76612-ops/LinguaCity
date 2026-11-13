const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { buildSync } = require('../../city-web/node_modules/esbuild');

const bundled = buildSync({
  stdin: {
    contents: "export * from './road-drawing'; export * from './roads'; export * from './town-terrain'; export * from './road-visual';",
    resolveDir: __dirname,
  },
  nodePaths: [path.resolve(__dirname, '../../city-web/node_modules')], bundle: true,
  write: false, platform: 'node', format: 'cjs',
}).outputFiles[0].text;
const loaded = { exports: {} };
new Function('module', 'exports', bundled)(loaded, loaded.exports);
const { extendStroke, planRoadStroke, roadRules, roadRange, sliceRoadStroke, planSlicedRoad, roadPrefix, X, buildLaneGraph, makeTownTerrain,
  roundedRoadVisual, applyRoadVisual, roadVisuals, visualFitsFootprint } = loaded.exports;
const line = (a, b) => extendStroke([a], b);
const river = (x, z) => x >= 0 && x < 3 ? { kind: 'river', y: .1 + z * .12 + x * .07 } : null;
const basic = {
  roads: new Map(), cells: line({ x: -5, z: 1 }, { x: 8, z: 1 }),
  width: 2, material: 'dirt', surfaceY: x => x < 0 || x >= 3 ? .5 : -1,
  waterAt: river,
};

test('a stroke meeting a building keeps only the continuous prefix with no changed cells past the obstacle', () => {
  const route = sliceRoadStroke([[1.5, 0.5], [8.5, .5], [8.5, 5.5]], 2);
  const prefix = roadPrefix(route, 2, cell => cell.x === 5 && cell.z === 0);
  assert.ok(prefix.route.cells.every(cell => cell.x < 5));
  assert.equal(prefix.route.points[0][0], 1.5);
  assert.equal(prefix.blocked.x, 5);
  assert.ok(prefix.discarded.some(cell => cell.x === 8 && cell.z === 5));
});

test('road range uses Euclidean distance and clips the preview and endpoint to the editable boundary', () => {
  const origin = [0, 0], bounds = { left: -20, right: 79, top: -20, bottom: 19 };
  const range = roadRange(origin, bounds);
  assert.ok(range.contains([60, 0]));
  assert.ok(!range.contains([61, 0]));
  assert.ok(!range.contains([0, 21]));
  assert.ok(range.outline.some(([x]) => x === 60));
  assert.ok(range.outline.some(([, z]) => z === 20));
  assert.ok(range.outline.every(([x, z]) => x >= -20 && x <= 80 && z >= -20 && z <= 20));
  for (const [end, valid] of [[[59, 0], true], [[60, 0], true], [[61, 0], false], [[42, 42], true], [[43, 43], false]]) {
    const route = sliceRoadStroke([origin, end], 2);
    assert.equal(!route.error, valid);
    assert.equal(route.length, Math.hypot(...end));
  }
});

test('diagonal and S strokes retain exactly W tiles per ordinary slice and the same tiles in reverse', () => {
  const routes = [[[.5, .5], [12.5, 12.5]], [[.5, .5], [5.5, 2.5], [10.5, .5], [15.5, -2.5], [20.5, .5]]];
  for (const points of routes) for (const width of [1, 2, 3, 4]) {
    const route = sliceRoadStroke(points, width);
    assert.equal(route.error, '');
    assert.ok(route.slices.every(slice => slice.length === width));
    const keys = cells => cells.map(({ x, z }) => `${x},${z}`).sort();
    assert.deepEqual(keys(route.cells), keys(sliceRoadStroke([...points].reverse(), width).cells));
    const remaining = new Set(keys(route.cells));
    const queue = [route.cells[0]];
    while (queue.length) {
      const { x, z } = queue.pop();
      if (!remaining.delete(`${x},${z}`)) continue;
      queue.push({ x: x - 1, z }, { x: x + 1, z }, { x, z: z - 1 }, { x, z: z + 1 });
    }
    assert.equal(remaining.size, 0);
  }
});

test('right-angle corner reserves one W by W block and validates all its tiles before applying', () => {
  for (const width of [3, 4]) {
    const points = [[.5, 5.5], [7.5, 5.5], [7.5, 12.5]];
    const route = sliceRoadStroke(points, width);
    assert.equal(route.corners[0].length, width ** 2);
    const dry = { roads: new Map(), route, width, material: 'dirt', surfaceY: () => .5, waterAt: () => null };
    const result = planSlicedRoad(dry);
    assert.equal(result.error, '');
    assert.equal(result.roads.size, route.cells.length);
    const corner = route.corners[0][0];
    const blocked = planSlicedRoad({ ...dry, obstacle: cell => cell.x === corner.x && cell.z === corner.z ? 'Móng' : '' });
    assert.equal(blocked.error, 'Móng');
    assert.equal(blocked.roads.size, 0);
  }
});

test('rounded presentation stays inside the locked 2× footprint and preserves the traffic grid', () => {
  const route = sliceRoadStroke([[.5, .5], [7.5, .5], [7.5, 6.5]], 2);
  const base = planSlicedRoad({ roads: new Map(), route, width: 2, material: 'dirt', surfaceY: () => .5, waterAt: () => null });
  const visual = roundedRoadVisual(route, { material: 'dirt' });
  assert.ok(visual, 'a legal elbow has a rounded visual proposal');
  assert.ok(visual.radius > 0, 'the proposal rounds instead of only redrawing the block grid');
  assert.equal(visualFitsFootprint(visual, route.cells), true);
  const styled = applyRoadVisual(base.roads, visual);
  assert.deepEqual([...styled.keys()].sort(), [...base.roads.keys()].sort());
  assert.equal(roadVisuals(styled).length, 1);
  assert.equal(buildLaneGraph(styled, 'car').size, buildLaneGraph(base.roads, 'car').size);
});

test('a diagonal 2× route can use smooth presentation without widening its locked tiles', () => {
  const route = sliceRoadStroke([[.5, .5], [7.5, 7.5]], 2);
  const base = planSlicedRoad({ roads: new Map(), route, width: 2, material: 'dirt', surfaceY: () => .5, waterAt: () => null });
  const visual = roundedRoadVisual(route, { material: 'dirt' });
  assert.ok(visual, 'the visual centerline can smooth a diagonal staircase');
  assert.equal(visual.presentation, 'rounded-grid');
  assert.ok(visual.radius > 0);
  assert.ok(visualFitsFootprint(visual, route.cells));
  const styled = applyRoadVisual(base.roads, visual);
  assert.deepEqual([...styled.keys()].sort(), [...base.roads.keys()].sort());
});

test('the exact 2× diagonal footprint is written to the road map and river crossings use the existing bridge solver', () => {
  const route = sliceRoadStroke([[.5, .5], [12.5, 12.5]], 2);
  const options = { ...basic, route, waterAt: () => null, surfaceY: () => .5 };
  const result = planSlicedRoad(options);
  assert.equal(result.error, '');
  assert.deepEqual([...result.roads.keys()].sort(), route.cells.map(cell => `${cell.x},${cell.z}`).sort());
  assert.equal(options.roads.size, 0);
  const riverRoute = sliceRoadStroke([[-4.5, 2], [8.5, 2]], 2);
  const crossing = planSlicedRoad({ ...basic, route: riverRoute });
  assert.ok(crossing.legacyBridge);
  assert.equal(crossing.roads.size, 0);
  assert.equal(planRoadStroke(basic).bridges.length, 1);
});

test('fast swipes interpolate four-connected tiles and permit backtracking', () => {
  const start = { x: 0, z: 0 }, end = { x: 6, z: -4 };
  const cells = line(start, end);
  assert.equal(cells.length, 11);
  assert.deepEqual(cells.at(-1), end);
  for (let i = 1; i < cells.length; i++) {
    assert.equal(Math.abs(cells[i].x - cells[i - 1].x) + Math.abs(cells[i].z - cells[i - 1].z), 1);
  }
  assert.deepEqual(extendStroke(cells, cells.at(-3)), cells.slice(0, -2));
});

test('a bridge clears high water across its full width and keeps ramp boundaries continuous', () => {
  const result = planRoadStroke(basic);
  assert.equal(result.error, '');
  assert.equal(result.bridges.length, 1);
  const [bridge] = result.bridges;
  const highestSample = river(2.98, 2.98).y;
  assert.ok(bridge.y - roadRules.deckThickness >= highestSample + roadRules.clearance - 1e-6);
  assert.equal(bridge.cells.length, 6);
  assert.deepEqual(bridge.start, { x: 0, z: 2 });
  assert.deepEqual(bridge.end, { x: 3, z: 2 });
  for (let x = -5; x < 8; x++) {
    const a = result.roads.get(`${x},1`), b = result.roads.get(`${x + 1},1`);
    assert.equal(a.roadEndY ?? .5, b.roadStartY ?? .5);
    assert.ok(Math.abs((a.roadEndY ?? .5) - (a.roadStartY ?? .5)) <= .27 + 1e-6);
  }
  const graph = buildLaneGraph(result.roads, 'car');
  assert.ok([...graph.values()].some(node => node.section.t === 1 && node.links.length));
  assert.equal(basic.roads.size, 0);
});

test('bridge profile is unchanged when drawn from the other bank', () => {
  const result = planRoadStroke({ ...basic, cells: [...basic.cells].reverse() });
  assert.equal(result.error, '');
  assert.deepEqual(result.bridges, planRoadStroke(basic).bridges.map(bridge => ({ ...bridge, cells: result.bridges[0].cells })));
});

test('a bridge reports water turns, insufficient approaches, and forbidden water explicitly', () => {
  const throughWater = line({ x: -5, z: 1 }, { x: 1, z: 1 });
  const bend = extendStroke(extendStroke(throughWater, { x: 1, z: 3 }), { x: 8, z: 3 });
  assert.match(planRoadStroke({ ...basic, cells: bend }).error, /đi thẳng/);
  assert.match(planRoadStroke({ ...basic, cells: basic.cells.slice(0, 9) }).error, /Kéo xa hơn/);
  assert.match(planRoadStroke({
    ...basic,
    waterAt: (x, z) => x >= 0 && x < 3 ? { kind: 'sea', y: river(x, z).y } : null,
  }).error, /biển/);
  assert.match(planRoadStroke({
    ...basic, waterAt: x => x >= -2 && x < 6 ? { kind: 'river', y: 0 } : null,
  }).error, /tối đa 6/);
});

test('a street reports its true slope and requests only bounded land grading', () => {
  const options = {
    ...basic, width: 2, waterAt: () => null,
    cells: line({ x: 0, z: 0 }, { x: 3, z: 0 }),
    surfaceY: (_x, z) => z * .2,
  };
  const rejected = planRoadStroke(options);
  assert.match(rejected.error, /nghiêng ngang 20%/);
  assert.deepEqual(rejected.errorCell, { x: 0, z: 0 });
  const leveled = planRoadStroke({ ...options, allowLeveling: true });
  assert.equal(leveled.error, '');
  assert.deepEqual(leveled.gradeEdits[0], { x: .5, z: 1, y: .2, width: 2, axis: X });
  assert.match(planRoadStroke({ ...options, surfaceY: (_x, z) => z * .6, allowLeveling: true }).error, /nghiêng ngang/);
});

test('a short local detour avoids an obstacle without accepting the blocked edit', () => {
  const result = planRoadStroke({
    ...basic, width: 1, surfaceY: () => .5, waterAt: () => null,
    cells: line({ x: 0, z: 0 }, { x: 6, z: 0 }), suggestDetour: true,
    obstacle: ({ x, z }) => x === 3 && z === 0 ? 'Có đá lớn.' : '',
  });
  assert.equal(result.error, 'Có đá lớn.');
  assert.equal(result.roads.size, 0);
  assert.ok(result.detour?.some(cell => cell.z !== 0));
});

test('bridge assist corrects a two-cell river swipe and extends the dry approach', () => {
  const bent = extendStroke(extendStroke(line({ x: -5, z: 1 }, { x: 1, z: 1 }), { x: 1, z: 3 }),
    { x: 3, z: 3 });
  const result = planRoadStroke({ ...basic, cells: bent, assisted: true });
  assert.equal(result.error, '');
  assert.equal(result.bridges.length, 1);
  assert.ok(result.route.at(-1).x > 3);
  assert.equal(result.bridges[0].start.z, result.bridges[0].end.z);
  const blocked = planRoadStroke({
    ...basic, cells: bent, assisted: true, obstacle: tile => tile.x > 3 ? 'Bờ bị chặn.' : '',
  });
  assert.notEqual(blocked.error, '');
  assert.equal(blocked.roads.size, 0);
});

test('a narrow new route joins the center of an existing bridge with a legal taper', () => {
  const crossing = planRoadStroke(basic);
  const existing = new Map([...crossing.roads].filter(([, tile]) => tile.bridgeId || tile.approachBridgeId));
  const outer = Math.max(...[...existing.values()].map(tile => tile.x));
  const original = existing.get(`${outer},1`);
  const result = planRoadStroke({
    ...basic, roads: existing, width: 1, assisted: true,
    cells: line({ x: outer + 5, z: 2 }, { x: outer, z: 2 }),
  });
  assert.equal(result.error, '');
  assert.deepEqual(result.roads.get(`${outer},1`), original);
  const taper = result.roads.get(`${outer + 1},1`);
  assert.deepEqual(taper.taper, { startCenter: 2, endCenter: 1.5, startWidth: 2, endWidth: 1 });
  assert.equal(taper.roadStartY, original.roadEndY);
});

test('bridge assist moves the deck over a low bank when stretching the ramp is insufficient', () => {
  const options = { ...basic, surfaceY: x => x < 0 || x >= 4 ? .5 : -1 };
  assert.match(planRoadStroke(options).error, /bị chôn hoặc cao quá/);
  const result = planRoadStroke({ ...options, assisted: true });
  assert.equal(result.error, '');
  assert.equal(result.bridges[0].end.x, 4);
  assert.ok(result.roads.get('3,1').bridgeId);
});

test('a dry valley accepts a supported crossing and rejects overly tall supports', () => {
  const valley = (x, depth = 2) => .5 - Math.max(0, Math.min(1, x - 1, 5 - x)) * depth;
  const options = { ...basic, width: 2, waterAt: () => null,
    cells: line({ x: -3, z: 1 }, { x: 8, z: 1 }), surfaceY: x => valley(x) };
  assert.match(planRoadStroke(options).error, /dốc dọc/);
  const supported = planRoadStroke({ ...options, elevated: true });
  assert.equal(supported.error, '');
  assert.equal(supported.bridges[0].kind, 'viaduct');
  assert.equal(supported.roads.get('3,1').bridgeKind, 'viaduct');
  assert.match(planRoadStroke({ ...options, elevated: true, surfaceY: x => valley(x, 5) }).error, /trụ đỡ/);
});

test('a 2× crossing on the town river avoids grading the uneven bank beside the approach', () => {
  const terrain = makeTownTerrain();
  const result = planRoadStroke({
    roads: new Map(), cells: line({ x: -14, z: 2 }, { x: -9, z: 2 }),
    width: 2, material: 'dirt', surfaceY: terrain.surfaceY, waterAt: terrain.waterAt,
    allowLeveling: true,
  });
  assert.equal(result.error, '');
  assert.equal(result.bridges.length, 1);
  assert.deepEqual(result.gradeEdits, []);
  assert.ok(result.bridges[0].y - roadRules.deckThickness - result.bridges[0].maxWaterY > roadRules.clearance);
});

test('a 2× road connects across a full corner without picking up water outside its footprint', () => {
  const cells = extendStroke(line({ x: 0, z: 0 }, { x: 3, z: 0 }), { x: 3, z: -3 });
  const result = planRoadStroke({
    roads: new Map(), cells, width: 2, material: 'dirt', surfaceY: () => .5,
    waterAt: (x, z) => x >= 5 && z >= 0 ? { kind: 'river', y: 0 } : null,
  });
  assert.equal(result.error, '');
  assert.equal(result.bridges.length, 0);
  assert.ok(result.roads.has('4,1'));
  assert.equal(result.roads.has('5,1'), false);
  const graph = buildLaneGraph(result.roads, 'car');
  assert.ok([...graph.values()].some(node => node.links.some(link => link.crossing)));
});

test('tight 2× and 3× corners use asymmetric inner/outer rounding with valid triangles and cumulative UVs', () => {
  for (const width of [2, 3]) {
    const route = sliceRoadStroke([[.5, .5], [6.5, .5], [6.5, 6.5]], width);
    const visual = roundedRoadVisual(route, { material: 'asphalt' });
    assert.ok(visual, `rounded visual should exist for ${width}×`);
    assert.equal(visual.presentation, 'rounded-strip');
    assert.ok(visual.radius > 0);
    assert.ok(['arc', 'bevel', 'square'].includes(visual.innerStyle));
    assert.equal(visualFitsFootprint(visual, route.cells), true);
    for (const edge of [visual.leftEdge, visual.rightEdge]) {
      assert.ok(edge.length >= 2);
      for (let i = 1; i < edge.length; i++) {
        assert.ok(edge[i][2] >= edge[i - 1][2], 'UV u must be monotonically non-decreasing');
      }
      assert.ok(edge.every(pt => pt[3] === edge[0][3]), 'UV v must stay constant per side');
    }
    assert.ok(visual.triangles.length >= 2);
    for (const [t0, i0, t1, i1, t2, i2] of visual.triangles) {
      const p0 = t0 === 'L' ? visual.leftEdge[i0] : visual.rightEdge[i0];
      const p1 = t1 === 'L' ? visual.leftEdge[i1] : visual.rightEdge[i1];
      const p2 = t2 === 'L' ? visual.leftEdge[i2] : visual.rightEdge[i2];
      const cross = (p1[0] - p0[0]) * (p2[1] - p0[1]) - (p1[1] - p0[1]) * (p2[0] - p0[0]);
      assert.ok(-cross > 1e-6, 'triangle must have positive upward winding');
    }
  }
});

test('rounded presentation leaves bridge and approach cells untouched while rounding dry segments', () => {
  const route = sliceRoadStroke([[.5, .5], [10.5, .5], [10.5, 6.5]], 2);
  const base = planSlicedRoad({ roads: new Map(), route, width: 2, material: 'dirt', surfaceY: () => .5, waterAt: () => null });
  const withBridge = new Map(base.roads);
  for (const key of ['3,0', '3,1', '4,0', '4,1']) {
    withBridge.set(key, { ...withBridge.get(key), bridgeId: 'b1' });
  }
  const visual = roundedRoadVisual(route, { material: 'dirt', roads: withBridge });
  assert.ok(visual, 'dry segment after bridge should still get rounded visual');
  assert.ok(!visual.cells.some(k => ['3,0', '3,1', '4,0', '4,1'].includes(k)));
  const styled = applyRoadVisual(withBridge, visual);
  assert.equal(styled.get('3,0').roadVisualId, undefined);
  assert.equal(styled.get('10,6').roadVisualId, visual.id);
});

test('diagonal elbow routes sweep a smooth parallel ribbon when sides are clear and report overhangBlockedCell when a side building blocks', () => {
  const route = sliceRoadStroke([[10, 5], [5, 2], [2, 8]], 2);
  const clearVisual = roundedRoadVisual(route, { material: 'dirt', obstacle: () => '' });
  assert.ok(clearVisual, 'diagonal elbow route must have a rounded visual');
  assert.equal(clearVisual.presentation, 'rounded-grid');
  assert.equal(clearVisual.continuous, true);
  assert.equal(clearVisual.overhangBlockedCell ?? null, null);
  assert.ok(clearVisual.points.length > 10, 'swept centerline has smooth filleted curve samples');
  const blockedVisual = roundedRoadVisual(route, {
    material: 'dirt',
    obstacle: cell => cell.x === 8 && cell.z === 5 ? 'Công trình' : '',
  });
  assert.ok(blockedVisual);
  assert.deepEqual(blockedVisual.overhangBlockedCell, { x: 8, z: 5 });
});
