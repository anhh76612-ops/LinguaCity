// ROAD (Đường xá · Giao thông) gồm hai phần:
//  1) buildTransport(level): lô đất góc (+x, +z) — trạm chờ → nhà chờ xe buýt → bến xe.
//  2) buildStreets(level): mặt đường chung của cả thành phố — đường đất → đường nhựa có vạch → thêm
// đèn giao thông.
//     Kèm xe cộ chạy trên đường (số xe tăng theo level).
import * as THREE from 'three';
import { C } from '../../core/palette';
import { bake, blobShadow, box, cyl, rbox } from '../../core/shapes';
import { BLOCK_H, MAP_HALF, ROAD_HALF, WALK } from '../grid';
import { type Built, bench, bush, dynamic, sign, tree } from './common';

/* ---------- 1) Lô giao thông ----------
   Hai phía sát đường là -x và -z (cục bộ). Điểm chờ xe nằm sát vỉa hè phía -z. */
export const BUS_STOP = { x: 0, z: -2.7 };

export function buildTransport(level: number): Built {
    const g = new THREE.Group();
    if (level <= 1) {
        // bãi sỏi, cột biển gỗ, một ghế chờ
        box(g, 3.2, 0.02, 1.6, C.soil, 0, 0, -2.6);
        box(g, 0.08, 1.3, 0.08, C.woodDark, 1.5, 0, -2.9);
        const s = sign('BUS', 0.6, 0.3, '#a8784d');
        s.position.set(1.5, 1.15, -2.85);
        g.add(s);
        bench(g, 0, -2.3, Math.PI);
        tree(g, 2.4, 1.8, 1.1);
        tree(g, -1.2, 2.5, 0.9, C.leafDark);
        bush(g, 2.6, -0.6);
    } else {
        // Nhà chờ: mái, vách kính phía sau, ghế dài
        box(g, 3.4, 0.03, 1.7, C.plaza, 0, 0, -2.55);
        box(g, 2.6, 0.08, 1.1, C.roofBlue, 0, 1.6, -2.45);
        for (const x of [-1.2, 1.2]) {
            box(g, 0.07, 1.6, 0.07, C.metalDark, x, 0, -2.0);
        }
        box(g, 2.5, 1.2, 0.05, C.glass, 0, 0.35, -1.95);
        bench(g, 0, -2.3, Math.PI);
        // biển đặt trên mái, quay về +z: camera nhìn từ góc (+x, +z) nên mặt này luôn thấy được
        const s = sign('BUS STOP', 1.2, 0.26, '#2f6db3');
        s.position.set(0, 1.82, -1.92);
        g.add(s);

        if (level === 2) {
            // bãi đỗ xe: vạch kẻ + một xe đỗ
            box(g, 4.0, 0.02, 2.6, '#7b8390', 0.6, 0, 1.6);
            for (const x of [-1.0, 0.6, 2.2]) {
                box(g, 0.06, 0.03, 2.2, C.line, x, 0, 1.6);
            }
            const car = makeCar(C.carBlue);
            car.position.set(-0.2, 0, 1.6);
            g.add(car);
            tree(g, -2.6, -0.4, 1.0);
        } else {
            // Bến xe: nhà ga phía sau + mái vòm che sân đỗ + xe buýt đỗ
            rbox(g, 5.0, 2.4, 2.0, C.wallWhite, 0.4, 0, 2.2, 0.06);
            box(g, 5.3, 0.18, 2.3, C.roofBlue, 0.4, 2.4, 2.2);
            box(g, 4.2, 1.1, 0.05, C.glass, 0.4, 0.5, 1.19);
            box(g, 0.9, 1.3, 0.06, C.door, -1.4, 0, 1.2);
            const st = sign('BUS STATION', 2.4, 0.35, '#2f6db3');
            st.position.set(0.4, 1.8, 3.21); // mặt sau nhà ga, phía camera nhìn thấy
            g.add(st);
            // mái che sân đỗ (cột + tấm mái)
            box(g, 4.8, 0.1, 2.2, C.trim, 0.6, 2.3, -0.1);
            for (const x of [-1.6, 2.8]) {
                box(g, 0.1, 2.3, 0.1, C.metalDark, x, 0, -1.1);
            }
            const bus = makeBus();
            bus.rotation.y = Math.PI / 2;
            bus.position.set(0.6, 0, -0.1);
            g.add(bus);
            // ki-ốt bán vé
            rbox(g, 0.7, 1.0, 0.7, C.busYellow, -2.7, 0, 0.3, 0.05);
        }
    }
    return { group: bake(g) };
}

