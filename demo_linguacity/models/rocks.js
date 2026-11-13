import * as THREE from 'three';
import { mat, seeded } from '../../city-web/src/core/shapes';
import { meshGeometry } from '../mesh-geometry';

const rockShape = new THREE.IcosahedronGeometry(1, 0);
const stones = ['#b5a88b', '#9e9d86', '#c8b99e', '#858f80'].map(color => mat(color));
const ledgeMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: .97 });

export function makeRock(size, random) {
  const mesh = new THREE.Mesh(rockShape.clone(), stones[Math.floor(random() * stones.length)]);
  mesh.scale.set(size * (1 + random() * .45), size * (.46 + random() * .34), size * (.74 + random() * .28));
  mesh.rotation.y = random() * Math.PI * 2;
  return mesh;
}

export function makeRockLedge(width, depth, height, seed) {
  const random = seeded(seed);
  const rim = Array.from({ length: 7 }, (_, index) => {
    const azimuth = index / 7 * Math.PI * 2 + (random() - .5) * .24;
    return [Math.cos(azimuth) * (.79 + random() * .31), Math.sin(azimuth) * (.79 + random() * .31)];
  });
  const layers = [
    [-.60, 1.04, '#88856d'], [.19, 1.03, '#a19b82'],
    [.32, .94, '#9c937b'], [.70, .85, '#b1a389'], [1, .61, '#c2b296'],
  ];
  const positions = [], colors = [], indices = [];
  for (const [level, spread, color] of layers) {
    const tint = new THREE.Color(color);
    for (const [u, v] of rim) {
      positions.push(u * width * spread + level * .20,
        (level + (u - v) * .09) * height,
        v * depth * spread + level * .13);
      const multiplier = .88 + random() * .19;
      colors.push(tint.r * multiplier, tint.g * multiplier, tint.b * multiplier);
    }
  }
  const cap = (layers.length - 1) * rim.length;
  for (let row = 1; row < layers.length; row++) for (let index = 0; index < rim.length; index++) {
    const next = (index + 1) % rim.length;
    const low = (row - 1) * rim.length, high = row * rim.length;
    indices.push(low + index, high + index, low + next, low + next, high + index, high + next);
  }
  for (let index = 1; index < rim.length - 1; index++) indices.push(cap, cap + index + 1, cap + index);
  const mesh = new THREE.Mesh(meshGeometry(positions, colors, indices), ledgeMaterial);
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}
