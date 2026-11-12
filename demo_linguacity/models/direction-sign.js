import * as THREE from 'three';
import { bake, box, mat, rbox } from '../../city-web/src/core/shapes';

const arrow = new THREE.Shape();
arrow.moveTo(-.14, -.066);
arrow.lineTo(.15, -.066);
arrow.lineTo(.285, 0);
arrow.lineTo(.15, .066);
arrow.lineTo(-.14, .066);
arrow.closePath();

/** Directions are unit vectors in the map's horizontal plane. */
export function makeDirectionSign(directions) {
  const group = new THREE.Group();
  group.userData.arrows = directions;
  const height = .67 + .158 * (directions.length - 1);
  rbox(group, .096, height, .096, '#876545', 0, -.045, 0, .013);
  for (const [index, { x, z }] of directions.entries()) {
    const board = new THREE.Group();
    board.position.y = .505 + index * .158;
    board.rotation.y = Math.atan2(-z, x);
    group.add(board);

    const geometry = new THREE.ExtrudeGeometry(arrow, {
      depth: .039, bevelEnabled: true, bevelThickness: .008, bevelSize: .008, bevelSegments: 1, steps: 1,
    });
    geometry.translate(0, 0, -.0195);
    const mesh = new THREE.Mesh(geometry, mat(['#b38a5d', '#c19a68', '#aa8054'][index]));
    board.add(mesh);
    for (const face of [-1, 1]) {
      for (const offset of [-.043, .043]) {
        box(board, .019, .019, .009, '#786650', offset, -.0095, face * .029);
      }
    }
  }
  return bake(group);
}
