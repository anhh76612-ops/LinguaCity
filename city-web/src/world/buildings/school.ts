// SCHOOL (Trường học · Exam Center) — mặt trước hướng +z.
// Level 1: một dãy lớp học + cột cờ · Level 2: hai tầng + tháp đồng hồ · Level 3: thêm dãy nhà phụ
// và sân bóng rổ.
import * as THREE from 'three';
import { C } from '../../core/palette';
import { bake, box, cyl, mat, rbox, windows } from '../../core/shapes';
import { type Built, bush, dynamic, fence, sign, tree } from './common';

export function buildSchool(level: number): Built {
    const g = new THREE.Group();
    const anims: ((dt: number, t: number) => void)[] = [];
    let doorZ: number;

    // Dãy chính: cao dần theo level
    const floors = level >= 2 ? 2 : 1;
    const W = level >= 3 ? 6 : 5, D = 2.6, H = floors * 1.8 + 0.2;
    const cz = level >= 3 ? -1.7 : -0.4;
    rbox(g, W, H, D, C.wallCream, 0, 0, cz, 0.06);
    box(g, W + 0.25, 0.22, D + 0.25, C.roofRed, 0, H, cz); // mái bằng có viền
    box(g, W + 0.05, 0.25, D + 0.05, C.wallBrick, 0, 0, cz); // chân tường gạch
    windows(
        g,
        {
            face: '+z',
            wallW: W,
            wallD: D,
            cols: level >= 3 ? 6 : 4,
            rows: floors,
            y0: 0.6,
            floorH: 1.8,
            cz,
            w: 0.6,
            h: 0.75
        }
    );
    windows(
        g,
        {
            face: '+x', wallW: W, wallD: D, cols: 2, rows: floors, y0: 0.6, floorH: 1.8, cz, w: 0.6,
            h: 0.75
        }
    );
    // cửa đôi + bậc tam cấp + biển tên
    const front = cz + D / 2;
    box(g, 1.0, 1.15, 0.06, C.door, 0, 0, front + 0.01);
    box(g, 1.6, 0.08, 0.6, C.sidewalk, 0, 0, front + 0.3);
    const s = sign('SCHOOL', 1.8, 0.38, '#3d6fb6');
    s.position.set(0, 1.42, front + 0.04);
    g.add(s);
    doorZ = front + 0.1;

    if (level >= 2) {
        // Tháp đồng hồ mọc lên giữa mái, mái nhọn 4 cạnh, kim quay theo giờ thật
        const tz = cz + 0.45, th = H + 1.8;
        rbox(g, 1.3, th, 0.9, C.wallWhite, 0, 0, tz - 0.45, 0.05);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.1, 4), mat(C.roofRed));
        roof.rotation.y = Math.PI / 4;
        roof.position.set(0, th + 0.55, tz - 0.45);
        roof.castShadow = true;
        g.add(roof);
        const face = new THREE.Mesh(
            new THREE.CylinderGeometry(0.42, 0.42, 0.06, 24),
            mat('#fffaf0')
        );
        face.rotation.x = Math.PI / 2;
        face.position.set(0, th - 0.75, tz + 0.03);
        g.add(face);
        const hands = dynamic(new THREE.Group());
        hands.position.set(0, th - 0.75, tz + 0.08);
        const hourHand = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.22, 0.02).translate(0, 0.11, 0),
            mat(C.metalDark)
        );
        const minHand = new THREE.Mesh(
            new THREE.BoxGeometry(0.035, 0.34, 0.02).translate(0, 0.17, 0),
            mat(C.metalDark)
        );
        hands.add(hourHand, minHand);
        g.add(hands);
        anims.push(() => {
            const d = new Date(), m = d.getMinutes() + d.getSeconds() / 60, h = (d.getHours() % 12)
                + m / 60;
            minHand.rotation.z = -(m / 60) * Math.PI * 2;
            hourHand.rotation.z = -(h / 12) * Math.PI * 2;
        });
    }

    if (level >= 3) {
        // Dãy nhà phụ bên phải (+x) và sân bóng rổ bên trái
        rbox(g, 2.2, 2.9, 3.0, C.wallMint, 2.3, 0, 1.2, 0.06);
        box(g, 2.4, 0.2, 3.2, C.roofGreen, 2.3, 2.9, 1.2);
        windows(
            g,
            {
                face: '+x', wallW: 2.2, wallD: 3.0, cols: 2, rows: 2, y0: 0.5, floorH: 1.3, cx: 2.3,
                cz: 1.2
            }
        );
        windows(
            g,
            {
                face: '+z', wallW: 2.2, wallD: 3.0, cols: 2, rows: 2, y0: 0.5, floorH: 1.3, cx: 2.3,
                cz: 1.2
            }
        );
        // sân: nền xanh, vạch trắng, cột rổ
        box(g, 2.8, 0.03, 2.3, '#6aa0c8', -1.9, 0, 1.6);
        box(g, 2.8, 0.035, 0.05, C.line, -1.9, 0, 1.6);
        box(g, 0.05, 0.035, 2.3, C.line, -1.9, 0, 1.6);
        cyl(g, 0.05, 0.05, 1.6, C.metalDark, -3.2, 0, 1.6, 8);
        box(g, 0.05, 0.5, 0.7, C.trim, -3.1, 1.4, 1.6);
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.02, 6, 16), mat('#e2643a'));
        rim.rotation.x = Math.PI / 2;
        rim.position.set(-2.92, 1.5, 1.6);
        g.add(rim);
    } else {
        tree(g, -2.6, 2.2, 0.9);
        tree(g, 2.7, -2.7, 1.0, C.leafDark);
    }

    // Cột cờ: lá cờ phấp phới bằng cách uốn các đỉnh lưới theo sóng sin
    const px = level >= 3 ? 3.15 : 2.6, pz = level >= 3 ? 3.0 : 2.8;
    cyl(g, 0.04, 0.05, 3.2, C.metal, px, 0, pz, 8);
    const flagGeo = new THREE.PlaneGeometry(0.9, 0.55, 8, 1);
    const base = Float32Array.from(flagGeo.attributes.position.array as Float32Array);
    const flag = dynamic(new THREE.Mesh(
        flagGeo,
        new THREE.MeshStandardMaterial({ color: '#e05a4f', side: THREE.DoubleSide, roughness: 0.8 })
    ));
    flag.position.set(px - 0.47, 2.85, pz);
    g.add(flag);
    anims.push((_dt, t) => {
        const p = flagGeo.attributes.position;
        for (let i = 0; i < p.count; i++) {
            const x = base[i * 3], k = (0.45 - x) / 0.9; // 0 ở cán cờ → 1 ở đuôi cờ
            p.setZ(i, Math.sin(t * 5 + x * 6) * 0.08 * k);
        }
        p.needsUpdate = true;
    });

    fence(g, -3.3, 3.25, -0.9, 3.25, C.metal);
    fence(g, 0.9, 3.25, 2.3, 3.25, C.metal);
    bush(g, -3.1, -2.9);
    bush(g, 3.1, 0.2, 1.2);

    return {
        group: bake(g),
        update: (dt, t) => anims.forEach((f) => f(dt, t)),
        door: { x: 0, z: doorZ }
    };
}
