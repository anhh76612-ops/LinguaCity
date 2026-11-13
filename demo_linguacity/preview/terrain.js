import * as THREE from 'three';
import { seeded } from '../../city-web/src/core/shapes';
import { meshGeometry } from '../mesh-geometry';
import { closestHillRoad, hill, hillDepth, hillSide } from './hill-road';
import { closestStreamPath, gradeWestRoad, westTerraceWeight } from './west-bank';
import { colorEarthGround } from './terrain-earth-colors';
import { addTerrainProps } from './terrain-props';

const hills = [
  [-36.5, -11.8, 4.2, 9.1, 13.4], [-36.7, 8.2, 3.6, 10.5, 10.0],
  [8.5, -24, 4.6, 10.4, 7.0], [18.6, -19.8, 6.2, 8.1, 8.2],
  [26, -10, 4.4, 9.2, 10.3], [23.6, 10.9, 3.6, 7.6, 9.1],
  [4.4, 22, 2.6, 12.8, 7.3], [-18.6, 22, 2.4, 8, 9.1],
];
const peaks = [
  [-40.0, 10.0, 7.7, 10.4, 11.2], [-38.2, 3.3, 7.9, 10.1, 10.0],
  [-38.0, -4.8, 7.1, 9.8, 10.2], [-34.4, -13.1, 6.5, 9.7, 10.2],
  [-30.2, -21.0, 5.6, 9.3, 9.4], [-24.0, -27.9, 5.3, 9.0, 8.7],
  [-17.2, -33.1, 4.4, 8.8, 7.5],
];
const smooth = THREE.MathUtils.smoothstep;
const mix = THREE.MathUtils.lerp;
const rapid = -8.25;
const source = -43;
const waterfall = { start: -36.45, end: -35.28, drop: 6.4 };
const seaLevel = -1.54;
const coastZ = x => 17.8 - .72 * x + 1.70 * Math.sin(x * .14 + .65) -
  3.10 * Math.exp(-(((x + 6.1) / 6.2) ** 2)) + 1.70 * Math.exp(-(((x - 9.0) / 8.0) ** 2));
const inland = (x, z) => coastZ(x) - z;
const lowerRiverX = z => -12.4 + 1.9 * Math.sin(.205 * z + .74) + 1.10 * Math.sin(.094 * z - .40) +
  7.3 * smooth(z, 9, 24) + 10.3 * (1 - smooth(z, -19.1, -10.9));
const riverX = z => mix(-.3 + .59 * (z - waterfall.start), lowerRiverX(z), smooth(z, -36.5, -20.0));
const riverWidth = z => (1.25 + .20 * Math.sin(.23 * z - .40) + .12 * Math.sin(.57 * z) +
  .49 * Math.exp(-(((z - rapid - 3.0) / 2.8) ** 2)) + .68 * smooth(z, 15.0, 20.0) +
  .94 * Math.exp(-(((z - waterfall.start + 3.25) / 2.55) ** 2)) +
  .47 * Math.exp(-(((z - waterfall.end - .9) / 1.65) ** 2))) *
  mix(.25, 1, smooth(z, source, source + 1.5));
const waterHeight = z => mix(
  -.51 - .006 * z - .65 * smooth(z, rapid - .65, rapid + .72) - .13 * smooth(z, 8.5, 10.4) +
  waterfall.drop * (1 - smooth(z, waterfall.start, waterfall.end)),
  seaLevel + .012, smooth(z, 14, 21.0)
);
const riverOffset = (x, z) => Math.max(Math.abs(x - riverX(z)) - riverWidth(z), source - z);
export const terrainClearance = (x, z) => Math.min(riverOffset(x, z), inland(x, z));
const riverRows = [...Array.from({ length: 249 }, (_, row) => (row - 124) * .5),
  rapid - .93, rapid - .59, rapid - .23, rapid + .28, rapid + .61, rapid + .93,
  ...Array.from({ length: 13 }, (_, index) => mix(waterfall.start - .20, waterfall.end + .20, index / 12))].sort((a, b) => a - b);
