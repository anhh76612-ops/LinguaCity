// Nội thất 3D của Housing (M7): một căn phòng TRỐNG (đồ nội thất để sau — future-expansion §5).
// Nhìn chéo từ góc (+x, +z) giống bản đồ nên chỉ dựng đủ hai bức tường phía sau (-z) và bên trái (-x);
// hai phía gần camera chỉ có chân tường thấp ("cắt mặt cắt" kiểu nhà búp bê) để nhìn được vào trong.
//
//   z = -D/2  ┌──── tường sau (cửa sổ) ────┐
//             │                             │
//   tường trái│          sàn W × D          │  chân tường thấp
//             │                             │
//   z = +D/2  └──── chân tường ── CỬA ──────┘   cửa ở giữa cạnh +z, người chơi bước vào từ đây
import * as THREE from 'three';
import { C } from '../../core/palette';
import { bake, box, rbox } from '../../core/shapes';
import type { FloorKey, HouseStyle } from '../../bridge/cityState';

export const ROOM_W = 7;      // theo trục x
export const ROOM_D = 5.5;    // theo trục z
export const WALL_H = 2.6;
const WALL_T = 0.18;          // độ dày tường
const LOW_H = 0.35;           // chân tường phía gần camera

/** Vị trí cửa (trong phòng, sát mép +z) và vùng người chơi đi lại được. */
export const DOOR = { x: 0, z: ROOM_D / 2 - 0.35 };
export const WALKABLE = { minX: -ROOM_W / 2 + 0.45, maxX: ROOM_W / 2 - 0.45, minZ: -ROOM_D / 2 + 0.45, maxZ: ROOM_D / 2 - 0.35 };

/** Bảng màu từng kiểu sàn: [màu chính, màu phụ]. */
const FLOOR_COLORS: Record<FloorKey, [string, string]> = {
    oak: ['#d9b07c', '#cfa36d'],
    walnut: ['#8a5f3e', '#7a5234'],
    tile: ['#eef1f2', '#dfe5e8'],
    checker: ['#f4f1e8', '#3f4a5a'],
    carpet: ['#c46f7a', '#e7c2a0'],
};

/** Dựng sàn theo kiểu. Mỗi kiểu chỉ dùng 2 màu nên sau bake() còn đúng 2 lần vẽ. */
function floor(g: THREE.Group, key: FloorKey): void {
    const [a, b] = FLOOR_COLORS[key];
    const T = 0.08;
    if (key === 'oak' || key === 'walnut') {
        // ván gỗ chạy dọc trục x, so le hai tông
        const n = 11, w = ROOM_D / n;
        for (let i = 0; i < n; i++) box(g, ROOM_W, T, w - 0.01, i % 2 ? a : b, 0, -T, -ROOM_D / 2 + w * (i + 0.5));
    } else if (key === 'tile' || key === 'checker') {
        const s = key === 'tile' ? 0.7 : 0.55;
        const nx = Math.ceil(ROOM_W / s), nz = Math.ceil(ROOM_D / s);
        const sx = ROOM_W / nx, sz = ROOM_D / nz;
        for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) {
            const gap = key === 'tile' ? 0.03 : 0;
            box(g, sx - gap, T, sz - gap, (i + j) % 2 ? a : b, -ROOM_W / 2 + sx * (i + 0.5), -T, -ROOM_D / 2 + sz * (j + 0.5));
        }
        if (key === 'tile') box(g, ROOM_W, T * 0.9, ROOM_D, '#b7c0c6', 0, -T, 0); // vữa ron
    } else {
        // thảm: nền sàn gỗ + tấm thảm lớn có viền
        box(g, ROOM_W, T, ROOM_D, '#cfa36d', 0, -T, 0);
        box(g, ROOM_W - 1.6, 0.02, ROOM_D - 1.6, b, 0, 0, 0);
        box(g, ROOM_W - 2.0, 0.025, ROOM_D - 2.0, a, 0, 0, 0);
    }
}

// vật liệu riêng (phát sáng / trong suốt) tạo một lần, dùng lại mỗi lần dựng lại phòng
const SHADE_MAT = new THREE.MeshStandardMaterial({ color: '#fff3c4', emissive: '#ffd77a', emissiveIntensity: 0.7, side: THREE.DoubleSide });
const GLOW_MAT = new THREE.MeshBasicMaterial({ color: '#fff6d8', transparent: true, opacity: 0.28, depthWrite: false });

