// Phần nền tĩnh: "đế" diorama, bốn khối nhà nâng cao có vỉa hè, dải cỏ viền ngoài.
// Mặt đường thay đổi theo level của ROAD nên nằm riêng ở buildings/road.ts.
import * as THREE from 'three';
import { C } from '../core/palette';
import { bake, box, mat } from '../core/shapes';
import { BLOCK_H, BLOCK_IN, BLOCK_OUT, LOT_C, LOT_SIZE, MAP_HALF } from './grid';

export function buildGround(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'ground';

    /* Đế diorama: một hộp dày, mặt trên màu cỏ, các mặt bên màu đất.
         BoxGeometry nhận mảng 6 vật liệu theo thứ tự: +x, -x, +y, -y, +z, -z. */
    const size = MAP_HALF * 2, depth = 1.6;
    const side = mat(C.dirt), top = mat(C.grass), bottom = mat(C.dirtDark);
    const base = new THREE.Mesh(new THREE.BoxGeometry(size, depth, size), [side, side, top, bottom, side, side]);
    base.position.y = -depth / 2;
    base.receiveShadow = true;
    g.add(base);
    // một viền cỏ đậm mỏng ngay dưới mặt trên cho đế trông "dày" hơn
    const rim = new THREE.Mesh(new THREE.BoxGeometry(size + 0.02, 0.18, size + 0.02), mat(C.grassDark));
    rim.position.y = -0.09;
    g.add(rim);

    const slabs = new THREE.Group();
    const span = BLOCK_OUT - BLOCK_IN, mid = (BLOCK_IN + BLOCK_OUT) / 2;
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        // khối nhà: cả khối là vỉa hè…
        box(slabs, span, BLOCK_H, span, C.sidewalk, sx * mid, 0, sz * mid);
        // …lô đất bên trong phủ cỏ, cao hơn vỉa hè 1 cm để không bị "nhấp nháy" (z-fighting)
        box(slabs, LOT_SIZE, BLOCK_H + 0.01, LOT_SIZE, C.grass, sx * LOT_C, 0, sz * LOT_C);
        // viền bó vỉa (curb) hai cạnh sát đường
        box(slabs, span, BLOCK_H + 0.02, 0.12, C.curb, sx * mid, 0, sz * (BLOCK_IN + 0.06));
        box(slabs, 0.12, BLOCK_H + 0.02, span, C.curb, sx * (BLOCK_IN + 0.06), 0, sz * mid);
    }
    g.add(bake(slabs));
    return g;
}
