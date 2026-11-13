import * as THREE from 'three';
import { bake, box, cyl, seeded } from '../../city-web/src/core/shapes';
import { X, Z, cellKey, crossSection, junctionCells, junctionDirections, roadRoundabouts, roadSections } from './roads';
import { curveSamples, roadCurves } from './road-shapes';
import { roadVisuals } from './road-visual';
import { lightPhase, lotAt, signalAxes } from './planning-layout';
import { hillRoadMaterial, hillRoadSamples, hillRoadWidth } from './hill-road';
import { streamApproach, streamBridge, streamPathOpen, westLanding } from './west-bank';
import { makeDirectionSign } from '../models/direction-sign';
import { buildRoadBridges } from './road-structures';
import { asphaltEdgeLine, asphaltLaneOffsets, roadPalette as palette } from './road-style';

const edgePaint = new THREE.Color(asphaltEdgeLine);
const sides = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const corner = [[0, 0], [1, 0], [1, 1], [0, 1]];
const groundMaterial = new THREE.MeshStandardMaterial({
  vertexColors: true, roughness: .94, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
});

function mesh(positions, colors, indices, material = groundMaterial, uvs = null) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  if (uvs?.length) geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const item = new THREE.Mesh(geometry, material);
  item.receiveShadow = true;
  return item;
}

function addPolygon(data, ring, center, color, surfaceY, elevation, edgeColor = color, subdivisions = 4) {
  const { positions, colors, indices } = data;
  const first = positions.length / 3;
  const add = (x, z, tint) => {
    positions.push(x, surfaceY(x, z) + elevation, z);
    colors.push(tint.r, tint.g, tint.b);
  };
  add(...center, color);
  const outline = [];
  for (const [index, point] of ring.entries()) {
    const next = ring[(index + 1) % ring.length];
    for (let i = 0; i < subdivisions; i++) {
      const part = i / subdivisions;
      outline.push([THREE.MathUtils.lerp(point[0], next[0], part), THREE.MathUtils.lerp(point[1], next[1], part)]);
    }
  }
  for (const [x, z] of outline) add((x + center[0]) / 2, (z + center[1]) / 2, color);
  for (const [x, z] of outline) add(x, z, edgeColor);
  for (let i = 0; i < outline.length; i++) {
    const inner = first + 1 + i;
    const nextInner = first + 1 + (i + 1) % outline.length;
    const outer = inner + outline.length, nextOuter = nextInner + outline.length;
    indices.push(first, nextInner, inner, inner, nextInner, outer, outer, nextInner, nextOuter);
  }
}

function rectangle(data, x, z, w, d, color, surfaceY, height) {
  const points = corner.map(([a, b]) => [x + (a - .5) * w, z + (b - .5) * d]);
  addPolygon(data, points, [x, z], color, surfaceY, height);
}

const stoneTints = ['#8d8c82', '#9c9b90', '#aaa79c', '#b5b0a2', '#96948b'];
const gravelTints = ['#a38f72', '#b7a589', '#c1ac88'];
const grassTints = ['#78834c', '#96974e', '#6e7c46'];
const chippedCorners = [[-.35, -.5], [.32, -.5], [.5, -.24], [.48, .28],
  [.26, .5], [-.36, .47], [-.5, .25], [-.49, -.24]];

function cobble(data, x, z, dx, dz, width, length, colors, height, surfaceY, random) {
  const shade = new THREE.Color(colors[Math.floor(random() * colors.length)]);
  const points = chippedCorners.map(([a, b]) => {
    const u = (a + (random() - .5) * .07) * length;
    const v = (b + (random() - .5) * .07) * width;
    return [x + u * dx - v * dz, z + u * dz + v * dx];
  });
  addPolygon(data, points, [x, z], shade, surfaceY, height, shade.clone().multiplyScalar(.72), 1);
}

function stoneTile(details, x, z, outline, surfaceY, random) {
  const left = outline[0][0], right = outline[1][0], front = outline[0][1], back = outline[2][1];
  const rows = 5, rowDepth = (back - front) / rows;
  const tileWidth = (right - left) / 4;
  for (let row = 0; row < rows; row++) {
    const start = left - (row % 2) * tileWidth / 2;
    for (let col = 0; col < 5; col++) {
      const lo = Math.max(left, start + col * tileWidth);
      const hi = Math.min(right, start + (col + 1) * tileWidth);
      if (hi - lo < .08) continue;
      cobble(details, x + (lo + hi) / 2, z + front + (row + .5) * rowDepth, 1, 0,
        rowDepth - .025, hi - lo - .027, stoneTints, .053 + random() * .012, surfaceY, random);
    }
  }
}

function dirtVerge(details, x, z, dx, dz, surfaceY, random, lift = .05) {
  cobble(details, x, z, dx, dz, .036 + random() * .034, .04 + random() * .044,
    gravelTints, lift, surfaceY, random);
  if (random() < .46) return;
  const grass = new THREE.Color(grassTints[Math.floor(random() * grassTints.length)]);
  const y = surfaceY(x, z) + lift - .015;
  for (const blade of [-1, 0, 1]) {
    const angle = random() * Math.PI * 2;
    const sx = Math.cos(angle) * .017, sz = Math.sin(angle) * .017;
    const height = .065 + random() * .07;
    const index = details.positions.length / 3;
    const bx = x + blade * .018;
    const vertices = [bx - sx, y, z - sz, bx + sx, y, z + sz,
      bx + sx * 2 + blade * .023, y + height, z + sz * 2];
    const colors = [grass.r * .68, grass.g * .68, grass.b * .68, grass.r, grass.g, grass.b,
      grass.r * 1.15, grass.g * 1.15, grass.b * 1.15];
    details.positions.push(...vertices, ...vertices);
    details.colors.push(...colors, ...colors);
    details.indices.push(index, index + 1, index + 2, index + 5, index + 4, index + 3);
  }
}

