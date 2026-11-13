import { cellKey, crossSection, sameCell, X, Z } from './roads';
import { centerlineLength, roadLengthLimit } from './road-centerline';
import { curveEndpoints, roadCurves } from './road-shapes';

export { centerlineLength, roadLengthLimit, roadRange, roadPrefix, sliceRoadStroke, snapRoadEndpoints } from './road-centerline';

const roadRules = {
  bridgeLimit: 6,
  deckThickness: .22,
  clearance: .30,
  crossSlope: .18,
  cutFill: .22,
  approachCut: .25,
  approachFill: .85,
  approachExtension: 3,
  pillarHeight: 4,
};
export { roadRules };

const along = (cell, axis) => axis === X ? cell.x : cell.z;
const across = (cell, axis) => axis === X ? cell.z : cell.x;
const point = (axis, t, side) => axis === X ? { x: t, z: side } : { x: side, z: t };
const moveAxis = (a, b) => a.x === b.x ? Z : X;
const stepSlope = width => width === 1 ? .35 : .27;
const signs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const distanceTo = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.z - b.z);
const linearCells = (axis, from, to, side) => Array.from({ length: Math.abs(to - from) + 1 },
  (_, i) => point(axis, from + i * Math.sign(to - from), side));

// Insert every intervening grid step, including on fast diagonal gestures.
export function extendStroke(stroke, cell) {
  if (!stroke.length) return [cell];
  if (sameCell(stroke.at(-1), cell)) return stroke;
  const result = [...stroke];
  let { x, z } = result.at(-1);
  const dx = Math.abs(cell.x - x), dz = Math.abs(cell.z - z);
  const sx = Math.sign(cell.x - x), sz = Math.sign(cell.z - z);
  let ix = 0, iz = 0;
  while (ix < dx || iz < dz) {
    if (ix < dx && (iz === dz || (ix + .5) * dz <= (iz + .5) * dx)) {
      x += sx;
      ix++;
    } else {
      z += sz;
      iz++;
    }
    const step = { x, z };
    if (sameCell(step, result.at(-2))) result.pop();
    else result.push(step);
  }
  return result;
}

function stationCells(cell, axis, width) {
  return Array.from({ length: width }, (_, i) => point(axis, along(cell, axis), across(cell, axis) + i));
}

function sampleStation(cell, axis, width, surfaceY, waterAt) {
  const t = along(cell, axis), side = across(cell, axis);
  const middle = point(axis, t + .5, side + width / 2);
  const height = ({ x, z }) => surfaceY(x, z);
  const heights = [], crossHeights = [];
  let water = null, prohibitedWater = null, maxCrossSlope = 0;
  for (const f of [.02, .25, .5, .75, .98]) {
    const section = [];
    for (let i = 0; i < width; i++) {
      for (const offset of [.02, .25, .5, .75, .98]) {
        const at = point(axis, t + f, side + i + offset);
        const hit = waterAt(at.x, at.z);
        if (hit && hit.kind !== 'river') prohibitedWater = hit;
        if (hit && (!water || hit.y > water.y)) water = hit;
        section.push(height(at));
      }
    }
    const a = height(point(axis, t + f, side + .02));
    const b = height(point(axis, t + f, side + width - .02));
    maxCrossSlope = Math.max(maxCrossSlope, Math.abs(a - b) / (width - .04));
    heights.push(...section);
    crossHeights.push({ t: t + f, low: Math.min(...section), high: Math.max(...section) });
  }
  const profile = [0, .25, .5, .75, 1].map(f => height(point(axis, t + f, side + width / 2)));
  const edgeCrown = [0, 1].map(f => Math.max(...Array.from({ length: width * 4 + 1 },
    (_, i) => height(point(axis, t + f, side + i / 4)))));
  const grade = Math.max(...profile.slice(1).map((y, i) => Math.abs(y - profile[i]) * 4));
  return {
    ...middle, t, side, axis, water, prohibitedWater, maxCrossSlope, grade, profile, crossHeights, edgeCrown,
    y: height(middle), low: Math.min(...heights), high: Math.max(...heights),
    cells: stationCells(cell, axis, width),
  };
}

