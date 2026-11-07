/* Người dân: mỗi người là một "máy trạng thái" đơn giản.

     think ──chọn việc──▶ walk ──tới nơi──▶ do (ngồi ghế, đọc sách, chờ xe…) ──hết giờ──▶ think
                            │
                            └─tới cửa nhà/trường──▶ inside (ẩn đi vài giây) ──▶ bước ra ──▶ think

   Số người dân tăng theo level của HOUSING. Người có Sự kiện thành phố mang dấu (!) trên đầu. */
import * as THREE from 'three';
import { onUpdate } from '../core/loop';
import { scene } from '../core/renderer';
import { seeded } from '../core/shapes';
import { heightAt, onBlock, type BuildingCode } from '../world/grid';
import type { City } from '../world/city';
import type { CityEvent } from '../bridge/cityState';
import { makeChibi, randomLook, type Rig } from './chibi';
import { applyPose, poseFor, restPose, type Anim, type Pose } from './poses';
import { NODES, SPOTS, STROLL_NODES, nearestNode, route, type NodeId, type Spot } from './nav';
import { makeMarker } from '../ui/markers';

type Phase = 'think' | 'walk' | 'do' | 'inside';
type P2 = { x: number; z: number };

const SCALE = 0.85;
const rand = (a: number, b: number) => a + Math.random() * (b - a);
/** Hiệu hai góc, đưa về khoảng [-π, π] để quay theo đường ngắn nhất. */
const angleDiff = (a: number, b: number) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

export class Citizen {
  readonly rig: Rig;
  x = 0; z = 0; yaw = 0; targetYaw = 0;
  phase: Phase = 'think';
  anim: Anim = 'idle';
  timer = 0;                      // thời gian còn lại của việc đang làm
  path: P2[] = [];
  onArrive: (() => void) | null = null;
  spot: Spot | null = null;
  leaving = false;                // sắp "dọn đi" (khi level Housing giảm)
  eventId: string | null = null;
  marker: THREE.Sprite | null = null;
  private pose: Pose = restPose();
  private speed = rand(1.0, 1.35);
  private stepPh = rand(0, 6);
  private lookY = 0; private lookT = 0; private blinkT = rand(1, 4);
  private seed = Math.random() * 100;

  constructor(seed: number) {
    this.rig = makeChibi(randomLook(seeded(seed)));
    this.rig.root.scale.setScalar(SCALE);
    this.rig.root.userData.citizen = this;
    scene.add(this.rig.root);
  }

  get visible(): boolean { return this.rig.root.visible; }

  placeAt(x: number, z: number): void {
    this.x = x; this.z = z;
    this.rig.root.position.set(x, heightAt(x, z), z);
  }

  /** Đi theo danh sách điểm; tới điểm cuối thì gọi then(). */
  walk(points: P2[], then: () => void): void {
    this.path = points;
    this.phase = 'walk';
    this.onArrive = then;
  }

  doFor(anim: Anim, seconds: number, face?: number): void {
    this.phase = 'do';
    this.anim = anim;
    this.timer = seconds;
    if (face !== undefined) this.targetYaw = face;
  }

  update(dt: number, t: number): void {
    if (this.phase === 'walk') this.step(dt);
    else if (this.phase === 'do' || this.phase === 'inside') {
      this.timer -= dt;
      if (this.timer <= 0) {
        if (this.phase === 'inside') this.rig.root.visible = true;
        const cb = this.onArrive; // việc kế tiếp sau khi làm xong (nếu có)
        this.onArrive = null;
        this.phase = 'think';
        if (cb) cb();
      }
    }
    if (!this.rig.root.visible) return;

    // quay mặt mượt về hướng đích
    this.yaw += angleDiff(this.yaw, this.targetYaw) * Math.min(1, dt * 9);
    const r = this.rig.root;
    r.rotation.y = this.yaw;
    r.position.x = this.x;
    r.position.z = this.z;
    r.position.y += (heightAt(this.x, this.z) - r.position.y) * Math.min(1, dt * 14);

    // nhìn quanh và chớp mắt cho "sống"
    if ((this.lookT -= dt) < 0) { this.lookT = rand(1.5, 4); this.lookY = Math.random() < 0.5 ? 0 : rand(-0.6, 0.6); }
    if ((this.blinkT -= dt) < 0) this.blinkT = rand(2, 5);
    const blink = this.blinkT < 0.12 ? 0.15 : 1;
    this.rig.eyes.forEach((e) => (e.scale.y = blink));

    const walking = this.phase === 'walk';
    const anim: Anim = walking ? 'walk' : this.anim;
    const target = poseFor(anim, t + this.seed, this.stepPh, this.lookY);
    applyPose(this.rig, this.pose, target, dt, anim === 'sit');

    if (this.marker) this.marker.position.y = 1.55 + Math.sin(t * 4 + this.seed) * 0.06;
  }

