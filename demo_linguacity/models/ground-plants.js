import * as THREE from 'three';
import { mat } from '../../city-web/src/core/shapes';

const stalks = new THREE.CylinderGeometry(.018, .027, 1, 5);
const heads = new THREE.CylinderGeometry(.041, .034, .14, 6);
const reedBlades = new THREE.ConeGeometry(.077, .48, 3);
const petals = new THREE.IcosahedronGeometry(1, 0);
const grassBlades = new THREE.ConeGeometry(.09, .28, 3);
const leaf = mat('#788c57'), reed = mat('#8f9e5d'), seedHead = mat('#a27a52');
const blooms = ['#efe3b7', '#dbb87c', '#cfa5ac', '#acacc7'].map(color => mat(color));
const greens = ['#839d58', '#9caa63', '#729054', '#a3ac6b'].map(color => mat(color));

// Return individual meshes so terrain editing can clear each part by its footprint.
export function makeReed(x, y, z, hasSeedHead, random) {
  const tall = .43 + random() * .31;
  const shaft = new THREE.Mesh(stalks.clone(), reed);
  shaft.scale.y = tall;
  shaft.position.set(x, y + tall / 2, z);
  const parts = [shaft];
  if (hasSeedHead) {
    const head = new THREE.Mesh(heads.clone(), seedHead);
    head.position.set(x, y + tall + .026, z);
    parts.push(head);
  }
  const blade = new THREE.Mesh(reedBlades.clone(), leaf);
  blade.position.set(x + .08, y + .20, z);
  blade.rotation.set((random() - .5) * .66, random() * 6, .34);
  parts.push(blade);
  return parts;
}

export function makeWildflower(x, y, z, palette, random) {
  const height = .15 + random() * .12;
  const stem = new THREE.Mesh(stalks.clone(), leaf);
  stem.scale.set(.46, height, .46);
  stem.position.set(x, y + height / 2, z);
  const bloom = new THREE.Mesh(petals.clone(), blooms[palette]);
  const radius = .050 + random() * .043;
  bloom.position.set(x, y + height, z);
  bloom.scale.set(radius, radius * .50, radius);
  return [stem, bloom];
}

export function makeGrassBlade(x, y, z, shade, random) {
  const blade = new THREE.Mesh(grassBlades.clone(), greens[Math.floor(shade * greens.length)]);
  const height = .55 + random() * .61;
  blade.position.set(x, y + .088 * height, z);
  blade.scale.set(.55, height, .60);
  blade.rotation.set((random() - .5) * .47, random() * 6, (random() - .5) * .43);
  return blade;
}
