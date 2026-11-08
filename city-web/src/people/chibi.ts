// Nhân vật chibi dựng hoàn toàn bằng code: đầu to (≈ 1/2 chiều cao), thân ngắn, tay chân tròn.
// Các bộ phận nối theo cây cha–con giống bộ xương: xoay "hông" thì cả đùi, gối, giày đi theo.
//
//   root (đặt trên mặt đất, xoay theo hướng đi)
//    └ hips (nâng/hạ khi nhún, ngả khi đọc sách)
//       ├ torso, pants
//       ├ head ─ mặt, tóc, mắt
//       ├ armL / armR (khớp vai) ─ cánh tay, bàn tay
//       ├ legL / legR (khớp hông) ─ đùi ─ kneeL / kneeR (khớp gối) ─ cẳng chân, giày
//       └ book (chỉ hiện khi đọc)
import * as THREE from 'three';
import { HAIR, PANTS, SHIRT, SKIN } from '../core/palette';
import { blobShadow, mat, mergeColored } from '../core/shapes';

export const HIP_Y = 0.28; // chiều cao khớp hông khi đứng

export type HairStyle = 'short' | 'long' | 'bun' | 'cap' | 'spiky';
export type Accessory = 'none' | 'hat' | 'glasses';
export interface Look { skin: string; hair: string; shirt: string; pants: string; style: HairStyle; bag: boolean; accessory?: Accessory }

export interface Rig {
  root: THREE.Group;
  hips: THREE.Group;
  head: THREE.Group;
  armL: THREE.Group; armR: THREE.Group;
  legL: THREE.Group; legR: THREE.Group;
  kneeL: THREE.Group; kneeR: THREE.Group;
  eyes: THREE.Mesh[];
  book: THREE.Object3D;
}

const pick = <T>(a: readonly T[], r: () => number): T => a[Math.floor(r() * a.length)];

export function randomLook(r: () => number = Math.random): Look {
  return {
    skin: pick(SKIN, r), hair: pick(HAIR, r), shirt: pick(SHIRT, r), pants: pick(PANTS, r),
    style: pick(['short', 'long', 'bun', 'cap'] as const, r), bag: r() < 0.35,
  };
}

// Hình học dùng chung cho mọi nhân vật (chỉ tạo một lần)
const G = {
  head: new THREE.SphereGeometry(0.2, 20, 14),
  hairCap: new THREE.SphereGeometry(0.215, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.55),
  eye: new THREE.SphereGeometry(0.026, 8, 6),
  cheek: new THREE.SphereGeometry(0.03, 8, 6),
  torso: new THREE.CapsuleGeometry(0.13, 0.12, 4, 12),
  limb: new THREE.CapsuleGeometry(0.045, 0.1, 4, 8),
  hand: new THREE.SphereGeometry(0.048, 8, 6),
  shoe: new THREE.BoxGeometry(0.09, 0.05, 0.14),
  bun: new THREE.SphereGeometry(0.08, 10, 8),
  bag: new THREE.BoxGeometry(0.2, 0.2, 0.09),
  brim: new THREE.CylinderGeometry(0.16, 0.16, 0.02, 14),
  book: new THREE.BoxGeometry(0.2, 0.14, 0.03),
  spike: new THREE.ConeGeometry(0.055, 0.13, 5),
  hatCrown: new THREE.CylinderGeometry(0.16, 0.19, 0.13, 14),
  hatBrim: new THREE.CylinderGeometry(0.29, 0.29, 0.02, 18),
  lens: new THREE.TorusGeometry(0.045, 0.009, 6, 14),
  bridge: new THREE.BoxGeometry(0.05, 0.012, 0.012),
};

function part(parent: THREE.Object3D, geo: THREE.BufferGeometry, color: string, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat(color));
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

function limb(parent: THREE.Group, x: number, y: number, color: string, skin: string, isLeg: boolean, pants: string): { joint: THREE.Group; knee?: THREE.Group } {
  const joint = new THREE.Group();
  joint.position.set(x, y, 0);
  parent.add(joint);
  if (!isLeg) {
    part(joint, G.limb, color, 0, -0.09, 0);       // tay áo
    part(joint, G.hand, skin, 0, -0.2, 0);         // bàn tay
    return { joint };
  }
  part(joint, G.limb, pants, 0, -0.07, 0);         // đùi
  const knee = new THREE.Group();
  knee.position.y = -0.13;
  joint.add(knee);
  part(knee, G.limb, pants, 0, -0.06, 0);          // cẳng chân
  part(knee, G.shoe, '#3a3f47', 0, -0.13, 0.02);   // giày
  return { joint, knee };
}

