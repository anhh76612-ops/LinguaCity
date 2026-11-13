const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { buildSync } = require('../../city-web/node_modules/esbuild');

const bundled = buildSync({
  stdin: {
    contents: "export * from './roads'; export * from './planning-layout'; export * from './terrain'; export * from './hill-road'; export * from './west-bank'; export * from './planning-traffic'; export * from './town-fences'; export * from './streets'; export * from './town-layout'; export * from './town-paths'; export * from './town-roads'; export * from './town-terrain'; export * from './road-shapes'; export * from './road-drawing'; export * from './road-visual'; export * from './stroke-ribbon';",
    resolveDir: __dirname,
  },
  nodePaths: [path.resolve(__dirname, '../../city-web/node_modules')], bundle: true,
  write: false, platform: 'node', format: 'cjs',
}).outputFiles[0].text;
const loaded = { exports: {} };
new Function('module', 'exports', bundled)(loaded, loaded.exports);
const {
  paintStrip, roadSections, segmentAt, changeSurface, buildLaneGraph, junctionCells,
  lots, lotAt, sampleRoads, gradeError, signalAxes, makeTerrain, roadError,
  connectHillRoad, connectStreamPath, hillRoadSamples, hillRoadWidth, terrainClearance,
  streamBridge, streamApproach, terrainHeight, zoneAt, makeTraffic, closestHillRoad,
  defaultBusLevel, roadsAtLevel, measureCell, townFenceRuns, junctionDirections, streetMesh,
  makeTown, townBuildingClearance, townRoadClearance, townRoads, townTrips, roadPath,
  makeTownTerrain, makeTownPaths, townHillRoad, townPathClearance,
  roadRoundabouts, planRoadStroke, planRoundedRoad, roadCurves, withoutRoadCurves, strokeRibbon, planContinuousRoad, ribbonLayer,
  laneOffsets, junctionStyleOptions,
  snapRoadEndpoints, sliceRoadStroke, planSlicedRoad,
  roundedRoadVisual, applyRoadVisual,
} = loaded.exports;
const cell = (x, z) => ({ x, z });

test('a short asphalt ribbon has dashed lane paint even with only two control points', () => {
  const road = { id: 'curve:test', points: [[0, 1], [4, 1]],
    width: 2, continuous: true, cells: ['0,0'] };
  const roads = new Map([['0,0', { x: 0, z: 0, axes: 0, curveOnly: true,
    material: 'asphalt', roadCurveId: road.id, roadCurve: road }]]);
  const { group } = streetMesh(roads, () => 0, [], { terrainPaths: false, preview: true });
  const { position, color } = group.children[1].geometry.attributes;
  const painted = new Set();
  for (let i = 0; i < position.count; i++) {
    const z = position.getZ(i);
    if (Math.abs(z - 1) < .08 && color.getX(i) > .6) painted.add(position.getX(i));
  }
  assert.ok(painted.size >= 4, 'at least two dashes appear along the center');
  assert.ok([...painted].every(x => x > 0 && x < 4), 'paint leaves both joins clear');
});

test('a locked diagonal route renders as a rounded tile union, never as extra road cells', () => {
  const route = sliceRoadStroke([[.5, .5], [7.5, 7.5]], 2);
  const planned = planSlicedRoad({ roads: new Map(), route, width: 2, material: 'dirt', surfaceY: () => 0, waterAt: () => null });
  const visual = roundedRoadVisual(route, { material: 'dirt' });
  const { group } = streetMesh(applyRoadVisual(planned.roads, visual), () => 0, [], { terrainPaths: false, preview: true });
  assert.ok(group.getObjectByName('Đường bo tròn theo ô'));
  assert.equal([...planned.roads.keys()].length, route.cells.length);
});

test('a two-lane asphalt bridge carries center paint onto the deck', () => {
  const roads = new Map([0, 1].map(z => [`0,${z}`, {
    x: 0, z, axes: 1, material: 'asphalt', bridgeId: 'test-span', bridgeY: 1,
  }]));
  const { group } = streetMesh(roads, () => 0, [], { terrainPaths: false, preview: true });
  const bridge = group.getObjectByName('Cầu bê tông');
  assert.ok(bridge, 'an asphalt span uses the concrete structure');
  const painted = bridge.children.some(mesh => {
    if (mesh.material.color.r <= .6) return false;
    const { position } = mesh.geometry.attributes;
    return Array.from({ length: position.count }, (_, i) => i).some(i =>
      Math.abs(position.getZ(i) - 1) < .06 && position.getY(i) > 1.035);
  });
  assert.ok(painted, 'center paint sits above the deck');
});

