import { Color, DynamicDrawUsage, MathUtils } from 'three';
import { X, cellKey } from './roads';

const { clamp, lerp, smoothstep } = MathUtils;
const blendWidth = 1.25;
const epsilon = 1e-5;
const maxRampGrade = .35;
const maxFlattenTiles = 12;
const maxRampTiles = 20;
const maxRoadEarthwork = 1.4;
const lockedMessage = 'Quá sát công trình/đường hiện có.';
const waterMessage = 'Chừa mặt nước và lòng suối khi chỉnh địa hình.';
const toCell = (x, z) => ({ x: Math.floor(x), z: Math.floor(z) });
const tileBounds = ({ x, z }) => ({ left: x, right: x + 1, top: z, bottom: z + 1 });
const distanceFrom = (area, x, z) => Math.hypot(
  Math.max(area.left - x, x - area.right, 0),
  Math.max(area.top - z, z - area.bottom, 0),
);

function uploadRanges(attribute, indices) {
  if (!attribute?.addUpdateRange || !indices.size) return;
  let first = -1, last = -1;
  for (const index of [...indices].sort((a, b) => a - b)) {
    if (first < 0 || index > last + 2) {
      if (first >= 0) attribute.addUpdateRange(first * 3, (last - first + 1) * 3);
      first = index;
    }
    last = index;
  }
  attribute.addUpdateRange(first * 3, (last - first + 1) * 3);
}

