import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { cyl, mat, seeded } from '../../city-web/src/core/shapes';

const up = new THREE.Vector3(0, 1, 0);
const foliageMaterials = new Map();
const crownMesh = makeCrownGeometry();
const bark = '#755b42';

// Each canopy describes its center, three radii, and the density of its fine leaves.
const deciduous = {
  broadleaf: {
    palette: ['#507741', '#70984e', '#9dbc66'],
    trunk: [.08, 1.32, -.03], forks: [[-.51, 1.23, .02], [.44, 1.55, .16], [-.07, 1.73, -.21]],
    crowns: [[-.55, 1.42, .03, .39, .36, .35, 25], [.46, 1.60, .17, .39, .39, .36, 27],
      [-.06, 1.86, -.23, .45, .34, .40, 36], [.27, 1.30, -.37, .31, .28, .31, 16]],
  },
  oak: {
    palette: ['#45693d', '#648b4b', '#90ad60'],
    trunk: [.08, 1.35, .01], forks: [[-.49, 1.40, -.07], [.47, 1.41, .24]],
    crowns: [[.02, 1.56, .01, .82, .57, .66, 115], [-.48, 1.42, .24, .38, .31, .34, 30],
      [.51, 1.52, -.26, .33, .33, .34, 29]],
  },
  umbrella: {
    palette: ['#426f4a', '#649653', '#9dbd6a'],
    trunk: [.10, 1.57, -.04], forks: [[-.71, 1.59, .10], [.68, 1.58, -.10], [-.14, 1.52, .52]],
    crowns: [[.00, 1.74, -.03, .92, .30, .68, 90], [.05, 1.62, .47, .57, .20, .28, 30]],
  },
  birch: {
    palette: ['#5d8243', '#82a351', '#acc675'], pale: true,
    trunk: [-.13, 1.91, -.11], forks: [[-.44, 1.47, .08], [.38, 1.35, .19]],
    crowns: [[-.23, 1.88, -.13, .35, .52, .35, 54], [-.51, 1.50, .08, .33, .31, .29, 34],
      [.42, 1.43, .20, .32, .33, .32, 36]],
  },
  poplar: {
    palette: ['#648543', '#89a957', '#b4c876'],
    trunk: [.07, 1.64, .00], forks: [[-.32, 1.44, .12], [.31, 1.66, -.12]],
    crowns: [[-.31, 1.45, .11, .28, .40, .27, 36], [.30, 1.68, -.11, .32, .44, .31, 38],
      [.03, 1.98, .00, .29, .40, .29, 30]],
  },
  amber: {
    palette: ['#a9562d', '#cd7b3a', '#edac57'],
    trunk: [.03, 1.26, .00],
    crowns: [[.02, 1.48, 0, .50, .83, .47, 116]],
  },
  golden: {
    palette: ['#94743c', '#c2a34d', '#efd47c'],
    trunk: [-.04, 1.00, .01], forks: [[-.31, .99, -.13], [.37, 1.13, .13]],
    crowns: [[.06, 1.23, -.02, .61, .43, .54, 77], [-.29, 1.12, .28, .33, .32, .29, 25]],
  },
  shrub: {
    palette: ['#55763d', '#76994d', '#a7bd64'],
    crowns: [[.02, .22, .01, .55, .26, .43, 58]],
  },
  bush: {
    palette: ['#426c48', '#659451', '#9cbb6b'],
    crowns: [[-.23, .26, -.05, .33, .32, .31, 39], [.21, .33, .03, .37, .39, .33, 50]],
  },
};

const conifers = {
  pine: { height: 2.08, spread: .72, layers: 5, count: 9, lift: -.16, palette: ['#2c5242', '#3e6e50', '#6b935b'] },
  spruce: { height: 2.31, spread: .48, layers: 8, count: 7, lift: -.23, palette: ['#294e49', '#44766b', '#74a28a'] },
  cypress: { height: 1.94, spread: .31, layers: 8, count: 8, lift: .40, palette: ['#3b593b', '#587746', '#89a063'] },
};