test('a stone span has an arched underside above the reserved clearance', () => {
  const roads = new Map([0, 1, 2, 3].map(x => [`${x},0`, {
    x, z: 0, axes: 1, material: 'stone', bridgeId: 'test-span', bridgeY: 1,
  }]));
  const { group } = streetMesh(roads, () => .9, [], { terrainPaths: false, preview: true });
  const bridge = group.getObjectByName('Cầu đá');
  assert.ok(bridge, 'stone paving uses the masonry structure');
  const lowest = (from, to) => {
    let y = Infinity;
    for (const mesh of bridge.children) {
      const { position } = mesh.geometry.attributes;
      for (let i = 0; i < position.count; i++) {
        if (position.getX(i) >= from && position.getX(i) <= to) y = Math.min(y, position.getY(i));
      }
    }
    return y;
  };
  assert.ok(lowest(1.6, 2.4) - lowest(0, .4) > .07);
  assert.ok(lowest(0, 4) > .81, 'masonry stays within the existing bridge depth');
});

test('stone paving shows individual raised cobbles across the middle of a tile', () => {
  const roads = new Map([['0,0', { x: 0, z: 0, axes: 1, material: 'stone' }]]);
  const { group } = streetMesh(roads, () => 0, [], { terrainPaths: false, preview: true });
  const { position } = group.children[1].geometry.attributes;
  let interior = 0;
  for (let i = 0; i < position.count; i++) {
    const [x, y, z] = [position.getX(i), position.getY(i), position.getZ(i)];
    if (x > .25 && x < .75 && z > .25 && z < .75 && y > .049) interior++;
  }
  assert.ok(interior > 20, 'raised stone faces fill the lane, including its center');
});

test('an exposed dirt shoulder varies in width along a straight road', () => {
  const roads = new Map([0, 1, 2].map(x => [`${x},0`, { x, z: 0, axes: 1, material: 'dirt' }]));
  const { group } = streetMesh(roads, () => 0, [], { terrainPaths: false, preview: true });
  const { position } = group.children[0].geometry.attributes;
  const edge = new Set();
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i), z = position.getZ(i);
    if (x > 1 && x < 2 && z < .13) edge.add(z.toFixed(3));
  }
  assert.ok(edge.size > 1, 'the exposed edge bends between tile seams');
});

test('motorcycles follow 1×, share the 2× motor lane and move to a right-hand strip on 3×', () => {
  const roads = new Map();
  for (let x = 0; x < 9; x++) {
    for (let z = 0; z < Math.floor(x / 3) + 1; z++) {
      roads.set(`${x},${z}`, { x, z, axes: 1, material: 'dirt' });
    }
  }
  const walk = buildLaneGraph(roads, 'walk');
  const motorcycle = buildLaneGraph(roads, 'motorcycle');
  const car = buildLaneGraph(roads, 'car');
  assert.ok(roadPath(motorcycle, '1:0:0:1:0', '1:8:0:1:0'));
  assert.ok(roadPath(motorcycle, '1:8:0:-1:0', '1:0:0:-1:0'));
  assert.ok([...car.values()].every(node => node.section.width >= 2));
  const side = (graph, x, direction) => graph.get(`1:${x}:0:${direction}:0`).z;
  for (const direction of [-1, 1]) {
    assert.notEqual(side(walk, 1, direction), side(motorcycle, 1, direction));
    assert.equal(side(car, 4, direction), side(motorcycle, 4, direction));
    assert.ok((side(motorcycle, 7, direction) - side(car, 7, direction)) * direction > .5);
  }
  assert.equal(laneOffsets({ width: 4, material: 'asphalt' }, 'car').length, 2);
});

test('sample motorcycles move both ways along a narrow road without disappearing at the end', () => {
  const roads = draw(new Map(), 0, 0, 8, 0).roads;
  const traffic = makeTraffic(() => 0);
  traffic.setRoads(roads, new Map(), new Map(), buildLaneGraph(roads, 'motorcycle'));
  const bikes = traffic.group.children.filter(model => model.name === 'motorcycle');
  const visited = bikes.map(() => ({ visible: false, min: Infinity, max: -Infinity }));
  for (let frame = 0; frame < 1600; frame++) {
    traffic.tick(frame * .05, .05);
    bikes.forEach((model, i) => {
      const log = visited[i];
      if (log.visible) assert.ok(model.visible);
      if (!model.visible) return;
      log.visible = true;
      log.min = Math.min(log.min, model.position.x);
      log.max = Math.max(log.max, model.position.x);
      assert.ok(model.position.z >= .36 && model.position.z <= .64);
    });
  }
  assert.ok(visited.every(log => log.visible && log.min < .7 && log.max > 8.3), JSON.stringify(visited));
});

