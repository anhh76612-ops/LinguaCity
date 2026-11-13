import { cellKey, curveEndpoints, curveSamples, roadCurves } from './road-shapes.js';

export { cellKey };

export const X = 1;
export const Z = 2;
export const materials = ['dirt', 'stone', 'asphalt'];
export const cellAt = ({ x, z }) => ({ x: Math.floor(x), z: Math.floor(z) });
export const sameCell = (a, b) => a && b && a.x === b.x && a.z === b.z;
const axes = [X, Z];
const along = (cell, axis) => axis === X ? cell.x : cell.z;
const across = (cell, axis) => axis === X ? cell.z : cell.x;
const oriented = (axis, t, side) => axis === X ? { x: t, z: side } : { x: side, z: t };
const at = (roads, axis, t, side) => roads.get(cellKey(oriented(axis, t, side)));

export function crossSection(roads, cell, axis) {
  const t = along(cell, axis);
  let lo = across(cell, axis), hi = lo;
  while ((at(roads, axis, t, lo - 1)?.axes ?? 0) & axis) lo--;
  while ((at(roads, axis, t, hi + 1)?.axes ?? 0) & axis) hi++;
  const cells = Array.from({ length: hi - lo + 1 }, (_, i) => at(roads, axis, t, lo + i));
  return {
    id: `${axis}:${t}:${lo}`, axis, t, lo, hi, cells, width: cells.length,
    material: cells[Math.floor((cells.length - 1) / 2)].material,
    junction: cells.some(item => item.axes === (X | Z)),
  };
}

export function paintStrip(roads, from, to, material, check, tapAxis = X) {
  const dx = Math.abs(to.x - from.x), dz = Math.abs(to.z - from.z);
  const axis = dx + dz ? (dx >= dz ? X : Z) : tapAxis;
  const side = across(from, axis);
  const start = along(from, axis), end = along(to, axis);
  const cells = Array.from({ length: Math.abs(end - start) + 1 },
    (_, i) => oriented(axis, start + i * Math.sign(end - start), side));
  const next = new Map(roads);
  let width = 1;
  for (const cell of cells) {
    const key = cellKey(cell);
    if (material === 'erase') {
      next.delete(key);
      continue;
    }
    const error = check(cell);
    if (error) return { roads, cells, error };
    const old = roads.get(key);
    next.set(key, { ...cell, material: old?.material ?? material, axes: (old?.axes ?? 0) | axis });
  }
  if (material !== 'erase') {
    for (const cell of cells) {
      const section = crossSection(next, cell, axis);
      width = Math.max(width, section.width);
      if (width > 4) return { roads, cells, error: 'Đường rộng tối đa 4 ô.' };
    }
  }
  return { roads: next, cells, width, error: '' };
}

export function roadSections(roads) {
  const result = new Map();
  for (const axis of axes) {
    const ordered = [...roads.values()].filter(cell => cell.axes & axis)
      .sort((a, b) => along(a, axis) - along(b, axis) || across(a, axis) - across(b, axis));
    for (const cell of ordered) {
      if ((at(roads, axis, along(cell, axis), across(cell, axis) - 1)?.axes ?? 0) & axis) continue;
      const section = crossSection(roads, cell, axis);
      result.set(section.id, section);
    }
  }
  return [...result.values()];
}

function neighbors(roads, section, step) {
  const found = new Map();
  const t = section.t + step;
  for (let side = section.lo; side <= section.hi; side++) {
    const cell = at(roads, section.axis, t, side);
    if (!(cell?.axes & section.axis)) continue;
    const next = crossSection(roads, cell, section.axis);
    found.set(next.id, next);
  }
  return [...found.values()];
}

export function segmentAt(roads, cell) {
  const base = roads.get(cellKey(cell));
  if (!base) return [];
  const curve = base.roadCurveId && roadCurves(roads).get(base.roadCurveId);
  if (curve) return curve.cells.map(key => roads.get(key));
  if (base.curveOnly) return [];
  if (base.axes === (X | Z)) return [];
  const first = crossSection(roads, base, base.axes);
  if (first.junction) return first.cells.filter(item => item.axes === first.axis);
  const result = [...first.cells];
  for (const step of [-1, 1]) {
    let section = first;
    while (true) {
      const adjacent = neighbors(roads, section, step);
      if (adjacent.length !== 1 || adjacent[0].junction || adjacent[0].material !== first.material) break;
      [section] = adjacent;
      result.push(...section.cells);
    }
  }
  return result;
}