const waterRows = riverRows.filter(z => z >= source && z <= 25.5);

export function waterAt(x, z) {
  if (inland(x, z) <= 0) return { kind: 'sea', y: seaLevel - .012 };
  if (z < waterRows[0] || z > waterRows.at(-1)) return null;

  let low = 0, high = waterRows.length - 1;
  while (high - low > 1) {
    const middle = (low + high) >> 1;
    if (waterRows[middle] <= z) low = middle;
    else high = middle;
  }
  const a = waterRows[low], b = waterRows[high], t = (z - a) / (b - a);
  const center = mix(riverX(a), riverX(b), t);
  if (Math.abs(x - center) > mix(riverWidth(a), riverWidth(b), t)) return null;
  const kind = z >= waterfall.start - .16 && z <= waterfall.end + .33 ? 'falls' : 'river';
  return { kind, y: mix(waterHeight(a), waterHeight(b), t) };
}
const terraceWeight = (x, z) => smooth(x, -9.65, -7.2) * (1 - smooth(x, -4.6, -1.15)) *
  smooth(z, -15.1, -6.8) * (1 - smooth(z, 6.8, 11.7));
const hillRadius = (x, z) => Math.hypot((x - hill.x) / 6.9, (z - hill.z) / 6.1);
const cliffWeight = (x, z) => smooth(-hillSide(x, z), .83, 1.85) * smooth(hillDepth(x, z), -1.3, .35);
const hillWeight = (x, z, plannedHill) => {
  const radius = hillRadius(x, z);
  const rounded = 1 - smooth(radius, .62, 1.25);
  return plannedHill ? mix(rounded, 1 - smooth(radius, .65, .735), cliffWeight(x, z)) : rounded;
};

function ridgeHeight(x, z) {
  let ridge = 0;
  for (const [cx, cz, height, width, depth] of peaks) {
    const dx = (x - cx) / width, dz = (z - cz) / depth;
    const bearing = Math.atan2(dz, dx);
    const ribs = 1 + .13 * Math.cos(bearing * 5 + .43) + .09 * Math.sin(bearing * 3 - .27);
    const distance = Math.hypot(dx, dz) / ribs;
    ridge = Math.max(ridge, height * Math.max(0, 1 - distance) ** 1.37);
  }
  return ridge;
}

function upland(x, z, plannedHill) {
  let height = .11 + .12 * Math.sin(x * .24 + z * .18) + .10 * Math.cos(z * .32 - x * .18);
  for (const [cx, cz, rise, width, depth] of hills) {
    const distance = ((x - cx) / width) ** 2 + ((z - cz) / depth) ** 2;
    height += rise * Math.exp(-distance);
  }
  const farBank = riverX(z) - x - riverWidth(z);
  const foothillShelf = smooth(farBank, 2.45, 3.75) * (1 - smooth(farBank, 5.35, 7.45)) *
    smooth(z, -9.1, -5.4) * (1 - smooth(z, 7.4, 11.5));
  height = mix(height, 1.47 + .08 * Math.cos(z * .24), foothillShelf * .89);
  const headland = (waterfall.drop + 2.1) * Math.exp(-(((x - riverX(z)) / 7.5) ** 2)) *
    smooth(z, source - 7.2, source) * (1 - smooth(z, waterfall.start - .18, waterfall.end + 3.1));
  height += headland + 1.65 * terraceWeight(x, z) + ridgeHeight(x, z) +
    .13 * Math.sin(x * .43 + z * .37) * smooth(height, .45, 2.6);
  const meadow = 1 - smooth(Math.hypot((x + 17.8) / 9.2, (z + 17.9) / 7.2), .58, 1.18);
  height = mix(height, 2.05 + .21 * Math.sin(z * .24), meadow);
  if (plannedHill) height = mix(height, .83, westTerraceWeight(x, z));
  height = mix(height, hill.height, hillWeight(x, z, plannedHill));
  if (!plannedHill) return height;
  const road = closestHillRoad(x, z);
  return road ? mix(height, road.height - .055, 1 - smooth(road.distance, 1.36, 1.95)) : height;
}