function approach(stations, first, direction, deckEdge, deckY, width, allowLeveling) {
  const axis = stations[first - direction]?.axis;
  const spanSide = stations[first - direction]?.side;
  const dry = [];
  let terrainBlocked = false;
  for (let i = first; i >= 0 && i < stations.length; i += direction) {
    const station = stations[i];
    if (station.axis !== axis || station.side !== spanSide || station.water || station.turn) break;
    dry.push({ station, i });
    // The dry approach runs from the deck edge to the far edge of a dry tile.
    const outer = station.t + (station.t >= deckEdge ? 1 : 0);
    const limit = stepSlope(width);
    const firstEdge = outer === station.t;
    const centerY = station.profile[firstEdge ? 0 : 4];
    const availableRise = Math.abs(outer - deckEdge) * limit;
    if (Math.abs(centerY - deckY) > availableRise + 1e-6) continue;
    // Meet the crown when the outer bank has crossfall, within the permitted longitudinal rise.
    const groundY = Math.min(station.edgeCrown[firstEdge ? 0 : 1], centerY + .35, deckY + availableRise);
    const heightAt = t => deckY + (groundY - deckY) * ((t - deckEdge) / (outer - deckEdge));
    const requiredCuts = [];
    let supported = true;
    for (const item of dry) {
      const cut = Math.max(...item.station.crossHeights.map(section => section.high - heightAt(section.t)));
      const fill = Math.max(...item.station.crossHeights.map(section => heightAt(section.t) - section.low));
      if (fill > roadRules.approachFill || cut > (allowLeveling ? roadRules.approachCut : .05)) {
        supported = false;
        terrainBlocked = true;
        break;
      }
      if (cut > .05) requiredCuts.push(item.i);
    }
    if (supported) return { heightAt, endIndex: i, requiredCuts };
  }
  return { terrainBlocked };
}

function roadFootprint(cells, width, sections) {
  const footprint = new Map();
  const add = (cell, axis) => {
    const key = cellKey(cell);
    footprint.set(key, { ...cell, axes: (footprint.get(key)?.axes ?? 0) | axis });
  };
  for (const [i, cell] of cells.entries()) {
    const section = sections?.get(i);
    const incoming = i ? moveAxis(cells[i - 1], cell) : null;
    const outgoing = i + 1 < cells.length ? moveAxis(cell, cells[i + 1]) : null;
    if (incoming && outgoing && incoming !== outgoing) {
      // Both cross sections have space to meet across the full corner.
      for (let dx = 0; dx < width; dx++) for (let dz = 0; dz < width; dz++) {
        add({ x: cell.x + dx, z: cell.z + dz }, X | Z);
      }
    } else {
      const axis = incoming ?? outgoing ?? X;
      for (const tile of stationCells(section?.cell ?? cell, axis, section?.width ?? width)) add(tile, axis);
    }
  }
  return footprint;
}

function localDetour(cells, blocked, options) {
  if (!blocked || cells.length < 3) return null;
  const near = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.z - b.z);
  const center = cells.reduce((best, item, i) => near(item, blocked) < near(cells[best], blocked) ? i : best, 0);
  const from = Math.max(0, center - 3), to = Math.min(cells.length - 1, center + 3);
  const start = cells[from], end = cells[to];
  const queue = [{ cell: start, path: [start], distance: 0, rank: near(start, end) }];
  const seen = new Map([[cellKey(start), 0]]);
  for (let visits = 0; visits < 120 && queue.length; visits++) {
    queue.sort((a, b) => b.rank - a.rank);
    const current = queue.pop();
    if (sameCell(current.cell, end)) {
      const alternative = [...cells.slice(0, from), ...current.path, ...cells.slice(to + 1)];
      return planRoadStroke({ ...options, cells: alternative, suggestDetour: false }).error ? null : alternative;
    }
    for (const [dx, dz] of signs) {
      const cell = { x: current.cell.x + dx, z: current.cell.z + dz };
      if (near(cell, blocked) > 6) continue;
      const axis = dx ? X : Z;
      const next = sampleStation(cell, axis, options.width, options.surfaceY, options.waterAt);
      const crossLimit = options.width === 1 ? .28 : roadRules.crossSlope;
      const fromHeight = options.surfaceY(current.cell.x + (axis === X ? .5 : options.width / 2),
        current.cell.z + (axis === Z ? .5 : options.width / 2));
      if (next.water || next.cells.some(options.obstacle) || next.grade > stepSlope(options.width) ||
        Math.abs(next.y - fromHeight) > stepSlope(options.width) || next.maxCrossSlope > crossLimit) continue;
      const distance = current.distance + 1;
      const key = cellKey(cell);
      if (distance >= (seen.get(key) ?? Infinity)) continue;
      seen.set(key, distance);
      queue.push({ cell, path: [...current.path, cell], distance, rank: distance + near(cell, end) });
    }
  }
  return null;
}

function elevatedSpans(stations, limit) {
  const spans = new Map();
  for (let i = 1; i < stations.length - 1; i++) {
    const left = stations[i - 1];
    if (left.turn || left.water) continue;
    let bestEnd;
    for (let end = i; end < Math.min(stations.length - 1, i + limit); end++) {
      const current = stations[end];
      if (current.turn || current.water || current.axis !== left.axis || current.side !== left.side) break;
      const right = stations[end + 1];
      if (right.turn || right.water || right.axis !== left.axis || right.side !== left.side) continue;
      const span = stations.slice(i, end + 1);
      const deck = Math.min(left.y, right.y);
      if (span.every(item => item.y < deck - .05 && item.high <= deck + .05) &&
        span.some(item => item.low < deck - .35)) bestEnd = end;
    }
    if (bestEnd !== undefined) {
      spans.set(i, bestEnd);
      i = bestEnd + 1;
    }
  }
  return spans;
}

