import * as THREE from 'three';
import { bake, seeded } from '../../city-web/src/core/shapes';
import { meshGeometry } from '../mesh-geometry';
import { makeFence } from '../models/fence';
import { makeTree } from '../models/trees';
import { makeRock, makeRockLedge } from '../models/rocks';
import { makeGrassBlade, makeReed, makeWildflower } from '../models/ground-plants';
import { makeFallenLog } from '../models/fallen-log';
import { closestHillRoad, hillPoint } from './hill-road';
import { closestStreamPath } from './west-bank';
import { townFenceRuns } from './town-fences';
import { makeTerrainScenery } from './terrain-scenery';

const smooth = THREE.MathUtils.smoothstep;
const mix = THREE.MathUtils.lerp;
const hillLedges = [
  [15.2, -13.3, 1.57, 1.21, 1.15, .48, 93],
  [16.3, -11.65, 1.41, 1.06, 1.32, -.62, 36],
  [15.7, -10.5, .83, .81, .61, .38, 59],
];

function rockyLedges(blockers, heightAt, plannedHill, clearGround, blockerFor, { riverX, riverWidth, waterfall }) {
  const group = new THREE.Group();
  const lip = waterfall.start;
  const center = riverX(lip), edge = riverWidth(lip);
  const profiles = [
    [center - edge - .75, lip + .16, 1.24, .96, 1.25, .48, 61],
    [center + edge + .70, lip + .22, 1.25, .97, 1.18, -.38, 64],
    [center - edge - 1.03, lip - .93, 1.05, .76, .78, -.16, 62],
    [center + edge + .72, lip - 1.14, 1.02, .83, .72, .62, 63],
    [center - edge - 1.10, waterfall.end + .32, 1.65, 1.17, 2.4, .36, 66],
    [center + edge + 1.13, waterfall.end + .78, 1.25, 1.34, 2.1, -.24, 67],
    [-18.1, -8.0, 1.63, 1.05, 1.18, .24, 35],
    [-17.4, -6.78, 1.11, .87, .64, .57, 71],
    [-20.12, -4.32, 1.89, 1.10, 1.45, -.23, 13],
    ...(plannedHill ? hillLedges.map((profile, index) => [[20.94, -12.18], [21.72, -11.15], [17.84, -14.72]][index]
      .concat(profile.slice(2))) : hillLedges),
    [13.62, 5.72, 1.62, .93, .80, .47, 53],
    [14.93, 5.93, 1.40, 1.03, 1.17, -.41, 84],
  ];
  for (const [x, z, width, depth, height, angle, seed] of profiles) {
    const radius = Math.min(width, depth) * .86;
    if (clearGround(x, z, radius)) continue;
    blockers.push({ x, z, radius });
    const mesh = makeRockLedge(width, depth, height, seed);
    mesh.position.set(x, heightAt(x, z), z);
    mesh.rotation.y = angle;
    group.add(mesh);
    blockerFor?.set(mesh, blockers.at(-1));
  }
  return group;
}

function riversidePlants(group, random, heightAt, { riverX, riverWidth }) {
  for (const [z, side] of [[-15.2, -1], [-12.9, 1], [-9.82, -1], [-7.43, 1], [-5.57, 1], [-3.14, -1],
    [1.41, 1], [4.87, -1], [7.46, 1], [10.91, -1], [15.5, 1]]) {
    const x = riverX(z) + side * (riverWidth(z) + .47);
    for (let i = 0; i < 7; i++) {
      const px = x + (random() - .5) * .52, pz = z + (random() - .5) * .86;
      group.add(...makeReed(px, heightAt(px, pz), pz, i % 2 === 0, random));
    }
  }
  for (const [x, z, palette] of [[-10.1, -7.2, 3], [-10.6, -4.2, 0], [-7.98, 5.9, 1],
    [-6.96, 9.4, 2], [-16.28, 2.8, 0], [-17.6, -1.53, 1], [9.25, -7.85, 1],
    [11.23, 4.54, 0], [10.14, 10.9, 2], [-2.9, -13.3, 3], [-7.2, 14.88, 0]]) {
    for (let i = 0; i < 13; i++) {
      const px = x + (random() - .5) * 1.24, pz = z + (random() - .5) * 1.01;
      group.add(...makeWildflower(px, heightAt(px, pz), pz, i % 5 ? palette : 0, random));
    }
  }
}