test('a new full-width junction can switch between roundabout and level crossing on the same cells', () => {
  const before = new Map(), roads = new Map();
  for (let x = -2; x < 4; x++) for (let z = -2; z < 4; z++) {
    const axis = (z >= 0 && z < 2 ? 1 : 0) | (x >= 0 && x < 2 ? 2 : 0);
    if (axis) roads.set(`${x},${z}`, { x, z, axes: axis, material: 'dirt' });
  }
  const variants = junctionStyleOptions(before, roads, [{ x: 0, z: 0 }]);
  assert.deepEqual(variants.map(({ style }) => style), ['roundabout', 'crossing']);
  for (const { roads: variant, style } of variants) {
    assert.deepEqual([...variant.keys()], [...roads.keys()]);
    assert.equal(roadRoundabouts(variant).size, Number(style === 'roundabout'));
    for (const mode of ['car', 'motorcycle']) {
      const graph = buildLaneGraph(variant, mode);
      const route = roadPath(graph, '1:-2:0:1:0', '2:3:0:1:0');
      assert.ok(route?.length);
      assert.equal(route.some(id => id.startsWith('roundabout:')), style === 'roundabout');
    }
  }
  assert.equal(roads.get('0,0').junctionStyle, undefined);
  const mixed = new Map(roads);
  for (const [key, tile] of mixed) if (tile.x === 1 && tile.z === 2) mixed.delete(key);
  assert.equal(roadRoundabouts(mixed).size, 0);
});

test('a nearly aligned extension snaps to the center of the existing endpoint and shares its old cells', () => {
  const base = draw(draw(new Map(), -4, 0, 0, 0).roads, -4, 1, 0, 1).roads;
  const points = snapRoadEndpoints([[.58, 1.38], [.77, 1.39], [.98, 1.38], [5.5, 1.38]], base, 2);
  assert.deepEqual(points[0], [.5, 1]);
  const trial = planSlicedRoad({ roads: base, route: sliceRoadStroke(points, 2), width: 2,
    material: 'stone', surfaceY: () => .5, waterAt: () => null });
  assert.equal(trial.error, '');
  assert.equal(trial.roads.get('0,0'), base.get('0,0'));
  assert.ok(roadPath(buildLaneGraph(trial.roads, 'car'), '1:-4:0:1:0', '1:5:0:1:0'));
});

test('connecting to the end of a saved continuous road keeps its cells and adds a two-way route', () => {
  const ribbon = strokeRibbon([[-5.5, 1], [-3.5, 1], [.1, 1]], 2);
  const surfaceY = () => .5, waterAt = () => null;
  const old = planContinuousRoad(new Map(), ribbon, 'dirt', { surfaceY, waterAt, obstacle: () => '' }).roads;
  const route = sliceRoadStroke(snapRoadEndpoints([[.14, 1.1], [6.5, 1]], old, 2), 2);
  const joined = planSlicedRoad({ roads: old, route, width: 2, material: 'stone', surfaceY, waterAt,
    obstacle: item => old.has(`${item.x},${item.z}`) ? 'Dải đã lưu' : '' });
  assert.equal(joined.error, '');
  for (const [key, item] of old) assert.equal(joined.roads.get(key), item);
  assert.equal(roadCurves(joined.roads).size, 1);
  const graph = buildLaneGraph(joined.roads, 'car', surfaceY);
  const curveStart = [...graph.keys()].find(id => id.startsWith('ribbon:') && id.endsWith(':1:0:0'));
  const curveReturn = [...graph.keys()].filter(id => id.startsWith('ribbon:') && id.includes(':-1:0:')).at(-1);
  assert.ok(roadPath(graph, curveStart, '1:6:0:1:0')?.length);
  assert.ok(roadPath(graph, '1:6:0:-1:0', curveReturn)?.length);
  const across = sliceRoadStroke([[-3.5, -2], [-3.5, 4]], 2);
  assert.equal(planSlicedRoad({ roads: old, route: across, width: 2, material: 'stone', surfaceY, waterAt }).error,
    'Nối đường tại đầu dải cong có sẵn.');
});
const draw = (roads, x1, z1, x2, z2, material = 'dirt', check = () => '') => (
  paintStrip(roads, cell(x1, z1), cell(x2, z2), material, check)
);

