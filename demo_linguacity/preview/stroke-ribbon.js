import { CatmullRomCurve3, Vector3 } from 'three';
import { curveSamples, sampleFillets } from './road-shapes';

const gap = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);

function simplify(points) {
  if (points.length < 3) return points;
  const a = points[0], b = points.at(-1);
  let split = 0, limit = .18;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i], length = gap(a, b);
    const t = length ? Math.max(0, Math.min(1, ((p[0] - a[0]) * (b[0] - a[0]) +
      (p[1] - a[1]) * (b[1] - a[1])) / length ** 2)) : 0;
    const distance = gap(p, [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    if (distance > limit) [split, limit] = [i, distance];
  }
  return split ? [...simplify(points.slice(0, split + 1)).slice(0, -1), ...simplify(points.slice(split))] : [a, b];
}

function intersectsTile(quad, x, z) {
  // The tile's horizontal and vertical axes are handled by the bounds of the scan.
  return quad.every((a, i) => {
    const b = quad[(i + 1) % 4];
    const nx = a[1] - b[1], nz = b[0] - a[0];
    return (x - a[0]) * nx + (z - a[1]) * nz + Math.max(0, nx) + Math.max(0, nz) > 1e-7;
  });
}

function crossesBoundary(outline) {
  for (let i = 0; i < outline.length; i++) {
    const a = outline[i], b = outline[(i + 1) % outline.length];
    for (let j = i + 2; j < outline.length; j++) {
      if (i === 0 && j === outline.length - 1) continue;
      const c = outline[j], d = outline[(j + 1) % outline.length];
      if (Math.max(a[0], b[0]) < Math.min(c[0], d[0]) || Math.max(c[0], d[0]) < Math.min(a[0], b[0]) ||
        Math.max(a[1], b[1]) < Math.min(c[1], d[1]) || Math.max(c[1], d[1]) < Math.min(a[1], b[1])) continue;
      if (cross(a, b, c) * cross(a, b, d) <= 0 && cross(c, d, a) * cross(c, d, b) <= 0) return true;
    }
  }
  return false;
}

function tightBend(samples, width) {
  return samples.slice(1, -1).some((b, i) => {
    const a = samples[i], c = samples[i + 2];
    const turn = Math.abs(cross(a, b, c));
    return turn > 1e-7 && gap(a, b) * gap(b, c) * gap(a, c) < 2 * turn * width * .60;
  });
}

export function strokeRibbon(raw, width, clearance = 0) {
  const points = raw.filter((p, i) => i === 0 || gap(p, raw[i - 1]) > .001);
  if (points.length < 2) return { error: 'Kéo dài nét để tạo tuyến.' };
  const anchors = simplify(points);
  const curve = new CatmullRomCurve3(anchors.map(([x, z]) => new Vector3(x, 0, z)), false, 'centripetal');
  let length = curve.getLength();
  if (length < .24) return { error: 'Kéo dài nét để tạo tuyến.' };
  if (length > 20) return { error: 'Mỗi nét dài tối đa 20 đơn vị. Chia tuyến thành nhiều đoạn.' };
  let samples = curve.getSpacedPoints(Math.ceil(length / .20)).map(({ x, z }) => [x, z]);
  if (tightBend(samples, width)) {
    samples = sampleFillets(anchors, width * .64);
    if (!samples || tightBend(samples, width)) return { error: 'Khúc cua quá gắt với bề rộng này. Hãy vẽ cua rộng hơn.' };
    length = samples.slice(1).reduce((total, point, i) => total + gap(point, samples[i]), 0);
  }
  const stations = curveSamples(samples);
  const edges = offset => stations.map(({ x, z, dx, dz }) => [x - dz * offset, z + dx * offset]);
  const left = edges(-width / 2), right = edges(width / 2);
  if (crossesBoundary([...left, ...[...right].reverse()])) return { error: 'Dải vẽ bị chồng lên chính nó.' };
  if (clearance && crossesBoundary([...edges(-(width + clearance) / 2), ...edges((width + clearance) / 2).reverse()])) {
    return { error: 'Chừa thêm khoảng đất giữa hai nhánh dốc.' };
  }
  const tiles = new Map();
  for (let i = 1; i < samples.length; i++) {
    const quad = [left[i - 1], left[i], right[i], right[i - 1]];
    if (quad.some((a, j) => cross(a, quad[(j + 1) % 4], quad[(j + 2) % 4]) <= 0)) {
      return { error: 'Khúc cua quá gắt với bề rộng này. Hãy vẽ cua rộng hơn.' };
    }
    const xs = quad.map(([x]) => x), zs = quad.map(([, z]) => z);
    for (let x = Math.floor(Math.min(...xs)); x < Math.ceil(Math.max(...xs)); x++) {
      for (let z = Math.floor(Math.min(...zs)); z < Math.ceil(Math.max(...zs)); z++) {
        if (intersectsTile(quad, x, z)) tiles.set(`${x},${z}`, { x, z });
      }
    }
  }
  return { points: samples, stations, cells: [...tiles.values()], width, length, error: '' };
}
