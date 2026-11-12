import * as THREE from 'three';
import { bake, box, mat } from '../../city-web/src/core/shapes';

export function makeAnnex(size) {
  const group = new THREE.Group();
  const wood = '#a77b4c';
  const trim = '#674831';
  const glass = '#526566';
  box(group, 2.92, .08, 2.24, '#c6b18a');
  box(group, 2.6, .96, 1.92, wood, 0, .08);
  box(group, 2.9, .075, 2.18, trim, 0, 1.04);

  const roof = new THREE.BufferGeometry();
  roof.setAttribute('position', new THREE.Float32BufferAttribute([
    -1.48, 1.115, -1.12, 1.48, 1.115, -1.12,
    1.48, 1.115, 1.12, -1.48, 1.115, 1.12,
    -.62, 1.76, 0, .62, 1.76, 0,
  ], 3));
  roof.setIndex([0, 4, 5, 0, 5, 1, 1, 5, 2, 2, 5, 4, 2, 4, 3, 3, 4, 0]);
  roof.computeVertexNormals();
  const roofMesh = new THREE.Mesh(roof.toNonIndexed(), mat('#926b53'));
  roofMesh.geometry.computeVertexNormals();
  roof.dispose();
  group.add(roofMesh);

  box(group, .21, .37, .21, '#a27c54', .80, 1.38, -.29);
  box(group, .27, .06, .27, trim, .80, 1.73, -.29);
  box(group, .44, .73, .06, trim, 0, .08, .99);
  box(group, .68, .095, .31, '#bba682', 0, .015, 1.15);
  box(group, .65, .021, .62, '#d8c39a', 0, .004, 1.61);
  for (const x of [-.88, .88]) {
    box(group, .40, .42, .048, trim, x, .36, .99);
    box(group, .29, .30, .055, glass, x, .42, .996);
    box(group, .03, .33, .06, trim, x, .405, 1.02);
  }
  for (const z of [-.48, .48]) {
    box(group, .045, .41, .36, trim, 1.31, .36, z);
    box(group, .055, .29, .25, glass, 1.328, .42, z);
  }
  bake(group);
  group.scale.setScalar(size / 4);
  return group;
}
