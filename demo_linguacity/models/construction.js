import * as THREE from 'three';
import { bake, box } from '../../city-web/src/core/shapes';

export function makeConstruction(size) {
  const group = new THREE.Group();
  const lumber = '#bc9364';
  box(group, 2.82, .045, 2.66, '#bfa279');
  box(group, 2.16, .16, 1.79, '#ccba99', 0, .045, -.24);
  box(group, 2.09, .58, .09, '#dec8a4', 0, .20, -1.08);
  box(group, .09, .52, 1.78, '#d3ba93', -1.03, .20, -.23);
  for (const x of [-1, 0, 1]) {
    for (const z of [-1.06, .62]) box(group, .095, 1.02, .095, lumber, x, .20, z);
  }
  box(group, 2.18, .085, .12, lumber, 0, 1.17, -.99);
  box(group, 2.18, .085, .12, lumber, 0, 1.17, .56);
  box(group, 2.27, .07, .086, '#cfa371', 0, 1.86, -.22);
  for (const x of [-1.05, -.69, -.34, 0, .34, .69, 1.05]) {
    rafter(group, x, -.22, -1.14);
    rafter(group, x, -.22, .70);
  }
  for (const z of [1.01, 1.14, 1.27]) {
    box(group, .75, .085, .105, '#a98058', .69, .045, z);
  }
  box(group, .54, .075, .105, lumber, .65, .13, 1.14);
  bake(group);
  group.scale.setScalar(size / 3);
  return group;
}

function rafter(group, x, ridge, eave) {
  const run = eave - ridge, rise = .65;
  const part = box(group, .063, .066, Math.hypot(run, rise), '#d4aa77', x, 1.505,
    (ridge + eave) / 2);
  part.rotation.x = Math.atan2(rise, run);
}