function solveRoadStroke({
  roads, cells, width = 1, material, surfaceY, waterAt, obstacle = () => '',
  allowLeveling = false, suggestDetour = false, sections, elevated = false, bridgeRetreat,
  readStation = (cell, axis, breadth) => sampleStation(cell, axis, breadth, surfaceY, waterAt),
  sliced,
}) {
  if (!cells.length || !Number.isInteger(width) || width < 1 || width > 4) {
    return { roads, cells: [], error: 'Chọn bề rộng đường từ 1 đến 4 ô.', errorCell: cells[0] ?? null,
      bridges: [], gradeEdits: [], width };
  }
  const footprint = sliced?.footprint ?? roadFootprint(cells, width, sections);
  const affected = [...footprint.values()];
  const result = { roads, cells: affected, error: '', errorCell: null, bridges: [], gradeEdits: [], width };
  const fail = (error, errorCell, canDetour = false) => ({
    ...result, error, errorCell,
    detour: canDetour && suggestDetour ? localDetour(cells, errorCell, {
      roads, width, material, surfaceY, waterAt, obstacle, allowLeveling,
    }) : null,
  });

  const existingEnds = new Set();
  for (const [i, neighbor] of [[0, cells[1]], [cells.length - 1, cells.at(-2)]]) {
    if (sliced) break;
    if (!neighbor) continue;
    const section = sections?.get(i);
    const end = section?.cell ?? cells[i];
    const endWidth = section?.width ?? width;
    const axis = moveAxis(cells[i], neighbor);
    const endCells = stationCells(end, axis, endWidth);
    const existing = roads.get(cellKey(end));
    if (existing?.approachBridgeId && existing.axes === axis &&
      endCells.every(tile => roads.get(cellKey(tile))?.approachBridgeId === existing.approachBridgeId) &&
      crossSection(roads, existing, axis).width === endWidth) {
      for (const tile of endCells) existingEnds.add(cellKey(tile));
    }
  }
  for (const tile of affected) {
    const key = cellKey(tile);
    const existing = roads.get(key);
    if (sliced?.preserved.has(key)) continue;
    if (existing?.bridgeId || (existing?.approachBridgeId && (!existingEnds.has(key) || existing.axes !== tile.axes))) {
      return fail('Đoạn này thuộc cầu hoặc đường dẫn đang có.', tile);
    }
    const error = obstacle(tile);
    if (error) return fail(error, tile, true);
  }

  const stations = sliced?.stations ?? cells.map((cell, i) => {
    const incoming = i ? moveAxis(cells[i - 1], cell) : null;
    const outgoing = i + 1 < cells.length ? moveAxis(cell, cells[i + 1]) : null;
    const section = sections?.get(i);
    const station = { ...readStation(section?.cell ?? cell, incoming ?? outgoing ?? X, section?.width ?? width) };
    station.width = section?.width ?? width;
    const key = cellKey(section?.cell ?? cell);
    if (existingEnds.has(key)) {
      const road = roads.get(key);
      station.y = road.roadY;
      station.profile = station.profile.map((_, n) => road.roadStartY + (road.roadEndY - road.roadStartY) * n / 4);
      station.grade = Math.abs(road.roadEndY - road.roadStartY);
      station.maxCrossSlope = 0;
    }
    if (incoming && outgoing && incoming !== outgoing) {
      station.turn = true;
      // Sample the full junction footprint before allowing a turn at the bank.
      for (const axis of [X, Z]) for (let offset = 0; offset < width; offset++) {
        const tile = point(axis, along(cell, axis) + offset, across(cell, axis));
        const branch = readStation(tile, axis, width);
        if (branch.water && (!station.water || branch.water.y > station.water.y)) station.water = branch.water;
        if (branch.prohibitedWater) station.prohibitedWater = branch.prohibitedWater;
        station.maxCrossSlope = Math.max(station.maxCrossSlope, branch.maxCrossSlope);
        station.grade = Math.max(station.grade, branch.grade);
      }
    }
    return station;
  });

  const next = new Map(roads);
  for (const [key, tile] of footprint) {
    const old = roads.get(key);
    if (sliced?.preserved.has(key) || (old && (old.axes & tile.axes) === tile.axes)) continue;
    next.set(key, { ...old, ...tile, material: old?.material ?? material, axes: (old?.axes ?? 0) | tile.axes });
  }
  const profiles = new Map();
  const bridges = [];
  const gradeEdits = [];
  const drySpans = elevated ? elevatedSpans(stations, roadRules.bridgeLimit) : new Map();
  for (let i = 0; i < stations.length; i++) {
    let station = stations[i];
    const viaduct = drySpans.has(i);
    if (!station.water && !viaduct) continue;
    let end = drySpans.get(i) ?? i;
    while (!viaduct && stations[end + 1]?.water) end++;
    const firstWet = i;
    const lastWet = end;
    if (!viaduct && bridgeRetreat && !bridges.length) {
      i -= bridgeRetreat[0];
      end += bridgeRetreat[1];
      if (i < 1 || end >= stations.length - 1 || end - i + 1 > roadRules.bridgeLimit ||
        stations.slice(i, firstWet).some(item => item.water) ||
        stations.slice(lastWet + 1, end + 1).some(item => item.water)) {
        return fail('Chưa đủ đất khô để lùi đầu cầu.', cells[firstWet]);
      }
      station = stations[i];
    }
    const span = stations.slice(i, end + 1);
    const prohibited = span.find(item => item.prohibitedWater);
    if (prohibited) return fail('Chỉ bắc cầu qua lòng suối, chừa khoảng cách với thác và biển.', cells[i + span.indexOf(prohibited)]);
    if (span.some(item => item.axis !== station.axis || item.side !== station.side || item.turn || item.width !== width)) {
      return fail('Cầu phải đi thẳng qua sông, hãy rẽ hướng sau khi lên bờ.', cells[i]);
    }
    if (!i || end === stations.length - 1) return fail('Kéo tới bờ bên kia để xem cầu.', cells[i]);
    if (span.length > roadRules.bridgeLimit) return fail(`Nhịp cầu tối đa ${roadRules.bridgeLimit} ô.`, cells[i]);
    const bankA = stations[i - 1], bankB = stations[end + 1];
    if (bankA.axis !== station.axis || bankA.side !== station.side ||
      bankB.axis !== station.axis || bankB.side !== station.side || bankA.turn || bankB.turn) {
      return fail('Cầu phải đi thẳng qua sông, hãy rẽ hướng sau khi lên bờ.', cells[i]);
    }
    const forward = station.t > bankA.t;
    const edgeA = station.t + (forward ? 0 : 1);
    const edgeB = stations[end].t + (forward ? 1 : 0);
    // The highest sampled water point must clear the underside, not just the deck top.
    let maxWaterY = viaduct ? null : Math.max(...span.filter(item => item.water).map(item => item.water.y));
    for (const item of span) for (const t of [item.t, item.t + 1]) {
      for (let offset = 0; offset <= width * 4; offset++) {
        const at = point(item.axis, t, item.side + offset / 4);
        const edgeWater = waterAt(at.x, at.z);
        if (edgeWater?.kind === 'river') maxWaterY = Math.max(maxWaterY, edgeWater.y);
      }
    }
    const dryDeckFloor = span.filter(item => !item.water).reduce((highest, item) =>
      Math.max(highest, Math.max(item.high, ...item.edgeCrown) + roadRules.deckThickness), -Infinity);
    const minDeckY = Math.max(bankA.y, bankB.y, dryDeckFloor,
      viaduct ? -Infinity : maxWaterY + roadRules.clearance + roadRules.deckThickness);
    let deckY = minDeckY;
    let approachA = approach(stations, i - 1, -1, edgeA, deckY, width, allowLeveling);
    let approachB = approach(stations, end + 1, 1, edgeB, deckY, width, allowLeveling);
    const cuts = (a, b) => a.heightAt && b.heightAt ? a.requiredCuts.length + b.requiredCuts.length : Infinity;
    // A modest rise can clear an uneven bank while avoiding excavation beside protected terrain.
    for (let step = 1; step <= 12 && cuts(approachA, approachB); step++) {
      const candidate = minDeckY + step * .025;
      const a = approach(stations, i - 1, -1, edgeA, candidate, width, allowLeveling);
      const b = approach(stations, end + 1, 1, edgeB, candidate, width, allowLeveling);
      if (cuts(a, b) < cuts(approachA, approachB)) {
        deckY = candidate;
        approachA = a;
        approachB = b;
      }
    }
    if (!approachA.heightAt || !approachB.heightAt) {
      const blockedA = !approachA.heightAt;
      const issue = blockedA ? approachA : approachB;
      const reason = issue.terrainBlocked ? 'Đường dẫn cầu bị chôn hoặc cao quá so với nền. Thử một vị trí bờ khác hoặc san đất.' :
        blockedA ? 'Lùi điểm bắt đầu để đủ đường dẫn lên cầu.' : 'Kéo xa hơn để đủ đường dẫn lên cầu.';
      return fail(reason, cells[blockedA ? i - 1 : end + 1]);
    }
    if (span.some(item => deckY - roadRules.deckThickness - item.low > roadRules.pillarHeight)) {
      return fail('Vực quá sâu, không thể dựng trụ đỡ.', cells[i]);
    }
    const bridgeCells = span.flatMap(item => item.cells);
    const low = Math.min(edgeA, edgeB), high = Math.max(edgeA, edgeB);
    const id = `bridge:${station.axis}:${station.side}:${low}:${high}`;
    const requiredCuts = new Set([...approachA.requiredCuts, ...approachB.requiredCuts]);
    for (let j = approachA.endIndex; j <= approachB.endIndex; j++) {
      const item = stations[j];
      const wet = j >= i && j <= end;
      const yAt = wet ? () => deckY : j < i ? approachA.heightAt : approachB.heightAt;
      if (profiles.has(j)) return fail('Hai đường dẫn cầu chồng nhau. Chừa thêm đất giữa hai nhịp.', cells[j]);
      profiles.set(j, { yAt, wet });
      const roadStartY = yAt(item.t), roadY = yAt(item.t + .5), roadEndY = yAt(item.t + 1);
      if (requiredCuts.has(j)) gradeEdits.push({
        x: item.x, z: item.z, y: roadY, width, axis: item.axis,
        startY: roadStartY, endY: roadEndY, cutOnly: true,
      });
      for (const tile of item.cells) {
        const key = cellKey(tile);
        if (next.get(key).axes !== item.axis) {
          return fail('Giữ đường dẫn và mặt cầu thẳng, đặt nút giao trên bờ.', tile);
        }
        const previous = roads.get(key);
        if (previous) {
          if (wet || Math.abs(item.y - roadY) > .02 ||
            Math.abs(item.profile[0] - roadStartY) > .02 || Math.abs(item.profile[4] - roadEndY) > .02 ||
            (previous.axes & ~item.axis)) {
            return fail('Đường dẫn cầu chạm đường hiện có. Hãy chừa thêm đất ở đầu cầu.', tile);
          }
          continue;
        }
        const bridge = wet ? { bridgeId: id, bridgeY: deckY, ...(viaduct ? { bridgeKind: 'viaduct' } : {}) } :
          { approachBridgeId: id };
        next.set(key, { ...next.get(key), ...bridge, roadY, roadStartY, roadEndY });
      }
    }
    bridges.push({
      id, axis: station.axis, width, y: deckY, maxWaterY, cells: bridgeCells,
      ...(viaduct ? { kind: 'viaduct' } : {}),
      start: point(station.axis, low, station.side + width / 2),
      end: point(station.axis, high, station.side + width / 2),
    });
    i = end;
  }

  const leveled = new Map();
  for (const [i, station] of stations.entries()) {
    const previous = stations[i - 1];
    const profile = profiles.get(i);
    // Approaches and deck are validated together and intentionally rise above the terrain.
    if (profile) continue;
    const before = previous && (profiles.get(i - 1)?.yAt(previous.t + .5) ?? leveled.get(i - 1) ?? previous.y);
    const distance = previous ? Math.hypot(station.x - previous.x, station.z - previous.z) : 1;
    const rise = previous && distance > .01 ? (station.y - before) / distance : 0;
    const limit = stepSlope(station.width);
    const crossLimit = station.width === 1 ? .28 : roadRules.crossSlope;
    const longitudinal = Math.max(Math.abs(rise), station.grade);
    const cross = station.maxCrossSlope;
    if (longitudinal <= limit && cross <= crossLimit) continue;
    const y = previous && Math.abs(rise) > limit ? before + Math.sign(rise) * limit * distance : station.y;
    if (allowLeveling && !station.turn && !station.cells.some(tile => roads.has(cellKey(tile))) &&
      longitudinal <= limit + .18 && cross <= crossLimit + .15 &&
      Math.max(Math.abs(station.low - y), Math.abs(station.high - y)) <= roadRules.cutFill) {
      gradeEdits.push({ x: station.x, z: station.z, y, width: station.width, axis: station.axis });
      leveled.set(i, y);
    } else {
      const error = cross > crossLimit ? `Đường ${station.width}× nghiêng ngang ${Math.round(cross * 100)}% tại đây.` :
        `Đoạn đường dốc dọc ${Math.round(longitudinal * 100)}% tại đây.`;
      return fail(error, cells[i], true);
    }
  }
  for (const tile of affected) for (const axis of [X, Z]) {
    if (sliced?.preserved.has(cellKey(tile))) continue;
    if (!(tile.axes & axis)) continue;
    const section = crossSection(next, next.get(cellKey(tile)), axis);
    if (section.width > 4) return fail('Đường rộng tối đa 4 ô.', tile);
    const deckCells = section.cells.filter(cell => cell.bridgeId || cell.approachBridgeId);
    if (deckCells.some(cell => (roads.has(cellKey(cell)) ?
      crossSection(roads, roads.get(cellKey(cell)), axis).width : width) !== section.width)) {
      return fail('Giữ nguyên bề rộng mặt cầu và đường dẫn.', tile);
    }
  }
  for (const [i, section] of sections ?? []) {
    if (!section.taper) continue;
    const station = stations[i];
    const { startCenter, endCenter, startWidth, endWidth } = section.taper;
    const minSide = Math.floor(Math.min(startCenter - startWidth / 2, endCenter - endWidth / 2));
    const maxSide = Math.ceil(Math.max(startCenter + startWidth / 2, endCenter + endWidth / 2));
    const envelope = readStation(point(station.axis, station.t, minSide), station.axis, maxSide - minSide);
    const blocked = envelope.cells.find(tile => obstacle(tile) ||
      (roads.has(cellKey(tile)) && !station.cells.some(cell => sameCell(cell, tile))));
    if (envelope.water || blocked) return fail('Chừa thêm đất hai bên để nối đúng bề rộng cầu.', blocked ?? cells[i]);
    for (const tile of envelope.cells) {
      if (!footprint.has(cellKey(tile))) affected.push({ ...tile, axes: station.axis });
    }
    const nearBridge = stations[i + 1];
    if (i === stations.length - 2 && existingEnds.has(cellKey(nearBridge.cells[0]))) {
      const atEnd = station.t < nearBridge.t;
      const bridgeEdgeY = nearBridge.profile[atEnd ? 0 : 4];
      const outerY = station.profile[atEnd ? 0 : 4];
      if (Math.abs(bridgeEdgeY - outerY) > stepSlope(station.width)) {
        return fail('Đầu đường dẫn cao quá so với nền.', cells[i]);
      }
      const roadStartY = atEnd ? outerY : bridgeEdgeY;
      const roadEndY = atEnd ? bridgeEdgeY : outerY;
      for (const tile of station.cells) {
        const key = cellKey(tile);
        if (!roads.has(key)) next.set(key, { ...next.get(key), roadStartY, roadEndY, roadY: (roadStartY + roadEndY) / 2 });
      }
    }
    for (const tile of station.cells) {
      const key = cellKey(tile);
      if (!roads.has(key)) next.set(key, { ...next.get(key), taper: section.taper });
    }
  }
  return { ...result, roads: next, bridges, gradeEdits, route: cells };
}

