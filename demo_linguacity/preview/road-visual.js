import { cellKey, curveSamples, sampleFillets, simplify } from './road-shapes';

const inFootprint = (x, z, keys) => keys.has(cellKey({ x: Math.floor(x), z: Math.floor(z) }));
const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const unit = (a, b) => {
  const len = dist(a, b);
  return len > 1e-9 ? [(b[0] - a[0]) / len, (b[1] - a[1]) / len] : [1, 0];
};
const addPt = (p, dir, scale) => [p[0] + dir[0] * scale, p[1] + dir[1] * scale];
const cross2 = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);

function lineIntersection(p1, d1, p2, d2) {
  const denom = d1[0] * d2[1] - d1[1] * d2[0];
  if (Math.abs(denom) < 1e-6) return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  const dx = p2[0] - p1[0], dz = p2[1] - p1[1];
  const t = (dx * d2[1] - dz * d2[0]) / denom;
  return [p1[0] + d1[0] * t, p1[1] + d1[1] * t];
}

function clipSegmentToTile(a, b, x, z) {
  let t0 = 0, t1 = 1;
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const checks = [[-dx, a[0] - x], [dx, x + 1 - a[0]], [-dz, a[1] - z], [dz, z + 1 - a[1]]];
  for (const [p, q] of checks) {
    if (Math.abs(p) < 1e-9) {
      if (q <= 1e-7) return false;
    } else {
      const r = q / p;
      if (p < 0) {
        if (r >= t1 - 1e-7) return false;
        if (r > t0) t0 = r;
      } else {
        if (r <= t0 + 1e-7) return false;
        if (r < t1) t1 = r;
      }
    }
  }
  return t1 > t0 + 1e-5;
}

export function segmentInFootprint(a, b, keys) {
  const minX = Math.floor(Math.min(a[0], b[0]) + 1e-6), maxX = Math.floor(Math.max(a[0], b[0]) - 1e-6);
  const minZ = Math.floor(Math.min(a[1], b[1]) + 1e-6), maxZ = Math.floor(Math.max(a[1], b[1]) - 1e-6);
  for (let x = minX; x <= maxX; x++) {
    for (let z = minZ; z <= maxZ; z++) {
      if (!keys.has(`${x},`) && clipSegmentToTile(a, b, x, z)) return false;
    }
  }
  return true;
}

