import * as THREE from 'three';
import { closestHillRoad } from './hill-road';
import { landscapePaths } from './streets';
import { Z } from './roads';
import { terrainClearance } from './terrain';

const { lerp, smoothstep } = THREE.MathUtils;
const townLevel = .40;
const terraceLevel = 2.25;

const landingEast = [-9.25, -5.8], landingWest = [-18.5, -5.2];
const footpaths = [
  [[-1.86, -4.50], [-3.1, -4.7], [-4.3, -5.3], [-5.7, -5.65], [-7.6, -5.55], landingEast],
  [landingWest, [-19.75, -5.75], [-21.45, -5.55], [-22.5, -4.75], [-22.4, -2.0], [-20.6, -.2], [-18.9, .3]],
  [[-5.7, -5.65], [-5.35, -4.7], [-4.85, -3.55], [-5.55, -2.3], [-7.1, -1.7], [-8.4, -.7]],
  [[-7.6, -5.55], [-7.9, -6.45], [-7.25, -7.6], [-5.4, -8.0], [-4.7, -8.9]],
  [[-21.45, -5.55], [-21.9, -6.7], [-22.1, -8.25], [-21.5, -9.5]],
  [[10.45, -14.12], [9.35, -14.05], [8.2, -13.65], [7.3, -13.35], [6.4, -14.2]],
  [[10.45, -14.12], [10.0, -15.5], [9.6, -16.7], [8.8, -17.58], [7.4, -17.62], [6.55, -17.85]],
];
const bridgeCurve = curve([landingEast, [-12.5, -5.67], [-15.2, -5.44], landingWest]);

function curve(points) {
  return new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0, z)));
}

function sample(path, elevation, count) {
  return Array.from({ length: count }, (_, index) => {
    const t = index / (count - 1);
    const { x, z } = path.getPointAt(t);
    const tangent = path.getTangentAt(t);
    return { x, z, y: elevation(x, z, t), dx: tangent.x, dz: tangent.z };
  });
}

const hillCurve = curve([[8, -5.78], [8.3, -7.25], [9.2, -8.5], [10.65, -9.65], [12.05, -11.05],
  [12.45, -12.4], [11.95, -13.55], [11.15, -14.0], [10.45, -14.12]]);
export const townHillRoad = sample(hillCurve, (_x, _z, t) => {
  // Ease into the level street and terrace without shortening the climb in the middle.
  const progress = t - .02 * Math.sin(2 * Math.PI * t);
  return lerp(townLevel, terraceLevel, progress);
}, 121);

const curves = footpaths.map(curve);
const pathCenters = [...curves, bridgeCurve].flatMap(path => path.getSpacedPoints(Math.ceil(path.getLength() * 5)));
export function townPathClearance(x, z, radius) {
  return (closestHillRoad(x, z, townHillRoad)?.distance ?? Infinity) < 1.06 + radius ||
    pathCenters.some(point => Math.hypot(x - point.x, z - point.z) < .42 + radius);
}

function apron(x, z, left, right, top, bottom, feather) {
  return 1 - smoothstep(Math.hypot(Math.max(left - x, 0, x - right), Math.max(top - z, 0, z - bottom)), 0, feather);
}

export function gradeTownGround(x, z, height) {
  const dryLand = smoothstep(terrainClearance(x, z), 1.1, 3.5);
  if (!dryLand) return height;
  let ground = lerp(height, .67, dryLand * apron(x, z, -9.4, -3.0, -9.2, 1.4, 3.3));
  ground = lerp(ground, .77, dryLand * apron(x, z, -24.2, -18.5, -9.5, 1.5, 4));
  ground = lerp(ground, townLevel, dryLand * apron(x, z, -2.9, 13.1, -6.2, 9.9, 3.1));
  ground = lerp(ground, terraceLevel, dryLand * apron(x, z, 4.7, 10.8, -20.65, -10.6, 4.5));
  ground = lerp(ground, townLevel + .06, dryLand * apron(x, z, -.45, 3.9, -9.8, -6, 1.85));
  if (z >= -6) return ground;
  const road = closestHillRoad(x, z, townHillRoad);
  if (!road) return ground;
  const entrance = 1 - smoothstep(z, -7.3, -6);
  const weight = entrance * (1 - smoothstep(road.distance, 1.28, 2.22));
  return lerp(ground, road.height - .028, weight);
}

export function makeTownPaths(surfaceY) {
  const paths = curves.map(path => ({
    width: .82, samples: sample(path, surfaceY, Math.ceil(path.getLength() * 8)),
  }));
  const a = surfaceY(...landingEast), b = surfaceY(...landingWest);
  const bridge = sample(bridgeCurve, (x, z, t) => THREE.MathUtils.lerp(a, b, t) + Math.sin(t * Math.PI) * .28, 57);
  const route = [...paths[0].samples, ...bridge.slice(1), ...paths[1].samples.slice(1)];
  const group = landscapePaths(paths, bridge, surfaceY);

  function height(x, z) {
    for (let i = 1; i < bridge.length; i++) {
      const a = bridge[i - 1], b = bridge[i];
      if (x > a.x || x < b.x) continue;
      const t = (x - a.x) / (b.x - a.x);
      if (Math.abs(z - THREE.MathUtils.lerp(a.z, b.z, t)) < .60) return THREE.MathUtils.lerp(a.y, b.y, t);
    }
    return surfaceY(x, z);
  }
  function connect(graph) {
    const westSide = [...graph.values()].filter(node =>
      node.section.axis === Z && node.section.lo === -2 && node.direction === 1 && node.index === 0);
    const start = westSide.find(node => node.section.t === -5);
    const end = westSide.find(node => node.section.t === -4);
    if (!start || !end) return;
    const points = route.filter((_, i) => i % 5 === 0 || i === route.length - 1);
    const lane = direction => points.map((point, i) => ({
      x: point.x - point.dz * .17 * direction, z: point.z + point.dx * .17 * direction,
      id: `town-bridge:${direction}:${i}`, section: { id: `town-bridge:${i}`, width: 1, material: 'dirt' },
      direction, index: 0, links: [],
    }));
    const nodes = [start, ...lane(1), ...lane(-1).reverse(), end];
    for (let i = 1; i < nodes.length; i++) {
      graph.set(nodes[i].id, nodes[i]);
      nodes[i - 1].links.push({ id: nodes[i].id, crossing: false });
    }
  }
  return { group, height, connect, bridge, paths };
}

