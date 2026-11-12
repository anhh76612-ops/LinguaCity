import * as THREE from 'three';
import { bake, rbox } from '../../city-web/src/core/shapes';

/** Assemble wood posts and two rails from ground-level points in order. */
export function makeFence(points) {
  const group = new THREE.Group();
  const alongRail = new THREE.Vector3(1, 0, 0);
  for (const [index, { x, y, z }] of points.entries()) {
    rbox(group, .144, .64, .144, index % 2 ? '#8d6a46' : '#98734e', x, y - .075, z, .018);
    rbox(group, .161, .108, .161, '#795c41', x, y - .01, z, .012);
    rbox(group, .175, .062, .175, '#b4986c', x, y + .553, z, .017);
    if (!index) continue;

    const start = points[index - 1];
    const direction = new THREE.Vector3(x - start.x, y - start.y, z - start.z);
    const length = direction.length();
    if (length < .001) continue;
    direction.divideScalar(length);
    for (const [height, color] of [[.218, '#98764d'], [.444, '#b38d5b']]) {
      const rail = rbox(group, length, .085, .075, color,
        (start.x + x) / 2, (start.y + y) / 2 + height - .0425, (start.z + z) / 2, .013);
      rail.quaternion.setFromUnitVectors(alongRail, direction);
    }
  }
  return bake(group);
}