test('a 2× diagonal stays centered and reserves partial tiles on both sides', () => {
  const ribbon = strokeRibbon([[.5, .5], [2, 2.07], [5.5, 5.5]], 2);
  assert.equal(ribbon.error, '');
  assert.ok(ribbon.points.every(([x, z]) => Math.abs(x - z) < 1e-6));
  assert.ok(ribbon.cells.some(({ x, z }) => x === 2 && z === 0));
  assert.ok(ribbon.cells.some(({ x, z }) => x === 0 && z === 2));
  const positions = ribbonLayer(ribbon, () => 0, '#00e5ff', .25).children[0].geometry.getAttribute('position');
  for (let i = 0; i < positions.count; i += 2) {
    assert.ok(Math.abs(Math.hypot(positions.getX(i) - positions.getX(i + 1), positions.getZ(i) - positions.getZ(i + 1)) - 2) < 1e-6);
  }
  const args = { obstacle: () => '', waterAt: () => null, surfaceY: () => 0 };
  const blocked = planContinuousRoad(new Map(), ribbon, 'dirt', { ...args,
    obstacle: ({ x, z }) => x === 2 && z === 0 ? 'Vướng móng nhà' : '' });
  assert.equal(blocked.error, 'Vướng móng nhà');
  const paved = planContinuousRoad(new Map(), ribbon, 'dirt', args);
  assert.equal(paved.error, '');
  assert.equal(roadCurves(paved.roads).size, 1);
  assert.ok([...buildLaneGraph(paved.roads, 'car').values()].some(node => node.links.length && node.section.width === 2));
  const bend = strokeRibbon([[0, 0], [4, 0], [4, 4]], 2);
  assert.equal(bend.error, '');
  assert.ok(bend.points.some(([x, z]) => x > 2 && x < 4 && z > 0 && z < 2));
  assert.match(strokeRibbon([[0, 0], [1, 0], [1, 1], [0, 1]], 2).error, /gắt|chồng/);
});

test('the valley town preserves water and leaves a contiguous building site on level ground', () => {
  const roadClearance = townRoadClearance();
  const clearGround = (x, z, radius) => townPathClearance(x, z, radius) ||
    townBuildingClearance(x, z, radius) || roadClearance(x, z, radius);
  const { surfaceY, blockers } = makeTownTerrain({ clearGround });
  const town = makeTown(surfaceY, townPathClearance);
  const roads = townRoads(1);
  assert.equal(town.buildings.length, 21);
  for (const { min, max, name, groundRise } of town.buildings) {
    assert.ok(groundRise < .22, `Stepped foundation under ${name}: ${groundRise}`);
    for (const x of [min.x, max.x]) for (const z of [min.z, max.z]) {
      assert.ok(terrainClearance(x, z) > .25, `Water under building at ${x}, ${z}`);
    }
  }
  for (const cell of roads.values()) {
    assert.equal(cell.material, 'dirt');
    assert.equal(town.error(cell), '');
  }
  assert.ok(blockers.every(({ x, z, radius }) => !clearGround(x, z, radius)));
  assert.deepEqual([...new Set(roadSections(roads).map(s => s.width))].sort(), [1, 2]);
  assert.equal(gradeError(roadSections(roads), surfaceY, town.measure), '');
  const openGround = [];
  for (let x = 0; x < 5; x++) for (let z = 1; z < 5; z++) {
    assert.equal(town.error(cell(x, z)), '');
    assert.ok(!roads.has(`${x},${z}`));
    openGround.push(surfaceY(x + .5, z + .5));
  }
  assert.ok(Math.max(...openGround) - Math.min(...openGround) < .08);
  const terrace = town.buildings.slice(-4).map(({ model }) => model.position.y);
  assert.ok(Math.max(...terrace) - Math.min(...terrace) < .12);
  assert.ok(terrace[0] - openGround[0] > 1.6);
});