function vegetationAndStones(blockers, heightAt, plannedHill, clearGround, blockerFor, layout) {
  const { coastZ, inland, rapid, riverX, riverWidth, riverOffset } = layout;
  const group = new THREE.Group();
  const random = seeded(321);
  const treePositions = [];
  const overlapsPath = (x, z, margin) => plannedHill &&
    ((closestHillRoad(x, z)?.distance ?? Infinity) < .99 + margin ||
      (closestStreamPath(x, z)?.distance ?? Infinity) < .51 + margin);
  function plant(kind, x, z, size) {
    if (inland(x, z) < 2.1) return;
    const yaw = random() * Math.PI * 2;
    if (overlapsPath(x, z, .14 + size * .17)) return;
    if (hillLedges.some(([px, pz, width]) => Math.hypot(x - px, z - pz) < width)) return;
    treePositions.push([x, z]);
    if (clearGround(x, z, .19 * size)) return;
    const item = makeTree(kind, size, yaw);
    item.position.set(x, heightAt(x, z) - .015, z);
    group.add(item);
    if (size >= .68 && kind !== 'bush' && kind !== 'fern') {
      const blocker = { x, z, radius: .19 * size };
      blockers.push(blocker);
      blockerFor?.set(item, blocker);
    }
  }
  function rock(x, z, size) {
    if (inland(x, z) < -.35) return;
    const mesh = makeRock(size, random);
    mesh.position.set(x, heightAt(x, z) + size * .075, z);
    if (overlapsPath(x, z, size * .78) || clearGround(x, z, size * .75)) {
      mesh.geometry.dispose();
      return;
    }
    group.add(mesh);
    if (size >= .47) {
      const blocker = { x, z, radius: size * .75 };
      blockers.push(blocker);
      blockerFor?.set(mesh, blocker);
    }
  }
  const clusters = [
    [-19.5, -17.6, 6.8, 4.6, 11, ['pine', 'spruce', 'golden']],
    [-17.0, -4.6, 3.7, 4.1, 8, ['oak', 'birch', 'broadleaf']],
    [-19.4, 7.9, 4.8, 4.2, 9, ['spruce', 'umbrella', 'pine']],
    [5.2, -17.2, 6.5, 3.6, 9, ['pine', 'spruce', 'golden']],
    [17.8, -12.8, 5.9, 4.6, 13, ['pine', 'spruce', 'broadleaf']],
    [19.0, 2.6, 4.6, 5.1, 10, ['oak', 'pine', 'amber', 'birch']],
    [10.8, 15.0, 6.9, 4.6, 10, ['umbrella', 'golden', 'oak', 'spruce']],
    [-5.8, 17.4, 4.8, 3.4, 7, ['oak', 'amber', 'birch']],
  ];
  for (const [cx, cz, width, depth, count, kinds] of clusters) {
    for (let n = 0, planted = 0; n < count * 4 && planted < count; n++) {
      const a = random() * Math.PI * 2, d = Math.sqrt(random());
      const x = cx + Math.cos(a) * width * d, z = cz + Math.sin(a) * depth * d;
      if (riverOffset(x, z) < 1.03 || inland(x, z) < 2.1 ||
        treePositions.some(([px, pz]) => Math.hypot(px - x, pz - z) < 1.19)) continue;
      plant(kinds[Math.floor(random() * kinds.length)], x, z, .74 + random() * .67);
      planted++;
    }
  }
  for (const [kind, x, z, size] of [
    ['broadleaf', -7.7, -7.0, .98], ['birch', -9.7, 1.4, .84], ['amber', -7.15, 10.75, .93],
    ['umbrella', 10.4, 4.6, 1.03], ['broadleaf', 8.0, -10.5, .79], ['golden', -4.8, -13.3, .92],
  ]) plant(kind, x, z, size);

  for (let i = 0; i < 138; i++) {
    const z = -24 + random() * 49;
    const side = i % 2 ? 1 : -1;
    const near = i < 93;
    const x = riverX(z) + side * (riverWidth(z) + (near ? -.21 + random() * 1.15 : 2.1 + random() * 9));
    if (near || random() < .35) rock(x, z, .10 + random() ** 2 * (near ? .53 : .82));
    if (i % 9 === 0 && riverOffset(x, z) > .38) plant(i % 18 ? 'fern' : 'bush', x, z, .39 + random() * .41);
  }
  for (const [x, z, size] of [[-17.6, -9.65, 1.22], [-17.08, -9.14, .65], [-8.48, 6.58, .76],
    [12.65, -15.1, 1.13], [14.61, -15.78, .72], [15.7, -12.9, .86], [14.9, 11.24, .86]]) {
    rock(x, z, size);
  }
  for (const [z, offset, size] of [[rapid - .40, -1.02, .64], [rapid - .08, 1.13, .56],
    [rapid + .45, -.97, .70], [rapid + .72, .76, .57], [rapid + .97, -1.15, .40], [rapid + 1.45, 1.16, .46]]) {
    rock(riverX(z) + offset, z, size);
  }
  for (const [x, margin, size] of [[-16.7, 1.4, .64], [-15.85, .96, .33], [-11.9, 1.21, .43],
    [-10.65, .71, .33], [-5.2, 1.12, .34], [-4.77, 1.69, .23], [-2.9, 1.61, .56],
    [4.96, 1.81, .56], [5.48, 1.03, .31], [11.83, 1.74, .77], [12.60, .99, .48]]) {
    rock(x, coastZ(x) - margin, size);
  }
  riversidePlants(group, random, heightAt, layout);

  for (let clump = 0; clump < 140; clump++) {
    const z = -21 + random() * 43;
    const x = clump < 84 ? riverX(z) + (clump % 2 ? 1 : -1) * (riverWidth(z) + .53 + random() * 2.6) :
      -8.2 + random() * 26;
    if (riverOffset(x, z) < .27 || inland(x, z) < 2.6) continue;
    const shade = random();
    for (let blade = 0; blade < 3; blade++) {
      const gx = x + (random() - .5) * .45, gz = z + (random() - .5) * .45;
      const mesh = makeGrassBlade(gx, heightAt(gx, gz), gz, shade, random);
      if (!overlapsPath(gx, gz, 0)) group.add(mesh);
      else mesh.geometry.dispose();
    }
  }

  for (const [x, z, heading, length] of [[-7.8, 6.8, .67, 1.29], [-16.6, -3.6, 1.92, 1.11], [13.6, 8.2, .76, 1.24]]) {
    if (inland(x, z) < 1.3) continue;
    group.add(makeFallenLog(x, heightAt(x, z), z, heading, length));
  }
  for (const [kind, x, z, size] of [
    ['pine', -32.3, 10.5, 1.10], ['spruce', -34.1, 9.1, .90],
    ['golden', -30.8, 12.4, .96], ['bush', -30.2, 10.6, .69],
    ['birch', -24.3, -14.1, .90], ['fern', -23.2, -13.6, .67],
    ['oak', -21.7, -22.7, 1.10], ['pine', -23.7, -22.0, .88], ['bush', -20.9, -21.6, .61],
    ['spruce', -4.8, -34.0, .92], ['pine', -5.6, -35.9, 1.05],
    ['amber', 3.9, -36.0, .89], ['bush', 4.2, -34.9, .64],
  ]) plant(kind, x, z, size);
  for (const [x, z, size] of [
    [-31.9, 11.3, .83], [-31.2, 11.0, .46], [-32.4, 12.0, .32],
    [-22.3, -22.1, .75], [-21.6, -21.8, .44], [-23.8, -13.4, .57],
    [-3.8, -33.9, .84], [-4.5, -33.2, .56], [3.7, -34.6, .66],
  ]) rock(x, z, size);
  return blockerFor ? group : bake(group);
}

