import * as THREE from 'three';
import { bake, box } from '../../city-web/src/core/shapes';

const wall = '#ddd0b8';
const trim = '#f5e7ce';
const roof = '#8e8072';
const glass = '#536364';
const front = .81;

export function makeSchool(size) {
  const group = new THREE.Group();
  box(group, 4.54, .065, 3.02, '#cebea0', 0, 0, .17);

  box(group, 2.14, 1.81, 1.48, '#cbbda4', .50, .065, -1.19);
  box(group, 2.25, .08, 1.56, roof, .50, 1.875, -1.19);
  for (const x of [-.59, 1.59]) box(group, .085, .11, 1.56, trim, x, 1.95, -1.19);
  box(group, 2.22, .11, .075, trim, .50, 1.95, -1.94);
  for (const z of [-1.63, -1.18, -.72]) {
    box(group, .06, .61, .24, glass, 1.585, .95, z);
    box(group, .075, .64, .025, trim, 1.592, .94, z);
  }

  box(group, 4.28, 1.72, 1.51, wall, 0, .065, .04);
  box(group, 4.40, .08, 1.62, roof, 0, 1.785, .04);
  for (const z of [-.73, .81]) box(group, 4.41, .13, .07, trim, 0, 1.865, z);
  for (const x of [-2.17, 2.17]) box(group, .07, .13, 1.57, trim, x, 1.865, .04);
  box(group, 4.31, .07, .058, trim, 0, .87, front);

  for (const x of [-1.78, -1.19, -.60, 0, .60, 1.19, 1.78]) {
    if (Math.abs(x) > .75) frontWindow(group, x, .29);
    frontWindow(group, x, 1.10);
  }
  for (const y of [.29, 1.10]) {
    for (const z of [-.40, .29]) {
      box(group, .038, .41, .30, trim, 2.15, y, z);
      box(group, .052, .34, .23, glass, 2.166, y + .036, z);
    }
  }
  for (const x of [-1.4, 0, 1.4]) box(group, .33, .125, .22, '#716357', x, 1.865, -.25);

  box(group, 1.32, .12, .68, '#bc9e80', 0, .01, 1.22);
  box(group, 1.48, .063, .29, '#dcc8a4', 0, .007, 1.61);
  box(group, .76, .65, .07, '#785745', 0, .126, front);
  for (const x of [-.19, .19]) box(group, .23, .29, .022, glass, x, .42, .854);
  for (const x of [-.60, .60]) box(group, .075, .69, .075, trim, x, .13, 1.42);
  box(group, 1.37, .09, .72, '#bda58a', 0, .82, 1.16);
  box(group, .62, .15, .04, '#6b8e90', 0, .97, front + .01);
  for (const x of [-1.61, 1.61]) {
    box(group, .64, .10, .28, '#af946e', x, .065, 1.18);
    box(group, .54, .16, .18, '#849353', x, .164, 1.18);
  }
  bake(group);
  group.scale.setScalar(size / 5);
  return group;
}

function frontWindow(group, x, y) {
  box(group, .38, .45, .048, trim, x, y, front);
  box(group, .30, .36, .053, glass, x, y + .044, front + .011);
  box(group, .025, .37, .059, trim, x, y + .04, front + .025);
  box(group, .31, .024, .059, trim, x, y + .22, front + .025);
}