test('town cars reach a destination and return along legal lanes without despawning', () => {
  const roads = townRoads(1);
  const car = buildLaneGraph(roads, 'car'), walk = buildLaneGraph(roads, 'walk');
  connectHillRoad(car, roads, 'car', townHillRoad);
  const { surfaceY } = makeTownTerrain();
  const grade = ({ x, y, z }) => Math.max(y, surfaceY(x, z));
  for (const [index, point] of townHillRoad.entries()) {
    if (!index) continue;
    const previous = townHillRoad[index - 1];
    const slope = Math.abs(grade(point) - grade(previous)) / Math.hypot(point.x - previous.x, point.z - previous.z);
    assert.ok(slope < .21, `Hill road slope ${slope} at ${point.x}, ${point.z}`);
  }
  assert.ok(Math.hypot(car.get('hill:turn').x - townHillRoad.at(-1).x, car.get('hill:turn').z - townHillRoad.at(-1).z) < .4);
  const landscape = makeTownPaths(surfaceY);
  landscape.connect(walk);
  assert.ok(walk.has('town-bridge:1:0'));
  assert.ok(!car.has('town-bridge:1:0'));
  assert.ok(landscape.bridge.every(point => point.y >= surfaceY(point.x, point.z) - .04));
  assert.ok([...car.values()].every(node => node.section.width >= 2));
  const trips = townTrips(car);
  for (const { origin, destination } of trips) {
    assert.ok(roadPath(car, origin, destination)?.length);
    assert.ok(roadPath(car, destination, origin)?.length);
  }
  const traffic = makeTraffic(() => 0, townTrips);
  traffic.setRoads(roads, walk, car);
  const seen = trips.map(() => ({ visible: false, reached: false, returned: false }));
  for (let frame = 0; frame < 3500; frame++) {
    traffic.tick(frame * .05, .05);
    for (const [i, model] of traffic.group.children.filter(model => model.name === 'car').entries()) {
      const trip = seen[i];
      if (trip.visible) assert.ok(model.visible);
      if (!model.visible) continue;
      trip.visible = true;
      const at = id => Math.hypot(model.position.x - car.get(id).x, model.position.z - car.get(id).z) < .015;
      trip.reached ||= at(trips[i].destination);
      trip.returned ||= trip.reached && at(trips[i].origin);
    }
  }
  assert.ok(seen.every(trip => trip.returned), JSON.stringify(seen));
});

test('parallel strips widen only their overlap and stop at four cells', () => {
  let roads = new Map();
  for (let z = 0; z < 4; z++) roads = draw(roads, z === 0 ? 0 : 2, z, 5, z).roads;
  assert.deepEqual(roadSections(roads).map(({ width }) => width), [1, 1, 4, 4, 4, 4]);
  const blocked = draw(roads, 2, 4, 5, 4);
  assert.ok(blocked.error);
  assert.equal(blocked.roads, roads);
  roads = draw(roads, 3, 3, 5, 3, 'erase').roads;
  assert.deepEqual(roadSections(roads).map(({ width }) => width), [1, 1, 4, 3, 3, 3]);
});

test('an orthogonal stroke makes a junction without widening the straight road', () => {
  let roads = draw(new Map(), 0, 0, 5, 0).roads;
  roads = draw(roads, 2, -2, 2, 2).roads;
  const junction = roads.get('2,0');
  assert.equal(junction.axes, 3);
  assert.equal(roadSections(roads).filter(s => s.width === 1).length, 11);
  assert.equal(buildLaneGraph(roads, 'car').size, 0);
});

test('failed strokes are atomic and preserve the original map', () => {
  const roads = new Map();
  const trial = draw(roads, 0, 0, 4, 0, 'dirt', ({ x }) => x === 3 ? 'water' : '');
  assert.equal(trial.error, 'water');
  assert.equal(trial.roads, roads);
  assert.equal(roads.size, 0);
});

test('upgrading a section stops at intersections and preserves neighboring surfaces', () => {
  let roads = draw(new Map(), 0, 0, 8, 0).roads;
  roads = draw(roads, 4, -2, 4, 2).roads;
  const selected = segmentAt(roads, cell(1, 0));
  roads = changeSurface(roads, selected, 'stone');
  assert.equal(roads.get('3,0').material, 'stone');
  assert.equal(roads.get('4,0').material, 'dirt');
  assert.equal(roads.get('5,0').material, 'dirt');
});