export function planSlicedRoad({ route, roads, width, surfaceY, waterAt, ...options }) {
  const fail = (error, errorCell, legacyBridge = false) => ({
    roads, width, cells: route.cells, bridges: [], gradeEdits: [], error, errorCell, legacyBridge,
  });
  if (route.error) return fail(route.error);
  const preserved = new Set(), curves = roadCurves(roads);
  for (const cell of route.cells) {
    const key = cellKey(cell), curve = curves.get(roads.get(key)?.roadCurveId);
    if (!curve) continue;
    const nearEnd = curveEndpoints(curve).some(([[x, z], [dx, dz]]) => {
      const side = (cell.x + .5 - x) * dx + (cell.z + .5 - z) * dz;
      if (side < -.7) return false;
      return [[route.points[0], route.points[1]], [route.points.at(-1), route.points.at(-2)]].some(([end, inner]) =>
        Math.hypot(end[0] - x, end[1] - z) <= .58 &&
        ((inner[0] - end[0]) * dx + (inner[1] - end[1]) * dz) > .76 * Math.hypot(inner[0] - end[0], inner[1] - end[1]));
    });
    if (!nearEnd) return fail('Nối đường tại đầu dải cong có sẵn.', cell);
    preserved.add(key);
  }
  const read = (cell, axis) => sampleStation(cell, axis, width, surfaceY, waterAt);
  const stations = route.slices.map(([first]) => ({ ...read(first, first.axes), width }));
  const corners = route.corners.flatMap(tiles => [
    ...tiles.filter(tile => tile.z === tiles[0].z).map(tile => read(tile, Z)),
    ...tiles.filter(tile => tile.x === tiles[0].x).map(tile => read(tile, X)),
  ]);
  if ([...stations, ...corners].some(station => station.water) || route.cells.some(cell => {
    const old = roads.get(cellKey(cell));
    return old?.bridgeId || old?.approachBridgeId ||
      [0.02, .5, .98].some(x => [0.02, .5, .98].some(z => waterAt(cell.x + x, cell.z + z)));
  })) return fail('Thử căn cầu theo tuyến hiện có.', undefined, true);
  const badCorner = corners.find(station => station.grade > stepSlope(width) ||
    station.maxCrossSlope > (width === 1 ? .28 : roadRules.crossSlope));
  if (badCorner) return fail('Góc cua quá dốc.', badCorner.cells[0]);
  const footprint = new Map(route.cells.map(cell => [cellKey(cell), cell]));
  return solveRoadStroke({ ...options, roads, width, surfaceY, waterAt, cells: route.slices.map(slice => slice[0]),
    sliced: { footprint, stations, preserved } });
}

