// Lô đất trống cho công trình CHƯA XÂY (level 0 — khớp với user_buildings.current_level = 0).
// Dùng chung cho cả 4 công trình: nền đất, hàng rào, đống gạch và biển "COMING SOON" nhìn ra đường (+z).
import * as THREE from 'three';
import { C } from '../../core/palette';
import { bake, box, cyl } from '../../core/shapes';
import { type Built, fence, sign } from './common';

export function buildEmptyLot(): Built {
    const g = new THREE.Group();
    const H = 2.3; // nửa cạnh khu đất rào

    box(g, H * 2, 0.04, H * 2, C.soil, 0, 0, 0);
    // rào 4 phía, chừa một lối vào giữa mặt trước
    fence(g, -H, -H, H, -H);
    fence(g, -H, -H, -H, H);
    fence(g, H, -H, H, H);
    fence(g, -H, H, -0.6, H);
    fence(g, 0.6, H, H, H);

    // đống gạch và vài bao vật liệu chờ xây
    for (const [x, z, y] of [[-1, -0.8, 0], [-0.6, -0.8, 0], [-0.8, -0.8, 0.18]]) box(g, 0.36, 0.18, 0.22, '#c8664d', x, y, z);
    cyl(g, 0.22, 0.25, 0.3, '#e2d6bf', 0.9, 0, -1, 10);
    cyl(g, 0.22, 0.25, 0.3, '#e2d6bf', 1.3, 0, -0.7, 10);

    // biển trên hai cột
    for (const x of [-0.75, 0.75]) box(g, 0.07, 0.9, 0.07, C.metalDark, x, 0, 1.4);
    bake(g);
    const s = sign('COMING SOON', 1.7, 0.42, '#e0a030');
    s.position.set(0, 0.95, 1.44);
    g.add(s);

    return { group: g }; // không có cửa: người dân không "vào" được
}