const batches = () => ({ positions: [], colors: [], indices: [], uvs: [] });
const sectionPoint = (section, t, side) => section.axis === X ? [t, side] : [side, t];

function routeBand(data, samples, left, right, tint, lift, surfaceY) {
  const first = data.positions.length / 3;
  let along = 0;
  for (const [index, point] of samples.entries()) {
    if (index) along += Math.hypot(point.x - samples[index - 1].x, point.z - samples[index - 1].z);
    for (const [sideIndex, offset] of [left, right].entries()) {
      const side = offset * (point.scale ?? 1);
      const x = point.x - point.dz * side, z = point.z + point.dx * side;
      data.positions.push(x, (surfaceY ? surfaceY(x, z, point) : point.y) + lift, z);
      const color = typeof tint === 'function' ? tint(x, z) : tint;
      data.colors.push(color.r, color.g, color.b);
      if (data.uvs) data.uvs.push(along, sideIndex);
    }
    if (index) {
      const a = first + (index - 1) * 2;
      data.indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
}

function routePoint(start, end, t) {
  const at = key => THREE.MathUtils.lerp(start[key], end[key], t);
  return { x: at('x'), z: at('z'), dx: at('dx'), dz: at('dz'),
    y: start.y === undefined ? undefined : at('y'),
    scale: THREE.MathUtils.lerp(start.scale ?? 1, end.scale ?? 1, t) };
}

function routeDetails(samples, spacing, place) {
  let distance = 0, next = spacing / 2;
  for (let i = 1; i < samples.length; i++) {
    const start = samples[i - 1], end = samples[i];
    const length = Math.hypot(end.x - start.x, end.z - start.z);
    if (!length) continue;
    while (next < distance + length) {
      place(routePoint(start, end, (next - distance) / length));
      next += spacing;
    }
    distance += length;
  }
}

function dirtRoute(samples) {
  const result = [samples[0]];
  for (let i = 1; i < samples.length; i++) {
    const start = samples[i - 1], end = samples[i];
    const count = Math.ceil(Math.hypot(end.x - start.x, end.z - start.z) / .2);
    for (let step = 1; step <= count; step++) {
      const point = routePoint(start, end, step / count);
      if (i < samples.length - 1 || step < count) {
        point.scale = 1 + .026 * Math.sin(point.x * 6.7 + point.z * 8.3)
          + .016 * Math.sin(point.x * 11.3 - point.z * 5.6);
      }
      result.push(point);
    }
  }
  return result;
}

function routeTexture(details, samples, width, surfaceY, material, height) {
  const { x, z } = samples[0];
  const random = seeded(Math.round(x * 173 + z * 271) >>> 0);
  let row = 0;
  routeDetails(samples, material === 'stone' ? .195 : .31, point => {
    const ground = (x, z) => surfaceY ? surfaceY(x, z, point) : point.y;
    const { x, z, dx, dz } = point;
    const half = width * point.scale / 2;
    if (material === 'stone') {
      const count = Math.ceil(half * 2 / .24);
      const step = (half * 2 - .12) / count;
      const first = -half + .06 - (row++ % 2) * step / 2;
      for (let i = 0; i <= count; i++) {
        const lo = Math.max(first + i * step, -half + .06);
        const hi = Math.min(first + (i + 1) * step, half - .06);
        if (hi - lo < .07) continue;
        const offset = (lo + hi) / 2;
        cobble(details, x - dz * offset, z + dx * offset, dx, dz,
          hi - lo - .027, .17, stoneTints, height + random() * .009, ground, random);
      }
    } else {
      for (const side of [-1, 1]) {
        if (random() < .47) continue;
        const offset = side * (half - .04 - random() * .09);
        dirtVerge(details, x - dz * offset, z + dx * offset, dx, dz, ground, random, height);
      }
    }
  });
}

function dashedRoute(samples, draw) {
  let distance = 0;
  for (let i = 1; i < samples.length; i++) {
    const start = samples[i - 1], end = samples[i];
    const length = Math.hypot(end.x - start.x, end.z - start.z);
    if (!length) continue;
    for (let step = Math.floor(distance); step < distance + length; step++) {
      const from = Math.max(distance, step + .23);
      const to = Math.min(distance + length, step + .77);
      if (from < to) draw([routePoint(start, end, (from - distance) / length),
        routePoint(start, end, (to - distance) / length)]);
    }
    distance += length;
  }
}

function addRoadCurve(surface, details, { points, width, material, continuous }, surfaceY) {
  const centerline = curveSamples(points);
  const samples = material === 'dirt' ? dirtRoute(centerline) : centerline;
  const [base, edge, ink] = palette[material].map(value => new THREE.Color(value));
  const half = width / 2 - (continuous ? 0 : .02);
  routeBand(surface, samples, -half, half, base, .04, surfaceY);
  const band = (points, center, thickness, color) => routeBand(details, points,
    center - thickness / 2, center + thickness / 2, color, .055, surfaceY);
  for (const sign of [-1, 1]) {
    band(samples, sign * (half - .05), .10, material === 'dirt' ? base.clone().lerp(edge, .46) : edge);
    if (material === 'asphalt') band(samples, sign * (half - .14), .038, edgePaint);
  }
  if (material !== 'asphalt') routeTexture(details, samples, half * 2, surfaceY, material, .062);
  if (width < 2) return;
  if (material === 'dirt') for (const offset of [-.39, .39]) band(samples, offset, .08, edge.clone().lerp(base, .5));
  if (material === 'asphalt') dashedRoute(samples, points => {
    for (const offset of asphaltLaneOffsets(width)) band(points, offset, .055, ink);
  });
}

function roundedTileUnion(cells, radius) {
  const occupied = new Set(cells);
  const edges = new Map();
  const add = (from, to) => edges.set(`${from[0]},${from[1]}`, { from, to });
  for (const key of cells) {
    const [x, z] = key.split(',').map(Number);
    if (!occupied.has(`${x},${z - 1}`)) add([x, z], [x + 1, z]);
    if (!occupied.has(`${x + 1},${z}`)) add([x + 1, z], [x + 1, z + 1]);
    if (!occupied.has(`${x},${z + 1}`)) add([x + 1, z + 1], [x, z + 1]);
    if (!occupied.has(`${x - 1},${z}`)) add([x, z + 1], [x, z]);
  }
  const first = edges.values().next().value;
  if (!first) return null;
  const ring = [first.from];
  let edge = first;
  while (edge) {
    ring.push(edge.to);
    edges.delete(`${edge.from[0]},${edge.from[1]}`);
    if (edge.to[0] === ring[0][0] && edge.to[1] === ring[0][1]) break;
    edge = edges.get(`${edge.to[0]},${edge.to[1]}`);
  }
  if (ring.length < 4 || ring.at(-1)[0] !== ring[0][0] || ring.at(-1)[1] !== ring[0][1]) return null;
  ring.pop();
  const signedArea = ring.reduce((sum, point, index) => {
    const next = ring[(index + 1) % ring.length];
    return sum + point[0] * next[1] - next[0] * point[1];
  }, 0);
  const winding = Math.sign(signedArea) || 1;
  const corners = ring.map((point, index) => {
    const previous = ring[(index + ring.length - 1) % ring.length];
    const next = ring[(index + 1) % ring.length];
    const cross = (point[0] - previous[0]) * (next[1] - point[1]) -
      (point[1] - previous[1]) * (next[0] - point[0]);
    if (cross * winding <= 1e-5) return { point, incoming: point, outgoing: point, round: false };
    const incoming = [point[0] + (previous[0] - point[0]) * radius, point[1] + (previous[1] - point[1]) * radius];
    const outgoing = [point[0] + (next[0] - point[0]) * radius, point[1] + (next[1] - point[1]) * radius];
    return { point, incoming, outgoing, round: true };
  });
  const shape = new THREE.Shape();
  shape.moveTo(...corners[0].outgoing);
  for (let i = 1; i < corners.length; i++) {
    const corner = corners[i];
    shape.lineTo(...corner.incoming);
    if (corner.round) shape.quadraticCurveTo(...corner.point, ...corner.outgoing);
  }
  shape.lineTo(...corners[0].incoming);
  if (corners[0].round) shape.quadraticCurveTo(...corners[0].point, ...corners[0].outgoing);
  shape.closePath();
  return shape;
}

function addRoundedGridVisual(group, details, visual, surfaceY) {
  let shape;
  if (visual.outline?.length >= 3) {
    shape = new THREE.Shape();
    shape.moveTo(...visual.outline[0]);
    for (let i = 1; i < visual.outline.length; i++) shape.lineTo(...visual.outline[i]);
    shape.closePath();
  } else {
    shape = roundedTileUnion(visual.cells, visual.radius);
  }
  if (!shape) return;
  // Subdivide triangles so the mesh conforms to sloped/graded terrain without sinking
  const rawGeo = new THREE.ShapeGeometry(shape, 4).toNonIndexed();
  const rawPos = rawGeo.attributes.position;
  const positions = [];
  const pushTri = (ax, az, bx, bz, cx, cz, depth = 0) => {
    const ab = Math.hypot(bx - ax, bz - az);
    const bc = Math.hypot(cx - bx, cz - bz);
    const ca = Math.hypot(ax - cx, az - cz);
    if (depth < 3 && Math.max(ab, bc, ca) > .65) {
      const mx = (ax + bx) / 2, mz = (az + bz) / 2;
      const nx = (bx + cx) / 2, nz = (bz + cz) / 2;
      const px = (cx + ax) / 2, pz = (cz + az) / 2;
      pushTri(ax, az, mx, mz, px, pz, depth + 1);
      pushTri(mx, mz, bx, bz, nx, nz, depth + 1);
      pushTri(px, pz, nx, nz, cx, cz, depth + 1);
      pushTri(mx, mz, nx, nz, px, pz, depth + 1);
      return;
    }
    for (const [x, z] of [[ax, az], [bx, bz], [cx, cz]]) {
      positions.push(x, surfaceY(x, z) + .041, z);
    }
  };
  for (let i = 0; i < rawPos.count; i += 3) {
    pushTri(
      rawPos.getX(i), rawPos.getY(i),
      rawPos.getX(i + 1), rawPos.getY(i + 1),
      rawPos.getX(i + 2), rawPos.getY(i + 2),
    );
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const [p0, p1] = visual.points;
  const len = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) || 1;
  const dx = (p1[0] - p0[0]) / len, dz = (p1[1] - p0[1]) / len;
  const count = positions.length / 3;
  const uvs = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const x = positions[i * 3], z = positions[i * 3 + 2];
    const rx = x - p0[0], rz = z - p0[1];
    uvs[i * 2] = rx * dx + rz * dz;
    uvs[i * 2 + 1] = THREE.MathUtils.clamp((-rx * dz + rz * dx) / visual.width + .5, 0, 1);
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  const [base, edge, ink] = palette[visual.material].map(value => new THREE.Color(value));
  const item = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    color: base, roughness: .94, side: THREE.DoubleSide,
    polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
  }));
  item.name = 'Đường bo tròn theo ô';
  item.receiveShadow = true;
  group.add(item);

  // Add smooth wheel tracks / lane markings along the filleted visual centerline
  if (details && visual.points?.length >= 2) {
    const centerline = curveSamples(visual.points);
    if (visual.material === 'dirt' && visual.width >= 2) {
      const trackColor = edge.clone().lerp(base, .5);
      for (const offset of [-.34, .34]) {
        routeBand(details, centerline, offset - .04, offset + .04, trackColor, .055, surfaceY);
      }
    } else if (visual.material === 'asphalt' && visual.width >= 2) {
      dashedRoute(centerline, pts => {
        for (const offset of asphaltLaneOffsets(visual.width)) {
          routeBand(details, pts, offset - .0275, offset + .0275, ink, .055, surfaceY);
        }
      });
    }
  }
}

