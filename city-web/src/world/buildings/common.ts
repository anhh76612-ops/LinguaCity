// Chi tiết nhỏ dùng lại giữa các công trình: hàng rào, ghế, bồn hoa, cây, biển chữ.
import * as THREE from 'three';
import { C } from '../../core/palette';
import { ball, box, cyl, rbox } from '../../core/shapes';

/** Kết quả dựng một công trình.
 *  - group: mô hình, toạ độ cục bộ quanh tâm lô đất (0, 0), mặt đất ở y = 0.
 *  - update: hàm hoạt ảnh (cờ bay, kim đồng hồ quay…), nếu có.
 *  - door: nơi người dân "bước vào" công trình, nếu có. */
export interface Built {
  group: THREE.Group;
  update?: (dt: number, t: number) => void;
  door?: { x: number; z: number };
}

/** Đánh dấu một nhóm là "động": bake() sẽ bỏ qua để nó còn chuyển động được. */
export function dynamic<T extends THREE.Object3D>(o: T): T {
  o.userData.dynamic = true;
  return o;
}

/** Hàng rào gỗ thấp từ (x1, z1) đến (x2, z2), cột cách nhau ~0.5. */
export function fence(g: THREE.Object3D, x1: number, z1: number, x2: number, z2: number, color: string = C.trim): void {
  const len = Math.hypot(x2 - x1, z2 - z1), n = Math.max(1, Math.round(len / 0.5));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    box(g, 0.07, 0.42, 0.07, color, x1 + (x2 - x1) * t, 0, z1 + (z2 - z1) * t);
  }
  const rail = box(g, len, 0.06, 0.04, color, (x1 + x2) / 2, 0.28, (z1 + z2) / 2);
  rail.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
}

/** Ghế băng. face: góc quay, ghế "nhìn" về hướng +z cục bộ khi face = 0. */
export function bench(g: THREE.Object3D, x: number, z: number, face: number): void {
  const b = new THREE.Group();
  box(b, 1.0, 0.07, 0.36, C.wood, 0, 0.32, 0);
  box(b, 1.0, 0.3, 0.06, C.wood, 0, 0.42, -0.17);
  for (const sx of [-0.42, 0.42]) box(b, 0.06, 0.32, 0.32, C.metalDark, sx, 0, 0);
  b.position.set(x, 0, z);
  b.rotation.y = face;
  g.add(b);
}

/** Cây đơn lẻ (cho sân vườn trong lô). */
export function tree(g: THREE.Object3D, x: number, z: number, s = 1, color: string = C.leaf): void {
  cyl(g, 0.08 * s, 0.11 * s, 0.6 * s, C.trunk, x, 0, z, 6);
  ball(g, 0.55 * s, color, x, 0.5 * s, z);
  ball(g, 0.36 * s, color, x + 0.08 * s, 1.05 * s, z + 0.05 * s);
}

/** Bụi cây tròn nhỏ. */
export function bush(g: THREE.Object3D, x: number, z: number, s = 1): void {
  ball(g, 0.28 * s, C.leafDark, x, 0, z, 1);
}

/** Bồn hoa: viền gỗ, đất, vài bông hoa. */
export function flowerBed(g: THREE.Object3D, x: number, z: number, w: number, d: number, color: string = C.flowerPink): void {
  rbox(g, w, 0.18, d, C.wood, x, 0, z, 0.03);
  box(g, w - 0.12, 0.2, d - 0.12, C.soil, x, 0, z);
  const n = Math.max(2, Math.round((w * d) / 0.12));
  for (let i = 0; i < n; i++) {
    const fx = x + ((i * 0.618) % 1 - 0.5) * (w - 0.3), fz = z + ((i * 0.381 + 0.2) % 1 - 0.5) * (d - 0.3);
    ball(g, 0.07, i % 3 === 0 ? C.flowerYellow : color, fx, 0.2, fz, 0);
  }
}

/** Biển có chữ: vẽ chữ lên canvas 2D rồi dùng làm texture. Cách rẻ nhất để có chữ trong cảnh 3D. */
export function sign(text: string, w: number, h: number, bg: string, fg = '#ffffff'): THREE.Mesh {
  const cv = document.createElement('canvas');
  const px = 64;
  cv.width = Math.round(w * px * 2);
  cv.height = Math.round(h * px * 2);
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = fg;
  ctx.font = `bold ${Math.round(cv.height * 0.62)}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cv.width / 2, cv.height / 2 + 2);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }));
  return dynamic(m); // vật liệu riêng (có texture) → không gộp
}