/* ---------- Xe ---------- (hướng đầu xe là +z cục bộ) */
export function makeCar(color: string): THREE.Group {
    const car = new THREE.Group();
    rbox(car, 0.85, 0.38, 1.55, color, 0, 0.12, 0, 0.12);
    rbox(car, 0.72, 0.32, 0.85, color, 0, 0.48, -0.1, 0.1);
    box(car, 0.74, 0.22, 0.7, C.glass, 0, 0.52, -0.1);
    for (const [x, z] of [[-0.4, 0.5], [0.4, 0.5], [-0.4, -0.5], [0.4, -0.5]]) {
        const w = cyl(car, 0.15, 0.15, 0.12, '#2d3138', x, 0, z, 10);
        w.rotation.z = Math.PI / 2;
        w.position.y = 0.15;
    }
    box(car, 0.12, 0.08, 0.04, '#fff6c8', -0.28, 0.3, 0.78);
    box(car, 0.12, 0.08, 0.04, '#fff6c8', 0.28, 0.3, 0.78);
    return bake(car); // gộp các mảnh cùng màu: ~10 → 4 lần vẽ
}

export function makeBus(): THREE.Group {
    const bus = new THREE.Group();
    rbox(bus, 1.1, 1.15, 3.0, C.busYellow, 0, 0.15, 0, 0.14);
    box(bus, 1.14, 0.38, 2.5, '#3b4654', 0, 0.75, -0.1); // dải cửa sổ
    box(bus, 1.0, 0.45, 0.05, C.glass, 0, 0.65, 1.5);
    box(bus, 1.14, 0.1, 3.0, C.trim, 0, 0.45, 0);
    for (const [x, z] of [[-0.5, 1.0], [0.5, 1.0], [-0.5, -1.0], [0.5, -1.0]]) {
        const w = cyl(bus, 0.2, 0.2, 0.14, '#2d3138', x, 0, z, 10);
        w.rotation.z = Math.PI / 2;
        w.position.y = 0.2;
    }
    return bake(bus);
}

/* ---------- 2) Mặt đường + đèn giao thông + xe chạy ---------- */
/** Một cột đèn giao thông: trục nó điều khiển và hai bóng đèn. */
interface TrafficLight {
    axis: 'x' | 'z';
    red: THREE.MeshStandardMaterial;
    green: THREE.MeshStandardMaterial;
}

export type PedestrianProvider = () => { x: number; z: number }[];

interface Vehicle {
    obj: THREE.Group;
    axis: 'x' | 'z';     // chạy dọc trục nào
    dir: 1 | -1;         // chiều chạy
    speed: number;
    len: number;         // chiều dài xe (để biết đầu xe ở đâu)
}

const BOX = ROAD_HALF + 0.35; // vùng giao lộ (có tính thêm vạch dừng)

