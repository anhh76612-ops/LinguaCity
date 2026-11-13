import { changeSurface, paintStrip, X, Z } from './roads';

const strips = [
  [-2, -6, 12, -6], [-2, -5, 12, -5],
  [-2, -1, 12, -1], [-2, 0, 12, 0],
  [-2, 5, 12, 5], [-2, 6, 12, 6],
  [-2, -6, -2, 6], [-1, -6, -1, 6],
  [11, -6, 11, 6], [12, -6, 12, 6],
  [5, -5, 5, -1],
  [7, -6, 7, -5], [8, -6, 8, -5],
];

export function townRoads(level) {
  let roads = new Map();
  for (const [x, z, ex, ez] of strips) {
    roads = paintStrip(roads, { x, z }, { x: ex, z: ez }, 'dirt', () => '').roads;
  }
  if (level >= 2) roads = changeSurface(roads, [...roads.values()].filter(cell => cell.z === -1 || cell.z === 0), 'stone');
  if (level >= 3) roads = changeSurface(roads, [...roads.values()].filter(cell => cell.z === 5 || cell.z === 6), 'asphalt');
  return roads;
}

export function townRoadClearance() {
  const roads = [...townRoads(1).values()];
  return (x, z, radius) => roads.some(cell => Math.hypot(Math.max(cell.x - x, 0, x - cell.x - 1),
    Math.max(cell.z - z, 0, z - cell.z - 1)) < radius);
}

export function townTrips(graph) {
  const find = (axis, t, edge, direction) => [...graph.values()].find(node =>
    node.section.axis === axis && node.section.t === t && node.section.lo === edge &&
    node.direction === direction && node.index === 0)?.id;
  return [
    { origin: find(X, 1, -6, 1), destination: 'hill:turn' },
    { origin: find(X, 7, 5, -1), destination: find(Z, 2, -2, -1) },
  ];
}