export function terrainHeight(x, z, plannedHill = false) {
  const edge = riverOffset(x, z);
  const fromShore = inland(x, z);
  if (fromShore < 0) return seaLevel - .10 - 1.36 * smooth(-fromShore, 0, 7.8);
  const beach = seaLevel - .10 + fromShore * .27;
  if (edge < 0) return Math.min(waterHeight(z) - .04 - .66 * smooth(-edge, 0, 1.2),
    mix(beach, upland(x, z, plannedHill), smooth(fromShore, .55, 5.2)));
  const valley = mix(waterHeight(z) - .04, upland(x, z, plannedHill), smooth(edge, 0, 3.35));
  const height = mix(beach, valley, smooth(fromShore, .55, 5.2));
  if (!plannedHill || edge < .26) return height;
  const path = closestStreamPath(x, z);
  const graded = gradeWestRoad(x, z, height);
  return path ? mix(graded, path.height - .04, 1 - smooth(path.distance, .73, 1.18)) : graded;
}

function landscapeMesh(heightAt, plannedHill, groundPalette) {
  const cross = [0, .40, .73, .94, 1, 1.16, 1.37, 1.62, 1.95, 2.35, 2.83, 3.36, 3.95];
  for (let d = 4.65; d < 80; d += .70) {
    cross.push(d);
    if (plannedHill && d > 10 && d < 36) cross.push(d + .35);
  }
  const section = [...cross.slice(1).reverse().map(d => -d), ...cross];
  const pos = [], colors = [], indices = [];
  const olive = new THREE.Color('#a4ad68'), warm = new THREE.Color('#c0b878');
  const green = new THREE.Color('#6d9455'), shade = new THREE.Color('#708e5c');
  const sand = new THREE.Color('#c0a878'), below = new THREE.Color('#6b8e6a');
  const shore = new THREE.Color('#d0be90'), ridge = new THREE.Color('#908880'), ridgeLight = new THREE.Color('#b8ac98');
  const color = new THREE.Color();
  const rows = plannedHill ? [...riverRows, ...Array.from({ length: 25 }, (_, i) => -15.25 + i * .5)].sort((a, b) => a - b) : riverRows;
  for (const [row, z] of rows.entries()) {
    const w = riverWidth(z);
    for (let col = 0; col < section.length; col++) {
      const u = section[col], d = Math.abs(u);
      const x = riverX(z) + Math.sign(u) * (d <= 1 ? w * d : w + d - 1);
      const y = heightAt(x, z);
      const edge = riverOffset(x, z);
      const fromShore = inland(x, z);
      const waves = Math.sin(x * .38 + z * .27) * Math.cos(z * .23 - x * .12);
      color.copy(olive).lerp(warm, .27 + .18 * waves);
      color.lerp(green, smooth(y, .25, 4.3) * .75);
      color.lerp(shade, terraceWeight(x, z) * .23);
      color.lerp(warm, hillWeight(x, z, plannedHill) * (.24 + .08 * waves));
      color.lerp(shade, smooth(y, 1.4, 3.6) * (Math.sin(x * .46 - z * .34) * .17 + .19));
      color.lerp(green, (1 - smooth(edge, 1.05, 5.7)) * (.16 + .12 * waves));
      color.lerp(warm, smooth(Math.sin(x * .41 + z * .23) * Math.sin(z * .32 - x * .19), .40, .85) * .19);
      if (edge >= 0) color.lerp(sand, (1 - smooth(edge, .18, .91)) * .88);
      else color.copy(below);
      color.lerp(ridge, smooth(ridgeHeight(x, z), 1.35, 4.18) * .91);
      if (plannedHill && Math.abs(x - hill.x) < 9 && Math.abs(z - hill.z) < 9) {
        const radius = hillRadius(x, z);
        const face = smooth(radius, .64, .67) * (1 - smooth(radius, .735, .78)) * cliffWeight(x, z);
        const stoneBand = ridge.clone().lerp(ridgeLight, .42 + Math.sin(y * 13 + waves) * .2);
        color.lerp(stoneBand, face * .94);
      }
      color.lerp(ridgeLight, smooth(y, 7.4, 11.1) * .62);
      if (fromShore < 4.2) color.lerp(shore, (1 - smooth(fromShore, 1.25, 4.2)) * .92);
      pos.push(x, y, z);
      colors.push(color.r, color.g, color.b);
      if (row && col) {
        const a = (row - 1) * section.length + col - 1, b = a + 1, c = a + section.length, e = c + 1;
        if ((row + col) % 2) indices.push(a, c, b, b, c, e);
        else indices.push(a, c, e, a, e, b);
      }
    }
  }
  const geometry = meshGeometry(pos, colors, indices);
  if (groundPalette === 'earth') colorEarthGround(geometry, riverOffset, inland);
  const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .96 }));
  mesh.receiveShadow = true;
  return { mesh, vertexColumns: section.length, surfaceY: surfaceSampler(geometry.attributes.position, section.length, heightAt) };
}

