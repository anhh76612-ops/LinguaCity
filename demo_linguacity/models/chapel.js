import * as THREE from 'three';
import { bake, box, cyl, gableRoof, mat } from '../../city-web/src/core/shapes';

export function makeChapel(size) {
  const group = new THREE.Group();
  const wall = '#e5d9be';
  const trim = '#f3e5c9';
  const teal = '#51787b';
  box(group, 3.28, .10, 2.82, '#c4b59a', 0, 0, .09);
  box(group, 2.73, 1.24, 1.80, wall, -.16, .10, -.25);
  gableRoof(group, 2.94, .61, 2.03, teal, -.16, 1.34, -.25);
  for (const x of [-1.22, -.66, -.10]) {
    box(group, .072, 1.14, .07, trim, x - .22, .11, .66);
    archWindow(group, x, .55, .66);
  }

  const towerX = .98, towerZ = .62;
  box(group, .85, 2.11, .81, wall, towerX, .10, towerZ);
  for (const y of [.73, 1.65, 2.12]) box(group, .92, .065, .88, trim, towerX, y, towerZ);
  archWindow(group, towerX, 1.74, towerZ + .41);
  box(group, .069, .34, .19, '#646957', towerX + .423, 1.77, towerZ);
  box(group, .38, .59, .055, '#8b694e', towerX, .10, towerZ + .422);
  box(group, .71, .075, .31, '#c6b390', towerX, .014, 1.18);
  const dome = new THREE.LatheGeometry([
    [.45, 0], [.43, .09], [.34, .20], [.24, .30], [.12, .42], [.075, .50], [0, .56],
  ].map(([radius, y]) => new THREE.Vector2(radius, y)), 12);
  const domeMesh = new THREE.Mesh(dome, mat(teal));
  domeMesh.position.set(towerX, 2.20, towerZ);
  group.add(domeMesh);
  cyl(group, .017, .029, .22, '#a98a52', towerX, 2.73, towerZ, 7);
  box(group, .13, .027, .025, '#a98a52', towerX, 2.86, towerZ);
  bake(group);
  group.scale.setScalar(size / 4);
  return group;
}

function archWindow(group, x, y, z) {
  box(group, .24, .32, .041, '#b7aa90', x, y, z);
  box(group, .16, .23, .039, '#657d7a', x, y + .04, z + .023);
  const top = cyl(group, .08, .08, .041, '#657d7a', x, y + .242, z + .023, 12);
  top.rotation.x = Math.PI / 2;
  box(group, .019, .30, .048, '#b7aa90', x, y + .045, z + .034);
}