export function limitBridgeStroke(trial, centerline) {
  if (trial.error || !trial.route?.length) return trial;
  const points = trial.route.map(({ x, z }) => [x + .5, z + .5]);
  const length = Math.max(centerline.length, centerlineLength(points));
  return { ...trial, length, error: length > roadLengthLimit + 1e-9 ? 'Tuyến và đường dẫn dài quá 60 đơn vị.' : '' };
}

function bridgeEndCandidates(options) {
  const { roads, cells, width } = options;
  if (cells.length < 2) return [];
  const end = cells.at(-1);
  const candidates = [];
  for (let x = end.x - 2; x <= end.x + 2; x++) for (let z = end.z - 2; z <= end.z + 2; z++) {
    const road = roads.get(cellKey({ x, z }));
    if (!road?.approachBridgeId || distanceTo(end, road) > 2) continue;
    const axis = road.axes;
    if (axis !== X && axis !== Z) continue;
    const section = crossSection(roads, road, axis);
    if (across(road, axis) !== section.lo) continue;
    const t = along(road, axis), side = across(road, axis);
    for (const sign of [-1, 1]) {
      const inside = roads.get(cellKey(point(axis, t - sign, side)));
      if ((inside?.bridgeId ?? inside?.approachBridgeId) !== road.approachBridgeId) continue;
      const outside = roads.get(cellKey(point(axis, t + sign, side)));
      if ((outside?.bridgeId ?? outside?.approachBridgeId) === road.approachBridgeId) continue;
      const lastWidth = section.width;
      const taper = Math.abs(width - lastWidth);
      const offset = Math.floor((lastWidth - width) / 2);
      const base = point(axis, t, side + offset);
      for (let join = cells.length - 2; join >= Math.max(0, cells.length - 9); join--) {
        const from = cells[join];
        const length = (along(from, axis) - t) * sign;
        if (length <= taper || Math.abs(across(from, axis) - across(base, axis)) > 2) continue;
        const anchor = point(axis, along(from, axis), across(base, axis));
        const prefix = extendStroke(cells.slice(0, join + 1), anchor);
        const suffix = linearCells(axis, along(anchor, axis), t, across(base, axis)).slice(1);
        const route = [...prefix, ...suffix];
        if (new Set(route.map(cellKey)).size !== route.length) continue;
        const sections = new Map();
        for (let n = 0; n < taper + 1; n++) {
          const index = route.length - 1 - n;
          const sectionWidth = lastWidth + Math.sign(width - lastWidth) * Math.min(n, taper);
          sections.set(index, {
            width: sectionWidth,
            cell: point(axis, along(route[index], axis), side + Math.floor((lastWidth - sectionWidth) / 2)),
          });
        }
        for (let n = 1; n <= taper; n++) {
          const index = route.length - 1 - n;
          const current = sections.get(index), inner = sections.get(index + 1);
          const [a, b] = sign < 0 ? [current, inner] : [inner, current];
          current.taper = {
            startCenter: across(a.cell, axis) + a.width / 2,
            endCenter: across(b.cell, axis) + b.width / 2,
            startWidth: a.width,
            endWidth: b.width,
          };
        }
        candidates.push({ cells: route, sections, score: distanceTo(end, road) + cells.length - join });
      }
    }
  }
  return candidates.sort((a, b) => a.score - b.score);
}

