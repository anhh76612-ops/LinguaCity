import * as THREE from 'three';
import { box, mat, seeded } from '../../city-web/src/core/shapes';
import { makeChibi, randomLook } from '../../city-web/src/people/chibi';
import { applyPose, poseFor, restPose } from '../../city-web/src/people/poses';
import { makeBus } from '../../city-web/src/world/buildings/road';
import { makeBasketballCourt } from '../models/basketball-court';
import { busStation } from './models/bus-station';
import { hospital, market, shops } from './models/city';
import { flat, lamp, tree } from './models/details';
import { house } from './models/house';
import { park, parkSeats } from './models/park';
import { school } from './models/school';

const parkPoint = [-3.12, 3.75];
const sportPoint = [-3.09, 8.30];
const river = z => -13.06 + Math.sin(z * .25) * 1.04;
const roadLayout = developed => developed ?
  { width: 2.45, avenues: [[-5.82, 1.56], [0, 1.99], [7.20, 1.78]] } :
  { width: 1.52, avenues: [[-5.82, .72], [0, 1.25]] };
const grass = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .96 });

export function makeTown(developed, mayorLevel) {
  const group = new THREE.Group();
  const lots = [];
  terrain(group, developed);
  streets(group, developed);
  const addLot = (model, name, x, z, rotation = 0) => {
    model.position.set(x, 0, z);
    model.rotation.y = rotation;
    model.userData.label = name;
    lots.push(model);
    group.add(model);
    return model;
  };
  const level = developed ? 3 : 0;
  const home = addLot(house(mayorLevel), mayorLevel ? `House Lv${mayorLevel}` : 'House Lv0 (chưa xây)', -2.85, -4.04);
  home.userData.mayorHome = true;
  addLot(school(level), `School Lv${level}`, 4.00, -4.15);
  addLot(park(level), `Park Lv${level}`, ...parkPoint);
  addLot(busStation(level), `Bus Station Lv${level}`, 4.03, 3.79, Math.PI);
  for (const [index, [x, z]] of [[-8.99, -4.57], [-8.83, 4.03], [-7.87, -8.63]].entries()) {
    addLot(house(developed ? 3 : 1, true, index), 'Nhà dân', x, z);
  }
  if (developed) {
    addLot(hospital(), 'Hospital Lv3', 10.18, -4.18);
    addLot(market(), 'Market Lv3', 10.18, 3.79, Math.PI);
    addLot(shops(), 'Shops Lv3', 4.01, -8.60);
    addLot(makeBasketballCourt(4.67), 'Sports Lv3', ...sportPoint);
    addLot(house(3, true, 1), 'Nhà dân', -8.78, 8.78);
    addLot(house(3, true, 2), 'Nhà dân', -2.87, -8.97);
    addLot(shops(), 'Shops Lv3', 10.16, 8.40, Math.PI);
    const bus = makeBus();
    bus.scale.setScalar(.57);
    bus.position.set(4.92, .064, 2.38);
    bus.rotation.y = Math.PI / 2;
    group.add(bus);
    for (const [x, z] of [[-1.09, -1.30], [1.26, 1.65], [7.57, -1.66], [-6.93, 1.56], [11.8, .99]]) {
      lamp(group, x, z, 1.07);
    }
  }
  for (const [kind, x, z, size] of [
    ['oak', -11.29, -7.82, 1.12], ['pine', -11.56, -3.52, .91],
    ['birch', -11.45, 2.89, .95], ['umbrella', -10.71, 6.63, 1.06],
    ['spruce', -9.45, 8.26, .95], ['golden', -9.16, -10.94, .9],
    ['broadleaf', -4.04, -9.82, .86], ['pine', 1.57, -11.23, .91],
    ['golden', 7.00, -10.66, .89], ['cypress', 9.18, -7.0, .66],
    ['broadleaf', 11.84, -6.77, 1.0], ['amber', 13.03, 1.93, .98],
    ['oak', 12.67, 6.76, .93], ['pine', 8.05, 8.03, 1.03],
    ['poplar', 5.72, 8.92, .76], ['umbrella', .95, 9.39, 1.06],
    ['amber', -7.65, 7.16, .81], ['broadleaf', -7.59, -6.94, .66],
    ['shrub', -11.42, 1.40, .68], ['fern', -11.13, 4.90, .74],
    ['pine', -15.46, -6.81, 1.05], ['oak', -15.27, -1.49, 1.19],
    ['broadleaf', -14.76, 3.19, .93], ['golden', -14.97, 7.51, .84],
    ['shrub', -5.13, 6.05, .59], ['rosette', 5.70, 6.60, .64],
  ]) tree(group, kind, x, z, size);

  const actors = addPeople(group, developed);
  return { group, lots, update: actors };
}

