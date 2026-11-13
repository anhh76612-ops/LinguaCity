import { terrainClearance, terrainHeight } from './terrain';
import { cellKey, changeSurface, crossSection, materials, paintStrip, X, Z } from './roads';

export const defaultBusLevel = 1;
export const bounds = { left: -15, right: 16, top: -15, bottom: 12 };
export const lots = [
  { x: -1, z: -4, w: 3, d: 3, gate: { x: 0, z: -1 } },
  { x: 2, z: -6, w: 4, d: 5, gate: { x: 4, z: -1 } },
  { x: -2, z: 1, w: 3, d: 3, gate: { x: -1, z: 0 } },
  { x: 1, z: 1, w: 3, d: 3, gate: { x: 2, z: 0 } },
  { x: 4, z: 2, w: 3, d: 4, gate: { x: 5, z: 1 } },
  { x: -7, z: -4, w: 3, d: 4, gate: { x: -6, z: -5 }, future: true },
  { x: -2, z: 4, w: 6, d: 3, gate: { x: 0, z: 7 }, future: true },
];

const cellSamples = [0, .5, 1].flatMap(dx => [0, .5, 1].map(dz => [dx, dz]));
const measured = new Map();
export const contains = (lot, cell) => cell.x >= lot.x && cell.x < lot.x + lot.w &&
  cell.z >= lot.z && cell.z < lot.z + lot.d;
export const lotAt = cell => lots.find(lot => contains(lot, cell));

export function measureCell(cell) {
  const key = cellKey(cell);
  if (measured.has(key)) return measured.get(key);
  const { x, z } = cell;
  const points = cellSamples.map(([dx, dz]) => [x + dx, z + dz]);
  const heights = points.map(([px, pz]) => terrainHeight(px, pz, true));
  const low = Math.min(...heights), high = Math.max(...heights);
  const measure = {
    low, high, rise: high - low,
    clearance: Math.min(...points.map(([px, pz]) => terrainClearance(px, pz))),
  };
  measured.set(key, measure);
  return measure;
}

export function zoneAt(cell) {
  const { x, z } = cell;
  const { rise, clearance } = measureCell(cell);
  if (clearance < .12) return 'water';
  if (clearance < .85) return 'buffer';
  const core = x >= -4 && x <= 11 && z >= -7 && z <= 7;
  const expansion = x >= -8 && x <= 13 && z >= -13 && z <= 9 && (x < 4 || z >= -9);
  if (rise > .72) return 'slope';
  if (rise > .38) return core || expansion ? 'terrace' : 'buffer';
  if (lotAt(cell)?.future || (x >= -6 && x <= -1 && z >= -10 && z <= -5)) return 'expansion';
  if (core) return 'core';
  if (expansion) return 'expansion';
  return 'buffer';
}

export function roadError(cell, reserved = lotAt) {
  const { x, z } = cell;
  if (x < bounds.left || x > bounds.right || z < bounds.top || z > bounds.bottom) return 'Ngoài khu vực quy hoạch.';
  if (reserved(cell)) return 'Ô này thuộc lô công trình.';
  const { rise, clearance } = measureCell(cell);
  if (clearance < .12) return 'Đường không đi qua lòng suối hoặc biển.';
  if (clearance < .55) return 'Chừa khoảng đệm ở bờ nước.';
  if (rise > .80) return 'Ô quá dốc để vẽ đường.';
  return '';
}

export function gradeError(sections, surface = (x, z) => terrainHeight(x, z, true), measure = measureCell) {
  for (const section of sections) {
    if (section.width === 1) continue;
    const edge = section.hi + 1;
    for (const distance of [0, .5, 1]) {
      const t = section.t + distance;
      const height = side => section.axis === X ? surface(t, side) : surface(side, t);
      if (Math.abs(height(section.lo) - height(edge)) / section.width > .18) {
        return 'Mặt đường xe bị dốc ngang quá 18%.';
      }
    }
    if (section.cells.some(cell => measure(cell).rise > .45)) return 'Đoạn dốc này phù hợp với lối đi bộ 1×.';
  }
  return '';
}

const span = (x1, z1, x2, z2) => [{ x: x1, z: z1 }, { x: x2, z: z2 }];
const streetStrips = [
  span(-3, -1, 11, -1), span(-3, 0, 11, 0),
  span(7, -6, 7, 5), span(8, -6, 8, 5),
  span(6, -2, 11, -2), span(9, 1, 11, 1),
  span(5, 0, 5, 1),
  span(-3, -13, -3, 0), span(-7, -13, -3, -13), span(-7, -13, -7, -5),
  span(7, 5, 7, 8), span(8, 5, 8, 8),
  span(-3, 7, 8, 7), span(-2, 8, 8, 8), span(-3, 0, -3, 7),
  span(5, 6, 5, 7),
  span(-3, -7, -3, 0), span(-2, -7, -2, 0),
  span(-7, -7, -2, -7), span(-7, -6, -2, -6),
  span(-7, -7, -7, -5), span(-6, -7, -6, -5),
];

export function starterRoads() {
  let roads = new Map();
  for (const [from, to] of streetStrips) {
    const painted = paintStrip(roads, from, to, 'dirt', roadError);
    if (painted.error) throw new Error(`${cellKey(from)} → ${cellKey(to)}: ${painted.error}`);
    roads = painted.roads;
  }
  return roads;
}

export function sampleRoads(level) {
  let roads = starterRoads();
  if (level >= 2) {
    roads = changeSurface(roads, [...roads.values()].filter(({ x, z }) => x >= 1 && (x <= 5 || z >= 2)), 'stone');
  }
  if (level >= 3) {
    roads = changeSurface(roads, [...roads.values()].filter(({ x, z }) => x >= 6 && z < 2), 'asphalt');
  }
  return roads;
}

export function roadsAtLevel(roads, level) {
  const limited = [...roads.values()].filter(cell => materials.indexOf(cell.material) >= level);
  return limited.length ? changeSurface(roads, limited, materials[level - 1]) : roads;
}

export const terraceTrail = [[-2.5, -7.5], [-2.5, -12.5], [-6.5, -12.5], [-6.5, -5.5]];

export function signalAxes(roads, section) {
  if (section.material !== 'asphalt' || !section.cells) return 0;
  for (const { x, z } of section.cells) {
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1], [0, 0]]) {
      const junction = roads.get(cellKey({ x: x + dx, z: z + dz }));
      if (junction?.axes !== (X | Z)) continue;
      const branches = [X, Z].map(axis => crossSection(roads, junction, axis));
      if (branches.every(branch => branch.width >= 2) &&
        branches.some(branch => branch.width >= 3 && branch.material === 'asphalt')) return section.axis;
    }
  }
  return 0;
}

export function lightPhase(time, axis) {
  const phase = (time + (axis === Z ? 5 : 0)) % 10;
  return phase < 4 ? 'green' : phase < 4.7 ? 'yellow' : 'red';
}