function surfaceSampler(positions, columns, heightAt) {
  function interval(count, valueAt, value) {
    let low = 0, high = count - 1;
    while (high - low > 1) {
      const middle = (high + low) >> 1;
      if (valueAt(middle) <= value) low = middle;
      else high = middle;
    }
    return low;
  }
  return (x, z, overrides) => {
    const rows = positions.count / columns;
    const rowZ = index => positions.getZ(index * columns);
    if (z < rowZ(0) || z > rowZ(rows - 1)) return heightAt(x, z);
    const row = interval(rows, rowZ, z);
    const v = (z - rowZ(row)) / (rowZ(row + 1) - rowZ(row));
    const blendedX = index => mix(positions.getX(row * columns + index), positions.getX((row + 1) * columns + index), v);
    if (x < blendedX(0) || x > blendedX(columns - 1)) return heightAt(x, z);
    const col = interval(columns, blendedX, x);
    const a = row * columns + col, b = a + 1, c = a + columns, d = c + 1;
    const yAt = index => overrides?.get?.(index) ?? positions.getY(index);
    const flip = (row + col) % 2 === 1;
    const diagonal = flip ? mix(positions.getX(b), positions.getX(c), v) :
      mix(positions.getX(a), positions.getX(d), v);
    const diagonalY = flip ? mix(yAt(b), yAt(c), v) : mix(yAt(a), yAt(d), v);
    const edgeX = blendedX(x <= diagonal ? col : col + 1);
    const edgeY = x <= diagonal ? mix(yAt(a), yAt(c), v) : mix(yAt(b), yAt(d), v);
    if (Math.abs(edgeX - diagonal) < 1e-7) return diagonalY;
    return mix(diagonalY, edgeY, (x - diagonal) / (edgeX - diagonal));
  };
}