function terrain(group, developed) {
  const { width, avenues } = roadLayout(developed);
  const mesh = new THREE.PlaneGeometry(90, 90, 90, 90).rotateX(-Math.PI / 2);
  const pos = mesh.attributes.position;
  const colors = [];
  const dry = new THREE.Color('#b7bb77'), green = new THREE.Color('#93a964'), bank = new THREE.Color('#c0aa80');
  for (let index = 0; index < pos.count; index++) {
    const x = pos.getX(index), z = pos.getZ(index);
    const distance = Math.abs(x - river(z));
    const outside = x < -11.25 || x > 14 || Math.abs(z) > 11;
    const roadEdge = Math.min(Math.abs(z) - width / 2, ...avenues.map(([axis, span]) => Math.abs(x - axis) - span / 2));
    const awayFromRoad = THREE.MathUtils.smoothstep(roadEdge, .75, 2.1);
    const y = distance < 1.55 ? -.27 * (1 - Math.min(1, distance / 1.55)) :
      -.008 + (outside ? .14 * Math.sin(x * .37) * Math.cos(z * .34) * awayFromRoad : 0);
    pos.setY(index, y);
    const color = dry.clone().lerp(green, .49 + .18 * Math.sin(x * .71 + z * .27) + .13 * Math.cos(z * .91 - x * .25));
    if (distance < 1.67) color.lerp(bank, .69);
    colors.push(color.r, color.g, color.b);
  }
  mesh.computeVertexNormals();
  mesh.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const ground = new THREE.Mesh(mesh, grass);
  ground.receiveShadow = true;
  group.add(ground);

  const vertices = [], indices = [];
  for (let z = -44; z <= 44; z++) {
    vertices.push(river(z) - 1.03, -.061, z, river(z) + 1.03, -.061, z);
    const offset = (z + 44) * 2;
    if (offset) indices.push(offset - 2, offset, offset - 1, offset - 1, offset, offset + 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const water = new THREE.Mesh(geometry, mat('#669aa6', { rough: .59 }));
  water.receiveShadow = true;
  group.add(water);
  const random = seeded(21);
  for (let index = 0; index < 40; index++) {
    const z = index * .68 - 13;
    const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(.105 + random() * .12, 0), mat(index % 2 ? '#aa9f84' : '#c6b897'));
    rock.position.set(river(z) + (index % 2 ? -1.18 : 1.18), .016, z);
    rock.scale.y = .62;
    rock.castShadow = rock.receiveShadow = true;
    group.add(rock);
  }
}

function streets(group, developed) {
  const eastEnd = 42, westEnd = -11.62;
  const { width, avenues } = roadLayout(developed);
  const road = developed ? '#827a70' : '#c2a172';
  flat(group, eastEnd - westEnd, width, road, (eastEnd + westEnd) / 2, 0, .033);
  for (const [x, span] of avenues) {
    const depth = 44 - width / 2;
    for (const side of [-1, 1]) {
      flat(group, span, depth, developed && x === -5.82 ? '#ad9c84' : road, x, side * (depth / 2 + width / 2), .033);
      if (developed) {
        for (const edge of [-1, 1]) {
          flat(group, .23, depth, '#b7a78e', x + edge * (span / 2 + .115), side * (depth / 2 + width / 2), .047);
        }
      }
    }
  }
  if (!developed) return;
  let start = westEnd;
  for (const [axis, span] of [...avenues, [eastEnd, 0]]) {
    const end = axis - span / 2 - .20;
    for (const side of [-1, 1]) {
      flat(group, end - start, .24, '#bcab91', (start + end) / 2, side * (width / 2 + .12), .046);
    }
    start = axis + span / 2 + .20;
  }
  for (let x = -10.5; x < 25; x += .72) {
    if (avenues.every(([axis, span]) => Math.abs(x - axis) > span / 2 + .58)) {
      flat(group, .33, .047, '#dfd1af', x, 0, .006, .033);
    }
  }
  for (const [x, span] of avenues.slice(1)) {
    for (const side of [-1, 1]) {
      for (let stripe = -3; stripe <= 3; stripe++) {
        flat(group, .095, .31, '#ddd0b0', x + stripe * span / 8, side * (width / 2 + .37), .006, .034);
      }
    }
  }
}

function addPeople(group, developed) {
  const random = seeded(82);
  const actors = [];
  const add = (x, z, facing = 0, type = 'idle', mayor = false) => {
    const look = mayor ? { skin: '#ecc49a', hair: '#624433', shirt: '#4c79ac', pants: '#473e3d', style: 'short', accessory: 'hat', bag: false } :
      randomLook(random);
    const rig = makeChibi(look);
    rig.root.scale.setScalar(.82);
    rig.root.position.set(x, type === 'sit' ? .006 : ['pass', 'catch'].includes(type) ? .141 : .038, z);
    rig.root.rotation.y = facing;
    group.add(rig.root);
    const actor = { rig, pose: restPose(), type, path: null, speed: 1.05 + random() * .2, offset: random() * 3 };
    actors.push(actor);
    return actor;
  };
  add(-1.22, .19, .64, 'idle', true);
  const walk = (points) => {
    const person = add(...points[0], 0, 'walk');
    const segments = points.map(([x, z], index) => {
      const [endX, endZ] = points[(index + 1) % points.length];
      return { x, z, dx: endX - x, dz: endZ - z, length: Math.hypot(endX - x, endZ - z) };
    });
    person.path = { segments, length: segments.reduce((sum, step) => sum + step.length, 0) };
  };
  let ball;
  if (developed) {
    for (const [x, z] of parkSeats) add(parkPoint[0] + x, parkPoint[1] + z, 0, 'sit');
    add(sportPoint[0] - .82, sportPoint[1] + .22, Math.PI / 2, 'pass');
    add(sportPoint[0] + .82, sportPoint[1] + .22, -Math.PI / 2, 'catch');
    add(4.71, 3.46, Math.PI, 'sit');
    walk([[.33, -2.05], [.33, .26], [2.25, .26], [.33, .26]]);
    ball = new THREE.Mesh(new THREE.SphereGeometry(.090, 12, 8), mat('#bb7144'));
    ball.castShadow = true;
    group.add(ball);
  } else {
    walk([[-8.93, -2.26], [-8.93, -.42], [-6.37, -.42], [-8.93, -.42]]);
    walk([[-5.67, 1.82], [-5.67, 4.02], [-5.67, 6.42], [-5.67, 4.02]]);
    walk([[2.63, -.37], [5.92, -.37], [7.55, -.37], [5.92, -.37]]);
    walk([[.45, 1.21], [.45, 3.29], [.45, 6.56], [.45, 3.29]]);
    add(-7.78, -6.43, .5);
  }

  return (time, dt) => {
    for (const actor of actors) {
      const { root } = actor.rig;
      if (actor.path) updateWalker(root, actor.path, time * actor.speed + actor.offset);
      const pass = actor.type === 'pass' || actor.type === 'catch';
      const pose = poseFor(pass ? 'idle' : actor.type, time, time * actor.speed * 12, 0);
      if (pass) {
        const phase = (time + (actor.type === 'pass' ? 0 : 1.2)) % 2.4;
        pose.armL = pose.armR = -(.49 + .84 * Math.max(0, 1 - Math.abs(.54 - phase) * 2.25));
      }
      applyPose(actor.rig, actor.pose, pose, dt, actor.type === 'sit');
    }
    if (ball) {
      const phase = (time % 1.2) / 1.2;
      const direction = Math.floor(time / 1.2) % 2 ? -1 : 1;
      const release = THREE.MathUtils.clamp((phase - .24) / .70, 0, 1);
      ball.position.set(sportPoint[0] + direction * (-.58 + 1.16 * release),
        .62 + .59 * Math.sin(Math.PI * release), sportPoint[1] + .22);
    }
  };
}

function updateWalker(root, { segments, length }, distance) {
  let remaining = distance % length;
  for (const step of segments) {
    if (remaining >= step.length) { remaining -= step.length; continue; }
    const ratio = remaining / step.length;
    root.position.x = step.x + step.dx * ratio;
    root.position.z = step.z + step.dz * ratio;
    root.rotation.y = Math.atan2(step.dx, step.dz);
    break;
  }
}
