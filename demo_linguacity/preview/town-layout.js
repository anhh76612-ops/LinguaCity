import * as THREE from 'three';
import { box } from '../../city-web/src/core/shapes';
import { makeHouse } from '../models/house';
import { makeVilla } from '../models/villa';
import { makeTimberLodge } from '../models/timber-lodge';
import { makeChapel } from '../models/chapel';
import { makeSchool } from '../models/school';
import { makeBasketballCourt } from '../models/basketball-court';
import { makeConstruction } from '../models/construction';
import { park } from './models/park';
import { busStation } from './models/bus-station';
import { terrainClearance } from './terrain';

const models = [
  ['Nhà thị trưởng', 1.2, -2.55, 1, () => makeHouse(2.8, 1, '#c28b59').group],
  ['Nhà hai tầng', 3.70, -2.58, .87, () => makeVilla(3)],
  ['Nhà gỗ', 7.17, -2.55, .66, () => makeTimberLodge(3)],
  ['Nhà ở', 9.62, -2.55, .98, () => makeHouse(2.85, 3, '#a96244').group],
  ['Nhà nguyện', 1.65, -8.05, .73, () => makeChapel(3), 0, [1.65, -6]],
  ['Công viên', 9.28, 8.28, .51, () => park(1), Math.PI],
  ['Trường học', 6.92, 2.96, .69, () => makeSchool(4.86)],
  ['Sân bóng', 9.7, 2.75, .72, () => makeBasketballCourt(3)],
  ['Công trình đang xây', .35, 8.18, .66, () => makeConstruction(3), Math.PI],
  ['Bến xe', 3.6, 8.14, .59, () => busStation(1), Math.PI],
  ['Nhà ở', 6.65, 8.20, .80, () => makeHouse(2.85, 1, '#7d8758').group, Math.PI],
  ['Nhà ven sông', -6.85, -3.30, .87, () => makeHouse(2.8, 1, '#a96344').group, 0, [-6.85, -1.75]],
  ['Nhà ven sông', -5.35, -7.12, .85, () => makeHouse(2.85, 1, '#84915e').group, 0, [-5.35, -5.70]],
  ['Xưởng gỗ ven sông', -6.3, -.45, .72, () => makeTimberLodge(3), Math.PI, [-6.3, -1.78]],
  ['Nhà bên kia sông', -21.0, -3.65, .86, () => makeHouse(2.8, 1, '#c18e52').group, -Math.PI / 2, [-22.45, -3.65]],
  ['Nhà bên kia sông', -20.2, -1.83, .71, () => makeHouse(2.85, 3, '#9d654b').group, 0, [-20.2, -.14]],
  ['Nhà gỗ bờ tây', -20.55, -7.55, .74, () => makeTimberLodge(3), -Math.PI / 2, [-22.05, -7.55]],
  ['Nhà trên đồi', 6.35, -15.25, .86, () => makeHouse(2.85, 3, '#ab6b49').group, 0, [6.35, -14.20]],
  ['Nhà ngắm thung lũng', 7.2, -11.52, .69, () => makeVilla(3), Math.PI, [7.2, -13.35]],
  ['Nhà sau đồi', 6.55, -19.25, .84, () => makeHouse(2.8, 1, '#a98446').group, 0, [6.55, -17.85]],
  ['Nhà gỗ sau đồi', 8.8, -19.27, .69, () => makeTimberLodge(3), 0, [8.8, -17.58]],
];

export function townBuildingClearance(x, z, radius) {
  return models.some(([, mx, mz]) => Math.abs(mx - x) < 1.22 + radius && Math.abs(mz - z) < 1.06 + radius);
}

export function makeTown(surfaceY, pathClearance) {
  const group = new THREE.Group();
  group.name = 'Công trình thị trấn';
  const buildings = [];
  const paths = new THREE.MeshStandardMaterial({ color: '#bc9e6e', roughness: 1, side: THREE.DoubleSide });
  for (const [name, x, z, scale, create, rotation = 0, connection] of models) {
    const model = create();
    model.scale.setScalar(scale);
    model.rotation.y = rotation;
    model.position.set(x, 0, z);
    const { min, max } = new THREE.Box3().setFromObject(model, true);
    const samples = [0, .5, 1].flatMap(u => [0, .5, 1].map(v => surfaceY(
      THREE.MathUtils.lerp(min.x, max.x, u), THREE.MathUtils.lerp(min.z, max.z, v))));
    const low = Math.min(...samples), high = Math.max(...samples), floor = high + .018;
    const foundation = new THREE.Group();
    box(foundation, max.x - min.x, floor - low + .03, max.z - min.z, '#b5a182',
      (min.x + max.x) / 2, low - .03, (min.z + max.z) / 2);
    model.position.y = floor;
    model.name = name;
    group.add(foundation, model);
    buildings.push({ name, min, max, model, groundRise: high - low });

    const [endX, endZ] = connection ?? [x, rotation ? 7 : z < 0 ? -1 : 5];
    const startX = THREE.MathUtils.clamp(endX, min.x, max.x);
    const startZ = THREE.MathUtils.clamp(endZ, min.z, max.z);
    const vertices = [];
    const steps = Math.ceil(Math.hypot(endX - startX, endZ - startZ) * 8);
    const angle = Math.atan2(endZ - startZ, endX - startX);
    const dx = Math.sin(angle) * .19, dz = -Math.cos(angle) * .19;
    for (let i = 0; i < steps; i++) {
      for (const [t, side] of [[i, -1], [i, 1], [i + 1, 1], [i, -1], [i + 1, 1], [i + 1, -1]]) {
        const px = THREE.MathUtils.lerp(startX, endX, t / steps) + dx * side;
        const pz = THREE.MathUtils.lerp(startZ, endZ, t / steps) + dz * side;
        vertices.push(px, surfaceY(px, pz) + .035, pz);
      }
    }
    if (vertices.length) {
      const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.computeVertexNormals();
      const approach = new THREE.Mesh(geometry, paths);
      approach.receiveShadow = true;
      group.add(approach);
    }
  }
  const overlaps = ({ x, z }) => buildings.find(({ min, max }) => x < max.x && x + 1 > min.x && z < max.z && z + 1 > min.z);
  const measure = ({ x, z }) => {
    const heights = [0, .5, 1].flatMap(u => [0, .5, 1].map(v => surfaceY(x + u, z + v)));
    return { low: Math.min(...heights), high: Math.max(...heights), rise: Math.max(...heights) - Math.min(...heights) };
  };
  function error(cell) {
    if (overlaps(cell)) return 'Ô này có công trình.';
    const hillEntry = (cell.x === 7 || cell.x === 8) && (cell.z === -5 || cell.z === -6);
    if (!hillEntry && cell.z < -6 && pathClearance(cell.x + .5, cell.z + .5, .2)) return 'Chừa lối hiện có trên địa hình.';
    if ([0, 1].some(x => [0, 1].some(z => terrainClearance(cell.x + x, cell.z + z) < .25))) return 'Chừa khoảng đệm ở bờ nước.';
    return measure(cell).rise > .8 ? 'Ô quá dốc để vẽ đường.' : '';
  }
  return { group, buildings, overlaps, measure, error };
}