function waterMesh() {
  const cross = [-1.17, -1, -.84, -.58, 0, .58, .84, 1, 1.17];
  const pos = [], colors = [], indices = [];
  const shallow = new THREE.Color('#82b5b2'), deep = new THREE.Color('#549aa7');
  const estuary = new THREE.Color('#75aaaf');
  const fallingWater = new THREE.Color('#c2ded8');
  const color = new THREE.Color();
  for (const [row, z] of waterRows.entries()) {
    for (const [col, offset] of cross.entries()) {
      const x = riverX(z) + offset * riverWidth(z);
      color.copy(deep).lerp(shallow, smooth(Math.abs(offset), .47, 1.08) * .91);
      color.lerp(shallow, (1 - smooth(Math.abs(z - rapid), .24, 1.12)) * .51);
      const waterfallFoam = smooth(z, waterfall.start - .13, waterfall.start + .11) *
        (1 - smooth(z, waterfall.end, waterfall.end + .48));
      color.lerp(fallingWater, waterfallFoam * (.71 + .11 * Math.cos(offset * 10)));
      color.lerp(estuary, smooth(z, 15.2, 21.3) * .86);
      color.multiplyScalar(.97 + Math.sin(z * .39 + offset) * .036);
      pos.push(x, waterHeight(z), z);
      const offshore = -inland(x, z);
      const dissolve = 1 - smooth(offshore, .15, 2.2);
      const softEdges = 1 - smooth(Math.abs(offset), .63, 1.16) * smooth(offshore, .08, .92);
      colors.push(color.r, color.g, color.b, dissolve * softEdges * smooth(z, source, source + .42));
      if (row && col) {
        const a = (row - 1) * cross.length + col - 1, c = a + cross.length;
        indices.push(a, c, a + 1, a + 1, c, c + 1);
      }
    }
  }
  const mesh = new THREE.Mesh(meshGeometry(pos, colors, indices, 4),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .73, transparent: true, depthWrite: false }));
  mesh.receiveShadow = true;
  mesh.renderOrder = 1;
  return mesh;
}

function coastMesh() {
  const bands = [-.66, -.18, .18, .52, .90, 1.34, 2, 3.1, 4.8, 7.4, 12, 22, 46, 81];
  const positions = [], colors = [], indices = [];
  const deep = new THREE.Color('#538b9f'), shallow = new THREE.Color('#90bfba'), wash = new THREE.Color('#c4d4bf');
  const tint = new THREE.Color();
  for (let row = 0; row <= 248; row++) {
    const x = (row - 124) * .62;
    for (const [col, distance] of bands.entries()) {
      const z = coastZ(x) + distance;
      tint.copy(shallow).lerp(deep, smooth(distance, .45, 8.9));
      const swash = (1 - smooth(Math.abs(distance - .55), .11, .73)) * (.20 + .12 * Math.sin(x * .42));
      tint.lerp(wash, swash);
      tint.multiplyScalar(.98 + .026 * Math.sin(x * .46 + distance * .64));
      positions.push(x, seaLevel - .012, z);
      colors.push(tint.r, tint.g, tint.b);
      if (row && col) {
        const a = (row - 1) * bands.length + col - 1, b = a + bands.length;
        indices.push(a, a + 1, b, a + 1, b + 1, b);
      }
    }
  }
  const mesh = new THREE.Mesh(meshGeometry(positions, colors, indices),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .70 }));
  mesh.receiveShadow = true;
  return mesh;
}

function foamTexture() {
  const pixels = new Uint8Array(16 * 32 * 4);
  for (let y = 0; y < 32; y++) for (let x = 0; x < 16; x++) {
    const across = Math.sin(Math.PI * x / 15);
    const along = Math.sin(Math.PI * y / 31);
    pixels.set([255, 255, 255, Math.round(240 * across * along ** 1.45)], (x + y * 16) * 4);
  }
  const edge = new THREE.DataTexture(pixels, 16, 32);
  edge.magFilter = edge.minFilter = THREE.LinearFilter;
  edge.needsUpdate = true;
  return edge;
}

