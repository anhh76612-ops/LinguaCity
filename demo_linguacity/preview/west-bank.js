import * as THREE from 'three';
import { X, cellKey } from './roads';

const smooth = THREE.MathUtils.smoothstep;

export function gradeWestRoad(x, z, ground) {
  const blend = THREE.MathUtils.lerp;
  const mask = (p, lo, hi) => smooth(p, lo - .36, lo) * (1 - smooth(p, hi, hi + .36));
  if (x < -7.36 || x > -.64 || z < -8.85 || z > 1.42) return ground;
  const climb = .41 + .66 * THREE.MathUtils.clamp((-z - 1) / 5, 0, 1);
  let y = blend(ground, climb, mask(x, -3, -1) * smooth(z, -8.85, -7) * (1 - smooth(z, 1, 1.42)));
  const cross = 1.07 + .56 * THREE.MathUtils.clamp((-x - 3) / 4, 0, 1);
  y = blend(y, cross, mask(x, -7, -1) * smooth(z, -8.85, -7) * (1 - smooth(z, -5, -4.64)));
  const landing = blend(cross, 1.64, smooth(z, -5, -4));
  return blend(y, landing, mask(x, -7, -5) * smooth(z, -6.45, -5.75) * (1 - smooth(z, -4, -3.64)));
}

export function westTerraceWeight(x, z) {
  return smooth(x, -6.85, -5.25) * (1 - smooth(x, -.9, .45)) *
    smooth(z, -10.82, -9.14) * (1 - smooth(z, -5.12, -4.02));
}

function makeSamples(points, count) {
  const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
  return Array.from({ length: count }, (_, index) => {
    const t = index / (count - 1);
    const point = curve.getPointAt(t), tangent = curve.getTangentAt(t);
    const norm = Math.hypot(tangent.x, tangent.z);
    return { x: point.x, y: point.y, z: point.z, dx: tangent.x / norm, dz: tangent.z / norm };
  });
}

export const streamApproach = makeSamples([
  [-5.52, .47, -12.53], [-6.25, .48, -12.74], [-7.37, .54, -12.37],
  [-8.24, .56, -11.72], [-8.94, .47, -10.44], [-9.37, .33, -9.02],
  [-10.07, .12, -7.65], [-10.55, -.15, -6.58], [-11.15, -.40, -5.75],
], 54);
export const streamBridge = makeSamples([
  [-11.15, -.40, -5.75], [-12.60, -.31, -5.61], [-14.0, -.25, -5.49],
  [-15.40, -.31, -5.37], [-16.82, -.40, -5.24],
], 33);
export const westLanding = makeSamples([
  [-16.82, -.40, -5.24], [-17.39, -.31, -5.16], [-17.91, -.19, -4.86],
  [-18.34, -.07, -4.52],
], 15);

export function closestStreamPath(x, z) {
  if (x > -4.0 || x < -20 || z < -14.2 || z > -3) return null;
  let best = 4, height = 0;
  for (const samples of [streamApproach, westLanding]) {
    for (let i = 1; i < samples.length; i++) {
      const a = samples[i - 1], b = samples[i];
      const dx = b.x - a.x, dz = b.z - a.z;
      const t = THREE.MathUtils.clamp(((x - a.x) * dx + (z - a.z) * dz) / (dx * dx + dz * dz), 0, 1);
      const d = (x - a.x - dx * t) ** 2 + (z - a.z - dz * t) ** 2;
      if (d < best) {
        best = d;
        height = THREE.MathUtils.lerp(a.y, b.y, t);
      }
    }
  }
  return best < 4 ? { distance: Math.sqrt(best), height } : null;
}

export const streamPathOpen = roads => Boolean((roads.get('-6,-13')?.axes ?? 0) & X);

export function streamFloor(x, z) {
  if (x < -16.9 || x > -11.1 || z < -6.35 || z > -4.65) return null;
  const u = THREE.MathUtils.clamp((-11.15 - x) / (16.82 - 11.15), 0, 1);
  const position = u * (streamBridge.length - 1);
  const a = streamBridge[Math.floor(position)], b = streamBridge[Math.ceil(position)];
  const zCenter = THREE.MathUtils.lerp(a.z, b.z, position % 1);
  if (Math.abs(z - zCenter) > .57) return null;
  return THREE.MathUtils.lerp(a.y, b.y, position % 1) + .024;
}

export function connectStreamPath(graph, roads) {
  if (!streamPathOpen(roads)) return;
  const nodes = [...graph.values()].filter(node =>
    node.section.axis === X && node.section.cells.some(cell => cellKey(cell) === '-6,-13'));
  const approach = nodes.find(node => node.direction === -1);
  const exit = nodes.find(node => node.direction === 1);
  if (!approach || !exit) return;
  const points = [...streamApproach.filter((_, i) => i % 3 === 0),
    ...streamBridge.filter((_, i) => i % 3 === 0),
    ...westLanding.filter((_, i) => i % 2 === 0)];
  const makeLane = direction => points.map((point, i) => ({
    x: point.x - point.dz * .20 * direction, z: point.z + point.dx * .20 * direction,
    id: `bridge:${direction}:${i}`, section: { id: `bridge:${i}`, width: 1, material: 'dirt', junction: false },
    direction, index: 0, links: [],
  }));
  const route = [approach, ...makeLane(1), ...makeLane(-1).reverse(), exit];
  for (let i = 1; i < route.length; i++) {
    graph.set(route[i].id, route[i]);
    route[i - 1].links.push({ id: route[i].id, crossing: false });
  }
}