test('a 1× footpath has two opposite flows and cars stop at its connection', () => {
  let roads = draw(new Map(), 0, 0, 8, 0).roads;
  roads = draw(roads, 0, 1, 4, 1).roads;
  const walking = buildLaneGraph(roads, 'walk');
  const driving = buildLaneGraph(roads, 'car');
  assert.deepEqual([...walking.values()].filter(node => node.section.t === 7).map(node => node.direction).sort(), [-1, 1]);
  assert.ok([...driving.values()].some(node => node.section.t === 4));
  assert.ok([...driving.values()].every(node => node.section.width >= 2));
  assert.ok([...driving.values()].every(node => node.links.every(link => driving.has(link.id))));
});

test('a two-by-two junction reserves one conflict area and a straight strip reserves none', () => {
  let roads = draw(new Map(), 0, 0, 5, 0).roads;
  roads = draw(roads, 0, 1, 5, 1).roads;
  assert.equal(junctionCells(roads).size, 0);
  roads = draw(roads, 2, -2, 2, 3).roads;
  roads = draw(roads, 3, -2, 3, 3).roads;
  const junctions = junctionCells(roads);
  assert.equal(junctions.size, 4);
  assert.equal(new Set(junctions.values()).size, 1);
  assert.equal(roadRoundabouts(roads).size, 1);
  const graph = buildLaneGraph(roads, 'car');
  const ring = [...graph.values()].filter(node => node.id.startsWith('roundabout:'));
  assert.equal(ring.length, 16);
  assert.ok(ring[0].x > ring[1].x && ring[0].z > ring[1].z);
  assert.equal(ring[0].links.filter(link => link.id.startsWith('roundabout:'))[0].id, ring[1].id);
  assert.ok(roadPath(graph, '1:0:0:1:0', '2:3:2:1:0')?.some(id => id.startsWith('roundabout:')));
  assert.ok([...buildLaneGraph(roads, 'walk').keys()].every(id => !id.startsWith('roundabout:')));
});

test('rounding preserves a collision footprint and routes the lanes along the mesh', () => {
  const roads = new Map();
  const stroke = [...Array.from({ length: 7 }, (_, i) => cell(i, 0)),
    ...Array.from({ length: 6 }, (_, i) => cell(6, i + 1))];
  const surfaceY = () => 0;
  const base = planRoadStroke({ roads, cells: stroke, width: 2, material: 'dirt', surfaceY, waterAt: () => null });
  assert.equal(base.error, '');
  const rounded = planRoundedRoad(roads, base.roads, stroke, 2, { surfaceY });
  assert.equal(rounded.error, '');
  assert.ok(rounded.rounded);
  const [curve] = roadCurves(rounded.roads).values();
  assert.ok(curve.points.some(([x, z]) => x > 5 && z > 1 && z < 2));
  assert.ok(rounded.cells.some(cell => cell.curveOnly));
  for (const [key, value] of base.roads) assert.equal(rounded.roads.get(key).axes, value.axes);
  const graph = buildLaneGraph(rounded.roads, 'car');
  assert.ok([...graph.values()].every(node => node.section.id === curve.id && node.links.every(link => graph.has(link.id))));
  assert.ok(graph.size > 50);
  assert.equal(roadRoundabouts(rounded.roads).size, 0);
  const street = streetMesh(rounded.roads, surfaceY, [], { terrainPaths: false, preview: true });
  assert.ok(street.group.children[0].geometry.attributes.position.count > 100);
  assert.deepEqual(withoutRoadCurves(rounded.roads, [stroke[0]]), base.roads);
  const reserved = rounded.cells.find(cell => cell.curveOnly);
  const blocked = planRoundedRoad(roads, base.roads, stroke, 2, {
    surfaceY, blocked: ({ x, z }) => x === reserved.x && z === reserved.z,
  });
  assert.equal(blocked.rounded, false);
  assert.equal(blocked.roads, base.roads);
  const changed = changeSurface(rounded.roads, segmentAt(rounded.roads, reserved), 'stone');
  assert.equal(roadCurves(changed).get(curve.id).material, 'stone');
});