export function makeChibi(look: Look): Rig {
  const root = new THREE.Group();
  root.add(blobShadow(0.22));

  const hips = new THREE.Group();
  hips.position.y = HIP_Y;
  root.add(hips);

  // thân + quần
  part(hips, G.torso, look.shirt, 0, 0.16, 0).scale.set(1, 1, 0.78);
  part(hips, G.torso, look.pants, 0, 0.05, 0).scale.set(1.02, 0.45, 0.8);
  if (look.bag) part(hips, G.bag, '#8d6e63', 0, 0.2, -0.12);

  // đầu
  const head = new THREE.Group();
  head.position.y = 0.33;
  hips.add(head);
  part(head, G.head, look.skin, 0, 0.18, 0);
  const cap = part(head, G.hairCap, look.style === 'cap' ? '#e05a4f' : look.hair, 0, 0.19, -0.012);
  cap.rotation.x = -0.25; // tóc lệch về phía sau, để lộ trán
  if (look.style === 'long') part(head, new THREE.BoxGeometry(0.36, 0.26, 0.12), look.hair, 0, 0.1, -0.12);
  if (look.style === 'bun') part(head, G.bun, look.hair, 0, 0.38, -0.08);
  if (look.style === 'cap') { const b = part(head, G.brim, '#e05a4f', 0, 0.27, 0.1); b.scale.set(1, 1, 0.8); }
  if (look.style === 'spiky') {
    // tóc dựng: vài chóp nón nghiêng ra ngoài quanh đỉnh đầu
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const s = part(head, G.spike, look.hair, Math.sin(a) * 0.09, 0.37, Math.cos(a) * 0.08 - 0.03);
      s.rotation.set(Math.cos(a) * 0.55, 0, -Math.sin(a) * 0.55);
    }
    part(head, G.spike, look.hair, 0, 0.42, -0.02);
  }
  if (look.accessory === 'hat') {
    part(head, G.hatCrown, '#3f4a5a', 0, 0.38, -0.01);
    part(head, G.hatBrim, '#3f4a5a', 0, 0.32, 0);
    part(head, G.bridge, '#f4b740', 0, 0.35, 0.17).scale.set(5.5, 3, 1); // dải băng mũ
  }
  if (look.accessory === 'glasses') {
    for (const sx of [-0.07, 0.07]) part(head, G.lens, '#2b2522', sx, 0.17, 0.195);
    part(head, G.bridge, '#2b2522', 0, 0.175, 0.2);
  }
  const eyes = [part(head, G.eye, '#2b2522', -0.07, 0.17, 0.18), part(head, G.eye, '#2b2522', 0.07, 0.17, 0.18)];
  part(head, G.cheek, '#f4a3a3', -0.12, 0.11, 0.16).scale.set(1, 0.6, 0.5);
  part(head, G.cheek, '#f4a3a3', 0.12, 0.11, 0.16).scale.set(1, 0.6, 0.5);

  // tay (khớp vai) và chân (khớp hông). Nhân vật nhìn về +z nên bên TRÁI là +x.
  const armL = limb(hips, 0.17, 0.25, look.shirt, look.skin, false, look.pants).joint;
  const armR = limb(hips, -0.17, 0.25, look.shirt, look.skin, false, look.pants).joint;
  const l = limb(hips, 0.07, 0.0, look.shirt, look.skin, true, look.pants);
  const r = limb(hips, -0.07, 0.0, look.shirt, look.skin, true, look.pants);

  // cuốn sách (ẩn), cầm trước ngực khi đọc
  const book = part(hips, G.book, '#4a7bd0', 0, 0.2, 0.2);
  book.rotation.x = -0.5;
  book.visible = false;

  // Tối ưu: gộp các mảnh của từng khớp thành 1 mesh (≈ 21 → 10 lần vẽ mỗi người).
  // Giữ riêng mắt (để chớp) và cuốn sách (để ẩn/hiện).
  const keep = (m: THREE.Mesh) => eyes.includes(m) || m === book;
  for (const j of [hips, head, armL, armR, l.joint, r.joint, l.knee!, r.knee!]) mergeColored(j, keep);

  return { root, hips, head, armL, armR, legL: l.joint, legR: r.joint, kneeL: l.knee!, kneeR: r.knee!, eyes, book };
}
