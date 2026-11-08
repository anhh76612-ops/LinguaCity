// PARK (Công viên) — lô mở, lối vào từ phía +x và -z (hai phía sát đường).
// Level 1: bãi cỏ, lối đất, cây, ghế · Level 2: quảng trường lát gạch + đài phun nước · Level 3:
// thêm sân chơi, ki-ốt.
// Vị trí ghế cố định ở mọi level vì người dân dùng chúng làm điểm đến (people/nav.ts).
import * as THREE from 'three';
import { C } from '../../core/palette';
import { bake, box, cyl, mat, rbox } from '../../core/shapes';
import { type Built, bench, bush, dynamic, flowerBed, tree } from './common';

/** Ghế trong công viên: vị trí cục bộ + hướng mặt (ghế nhìn về tâm). Dùng chung với nav.ts. */
export const PARK_BENCHES = [
    { x: -1.9, z: 0, face: Math.PI / 2 },   // bên trái, nhìn sang +x
    { x: 0, z: 1.9, face: Math.PI },        // phía sau, nhìn về -z
];

export function buildPark(level: number): Built {
    const g = new THREE.Group();
    const anims: ((dt: number, t: number) => void)[] = [];
    const paved = level >= 2;

    // lối đi hình chữ L từ hai cửa vào tới tâm
    const pathColor = paved ? C.plaza : C.soil;
    box(g, 0.9, 0.025, 3.6, pathColor, 0, 0, -1.75);
    box(g, 3.6, 0.025, 0.9, pathColor, 1.75, 0, 0);
    if (paved) {
        cyl(g, 1.55, 1.55, 0.03, C.plaza, 0, 0, 0, 28);
    }

    for (const b of PARK_BENCHES) {
        bench(g, b.x, b.z, b.face);
    }
    const playground = level >= 3; // sân chơi chiếm góc (-x, -z) nên bỏ cây/bụi ở đó
    if (!playground) {
        tree(g, -2.6, -2.5, 1.2);
        bush(g, -0.9, -2.8, 0.9);
    }
    tree(g, 2.6, 2.6, 1.0, C.leafDark);
    tree(g, -2.7, 2.7, 1.15, C.leafLight);
    bush(g, 2.8, -2.8);
    bush(g, 2.3, -2.9, 0.8);

    if (level >= 2) {
        // Đài phun nước: bể tròn, trụ giữa, đĩa trên; mặt nước nhấp nhô
        cyl(g, 1.0, 1.05, 0.35, C.sidewalk, 0, 0, 0, 24);
        const water = dynamic(new THREE.Mesh(
            new THREE.CylinderGeometry(0.9, 0.9, 0.04, 24),
            mat(C.water, { rough: 0.2 })
        ));
        water.position.y = 0.37; // nhô trên miệng bể (bể là khối đặc cao 0.35)
        g.add(water);
        cyl(g, 0.12, 0.16, 0.9, C.sidewalk, 0, 0.3, 0, 10);
        cyl(g, 0.4, 0.25, 0.12, C.sidewalk, 0, 1.15, 0, 16);
        // tia nước: vài giọt nhỏ bay lên rơi xuống theo vòng
        const drops = dynamic(new THREE.Group());
        const dropGeo = new THREE.SphereGeometry(
            0.05, 6, 4
        ), dropMat = mat('#bfe6f5', { rough: 0.2 });
        for (let i = 0; i < 10; i++) {
            drops.add(new THREE.Mesh(dropGeo, dropMat));
        }
        g.add(drops);
        anims.push((_dt, t) => {
            water.position.y = 0.37 + Math.sin(t * 2) * 0.008;
            drops.children.forEach((d, i) => {
                // k: tiến trình 0→1 của một giọt
                const k = (t * 0.8 + i / 10) % 1, a = (i / 10) * Math.PI * 2;
                d.position.set(
                    Math.cos(a) * k * 0.55,
                    1.3 + Math.sin(k * Math.PI) * 0.45 - k * 0.9,
                    Math.sin(a) * k * 0.55
                );
            });
        });
        if (!playground) {
            flowerBed(g, -1.6, -2.6, 1.2, 0.5);
        }
        flowerBed(g, -2.9, 1.0, 0.5, 1.2);
        flowerBed(g, 2.6, 1.3, 0.5, 1.2, C.flowerYellow);
    }

    if (level >= 3) {
        // Sân chơi ở góc (-x, -z): nền cát, cầu trượt, xích đu đung đưa
        box(g, 2.5, 0.03, 2.4, C.sand, -2.0, 0, -2.05);
        const slide = new THREE.Group();
        box(slide, 0.6, 1.0, 0.6, C.carRed, 0, 0, 0);
        box(slide, 0.7, 0.08, 0.7, C.busYellow, 0, 1.0, 0);
        const chute = box(slide, 0.42, 0.06, 1.5, C.carBlue, 0, 0.45, 0.85);
        chute.rotation.x = 0.62;
        slide.position.set(-2.8, 0, -2.75);
        g.add(slide);
        // khung xích đu (tĩnh) + hai ghế treo (động)
        const sx = -1.5, sz = -2.7;
        for (const dx of [-0.6, 0.6]) {
            const leg = box(g, 0.06, 1.4, 0.06, C.metalDark, sx + dx, 0, sz);
            leg.rotation.z = dx > 0 ? -0.08 : 0.08;
        }
        box(g, 1.4, 0.06, 0.06, C.metalDark, sx, 1.38, sz);
        const swings: THREE.Group[] = [];
        for (const dx of [-0.25, 0.25]) {
            const sw = dynamic(new THREE.Group());
            sw.position.set(sx + dx, 1.4, sz);
            const rope = new THREE.Mesh(
                new THREE.BoxGeometry(0.02, 1.0, 0.02).translate(0, -0.5, 0),
                mat(C.metal)
            );
            const seat = new THREE.Mesh(
                new THREE.BoxGeometry(0.3, 0.04, 0.18).translate(0, -1.0, 0),
                mat(C.busYellow)
            );
            seat.castShadow = true;
            sw.add(rope, seat);
            g.add(sw);
            swings.push(sw);
        }
        anims.push((_dt, t) => swings.forEach((s, i) => (s.rotation.x = Math.sin(t * 2.2
            + i * 1.7) * 0.35)));
        // ki-ốt bán nước có dù
        rbox(g, 0.9, 0.9, 0.7, C.wallPeach, 2.7, 0, -1.4, 0.05);
        cyl(g, 0.03, 0.03, 1.5, C.metalDark, 2.7, 0.9, -1.4, 6);
        const umb = new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.35, 8), mat(C.carRed));
        umb.position.set(2.7, 2.35, -1.4);
        umb.castShadow = true;
        g.add(umb);
    }

    return {
        group: bake(g),
        update: anims.length ? (dt, t) => anims.forEach((f) => f(dt, t)) : undefined
    };
}
