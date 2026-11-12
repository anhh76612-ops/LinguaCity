import * as THREE from 'three';
import { bake, box, cyl, mat } from '../../city-web/src/core/shapes';

const marking = '#f4d9a0';
const frame = '#d1d7c4';
const length = 2.78;
const width = 1.90;

export function makeBasketballCourt(size) {
  const group = new THREE.Group();
  box(group, 2.96, .065, 2.15, '#bea68a');
  box(group, length, .023, width, '#ce8c74', 0, .065);
  for (const z of [-.86, .86]) box(group, 2.60, .005, .018, marking, 0, .089, z);
  for (const x of [-1.30, 0, 1.30]) box(group, .018, .005, 1.73, marking, x, .089);
  ring(group, .24, 0, 0);

  for (const side of [-1, 1]) {
    for (const z of [-.28, .28]) box(group, .56, .005, .016, marking, side * 1.02, .089, z);
    box(group, .016, .005, .56, marking, side * .74, .089);
    ring(group, .28, side * .74, 0, side < 0 ? -Math.PI / 2 : Math.PI / 2, Math.PI);
    cyl(group, .018, .024, .68, frame, side * 1.37, .086, 0, 8);
    box(group, .035, .14, .29, '#f4efe1', side * 1.27, .63);
    box(group, .11, .029, .025, '#9e7155', side * 1.32, .65);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(.056, .009, 6, 12), mat('#b46a4c'));
    rim.rotation.x = -Math.PI / 2;
    rim.position.set(side * 1.20, .644, 0);
    group.add(rim);
  }

  fence(group, -1.42, -.98, 1.42, -.98, 10);
  fence(group, -1.42, -.98, -1.42, .98, 7);
  fence(group, 1.42, -.98, 1.42, .98, 7);
  fence(group, -1.42, .98, -.24, .98, 5);
  fence(group, .24, .98, 1.42, .98, 5);
  bake(group);
  group.scale.setScalar(size / 3);
  return group;
}

function ring(group, radius, x, z, start = 0, angle = Math.PI * 2) {
  const mesh = new THREE.Mesh(new THREE.RingGeometry(radius - .013, radius, 24, 1, start, angle), mat(marking));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, .091, z);
  group.add(mesh);
}

function fence(group, x1, z1, x2, z2, sections) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  const alongX = dz === 0;
  const span = Math.hypot(dx, dz);
  const centerX = (x1 + x2) / 2;
  const centerZ = (z1 + z2) / 2;
  for (const y of [.15, .53]) box(group, alongX ? span : .026, .026, alongX ? .026 : span, frame, centerX, y, centerZ);
  for (let index = 0; index <= sections; index++) {
    const t = index / sections;
    const end = index === 0 || index === sections;
    const thickness = end ? .045 : .017;
    box(group, thickness, end ? .50 : .39, thickness, frame, x1 + dx * t, end ? .086 : .15, z1 + dz * t);
  }
}
