// Nhân vật của người chơi (M7): cùng kiểu chibi với người dân nhưng ngoại hình do app gửi
// (player.appearance).
// Dùng lại Citizen để có sẵn đi bộ, quay mặt, hoạt ảnh; thêm vòng sáng dưới chân để dễ nhận ra.
// Đổi ngoại hình = dựng lại khung xương (vài chục khối, rất rẻ) ở đúng chỗ đang đứng.
import * as THREE from 'three';
import type { Appearance } from '../bridge/cityState';
import type { Look } from './chibi';
import { Citizen } from './citizens';
import type { Anim } from './poses';

type P2 = { x: number; z: number };

export function lookOf(a: Appearance): Look {
    return {
        skin: a.skin, hair: a.hairColor, shirt: a.shirt, pants: a.pants, style: a.hairStyle,
        bag: false, accessory: a.accessory
    };
}

const ringGeo = new THREE.RingGeometry(0.26, 0.34, 28).rotateX(-Math.PI / 2);
const ringMat = new THREE.MeshBasicMaterial({
    color: '#f4b740', transparent: true, opacity: 0.85, depthWrite: false
});

export interface PlayerOptions {
    parent: THREE.Object3D;
    scale?: number;
    ground?: (x: number, z: number) => number;
    /** Khi rảnh: trả về đường đi dạo kế tiếp (hoặc null để đứng yên). */
    wander?: (from: P2) => P2[] | null;
}

export class Player {
    body!: Citizen;
    /** Đang bị điều khiển bởi hoạt cảnh (vào/ra nhà): không tự đi dạo. */
    busy = false;
    private key = '';
    private idleT = 2;
    private ring = new THREE.Mesh(ringGeo, ringMat);

    constructor(private opts: PlayerOptions, appearance: Appearance) {
        this.ring.position.y = 0.015;
        this.ring.renderOrder = 2;
        this.setAppearance(appearance);
    }

    get x(): number {
        return this.body.x;
    }
    get z(): number {
        return this.body.z;
    }

    setAppearance(a: Appearance): void {
        const key = JSON.stringify(a);
        if (key === this.key) {
            return;
        }
        this.key = key;
        const old = this.body;
        this.body = new Citizen(0, { look: lookOf(a), parent: this.opts.parent, speed: 1.3 });
        if (this.opts.ground) {
            this.body.ground = this.opts.ground;
        }
        this.body.rig.root.scale.setScalar(this.opts.scale ?? 0.85);
        this.body.rig.root.add(this.ring);
        if (old) {
            this.body.placeAt(old.x, old.z);
            this.body.yaw = this.body.targetYaw = old.yaw;
            this.body.rig.root.visible = old.rig.root.visible;
            // đang đi thì đi tiếp đúng đường cũ (giữ cả lời hứa của hoạt cảnh); đang đứng thì vẫy
            // tay "khoe" ngoại hình mới
            if (old.phase === 'walk') {
                this.body.speed = old.speed;
                this.body.walk(old.path, old.onArrive ?? (() => {}));
            } else {
                this.body.doFor('wave', 1.2);
            }
            old.rig.root.removeFromParent();
        }
    }

    placeAt(x: number, z: number, yaw = 0): void {
        this.body.placeAt(x, z);
        this.body.yaw = this.body.targetYaw = yaw;
    }

    set visible(v: boolean) {
        this.body.rig.root.visible = v;
    }

    /** Đi qua các điểm; Promise xong khi tới điểm cuối. */
    walkTo(points: P2[], speed = 1.3): Promise<void> {
        this.body.speed = speed;
        return new Promise((resolve) => {
            if (!points.length) {
                resolve();
                return;
            }
            this.body.walk(points.map((p) => ({ ...p })), resolve);
        });
    }

    act(anim: Anim, seconds: number, face?: number): void {
        this.body.doFor(anim, seconds, face);
    }

    update(dt: number, t: number): void {
        const b = this.body;
        b.update(dt, t);
        if (this.busy || b.phase !== 'think') {
            return;
        }
        // rảnh: đứng một lúc rồi đi dạo gần đó, thỉnh thoảng vẫy tay
        if ((this.idleT -= dt) > 0) {
            return;
        }
        this.idleT = 3 + Math.random() * 5;
        const path = this.opts.wander?.({ x: b.x, z: b.z });
        if (path && path.length) {
            b.walk(
                path,
                () => b.doFor(Math.random() < 0.3 ? 'wave' : 'idle', 1 + Math.random() * 2)
            );
        } else {
            b.doFor('idle', 1);
        }
    }
}
