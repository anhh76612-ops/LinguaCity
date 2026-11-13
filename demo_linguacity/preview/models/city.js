import * as THREE from 'three';
import { box, gableRoof } from '../../../city-web/src/core/shapes';
import { bench } from '../../../city-web/src/world/buildings/common';
import { flat, lamp, tree, windowAt } from './details';

export function hospital() {
  const group = new THREE.Group();
  flat(group, 5.14, 4.03, '#c6b797');
  box(group, 4.11, 1.74, 1.89, '#e3d7bc', 0, .042, -.58);
  box(group, 4.24, .11, 2.0, '#a79a85', 0, 1.76, -.58);
  for (const x of [-1.55, -.80, .80, 1.55]) {
    for (const y of [.32, 1.00]) windowAt(group, x, y, .39, .36, .35);
  }
  box(group, 1.66, .098, .87, '#729392', 0, 1.18, .73);
  for (const x of [-.76, .76]) box(group, .076, 1.11, .076, '#a8997c', x, .057, 1.08);
  box(group, .68, .90, .068, '#7a8f83', 0, .064, .411);
  box(group, .49, .47, .047, '#f4dfbe', 0, 1.35, .399);
  box(group, .34, .10, .057, '#b56453', 0, 1.536, .422);
  box(group, .10, .33, .059, '#b56453', 0, 1.422, .422);
  flat(group, 4.66, .82, '#948e7f', 0, 1.47, .025, .033);
  flat(group, .91, .90, '#d1bfa0', 0, 1.17, .047, .047);
  bench(group, -1.52, .78, 0);
  lamp(group, 2.23, .91);
  return group;
}

export function market() {
  const group = new THREE.Group();
  flat(group, 4.95, 3.95, '#cbb990');
  for (const x of [-1.84, 0, 1.84]) {
    for (const z of [-1.31, -.12]) box(group, .096, 1.25, .093, '#886f51', x, .04, z);
  }
  gableRoof(group, 4.15, .46, 1.55, '#9b7457', 0, 1.28, -.69);
  for (const [index, x] of [-1.35, 0, 1.35].entries()) {
    const canvas = ['#ab7b5b', '#809678', '#bfa266'][index];
    box(group, 1.18, .082, .79, canvas, x, .99, .39).rotation.x = .24;
    box(group, 1.18, .16, .043, canvas, x, .85, .773);
    for (const offset of [-.39, 0, .39]) {
      box(group, .13, .15, .047, '#e2c89c', x + offset, .85, .794);
      box(group, .18, .12, .20, '#a28157', x + offset, .47, .52);
      box(group, .11, .048, .13, ['#cc9b58', '#94a463', '#c38760'][index], x + offset, .59, .52);
    }
    box(group, 1.13, .44, .55, '#ab8c64', x, .032, .51);
  }
  tree(group, 'golden', 2.06, -1.46, .59);
  lamp(group, -2.05, 1.25);
  return group;
}

export function shops() {
  const group = new THREE.Group();
  flat(group, 4.99, 3.37, '#c8b79b');
  for (const [index, x] of [-1.48, 0, 1.48].entries()) {
    const wall = ['#e2c498', '#d8d4a8', '#ddbb96'][index];
    const roof = ['#ad795a', '#83917b', '#b98c61'][index];
    const height = index === 1 ? 1.84 : 1.51;
    box(group, 1.44, height, 1.58, wall, x, .034, -.35);
    gableRoof(group, 1.50, .28, 1.67, roof, x, height + .034, -.35);
    windowAt(group, x + .24, .37, .461, .61, .49);
    windowAt(group, x, height - .57, .461, .29, .29);
    box(group, .31, .71, .051, '#886b4e', x - .41, .034, .453);
    box(group, 1.34, .085, .55, roof, x, .94, .68).rotation.x = .21;
    box(group, 1.10, .09, .044, '#d3ae80', x, .84, .92);
    flat(group, .42, .34, '#bca482', x - .41, .70, .048, .028);
  }
  return group;
}
