import * as THREE from 'three';
import { bake, box, cyl } from '../../city-web/src/core/shapes';

export function makeMotorcycle(color) {
  const bike = new THREE.Group();
  for (const z of [-.125, .125]) {
    const wheel = cyl(bike, .057, .057, .029, '#333637', 0, .057, z, 10);
    wheel.rotation.z = Math.PI / 2;
  }
  box(bike, .105, .077, .25, color, 0, .09, 0);
  box(bike, .079, .03, .125, '#454039', 0, .145, -.057);
  box(bike, .036, .085, .033, color, 0, .14, .09);
  box(bike, .147, .017, .022, '#494b47', 0, .194, .096);
  box(bike, .042, .032, .027, '#fff2c5', 0, .148, .126);
  box(bike, .09, .09, .059, '#566257', 0, .192, -.045);
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(.055, 8, 6),
    new THREE.MeshStandardMaterial({ color: '#f1db9e' }));
  helmet.position.set(0, .27, -.032);
  bike.add(helmet);
  return bake(bike);
}