  private step(dt: number): void {
    const tgt = this.path[0];
    if (!tgt) { this.arrive(); return; }
    const dx = tgt.x - this.x, dz = tgt.z - this.z, d = Math.hypot(dx, dz), s = this.speed * dt;
    this.stepPh += s * 7.5; // pha bước chân tỉ lệ với quãng đường: chân không "trượt"
    if (d <= s) {
      this.x = tgt.x; this.z = tgt.z;
      this.path.shift();
      if (!this.path.length) this.arrive();
    } else {
      this.x += (dx / d) * s;
      this.z += (dz / d) * s;
      this.targetYaw = Math.atan2(dx, dz);
    }
  }

  private arrive(): void {
    this.phase = 'think';
    this.anim = 'idle';
    const cb = this.onArrive;
    this.onArrive = null;
    if (cb) cb();
  }

  dispose(): void {
    this.rig.root.removeFromParent();
    this.marker?.material.dispose();
  }
}

/** Quản lý toàn bộ người dân: số lượng, chọn việc, gắn sự kiện. */
export class Citizens {
  readonly list: Citizen[] = [];
  private seedN = 1;

  constructor(private city: City) {
    onUpdate((dt, t) => {
      for (const c of [...this.list]) {
        if (c.phase === 'think') this.decide(c);
        c.update(dt, t);
      }
    });
  }

  /** Người đang ở dưới lòng đường: xe sẽ nhường. */
  onRoad(): P2[] {
    return this.list.filter((c) => c.visible && !onBlock(c.x, c.z)).map((c) => ({ x: c.x, z: c.z }));
  }

  /** Đặt số người dân mong muốn. Thêm thì người mới bước ra từ nhà; bớt thì người thừa đi về nhà rồi biến mất. */
  setCount(n: number, initial = false): void {
    const active = this.list.filter((c) => !c.leaving);
    for (let i = active.length; i < n; i++) {
      const c = new Citizen(this.seedN++ * 97);
      this.list.push(c);
      const door = this.city.doorOf('HOUSING');
      if (initial || !door) {
        const [x, z] = NODES[STROLL_NODES[Math.floor(Math.random() * STROLL_NODES.length)]];
        c.placeAt(x, z);
        c.doFor('idle', rand(0, 2));
      } else {
        c.placeAt(door.x, door.z);
        c.doFor('wave', 1.2);
      }
    }
    // bớt: ưu tiên người không mang sự kiện
    const extra = active.length - n;
    if (extra > 0) {
      active.sort((a, b) => Number(!!a.eventId) - Number(!!b.eventId)).slice(0, extra).forEach((c) => (c.leaving = true));
    }
  }

  /** Đồng bộ dấu (!) với danh sách sự kiện: thêm sự kiện mới, gỡ sự kiện đã xong. */
  syncEvents(events: CityEvent[]): void {
    const want = new Set(events.map((e) => e.id));
    for (const c of this.list) {
      if (c.eventId && !want.has(c.eventId)) {
        c.marker?.removeFromParent();
        c.marker?.material.dispose();
        c.marker = null;
        c.eventId = null;
      }
    }
    const have = new Set(this.list.map((c) => c.eventId).filter(Boolean));
    for (const e of events) {
      if (have.has(e.id)) continue;
      // chọn người đang ở ngoài đường, không mang sự kiện, không sắp dọn đi
      const free = this.list.filter((c) => !c.eventId && !c.leaving && c.visible);
      const c = free[Math.floor(Math.random() * free.length)] ?? this.list.find((x) => !x.eventId && !x.leaving);
      if (!c) continue;
      c.eventId = e.id;
      c.marker = makeMarker();
      c.marker.userData.eventId = e.id;
      c.rig.root.add(c.marker);
    }
  }