function addRoundedStripVisual(surface, details, visual, surfaceY) {
  const [base, edge, ink] = palette[visual.material].map(value => new THREE.Color(value));
  const { leftEdge, rightEdge, triangles, width, material } = visual;
  const baseIndex = surface.positions.length / 3;
  const leftStart = baseIndex;
  for (const [x, z, u, v] of leftEdge) {
    surface.positions.push(x, surfaceY(x, z) + .04, z);
    surface.colors.push(base.r, base.g, base.b);
    surface.uvs.push(u, v);
  }
  const rightStart = surface.positions.length / 3;
  for (const [x, z, u, v] of rightEdge) {
    surface.positions.push(x, surfaceY(x, z) + .04, z);
    surface.colors.push(base.r, base.g, base.b);
    surface.uvs.push(u, v);
  }
  for (const [t0, i0, t1, i1, t2, i2] of triangles) {
    surface.indices.push(
      (t0 === 'L' ? leftStart : rightStart) + i0,
      (t1 === 'L' ? leftStart : rightStart) + i1,
      (t2 === 'L' ? leftStart : rightStart) + i2,
    );
  }
  const edgeSamples = (pts, sign) => pts.map(([x, z], i) => {
    const prev = pts[Math.max(0, i - 1)], next = pts[Math.min(pts.length - 1, i + 1)];
    const len = Math.hypot(next[0] - prev[0], next[1] - prev[1]) || 1;
    const dx = (next[0] - prev[0]) / len, dz = (next[1] - prev[1]) / len;
    return { x, z, dx, dz, scale: sign };
  });
  const borderColor = material === 'dirt' ? base.clone().lerp(edge, .46) : edge;
  routeBand(details, edgeSamples(leftEdge, 1), 0, .10, borderColor, .055, surfaceY);
  routeBand(details, edgeSamples(rightEdge, 1), -.10, 0, borderColor, .055, surfaceY);
  if (material === 'asphalt') {
    routeBand(details, edgeSamples(leftEdge, 1), .12, .158, edgePaint, .055, surfaceY);
    routeBand(details, edgeSamples(rightEdge, 1), -.158, -.12, edgePaint, .055, surfaceY);
    if (width >= 2) {
      const mid = leftEdge.map(([lx, lz], i) => {
        const rx = rightEdge[Math.min(i, rightEdge.length - 1)][0];
        const rz = rightEdge[Math.min(i, rightEdge.length - 1)][1];
        return [(lx + rx) / 2, (lz + rz) / 2];
      });
      dashedRoute(curveSamples(mid), pts => {
        for (const offset of asphaltLaneOffsets(width)) {
          routeBand(details, pts, offset - .0275, offset + .0275, ink, .055, surfaceY);
        }
      });
    }
  }
}