export function makeTree(kind, size, heading = 0) {
  const group = new THREE.Group();
  const random = seeded(37 + Math.round(Math.abs(heading) * 67));
  if (Object.hasOwn(deciduous, kind)) addDeciduous(group, deciduous[kind], random);
  else if (Object.hasOwn(conifers, kind)) addConifer(group, conifers[kind], random);
  else addPlant(group, kind);
  group.name = kind;
  group.scale.setScalar(size);
  group.rotation.y = heading;
  return group;
}

function addDeciduous(group, { palette, trunk, forks, pale, crowns }, random) {
  const wood = pale ? '#b1a58b' : bark;
  if (trunk) {
    addBranch(group, [0, 0, 0], [0, .56, 0], pale ? .057 : .106, .065, wood);
    addBranch(group, [0, .54, 0], trunk, .066, .029, wood);
    for (const tip of forks ?? []) addBranch(group, [0, .67, 0], tip, .042, .014, wood);
    if (pale) {
      for (const y of [.22, .43, .65, .87, 1.08]) {
        const spot = cyl(group, .064 - y * .014, .067 - y * .014, .025, '#77694f', -.046 * y, y, -.058 * y, 7);
        spot.rotation.z = .18;
      }
    }
  }

  const patches = [[], []];
  for (const [x, y, z, width, height, depth, count] of crowns) {
    const crown = new THREE.Mesh(crownMesh.clone(), mat(palette[0]));
    crown.name = 'canopy';
    crown.position.set(x, y, z);
    crown.scale.set(width, height, depth);
    crown.castShadow = crown.receiveShadow = true;
    group.add(crown);
    for (let index = 0; index < count; index++) {
      const v = (index + .5) / count * 1.68 - .70;
      const longitude = index * 2.39996 + random() * .28;
      const radius = Math.sqrt(1 - v * v);
      const dx = Math.cos(longitude) * radius, dz = Math.sin(longitude) * radius;
      const contour = crownRadius(dx, v, dz);
      const normal = new THREE.Vector3(dx / width, v / height, dz / depth).normalize();
      const start = new THREE.Vector3(x + dx * width * contour, y + v * height * contour, z + dz * depth * contour);
      const direction = new THREE.Vector3().crossVectors(normal, up).normalize();
      direction.applyAxisAngle(normal, random() * Math.PI * 2);
      const length = (.075 + random() * .06) * Math.min(1, Math.max(.68, width + .35));
      start.addScaledVector(direction, -length * .35).addScaledVector(normal, .012);
      const tip = start.clone().addScaledVector(direction, length).addScaledVector(normal, .016);
      appendLeaf(patches[v > .15 && random() > .31 ? 1 : 0], start, tip, length * .38, .018, normal);
    }
  }
  addFoliage(group, patches[0], palette[1]);
  addFoliage(group, patches[1], palette[2]);
}

function addConifer(group, { height, spread, layers, count, lift, palette }, random) {
  cyl(group, .026, spread * .12, height * .97, bark, 0, 0, 0, 7);
  const core = cyl(group, .006, spread * .47, height * .82, palette[0], 0, height * .17, 0, 8);
  core.name = 'canopy';
  const needles = [[], []];
  for (let layer = 0; layer < layers; layer++) {
    const t = layer / layers;
    const baseY = height * (.24 + .64 * t);
    const radius = spread * (lift > 0 ? Math.sin(Math.PI * (.28 + t * .65)) : 1 - t * .86);
    for (let index = 0; index < count; index++) {
      const angle = (index / count + layer * .33) * Math.PI * 2 + random() * .23;
      const outward = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      const side = new THREE.Vector3(-outward.z, 0, outward.x);
      const start = new THREE.Vector3(0, baseY, 0);
      const tip = start.clone().addScaledVector(outward, radius * (.76 + random() * .24));
      tip.y += lift * radius;
      appendLeaf(needles[0], start, tip, radius * .32, radius * .18, up);
      for (const turn of [-1, 1]) {
        for (const reach of [.33, .62]) {
          const offshoot = start.clone().lerp(tip, reach);
          offshoot.y += radius * .058;
          const end = offshoot.clone().addScaledVector(outward, radius * .34).addScaledVector(side, radius * .20 * turn);
          end.y += radius * (lift > 0 ? .55 : -.20);
          appendLeaf(needles[reach > .5 ? 1 : 0], offshoot, end, radius * .12, radius * .045, up);
        }
      }
    }
  }
  addFoliage(group, needles[0], palette[1]);
  addFoliage(group, needles[1], palette[2]);
}

