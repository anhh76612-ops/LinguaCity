// Công trường: hiện khi một công trình đang nâng cấp (upgrading = true).
// Giàn giáo bao quanh, cần cẩu quay chậm, móc cẩu đung đưa, rào chắn sọc.
import * as THREE from 'three';
import { C } from '../core/palette';
import { bake, box, mat } from '../core/shapes';
import { type Built, dynamic } from './buildings/common';

export function buildConstruction(height: number): Built {
    const g = new THREE.Group();
    const H = Math.max(2.5, height + 0.6), half = 2.9;

    // Giàn giáo: cột ở các góc và giữa cạnh, sàn thao tác mỗi 1.2 đơn vị
    for (const x of [-half, 0, half]) for (const z of [-half, half]) box(g, 0.07, H, 0.07, C.scaffold, x, 0, z);
    for (const z of [0]) for (const x of [-half, half]) box(g, 0.07, H, 0.07, C.scaffold, x, 0, z);
    for (let y = 1.2; y < H; y += 1.2) {
        for (const z of [-half, half]) box(g, half * 2, 0.06, 0.32, C.wood, 0, y, z);
        for (const x of [-half, half]) box(g, 0.32, 0.06, half * 2, C.wood, x, y, 0);
    }
    // Rào chắn sọc vàng trắng phía trước (chừa lối vào giữa)
    for (const x of [-2.2, -1.4, 1.4, 2.2]) {
        box(g, 0.75, 0.32, 0.06, C.busYellow, x, 0.12, 3.25);
        box(g, 0.25, 0.33, 0.07, C.trim, x, 0.12, 3.25);
    }

    // Cần cẩu tháp ở góc sau-trái
    const cx = -3.0, cz = -3.0, mastH = H + 1.3;
    box(g, 0.28, mastH, 0.28, C.crane, cx, 0, cz);
    for (let y = 0.5; y < mastH; y += 0.6) box(g, 0.3, 0.05, 0.3, C.metalDark, cx, y, cz);

    // Phần quay: cần dài + đối trọng + cabin + dây cáp và móc (đánh dấu dynamic để bake() không gộp)
    const top = dynamic(new THREE.Group());
    top.position.set(cx, mastH, cz);
    const jib = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.18, 0.18).translate(1.6, 0.1, 0), mat(C.crane));
    const weight = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.4).translate(-0.6, 0, 0), mat(C.metalDark));
    const cab = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.35).translate(0.15, -0.2, 0.25), mat(C.glass));
    const cable = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1, 0.02), mat(C.metalDark));
    const hook = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.3), mat(C.wood));
    [jib, weight, cab].forEach((m) => (m.castShadow = true));
    top.add(jib, weight, cab, cable, hook);
    g.add(top);

    const update = (_dt: number, t: number) => {
        top.rotation.y = Math.sin(t * 0.25) * 1.1 + 0.6;      // quay qua lại
        const drop = 0.6 + (Math.sin(t * 0.6) + 1) * 0.5;     // móc lên xuống (không chạm mái)
        const reach = 2.4 + Math.sin(t * 0.4) * 0.8;          // xe con chạy dọc cần
        cable.scale.y = drop;
        cable.position.set(reach, -drop / 2, 0);
        hook.position.set(reach, -drop - 0.1, 0);
    };
    update(0, 0);
    return { group: bake(g), update };
}
