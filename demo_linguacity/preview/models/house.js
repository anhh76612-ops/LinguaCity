import * as THREE from 'three';
import { box, gableRoof } from '../../../city-web/src/core/shapes';
import { fence, flowerBed } from '../../../city-web/src/world/buildings/common';
import { makeHouse } from '../../models/house';
import { flat, lamp, tree, tufts } from './details';

export function house(level, resident = false, variant = 0) {
  const group = new THREE.Group();
  if (level === 0) {
    flat(group, 3.88, 3.72, '#ae9063');
    flat(group, 3.45, 3.25, '#c2a778', .12, .10, .020, .031);
    for (const x of [-1.72, 1.72]) {
      for (const z of [-1.48, 1.48]) box(group, .095, .40, .095, '#9f7248', x, .034, z);
    }
    for (const z of [-.50, -.30, -.10]) box(group, .95, .078, .14, '#8c6644', .69, .035, z);
    flat(group, .53, .39, '#b68665', -.91, -.65, .14, .034);
    tufts(group, -.92, 1.23, .58, 7, 38);
    return group;
  }

  const roof = ['#aa714e', '#b48a51', '#82845b'][variant % 3];
  flat(group, 4.25, 4.02, level === 1 ? '#a4ac64' : '#adb774');
  const model = makeHouse(resident ? 2.90 : level === 1 ? 3.05 : level === 2 ? 3.60 : 3.83,
    level === 3 ? 3 : 1, roof);
  model.group.position.set(level === 2 ? -.35 : 0, .036, -.27);
  group.add(model.group);
  group.userData.animate = (dt, time) => {
    model.lights.emissiveIntensity = group.userData.night ? .95 : .13;
    for (const [index, { figure, x }] of model.silhouettes.entries()) {
      figure.position.x = x + Math.sin(time * .88 + index) * .065;
    }
  };
  flat(group, .58, .91, level > 1 ? '#d2bd9b' : '#c4aa78', level === 2 ? -.35 : 0, 1.51, .017, .033);
  if (resident) {
    tufts(group, 1.47, .81, .48, 8, variant + 6);
    box(group, .52, .075, .34, '#a98a5d', -.90, .04, 1.38);
    return group;
  }

  fence(group, -1.94, 1.72, -.53, 1.72, level === 1 ? '#a28157' : '#d6bb90');
  fence(group, .53, 1.72, 1.94, 1.72, level === 1 ? '#a28157' : '#d6bb90');
  if (level === 2) {
    box(group, .91, .91, 1.17, '#d2b592', 1.08, .095, -.46);
    gableRoof(group, 1.04, .32, 1.34, '#9c6a47', 1.08, 1.0, -.46);
    box(group, .34, .38, .038, '#7b765a', 1.13, .36, .149);
    flowerBed(group, 1.37, .94, .76, .48, '#d69875');
  }
  if (level === 3) {
    box(group, 1.20, .10, .43, '#bd9d78', .57, 1.16, 1.19);
    for (const x of [.02, .29, .56, .84, 1.12]) box(group, .035, .27, .04, '#92684b', x, 1.26, 1.37);
    box(group, 1.20, .049, .055, '#886145', .57, 1.52, 1.37);
    tree(group, 'broadleaf', -1.58, -.81, .66);
    flowerBed(group, 1.45, .96, .70, .48, '#d69477');
    lamp(group, 1.41, 1.46, .60);
  }
  return group;
}
