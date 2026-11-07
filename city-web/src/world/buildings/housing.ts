// HOUSING (Nhà ở) — mặt trước hướng +z (ra phía đường z = 0).
// Level 1: nhà nhỏ mái đỏ · Level 2: hai nhà phố · Level 3: chung cư 5 tầng.
// Lối đi x = 0 phía trước luôn để trống: người dân đi thẳng từ vỉa hè vào cửa.
import * as THREE from 'three';
import { C } from '../../core/palette';
import { bake, box, cyl, gableRoof, rbox, windows } from '../../core/shapes';
import { type Built, bush, fence, flowerBed, tree } from './common';

export function buildHousing(level: number): Built {
  const g = new THREE.Group();
  let doorZ = 1.85;

  if (level <= 1) {
    // Nhà cấp 4: thân, mái dốc, ống khói, cửa, hai cửa sổ
    rbox(g, 3, 1.6, 2.4, C.wallCream, 0, 0, 0.6, 0.06);
    gableRoof(g, 3.4, 1.1, 2.9, C.roofRed, 0, 1.6, 0.6);
    box(g, 0.32, 0.7, 0.32, C.wallBrick, 0.9, 1.9, 0.2);
    box(g, 0.55, 0.95, 0.06, C.door, 0, 0, 1.82);
    windows(g, { face: '+z', wallW: 3, wallD: 2.4, cols: 2, rows: 1, y0: 0.55, floorH: 1, cz: 0.6, w: 0.5, h: 0.5 });
    windows(g, { face: '+x', wallW: 3, wallD: 2.4, cols: 1, rows: 1, y0: 0.55, floorH: 1, cz: 0.6 });
    box(g, 0.9, 0.08, 0.5, C.sidewalk, 0, 0, 2.1); // bậc thềm
    flowerBed(g, -1.1, 2.3, 0.9, 0.4);
    flowerBed(g, 1.1, 2.3, 0.9, 0.4, C.flowerYellow);
    tree(g, -2.6, -2.4, 1.1);
    bush(g, 2.5, -1.8);
  } else if (level === 2) {
    // Hai nhà phố cạnh nhau, khác màu, có ban công
    rbox(g, 2.3, 2.9, 2.6, C.wallPeach, -1.25, 0, 0.3, 0.06);
    box(g, 2.45, 0.16, 2.75, C.trim, -1.25, 2.9, 0.3); // gờ mái bằng
    box(g, 0.5, 0.9, 0.06, C.door, -1.0, 0, 1.63);
    windows(g, { face: '+z', wallW: 2.3, wallD: 2.6, cols: 2, rows: 2, y0: 0.5, floorH: 1.3, cx: -1.25, cz: 0.3 });
    box(g, 1.6, 0.08, 0.5, C.trim, -1.25, 1.5, 1.85); // ban công
    box(g, 1.6, 0.35, 0.04, C.metal, -1.25, 1.58, 2.08);

    rbox(g, 2.2, 3.3, 2.6, C.wallMint, 1.3, 0, 0.1, 0.06);
    gableRoof(g, 2.5, 1.0, 3.0, C.roofBlue, 1.3, 3.3, 0.1);
    box(g, 0.5, 0.9, 0.06, C.door, 1.05, 0, 1.43);
    windows(g, { face: '+z', wallW: 2.2, wallD: 2.6, cols: 2, rows: 2, y0: 0.5, floorH: 1.4, cx: 1.3, cz: 0.1 });
    windows(g, { face: '+x', wallW: 2.2, wallD: 2.6, cols: 2, rows: 2, y0: 0.5, floorH: 1.4, cx: 1.3, cz: 0.1 });
    // điều hoà, cây trên ban công
    box(g, 0.45, 0.3, 0.25, C.wallWhite, 1.8, 1.9, 1.5);
    flowerBed(g, -2.4, 2.4, 0.8, 0.4);
    flowerBed(g, 2.4, 2.4, 0.8, 0.4, C.flowerYellow);
    tree(g, -2.8, -2.6, 1.1, C.leafDark);
    doorZ = 1.5;
  } else {
    // Chung cư 5 tầng: lưới cửa sổ, sảnh có mái che, bể nước trên nóc
    const W = 5.2, H = 7.2, D = 3.4, cz = -0.4;
    rbox(g, W, H, D, C.wallSky, 0, 0, cz, 0.08);
    box(g, W + 0.2, 0.2, D + 0.2, C.trim, 0, H, cz);
    // tầng trệt: mảng tường đậm + mái hiên cửa hàng
    box(g, W + 0.04, 1.1, D + 0.04, C.wallCream, 0, 0, cz);
    box(g, 1.6, 0.1, 0.9, C.roofRed, -1.6, 1.1, cz + D / 2 + 0.4);
    box(g, 1.0, 1.0, 0.06, C.glass, -1.6, 0, cz + D / 2 + 0.01);
    box(g, 0.8, 1.0, 0.06, C.door, 0, 0, cz + D / 2 + 0.01);
    box(g, 1.4, 0.1, 0.8, C.trim, 0, 1.15, cz + D / 2 + 0.35); // mái sảnh
    for (const sx of [-0.6, 0.6]) box(g, 0.06, 1.15, 0.06, C.trim, sx, 0, cz + D / 2 + 0.7);
    windows(g, { face: '+z', wallW: W, wallD: D, cols: 4, rows: 5, y0: 1.5, floorH: 1.15, cz, w: 0.55, h: 0.6 });
    windows(g, { face: '+x', wallW: W, wallD: D, cols: 3, rows: 5, y0: 1.5, floorH: 1.15, cz, w: 0.5, h: 0.6 });
    // ban công nhô ra ở tầng 3 và 5
    for (const y of [3.35, 5.65]) for (const x of [-1.55, 1.55]) {
      box(g, 1.1, 0.07, 0.45, C.trim, x, y, cz + D / 2 + 0.22);
      box(g, 1.1, 0.3, 0.04, C.metal, x, y + 0.07, cz + D / 2 + 0.43);
    }
    // trên nóc: bể nước, cục nóng điều hoà
    cyl(g, 0.4, 0.4, 0.8, C.metal, -1.5, H + 0.2, cz - 0.5, 14);
    box(g, 0.5, 0.35, 0.4, C.wallWhite, 1.2, H + 0.2, cz);
    box(g, 0.5, 0.35, 0.4, C.wallWhite, 1.9, H + 0.2, cz);
    // sân trước: bồn hoa, hàng rào thấp, ghế nhỏ
    flowerBed(g, -2.4, 2.5, 1.0, 0.45);
    flowerBed(g, 2.4, 2.5, 1.0, 0.45, C.flowerYellow);
    tree(g, 3.0, -2.9, 0.9);
    doorZ = cz + D / 2 + 0.1;
  }
  // hàng rào trước nhà, chừa lối vào ở giữa
  fence(g, -3.3, 3.2, -0.7, 3.2);
  fence(g, 0.7, 3.2, 3.3, 3.2);
  // hòm thư
  box(g, 0.08, 0.6, 0.08, C.woodDark, 0.95, 0, 3.0);
  rbox(g, 0.28, 0.2, 0.36, C.roofRed, 0.95, 0.6, 3.0, 0.05);

  return { group: bake(g), door: { x: 0, z: doorZ } };
}
