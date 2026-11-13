import * as THREE from 'three';
import { bake, box, mat } from '../../city-web/src/core/shapes';
import { cellKey, X } from './roads';
import { roadRules } from './road-drawing';
import { asphaltEdgeLine, asphaltLaneOffsets, roadPalette } from './road-style';

const retainingMaterial = new THREE.MeshStandardMaterial({ color: '#9b815d', roughness: .86, side: THREE.DoubleSide });
const bridgeNames = { dirt: 'Cầu gỗ', stone: 'Cầu đá', asphalt: 'Cầu bê tông' };

function bridgeMaterial(cells) {
  if (cells.every(cell => cell.material === 'asphalt')) return 'asphalt';
  return cells.some(cell => cell.material === 'dirt') ? 'dirt' : 'stone';
}

export function bridgeName(cells) {
  return bridgeNames[bridgeMaterial(cells)];
}

export function roadSurface(roads, groundY) {
  return (x, z) => {
    const cellX = Math.floor(x), cellZ = Math.floor(z);
    let road = roads.get(cellKey({ x: cellX, z: cellZ }));
    if (!Number.isFinite(road?.roadY)) {
      const sides = [[Math.floor(x - 1e-7), cellZ], [cellX, Math.floor(z - 1e-7)],
        [Math.floor(x - 1e-7), Math.floor(z - 1e-7)]];
      road = sides.map(([x, z]) => roads.get(cellKey({ x, z }))).find(cell => Number.isFinite(cell?.roadY));
    }
    if (!Number.isFinite(road?.roadY)) return groundY(x, z);
    if (!Number.isFinite(road.roadStartY) || !Number.isFinite(road.roadEndY)) return road.roadY;
    const fraction = road.axes === X ? x - road.x : z - road.z;
    return THREE.MathUtils.lerp(road.roadStartY, road.roadEndY, THREE.MathUtils.clamp(fraction, 0, 1));
  };
}

export function buildRetainingWalls(roads, pavedY, groundY, previousY) {
  const faces = [];
  for (const cell of roads.values()) {
    if (cell.bridgeId || cell.approachBridgeId || cell.roadCurveId) continue;
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      if (roads.has(cellKey({ x: cell.x + dx, z: cell.z + dz }))) continue;
      const edge = t => {
        const x = cell.x + (dx ? .5 + dx * .47 : t);
        const z = cell.z + (dz ? .5 + dz * .47 : t);
        const px = x + dx * .21, pz = z + dz * .21;
        const top = pavedY(x, z) + .034;
        const low = groundY(px, pz);
        return { top: [x, top, z], bottom: [px, Math.min(top, low - .025), pz], cut: previousY(px, pz) - low };
      };
      for (let i = 0; i < 4; i++) {
        const a = edge(i / 4), b = edge((i + 1) / 4);
        if (Math.max(a.cut, b.cut) < .035 || Math.max(a.top[1] - a.bottom[1], b.top[1] - b.bottom[1]) < .15) continue;
        faces.push(...a.top, ...a.bottom, ...b.top, ...b.top, ...a.bottom, ...b.bottom);
      }
    }
  }
  if (!faces.length) return null;
  const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(faces, 3));
  geometry.computeVertexNormals();
  const wall = new THREE.Mesh(geometry, retainingMaterial);
  wall.receiveShadow = true;
  return wall;
}