function extractRing(cells) {
  const occupied = new Set(cells);
  const edges = new Map();
  const add = (from, to) => edges.set(`${from[0]},${from[1]}`, { from, to });
  for (const key of cells) {
    const [x, z] = key.split(',').map(Number);
    if (!occupied.has(`${x},${z - 1}`)) add([x, z], [x + 1, z]);
    if (!occupied.has(`${x + 1},`)) add([x + 1, z], [x + 1, z + 1]);
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
  return ring;
}

export function smoothOutlinePolygon(cells, slices = [], maxRadius = 1.45) {
  const keys = new Set(cells);
  const ring = extractRing(cells);
  if (!ring) return null;
  const signedArea = ring.reduce((sum, p, i) => {
    const n = ring[(i + 1) % ring.length];
    return sum + p[0] * n[1] - n[0] * p[1];
  }, 0);
  const winding = Math.sign(signedArea) || 1;
  const endCaps = new Set();
  if (slices?.length) {
    for (const slice of [slices[0], slices.at(-1)]) {
      for (const c of slice) {
        for (const dx of [0, 1]) for (const dz of [0, 1]) endCaps.add(`${c.x + dx},${c.z + dz}`);
      }
    }
  }
  let base = ring.filter((curr, i) => {
    const prev = ring[(i + ring.length - 1) % ring.length];
    const next = ring[(i + 1) % ring.length];
    const cross = (curr[0] - prev[0]) * (next[1] - curr[1]) - (curr[1] - prev[1]) * (next[0] - curr[0]);
    return Math.abs(cross) > 1e-5;
  });
  for (let pass = 0; pass < 3; pass++) {
    const n = base.length;
    const types = base.map((curr, i) => {
      const prev = base[(i + n - 1) % n];
      const next = base[(i + 1) % n];
      const cross = ((curr[0] - prev[0]) * (next[1] - curr[1]) - (curr[1] - prev[1]) * (next[0] - curr[0])) * winding;
      return cross > 1e-5 ? 'C' : 'R';
    });
    const nextBase = [];
    for (let i = 0; i < n; i++) {
      const curr = base[i];
      const prev = nextBase.length ? nextBase.at(-1) : base[(i + n - 1) % n];
      const next = base[(i + 1) % n];
      const isEndCap = endCaps.has(`${curr[0]},${curr[1]}`);
      const isTooth = types[i] === 'C' && !isEndCap && (types[(i + n - 1) % n] === 'R' || types[(i + 1) % n] === 'R');
      const lenA = Math.hypot(curr[0] - prev[0], curr[1] - prev[1]);
      const lenB = Math.hypot(next[0] - curr[0], next[1] - curr[1]);
      const isShallowStep = !isEndCap && Math.min(lenA, lenB) <= 1.5;
      if ((isTooth || (pass > 0 && isShallowStep)) && segmentInFootprint(prev, next, keys)) continue;
      nextBase.push(curr);
    }
    base = nextBase.filter((curr, i) => {
      const prev = nextBase[(i + nextBase.length - 1) % nextBase.length];
      const next = nextBase[(i + 1) % nextBase.length];
      const cross = (curr[0] - prev[0]) * (next[1] - curr[1]) - (curr[1] - prev[1]) * (next[0] - curr[0]);
      return Math.abs(cross) > 1e-4;
    });
  }

  const out = [];
  for (let i = 0; i < base.length; i++) {
    const prev = base[(i + base.length - 1) % base.length];
    const curr = base[i];
    const next = base[(i + 1) % base.length];
    const cross = ((curr[0] - prev[0]) * (next[1] - curr[1]) - (curr[1] - prev[1]) * (next[0] - curr[0])) * winding;
    const isEndCap = endCaps.has(`${curr[0]},${curr[1]}`);
    const lenA = Math.hypot(curr[0] - prev[0], curr[1] - prev[1]);
    const lenB = Math.hypot(next[0] - curr[0], next[1] - curr[1]);
    const limit = isEndCap ? 0.22 : maxRadius;
    if (cross > 1e-5) {
      let placed = false;
      for (const factor of [1, 0.72, 0.48, 0.28]) {
        const trim = Math.min(limit * factor, lenA * 0.46, lenB * 0.46);
        if (trim < 0.08) break;
        const a = [curr[0] + (prev[0] - curr[0]) / lenA * trim, curr[1] + (prev[1] - curr[1]) / lenA * trim];
        const b = [curr[0] + (next[0] - curr[0]) / lenB * trim, curr[1] + (next[1] - curr[1]) / lenB * trim];
        const samples = [];
        for (let s = 0; s <= 6; s++) {
          const t = s / 6, u = 1 - t;
          samples.push([
            u * u * a[0] + 2 * u * t * curr[0] + t * t * b[0],
            u * u * a[1] + 2 * u * t * curr[1] + t * t * b[1],
          ]);
        }
        if (samples.slice(1).every((pt, idx) => segmentInFootprint(samples[idx], pt, keys))) {
          out.push(...samples);
          placed = true;
          break;
        }
      }
      if (!placed) out.push(curr);
    } else {
      out.push(curr);
    }
  }
  return out;
}

function buildCornerGeometry(gridPath, width, outerRadius, innerCandidate) {
  const half = width / 2 - 0.02;
  const sideNormal = (dir, side) => [-dir[1] * side, dir[0] * side];

  const leftPts = [];
  const rightPts = [];
  const centerCum = [0];
  for (let i = 1; i < gridPath.length; i++) {
    centerCum.push(centerCum[i - 1] + dist(gridPath[i - 1], gridPath[i]));
  }

  const pushSidePt = (arr, pt, u, v) => {
    const prev = arr.at(-1);
    if (prev && dist(prev, pt) < 1e-5) return;
    arr.push([pt[0], pt[1], u, v]);
  };

  const segDir0 = unit(gridPath[0], gridPath[1]);
  pushSidePt(leftPts, addPt(gridPath[0], sideNormal(segDir0, -1), half), 0, 0);
  pushSidePt(rightPts, addPt(gridPath[0], sideNormal(segDir0, 1), half), 0, 1);

  const cornerMeta = [];
  let prevOuterTrim = 0;
  let prevInnerTrim = 0;

  for (let i = 1; i < gridPath.length - 1; i++) {
    const [prev, curr, next] = [gridPath[i - 1], gridPath[i], gridPath[i + 1]];
    const a = unit(prev, curr);
    const b = unit(curr, next);
    const turn = Math.atan2(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1]);
    const absTurn = Math.abs(turn);
    if (absTurn < 0.05) {
      prevOuterTrim = 0;
      prevInnerTrim = 0;
      continue;
    }

    const innerSign = Math.sign(turn);
    const outerSign = -innerSign;
    const uCorner = centerCum[i];

    const iOut = lineIntersection(
      addPt(curr, sideNormal(a, outerSign), half), a,
      addPt(curr, sideNormal(b, outerSign), half), b,
    );
    const iIn = lineIntersection(
      addPt(curr, sideNormal(a, innerSign), half), a,
      addPt(curr, sideNormal(b, innerSign), half), b,
    );

    const lenA = dist(prev, curr);
    const lenB = dist(curr, next);
    const tanHalf = Math.tan(absTurn / 2);

    const outTrim = outerRadius * tanHalf;
    if (prevOuterTrim + outTrim >= lenA - 0.05 || outTrim >= lenB - 0.05) return null;

    let inTrim = 0;
    if (innerCandidate.style === 'arc') inTrim = innerCandidate.radius * tanHalf;
    else if (innerCandidate.style === 'bevel') inTrim = innerCandidate.trim;
    if (prevInnerTrim + inTrim >= lenA - 0.05 || inTrim >= lenB - 0.05) return null;

    prevOuterTrim = outTrim;
    prevInnerTrim = inTrim;

    const outArr = outerSign < 0 ? leftPts : rightPts;
    const inArr = innerSign < 0 ? leftPts : rightPts;
    const outV = outerSign < 0 ? 0 : 1;
    const inV = innerSign < 0 ? 0 : 1;

    const outStart = addPt(iOut, a, -outTrim);
    if (outTrim >= 0.02) {
      const outCenter = addPt(outStart, sideNormal(a, innerSign), outerRadius);
      const startAngle = Math.atan2(outStart[1] - outCenter[1], outStart[0] - outCenter[0]);
      const count = Math.max(2, Math.ceil(absTurn * outerRadius / 0.16));
      for (let n = 0; n <= count; n++) {
        const frac = n / count;
        const ang = startAngle + turn * frac;
        const pt = addPt(outCenter, [Math.cos(ang), Math.sin(ang)], outerRadius);
        const u = uCorner + (frac - 0.5) * outTrim * 1.4;
        pushSidePt(outArr, pt, Math.max(0, u), outV);
      }
    } else {
      pushSidePt(outArr, iOut, uCorner, outV);
    }

    if (innerCandidate.style === 'arc' && inTrim >= 0.02) {
      const inStart = addPt(iIn, a, -inTrim);
      const inCenter = addPt(inStart, sideNormal(a, innerSign), innerCandidate.radius);
      const startAngle = Math.atan2(inStart[1] - inCenter[1], inStart[0] - inCenter[0]);
      const count = Math.max(2, Math.ceil(absTurn * innerCandidate.radius / 0.14));
      for (let n = 0; n <= count; n++) {
        const frac = n / count;
        const ang = startAngle + turn * frac;
        const pt = addPt(inCenter, [Math.cos(ang), Math.sin(ang)], innerCandidate.radius);
        const u = uCorner + (frac - 0.5) * Math.max(0.05, inTrim);
        pushSidePt(inArr, pt, Math.max(0, u), inV);
      }
    } else if (innerCandidate.style === 'bevel' && inTrim >= 0.02) {
      const inStart = addPt(iIn, a, -inTrim);
      const inEnd = addPt(iIn, b, inTrim);
      pushSidePt(inArr, inStart, Math.max(0, uCorner - inTrim * 0.5), inV);
      pushSidePt(inArr, inEnd, uCorner + inTrim * 0.5, inV);
    } else {
      pushSidePt(inArr, iIn, uCorner, inV);
    }

    cornerMeta.push({
      outerRadius,
      innerStyle: innerCandidate.style,
      innerRadius: innerCandidate.radius ?? 0,
      innerTrim: inTrim,
    });
  }

  const lastDir = unit(gridPath.at(-2), gridPath.at(-1));
  const totalLen = centerCum.at(-1);
  pushSidePt(leftPts, addPt(gridPath.at(-1), sideNormal(lastDir, -1), half), totalLen, 0);
  pushSidePt(rightPts, addPt(gridPath.at(-1), sideNormal(lastDir, 1), half), totalLen, 1);

  for (const arr of [leftPts, rightPts]) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][2] < arr[i - 1][2]) arr[i][2] = arr[i - 1][2];
    }
  }

  const triangles = [];
  let li = 0, ri = 0;
  while (li < leftPts.length - 1 || ri < rightPts.length - 1) {
    const canL = li < leftPts.length - 1;
    const canR = ri < rightPts.length - 1;
    const l0 = leftPts[li], r0 = rightPts[ri];
    if (canL && canR) {
      const l1 = leftPts[li + 1], r1 = rightPts[ri + 1];
      const uL = l1[2], uR = r1[2];
      const areaL = -cross2(l0, r0, l1);
      const areaR = -cross2(l0, r0, r1);
      const pickL = (uL <= uR + 1e-4 && areaL > 1e-6) || areaR <= 1e-6;
      if (pickL) {
        if (areaL <= 1e-6) return null;
        triangles.push(['L', li, 'R', ri, 'L', li + 1]);
        li++;
      } else {
        if (areaR <= 1e-6) return null;
        triangles.push(['L', li, 'R', ri, 'R', ri + 1]);
        ri++;
      }
    } else if (canL) {
      const l1 = leftPts[li + 1];
      if (-cross2(l0, r0, l1) <= 1e-6) return null;
      triangles.push(['L', li, 'R', ri, 'L', li + 1]);
      li++;
    } else {
      const r1 = rightPts[ri + 1];
      if (-cross2(l0, r0, r1) <= 1e-6) return null;
      triangles.push(['L', li, 'R', ri, 'R', ri + 1]);
      ri++;
    }
  }

  return { leftEdge: leftPts, rightEdge: rightPts, triangles, totalLength: totalLen, corners: cornerMeta };
}

