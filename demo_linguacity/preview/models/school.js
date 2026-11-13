import * as THREE from 'three';
import { box, cyl, gableRoof } from '../../../city-web/src/core/shapes';
import { fence } from '../../../city-web/src/world/buildings/common';
import { makeSchool } from '../../models/school';
import { flat, lamp, tree, tufts, windowAt } from './details';

export function school(level) {
  const group = new THREE.Group();
  flat(group, 5.42, 4.05, level === 0 ? '#a6a467' : '#aab375');
  if (level === 3) {
    const schoolModel = makeSchool(4.86);
    schoolModel.position.set(0, .045, -.45);
    group.add(schoolModel);
    for (const x of [-1.63, -.59, .59, 1.63]) windowAt(group, x, 1.14, .36, .23, .24);
    lamp(group, -2.24, 1.63);
    lamp(group, 2.20, 1.63);
  } else {
    ruralSchool(group, level);
  }
  if (level === 0) {
    flat(group, 1.04, 1.34, '#ba9e6a', 0, 1.29, .02, .031);
    for (const [x, z] of [[-2.12, 1.43], [1.63, 1.72], [-1.31, 1.80], [2.13, .20]]) {
      tufts(group, x, z, .62, 13, 23 + x * 19);
    }
    fence(group, -2.31, 1.81, -1.40, 1.81, '#957952');
    fence(group, .95, 1.81, 1.61, 1.74, '#9c8056');
    return group;
  }

  flat(group, level >= 2 ? 4.28 : 2.67, 1.55, level >= 2 ? '#d6bc93' : '#c7ab78', 0, 1.13, .033, .031);
  for (const x of [-2.29, 2.29]) fence(group, x, .17, x, 1.93, '#a8946d');
  fence(group, -2.27, 1.90, -.78, 1.90, '#baa785');
  fence(group, .78, 1.90, 2.27, 1.90, '#baa785');
  if (level >= 2) {
    for (const x of [-.78, .78]) box(group, .14, .90, .16, '#d4bc94', x, .03, 1.87);
    box(group, 1.75, .17, .22, '#6b8d82', 0, .93, 1.87);
    tree(group, 'poplar', 2.28, -.98, .71);
    bikeRack(group, -1.67, 1.15);
  }
  return group;
}

function ruralSchool(group, level) {
  const old = level === 0;
  const width = level === 2 ? 4.15 : 3.55;
  const wall = old ? '#cab58f' : '#e0cda6';
  const front = .56;
  box(group, width + .12, .12, 1.88, '#a69476', 0, .025, -.38);
  box(group, width, 1.20, 1.77, wall, 0, .145, -.38);
  box(group, .57, .83, .058, old ? '#665141' : '#886448', 0, .145, front);
  box(group, .83, .16, .068, '#6b867a', 0, 1.045, front);
  for (const x of [-1.15, 1.15]) windowAt(group, x, .52, front, .49, .43, old);
  flat(group, .84, .39, '#b29c7b', 0, .82, .109, .033);
  if (old) {
    const back = box(group, width + .32, .105, 1.19, '#83745d', 0, 1.55, -.91);
    back.rotation.x = -.38;
    for (const x of [-1.52, -1.02, -.52, -.02, .48, .98, 1.48]) {
      box(group, .062, .069, 1.23, '#9b7953', x, 1.53, .12).rotation.x = .38;
    }
    box(group, 2.40, .092, 1.16, '#a67856', -.72, 1.55, .10).rotation.x = .38;
    box(group, .57, .085, .75, '#87694d', 1.65, 1.44, .30).rotation.set(.38, -.13, -.12);
    for (const [x, y, size] of [[-1.6, .22, .21], [-1.42, .25, .18], [.61, .34, .28], [1.58, .93, .22], [-.75, .92, .19]]) {
      box(group, size, .075, .027, '#a17755', x, y, .525);
    }
  } else {
    gableRoof(group, width + .36, .48, 2.14, level === 1 ? '#a87855' : '#718c7b', 0, 1.33, -.38);
    for (const z of [.07, .43]) {
      box(group, width + .28, .026, .045, '#967053', 0, 1.81 - .45 * (z + .38), z).rotation.x = .40;
    }
    if (level === 2) {
      box(group, 1.54, .99, .86, '#d8c19c', -.99, .1, -1.36);
      box(group, 1.70, .10, .99, '#7c9180', -.99, 1.09, -1.36);
      box(group, 1.24, .068, .57, '#819d8a', 0, 1.09, .77);
      for (const x of [-.56, .56]) box(group, .076, .84, .076, '#b9a17b', x, .20, .98);
    }
  }
}

function bikeRack(group, x, z) {
  box(group, .97, .049, .22, '#93846b', x, .06, z);
  for (const offset of [-.31, -.01, .29]) {
    cyl(group, .022, .022, .18, '#8b9087', x + offset, .07, z, 7);
    for (const dz of [-.15, .15]) {
      const wheel = cyl(group, .115, .115, .031, '#575750', x + offset, .154, z + dz, 12);
      wheel.rotation.z = Math.PI / 2;
    }
    box(group, .04, .052, .30, '#a16954', x + offset, .21, z);
  }
}