export function changeSurface(roads, cells, material) {
  const next = new Map(roads);
  for (const cell of cells) {
    const key = cellKey(cell);
    const old = next.get(key);
    if (old) next.set(key, { ...old, material });
  }
  return next;
}

export function laneOffsets(section, mode) {
  if (mode === 'walk') return [section.width === 1 ? .36 : section.width / 2 - .16];
  if (mode === 'motorcycle') {
    if (section.width === 1) return [.12];
    if (section.width === 3) return [1];
  }
  if (section.width === 1) return [];
  if (section.width === 4 && section.material === 'asphalt') return [.32, .91];
  return [section.width === 2 ? .29 : .39];
}

export function junctionCells(roads) {
  const pending = new Map([...roads].filter(([, cell]) => cell.axes === (X | Z)));
  const joined = new Map();
  for (const [id, start] of pending) {
    const queue = [start];
    pending.delete(id);
    for (const cell of queue) {
      joined.set(cellKey(cell), id);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const key = cellKey({ x: cell.x + dx, z: cell.z + dz });
        const adjacent = pending.get(key);
        if (!adjacent) continue;
        queue.push(adjacent);
        pending.delete(key);
      }
    }
  }
  return joined;
}

export function junctionDirections(roads, cells = junctionCells(roads)) {
  const groups = new Map();
  const offsets = [{ x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }];
  for (const [key, id] of cells) {
    if (!groups.has(id)) groups.set(id, { cells: [], directions: new Set() });
    const group = groups.get(id);
    const cell = roads.get(key);
    group.cells.push(cell);
    for (const offset of offsets) {
      const next = cellKey({ x: cell.x + offset.x, z: cell.z + offset.z });
      const neighbor = roads.get(next);
      const axis = offset.x ? X : Z;
      if (cells.get(next) !== id && (neighbor?.axes & axis)) group.directions.add(offset);
    }
  }
  return [...groups].map(([id, group]) => ({ id, cells: group.cells, directions: [...group.directions] }));
}

export function roadRoundabouts(roads, junctions = junctionCells(roads), ignoreStyle = false) {
  const circles = new Map();
  for (const { id, cells, directions } of junctionDirections(roads, junctions)) {
    if (directions.length < 3 || cells.some(cell => cell.bridgeId || cell.approachBridgeId || cell.roadCurveId ||
      (!ignoreStyle && cell.junctionStyle === 'crossing'))) continue;
    const minX = Math.min(...cells.map(cell => cell.x)), maxX = Math.max(...cells.map(cell => cell.x)) + 1;
    const minZ = Math.min(...cells.map(cell => cell.z)), maxZ = Math.max(...cells.map(cell => cell.z)) + 1;
    const width = maxX - minX, depth = maxZ - minZ;
    if (Math.min(width, depth) < 2 || cells.length !== width * depth) continue;
    const narrowApproach = directions.some(({ x, z }) => cells.some(cell => {
      const key = cellKey({ x: cell.x + x, z: cell.z + z });
      const neighbor = roads.get(key);
      const axis = x ? X : Z;
      return junctions.get(key) !== id && (neighbor?.axes & axis) && crossSection(roads, neighbor, axis).width < 2;
    }));
    if (narrowApproach) continue;
    const radius = Math.min(width, depth) / 2;
    circles.set(id, { id, x: (minX + maxX) / 2, z: (minZ + maxZ) / 2, radius,
      material: cells[0].material, width: Math.min(width, depth), cells });
  }
  return circles;
}

export function junctionStyleOptions(before, roads, affected) {
  const keys = new Set(affected.map(cellKey));
  const oldCircles = roadRoundabouts(before, undefined, true);
  const candidates = [...roadRoundabouts(roads, undefined, true).values()].filter(circle => {
    if (!circle.cells.some(cell => keys.has(cellKey(cell)))) return false;
    const previous = oldCircles.get(circle.id);
    return !previous || circle.cells.length !== previous.cells.length ||
      circle.cells.some(cell => before.get(cellKey(cell))?.axes !== cell.axes);
  });
  if (!candidates.length) return [];
  return ['roundabout', 'crossing'].map(style => {
    const variant = new Map(roads);
    for (const { cells } of candidates) for (const cell of cells) {
      variant.set(cellKey(cell), { ...cell, junctionStyle: style });
    }
    return { style, roads: variant };
  });
}

