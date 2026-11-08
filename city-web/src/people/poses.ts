// Hoạt ảnh bằng công thức: không có file animation nào. Mỗi khung hình ta TÍNH góc từng khớp
// từ thời gian bằng sin/cos, rồi nội suy mượt từ tư thế cũ sang tư thế mới.
//
// Quy ước góc (radian):
//  - leg/arm (xoay quanh trục x): số ÂM = vung ra TRƯỚC, số dương = ra sau.
//  - knee: số dương = gập gối (cẳng chân ra sau).
//  - out: dang tay sang ngang (0 = buông thõng, ~2.7 = giơ thẳng lên).
import type { Rig } from './chibi';
import { HIP_Y } from './chibi';

export type Anim = 'idle' | 'walk' | 'sit' | 'read' | 'wave' | 'celebrate' | 'talk';

export interface Pose {
    legL: number; legR: number; kneeL: number; kneeR: number;
    armL: number; armR: number; outL: number; outR: number;
    bob: number;    // nâng/hạ hông
    lean: number;   // ngả người ra trước
    nod: number;    // cúi đầu
    turn: number;   // quay đầu sang bên
    book: boolean;
}

export const restPose = (): Pose => ({ legL: 0, legR: 0, kneeL: 0, kneeR: 0, armL: 0, armR: 0, outL: 0.08, outR: 0.08, bob: 0, lean: 0, nod: 0, turn: 0, book: false });

/** Tính tư thế đích của một hoạt ảnh tại thời điểm t. ph: pha bước chân (tăng theo quãng đường đi). */
export function poseFor(anim: Anim, t: number, ph: number, look: number): Pose {
    const p = restPose();
    p.turn = look;
    switch (anim) {
        case 'walk': {
            const s = Math.sin(ph);
            p.legL = s * 0.6; p.legR = -s * 0.6;                       // hai chân đánh ngược nhau
            p.kneeL = Math.max(0, s) * 0.7; p.kneeR = Math.max(0, -s) * 0.7; // gối chỉ gập khi chân ra sau
            p.armL = -s * 0.55; p.armR = s * 0.55;                     // tay vung ngược chân cùng bên
            p.bob = Math.abs(Math.cos(ph)) * 0.025;                    // nhún nhẹ mỗi bước
            p.lean = 0.06;
            p.turn = 0;
            break;
        }
        case 'idle':
            p.bob = Math.sin(t * 2) * 0.006;                          // thở
            p.armL = Math.sin(t * 2) * 0.04; p.armR = -p.armL;
            break;
        case 'sit':
            p.legL = p.legR = -1.45; p.kneeL = p.kneeR = 1.35;         // đùi nằm ngang, cẳng chân buông
            p.kneeL += Math.sin(t * 3) * 0.15; p.kneeR -= Math.sin(t * 3) * 0.15; // đung đưa chân
            p.bob = 0.19;                                              // hông lên ngang mặt ghế
            p.armL = p.armR = -0.35;
            break;
        case 'read':
            p.armL = p.armR = -1.05; p.outL = p.outR = -0.25;          // hai tay đưa ra trước, khép vào
            p.nod = 0.28 + Math.sin(t * 0.7) * 0.04;
            p.book = true;
            break;
        case 'wave':
            p.outR = 2.5 + Math.sin(t * 9) * 0.35;                     // tay phải vẫy
            p.armR = -0.2;
            p.turn = 0;
            break;
        case 'celebrate': {
            const j = Math.abs(Math.sin(t * 6));
            p.outL = p.outR = 2.6;
            p.bob = j * 0.12;
            p.kneeL = p.kneeR = (1 - j) * 0.4;
            p.legL = p.legR = -(1 - j) * 0.2;
            break;
        }
        case 'talk':
            p.armR = -0.6 + Math.sin(t * 4) * 0.25; p.outR = 0.3 + Math.sin(t * 3) * 0.2;
            p.nod = Math.sin(t * 5) * 0.06;
            break;
    }
    return p;
}

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/** Áp tư thế lên khung xương, nội suy để chuyển động không giật khi đổi hoạt ảnh. */
export function applyPose(rig: Rig, cur: Pose, target: Pose, dt: number, sitting: boolean): void {
    const k = Math.min(1, dt * (sitting ? 8 : 14));
    for (const key of Object.keys(target) as (keyof Pose)[]) {
        if (key === 'book') continue;
        (cur[key] as number) = lerp(cur[key] as number, target[key] as number, k);
    }
    cur.book = target.book;
    rig.legL.rotation.x = cur.legL; rig.legR.rotation.x = cur.legR;
    rig.kneeL.rotation.x = cur.kneeL; rig.kneeR.rotation.x = cur.kneeR;
    rig.armL.rotation.x = cur.armL; rig.armR.rotation.x = cur.armR;
    rig.armL.rotation.z = cur.outL; rig.armR.rotation.z = -cur.outR; // tay trái dang ra +x, tay phải ra -x
    rig.hips.position.y = HIP_Y + cur.bob;
    rig.hips.rotation.x = cur.lean;
    rig.head.rotation.x = cur.nod;
    rig.head.rotation.y = cur.turn;
    rig.book.visible = cur.book;
}