function stripFitsAndValid(strip, width, keys) {
  const { leftEdge, rightEdge, triangles } = strip;
  if (!triangles.length) return false;
  for (const pt of [...leftEdge, ...rightEdge]) {
    if (!inFootprint(pt[0], pt[1], keys)) return false;
  }
  const checkSeg = (a, b) => {
    const steps = Math.max(1, Math.ceil(dist(a, b) / 0.25));
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const x = a[0] + (b[0] - a[0]) * t;
      const z = a[1] + (b[1] - a[1]) * t;
      if (!inFootprint(x, z, keys)) return false;
    }
    return true;
  };
  for (let i = 1; i < leftEdge.length; i++) if (!checkSeg(leftEdge[i - 1], leftEdge[i])) return false;
  for (let i = 1; i < rightEdge.length; i++) if (!checkSeg(rightEdge[i - 1], rightEdge[i])) return false;

  for (const [t0, i0, t1, i1, t2, i2] of triangles) {
    const p0 = t0 === 'L' ? leftEdge[i0] : rightEdge[i0];
    const p1 = t1 === 'L' ? leftEdge[i1] : rightEdge[i1];
    const p2 = t2 === 'L' ? leftEdge[i2] : rightEdge[i2];
    if (-cross2(p0, p1, p2) <= 1e-6) return false;
    if (t0 !== t1) {
      const span = dist(p0, p1);
      if (span < Math.max(0.55, width * 0.72)) return false;
    }
  }
  return true;
}

