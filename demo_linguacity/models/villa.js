import * as THREE from 'three';
import { bake, box, gableRoof } from '../../city-web/src/core/shapes';

export function makeVilla(size) {
  const group = new THREE.Group();
  const wall = '#e7d5b0';
  const orange = '#d59a51';
  const trim = '#f2dfba';
  box(group, 2.65, .09, 2.37, '#bdab8a');
  box(group, 2.28, 1.72, 1.64, wall, 0, .09, -.20);
  gableRoof(group, 2.52, .52, 1.92, orange, 0, 1.81, -.20);
  box(group, .88, 1.85, .70, '#dfc79f', -.44, .09, .81);
  gableRoof(group, .89, .39, 1.11, '#dda25a', -.44, 1.94, .82).rotation.y = Math.PI / 2;
  box(group, .78, .075, .23, '#d3b389', -.44, .03, 1.25);
  box(group, .31, .67, .048, '#815f45', -.44, .11, 1.17);
  for (const y of [.34, 1.10]) {
    frontWindow(group, .60, y, .626, trim);
    for (const z of [-.65, .15]) {
      box(group, .047, .47, .29, trim, 1.15, y, z);
      box(group, .058, .37, .20, '#655f53', 1.169, y + .05, z);
    }
  }
  frontWindow(group, -.44, 1.12, 1.17, trim);
  box(group, .84, .085, .10, '#b89163', -.44, .95, 1.15);
  box(group, .20, .36, .23, '#c19872', .74, 1.95, -.57);
  box(group, .26, .049, .28, '#f0d8af', .74, 2.31, -.57);
  bake(group);
  group.scale.setScalar(size / 3);
  return group;
}

function frontWindow(group, x, y, z, trim) {
  box(group, .34, .45, .044, trim, x, y, z);
  box(group, .23, .34, .055, '#655f53', x, y + .055, z + .015);
  box(group, .36, .045, .083, '#c9a77b', x, y - .025, z + .02);
}