test('rounding removes the staircase from a diagonal road stroke', () => {
  const roads = new Map(), surfaceY = () => 0;
  const stroke = [cell(0, 0)];
  for (let i = 0; i < 7; i++) stroke.push(cell(i + 1, i), cell(i + 1, i + 1));
  const base = planRoadStroke({ roads, cells: stroke, width: 2, material: 'stone', surfaceY, waterAt: () => null });
  assert.equal(base.error, '');
  const rounded = planRoundedRoad(roads, base.roads, stroke, 2, { surfaceY });
  assert.equal(rounded.error, '');
  assert.ok(rounded.rounded);
  const [curve] = roadCurves(rounded.roads).values();
  assert.ok(curve.points.every(([x, z]) => Math.abs(x - z) <= 1.001));
  const middle = curve.points.filter(([x]) => x > 2 && x < 6);
  assert.ok(middle.length > 10);
  assert.ok(middle.slice(1).every(([x, z], i) => x > middle[i][0] && z > middle[i][1]));
});

test('all sample lots connect and the approved terrain can carry the sample widths', () => {
  const roads = sampleRoads(3);
  const sections = roadSections(roads);
  assert.deepEqual([...new Set(sections.map(section => section.width))].sort(), [1, 2, 3, 4]);
  assert.equal(gradeError(sections), '');
  assert.ok(sections.some(section => signalAxes(roads, section)));
  for (const lot of lots) {
    assert.ok(roads.has(`${lot.gate.x},${lot.gate.z}`), lot.name);
    assert.equal(lotAt(lot), lot);
  }
  for (const cell of roads.values()) assert.equal(roadError(cell), '');
  assert.equal([...sampleRoads(1).values()].some(cell => cell.material !== 'dirt'), false);
  assert.equal([...sampleRoads(2).values()].some(cell => cell.material === 'asphalt'), false);
});

test('road heights follow the rendered terrain surface', () => {
  const THREE = require('../../city-web/node_modules/three/build/three.cjs');
  const { ground, surfaceY } = makeTerrain();
  const ray = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0));
  for (const [x, z] of [[-6.71, -11.34], [-2.08, -8.73], [7.31, 1.17], [-8.66, .57]]) {
    ray.ray.origin.set(x, 30, z);
    assert.ok(Math.abs(surfaceY(x, z) - ray.intersectObject(ground, false)[0].point.y) < 1e-6);
  }
});

test('the hill has a connected two-way vehicle route and its surface clears the graded ground', () => {
  const roads = sampleRoads(3);
  const graph = buildLaneGraph(roads, 'car');
  connectHillRoad(graph, roads, 'car');
  const entry = [...graph.values()].find(node => node.links.some(link => link.id === 'hill:1:0'));
  assert.ok(entry && !entry.id.startsWith('hill:'));
  assert.ok(graph.get('hill:-1:0').links.some(link => !link.id.startsWith('hill:')));
  assert.equal(hillRoadSamples.at(-1).y, 4.7);
  const { surfaceY } = makeTerrain({ plannedHill: true });
  for (const point of hillRoadSamples) for (const offset of [-hillRoadWidth / 2, 0, hillRoadWidth / 2]) {
    assert.ok(surfaceY(point.x - point.dz * offset, point.z + point.dx * offset) <= point.y + .059);
  }
});

test('the widened plateau is flat and the bridge connects the foot network over water', () => {
  for (const [x, z] of [[-5.1, -9.1], [-4.2, -9.1], [-2.1, -9.1]]) {
    assert.equal(terrainHeight(x, z, true), .83);
    assert.equal(zoneAt({ x: Math.floor(x), z: Math.floor(z) }), 'expansion');
  }
  assert.ok(streamApproach.every(point => terrainClearance(point.x, point.z) > 0));
  assert.ok(streamBridge.some(point => terrainClearance(point.x, point.z) < 0));
  const roads = sampleRoads(3), walkers = buildLaneGraph(roads, 'walk');
  connectStreamPath(walkers, roads);
  assert.ok([...walkers.values()].some(node => !node.id.startsWith('bridge:') && node.links.some(link => link.id === 'bridge:1:0')));
  assert.ok(walkers.get('bridge:-1:0').links.some(link => !link.id.startsWith('bridge:')));
});