function routeRoundabouts(nodes, circles) {
  for (const circle of circles.values()) {
    const inside = [...nodes.values()].filter(node => node.junction === circle.id);
    if (!inside.length) continue;
    const ring = Array.from({ length: 16 }, (_, i) => {
      const angle = i / 16 * Math.PI * 2;
      return { ...inside[0], id: `roundabout:${circle.id}:${i}`, signal: undefined, links: [],
        x: circle.x + Math.cos(angle) * circle.radius * .68, z: circle.z - Math.sin(angle) * circle.radius * .68 };
    });
    const nearest = node => ring.reduce((closest, candidate) =>
      Math.hypot(node.x - candidate.x, node.z - candidate.z) < Math.hypot(node.x - closest.x, node.z - closest.z) ? candidate : closest);
    for (const [i, node] of ring.entries()) node.links.push({ id: ring[(i + 1) % ring.length].id, crossing: true });
    for (const node of nodes.values()) {
      if (node.junction === circle.id) {
        for (const link of node.links) {
          const target = nodes.get(link.id);
          if (target.junction === circle.id) continue;
          const exit = nearest(target);
          if (!exit.links.some(item => item.id === target.id)) exit.links.push({ id: target.id, crossing: true });
        }
        continue;
      }
      if (node.links.some(link => nodes.get(link.id)?.junction === circle.id)) {
        node.links = node.links.filter(link => nodes.get(link.id)?.junction !== circle.id);
        node.links.push({ id: nearest(node).id, crossing: true });
        node.roundaboutEntry = true;
      }
    }
    for (const node of inside) nodes.delete(node.id);
    for (const node of ring) nodes.set(node.id, node);
  }
}

function routeCurves(roads, nodes, mode, surfaceY) {
  for (const curve of roadCurves(roads).values()) {
    const inside = [...nodes.values()].filter(node => node.section.cells.every(cell => cell.roadCurveId === curve.id));
    if (!inside.length && !curve.continuous) continue;
    const members = new Set(inside.map(node => node.id));
    const section = { ...inside[0]?.section, id: curve.id, width: curve.width, material: curve.material, junction: false,
      cells: curve.cells.map(key => roads.get(key)) };
    const samples = curveSamples(curve.points);
    const lanes = [];
    for (const direction of [-1, 1]) for (const [index, offset] of laneOffsets(section, mode).entries()) {
      const path = (direction === 1 ? samples : [...samples].reverse()).map(({ x, z, dx, dz }, i) => ({
        id: `${curve.id}:${direction}:${index}:${i}`, section, index, direction, links: [],
        x: x - dz * offset * direction, z: z + dx * offset * direction,
      }));
      for (let i = 0; i < path.length - 1; i++) path[i].links.push({ id: path[i + 1].id, crossing: false });
      lanes.push(path);
    }
    if (!lanes.length) continue;
    const nearestEnd = (node, departing) => {
      const ends = lanes.map(lane => departing ? lane.at(-1) : lane[0]);
      return ends.reduce((closest, end) => Math.hypot(node.x - end.x, node.z - end.z) <
        Math.hypot(node.x - closest.x, node.z - closest.z) ? end : closest);
    };
    for (const node of nodes.values()) {
      if (members.has(node.id)) {
        for (const link of node.links) {
          if (members.has(link.id)) continue;
          const end = nearestEnd(nodes.get(link.id), true);
          if (!end.links.some(item => item.id === link.id)) end.links.push(link);
        }
      } else if (node.links.some(link => members.has(link.id))) {
        node.links = node.links.filter(link => !members.has(link.id));
        node.links.push({ id: nearestEnd(node, false).id, crossing: false });
      }
    }
    if (curve.continuous) {
      const edge = new Set();
      for (const key of curve.cells) {
        const { x, z } = roads.get(key);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) edge.add(cellKey({ x: x + dx, z: z + dz }));
      }
      const adjacent = [...nodes.values()].filter(node => !members.has(node.id) && !node.section.junction &&
        node.section.cells.some(cell => edge.has(cellKey(cell)) && !cell.bridgeId && !cell.approachBridgeId));
      const ends = curveEndpoints(curve);
      for (const path of lanes) {
        const first = path[0], last = path.at(-1);
        for (const [tip, endIndex, exiting] of [[first, first.direction === 1 ? 0 : 1, false],
          [last, first.direction === 1 ? 1 : 0, true]]) {
          const [[x, z], [dx, dz]] = ends[endIndex];
          let best, distance = 1.85;
          for (const node of adjacent) {
            const gap = Math.hypot(node.x - tip.x, node.z - tip.z);
            const outward = (node.x - x) * dx + (node.z - z) * dz;
            const heading = node.direction * (node.section.axis === X ? dx : dz);
            const dy = surfaceY ? Math.abs(surfaceY(node.x, node.z) - surfaceY(tip.x, tip.z)) : 0;
            if (gap >= distance || outward < -.05 || dy > gap * .27 + .05 ||
              (exiting ? heading < .65 : heading > -.65)) continue;
            best = node;
            distance = gap;
          }
          if (best && exiting) tip.links.push({ id: best.id, crossing: false });
          if (best && !exiting) best.links.push({ id: tip.id, crossing: false });
        }
      }
    }
    for (const path of lanes) {
      const last = path.at(-1);
      if (!last.links.length && mode === 'walk') last.links.push({ id: nearestEnd(last, false).id, crossing: true });
      for (const node of path) nodes.set(node.id, node);
    }
    for (const id of members) nodes.delete(id);
  }
}