function riverAlignments(options) {
  const { cells } = options;
  const start = cells[0], end = cells.at(-1);
  if (!start || !end) return [];
  const axis = Math.abs(start.x - end.x) >= Math.abs(start.z - end.z) ? X : Z;
  return [axis, axis === X ? Z : X].flatMap(direction => riverAlignmentsAlong(options, direction));
}

function riverAlignmentsAlong({ cells, width, waterAt, readStation }, axis) {
  const isWater = (cell) => {
    for (let i = 0; i < width; i++) for (const offset of [.02, .5, .98]) {
      const at = point(axis, along(cell, axis) + .5, across(cell, axis) + i + offset);
      if (waterAt(at.x, at.z)?.kind === 'river') return true;
    }
    return false;
  };
  const first = cells.findIndex(isWater);
  const last = cells.findLastIndex(isWater);
  if (first < 1 || last === cells.length - 1) return [];
  const before = cells[first - 1], after = cells[last + 1];
  const sideA = across(before, axis), sideB = across(after, axis);
  if (Math.abs(sideA - sideB) > 2) return [];
  if (cells.slice(first, last + 1).some(cell => Math.abs(across(cell, axis) - sideA) > 2)) return [];
  const sign = Math.sign(along(after, axis) - along(before, axis));
  if (!sign) return [];
  const starts = [Math.max(0, first - 4), 0];
  const ends = [Math.min(cells.length - 1, last + 4), cells.length - 1];
  const sides = [...new Set([sideA, sideB, Math.round((sideA + sideB) / 2), sideA - 1, sideA + 1, sideA - 2, sideA + 2])];
  const candidates = [];
  for (const side of sides) for (let n = 0; n < 2; n++) {
    const a = starts[n], b = ends[n];
    if (Math.abs(across(cells[a], axis) - side) > 2 || Math.abs(across(cells[b], axis) - side) > 2) continue;
    const mid = linearCells(axis, along(cells[a], axis), along(cells[b], axis), side);
    const dry = cell => !readStation(cell, axis, width).water;
    if (!dry(mid[0]) || !dry(mid.at(-1))) continue;
    const left = a ? extendStroke(cells.slice(0, a + 1), mid[0]) : [mid[0]];
    const right = b < cells.length - 1 ?
      extendStroke([mid.at(-1)], cells[b]).slice(1).concat(cells.slice(b + 1)) : [];
    const route = [...left, ...mid.slice(1), ...right];
    if (route.some((cell, i) => i && distanceTo(cell, route[i - 1]) !== 1)) continue;
    if (new Set(route.map(cellKey)).size !== route.length) continue;
    candidates.push(route);
  }
  return candidates;
}

