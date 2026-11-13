import * as THREE from 'three';
import { Z, cellKey } from './roads';

export const hill = { x: 9, z: -13.2, height: 4.7 };
export const hillPoint = ([u, v]) => new THREE.Vector3(hill.x + (u + v) / Math.SQRT2, 0, hill.z + (v - u) / Math.SQRT2);
export const hillSide = (x, z) => (x - hill.x - z + hill.z) / Math.SQRT2;
export const hillDepth = (x, z) => (x - hill.x + z - hill.z) / Math.SQRT2;

const entrance = new THREE.Vector3(8, 0, -5.85);
const curve = new THREE.CatmullRomCurve3([
  entrance, new THREE.Vector3(8.01, 0, -6.55), new THREE.Vector3(8.44, 0, -7.26),
  new THREE.Vector3(9.20, 0, -7.58), new THREE.Vector3(10.24, 0, -7.38),
  ...[
    [-2.31, 6.56], [-.82, 7.97],
    [1.03, 9.30], [3.34, 9.50], [5.21, 8.89], [5.89, 7.77], [5.38, 6.59],
    [4.12, 6.18], [2.41, 6.20], [.71, 6.09], [-.29, 5.57], [-.44, 4.84],
    [-.06, 3.56], [.04, 2.09], [.09, .66],
  ].map(hillPoint),
]);
const length = curve.getLength();
export const hillRoadLength = length;
export const hillRoadWidth = 1.94;
const base = .37, top = hill.height;

export const hillRoadSamples = Array.from({ length: 125 }, (_, i) => {
  const fraction = i / 124;
  const position = curve.getPointAt(fraction);
  const tangent = curve.getTangentAt(fraction);
  const grade = Math.min(1, (fraction - .032 * Math.sin(Math.PI * 2 * fraction)) / .997);
  return { x: position.x, z: position.z, y: THREE.MathUtils.lerp(base, top, grade), dx: tangent.x, dz: tangent.z };
});

export function closestHillRoad(x, z, samples = hillRoadSamples) {
  if (x < 5 || x > 23 || z < -18 || z > -3.9) return null;
  let best = 5, height = 0, progress = 0;
  for (let i = 1; i < samples.length; i++) {
    const a = samples[i - 1], b = samples[i];
    const dx = b.x - a.x, dz = b.z - a.z;
    const t = THREE.MathUtils.clamp(((x - a.x) * dx + (z - a.z) * dz) / (dx * dx + dz * dz), 0, 1);
    const distance = (x - a.x - t * dx) ** 2 + (z - a.z - t * dz) ** 2;
    if (distance >= best) continue;
    best = distance;
    height = THREE.MathUtils.lerp(a.y, b.y, t);
    progress = (i - 1 + t) / (samples.length - 1);
  }
  return best < 5 ? { distance: Math.sqrt(best), height, progress } : null;
}

export const hillRoadMaterial = roads => {
  const first = roads.get('7,-6'), second = roads.get('8,-6');
  return (first?.axes & Z) && (second?.axes & Z) ? first.material : null;
};

export function connectHillRoad(graph, roads, mode, samples = hillRoadSamples) {
  const material = hillRoadMaterial(roads);
  if (!material) return;
  const nodes = [...graph.values()].filter(node =>
    node.section.axis === Z && node.section.t === -6 && node.section.width >= 2 &&
    node.section.cells.some(cell => cellKey(cell) === '7,-6') && node.index === 0);
  const uphill = nodes.find(node => node.direction === -1);
  const downhill = nodes.find(node => node.direction === 1);
  if (!uphill || !downhill) return;

  const spacing = mode === 'walk' ? .74 : .31;
  const makeLane = direction => samples.filter((_, index) => index % 3 === 0 || index === samples.length - 1)
    .map((point, index) => ({
      x: point.x - point.dz * spacing * direction, z: point.z + point.dx * spacing * direction,
      id: `hill:${direction}:${index}`,
      section: { id: `hill:${index}`, width: 2, material, junction: false },
      direction, index: 0, links: [],
    }));
  const climb = makeLane(1), descent = makeLane(-1).reverse();
  const last = samples.at(-1);
  const turn = {
    ...climb.at(-1), id: 'hill:turn', links: [],
    x: last.x + last.dx * .37, z: last.z + last.dz * .37,
  };
  const route = [uphill, ...climb, turn, ...descent, downhill];
  for (let i = 1; i < route.length; i++) {
    graph.set(route[i].id, route[i]);
    route[i - 1].links.push({ id: route[i].id, crossing: false });
  }
}