export function buildLaneGraph(roads, mode, surfaceY) {
  const sections = roadSections(roads);
  const junctions = junctionCells(roads);
  const bySection = new Map();
  const byCell = new Map();
  const nodes = new Map();
  for (const section of sections) {
    const lanes = [];
    const junction = section.cells.map(cell => junctions.get(cellKey(cell))).find(Boolean);
    const offsets = laneOffsets(section, mode);
    for (const direction of [-1, 1]) {
      for (const [index, offset] of offsets.entries()) {
        const taper = section.cells[0].taper;
        const center = taper ? (taper.startCenter + taper.endCenter) / 2 : (section.lo + section.hi + 1) / 2;
        const side = center + offset * direction * (section.axis === X ? 1 : -1);
        const id = `${section.id}:${direction}:${index}`;
        const node = {
          ...oriented(section.axis, section.t + .5, side), id, section, direction, index, junction, links: [],
        };
        nodes.set(id, node);
        lanes.push(node);
      }
    }
    bySection.set(section.id, lanes);
    for (const cell of section.cells) {
      if (!byCell.has(cellKey(cell))) byCell.set(cellKey(cell), []);
      byCell.get(cellKey(cell)).push(section);
    }
  }
  function addLink(from, to, crossing = false) {
    if (!to || from.links.some(link => link.id === to.id)) return;
    from.links.push({ id: to.id, crossing });
  }
  for (const node of nodes.values()) {
    const { section, direction, index } = node;
    for (const next of neighbors(roads, section, direction)) {
      const aligned = bySection.get(next.id)?.filter(lane => lane.direction === direction) ?? [];
      addLink(node, aligned[Math.min(index, aligned.length - 1)]);
      if (index === 0) for (const lane of aligned.slice(laneOffsets(section, mode).length)) addLink(node, lane);
    }
    for (const cell of section.cells) {
      if (cell.axes !== (X | Z)) continue;
      for (const branch of byCell.get(cellKey(cell))) {
        if (branch.axis === section.axis) continue;
        for (const exit of bySection.get(branch.id)) {
          if (exit.index !== 0 || !neighbors(roads, branch, exit.direction).length) continue;
          addLink(node, exit, true);
        }
      }
    }
  }
  routeCurves(roads, nodes, mode, surfaceY);
  if (mode === 'car' || mode === 'motorcycle') routeRoundabouts(nodes, roadRoundabouts(roads, junctions));
  return nodes;
}