function extendApproaches(options, result) {
  const { cells } = options;
  if (!/đường dẫn lên cầu|Đường dẫn cầu bị chôn/.test(result.error) || cells.length < 2) return result;
  const extra = (end, neighbor, length) => {
    const axis = moveAxis(end, neighbor);
    const t = along(end, axis), sign = Math.sign(t - along(neighbor, axis));
    return linearCells(axis, t, t + length * sign, across(end, axis)).slice(1);
  };
  const tryExtensions = (bridgeRetreat) => {
    for (let n = bridgeRetreat ? 0 : 1; n <= roadRules.approachExtension * 2; n++) {
      for (let a = 0; a <= roadRules.approachExtension; a++) {
        const b = n - a;
        if (b < 0 || b > roadRules.approachExtension) continue;
        const longer = [
          ...extra(cells[0], cells[1], a).reverse(),
          ...cells,
          ...extra(cells.at(-1), cells.at(-2), b),
        ];
        if (new Set(longer.map(cellKey)).size !== longer.length) continue;
        const adjusted = solveRoadStroke({ ...options, cells: longer, suggestDetour: false, bridgeRetreat });
        if (!adjusted.error && adjusted.bridges.length === 1) return adjusted;
      }
    }
    return null;
  };
  const extended = tryExtensions(undefined);
  if (extended) return extended;
  if (/bị chôn/.test(result.error)) {
    for (let n = 1; n <= roadRules.approachExtension; n++) for (let a = 0; a <= n; a++) {
      const retreated = tryExtensions([a, n - a]);
      if (retreated) return retreated;
    }
  }
  return result;
}