export function ribbonLayer(ribbon, surfaceY, color, opacity, outlineColor = '#fffdf5') {
  const data = batches();
  const tint = typeof color === 'function' ? color : new THREE.Color(color);
  routeBand(data, ribbon.stations, -ribbon.width / 2, ribbon.width / 2, tint, .10, surfaceY);
  const material = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity, depthWrite: false });
  const fill = mesh(data.positions, data.colors, data.indices, material);
  fill.renderOrder = 5;
  const positions = [];
  for (const side of [-ribbon.width / 2, ribbon.width / 2]) {
    const edge = ribbon.stations.map(point => {
      const x = point.x - point.dz * side, z = point.z + point.dx * side;
      return [x, surfaceY(x, z, point) + .105, z];
    });
    for (let i = 1; i < edge.length; i++) positions.push(...edge[i - 1], ...edge[i]);
    if (side < 0) {
      for (const point of [ribbon.stations[0], ribbon.stations.at(-1)]) {
        const x = point.x - point.dz * ribbon.width / 2, z = point.z + point.dx * ribbon.width / 2;
        positions.push(point.x - point.dz * side, surfaceY(point.x - point.dz * side, point.z + point.dx * side, point) + .105,
          point.z + point.dx * side, x, surfaceY(x, z, point) + .105, z);
      }
    }
  }
  const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const outline = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({
    color: outlineColor, transparent: true, opacity: .84, depthWrite: false,
  }));
  outline.renderOrder = 7;
  return new THREE.Group().add(fill, outline);
}

function addRoundabout(details, { x, z, radius, material }, surfaceY) {
  const ringPoint = (a, scale) => [x + Math.cos(a) * radius * scale, z + Math.sin(a) * radius * scale];
  const outline = scale => Array.from({ length: 32 }, (_, i) => ringPoint(i * Math.PI / 16, scale));
  const edging = new THREE.Color(material === 'dirt' ? '#aa875f' : '#ccc4b0');
  const grass = new THREE.Color('#82985a');
  addPolygon(details, outline(.44), [x, z], edging, surfaceY, .084);
  addPolygon(details, outline(.34), [x, z], grass, surfaceY, .098, grass.clone().multiplyScalar(.87));
  if (material !== 'asphalt') return;
  const count = Math.max(8, Math.round(radius * 8));
  const ink = new THREE.Color(palette.asphalt[2]);
  for (let i = 0; i < count; i++) {
    const arc = Array.from({ length: 4 }, (_, step) => {
      const angle = (i + .2 + .18 * step) / count * Math.PI * 2;
      const [x, z] = ringPoint(angle, .54);
      return { x, z, dx: -Math.sin(angle), dz: Math.cos(angle) };
    });
    routeBand(details, arc, -.026, .026, ink, .056, surfaceY);
  }
}

