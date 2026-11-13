import * as THREE from 'three';
import { box, cyl, mat, seeded } from '../../../city-web/src/core/shapes';
import { makeTree } from '../../models/trees';

export const glass = mat('#d6ad6b');
const lampGlass = mat('#efc574');
const lampPool = new THREE.MeshBasicMaterial({
  color: '#ffc47b', map: lightFalloff(), transparent: true, depthWrite: false, opacity: .48,
});
lampPool.visible = false;

export function nightLights(night) {
  lampPool.visible = night;
  for (const [material, color, intensity] of [[glass, '#ffb451', 1.25], [lampGlass, '#ffab40', 2.2]]) {
    material.emissive.set(color);
    material.emissiveIntensity = night ? intensity : 0;
  }
}

export function flat(group, width, depth, color, x = 0, z = 0, height = .032, y = 0) {
  return box(group, width, height, depth, color, x, y, z);
}

export function tree(group, kind, x, z, size = 1) {
  const item = makeTree(kind, size, x * .73 + z * .41);
  item.position.set(x, .025, z);
  group.add(item);
}

export function tufts(group, x, z, spread, count, seed) {
  const random = seeded(seed);
  const leaf = mat('#82974d');
  for (let i = 0; i < count; i++) {
    const geometry = new THREE.ConeGeometry(.045 + random() * .026, .12 + random() * .13, 3);
    const tuft = new THREE.Mesh(geometry, leaf);
    tuft.position.set(x + (random() - .5) * spread, .085, z + (random() - .5) * spread);
    tuft.rotation.z = (random() - .5) * .65;
    group.add(tuft);
  }
}

export function windowAt(group, x, y, z, width = .42, height = .47, broken = false) {
  const trim = broken ? '#826d52' : '#a58b69';
  box(group, width + .13, height + .11, .09, trim, x, y - .04, z);
  box(group, width, height, .04, '#534b3d', x, y, z + .056);
  if (!broken) {
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(width - .035, height - .05), glass);
    pane.position.set(x, y + height / 2, z + .078);
    group.add(pane);
    box(group, .027, height, .031, trim, x, y, z + .085);
    box(group, width, .025, .032, trim, x, y + height * .5, z + .085);
  } else {
    const board = box(group, width * 1.06, .085, .052, '#ae875c', x, y + .13, z + .094);
    board.rotation.z = -.27;
  }
  box(group, width + .18, .058, .15, trim, x, y - .07, z + .055);
}

export function lamp(group, x, z, height = .92) {
  cyl(group, .029, .052, height, '#65594c', x, 0, z, 7);
  const lantern = new THREE.Mesh(new THREE.BoxGeometry(.15, .17, .15), lampGlass);
  lantern.position.set(x, height + .05, z);
  group.add(lantern);
  box(group, .19, .055, .19, '#574d3f', x, height + .13, z);
  const pool = new THREE.Mesh(new THREE.PlaneGeometry(1.84, 1.84).rotateX(-Math.PI / 2), lampPool);
  pool.position.set(x, .071, z);
  group.add(pool);
}

function lightFalloff() {
  const size = 32;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const offset = (x + y * size) * 4;
    const radius = Math.hypot(x - (size - 1) / 2, y - (size - 1) / 2) / (size / 2);
    data.set([255, 255, 255, Math.round(Math.max(0, 1 - radius) ** 2 * 255)], offset);
  }
  const texture = new THREE.DataTexture(data, size, size);
  texture.magFilter = texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function board(group, x, z, height, color, type = 'bus') {
  cyl(group, .031, .038, height, '#806950', x, 0, z, 7);
  box(group, .39, .27, .065, color, x, height - .07, z);
  if (type === 'bus') {
    box(group, .23, .11, .019, '#f6e0b6', x, height + .003, z + .038);
    for (const dx of [-.072, .072]) {
      box(group, .064, .043, .022, color, x + dx, height + .046, z + .050);
      box(group, .040, .03, .023, '#615746', x + dx, height - .017, z + .050);
    }
  }
}
