import * as THREE from 'three';

export function meshGeometry(positions, colors, indices, colorSize = 3) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, colorSize));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