function addTaper(surface, details, section, taper, surfaceY) {
  const [base, edge, ink] = palette[section.material].map(value => new THREE.Color(value));
  const samples = Array.from({ length: 7 }, (_, i) => {
    const t = i / 6;
    const center = THREE.MathUtils.lerp(taper.startCenter, taper.endCenter, t);
    const [x, z] = sectionPoint(section, section.t + t, center);
    return { x, z, dx: section.axis === X ? 1 : 0, dz: section.axis === Z ? 1 : 0,
      scale: THREE.MathUtils.lerp(taper.startWidth, taper.endWidth, t) };
  });
  routeBand(surface, samples, -.49, .49, base, .035, surfaceY);
  for (const sign of [-1, 1]) {
    routeBand(details, samples, sign * .46 - .027, sign * .46 + .027, edge, .050, surfaceY);
    if (section.material === 'asphalt') {
      routeBand(details, samples, sign * .40 - .012, sign * .40 + .012, edgePaint, .053, surfaceY);
    }
  }
  if (section.material === 'asphalt' && Math.min(taper.startWidth, taper.endWidth) >= 2) {
    routeBand(details, samples.slice(2, 5), -.015, .015, ink, .055, surfaceY);
  }
  if (section.material !== 'asphalt') routeTexture(details, samples, .98, surfaceY, section.material, .058);
}

function addHillStreet(surface, details, material, route, ground) {
  if (!material) return;
  const [base, edge, ink] = palette[material].map(value => new THREE.Color(value));
  const tip = route.at(-1);
  const extended = [...route, { ...tip, x: tip.x + tip.dx * .52, z: tip.z + tip.dz * .52 }];
  const samples = material === 'dirt' ? dirtRoute(extended) : extended;
  const width = hillRoadWidth / 2;
  const elevation = ground && ((x, z, point) => Math.max(point.y, ground(x, z)));
  routeBand(surface, samples, -width, width, base, .059, elevation);
  for (const side of [-1, 1]) {
    const [left, right] = [side * (width - .09), side * width].sort((a, b) => a - b);
    routeBand(details, samples, left, right, material === 'dirt' ? base.clone().lerp(edge, .46) : edge, .065, elevation);
  }
  if (material === 'asphalt') {
    for (const side of [-1, 1]) {
      const center = side * (width - .15);
      routeBand(details, samples, center - .019, center + .019, edgePaint, .068, elevation);
    }
    dashedRoute(samples, points => routeBand(details, points, -.027, .027, ink, .068, elevation));
  }
  if (material !== 'asphalt') routeTexture(details, samples, width * 2, elevation, material, .073);
  if (material === 'dirt') {
    const track = new THREE.Color('#be9a6c');
    for (const side of [-.34, .34]) routeBand(details, samples, side - .055, side + .055, track, .063, elevation);
  }
}

function addStreamCrossing(surface, fixtures) {
  const soil = new THREE.Color('#c2a271');
  for (const path of [streamApproach, westLanding]) routeBand(surface, path, -.45, .45, soil, .052);
  addTimberBridge(surface, fixtures, streamBridge);
}

function addTimberBridge(surface, fixtures, bridge) {
  routeBand(surface, bridge, -.59, .59, new THREE.Color('#967151'), .035);
  for (let i = 1; i < bridge.length; i++) {
    const boards = i % 3 === 0 ? '#ad865f' : i % 3 === 1 ? '#ba9469' : '#a88058';
    routeBand(surface, bridge.slice(i - 1, i + 1), -.56, .56, new THREE.Color(boards), .043);
  }
  for (const side of [-1, 1]) {
    let previous;
    for (const [index, point] of bridge.entries()) {
      if (index % 4) continue;
      const post = new THREE.Vector3(point.x - point.dz * .56 * side, point.y + .037, point.z + point.dx * .56 * side);
      box(fixtures, .085, .36, .085, '#8d6a49', post.x, post.y, post.z);
      if (index % 8 === 0 && index > 0 && index < bridge.length - 1) {
        box(fixtures, .13, post.y + 1.57, .14, '#746149', post.x, -1.57, post.z);
      }
      if (previous) {
        const delta = post.clone().sub(previous);
        const rail = box(fixtures, delta.length() + .02, .063, .065, '#ae865d',
          (post.x + previous.x) / 2, (post.y + previous.y) / 2 + .25, (post.z + previous.z) / 2);
        rail.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), delta.normalize());
      }
      previous = post;
    }
  }
}

export function landscapePaths(paths, bridge, surfaceY) {
  const group = new THREE.Group();
  group.name = 'Lối ven sông và cầu gỗ';
  const surface = batches();
  for (const { samples, width } of paths) {
    routeBand(surface, samples, -width / 2, width / 2, new THREE.Color('#bc9e6e'), .049, surfaceY);
  }
  addTimberBridge(surface, group, bridge);
  group.add(mesh(surface.positions, surface.colors, surface.indices));
  return group;
}