  /** Những vật có thể chạm: thân người dân và dấu (!). */
  pickables(): THREE.Object3D[] {
    return this.list.filter((c) => c.visible).map((c) => c.rig.root);
  }

  /** Chạm vào một người không có sự kiện: họ vẫy tay chào. */
  greet(c: Citizen): void {
    if (c.phase === 'walk' || c.anim === 'sit') return;
    const resume = c.onArrive;
    c.doFor('wave', 1.5);
    c.onArrive = resume;
  }

  /* ---------- Chọn việc tiếp theo ---------- */
  private decide(c: Citizen): void {
    if (c.spot) { this.leaveSpot(c); return; }
    if (c.leaving) { this.goInside(c, 'HOUSING', () => this.remove(c)); return; }

    const r = Math.random();
    const canEnter = !c.eventId; // người mang (!) ở ngoài để người chơi còn chạm được
    if (canEnter && r < 0.16) return this.goInside(c, 'HOUSING');
    if (canEnter && r < 0.36) return this.goInside(c, 'SCHOOL');
    if (r < 0.72) {
      const spot = this.freeSpot(r < 0.58 ? (s) => s.node.startsWith('PARK') : (s) => s.node === 'ROAD.gate');
      if (spot) return this.goSpot(c, spot);
    }
    this.stroll(c);
  }

  private pathTo(c: Citizen, node: NodeId, end?: P2): P2[] {
    const ids = route(nearestNode(c.x, c.z), node);
    const pts = ids.map((id) => ({ x: NODES[id][0], z: NODES[id][1] }));
    if (end) pts.push(end);
    return pts;
  }

  private stroll(c: Citizen): void {
    const node = STROLL_NODES[Math.floor(Math.random() * STROLL_NODES.length)];
    c.walk(this.pathTo(c, node), () => c.doFor(Math.random() < 0.25 ? 'talk' : 'idle', rand(0.8, 3)));
  }

  private freeSpot(filter: (s: Spot) => boolean): Spot | null {
    // Chỉ dùng điểm của công trình đã xây đủ level (công trình level 0 chỉ là đất trống).
    const levelOf = (code: BuildingCode) => this.city.lots.get(code)?.state?.level ?? 1;
    const usable = (s: Spot) => {
      const need = s.needs ?? { code: s.node.split('.')[0] as BuildingCode, level: 1 };
      return levelOf(need.code) >= need.level;
    };
    const ok = SPOTS.filter((s) => !s.by && filter(s) && usable(s));
    return ok.length ? ok[Math.floor(Math.random() * ok.length)] : null;
  }

  private goSpot(c: Citizen, s: Spot): void {
    s.by = c;
    c.spot = s;
    c.walk(this.pathTo(c, s.node, { x: s.x, z: s.z }), () => c.doFor(s.act, rand(5, 12), s.face));
  }

  private leaveSpot(c: Citizen): void {
    const s = c.spot!;
    c.spot = null;
    s.by = null;
    const [x, z] = NODES[s.node];
    c.walk([{ x, z }], () => (c.phase = 'think')); // lùi về nút của spot rồi mới đi tiếp
  }

  /** Đi tới cửa công trình, "vào trong" (ẩn) vài giây, rồi bước ra. */
  private goInside(c: Citizen, code: BuildingCode, then?: () => void): void {
    const door = this.city.doorOf(code);
    // Không có cửa (ví dụ lô đất trống): người sắp "dọn đi" thì biến mất luôn, người khác đi dạo.
    if (!door) { if (then) then(); else this.stroll(c); return; }
    c.walk(this.pathTo(c, `${code}.gate`, door), () => {
      c.rig.root.visible = false;
      c.phase = 'inside';
      c.timer = rand(4, 10);
      c.onArrive = then ?? (() => {
        // bước ra: quay mặt ra đường, đi về cổng
        const [gx, gz] = NODES[`${code}.gate`];
        c.walk([{ x: gx, z: gz }], () => c.doFor('idle', rand(0.3, 1.2)));
      });
    });
  }

  private remove(c: Citizen): void {
    c.dispose();
    this.list.splice(this.list.indexOf(c), 1);
  }
}