function streamCurrent(parent, edge) {
  const random = seeded(825);
  const pieces = [
    { count: 48, origin: waterfall.end, span: 20.8 - waterfall.end, whitewater: false },
    { count: 9, origin: source + .6, span: waterfall.start - source - .6, whitewater: false },
    { count: 29, origin: rapid - .54, span: 2.75, whitewater: true },
    { count: 26, origin: waterfall.end - .04, span: 2.15, whitewater: true },
  ].flatMap(({ count, origin, span, whitewater }) => Array.from({ length: count }, () => ({
    start: random() * span,
    side: (random() - .5) * (whitewater ? 1.64 : 1.82),
    width: .032 + random() * (whitewater ? .135 : .067),
    length: .12 + random() ** 1.5 * (whitewater ? .47 : .84),
    yaw: (random() - .5) * (whitewater ? 1.36 : .46),
    speed: .24 + random() * (whitewater ? 1.0 : .30),
    origin,
    span,
  })));
  const foam = new THREE.InstancedMesh(new THREE.PlaneGeometry().rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: '#e0f0de', map: edge, transparent: true, opacity: .61, depthWrite: false }), pieces.length);
  foam.frustumCulled = false;
  foam.renderOrder = 2;
  foam.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  parent.add(foam);
  const transform = new THREE.Object3D();
  return time => {
    for (const [index, piece] of pieces.entries()) {
      const flow = (piece.start + time * piece.speed) % piece.span;
      const z = piece.origin + flow;
      const strength = piece.span > 3 ? 1 : Math.sin(Math.PI * flow / piece.span) ** .40;
      transform.position.set(riverX(z) + piece.side, waterHeight(z) + .018, z);
      transform.rotation.y = Math.atan2(riverX(z + .05) - riverX(z - .05), .1) + piece.yaw;
      transform.scale.set(piece.width * strength, 1, piece.length * strength);
      transform.updateMatrix();
      foam.setMatrixAt(index, transform.matrix);
    }
    foam.instanceMatrix.needsUpdate = true;
  };
}

function fallingStreaks(parent, edge) {
  const random = seeded(342);
  const pieces = Array.from({ length: 42 }, () => ({
    start: random(), side: (random() - .5) * 1.72, speed: .70 + random() * .62,
    width: .043 + random() * .11, length: .42 + random() * 1.3,
  }));
  const streaks = new THREE.InstancedMesh(new THREE.PlaneGeometry(), new THREE.MeshBasicMaterial({
    color: '#f0f8e9', map: edge, transparent: true, opacity: .78, depthWrite: false, side: THREE.DoubleSide,
  }), pieces.length);
  streaks.frustumCulled = false;
  streaks.renderOrder = 3;
  streaks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  parent.add(streaks);
  const transform = new THREE.Object3D();
  const up = new THREE.Vector3(0, 1, 0);
  const direction = new THREE.Vector3();
  return time => {
    for (const [index, piece] of pieces.entries()) {
      const phase = (piece.start + time * piece.speed) % 1;
      const z = mix(waterfall.start + .03, waterfall.end, phase);
      const fade = Math.sin(phase * Math.PI) ** .65;
      direction.set(0, waterHeight(z + .025) - waterHeight(z - .025), .05).normalize();
      transform.quaternion.setFromUnitVectors(up, direction);
      transform.position.set(riverX(z) + piece.side * riverWidth(z), waterHeight(z) + .018, z + .042);
      transform.scale.set(piece.width * fade, piece.length * fade, 1);
      transform.updateMatrix();
      streaks.setMatrixAt(index, transform.matrix);
    }
    streaks.instanceMatrix.needsUpdate = true;
  };
}

export function makeTerrain({
  plannedHill = false, clearGround = () => false, gradeGround = (_x, _z, height) => height, showHillDetails = true,
  editableScenery = false, showScenery = true, groundPalette,
} = {}) {
  const group = new THREE.Group();
  const heightAt = (x, z) => gradeGround(x, z, terrainHeight(x, z, plannedHill));
  const { mesh: ground, vertexColumns, surfaceY } = landscapeMesh(heightAt, plannedHill, groundPalette);
  const blockers = [];
  group.add(ground, waterMesh(), coastMesh());
  const scenery = showScenery ? addTerrainProps(group, {
    surfaceY, blockers, plannedHill, clearGround, editableScenery, showHillDetails,
    layout: { coastZ, inland, rapid, riverX, riverWidth, riverOffset, waterfall },
  }) : null;
  const edge = foamTexture();
  const animateCurrent = streamCurrent(group, edge);
  const animateFalls = fallingStreaks(group, edge);
  return {
    group,
    ground,
    vertexColumns,
    surfaceY,
    waterAt,
    blockers,
    scenery,
    updateWater(time) {
      animateCurrent(time);
      animateFalls(time);
    },
  };
}
