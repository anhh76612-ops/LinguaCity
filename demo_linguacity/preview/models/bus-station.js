import * as THREE from 'three';
import { box } from '../../../city-web/src/core/shapes';
import { bench } from '../../../city-web/src/world/buildings/common';
import { flat, board, lamp, tufts, windowAt } from './details';

export function busStation(level) {
  const group = new THREE.Group();
  flat(group, 5.13, 3.83, level <= 1 ? '#b7ac78' : '#c9b491');
  flat(group, 5.12, 1.12, ['#bc9d6c', '#bc9d6c', '#a49a88', '#726e65'][level], 0, 1.35, .025, .033);
  if (level === 0) {
    flat(group, 3.24, .61, '#bba477', 0, .38, .026, .035);
    for (const x of [-1.30, 1.55]) box(group, .084, .44, .085, '#916d48', x, .037, .24);
    tufts(group, 1.26, -.69, 1.19, 23, 42);
    return group;
  }
  board(group, 1.91, .47, .83, level === 1 ? '#8a7754' : '#627f75');
  bench(group, -.67, .29, 0);
  if (level === 1) {
    flat(group, 2.77, .66, '#c8b280', -.32, .37, .027, .033);
    tufts(group, -1.92, -.13, .76, 12, 83);
    return group;
  }
  flat(group, 4.42, 1.39, '#dbc6a1', 0, .08, .077, .031);
  const width = level === 3 ? 4.36 : 2.83;
  const center = level === 3 ? 0 : -.63;
  const height = level === 3 ? 1.56 : 1.15;
  box(group, width, .105, level === 3 ? 1.50 : 1.13, '#5d7c74', center, height, -.15);
  box(group, width + .04, .18, .085, '#73918a', center, height - .045, .59 - (level === 2 ? .16 : 0));
  for (const x of [center - width * .44, center + width * .44, ...(level === 3 ? [0] : [])]) {
    for (const z of [-.65, .44]) box(group, .085, height - .01, .085, '#9a9074', x, .04, z);
  }
  if (level === 2) {
    box(group, 2.65, .65, .075, '#a9ad91', -.63, .12, -.64);
    return group;
  }
  box(group, 1.16, 1.16, .91, '#d9c9a6', -1.38, .08, -.71);
  windowAt(group, -1.38, .58, -.23, .49, .34);
  bench(group, 1.05, .29, 0);
  for (const x of [-1.48, 1.48]) {
    flat(group, 1.95, .035, '#e4d2a7', x, .94, .006, .063);
    flat(group, 1.95, .035, '#e4d2a7', x, 1.76, .006, .063);
    flat(group, .036, .85, '#e4d2a7', x + .95, 1.35, .006, .063);
  }
  lamp(group, -2.14, .71, 1.22);
  lamp(group, 2.14, .71, 1.22);
  return group;
}
