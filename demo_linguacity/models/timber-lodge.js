import * as THREE from 'three';
import { bake, box, gableRoof } from '../../city-web/src/core/shapes';

export function makeTimberLodge(size) {
  const group = new THREE.Group();
  const timber = '#78543c';
  const wall = '#aa7b50';
  const roof = '#6c8152';
  box(group, 3.44, .12, 2.50, '#b3a381', 0, .01, .10);
  box(group, 2.94, 1.15, 1.81, wall, 0, .13, -.18);
  gableRoof(group, 3.28, .73, 2.12, roof, 0, 1.26, -.18);
  for (const side of [-1, 1]) {
    box(group, 3.28, .08, .07, '#4f6240', 0, 1.24, -.18 + side * 1.06);
    for (const x of [-1.38, -.51, .51, 1.38]) {
      box(group, .076, 1.12, .07, timber, x, .14, -.18 + side * .915);
    }
  }
  for (const y of [.35, .55, .75, .95]) box(group, .023, .025, 1.78, timber, 1.479, y, -.18);
  for (const x of [-1.05, -.72, .76, 1.15]) {
    box(group, .25, .43, .068, timber, x, .52, .75);
    box(group, .16, .31, .074, '#6b7d6a', x, .577, .768);
  }
  box(group, .39, .75, .078, '#604733', 0, .14, .757);
  box(group, 1.50, .10, .72, '#c29c6e', 0, .06, 1.13);
  box(group, 1.36, .065, .22, '#d1ac7d', 0, .025, 1.55);
  for (const x of [-.62, .62]) box(group, .085, .98, .082, timber, x, .15, 1.38);
  gableRoof(group, .92, .36, 1.52, '#778a5c', 0, 1.07, 1.08).rotation.y = Math.PI / 2;
  box(group, .25, .54, .27, '#947359', .92, 1.54, -.46);
  box(group, .31, .073, .32, '#b29672', .92, 2.07, -.46);
  bake(group);
  group.scale.setScalar(size / 4);
  return group;
}