function hillTrail(surfaceY) {
  const trail = new THREE.CatmullRomCurve3([
    [1.35, 9.25], [1.72, 7.9], [1.4, 6.6], [.56, 5.4], [.12, 4.32], [.05, 3.52], [.18, 2.35],
  ].map(hillPoint));
  const positions = [], colors = [], indices = [];
  const bands = [-1, -.74, 0, .74, 1];
  const soil = new THREE.Color('#bba271');
  const steps = 57;
  for (let step = 0; step <= steps; step++) {
    const t = step / steps;
    const { x, z } = trail.getPointAt(t);
    const direction = trail.getTangentAt(t);
    const width = (.48 + .052 * Math.sin(step * .49)) *
      mix(.46, 1, smooth(t, 0, .17) * (1 - smooth(t, .86, 1)));
    const opacity = smooth(t, 0, .15) * (1 - smooth(t, .88, 1));
    for (const [index, offset] of bands.entries()) {
      const px = x + direction.z * width * offset;
      const pz = z - direction.x * width * offset;
      positions.push(px, surfaceY(px, pz) + .032, pz);
      const tint = .98 + .05 * Math.sin(step * .39 + offset);
      colors.push(soil.r * tint, soil.g * tint, soil.b * tint, (1 - Math.abs(offset) ** 3) * opacity);
      if (step && index) {
        const a = (step - 1) * bands.length + index - 1, b = a + bands.length;
        indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }
  }
  const path = new THREE.Mesh(meshGeometry(positions, colors, indices, 4), new THREE.MeshStandardMaterial({
    vertexColors: true, roughness: .99, transparent: true, depthWrite: false, side: THREE.DoubleSide,
  }));
  path.receiveShadow = true;
  return path;
}

function hillDetails(surfaceY, plannedHill, blockers) {
  const group = new THREE.Group();
  const fences = new THREE.Group();
  fences.name = 'Hàng rào an toàn';
  if (plannedHill) {
    for (const run of townFenceRuns(surfaceY, blockers)) {
      fences.add(makeFence(run));
      for (const [index, post] of run.entries()) {
        blockers.push({ x: post.x, z: post.z, radius: .12, kind: 'fence' });
        if (!index) continue;
        const start = run[index - 1];
        for (const step of [.25, .50, .75]) {
          blockers.push({ x: mix(start.x, post.x, step), z: mix(start.z, post.z, step), radius: .12, kind: 'fence' });
        }
      }
    }
  } else {
    group.add(hillTrail(surfaceY));
    const fenceLines = [
      [[-3.75, -1.45], [-3.88, -.12], [-3.54, 1.42], [-2.72, 2.53], [-1.66, 3.25], [-.63, 3.52]],
      [[.73, 3.50], [1.97, 3.20], [3.16, 2.68]],
    ];
    for (const line of fenceLines) fences.add(makeFence(line.map(hillPoint).map(({ x, z }) => ({ x, y: surfaceY(x, z), z }))));
  }
  group.add(fences);
  return group;
}

export function addTerrainProps(group, { surfaceY, blockers, plannedHill, clearGround, editableScenery, showHillDetails, layout }) {
  const blockerFor = editableScenery ? new WeakMap() : undefined;
  const ledges = rockyLedges(blockers, surfaceY, plannedHill, clearGround, blockerFor, layout);
  const plants = vegetationAndStones(blockers, surfaceY, plannedHill, clearGround, blockerFor, layout);
  if (editableScenery) {
    for (const item of [...ledges.children]) if (item.position.z >= -25) plants.add(item);
  }
  const scenery = editableScenery ? makeTerrainScenery(plants, surfaceY, blockerFor) : null;
  group.add(ledges, scenery?.group ?? plants);
  if (showHillDetails) group.add(hillDetails(surfaceY, plannedHill, blockers));
  return scenery;
}