export function visualFitsFootprint(visual, cells) {
  if (!visual) return false;
  if (visual.segments?.length) return visual.segments.every(seg => visualFitsFootprint(seg, cells));
  const keys = new Set(cells.map(cellKey));
  if (visual.presentation === 'rounded-grid') {
    return visual.cells.every(key => keys.has(key));
  }
  if (visual.leftEdge && visual.rightEdge && visual.triangles) {
    return stripFitsAndValid(visual, visual.width, keys);
  }
  if (!visual.points?.length) return false;
  const samples = curveSamples(visual.points);
  for (const point of samples) {
    for (let side = -visual.width / 2 + 0.045; side <= visual.width / 2 - 0.045; side += 0.11) {
      if (!inFootprint(point.x - point.dz * side, point.z + point.dx * side, keys)) return false;
    }
  }
  return true;
}

// Check whether a smooth continuous ribbon of full width W can pass through
// the route without hitting any obstacle/building/water on the 1-tile side
// overhang cells (as requested: if side overhang cells are clear of buildings,
// allow smooth parallel-edge road ribbon; if blocked by a building, return
// blockedCell so the caller can detour or fall back).
function buildSmoothRibbonVisual(slices, corners, width, material, id, allCellKeys, canOverhang) {
  const sliceCenter = slice => [
    slice.reduce((total, cell) => total + cell.x + 0.5, 0) / slice.length,
    slice.reduce((total, cell) => total + cell.z + 0.5, 0) / slice.length,
  ];
  const segKeys = new Set();
  for (const slice of slices) for (const c of slice) segKeys.add(cellKey(c));
  for (const corner of corners) {
    if (corner.some(c => segKeys.has(cellKey(c)))) {
      for (const c of corner) segKeys.add(cellKey(c));
    }
  }
  const cells = [...segKeys].filter(k => allCellKeys.has(k));
  if (!cells.length) return { visual: null, blockedCell: null };

  const cornerCenters = [];
  for (const corner of corners) {
    if (corner.some(c => segKeys.has(cellKey(c)))) cornerCenters.push(sliceCenter(corner));
  }
  const gridPath = simplify([
    sliceCenter(slices[0]),
    ...cornerCenters,
    sliceCenter(slices.at(-1)),
  ], 0.12);
  if (gridPath.length < 2) return { visual: null, blockedCell: null };

  const radii = gridPath.length === 2
    ? [Math.max(0.24, width * 0.45)]
    : [width * 0.85, width * 0.65, width * 0.48, 0.32];

  let firstBlocked = null;
  for (const radius of radii) {
    const points = gridPath.length === 2 ? gridPath : sampleFillets(gridPath, radius);
    if (!points) continue;
    const samples = curveSamples(points);
    let blocked = null;
    for (const point of samples) {
      for (let side = -width / 2 + 0.04; side <= width / 2 - 0.04; side += 0.12) {
        const x = point.x - point.dz * side, z = point.z + point.dx * side;
        const cell = { x: Math.floor(x), z: Math.floor(z) };
        const key = cellKey(cell);
        if (segKeys.has(key)) continue;
        if (!canOverhang(cell, x, z)) {
          blocked = cell;
          break;
        }
      }
      if (blocked) break;
    }
    if (!blocked) {
      return {
        visual: {
          id,
          cells,
          points,
          width,
          material,
          radius,
          continuous: true,
          presentation: 'rounded-grid',
        },
        blockedCell: null,
      };
    }
    firstBlocked ??= blocked;
  }
  return { visual: null, blockedCell: firstBlocked };
}

