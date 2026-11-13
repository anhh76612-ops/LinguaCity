import PF from 'pathfinding';
import { cellAt, cellKey } from './roads';
import { roadLengthLimit, sliceRoadStroke } from './road-centerline';

const center = ({ x, z }) => [x + .5, z + .5];
const distance = ([x, z], [a, b]) => Math.hypot(x - a, z - b);

export function findRoadDetour({ origin, end, width, bounds, obstacle, waterAt, surfaceY, autoGrade, tryRoute }) {
  const start = cellAt({ x: origin[0], z: origin[1] }), finish = cellAt({ x: end[0], z: end[1] });
  const inside = ({ x, z }) => x >= bounds.left && x <= bounds.right && z >= bounds.top && z <= bounds.bottom;
  if (!inside(start) || !inside(finish) || distance(origin, end) > roadLengthLimit) return null;
  const blocked = new Map();
  const unavailable = cell => {
    const key = cellKey(cell);
    if (!blocked.has(key)) blocked.set(key, !inside(cell) || obstacle(cell) ||
      [.08, .5, .92].some(x => [.08, .5, .92].some(z => waterAt(cell.x + x, cell.z + z))));
    return blocked.get(key);
  };
  if (unavailable(start) || unavailable(finish)) return null;
  const left = Math.max(bounds.left, Math.min(start.x, finish.x) - roadLengthLimit);
  const top = Math.max(bounds.top, Math.min(start.z, finish.z) - roadLengthLimit);
  const right = Math.min(bounds.right, Math.max(start.x, finish.x) + roadLengthLimit);
  const bottom = Math.min(bounds.bottom, Math.max(start.z, finish.z) + roadLengthLimit);
  const startKey = cellKey(start), finishKey = cellKey(finish);
  const offset = Math.floor(width / 2);

  const buildGrid = clearance => {
    const grid = new PF.Grid(right - left + 1, bottom - top + 1);
    for (let z = top; z <= bottom; z++) for (let x = left; x <= right; x++) {
      const cell = { x, z }, key = cellKey(cell);
      if (key === startKey || key === finishKey) continue;
      let walkable = distance(origin, center(cell)) + distance(center(cell), end) <= roadLengthLimit + 1.5;
      const nearEnd = Math.min(distance(center(cell), origin), distance(center(cell), end)) <= width + 1.25;
      const margin = nearEnd ? 0 : clearance;
      for (let dx = -margin; walkable && dx < width + margin; dx++) {
        for (let dz = -margin; walkable && dz < width + margin; dz++) {
          walkable = !unavailable({ x: x + dx - offset, z: z + dz - offset });
        }
      }
      if (!walkable) grid.setWalkableAt(x - left, z - top, false);
    }
    return grid;
  };

  const finder = new PF.AStarFinder({ diagonalMovement: PF.DiagonalMovement.Never });
  const heights = new Map();
  const height = (x, z) => {
    const key = z * (right - left + 1) + x;
    if (!heights.has(key)) heights.set(key, surfaceY(x + left + .5, z + top + .5));
    return heights.get(key);
  };

  const searchWithClearance = clearance => {
    const grid = buildGrid(clearance);
    const rejected = new Set();
    for (let attempt = 0; attempt < 8; attempt++) {
      const search = grid.clone();
      const getNeighbors = search.getNeighbors.bind(search);
      const slope = autoGrade ? (attempt === 0 ? .45 : .90) : (width === 1 ? .35 : .27);
      search.getNeighbors = (node, diagonalMovement) => {
        const y = height(node.x, node.y);
        return getNeighbors(node, diagonalMovement).filter(next => Math.abs(height(next.x, next.y) - y) <= slope);
      };
      const path = finder.findPath(start.x - left, start.z - top, finish.x - left, finish.z - top, search);
      if (path.length < 2) continue;
      const points = PF.Util.compressPath(path).map(([x, z]) => [x + left + .5, z + top + .5]);
      points[0] = origin;
      points[points.length - 1] = end;
      const route = sliceRoadStroke(points, width);
      if (route.error) continue;
      const trial = tryRoute(route);
      if (!trial.error) return { route, trial, clearance };
      const failure = trial.errorCell ? center(trial.errorCell) : points[Math.floor(points.length / 2)];
      const interior = path.slice(1, -1).filter(point => !rejected.has(point.join(',')));
      const rejectedPoint = interior.sort((a, b) => distance([a[0] + left + .5, a[1] + top + .5], failure) -
        distance([b[0] + left + .5, b[1] + top + .5], failure))[0];
      if (rejectedPoint) {
        rejected.add(rejectedPoint.join(','));
        grid.setWalkableAt(...rejectedPoint, false);
      }
    }
    return null;
  };

  const straight = distance(origin, end);
  const wide = searchWithClearance(1);
  if (wide && wide.route.length <= straight * 1.15 + 2) return wide;
  const tight = searchWithClearance(0);
  if (wide && tight) {
    return wide.route.length <= tight.route.length * 1.15 + 2 ? wide : tight;
  }
  return wide ?? tight ?? null;
}
