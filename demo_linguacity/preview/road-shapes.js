export const cellKey = ({ x, z }) => `${x},${z}`;

const distance = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const unit = (a, b) => {
  const length = distance(a, b);
  return [(b[0] - a[0]) / length, (b[1] - a[1]) / length];
};
const translated = (p, direction, amount) => [p[0] + direction[0] * amount, p[1] + direction[1] * amount];

export function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const first = points[0], last = points.at(-1);
  const length = distance(first, last);
  const direction = length ? unit(first, last) : [0, 0];
  let index = -1, deviation = tolerance;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, z] = [points[i][0] - first[0], points[i][1] - first[1]];
    const t = Math.max(0, Math.min(length, x * direction[0] + z * direction[1]));
    const error = distance(points[i], translated(first, direction, t));
    if (error > deviation) [index, deviation] = [i, error];
  }
  return index < 0 ? [first, last] : [...simplify(points.slice(0, index + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(index), tolerance)];
}

export function sampleFillets(points, radius) {
  const samples = [points[0]];
  const straightTo = end => {
    const start = samples.at(-1);
    const count = Math.ceil(distance(start, end) / .18);
    for (let i = 1; i <= count; i++) samples.push(translated(start, [end[0] - start[0], end[1] - start[1]], i / count));
  };
  let previousTrim = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [previous, p, next] = points.slice(i - 1, i + 2);
    const a = unit(previous, p), b = unit(p, next);
    const turn = Math.atan2(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1]);
    const trim = radius * Math.tan(Math.abs(turn) / 2);
    if (previousTrim + trim >= distance(previous, p) - .05 || trim >= distance(p, next) - .05) return null;
    previousTrim = trim;
    if (trim < .01) continue;
    const start = translated(p, a, -trim);
    const center = translated(start, [-a[1], a[0]], Math.sign(turn) * radius);
    const angle = Math.atan2(start[1] - center[1], start[0] - center[0]);
    const count = Math.ceil(Math.abs(turn) * radius / .16);
    straightTo(start);
    for (let n = 1; n <= count; n++) {
      const t = angle + turn * n / count;
      samples.push(translated(center, [Math.cos(t), Math.sin(t)], radius));
    }
  }
  straightTo(points.at(-1));
  return samples;
}

export function curveSamples(points) {
  return points.map(([x, z], i) => {
    const [dx, dz] = unit(points[Math.max(0, i - 1)], points[Math.min(points.length - 1, i + 1)]);
    return { x, z, dx, dz };
  });
}

export function curveEndpoints({ points }) {
  const [first, second] = points;
  const last = points.at(-1);
  return [[first, unit(second, first)], [last, unit(points.at(-2), last)]];
}

export function roadCurves(roads) {
  const groups = new Map();
  for (const cell of roads.values()) {
    if (!cell.roadCurveId) continue;
    if (!groups.has(cell.roadCurveId)) groups.set(cell.roadCurveId, []);
    groups.get(cell.roadCurveId).push(cell);
  }
  const curves = new Map();
  for (const [id, cells] of groups) {
    const curve = cells.find(cell => cell.roadCurve)?.roadCurve;
    if (curve?.cells?.length === cells.length && curve.points?.length > 1 &&
      curve.cells.every(key => roads.get(key)?.roadCurveId === id) &&
      cells.every(cell => cell.material === cells[0].material && !cell.bridgeId && !cell.approachBridgeId)) {
      curves.set(id, { ...curve, material: cells[0].material });
    }
  }
  return curves;
}

export function withoutRoadCurves(roads, keys) {
  const ids = new Set(keys.map(key => roads.get(typeof key === 'string' ? key : cellKey(key))?.roadCurveId).filter(Boolean));
  if (!ids.size) return roads;
  const next = new Map(roads);
  for (const [key, cell] of roads) {
    if (!ids.has(cell.roadCurveId)) continue;
    if (cell.curveOnly) next.delete(key);
    else {
      const { roadCurveId, roadCurve, ...plain } = cell;
      next.set(key, plain);
    }
  }
  return next;
}

export function planContinuousRoad(roads, ribbon, material, { obstacle, waterAt, surfaceY }) {
  const { cells, stations, points, width } = ribbon;
  const fail = (error, errorCell) => ({ ...ribbon, roads, changes: [], error, errorCell });
  for (const cell of cells) {
    const error = obstacle(cell);
    if (error) return fail(error, cell);
    if (roads.has(cellKey(cell))) return fail('Dải cong chạm tuyến có sẵn. Hãy dùng tuyến theo ô tại điểm nối.', cell);
  }
  for (const [i, point] of stations.entries()) {
    const previous = stations[i - 1], cell = { x: Math.floor(point.x), z: Math.floor(point.z) };
    if (previous && Math.abs(surfaceY(previous.x, previous.z) - surfaceY(point.x, point.z)) >
      Math.hypot(point.x - previous.x, point.z - previous.z) * (width === 1 ? .35 : .27)) {
      return fail('Dải cong vượt giới hạn độ dốc dọc.', cell);
    }
    const heights = [];
    const intervals = Math.ceil(width / .20);
    for (let j = 0; j <= intervals; j++) {
      const offset = width * (j / intervals - .5);
      const x = point.x - point.dz * offset, z = point.z + point.dx * offset;
      if (waterAt(x, z)) return fail('Dải cong chạm nước. Kéo qua hai bờ để thử phương án cầu.', cell);
      heights.push(surfaceY(x, z));
    }
    if (Math.max(...heights) - Math.min(...heights) > width * (width === 1 ? .28 : .18)) {
      return fail('Dải cong vượt giới hạn độ dốc ngang.', cell);
    }
  }
  const next = new Map(roads);
  const keys = cells.map(cellKey);
  const id = `ribbon:${keys[0]}`;
  for (const cell of cells) next.set(cellKey(cell), { ...cell, material, axes: 0, curveOnly: true, roadCurveId: id });
  next.get(keys[0]).roadCurve = { id, points, width, cells: keys, continuous: true };
  return { ...ribbon, roads: next, changes: [], error: '' };
}

