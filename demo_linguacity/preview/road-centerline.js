import { X, Z, cellKey, crossSection } from './roads';
import { curveEndpoints, roadCurves, simplify } from './road-shapes';

export const roadLengthLimit = 60;
const distance = ([ax, az], [bx, bz]) => Math.hypot(bx - ax, bz - az);
export const centerlineLength = points => points.slice(1).reduce((length, point, i) =>
  length + distance(points[i], point), 0);

export function roadRange(origin, bounds) {
  const sides = [[0, bounds.left, 1], [0, bounds.right + 1, -1],
    [1, bounds.top, 1], [1, bounds.bottom + 1, -1]];
  let outline = Array.from({ length: 192 }, (_, i) => {
    const angle = i * Math.PI / 96;
    return [origin[0] + roadLengthLimit * Math.cos(angle), origin[1] + roadLengthLimit * Math.sin(angle)];
  });
  for (const [axis, edge, sign] of sides) {
    const inside = p => (p[axis] - edge) * sign >= 0;
    outline = outline.flatMap((end, i, ring) => {
      const start = ring[(i + ring.length - 1) % ring.length];
      if (inside(start) === inside(end)) return inside(end) ? [end] : [];
      const t = (edge - start[axis]) / (end[axis] - start[axis]);
      const crossing = start.map((value, n) => n === axis ? edge : value + (end[n] - value) * t);
      return inside(end) ? [crossing, end] : [crossing];
    });
  }
  return { outline, contains: p => p[0] >= bounds.left && p[0] < bounds.right + 1 &&
    p[1] >= bounds.top && p[1] < bounds.bottom + 1 &&
    Math.hypot(p[0] - origin[0], p[1] - origin[1]) <= roadLengthLimit };
}

const tile = (axis, along, across) => axis === X ? { x: along, z: across, axes: X } :
  { x: across, z: along, axes: Z };
// When the two outer cells tie, use the lower coordinate in either draw direction.
const firstSide = (position, width) => Math.ceil(position - width / 2 - .5 - 1e-9);

export function snapRoadEndpoints(points, roads, width) {
  if (points.length < 2) return points;
  points = simplify(points, .18);
  const curves = roadCurves(roads);
  const result = [...points];
  for (const [index, step] of [[0, 1], [points.length - 1, -1]]) {
    const end = points[index], inner = points[index + step];
    const length = distance(end, inner);
    if (length < .24) continue;
    const direction = [(inner[0] - end[0]) / length, (inner[1] - end[1]) / length];
    let best = .58;
    const offer = point => {
      const gap = distance(end, point);
      if (gap < best && distance(inner, point) >= .24) {
        best = gap;
        result[index] = point;
      }
    };
    for (const curve of curves.values()) for (const [point, [dx, dz]] of curveEndpoints(curve)) {
      if (direction[0] * dx + direction[1] * dz > .76) offer(point);
    }
    const x = Math.floor(end[0]), z = Math.floor(end[1]);
    for (let a = x - 1; a <= x + 1; a++) for (let b = z - 1; b <= z + 1; b++) {
      const road = roads.get(cellKey({ x: a, z: b }));
      if (!road || road.bridgeId || road.approachBridgeId || road.roadCurveId || ![X, Z].includes(road.axes)) continue;
      const axisIndex = road.axes === X ? 0 : 1;
      if (Math.abs(direction[axisIndex]) < .93) continue;
      const section = crossSection(roads, road, road.axes);
      const advance = Math.sign(direction[axisIndex]);
      if (section.width !== width || section.cells.some(cell => roads.get(cellKey(tile(
        road.axes, section.t + advance, road.axes === X ? cell.z : cell.x)))?.axes & road.axes)) continue;
      const side = (section.lo + section.hi + 1) / 2;
      offer(road.axes === X ? [section.t + .5, side] : [side, section.t + .5]);
    }
  }
  return result;
}

export function sliceRoadStroke(raw, width) {
  const points = simplify(raw.filter((p, i) => !i || distance(raw[i - 1], p) > .001), .18);
  const length = centerlineLength(points);
  const slices = [], corners = [], steps = [], footprint = new Map();
  const add = cells => {
    for (const cell of cells) {
      const key = cellKey(cell);
      footprint.set(key, { ...cell, axes: cell.axes | (footprint.get(key)?.axes ?? 0) });
    }
  };
  const result = error => ({ points, length, slices, corners, steps, cells: [...footprint.values()], error });
  if (length < .24) return result('Chọn điểm cuối khác điểm đầu.');
  if (length > roadLengthLimit + 1e-9) return result('Tim tuyến dài quá 60 đơn vị.');
  if (!Number.isInteger(width) || width < 1 || width > 4) return result('Chọn bề rộng từ 1× đến 4×.');

  for (let i = 1; i < points.length; i++) {
    const [ax, az] = points[i - 1], [bx, bz] = points[i];
    const dx = bx - ax, dz = bz - az;
    const axis = Math.abs(dx) >= Math.abs(dz) ? X : Z;
    const [a, b, side, drift] = axis === X ? [ax, bx, az, dz] : [az, bz, ax, dx];
    const first = Math.floor(a), last = Math.floor(b), sign = Math.sign(last - first);
    let previous = null;
    for (let n = 0; n <= Math.abs(last - first); n++) {
      const along = first + n * sign;
      const t = Math.max(0, Math.min(1, (along + .5 - a) / (b - a)));
      const across = firstSide(side + t * drift, width);
      const cells = Array.from({ length: width }, (_, j) => tile(axis, along, across + j));
      slices.push(cells);
      add(cells);
      const step = { segment: i, point: [ax + dx * t, az + dz * t], cells };
      steps.push(step);
      if (width === 1 && previous !== null && previous !== across) {
        const lowAlong = Math.min(along, along - sign);
        const highSide = sign > 0 ? across : previous;
        const joint = tile(axis, lowAlong, highSide);
        const lowSide = sign > 0 ? previous : across;
        const connector = [joint, tile(axis, lowAlong, lowSide)].map(cell => ({ ...cell, axes: X | Z }));
        add(connector);
        step.cells = [...cells, ...connector];
      }
      previous = across;
    }
    if (i === points.length - 1) continue;
    const [cx, cz] = points[i + 1];
    const turn = Math.abs(Math.atan2(dx * (cz - bz) - dz * (cx - bx), dx * (cx - bx) + dz * (cz - bz)));
    // Reserve a connected joint at sharp bends and at changes of the slicing axis.
    if (turn < Math.PI / 3 && axis === (Math.abs(cx - bx) >= Math.abs(cz - bz) ? X : Z)) continue;
    const left = firstSide(bx, width), top = firstSide(bz, width);
    const corner = [];
    for (let x = left; x < left + width; x++) for (let z = top; z < top + width; z++) corner.push({ x, z, axes: X | Z });
    corners.push(corner);
    add(corner);
    steps.push({ segment: i, point: points[i], cells: corner });
  }
  return result('');
}

export function roadPrefix(route, width, blockedAt) {
  const first = route.steps.findIndex(step => step.cells.some(blockedAt));
  if (first < 0) return null;
  const blocked = route.steps[first].cells.find(blockedAt);
  for (let i = first - 1; i >= 0; i--) {
    const { segment, point } = route.steps[i];
    const prefix = sliceRoadStroke([...route.points.slice(0, segment), point], width);
    if (prefix.error || prefix.cells.some(blockedAt)) continue;
    const kept = new Set(prefix.cells.map(cellKey));
    return { route: prefix, blocked, discarded: route.cells.filter(cell => !kept.has(cellKey(cell))) };
  }
  return { route: null, blocked, discarded: route.cells };
}