function directionSigns(roads, junctions, surfaceY, blockers, reserved, curves) {
  const group = new THREE.Group();
  group.name = 'Biển chỉ đường';
  for (const { cells, directions } of junctionDirections(roads, junctions)) {
    if (directions.length < 3 || cells.some(cell => curves.has(cell.roadCurveId))) continue;
    const approach = directions.find(({ x, z }) => !directions.some(other => other.x === -x && other.z === -z)) ??
      directions.find(({ z }) => z === 1);
    const left = Math.min(...cells.map(cell => cell.x)), right = Math.max(...cells.map(cell => cell.x)) + 1;
    const top = Math.min(...cells.map(cell => cell.z)), bottom = Math.max(...cells.map(cell => cell.z)) + 1;
    const nearX = (left + right) / 2 + approach.x * ((right - left) / 2 + .34);
    const nearZ = (top + bottom) / 2 + approach.z * ((bottom - top) / 2 + .34);
    const sites = [];
    for (const margin of [.36, .72]) {
      for (const x of [left - margin, right + margin]) {
        for (const z of [top - margin, bottom + margin]) sites.push({ x, z });
      }
    }
    sites.sort((a, b) => Math.hypot(a.x - nearX, a.z - nearZ) - Math.hypot(b.x - nearX, b.z - nearZ));
    const safe = ({ x, z }) => {
      if (blockers.some(item => Math.hypot(x - item.x, z - item.z) < item.radius + .24)) return false;
      const base = surfaceY(x, z);
      return sides.every(([dx, dz]) => Math.abs(base - surfaceY(x + dx * .24, z + dz * .24)) < .16);
    };
    let site = sites.find(({ x, z }) => {
      const cell = { x: Math.floor(x), z: Math.floor(z) };
      return !roads.has(cellKey(cell)) && !reserved(cell) && safe({ x, z });
    });
    if (!site) {
      // At a narrow approach between lots, leave the post on the outer verge.
      const axis = approach.x ? X : Z;
      const narrow = cells.map(cell => roads.get(cellKey({ x: cell.x + approach.x, z: cell.z + approach.z })))
        .find(cell => cell?.axes === axis && crossSection(roads, cell, axis).width === 1);
      if (narrow) {
        site = [-.459, .459].map(side => ({
          x: narrow.x + .5 - approach.z * side, z: narrow.z + .5 + approach.x * side,
        })).find(safe);
      }
    }
    if (!site) continue;
    const sign = makeDirectionSign(directions.filter(direction => direction !== approach),
      cells.some(cell => cell.material === 'asphalt'));
    sign.position.set(site.x, surfaceY(site.x, site.z), site.z);
    group.add(sign);
  }
  return group;
}