export function makeTerrainEditor({ ground, surfaceY, waterAt = () => null, vertexColumns }) {
  const { geometry } = ground;
  const positions = geometry.getAttribute('position');
  const colors = geometry.getAttribute('color');
  positions.setUsage(DynamicDrawUsage);
  geometry.getAttribute('normal')?.setUsage(DynamicDrawUsage);
  colors?.setUsage(DynamicDrawUsage);
  const baseHeights = new Map();
  const baseColors = new Map();
  const exposedEarth = new Color('#a08b68');

  function verticesNear(area, visit, padding = blendWidth) {
    const left = area.left - padding, right = area.right + padding;
    const top = area.top - padding, bottom = area.bottom + padding;
    if (!vertexColumns) {
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i), z = positions.getZ(i);
        if (x >= left && x <= right && z >= top && z <= bottom) visit(i, x, z);
      }
      return;
    }

    for (let row = 0; row < positions.count; row += vertexColumns) {
      const z = positions.getZ(row);
      if (z < top) continue;
      if (z > bottom) break;
      let start = row, end = row + vertexColumns;
      while (start < end) {
        const middle = (start + end) >> 1;
        if (positions.getX(middle) < left) start = middle + 1;
        else end = middle;
      }
      for (let i = start; i < row + vertexColumns; i++) {
        const x = positions.getX(i);
        if (x > right) break;
        visit(i, x, z);
      }
    }
  }

  function tileSupports(area) {
    const supports = new Map();
    function add(x, z, vertices) {
      const key = cellKey({ x, z });
      if (!supports.has(key)) supports.set(key, new Set());
      for (const index of vertices) supports.get(key).add(index);
    }

    const indices = geometry.index;
    verticesNear(area, (index, x, z) => {
      if (!indices || !vertexColumns) {
        add(Math.floor(x), Math.floor(z), [index]);
        return;
      }
      const column = index % vertexColumns, row = Math.floor(index / vertexColumns);
      if (column === vertexColumns - 1 || index + vertexColumns + 1 >= positions.count) return;
      const first = (row * (vertexColumns - 1) + column) * 6;
      for (let offset = 0; offset < 6; offset += 3) {
        const triangle = [0, 1, 2].map(i => indices.getX(first + offset + i));
        const xs = triangle.map(i => positions.getX(i)), zs = triangle.map(i => positions.getZ(i));
        for (let tx = Math.floor(Math.min(...xs)); tx < Math.max(...xs) - epsilon; tx++) {
          for (let tz = Math.floor(Math.min(...zs)); tz < Math.max(...zs) - epsilon; tz++) {
            // The tile axes are already covered by the bounding box above. Check the
            // three triangle axes so a shared corner does not block a neighboring tile.
            const overlaps = xs.every((vx, i) => {
              const next = (i + 1) % 3;
              const nx = zs[i] - zs[next], nz = xs[next] - vx;
              const side = (tx - vx) * nx + (tz - zs[i]) * nz;
              const opposite = (xs[(i + 2) % 3] - vx) * nx + (zs[(i + 2) % 3] - zs[i]) * nz;
              return opposite > 0 ? side + Math.max(0, nx) + Math.max(0, nz) > epsilon :
                side + Math.min(0, nx) + Math.min(0, nz) < -epsilon;
            });
            if (overlaps) add(tx, tz, triangle);
          }
        }
      }
    }, 2);
    return supports;
  }

  function tileRestriction(cell, lockCell) {
    const lock = lockCell?.(cell);
    if (lock) return typeof lock === 'string' ? lock : lockedMessage;
    for (const u of [.02, .5, .98]) for (const v of [.02, .5, .98]) {
      if (waterAt(cell.x + u, cell.z + v)) return waterMessage;
    }
    return '';
  }

  function flatten(area, y, isLocked, lockCell, softEdges) {
    const core = [], skipped = [], support = new Set(), frozen = new Set();
    const supports = tileSupports(area);
    const blocked = new Map();
    const maximum = softEdges ? 2 : 1;
    for (let x = area.left - maximum; x < area.right + maximum; x++) {
      for (let z = area.top - maximum; z < area.bottom + maximum; z++) {
        const cell = { x, z }, key = cellKey(cell), reason = tileRestriction(cell, lockCell);
        if (!reason) continue;
        blocked.set(key, reason);
        for (const index of supports.get(key) ?? []) frozen.add(index);
      }
    }

    for (let x = area.left; x < area.right; x++) for (let z = area.top; z < area.bottom; z++) {
      const cell = { x, z }, key = cellKey(cell), bounds = tileBounds(cell);
      const vertices = supports.get(key);
      let reason = blocked.get(key);
      if (!reason && !vertices?.size) reason = 'Ô nằm ngoài phần địa hình có thể chỉnh.';
      for (const index of vertices ?? []) {
        if (reason) break;
        if (Math.abs(positions.getY(index) - y) < epsilon) continue;
        const vx = positions.getX(index), vz = positions.getZ(index);
        const lock = isLocked?.(vx, vz);
        if (waterAt(vx, vz)) reason = waterMessage;
        else if (lock || frozen.has(index)) reason = typeof lock === 'string' ? lock : lockedMessage;
        else if (distanceFrom(bounds, vx, vz) >= maximum) reason = 'Mép ô quá rộng để san với viền chuyển tiếp này.';
      }
      if (reason) skipped.push({ ...cell, reason });
      else {
        core.push(cell);
        for (const index of vertices) support.add(index);
      }
    }
    if (!core.length) {
      return { changes: [], cells: [], core, transition: [], skipped, targetY: y,
        error: skipped[0]?.reason || 'Không có ô nào có thể san ở đây.', errorCell: skipped[0] };
    }

    const changes = [], transition = new Map();
    const selected = new Set(core.map(cellKey));
    const skippedKeys = new Set(skipped.map(cellKey));
    verticesNear(area, (index, x, z) => {
      const required = support.has(index);
      const oldY = positions.getY(index);
      const cell = toCell(x, z);
      const key = cellKey(cell);
      let distance = maximum;
      if (!required) {
        if (frozen.has(index) || skippedKeys.has(key) || waterAt(x, z) || isLocked?.(x, z)) return;
        for (let tx = cell.x - maximum; tx <= cell.x + maximum; tx++) {
          for (let tz = cell.z - maximum; tz <= cell.z + maximum; tz++) {
            const tile = { x: tx, z: tz };
            if (selected.has(cellKey(tile))) distance = Math.min(distance, distanceFrom(tileBounds(tile), x, z));
          }
        }
        if (distance >= maximum) return;
      }
      const newY = Math.fround(required ? y : lerp(y, oldY, smoothstep(distance, 0, maximum)));
      if (Math.abs(oldY - newY) < epsilon) return;
      changes.push({ index, oldY, newY });
      if (!selected.has(key) && !skippedKeys.has(key)) transition.set(key, cell);
    }, maximum);
    return { changes, cells: [...core, ...transition.values()], core, transition: [...transition.values()], skipped, targetY: y, error: '' };
  }

  function plan(area, targetAt, isLocked, preserveWetShoulder, trimLockedShoulder = false) {
    const changes = [], cells = new Map();
    const trimmed = new Map();
    let error = '', errorCell;
    verticesNear(area, (index, x, z) => {
      if (error) return;
      const target = targetAt(x, z);
      if (!target || target.distance >= blendWidth) return;
      const oldY = positions.getY(index);
      const targetY = target.cutOnly ? Math.min(oldY, target.y) : target.y;
      const newY = Math.fround(lerp(targetY, oldY, smoothstep(target.distance, 0, blendWidth)));
      if (Math.abs(oldY - newY) < epsilon) return;
      const cell = toCell(x, z);
      const wet = waterAt(x, z);
      if (wet && preserveWetShoulder && target.distance > epsilon) return;
      const lock = isLocked?.(x, z);
      if (lock && trimLockedShoulder && target.distance > epsilon) {
        trimmed.set(cellKey(cell), cell);
        return;
      }
      if (wet || lock) {
        error = wet ? waterMessage : typeof lock === 'string' ? lock : lockedMessage;
        errorCell = cell;
        return;
      }
      changes.push({ index, oldY, newY });
      cells.set(cellKey(cell), cell);
    });
    return { changes: error ? [] : changes, error, errorCell, cells: [...cells.values()], trimmed: [...trimmed.values()] };
  }

  function curvedSlope(cells, isLocked, lockCell, trimLockedShoulder) {
    const failure = (error, errorCell) => ({ changes: [], cells: [], core: cells, error, errorCell });
    if (cells.length < 2) return failure('Kéo từ đầu này tới đầu kia của dốc.', cells[0]);
    if (cells.length > maxRampTiles) return failure(`Mỗi lần làm dốc tối đa ${maxRampTiles} ô.`, cells[maxRampTiles]);
    const seen = new Set();
    const segments = [];
    const from = cells[0], to = cells.at(-1);
    const startY = surfaceY(from.x + .5, from.z + .5), endY = surfaceY(to.x + .5, to.z + .5);
    let length = 0;
    for (const [index, cell] of cells.entries()) {
      const key = cellKey(cell), prev = cells[index - 1];
      if (seen.has(key)) return failure('Nét làm dốc bị tự giao nhau.', cell);
      seen.add(key);
      if (!prev) continue;
      const dx = cell.x - prev.x, dz = cell.z - prev.z;
      if (Math.abs(dx) + Math.abs(dz) !== 1) return failure('Nét làm dốc phải nối các ô liền cạnh.', cell);
      segments.push({ x: prev.x + .5, z: prev.z + .5, dx, dz, distance: length });
      length += Math.hypot(dx, dz);
    }
    const grade = Math.abs(endY - startY) / length;
    if (grade > maxRampGrade) return failure('Kéo dài nét vẽ để dốc thoải hơn.', to);
    for (const [index, cell] of cells.entries()) {
      const restriction = tileRestriction(cell, lockCell);
      if (restriction) return failure(restriction, cell);
      for (let prior = 0; prior < index - 2; prior++) {
        const other = cells[prior];
        if (Math.abs(cell.x - other.x) + Math.abs(cell.z - other.z) <= 1) {
          return failure('Chừa ít nhất một ô đệm giữa hai nhánh dốc.', cell);
        }
      }
    }

    const bounds = cells.map(tileBounds);
    const area = { left: Math.min(...cells.map(cell => cell.x)), right: Math.max(...cells.map(cell => cell.x)) + 1,
      top: Math.min(...cells.map(cell => cell.z)), bottom: Math.max(...cells.map(cell => cell.z)) + 1 };
    const result = plan(area, (x, z) => {
      const distance = Math.min(...bounds.map(bound => distanceFrom(bound, x, z)));
      if (distance >= blendWidth) return null;
      let nearest = Infinity, progress = 0;
      for (const segment of segments) {
        const t = clamp((x - segment.x) * segment.dx + (z - segment.z) * segment.dz, 0, 1);
        const gap = Math.hypot(x - segment.x - t * segment.dx, z - segment.z - t * segment.dz);
        if (gap < nearest) {
          nearest = gap;
          progress = (segment.distance + t) / length;
        }
      }
      return { y: lerp(startY, endY, progress), distance };
    }, isLocked, true, trimLockedShoulder);
    const transition = result.cells.filter(cell => !seen.has(cellKey(cell)));
    return { ...result, cells: [...cells, ...transition], core: cells, transition, grade, length, skipped: [] };
  }

  function slopeRibbon(ribbon, isLocked, lockCell, trimLockedShoulder) {
    const { cells, points, width } = ribbon;
    const from = points[0], to = points.at(-1);
    const startY = surfaceY(...from), endY = surfaceY(...to);
    let length = 0;
    const segments = points.slice(1).map((point, i) => {
      const [x, z] = points[i], dx = point[0] - x, dz = point[1] - z;
      const span = Math.hypot(dx, dz), segment = { x, z, dx, dz, span, at: length };
      length += span;
      return segment;
    });
    const grade = Math.abs(endY - startY) / length;
    const failure = (error, errorCell) => ({ changes: [], cells, core: cells, transition: [], grade, error, errorCell, ribbon });
    if (grade > maxRampGrade) return failure('Kéo dài nét vẽ để dốc thoải hơn.', toCell(...to));
    for (const cell of cells) {
      const restriction = tileRestriction(cell, lockCell);
      if (restriction) return failure(restriction, cell);
    }
    const area = { left: Math.min(...cells.map(cell => cell.x)), right: Math.max(...cells.map(cell => cell.x)) + 1,
      top: Math.min(...cells.map(cell => cell.z)), bottom: Math.max(...cells.map(cell => cell.z)) + 1 };
    function profileAt(x, z) {
      let nearest = Infinity, progress = 0;
      for (const { x: sx, z: sz, dx, dz, span, at } of segments) {
        const t = clamp(((x - sx) * dx + (z - sz) * dz) / span ** 2, 0, 1);
        const gap = Math.hypot(x - sx - t * dx, z - sz - t * dz);
        if (gap < nearest) [nearest, progress] = [gap, (at + t * span) / length];
      }
      const first = segments[0], last = segments.at(-1);
      const beyondStart = -((x - from[0]) * first.dx + (z - from[1]) * first.dz) / first.span;
      const beyondEnd = ((x - to[0]) * last.dx + (z - to[1]) * last.dz) / last.span;
      const endDistance = progress === 0 ? beyondStart : progress === 1 ? beyondEnd : 0;
      return { y: lerp(startY, endY, progress), distance: Math.max(0, nearest - width / 2, endDistance) };
    }
    const result = plan(area, profileAt, isLocked, true, trimLockedShoulder);
    const keys = new Set(cells.map(cellKey));
    const transition = result.cells.filter(cell => !keys.has(cellKey(cell)));
    return { ...result, cells: [...cells, ...transition], core: cells, transition, grade, length, ribbon,
      targetAt: (x, z) => profileAt(x, z).y };
  }

  function planBrush({ mode, from, to, size, isLocked, lockCell, cells, ribbon, softEdges = false, trimLockedShoulder = false }) {
    const area = {
      left: Math.min(from.x, to.x), right: Math.max(from.x, to.x) + 1,
      top: Math.min(from.z, to.z), bottom: Math.max(from.z, to.z) + 1,
    };
    const originX = from.x + .5, originZ = from.z + .5;
    const originY = surfaceY(originX, originZ);
    if (mode === 'flatten') {
      if (waterAt(originX, originZ)) {
        return { changes: [], cells: [], core: [], error: 'Chọn một ô đất khô làm cao độ san.', errorCell: from };
      }
      if (from.x === to.x && from.z === to.z && [1, 3, 4].includes(size)) {
        const offset = Math.floor((size - 1) / 2);
        area.left = to.x - offset;
        area.top = to.z - offset;
        area.right = area.left + size;
        area.bottom = area.top + size;
      }
      const limitedTo = {
        x: clamp(to.x, from.x - maxFlattenTiles + 1, from.x + maxFlattenTiles - 1),
        z: clamp(to.z, from.z - maxFlattenTiles + 1, from.z + maxFlattenTiles - 1),
      };
      if (limitedTo.x !== to.x || limitedTo.z !== to.z) {
        area.left = Math.min(from.x, limitedTo.x);
        area.right = Math.max(from.x, limitedTo.x) + 1;
        area.top = Math.min(from.z, limitedTo.z);
        area.bottom = Math.max(from.z, limitedTo.z) + 1;
      }
      return { ...flatten(area, originY, isLocked, lockCell, softEdges), capped: limitedTo.x !== to.x || limitedTo.z !== to.z };
    }

    if (ribbon) return slopeRibbon(ribbon, isLocked, lockCell, trimLockedShoulder);
    if (cells) return curvedSlope(cells, isLocked, lockCell, trimLockedShoulder);
    const dx = to.x - from.x, dz = to.z - from.z;
    const length = Math.hypot(dx, dz);
    const endY = surfaceY(to.x + .5, to.z + .5);
    if (!length || Math.abs(endY - originY) / length > maxRampGrade) {
      return {
        changes: [], cells: [], errorCell: to,
        error: length ? 'Kéo dài vùng chọn để dốc thoải hơn.' : 'Kéo từ đầu này tới đầu kia của dốc.',
      };
    }
    return plan(area, (x, z) => {
      const t = clamp(((x - originX) * dx + (z - originZ) * dz) / length ** 2, 0, 1);
      return { y: lerp(originY, endY, t), distance: distanceFrom(area, x, z) };
    }, isLocked);
  }

  function planRoad(edits, isLocked) {
    if (!edits.length) return { changes: [], error: '', cells: [] };
    const stations = edits.map(edit => {
      const { x, z, axis, width } = edit;
      const halfX = axis === X ? .5 : width / 2;
      const halfZ = axis === X ? width / 2 : .5;
      return { ...edit, left: x - halfX, right: x + halfX, top: z - halfZ, bottom: z + halfZ };
    });
    const area = {
      left: Math.min(...stations.map(station => station.left)),
      right: Math.max(...stations.map(station => station.right)),
      top: Math.min(...stations.map(station => station.top)),
      bottom: Math.max(...stations.map(station => station.bottom)),
    };
    return plan(area, (x, z) => {
      let closestY, distance = Infinity, height = 0, total = 0;
      let cutDistance = Infinity, fillDistance = Infinity;
      for (const station of stations) {
        const gap = distanceFrom(station, x, z);
        if (gap >= blendWidth) continue;
        const offset = station.axis === X ? x - station.x : z - station.z;
        const y = lerp(station.startY ?? station.y, station.endY ?? station.y, clamp(offset + .5, 0, 1));
        if (gap < distance) {
          closestY = y;
          distance = gap;
        }
        if (station.cutOnly) cutDistance = Math.min(cutDistance, gap);
        else fillDistance = Math.min(fillDistance, gap);
        const weight = Math.max(0, 1 - Math.abs(offset)) * (1 - smoothstep(gap, 0, blendWidth));
        height += y * weight;
        total += weight;
      }
      if (closestY === undefined) return null;
      return { y: total ? height / total : closestY, distance, cutOnly: cutDistance <= fillDistance };
    }, isLocked, true);
  }

  function planRoadCorridor(route, { mode, width, isLocked, shoulder = blendWidth }) {
    const core = route.cells;
    const failed = (error, errorCell) => ({ error, errorCell, changes: [], cells: [], core, transition: [] });
    if (route.error || !core.length) return failed(route.error || 'Chọn một tuyến trên đất khô.');
    const water = core.find(cell => tileRestriction(cell));
    if (water) return failed(waterMessage, water);

    const segments = [];
    let length = 0;
    for (const [[ax, az], [bx, bz]] of route.points.slice(1).map((point, i) => [route.points[i], point])) {
      const dx = bx - ax, dz = bz - az, span = Math.hypot(dx, dz);
      if (!span) continue;
      segments.push({ x: ax, z: az, dx, dz, span, start: length });
      length += span;
    }
    const marks = [];
    for (const { x, z, dx, dz, span, start } of segments) {
      const count = Math.ceil(span / .65);
      for (let i = 0; i < count; i++) marks.push({ s: start + span * i / count, y: surfaceY(x + dx * i / count, z + dz * i / count) });
    }
    marks.push({ s: length, y: surfaceY(...route.points.at(-1)) });
    const first = marks[0].y, last = marks.at(-1).y;
    const grade = width === 1 ? .31 : .23;
    const heights = marks.map(mark => mark.y).sort((a, b) => a - b);
    if (mode === 'slope') {
      const spanRise = grade * length;
      const startTarget = Math.abs(last - first) <= spanRise ? first :
        clamp(first, last - spanRise / 2 - maxRoadEarthwork * .75, last + spanRise / 2 + maxRoadEarthwork * .75);
      const endTarget = clamp(last, startTarget - spanRise, startTarget + spanRise);
      if (Math.abs(startTarget - first) > maxRoadEarthwork || Math.abs(endTarget - last) > maxRoadEarthwork) {
        return failed('Hai đầu tuyến chênh cao quá lớn. Kéo dài đường hoặc đi vòng.', core.at(-1));
      }
      marks[0].y = startTarget;
      marks[marks.length - 1].y = endTarget;
      for (const mark of marks) {
        const remaining = length - mark.s;
        mark.y = clamp(mark.y, Math.max(startTarget - grade * mark.s, endTarget - grade * remaining),
          Math.min(startTarget + grade * mark.s, endTarget + grade * remaining));
      }
      for (let i = 1; i < marks.length - 1; i++) {
        const previous = marks[i - 1], mark = marks[i], rise = grade * (mark.s - previous.s);
        mark.y = clamp(mark.y, previous.y - rise, previous.y + rise);
      }
    }
    function targetAt(x, z) {
      if (mode === 'flatten') return heights[Math.floor(heights.length / 2)];
      let distance = Infinity, s = 0;
      for (const segment of segments) {
        const px = x - segment.x, pz = z - segment.z;
        const t = clamp((px * segment.dx + pz * segment.dz) / segment.span ** 2, 0, 1);
        const gap = (px - t * segment.dx) ** 2 + (pz - t * segment.dz) ** 2;
        if (gap >= distance) continue;
        distance = gap;
        s = segment.start + t * segment.span;
      }
      const right = marks.findIndex(mark => mark.s >= s);
      if (right < 0) return marks.at(-1).y;
      if (right <= 0) return marks[0].y;
      const a = marks[right - 1], b = marks[right];
      return lerp(a.y, b.y, (s - a.s) / (b.s - a.s));
    }

    const area = { left: Math.min(...core.map(cell => cell.x)), right: Math.max(...core.map(cell => cell.x)) + 1,
      top: Math.min(...core.map(cell => cell.z)), bottom: Math.max(...core.map(cell => cell.z)) + 1 };
    const supports = tileSupports(area), required = new Set();
    const selected = new Set(core.map(cellKey)), transition = new Map(), changes = [];
    for (const key of selected) for (const index of supports.get(key) ?? []) required.add(index);
    let tooDeep, blocked, maxChange = 0, movedHeight = 0;
    verticesNear(area, (index, x, z) => {
      const cell = toCell(x, z), key = cellKey(cell);
      let distance = required.has(index) ? 0 : shoulder;
      if (distance) {
        for (let tx = cell.x - Math.ceil(shoulder); tx <= cell.x + Math.ceil(shoulder); tx++) {
          for (let tz = cell.z - Math.ceil(shoulder); tz <= cell.z + Math.ceil(shoulder); tz++) {
            const tile = { x: tx, z: tz };
            if (selected.has(cellKey(tile))) distance = Math.min(distance, distanceFrom(tileBounds(tile), x, z));
          }
        }
      }
      if (distance >= shoulder) return;
      const oldY = positions.getY(index);
      const newY = Math.fround(lerp(targetAt(x, z), oldY, smoothstep(distance, 0, shoulder)));
      const delta = Math.abs(newY - oldY);
      if (delta < epsilon) return;
      const restriction = waterAt(x, z) ? waterMessage : isLocked?.(x, z);
      if (restriction) {
        if (!distance) blocked ??= { cell, reason: typeof restriction === 'string' ? restriction : lockedMessage };
        return;
      }
      if (delta > maxRoadEarthwork) { tooDeep ??= cell; return; }
      changes.push({ index, oldY, newY });
      maxChange = Math.max(maxChange, delta);
      movedHeight += delta;
      if (!selected.has(key)) transition.set(key, cell);
    }, shoulder);
    if (tooDeep) return failed('Phải đào hoặc đắp quá sâu. Thử kéo dài tuyến hoặc đi vòng.', tooDeep);
    if (!changes.length && blocked) return failed(blocked.reason, blocked.cell);
    return { error: '', changes, core, cells: [...core, ...transition.values()], transition: [...transition.values()],
      targetAt, maxChange, movedHeight, blocked };
  }

  function visitNeighbors(index, visit) {
    if (!vertexColumns) {
      visit(index);
      return;
    }
    const column = index % vertexColumns;
    for (let row = -1; row <= 1; row++) for (let col = -1; col <= 1; col++) {
      if (column + col < 0 || column + col >= vertexColumns) continue;
      const neighbor = index + row * vertexColumns + col;
      if (neighbor >= 0 && neighbor < positions.count) visit(neighbor);
    }
  }

  function apply(changes, useNew = true) {
    if (!changes.length) return;
    const moved = new Set(), normals = new Set();
    for (const { index, oldY, newY } of changes) {
      if (!baseHeights.has(index)) baseHeights.set(index, oldY);
      positions.setY(index, useNew ? newY : oldY);
      moved.add(index);
      visitNeighbors(index, neighbor => normals.add(neighbor));
    }
    uploadRanges(positions, moved);
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    const normal = geometry.getAttribute('normal');
    uploadRanges(normal, normals);
    if (colors) {
      const recolored = new Set();
      for (const index of normals) {
        let edited = false;
        visitNeighbors(index, neighbor => {
          const baseY = baseHeights.get(neighbor);
          edited ||= baseY !== undefined && Math.abs(positions.getY(neighbor) - baseY) >= epsilon;
        });
        if (!edited && !baseColors.has(index)) continue;
        if (!baseColors.has(index)) baseColors.set(index, [colors.getX(index), colors.getY(index), colors.getZ(index)]);
        const [r, g, b] = baseColors.get(index);
        const amount = edited ? (1 - smoothstep(normal.getY(index), .48, .85)) * .86 : 0;
        colors.setXYZ(index, lerp(r, exposedEarth.r, amount), lerp(g, exposedEarth.g, amount), lerp(b, exposedEarth.b, amount));
        recolored.add(index);
      }
      uploadRanges(colors, recolored);
      if (recolored.size) colors.needsUpdate = true;
    }
    geometry.boundingBox = null;
    geometry.boundingSphere = null;
  }

  function heightDeltas() {
    const deltas = [];
    for (const [index, oldY] of baseHeights) {
      const newY = positions.getY(index);
      if (Math.abs(newY - oldY) >= epsilon) deltas.push({ index, oldY, newY });
    }
    return deltas;
  }

  function restoreDeltas(deltas) {
    if (!Array.isArray(deltas) || deltas.length > positions.count) return false;
    const indices = new Set();
    for (const item of deltas) {
      if (!item) return false;
      const { index, oldY, newY } = item;
      if (!Number.isInteger(index) || index < 0 || index >= positions.count || indices.has(index) ||
        !Number.isFinite(oldY) || !Number.isFinite(newY) || !Number.isFinite(Math.fround(newY)) ||
        Math.abs(positions.getY(index) - oldY) >= epsilon || waterAt(positions.getX(index), positions.getZ(index))) return false;
      indices.add(index);
    }
    apply(deltas);
    return true;
  }

  return { planBrush, planRoad, planRoadCorridor, apply, heightDeltas, restoreDeltas };
}