export function planRoadStroke(options) {
  const config = { width: 1, ...options };
  if (config.assisted) {
    const cache = new Map();
    config.readStation = (cell, axis, width) => {
      const key = `${cellKey(cell)}:${axis}:${width}`;
      if (!cache.has(key)) cache.set(key, sampleStation(cell, axis, width, config.surfaceY, config.waterAt));
      return cache.get(key);
    };
  }
  const direct = solveRoadStroke(config);
  if (!config.assisted || config.cells.length < 2 || !Number.isInteger(config.width) ||
    config.width < 1 || config.width > 4) return direct;
  if (!direct.error && direct.bridges.length) return direct;
  if (direct.error) {
    const extended = extendApproaches(config, direct);
    if (!extended.error) return extended;
    if (/đi thẳng qua sông|đường dẫn lên cầu|Đường dẫn cầu bị chôn/.test(direct.error)) {
      for (const cells of riverAlignments(config)) {
        const aligned = { ...config, cells, suggestDetour: false };
        const result = extendApproaches(aligned, solveRoadStroke(aligned));
        if (!result.error && result.bridges.length === 1) return result;
      }
    }
  }
  for (const cells of [config.cells, [...config.cells].reverse()]) {
    for (const candidate of bridgeEndCandidates({ ...config, cells })) {
      const result = solveRoadStroke({ ...config, ...candidate, suggestDetour: false });
      if (!result.error) return result;
    }
  }
  return direct;
}