export function streetMesh(roads, surfaceY, blockers = [], {
  terrainPaths = true, hillRoute = terrainPaths ? hillRoadSamples : null, reserved = lotAt, groundY = surfaceY, preview = false,
} = {}) {
  const group = new THREE.Group();
  const lights = [];
  const surface = batches(), details = batches();
  const fixtures = new THREE.Group();
  const sections = roadSections(roads);
  if (hillRoute) addHillStreet(surface, details, hillRoadMaterial(roads), hillRoute, terrainPaths ? undefined : surfaceY);
  if (terrainPaths && streamPathOpen(roads)) addStreamCrossing(surface, fixtures);
  const junctions = junctionCells(roads);
  const circles = roadRoundabouts(roads, junctions);
  const curves = roadCurves(roads);
  const visuals = roadVisuals(roads);
  const roundedVisualIds = new Set(visuals.map(visual => visual.id));
  const renderVisual = visual => {
    if (visual.presentation === 'rounded-grid') {
      if (visual.continuous && visual.points?.length >= 2) addRoadCurve(surface, details, visual, surfaceY);
      else addRoundedGridVisual(group, details, visual, surfaceY);
    } else if (visual.presentation === 'rounded-strip') addRoundedStripVisual(surface, details, visual, surfaceY);
    else if (visual.presentation === 'rounded-multi') visual.segments.forEach(renderVisual);
    else addRoadCurve(surface, details, visual, surfaceY);
  };
  for (const curve of curves.values()) addRoadCurve(surface, details, curve, surfaceY);
  for (const visual of visuals) renderVisual(visual);
  for (const circle of circles.values()) addRoundabout(details, circle, surfaceY);
  const info = new Map();
  for (const section of sections) {
    for (const cell of section.cells) {
      const key = cellKey(cell);
      const previous = info.get(key);
      if (!previous || section.width > previous.width ||
        (section.width === previous.width && previous.axis === Z && section.axis === X)) info.set(key, section);
    }
  }
  const tapers = new Set();
  for (const section of sections) {
    const taper = section.cells[0].taper;
    if (!taper || section.junction || !section.cells.every(cell => cell.taper && cell.axes === section.axis)) continue;
    tapers.add(section.id);
    addTaper(surface, details, section, taper, surfaceY);
  }
  const styleAt = cell => cell.axes === (X | Z) ? info.get(cellKey(cell)).material : cell.material;
  for (const cell of roads.values()) {
    if (cell.bridgeId || cell.curveOnly || curves.has(cell.roadCurveId) || roundedVisualIds.has(cell.roadVisualId)) continue;
    const { x, z } = cell;
    const section = info.get(cellKey(cell));
    if (tapers.has(section.id)) continue;
    const material = styleAt(cell);
    const [base, edge] = palette[material].map(value => new THREE.Color(value));
    const random = seeded((Math.imul(x, 73856093) ^ Math.imul(z, 19349663)) >>> 0);
    const neighbors = sides.map(([dx, dz]) => roads.get(cellKey({ x: x + dx, z: z + dz })));
    const inset = neighbors.map(neighbor => neighbor ? 0 : section.width === 1 ? .06 : .02);
    const outline = [[inset[3], inset[0]], [1 - inset[1], inset[0]],
      [1 - inset[1], 1 - inset[2]], [inset[3], 1 - inset[2]]];
    const shape = [];
    for (const [i, point] of outline.entries()) {
      const previous = outline[(i + 3) % 4], next = outline[(i + 1) % 4];
      if (!neighbors[i] && !neighbors[(i + 3) % 4]) {
        const forward = section.axis === X ? neighbors[1] || neighbors[3] : neighbors[0] || neighbors[2];
        const bevel = material !== 'dirt' ? .14 : section.width === 1 ? .17 : forward ? .29 : .23;
        shape.push([x + THREE.MathUtils.lerp(point[0], previous[0], bevel), z + THREE.MathUtils.lerp(point[1], previous[1], bevel)]);
        shape.push([x + THREE.MathUtils.lerp(point[0], next[0], bevel), z + THREE.MathUtils.lerp(point[1], next[1], bevel)]);
      } else shape.push([x + point[0], z + point[1]]);
      if (material === 'dirt' && !neighbors[i]) {
        const [dx, dz] = sides[i];
        for (const t of [.31, .53, .72]) {
          const bend = (random() - .5) * .066;
          const px = x + THREE.MathUtils.lerp(point[0], next[0], t) + dx * bend;
          const pz = z + THREE.MathUtils.lerp(point[1], next[1], t) + dz * bend;
          shape.push([px, pz]);
          if (random() < .36) {
            dirtVerge(details, px - dx * .024, pz - dz * .024, -dz, dx, surfaceY, random);
          }
        }
      }
    }
    const shade = material === 'asphalt' ? 1 : .98 + .025 * Math.sin(x * 8.7 + z * 4.2);
    addPolygon(surface, shape, [x + .5, z + .5], base.clone().multiplyScalar(shade), surfaceY, .035,
      base.clone().lerp(edge, material === 'asphalt' ? 0 : neighbors.some(neighbor => !neighbor) ? .26 : .07));
    for (const [index, neighbor] of neighbors.entries()) {
      const [dx, dz] = sides[index];
      if (!neighbor && material === 'asphalt') {
        const previous = neighbors[(index + 3) % 4] ? 0 : .15;
        const next = neighbors[(index + 1) % 4] ? 0 : .15;
        const along = (previous - next) / 2;
        const length = 1 - previous - next;
        const shoulder = section.width === 1 ? .397 : .425;
        for (const [offset, thickness, color, height] of [[shoulder, .086, edge, .048], [.342, .038, edgePaint, .052]]) {
          const ax = x + .5 + dx * offset - dz * along;
          const az = z + .5 + dz * offset + dx * along;
          rectangle(details, ax, az, dx ? thickness : length, dz ? thickness : length, color, surfaceY, height);
        }
      } else if (!neighbor && material === 'stone') {
        const ax = x + .5 + dx * .413, az = z + .5 + dz * .413;
        rectangle(details, ax, az, dx ? .082 : .78, dz ? .082 : .78, edge, surfaceY, .048);
      }
      if (neighbor && styleAt(neighbor) !== material && (dx > 0 || dz > 0)) {
        const target = new THREE.Color(palette[styleAt(neighbor)][0]);
        rectangle(details, x + .5 + dx * .5, z + .5 + dz * .5, dx ? .10 : .91, dz ? .10 : .91,
          base.clone().lerp(target, .5), surfaceY, .049);
      }
    }
    if (material === 'stone') stoneTile(details, x, z, outline, surfaceY, random);
  }

  for (const section of sections) {
    const { axis, t, lo, hi, width, material, junction } = section;
    if (material !== 'dirt' || junction || width < 2 || tapers.has(section.id) ||
      section.cells.some(cell => cell.bridgeId || curves.has(cell.roadCurveId) || roundedVisualIds.has(cell.roadVisualId))) continue;
    const center = (lo + hi + 1) / 2;
    for (const offset of [-.39, .39]) {
      const [x, z] = sectionPoint(section, t + .5, center + offset);
      rectangle(details, x, z, axis === X ? 1 : .10, axis === Z ? 1 : .10,
        new THREE.Color('#b09167'), surfaceY, .046);
    }
  }

  const approaches = new Set();
  const markedSections = new Set();
  for (const section of sections) {
    if (section.junction || section.cells.some(cell => cell.bridgeId || curves.has(cell.roadCurveId))) continue;
    for (const step of [-1, 1]) {
      const junction = section.cells.map(cell => junctions.get(cellKey({
        x: cell.x + (section.axis === X ? step : 0), z: cell.z + (section.axis === Z ? step : 0),
      }))).find(Boolean);
      const approach = `${junction}:${section.axis}:${step}`;
      if (!junction || approaches.has(approach)) continue;
      approaches.add(approach);
      const center = (section.lo + section.hi + 1) / 2;
      const t = section.t + .5 + step * .15;
      if (section.width >= 2 && section.material !== 'dirt' && !tapers.has(section.id)) {
        markedSections.add(section.id);
        const ink = new THREE.Color(palette[section.material][2]);
        const count = section.width * 3;
        const spacing = (section.width - .45) / count;
        for (let i = 0; i < count; i++) {
          const [x, z] = sectionPoint(section, t, center + (i + .5 - count / 2) * spacing);
          rectangle(details, x, z, section.axis === X ? .26 : spacing * .55,
            section.axis === X ? spacing * .55 : .26, ink, surfaceY, section.material === 'stone' ? .068 : .056);
        }
        if (section.material === 'asphalt' && !circles.has(junction)) {
          const laneWidth = section.width / 2;
          const [x, z] = sectionPoint(section, t - step * .27,
            center + step * laneWidth / 2 * (section.axis === X ? 1 : -1));
          rectangle(details, x, z, section.axis === X ? .062 : laneWidth - .25,
            section.axis === X ? laneWidth - .25 : .062, ink, surfaceY, .056);
        }
      }
      const axis = circles.has(junction) ? null : signalAxes(roads, section);
      if (!axis || preview) continue;
      const place = [section.hi + 1.11, section.lo - .11].map(side => sectionPoint(section, t - step * .32, side))
        .find(([x, z]) => {
          const cell = { x: Math.floor(x), z: Math.floor(z) };
          return !reserved(cell) && !roads.has(cellKey(cell));
        });
      if (!place) continue;
      const [x, z] = place;
      const y = surfaceY(x, z);
      cyl(fixtures, .082, .092, .055, '#827e70', x, y, z, 8);
      cyl(fixtures, .026, .035, .69, '#646960', x, y, z, 8);
      box(fixtures, axis === X ? .124 : .155, .31, axis === X ? .155 : .124, '#303934', x, y + .59, z);
      for (const [i, [phase, color]] of [['green', '#72ef9c'], ['yellow', '#f6bf4b'], ['red', '#f07859']].entries()) {
        const lamp = new THREE.Mesh(new THREE.SphereGeometry(.034, 10, 6), new THREE.MeshBasicMaterial());
        lamp.position.set(x, y + .643 + i * .093, z);
        lamp.rotation.y = axis === X ? Math.PI / 2 : 0;
        lamp.scale.z = 2.2;
        group.add(lamp);
        lights.push({ lamp, color, phase, axis });
      }
    }
  }
  const laneInk = new THREE.Color(palette.asphalt[2]);
  for (const section of sections) {
    const { axis, t, lo, hi, width } = section;
    if (section.junction || width < 2 || tapers.has(section.id) || markedSections.has(section.id) ||
      !section.cells.every(cell => cell.material === 'asphalt' && !cell.bridgeId && !curves.has(cell.roadCurveId) && !roundedVisualIds.has(cell.roadVisualId))) continue;
    const center = (lo + hi + 1) / 2;
    for (const offset of asphaltLaneOffsets(width)) {
      const [x, z] = sectionPoint(section, t + .5, center + offset);
      rectangle(details, x, z, axis === X ? .54 : .055, axis === Z ? .54 : .055, laneInk, surfaceY, .052);
    }
  }
  group.add(mesh(surface.positions, surface.colors, surface.indices, groundMaterial, surface.uvs), mesh(details.positions, details.colors, details.indices, groundMaterial, details.uvs));
  if (!preview) group.add(bake(fixtures), directionSigns(roads, junctions, surfaceY, blockers, reserved, curves));
  if ([...roads.values()].some(cell => cell.bridgeId)) group.add(buildRoadBridges(roads, groundY));
  return {
    group,
    update(time) {
      for (const { lamp, color, phase, axis } of lights) lamp.material.color.set(lightPhase(time, axis) === phase ? color : '#555649');
    },
  };
}