export interface Interior {
    group: THREE.Group;
}

export function buildHouseInterior(style: HouseStyle): Interior {
    const g = new THREE.Group();
    const W = ROOM_W, D = ROOM_D, wall = style.wall;

    floor(g, style.floor);

    // nền đất ngoài phòng (để mép tường không lơ lửng)
    box(g, W + 3, 0.1, D + 3, '#b6d79c', 0, -0.2, 0);

    // tường sau (-z) có ô cửa sổ: dựng bằng 4 mảnh quanh lỗ cửa sổ
    const backZ = -D / 2 - WALL_T / 2, winW = 1.8, winH = 1.1, winY = 0.95;
    box(g, (W - winW) / 2 + WALL_T, WALL_H, WALL_T, wall, -(W + winW) / 4 - WALL_T / 2, 0, backZ);
    box(g, (W - winW) / 2 + WALL_T, WALL_H, WALL_T, wall, (W + winW) / 4 + WALL_T / 2, 0, backZ);
    box(g, winW, winY, WALL_T, wall, 0, 0, backZ);
    box(g, winW, WALL_H - winY - winH, WALL_T, wall, 0, winY + winH, backZ);
    // khung + kính + bậu cửa sổ
    box(g, winW, winH, 0.04, C.glass, 0, winY, backZ);
    box(g, winW + 0.16, 0.08, 0.3, C.trim, 0, winY - 0.08, backZ + 0.12);
    box(g, 0.06, winH, 0.08, C.trim, 0, winY, backZ + 0.03);
    box(g, winW, 0.06, 0.08, C.trim, 0, winY + winH / 2 - 0.03, backZ + 0.03);

    // tường trái (-x): một ô cửa sổ nhỏ hơn bằng kính dán lên mặt tường
    const leftX = -W / 2 - WALL_T / 2;
    box(g, WALL_T, WALL_H, D + WALL_T * 2, wall, leftX, 0, 0);
    box(g, 0.04, 0.9, 1.2, C.glass, leftX + WALL_T / 2 + 0.01, 1.0, -0.4);
    box(g, 0.06, 0.06, 1.3, C.trim, leftX + WALL_T / 2 + 0.03, 1.9, -0.4);
    box(g, 0.06, 0.06, 1.3, C.trim, leftX + WALL_T / 2 + 0.03, 0.97, -0.4);

    // chân tường thấp ở phía gần camera (+x và +z), chừa lối cửa ở giữa cạnh +z
    const frontZ = D / 2 + WALL_T / 2, doorW = 1.2;
    box(g, WALL_T, LOW_H, D + WALL_T * 2, wall, W / 2 + WALL_T / 2, 0, 0);
    box(g, (W - doorW) / 2, LOW_H, WALL_T, wall, -(W + doorW) / 4, 0, frontZ);
    box(g, (W - doorW) / 2, LOW_H, WALL_T, wall, (W + doorW) / 4, 0, frontZ);
    // ngưỡng cửa + thảm chùi chân
    box(g, doorW, 0.03, WALL_T + 0.1, C.woodDark, 0, 0, frontZ);
    rbox(g, 1.0, 0.03, 0.55, '#7f9c6b', 0, 0, D / 2 - 0.4, 0.02);

    // len chân tường (viền trắng) chạy dọc hai tường cao
    box(g, W, 0.12, 0.04, C.trim, 0, 0, -D / 2 + 0.02);
    box(g, 0.04, 0.12, D, C.trim, -W / 2 + 0.02, 0, 0);

    // đèn trần: sợi dây + chao đèn phát sáng nhẹ (không đổ bóng để rẻ)
    box(g, 0.02, 0.5, 0.02, C.metalDark, 0, WALL_H - 0.3, -0.3);
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.22, 12, 1, true), SHADE_MAT);
    shade.position.set(0, WALL_H - 0.4, -0.3);
    shade.userData.dynamic = true; // vật liệu riêng → không gộp
    g.add(shade);

    // ô sáng hắt từ cửa sổ xuống sàn
    const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(1.8, 1.4).rotateX(-Math.PI / 2),
        GLOW_MAT,
    );
    glow.position.set(0.3, 0.012, -D / 2 + 1.0);
    glow.userData.dynamic = true;
    g.add(glow);

    return { group: bake(g) };
}
