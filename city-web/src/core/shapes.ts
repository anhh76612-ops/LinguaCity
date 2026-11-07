// Các "viên gạch" để dựng thành phố bằng code: hộp, hộp bo góc, trụ, mái dốc…
// Ý tưởng: không dùng file mô hình nào; mọi công trình là tổ hợp các khối đơn giản.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/* ---------- Vật liệu dùng chung ----------
   Mỗi màu chỉ tạo MỘT vật liệu và dùng lại: tiết kiệm bộ nhớ GPU, và cho phép gộp
   (merge) các khối cùng màu thành một lần vẽ (draw call). */
const matCache = new Map<string, THREE.MeshStandardMaterial>();
export function mat(color: string, opts: { emissive?: string; rough?: number } = {}): THREE.MeshStandardMaterial {
  const key = `${color}|${opts.emissive ?? ''}|${opts.rough ?? ''}`;
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness: opts.rough ?? 0.85, metalness: 0 });
    if (opts.emissive) { m.emissive.set(opts.emissive); m.emissiveIntensity = 0.6; }
    matCache.set(key, m);
  }
  return m;
}

/** Đặt mesh: đổ bóng + nhận bóng, rồi thêm vào parent. y là ĐÁY của khối (dễ xếp chồng). */
function place(parent: THREE.Object3D, mesh: THREE.Mesh, x: number, y: number, z: number, h: number): THREE.Mesh {
  mesh.position.set(x, y + h / 2, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

/** Hộp vuông: rộng w (trục x), cao h, sâu d (trục z). */
export function box(parent: THREE.Object3D, w: number, h: number, d: number, color: string, x = 0, y = 0, z = 0): THREE.Mesh {
  return place(parent, new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color)), x, y, z, h);
}

/** Hộp bo góc: tạo cảm giác "đồ chơi" mềm mại. r là bán kính bo. */
export function rbox(parent: THREE.Object3D, w: number, h: number, d: number, color: string, x = 0, y = 0, z = 0, r = 0.08): THREE.Mesh {
  const g = new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2, h / 2, d / 2));
  return place(parent, new THREE.Mesh(g, mat(color)), x, y, z, h);
}

/** Trụ tròn (hoặc lăng trụ khi seg nhỏ). */
export function cyl(parent: THREE.Object3D, rTop: number, rBottom: number, h: number, color: string, x = 0, y = 0, z = 0, seg = 12): THREE.Mesh {
  return place(parent, new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, h, seg), mat(color)), x, y, z, h);
}

/** Khối cầu low-poly (dùng cho tán cây, bụi cây). */
export function ball(parent: THREE.Object3D, r: number, color: string, x = 0, y = 0, z = 0, detail = 1): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, detail), mat(color));
  m.position.set(x, y + r, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

/** Mái dốc hai bên (mái nhà truyền thống): tam giác đùn dài theo trục x. */
export function gableRoof(parent: THREE.Object3D, w: number, h: number, d: number, color: string, x = 0, y = 0, z = 0): THREE.Mesh {
  const s = new THREE.Shape();
  s.moveTo(-d / 2, 0);
  s.lineTo(d / 2, 0);
  s.lineTo(0, h);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: false });
  g.translate(0, 0, -w / 2);
  g.rotateY(Math.PI / 2); // đùn theo trục x thay vì z
  const m = new THREE.Mesh(g, mat(color));
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

/** Hàng cửa sổ trên một mặt tường. face: hướng mặt tường ('+z' là mặt trước). */
export function windows(
  parent: THREE.Object3D,
  opts: { face: '+z' | '-z' | '+x' | '-x'; wallW: number; wallD: number; cols: number; rows: number; y0: number; floorH: number; w?: number; h?: number; color?: string; cx?: number; cz?: number },
): void {
  const { face, wallW, wallD, cols, rows, y0, floorH } = opts;
  const w = opts.w ?? 0.42, h = opts.h ?? 0.5, color = opts.color ?? '#a9d6e5';
  const cx = opts.cx ?? 0, cz = opts.cz ?? 0;
  const span = face === '+z' || face === '-z' ? wallW : wallD;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const t = cols === 1 ? 0 : (c / (cols - 1) - 0.5) * (span - 0.9);
      const y = y0 + r * floorH;
      if (face === '+z') box(parent, w, h, 0.05, color, cx + t, y, cz + wallD / 2 + 0.01);
      else if (face === '-z') box(parent, w, h, 0.05, color, cx + t, y, cz - wallD / 2 - 0.01);
      else if (face === '+x') box(parent, 0.05, h, w, color, cx + wallW / 2 + 0.01, y, cz + t);
      else box(parent, 0.05, h, w, color, cx - wallW / 2 - 0.01, y, cz + t);
    }
  }
}

