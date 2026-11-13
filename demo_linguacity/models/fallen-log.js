import * as THREE from 'three';
import { mat } from '../../city-web/src/core/shapes';

const up = new THREE.Vector3(0, 1, 0);
const bark = mat('#887357');

export function makeFallenLog(x, y, z, heading, length) {
  const log = new THREE.Mesh(new THREE.CylinderGeometry(.097, .124, length, 8), bark);
  log.position.set(x, y + .095, z);
  log.quaternion.setFromUnitVectors(up, new THREE.Vector3(Math.sin(heading), .025, Math.cos(heading)).normalize());
  log.castShadow = log.receiveShadow = true;
  return log;
}