export function buildRoadBridges(roads, groundY) {
  const group = new THREE.Group();
  group.name = 'Cầu người chơi';
  const spans = new Map();
  for (const cell of roads.values()) {
    if (!cell.bridgeId) continue;
    if (!spans.has(cell.bridgeId)) spans.set(cell.bridgeId, []);
    spans.get(cell.bridgeId).push(cell);
  }
  for (const cells of spans.values()) {
    const span = new THREE.Group();
    const style = bridgeMaterial(cells);
    span.name = bridgeNames[style];
    const axis = cells[0].axes;
    const [along, across] = axis === X ? ['x', 'z'] : ['z', 'x'];
    const start = Math.min(...cells.map(cell => cell[along]));
    const end = Math.max(...cells.map(cell => cell[along])) + 1;
    const low = Math.min(...cells.map(cell => cell[across]));
    const high = Math.max(...cells.map(cell => cell[across])) + 1;
    const top = cells[0].bridgeY + .035;
    const bottom = top - roadRules.deckThickness;
    const length = end - start, width = high - low;
    const add = (l, h, w, color, t, y, side) => axis === X ?
      box(span, l, h, w, color, t, y, side) : box(span, w, h, l, color, side, y, t);
    const asphalt = cells.filter(cell => cell.material === 'asphalt');
    const center = (low + high) / 2;
    const middle = (start + end) / 2;
    if (style === 'stone') {
      const arch = new THREE.Shape();
      arch.moveTo(start, top);
      arch.lineTo(start, bottom);
      const steps = length * 8;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        arch.lineTo(start + t * length, bottom + Math.sin(t * Math.PI) * .145);
      }
      arch.lineTo(end, top);
      arch.closePath();
      const geometry = new THREE.ExtrudeGeometry(arch, { depth: width, bevelEnabled: false });
      if (axis === X) geometry.translate(0, 0, low);
      else geometry.rotateY(-Math.PI / 2).translate(high, 0, 0);
      const masonry = new THREE.Mesh(geometry, mat('#8f8c7e'));
      masonry.castShadow = masonry.receiveShadow = true;
      span.add(masonry);
    } else {
      add(length, roadRules.deckThickness, width, style === 'asphalt' ? '#90958f' : '#856145', middle, bottom, center);
    }
    for (const cell of cells) {
      if (cell.material === 'dirt') {
        for (let step = 0; step < 5; step++) {
          add(.188, .021, .99, (step + cell[along]) % 3 ? '#bb9063' : '#af8056',
            cell[along] + (step + .5) / 5, top - .016, cell[across] + .5);
        }
      }
      if (cell.material === 'stone') {
        for (let row = 0; row < 5; row++) {
          for (let column = 0; column < 4; column++) {
            const shade = ['#a6a297', '#8f8e83', '#b4b0a4'][(row * 2 + column + Math.abs(cell[along])) % 3];
            add(.181, .021, .228, shade, cell[along] + (row + .5) / 5,
              top, cell[across] + (column + .5) / 4);
          }
        }
      }
    }
    for (const cell of asphalt) {
      const t = cell[along] + .5;
      const side = cell[across];
      add(1, .012, 1, roadPalette.asphalt[0], t, top, side + .5);
      if (side === low) {
        add(1, .004, .038, asphaltEdgeLine, t, top + .013, low + .158);
      }
      if (side === high - 1) {
        add(1, .004, .038, asphaltEdgeLine, t, top + .013, high - .158);
      }
    }
    if (width >= 2) {
      const pavedAt = new Map();
      for (const cell of asphalt) pavedAt.set(cell[along], (pavedAt.get(cell[along]) ?? 0) + 1);
      for (const [t, count] of pavedAt) {
        if (count !== width) continue;
        for (const offset of asphaltLaneOffsets(width)) {
          add(.54, .004, .055, roadPalette.asphalt[2], t + .5, top + .014, center + offset);
        }
      }
    }
    const bedAt = (t, side) => axis === X ? groundY(t, side) : groundY(side, t);
    const pier = (t, side, depth, breadth, color) => {
      const bed = bedAt(t, side);
      if (bed < bottom) add(depth, bottom - bed + .08, breadth, color, t, bed - .08, side);
    };
    for (const side of [low + .08, high - .08]) {
      if (style === 'stone') {
        add(length, .18, .13, '#8e897b', middle, top, side);
        for (let step = 0; step < length * 4; step++) {
          add(.237, .051, .17, step % 3 ? '#c1b9a7' : '#aaa393',
            start + (step + .5) / 4, top + .18, side);
        }
        for (const t of [start + .14, end - .14]) pier(t, side, .27, .19, '#8f8c7e');
        continue;
      }
      const concrete = style === 'asphalt';
      add(length, .05, .055, concrete ? '#b4c0bf' : '#a3764d', middle, top + .26, side);
      add(length, .038, .044, concrete ? '#899a9b' : '#946840', middle, top + .13, side);
      for (let step = 0; step <= length; step++) {
        const t = THREE.MathUtils.clamp(start + step, start + .07, end - .07);
        const post = concrete ? .063 : .105;
        add(post, .32, post, concrete ? '#6c7b7c' : '#765135', t, top, side);
        if (!concrete && (step % 2 || length === 1) && step < length) {
          pier(t, side, .18, .18, '#755944');
        }
      }
    }
    if (style === 'asphalt') {
      for (let t = start + Math.min(.65, length / 2); t < end; t += 2.5) {
        pier(t, center, .28, width * .47, '#a2a59c');
      }
    }
    group.add(bake(span));
  }
  const sides = [];
  for (const cell of roads.values()) {
    if (!cell.approachBridgeId || !Number.isFinite(cell.roadStartY) || !Number.isFinite(cell.roadEndY)) continue;
    const horizontal = cell.axes === X;
    for (const offset of [0, 1]) {
      const neighbor = roads.get(cellKey({
        x: cell.x + (horizontal ? 0 : offset * 2 - 1),
        z: cell.z + (horizontal ? offset * 2 - 1 : 0),
      }));
      if (neighbor?.approachBridgeId === cell.approachBridgeId) continue;
      const ax = cell.x + (horizontal ? 0 : offset), az = cell.z + (horizontal ? offset : 0);
      for (let i = 0; i < 4; i++) {
        const edge = t => {
          const x = ax + (horizontal ? t : 0), z = az + (horizontal ? 0 : t);
          const high = THREE.MathUtils.lerp(cell.roadStartY, cell.roadEndY, t) + .032;
          return { top: [x, high, z], bottom: [x, Math.min(high, groundY(x, z) - .015), z] };
        };
        const a = edge(i / 4), b = edge((i + 1) / 4);
        sides.push(...a.top, ...a.bottom, ...b.top, ...b.top, ...a.bottom, ...b.bottom);
      }
    }
  }
  if (sides.length) {
    const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(sides, 3));
    geometry.computeVertexNormals();
    const retaining = new THREE.Mesh(geometry, mat('#a68a60', { side: THREE.DoubleSide }));
    retaining.castShadow = retaining.receiveShadow = true;
    group.add(retaining);
  }
  return group;
}
