import * as THREE from 'three';
import { box, cyl } from '../../../city-web/src/core/shapes';
import { bench, flowerBed } from '../../../city-web/src/world/buildings/common';
import { flat, lamp, tree, tufts } from './details';

export const parkSeats = [[-1.30, .93], [1.28, .93]];

export function park(level) {
  const group = new THREE.Group();
  flat(group, 4.95, 4.10, level === 0 ? '#a7aa69' : '#aebc77');
  if (level === 0) {
    flat(group, .72, 2.47, '#b79c6e', -.33, .50, .022, .03).rotation.y = -.25;
    tree(group, 'broadleaf', -1.36, -.59, .79);
    cyl(group, .27, .34, .19, '#997a4c', .98, .021, -.88, 8);
    for (const [x, z] of [[.7, .91], [-1.34, 1.2], [1.50, -.18], [-.48, -1.47]]) {
      tufts(group, x, z, .54, 11, 34 + x * 13);
    }
    return group;
  }

  flat(group, level >= 2 ? .91 : .68, 3.77, level >= 2 ? '#d5c298' : '#c7af7d', 0, 0, .025, .033);
  flat(group, 4.34, level >= 2 ? .74 : .60, level >= 2 ? '#d5c298' : '#c7af7d', 0, .58, .025, .032);
  for (const [x, z] of parkSeats.slice(0, level === 1 ? 1 : 2)) bench(group, x, z, 0);
  tree(group, level >= 2 ? 'oak' : 'umbrella', -1.48, -.94, level >= 2 ? .95 : .82);
  if (level === 1) {
    tree(group, 'shrub', 1.40, -.75, .65);
    return group;
  }
  flowerBed(group, -1.38, 1.58, 1.18, .39, '#d3a17b');
  flowerBed(group, 1.38, 1.58, 1.18, .39, '#e4b668');
  lamp(group, -.83, -.04);
  lamp(group, .88, -.04);
  if (level === 2) {
    for (const x of [.86, 1.82]) for (const z of [-1.43, -.54]) box(group, .075, .96, .075, '#886c4e', x, .03, z);
    for (const z of [-1.47, -1.23, -.99, -.75, -.51]) box(group, 1.15, .08, .071, '#937252', 1.34, 1.00, z);
    bench(group, 1.34, -1.1, 0);
  } else {
    cyl(group, .59, .63, .19, '#ae9b7f', 0, .056, -.77, 22);
    cyl(group, .50, .50, .029, '#669eab', 0, .246, -.77, 22);
    cyl(group, .078, .12, .41, '#baaa8f', 0, .255, -.77, 12);
    cyl(group, .215, .104, .087, '#c7b796', 0, .651, -.77, 16);
    flat(group, 1.31, .95, '#c6aa75', 1.35, -.99, .038, .04);
    for (const x of [.92, 1.75]) box(group, .066, .93, .067, '#7a8064', x, .09, -1.04);
    box(group, .95, .065, .067, '#7a8064', 1.34, 1.01, -1.04);
    for (const x of [1.22, 1.45]) box(group, .019, .64, .02, '#a28562', x, .37, -1.04);
    box(group, .36, .042, .21, '#ad7851', 1.34, .36, -1.04);
    tree(group, 'golden', 1.9, -.18, .62);
  }
  return group;
}
