window.TownModel = (() => {
  const key = ({ x, z }) => `${x},${z}`;
  const cellAt = ({ x, z }) => ({ x: Math.floor(x), z: Math.floor(z) });
  const center = ({ x, z }) => ({ x: x + .5, z: z + .5 });
  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  const initialHouse = { x: -1, z: -6, level: 0, rotation: 0 };
  const residents = [{ x: -10, z: -8, size: 3 }, { x: -5, z: -8, size: 3 }, { x: -10, z: 1, size: 3 }];
  const school = { x: 5, z: -7, size: 5 };
  const court = { x: 10, z: -5, size: 3 };
  const annex = { x: 9, z: 2, size: 4, rotation: 1 };
  const lodge = { x: -5, z: -4, size: 4 };
  const villa = { x: -10, z: -4, size: 3 };
  const chapel = { x: -10, z: 5, size: 4 };
  const construction = { x: -5, z: 8, size: 3 };
  const park = { x: -5, z: 2, size: 4 };
  const stop = { x: 6, z: 3, size: 3 };
  const fixedLots = [...residents, school, court, annex, lodge, villa, chapel, construction, park, stop];
  const footprint = ({ level }) => level === 3 ? 4 : 3;
  const riverX = z => -12.6 + 1.15 * Math.sin(z * .31);

  function contains(lot, { x, z }) {
    const size = lot.size ?? footprint(lot);
    return x >= lot.x && z >= lot.z && x < lot.x + size && z < lot.z + size;
  }

  function terrainError({ x, z }) {
    if ([z, z + .5, z + 1].some(depth => x < riverX(depth) + 1.12 && x + 1 > riverX(depth) - 1.12)) {
      return 'Ô đất chạm vào suối.';
    }
    return x < -16 || x > 16 || z < -11 || z > 10 ? 'Ô đất nằm ngoài vùng xây dựng.' : '';
  }

  function occupied(cell, house) {
    return (house && contains(house, cell)) || fixedLots.some(lot => contains(lot, cell));
  }

  function placementError(house, roads) {
    const size = footprint(house);
    for (let x = house.x; x < house.x + size; x++) {
      for (let z = house.z; z < house.z + size; z++) {
        const cell = { x, z };
        const error = terrainError(cell);
        if (error) return error;
        if (occupied(cell, null)) return 'Lô đất đã có công trình.';
        if (roads.has(key(cell))) return 'Lô đất chồng lên đường.';
      }
    }
    const gate = cellAt(doorPoint(house, size / 2 + .42));
    if (terrainError(gate) || occupied(gate, null)) return 'Chừa một ô trống trước cửa nhà.';
    if (residents.some(lot => contains(house, cellAt(doorPoint(lot, lot.size / 2 + .42))))) {
      return 'Chừa lối đi trước cửa nhà dân.';
    }
    return '';
  }

  function lineCells(from, to) {
    let { x, z } = from;
    const distanceX = Math.abs(to.x - x), distanceZ = Math.abs(to.z - z);
    const stepX = Math.sign(to.x - x), stepZ = Math.sign(to.z - z);
    const cells = [{ x, z }];
    for (let countX = 0, countZ = 0; countX < distanceX || countZ < distanceZ;) {
      if (countX < distanceX && (countX + .5) * distanceZ <= (countZ + .5) * distanceX) {
        x += stepX;
        countX++;
      } else {
        z += stepZ;
        countZ++;
      }
      cells.push({ x, z });
    }
    return cells;
  }

  function roadError(cell, house, material) {
    if (material === 'erase') return '';
    return terrainError(cell) || (occupied(cell, house) ? 'Đường dừng trước lô công trình.' : '');
  }

  function paintRoad(roads, house, material, from, to) {
    let last = from;
    for (const cell of lineCells(from ?? to, to)) {
      const error = roadError(cell, house, material);
      if (error) return { last, error };
      if (material === 'erase') roads.delete(key(cell));
      else roads.set(key(cell), { ...cell, material });
      last = cell;
    }
    return { last, error: '' };
  }

  function initialRoads() {
    const roads = new Map();
    for (const [ax, az, bx, bz] of [[-10,-9,13,-9],[-10,0,14,0],[-6,7,13,7],[-6,-9,-6,7],[3,-9,3,7],[13,-9,13,7]]) {
      for (const cell of lineCells({ x: ax, z: az }, { x: bx, z: bz })) {
        if (!roadError(cell, initialHouse, 'dirt')) roads.set(key(cell), { ...cell, material: 'dirt' });
      }
    }
    return roads;
  }

  function search(start, canWalk, goal = null) {
    const first = { cell: start, previous: null };
    const queue = [first];
    const seen = new Set([key(start)]);
    for (let index = 0; index < queue.length; index++) {
      const current = queue[index];
      if (goal && key(current.cell) === key(goal)) return current;
      for (const [dx, dz] of directions) {
        const next = { x: current.cell.x + dx, z: current.cell.z + dz };
        if (seen.has(key(next)) || !canWalk(next)) continue;
        seen.add(key(next));
        queue.push({ cell: next, previous: current });
      }
    }
    return goal ? null : queue.at(-1);
  }

  function route(from, to, house) {
    const goal = cellAt(to);
    const canWalk = cell => !terrainError(cell) && !occupied(cell, house);
    if (!canWalk(goal)) return null;
    const end = search(cellAt(from), canWalk, goal);
    if (!end) return null;
    const cells = [];
    for (let node = end; node.previous; node = node.previous) cells.push(center(node.cell));
    return [...cells.reverse(), to];
  }

  function openCellNear(position, house) {
    const start = cellAt(position);
    if (!terrainError(start) && !occupied(start, house)) return null;
    const free = cell => !terrainError(cell) && !occupied(cell, house);
    for (let radius = 1; radius <= footprint(house); radius++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const dz = radius - Math.abs(dx);
        for (const z of new Set([start.z - dz, start.z + dz])) {
          const candidate = { x: start.x + dx, z };
          if (free(candidate)) return center(candidate);
        }
      }
    }
    return null;
  }

  function trafficRoute(roads) {
    if (!roads.size) return [];
    const remaining = new Map(roads);
    let longest = [];
    while (remaining.size) {
      const first = remaining.values().next().value;
      remaining.delete(key(first));
      const far = search(first, cell => remaining.delete(key(cell))).cell;
      const end = search(far, cell => roads.has(key(cell)));
      const path = [];
      for (let node = end; node; node = node.previous) path.push(center(node.cell));
      if (path.length > longest.length) longest = path;
    }
    return longest;
  }

  function doorPoint(lot, distance) {
    const size = lot.size ?? footprint(lot);
    const [dx, dz] = [[0, 1], [1, 0], [0, -1], [-1, 0]][lot.rotation ?? 0];
    return { x: lot.x + size / 2 + dx * distance, z: lot.z + size / 2 + dz * distance };
  }

  function pressAmount(press, now) {
    if (!press) return 0;
    const release = Math.max(press.started + 85, press.released ?? Infinity);
    if (now < release) return Math.min(1, Math.max(0, (now - press.started) / 85)) ** 2;
    const progress = Math.max(0, 1 - (now - release) / 380);
    return 2.70158 * progress ** 3 - 1.70158 * progress ** 2;
  }

  return { key, cellAt, center, directions, initialHouse, residents, school, court, annex, lodge, villa, chapel,
    construction, park, stop, riverX, terrainError,
    footprint, placementError, roadError, paintRoad, initialRoads, route, openCellNear, trafficRoute, doorPoint, pressAmount };
})();