function addPlant(group, kind) {
  const isPalm = kind === 'palm';
  const isFern = kind === 'fern';
  if (!isPalm && !isFern && kind !== 'rosette') throw new Error(`Unknown plant kind: ${kind}`);
  const origin = new THREE.Vector3(.04, isPalm ? .74 : .055, 0);
  if (isPalm) addBranch(group, [0, 0, 0], origin.toArray(), .068, .042, '#89714e');
  const leaves = [[], []];
  const count = isPalm ? 8 : isFern ? 8 : 11;
  for (let index = 0; index < count; index++) {
    const angle = index * 2.39996;
    const outer = index % 2 === 0;
    const reach = (isPalm ? .68 : isFern ? .60 : .37) * (outer ? 1 : .76);
    const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const tip = origin.clone().addScaledVector(direction, reach);
    tip.y += isPalm ? -.095 : outer ? .20 : .28;
    if (isFern) {
      const side = new THREE.Vector3(-direction.z, 0, direction.x);
      appendLeaf(leaves[0], origin, tip, .013, .045, up);
      for (let step = 1; step <= 5; step++) {
        const fraction = step / 6;
        const start = origin.clone().lerp(tip, fraction);
        start.y += .1 * Math.sin(fraction * Math.PI);
        for (const sign of [-1, 1]) {
          const end = start.clone().addScaledVector(direction, .13)
            .addScaledVector(side, (.17 - fraction * .11) * sign);
          end.y -= .045;
          appendLeaf(leaves[step % 2], start, end, .033, .019, up);
        }
      }
    } else {
      appendLeaf(leaves[index % 2], origin, tip, reach * (isPalm ? .18 : .27), isPalm ? .18 : .09, up);
    }
  }
  addFoliage(group, leaves[0], isPalm ? '#47774c' : isFern ? '#54894e' : '#527e4d');
  addFoliage(group, leaves[1], isPalm ? '#77a458' : isFern ? '#96b966' : '#8daa60');
}

function addBranch(group, from, to, bottom, top, color) {
  const start = new THREE.Vector3(...from), end = new THREE.Vector3(...to);
  const axis = end.clone().sub(start);
  const branch = cyl(group, top, bottom, axis.length(), color, 0, 0, 0, 7);
  branch.position.copy(start).lerp(end, .5);
  branch.quaternion.setFromUnitVectors(up, axis.normalize());
}

function appendLeaf(positions, start, tip, width, rise, normal) {
  const side = new THREE.Vector3().crossVectors(tip.clone().sub(start), normal).normalize();
  const middle = start.clone().lerp(tip, .43);
  const left = middle.clone().addScaledVector(side, width);
  const right = middle.clone().addScaledVector(side, -width);
  const crest = middle.addScaledVector(normal, rise);
  for (const point of [start, left, crest, left, tip, crest, start, crest, right, crest, tip, right]) {
    positions.push(point.x, point.y, point.z);
  }
}

function addFoliage(group, positions, color) {
  if (!positions.length) return;
  if (!foliageMaterials.has(color)) {
    foliageMaterials.set(color, new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide, roughness: .94 }));
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  const foliage = new THREE.Mesh(geometry, foliageMaterials.get(color));
  foliage.castShadow = foliage.receiveShadow = true;
  group.add(foliage);
}

function crownRadius(x, y, z) {
  return 1 + .11 * Math.sin(6 * x + 1.4 * z) * Math.cos(5 * y - z) + .07 * Math.sin(7 * z + 4 * y);
}

function makeCrownGeometry() {
  const sphere = new THREE.IcosahedronGeometry(1, 6);
  sphere.deleteAttribute('normal');
  sphere.deleteAttribute('uv');
  const geometry = mergeVertices(sphere);
  sphere.dispose();
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index++) {
    const x = positions.getX(index), y = positions.getY(index), z = positions.getZ(index);
    const radius = crownRadius(x, y, z);
    positions.setXYZ(index, x * radius, y * radius, z * radius);
  }
  geometry.computeVertexNormals();
  return geometry;
}