test('cars reach both termini and return to the same start without disappearing', () => {
  const roads = sampleRoads(1);
  const car = buildLaneGraph(roads, 'car'), walk = buildLaneGraph(roads, 'walk');
  connectHillRoad(car, roads, 'car');
  connectHillRoad(walk, roads, 'walk');
  connectStreamPath(walk, roads);
  const traffic = makeTraffic((x, z) => closestHillRoad(x, z)?.height ?? 0);
  traffic.setRoads(roads, walk, car);
  const termini = ['hill:turn', 'west:turn'].map(id => car.get(id));
  const origin = car.get('east:turn');
  assert.ok(origin && termini.every(Boolean));
  const visible = [false, false], reached = [false, false], returned = [false, false];
  for (let frame = 0; frame < 6500; frame++) {
    traffic.tick(frame * .05, .05);
    for (const [index, actor] of traffic.group.children.filter(model => model.name === 'car').entries()) {
      if (visible[index]) assert.ok(actor.visible);
      visible[index] ||= actor.visible;
      if (!visible[index]) continue;
      const { x, z } = actor.position;
      reached[index] ||= Math.hypot(x - termini[index].x, z - termini[index].z) < .015;
      returned[index] ||= reached[index] && Math.hypot(x - origin.x, z - origin.z) < .015;
    }
  }
  assert.deepEqual(returned, [true, true]);
  const parcel = lots.find(lot => lot.x === -7 && lot.z === -4);
  assert.equal(parcel.name, undefined);
  assert.ok(car.has(termini[1].id) && termini[1].section.cells.some(cell => cell.x === parcel.gate.x && cell.z === parcel.gate.z));
});

test('the opening layout uses only dirt and the sample keeps wider and narrower routes', () => {
  assert.equal(defaultBusLevel, 1);
  const initial = sampleRoads(defaultBusLevel);
  assert.ok([...initial.values()].every(cell => cell.material === 'dirt'));
  assert.ok(initial.size > 115);
  assert.deepEqual([...new Set(roadSections(initial).map(s => s.width))].sort(), [1, 2, 3, 4]);
  const advanced = sampleRoads(3);
  assert.ok([...roadsAtLevel(advanced, 1).values()].every(cell => cell.material === 'dirt'));
  assert.ok([...advanced.values()].some(cell => cell.material === 'asphalt'));
});

test('the added construction reserves fit whole plots without flattening the valley', () => {
  const roads = sampleRoads(defaultBusLevel);
  const reserves = lots.filter(lot => lot.future);
  assert.ok(reserves.length >= 2);
  for (const lot of reserves) {
    assert.ok(lot.w >= 3 && lot.d >= 3);
    const cells = [];
    for (let x = lot.x; x < lot.x + lot.w; x++) {
      for (let z = lot.z; z < lot.z + lot.d; z++) {
        assert.equal(roads.has(`${x},${z}`), false);
        cells.push(measureCell({ x, z }));
      }
    }
    assert.ok(Math.max(...cells.map(cell => cell.high)) - Math.min(...cells.map(cell => cell.low)) <= .38);
    assert.ok(roads.has(`${lot.gate.x},${lot.gate.z}`));
  }
  assert.ok(measureCell({ x: -3, z: 2 }).rise > .60);
  assert.equal(zoneAt({ x: -3, z: 2 }), 'terrace');
});

test('town fences protect the hill crest and road above a drop', () => {
  const { group, surfaceY, blockers } = makeTerrain({ plannedHill: true });
  const runs = townFenceRuns(surfaceY, blockers.filter(item => item.kind !== 'fence'));
  assert.equal(runs.length, 2);
  for (const run of runs) for (const { x, y, z } of run) {
    assert.ok(x > 0 && z < -8);
    assert.ok((closestHillRoad(x, z)?.distance ?? Infinity) > hillRoadWidth / 2);
    assert.ok(Math.abs(y - surfaceY(x, z)) < 1e-6);
  }
  assert.equal(group.getObjectByName('Hàng rào an toàn').children.length, 2);
  assert.ok(blockers.some(item => item.kind === 'fence'));
});

test('a two-arm corner has no direction sign, while a T and cross have one each', () => {
  const base = draw(new Map(), -2, 0, 0, 0).roads;
  const corner = draw(base, 0, 0, 0, 2).roads;
  const tee = draw(corner, 0, 0, 2, 0).roads;
  const cross = draw(tee, 0, -2, 0, 0).roads;
  assert.equal(junctionDirections(corner)[0].directions.length, 2);
  assert.equal(junctionDirections(tee)[0].directions.length, 3);
  assert.equal(junctionDirections(cross)[0].directions.length, 4);
  const height = () => 0;
  const signs = roads => streetMesh(roads, height).group.getObjectByName('Biển chỉ đường').children;
  assert.deepEqual(signs(corner).map(sign => sign.userData.arrows.length), []);
  assert.deepEqual(signs(tee).map(sign => sign.userData.arrows.length), [2]);
  assert.deepEqual(signs(cross).map(sign => sign.userData.arrows.length), [3]);
});