export function buildStreets(level: number, pedestrians: PedestrianProvider): Built {
    const g = new THREE.Group();
    const anims: ((dt: number, t: number) => void)[] = [];
    const L = MAP_HALF * 2, W = ROAD_HALF * 2, y = 0.004;

    // Hai dải đường cắt nhau. Phần giao nhau trùng màu nên không thấy chỗ chồng.
    const surface = level <= 1 ? C.roadDirt : C.road;
    box(g, W, y, L, surface, 0, 0, 0);
    box(g, L, y, W, surface, 0, 0, 0);

    if (level >= 2) {
        // vạch giữa đứt quãng (bỏ qua giao lộ)
        for (let t = WALK + 0.8; t < MAP_HALF - 0.3; t += 1.1) {
            for (const s of [-1, 1]) {
                box(g, 0.1, 0.012, 0.55, C.line, 0, 0, s * t);
                box(g, 0.55, 0.012, 0.1, C.line, s * t, 0, 0);
            }
        }
        // vạch qua đường (zebra) ở đúng chỗ người dân băng qua: tâm vỉa hè trong (|t| = 2.5)
        for (const s of [-1, 1]) {
            for (let k = -1.7; k <= 1.71; k += 0.42) {
                box(g, 0.24, 0.012, 0.85, C.line, k, 0, s * WALK);   // băng qua đường dọc (trục z)
                // băng qua đường ngang (trục x)
                box(g, 0.85, 0.012, 0.24, C.line, s * WALK, 0, k);
            }
        }
    }

    // Đèn giao thông (level 3): đường dọc và đường ngang luân phiên xanh/đỏ mỗi 6 giây
    let greenAxis: 'x' | 'z' | null = null;
    if (level >= 3) {
        const lights: TrafficLight[] = [];
        const corners: [
            number, number, 'x' | 'z'
        ][] = [[2.15, 2.15, 'z'], [-2.15, -2.15, 'z'], [2.15, -2.15, 'x'], [-2.15, 2.15, 'x']];
        for (const [x, z, axis] of corners) {
            const pole = new THREE.Group();
            cyl(pole, 0.04, 0.05, 1.6, C.metalDark, 0, 0, 0, 6);
            box(pole, 0.22, 0.5, 0.18, '#2d3138', 0, 1.45, 0);
            const red = new THREE.MeshStandardMaterial({
                color: '#5a2222', emissive: '#ff3b30', emissiveIntensity: 0
            });
            const green = new THREE.MeshStandardMaterial({
                color: '#1f4a2a', emissive: '#34c759', emissiveIntensity: 0
            });
            const rl = new THREE.Mesh(
                new THREE.SphereGeometry(0.07, 8, 6),
                red
            ), gl = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), green);
            rl.position.set(0, 1.82, 0.1);
            gl.position.set(0, 1.58, 0.1);
            pole.add(dynamic(rl), dynamic(gl));
            pole.position.set(x, BLOCK_H, z);
            // quay mặt đèn về phía dòng xe nó điều khiển
            pole.rotation.y = axis === 'z' ? (z > 0 ? 0 : Math.PI) : x > 0 ? Math.PI / 2
                : -Math.PI / 2;
            g.add(pole);
            lights.push({ axis, red, green });
        }
        anims.push((_dt, t) => {
            greenAxis = Math.floor(t / 6) % 2 === 0 ? 'z' : 'x';
            for (const l of lights) {
                const go = l.axis === greenAxis;
                l.green.emissiveIntensity = go ? 1.6 : 0;
                l.red.emissiveIntensity = go ? 0 : 1.6;
            }
        });
    }

    /* Xe chạy bên phải đường. Hướng +z dùng làn x = -1, hướng -x dùng làn z = -1,
       hướng +x dùng làn z = +1. */
    const vehicles: Vehicle[] = [];
    const addVehicle = (
        obj: THREE.Group, axis: 'x' | 'z', dir: 1 | -1, lane: number, start: number, speed: number,
        len: number
    ) => {
        const v = dynamic(new THREE.Group());
        v.add(obj, blobShadow(len * 0.36, len * 0.62));
        obj.children.forEach((c) => (c.castShadow = false)); // bóng thật tắt, dùng bóng giả
        if (axis === 'z') {
            v.position.set(lane, 0, start);
        } else {
            v.position.set(start, 0, lane);
        }
        v.rotation.y = axis === 'z' ? (dir > 0 ? 0 : Math.PI) : dir > 0 ? Math.PI / 2
            : -Math.PI / 2;
        g.add(v);
        vehicles.push({ obj: v, axis, dir, speed, len });
    };
    if (level >= 2) {
        addVehicle(makeCar(C.carRed), 'z', 1, -1, -8, 2.4, 1.6);
        addVehicle(makeCar(C.carBlue), 'x', -1, -1, 6, 2.1, 1.6);
    }
    if (level >= 3) {
        addVehicle(makeBus(), 'x', 1, 1, -9, 1.6, 3.0);
    }

    const inBox = (x: number, z: number) => Math.abs(x) < BOX && Math.abs(z) < BOX;
    anims.push((dt) => {
        const peds = vehicles.length ? pedestrians() : [];
        for (const v of vehicles) {
            const p = v.obj.position;
            const along = v.axis === 'z' ? p.z : p.x;
            const nose = along + v.dir * (v.len / 2 + 0.7); // điểm ngay trước đầu xe
            const nx = v.axis === 'x' ? nose : p.x, nz = v.axis === 'z' ? nose : p.z;
            const insideNow = inBox(p.x, p.z);

            let stop = false;
            // 1) nhường người đi bộ đang ở dưới lòng đường, ngay trước mũi xe
            for (const h of peds) {
                if (Math.hypot(h.x - nx, h.z - nz) < 1.0) {
                    stop = true;
                    break;
                }
            }
            // 2) sắp vào giao lộ: đèn đỏ, hoặc xe khác đang ở trong giao lộ → chờ
            if (!stop && !insideNow && inBox(nx, nz)) {
                if (greenAxis && greenAxis !== v.axis) {
                    stop = true;
                } else if (vehicles.some((o) => o !== v
                    && inBox(o.obj.position.x, o.obj.position.z))) {
                    stop = true;
                }
            }
            if (!stop) {
                const next = along + v.dir * v.speed * dt;
                // ra khỏi mép bản đồ thì quay lại từ mép bên kia
                const wrapped = Math.abs(next) > MAP_HALF + 1.5 ? -v.dir * (MAP_HALF + 1.5) : next;
                if (v.axis === 'z') {
                    p.z = wrapped;
                } else {
                    p.x = wrapped;
                }
            }
            // ẩn khi xe "rời" bản đồ để không lơ lửng ngoài mép đế
            v.obj.visible = Math.abs(v.axis === 'z' ? p.z : p.x) < MAP_HALF - v.len / 2 + 0.3;
        }
    });

    return { group: bake(g), update: (dt, t) => anims.forEach((f) => f(dt, t)) };
}