export function planRoundedRoad(before, after, stroke, width, { blocked = () => false, waterAt = () => null, surfaceY } = {}) {
  const unavailable = error => ({ roads: after, error, rounded: false });
  if (stroke.length < 3 || new Set(stroke.map(cellKey)).size !== stroke.length) return unavailable('');
  const keys = new Set();
  const stations = stroke.map((cell, i) => {
    const previous = stroke[i - 1], next = stroke[i + 1];
    const eastWest = previous && previous.x !== cell.x || next && next.x !== cell.x;
    const northSouth = previous && previous.z !== cell.z || next && next.z !== cell.z;
    for (let x = 0; x < (northSouth ? width : 1); x++) for (let z = 0; z < (eastWest ? width : 1); z++) {
      keys.add(cellKey({ x: cell.x + x, z: cell.z + z }));
    }
    return [cell.x + (northSouth ? width / 2 : .5), cell.z + (eastWest ? width / 2 : .5)];
  });
  if (![...keys].every(key => after.has(key) && !before.has(key) && !after.get(key).bridgeId && !after.get(key).approachBridgeId)) {
    return unavailable('Giữ đoạn đường theo ô tại điểm nối hoặc đường dẫn cầu.');
  }
  if (stations.every(p => p[0] === stations[0][0]) || stations.every(p => p[1] === stations[0][1])) return unavailable('');
  let samples = null;
  for (const tolerance of [.64, .90, 1.1]) {
    const points = simplify(stations, tolerance);
    points[0] = translated(points[0], unit(stations[1], stations[0]), .5);
    points[points.length - 1] = translated(points.at(-1), unit(stations.at(-2), stations.at(-1)), .5);
    samples = sampleFillets(points, width * .63);
    if (samples) break;
  }
  if (!samples) return unavailable('Cần chừa thêm chỗ để bo cua theo bề rộng đường.');

  const next = new Map(after);
  const id = `curve:${cellKey(stroke[0])}:${cellKey(stroke.at(-1))}`;
  const material = after.get(cellKey(stroke[0])).material;
  const sampleBands = curveSamples(samples);
  for (const [i, point] of sampleBands.entries()) {
    const p = sampleBands[i - 1];
    if (surfaceY && p && Math.abs(surfaceY(p.x, p.z) - surfaceY(point.x, point.z)) > Math.hypot(p.x - point.x, p.z - point.z) * (width === 1 ? .35 : .27)) {
      return unavailable('Đường cong vượt giới hạn độ dốc dọc.');
    }
    if (surfaceY && Math.abs(surfaceY(point.x - point.dz * width / 2, point.z + point.dx * width / 2) -
      surfaceY(point.x + point.dz * width / 2, point.z - point.dx * width / 2)) > width * (width === 1 ? .28 : .18)) {
      return unavailable('Đường cong vượt giới hạn độ dốc ngang.');
    }
    for (let side = 0; side <= width * 8; side++) {
      const offset = (width / 2 - .015) * (side / (width * 8) * 2 - 1);
      const endpoint = i === 0 ? .001 : i === sampleBands.length - 1 ? -.001 : 0;
      const x = point.x - point.dz * offset + point.dx * endpoint, z = point.z + point.dx * offset + point.dz * endpoint;
      const cell = { x: Math.floor(x), z: Math.floor(z) };
      const key = cellKey(cell);
      if (waterAt(x, z)) return unavailable('Đường cong phải nằm trên đất khô.');
      if (keys.has(key) || next.get(key)?.roadCurveId === id) continue;
      if (after.has(key) || blocked(cell)) return unavailable('Thiếu khoảng trống cạnh khúc cua.');
      next.set(key, { ...cell, material, axes: 0, curveOnly: true, roadCurveId: id });
    }
  }
  for (const key of keys) next.set(key, { ...next.get(key), roadCurveId: id });
  const allKeys = [...next].filter(([, cell]) => cell.roadCurveId === id).map(([key]) => key);
  const anchor = cellKey(stroke[0]);
  next.set(anchor, { ...next.get(anchor), roadCurve: { id, points: samples, width, cells: allKeys } });
  return { roads: next, cells: allKeys.map(key => next.get(key)), error: '', rounded: true };
}