/* ---------- Gộp khối (bake) ----------
   Một ngôi nhà có thể gồm 40 khối = 40 lần vẽ. Gộp các khối CÙNG vật liệu thành một
   mesh duy nhất giảm còn vài lần vẽ: rất quan trọng trên điện thoại.
   Chỉ dùng cho phần tĩnh (không chuyển động riêng). */
export function bake(group: THREE.Group): THREE.Group {
  group.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const buckets = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const keep: THREE.Object3D[] = [];
  group.traverse((o) => {
    if (o === group) return;
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh || o.userData.dynamic || Array.isArray(mesh.material)) return;
    if (hasDynamicAncestor(o, group)) return;
    let g = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
    for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(name)) g.deleteAttribute(name);
    g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, mesh.matrixWorld));
    const list = buckets.get(mesh.material as THREE.Material) ?? [];
    list.push(g);
    buckets.set(mesh.material as THREE.Material, list);
    keep.push(o);
  });
  for (const o of keep) {
    o.removeFromParent();
    (o as THREE.Mesh).geometry.dispose();
  }
  for (const [m, list] of buckets) {
    const merged = mergeGeometries(list, false);
    list.forEach((g) => g.dispose());
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, m);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  // nhóm rỗng còn sót lại sau khi lấy hết con
  const empties: THREE.Object3D[] = [];
  group.traverse((o) => { if (o !== group && !(o as THREE.Mesh).isMesh && o.children.length === 0 && !o.userData.dynamic) empties.push(o); });
  empties.forEach((o) => o.removeFromParent());
  return group;
}
function hasDynamicAncestor(o: THREE.Object3D, root: THREE.Object3D): boolean {
  for (let p = o.parent; p && p !== root; p = p.parent) if (p.userData.dynamic) return true;
  return false;
}

/* ---------- Gộp khối KHÁC màu (vertex color) ----------
   bake() chỉ gộp được khối cùng vật liệu. Với nhân vật, mỗi khớp có vài mảnh khác màu
   (đầu da, tóc, má hồng…). Ta ghi màu vào từng đỉnh (vertex color) rồi gộp tất cả mảnh
   con TRỰC TIẾP của một khớp thành một mesh dùng chung một vật liệu trắng. */
const vcMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0 });
export function mergeColored(joint: THREE.Object3D, skip: (m: THREE.Mesh) => boolean = () => false): void {
  const parts = joint.children.filter((o): o is THREE.Mesh => (o as THREE.Mesh).isMesh && !skip(o as THREE.Mesh));
  if (parts.length < 2) return;
  const geos = parts.map((m) => {
    m.updateMatrix();
    const g = (m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()).applyMatrix4(m.matrix);
    for (const name of Object.keys(g.attributes)) if (!['position', 'normal'].includes(name)) g.deleteAttribute(name);
    const c = (m.material as THREE.MeshStandardMaterial).color, n = g.attributes.position.count;
    const colors = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) colors.set([c.r, c.g, c.b], i * 3);
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return g;
  });
  const merged = mergeGeometries(geos, false);
  geos.forEach((g) => g.dispose());
  if (!merged) return;
  parts.forEach((m) => m.removeFromParent());
  joint.add(new THREE.Mesh(merged, vcMat));
}

/** Giải phóng bộ nhớ GPU khi gỡ một nhóm khỏi cảnh (vật liệu dùng chung nên KHÔNG dispose). */
export function disposeGroup(group: THREE.Object3D): void {
  group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) m.geometry.dispose();
  });
  group.removeFromParent();
}

/** Bóng giả hình tròn dưới chân người/xe: rẻ hơn nhiều so với cập nhật shadow map mỗi khung hình. */
const blobGeo = new THREE.CircleGeometry(1, 20).rotateX(-Math.PI / 2);
const blobMat = new THREE.MeshBasicMaterial({ color: '#1e2a33', transparent: true, opacity: 0.22, depthWrite: false });
export function blobShadow(rx: number, rz = rx): THREE.Mesh {
  const m = new THREE.Mesh(blobGeo, blobMat);
  m.scale.set(rx, 1, rz);
  m.position.y = 0.012;
  m.renderOrder = 1;
  return m;
}

/** Số ngẫu nhiên có hạt giống: cùng seed → cùng kết quả (bản đồ không "nhảy" mỗi lần tải lại). */
export function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