function buildSegmentVisual(slices, corners, width, material, id, allCellKeys, canOverhang = null, cornerOnly = false) {
  const sliceCenter = slice => [
    slice.reduce((total, cell) => total + cell.x + 0.5, 0) / slice.length,
    slice.reduce((total, cell) => total + cell.z + 0.5, 0) / slice.length,
  ];
  const segKeys = new Set();
  for (const slice of slices) for (const c of slice) segKeys.add(cellKey(c));
  for (const corner of corners) {
    if (corner.some(c => segKeys.has(cellKey(c)))) {
      for (const c of corner) segKeys.add(cellKey(c));
    }
  }
  const cells = [...segKeys].filter(k => allCellKeys.has(k));
  if (!cells.length) return null;

  const cornerCenters = [];
  for (const corner of corners) {
    if (corner.some(c => segKeys.has(cellKey(c)))) cornerCenters.push(sliceCenter(corner));
  }
  const gridPath = simplify([
    sliceCenter(slices[0]),
    ...cornerCenters,
    sliceCenter(slices.at(-1)),
  ], 0.12);

  if (gridPath.length < 2) return null;
  const cellObjs = cells.map(k => {
    const [x, z] = k.split(',').map(Number);
    return { x, z };
  });
  const footprintKeys = new Set(cells);

  if (gridPath.length >= 3) {
    const outerCandidates = [width * 0.85, width * 0.68, width * 0.52, width * 0.36, 0.25];
    const innerCandidates = width >= 2
      ? [
          { style: 'arc', radius: 0.3 },
          { style: 'arc', radius: 0.2 },
          { style: 'bevel', trim: 0.28 },
          { style: 'bevel', trim: 0.2 },
          { style: 'square', trim: 0 },
        ]
      : [
          { style: 'arc', radius: 0.25 },
          { style: 'bevel', trim: 0.2 },
          { style: 'square', trim: 0 },
        ];

    for (const outerRadius of outerCandidates) {
      for (const innerCandidate of innerCandidates) {
        const strip = buildCornerGeometry(gridPath, width, outerRadius, innerCandidate);
        if (!strip) continue;
        if (!stripFitsAndValid(strip, width, footprintKeys)) continue;
        const visual = {
          id,
          cells,
          points: gridPath,
          width,
          material,
          radius: outerRadius,
          innerStyle: innerCandidate.style,
          innerRadius: innerCandidate.radius ?? 0,
          presentation: 'rounded-strip',
          ...strip,
        };
        if (visualFitsFootprint(visual, cellObjs)) return visual;
      }
    }
  }

  // If this is a diagonal or diagonal-elbow route, check if we can sweep a clean
  // constant-width ribbon (like Kenney / three-roads / picture 2) when the 1-tile
  // overhang beside staircase steps does not collide with buildings or water.
  if (cornerOnly) {
    const outline = smoothOutlinePolygon(cells, slices, Math.max(0.85, width * 0.72));
    const visual = {
      id: `${id}:corner`,
      cells,
      points: gridPath,
      width,
      material,
      radius: Math.max(0.24, width * 0.45),
      innerStyle: 'bevel',
      outline,
      presentation: 'rounded-grid',
    };
    return visualFitsFootprint(visual, cellObjs) ? visual : null;
  }

  if (canOverhang) {
    const { visual, blockedCell } = buildSmoothRibbonVisual(
      slices, corners, width, material, id, allCellKeys, canOverhang,
    );
    if (visual) return visual;
    if (blockedCell) {
      // Overhang collided with a building/water: still provide an inward-smoothed
      // polygon strictly inside the locked tiles and attach overhangBlockedCell so
      // the caller can also offer a detour around the building.
      const outline = smoothOutlinePolygon(cells, slices, Math.max(0.85, width * 0.72));
      return {
        id,
        cells,
        points: gridPath,
        width,
        material,
        radius: Math.max(0.24, width * 0.45),
        innerStyle: 'bevel',
        outline,
        overhangBlockedCell: blockedCell,
        presentation: 'rounded-grid',
      };
    }
  }

  // Default diagonal presentation when no obstacle callback is supplied:
  // sweep a clean constant-width ribbon along the filleted centerline while
  // keeping `cells` locked to the exact slice footprint.
  const ribbonRadius = Math.max(0.24, width * 0.62);
  const ribbonPoints = gridPath.length === 2 ? gridPath : (sampleFillets(gridPath, ribbonRadius) ?? gridPath);
  const outline = smoothOutlinePolygon(cells, slices, Math.max(0.85, width * 0.72));
  const visual = {
    id,
    cells,
    points: ribbonPoints,
    width,
    material,
    radius: ribbonRadius,
    innerStyle: 'bevel',
    outline,
    continuous: true,
    presentation: 'rounded-grid',
  };
  return visualFitsFootprint(visual, cellObjs) ? visual : null;
}