export function cellLayer(cells, surfaceY, options) {
  const data = batches();
  const divisions = 5;
  const stride = divisions + 1;
  const inset = options.grid ? .045 : 0;
  for (const { x, z, color } of cells) {
    const tint = new THREE.Color(color);
    const start = data.positions.length / 3;
    for (let row = 0; row <= divisions; row++) for (let col = 0; col <= divisions; col++) {
      const px = x + THREE.MathUtils.lerp(inset, 1 - inset, col / divisions);
      const pz = z + THREE.MathUtils.lerp(inset, 1 - inset, row / divisions);
      data.positions.push(px, surfaceY(px, pz) + (options.elevation ?? .029), pz);
      data.colors.push(tint.r, tint.g, tint.b);
      if (row && col) {
        const a = start + (row - 1) * stride + col - 1, c = a + stride;
        data.indices.push(a, c, a + 1, a + 1, c, c + 1);
      }
    }
  }
  const material = new THREE.MeshBasicMaterial({
    vertexColors: true, transparent: true, opacity: options.opacity, depthWrite: false,
  });
  const result = mesh(data.positions, data.colors, data.indices, material);
  result.renderOrder = options.order ?? 0;
  return result;
}

export function flattenGridLines(cells, skipped, surfaceY) {
  const positions = [], colors = [], edges = new Map();
  const white = new THREE.Color('#fffdf5'), red = new THREE.Color('#ff322e');
  for (const { x, z } of cells) {
    for (const [ax, az, bx, bz] of [[x, z, x + 1, z], [x, z + 1, x + 1, z + 1],
      [x, z, x, z + 1], [x + 1, z, x + 1, z + 1]]) {
      edges.set(`${ax},${az}:${bx},${bz}`, [ax, az, bx, bz]);
    }
  }
  function trace(ax, az, bx, bz, color, divisions) {
    for (let i = 0; i < divisions; i++) {
      for (const t of [i / divisions, (i + 1) / divisions]) {
        const x = THREE.MathUtils.lerp(ax, bx, t), z = THREE.MathUtils.lerp(az, bz, t);
        positions.push(x, surfaceY(x, z) + .095, z);
        colors.push(color.r, color.g, color.b);
      }
    }
  }
  for (const edge of edges.values()) trace(...edge, white, 8);
  for (const { x, z } of skipped) {
    trace(x + .20, z + .50, x + .80, z + .50, red, 4);
    trace(x + .50, z + .20, x + .50, z + .80, red, 4);
  }
  const geometry = new THREE.BufferGeometry()
    .setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    .setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const lines = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true, opacity: .82, depthWrite: false,
  }));
  lines.renderOrder = 7;
  return lines;
}

export function laneLines(graph, surfaceY, color, show = () => true) {
  const vertices = [];
  for (const node of graph.values()) for (const link of node.links) {
    const end = graph.get(link.id);
    if (!end || !show(node, end) || (link.crossing && !node.id.startsWith('roundabout:') &&
      !end.id.startsWith('roundabout:'))) continue;
    for (const [start, stop] of [[0, .25], [.40, .65], [.80, 1]]) {
      for (const p of [start, stop]) {
        const x = THREE.MathUtils.lerp(node.x, end.x, p), z = THREE.MathUtils.lerp(node.z, end.z, p);
        vertices.push(x, surfaceY(x, z) + .075, z);
      }
    }
  }
  const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  return new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: .85 }));
}
