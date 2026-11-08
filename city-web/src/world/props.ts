// Cây và đèn đường: rất nhiều bản sao giống nhau → dùng InstancedMesh.
// InstancedMesh vẽ N bản sao chỉ với MỘT lần vẽ; mỗi bản sao có ma trận (vị trí/xoay/cỡ) và màu
// riêng.
import * as THREE from 'three';
import { C } from '../core/palette';
import { mat, seeded } from '../core/shapes';
import { BLOCK_H, BLOCK_IN, BLOCK_OUT, MAP_HALF } from './grid';

type Spot = { x: number; z: number; y: number; s: number };

function instanced(
    geo: THREE.BufferGeometry,
    color: string,
    spots: Spot[],
    place: (s: Spot, m: THREE.Matrix4) => void,
    tint?: (i: number) => string
): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(geo, mat(color), spots.length);
    const m = new THREE.Matrix4(), c = new THREE.Color();
    spots.forEach((s, i) => {
        place(s, m);
        mesh.setMatrixAt(i, m);
        if (tint) {
            mesh.setColorAt(i, c.set(tint(i)));
        }
    });
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

/** Hàng cây trên dải cỏ quanh mép bản đồ (bỏ trống chỗ đường đi ra). */
function edgeTreeSpots(): Spot[] {
    const rnd = seeded(7), out: Spot[] = [];
    const ring = (MAP_HALF + BLOCK_OUT) / 2; // giữa mép khối nhà và mép bản đồ
    for (let t = -MAP_HALF + 0.8; t <= MAP_HALF - 0.8; t += 1.55) {
        if (Math.abs(t) < BLOCK_IN + 0.4) {  // chừa chỗ cho đường
            continue;
        }
        for (const [x, z] of [[t, -ring], [t, ring], [-ring, t], [ring, t]]) {
            out.push({
                x: x + (rnd() - 0.5) * 0.25,
                z: z + (rnd() - 0.5) * 0.25,
                y: 0,
                s: 0.75 + rnd() * 0.45
            });
        }
    }
    return out;
}

export function buildTrees(spots: Spot[] = edgeTreeSpots()): THREE.Group {
    const g = new THREE.Group();
    g.name = 'trees';
    const trunk = new THREE.CylinderGeometry(0.08, 0.11, 0.6, 6).translate(0, 0.3, 0);
    const crown = new THREE.IcosahedronGeometry(0.55, 1).translate(0, 1.05, 0);
    const crownTop = new THREE.IcosahedronGeometry(0.38, 1).translate(0.08, 1.48, 0.05);
    const rnd = seeded(11);
    const tints = spots.map(() => [C.leaf, C.leafDark, C.leafLight][Math.floor(rnd() * 3)]);
    const place = (
        s: Spot, m: THREE.Matrix4
    ) => m.compose(
        new THREE.Vector3(s.x, s.y, s.z),
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), s.x * 3 + s.z),
        new THREE.Vector3(s.s, s.s, s.s)
    );
    g.add(instanced(trunk, C.trunk, spots, place));
    // vật liệu trắng × màu từng bản sao = mỗi cây một sắc xanh khác nhau
    g.add(instanced(crown, '#ffffff', spots, place, (i) => tints[i]));
    g.add(instanced(crownTop, '#ffffff', spots, place, (i) => tints[i]));
    return g;
}

/** Đèn đường dọc vỉa hè phía trong của mỗi khối nhà. */
export function buildLamps(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'lamps';
    const spots: Spot[] = [];
    const edge = BLOCK_IN + 0.18; // sát mép bó vỉa, chừa lối đi giữa vỉa hè
    for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
            for (const t of [4.2, 8.8]) {
                spots.push({ x: sx * t, z: sz * edge, y: BLOCK_H, s: 1 });
                spots.push({ x: sx * edge, z: sz * t, y: BLOCK_H, s: 1 });
            }
        }
    }
    const pole = new THREE.CylinderGeometry(0.04, 0.05, 1.7, 6).translate(0, 0.85, 0);
    const head = new THREE.SphereGeometry(0.13, 10, 8).translate(0, 1.78, 0);
    const place = (s: Spot, m: THREE.Matrix4) => m.makeTranslation(s.x, s.y, s.z);
    g.add(instanced(pole, C.metalDark, spots, place));
    const bulbs = instanced(head, '#fff4c2', spots, place);
    bulbs.material = mat('#fff4c2', { emissive: '#ffe08a' });
    g.add(bulbs);
    return g;
}