export function roundedRoadVisual(route, {
  material = 'dirt', roads = null, existingRoads = null, obstacle = null, waterAt = null, cornerOnly = false,
} = {}) {
  if (!route?.points || route.points.length < 2 || !route?.cells?.length || !route?.slices?.length) return null;
  const width = route.slices[0]?.length ?? 1;

  const isExcluded = cell => {
    const key = cellKey(cell);
    if (existingRoads?.has(key)) return true;
    const road = roads?.get(key);
    if (road && (road.bridgeId || road.approachBridgeId || road.roadCurveId)) return true;
    return false;
  };

  const canOverhang = (obstacle || waterAt)
    ? (cell, x, z) => {
        if (waterAt?.(x, z)) return false;
        if (obstacle?.(cell)) return false;
        return true;
      }
    : null;

  const groups = [];
  let current = [];
  for (const slice of route.slices) {
    if (slice.some(isExcluded)) {
      if (current.length >= 2) groups.push(current);
      current = [];
    } else {
      current.push(slice);
    }
  }
  if (current.length >= 2) groups.push(current);
  if (!groups.length) return null;

  const allCellKeys = new Set(route.cells.filter(c => !isExcluded(c)).map(cellKey));
  const corners = route.corners ?? [];

  if (groups.length === 1) {
    return buildSegmentVisual(
      groups[0], corners, width, material,
      `rounded:${cellKey(route.cells[0])}:${cellKey(route.cells.at(-1))}`,
      allCellKeys,
      canOverhang,
      cornerOnly,
    );
  }

  const segments = groups
    .map((slices, idx) => buildSegmentVisual(
      slices, corners, width, material,
      `rounded:${cellKey(route.cells[0])}:${cellKey(route.cells.at(-1))}:${idx}`,
      allCellKeys,
      canOverhang,
    ))
    .filter(Boolean);

  if (!segments.length) return null;
  if (segments.length === 1) return segments[0];
  return {
    id: `rounded:${cellKey(route.cells[0])}:${cellKey(route.cells.at(-1))}`,
    cells: segments.flatMap(seg => seg.cells),
    points: segments[0].points,
    width,
    material,
    radius: Math.max(...segments.map(seg => seg.radius)),
    innerStyle: segments[0].innerStyle,
    overhangBlockedCell: segments.find(seg => seg.overhangBlockedCell)?.overhangBlockedCell ?? null,
    presentation: 'rounded-multi',
    segments,
  };
}

export function applyRoadVisual(roads, visual) {
  if (!visual) return roads;
  const next = new Map(roads);
  const cells = visual.cells.map(key => next.get(key));
  if (cells.some(cell => !cell || cell.bridgeId || cell.approachBridgeId || cell.roadCurveId)) return roads;
  for (const key of visual.cells) next.set(key, { ...next.get(key), roadVisualId: visual.id });
  const anchor = visual.cells[0];
  next.set(anchor, { ...next.get(anchor), roadVisual: visual });
  return next;
}

export function roadVisuals(roads) {
  const result = [];
  for (const cell of roads.values()) {
    const visual = cell.roadVisual;
    if (!visual || visual.cells.some(key => roads.get(key)?.roadVisualId !== visual.id)) continue;
    result.push(visual);
  }
  return result;
}
