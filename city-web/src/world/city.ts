// Thành phố: nhận CityState rồi dựng / dựng lại đúng những gì thay đổi.
// Đây là chỗ "dữ liệu → hình ảnh": mỗi công trình là hàm build(level) trả về một Group.
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { refreshShadows, scene } from '../core/renderer';
import { onUpdate } from '../core/loop';
import { disposeGroup } from '../core/shapes';
import type { BuildingState, CityState } from '../bridge/cityState';
import { BLOCK_H, BUILDING_CODES, type BuildingCode, LOTS, lotCenter } from './grid';
import { buildGround } from './ground';
import { buildLamps, buildTrees } from './props';
import type { Built } from './buildings/common';
import { buildHousing } from './buildings/housing';
import { buildSchool } from './buildings/school';
import { buildPark } from './buildings/park';
import { buildStreets, buildTransport, type PedestrianProvider } from './buildings/road';
import { buildConstruction } from './construction';

const BUILDERS: Record<BuildingCode, (level: number) => Built> = {
  HOUSING: buildHousing,
  SCHOOL: buildSchool,
  PARK: buildPark,
  ROAD: buildTransport,
};

/** Mọi thứ thuộc về một lô đất. */
interface Lot {
  code: BuildingCode;
  holder: THREE.Group;          // nhóm cố định ở tâm lô; mô hình bên trong được thay khi đổi level
  built?: Built;
  site?: Built;                 // công trường (khi đang nâng cấp)
  label: CSS2DObject;
  labelEl: HTMLDivElement;
  state?: BuildingState;
  bounce: number;               // hiệu ứng "nảy" khi chạm (giảm dần về 0)
}

export class City {
  readonly lots = new Map<BuildingCode, Lot>();
  /** Các vật thể có thể chạm để chọn công trình. */
  readonly pickables: THREE.Object3D[] = [];
  private streets?: Built;
  private streetLevel = 0;

  constructor(private pedestrians: PedestrianProvider) {
    scene.add(buildGround(), buildTrees(), buildLamps());
    for (const code of BUILDING_CODES) {
      const c = lotCenter(code);
      const holder = new THREE.Group();
      holder.position.set(c.x, BLOCK_H + 0.01, c.z);
      holder.userData.buildingCode = code; // raycast trúng con nào cũng lần ngược lên tới đây
      scene.add(holder);
      this.pickables.push(holder);

      const el = document.createElement('div');
      el.className = 'b-label hidden-bar';
      const label = new CSS2DObject(el);
      holder.add(label);
      this.lots.set(code, { code, holder, label, labelEl: el, bounce: 0 });
    }
    onUpdate((dt, t) => this.update(dt, t));
  }

  /** Áp trạng thái mới. Chỉ dựng lại lô nào có level/upgrading thay đổi. */
  apply(state: CityState): void {
    let changed = false;
    for (const b of state.buildings) {
      const lot = this.lots.get(b.code);
      if (!lot) continue;
      const prev = lot.state;
      if (!prev || prev.level !== b.level) { this.rebuild(lot, b.level); changed = true; }
      if (!prev || !!prev.upgrading !== !!b.upgrading || (b.upgrading && prev.level !== b.level)) { this.setSite(lot, b); changed = true; }
      if (b.code === 'ROAD' && b.level !== this.streetLevel) { this.rebuildStreets(b.level); changed = true; }
      lot.state = { ...b };
      this.renderLabel(lot);
    }
    if (changed) refreshShadows();
  }

  /** Cửa vào của công trình (toạ độ thế giới) cho người dân bước vào. */
  doorOf(code: BuildingCode): { x: number; z: number } | null {
    const lot = this.lots.get(code), d = lot?.built?.door;
    if (!lot || !d) return null;
    return { x: lot.holder.position.x + d.x, z: lot.holder.position.z + d.z };
  }

  /** Hiệu ứng khi người chơi chạm vào công trình. */
  poke(code: BuildingCode): void {
    const lot = this.lots.get(code);
    if (lot) lot.bounce = 1;
  }

  private rebuild(lot: Lot, level: number): void {
    if (lot.built) disposeGroup(lot.built.group);
    lot.built = BUILDERS[lot.code](level);
    lot.holder.add(lot.built.group);
    // đặt nhãn cao hơn đỉnh mô hình một chút
    const top = new THREE.Box3().setFromObject(lot.built.group).max.y - lot.holder.position.y;
    lot.label.position.set(0, Math.max(top, 1.5) + 0.6, 0);
  }

  private setSite(lot: Lot, b: BuildingState): void {
    if (lot.site) { disposeGroup(lot.site.group); lot.site = undefined; }
    if (!b.upgrading) return;
    const top = lot.built ? new THREE.Box3().setFromObject(lot.built.group).max.y - lot.holder.position.y : 2;
    lot.site = buildConstruction(top);
    lot.holder.add(lot.site.group);
    lot.label.position.y = Math.max(lot.label.position.y, top + 1.5);
  }

  private rebuildStreets(level: number): void {
    if (this.streets) disposeGroup(this.streets.group);
    this.streets = buildStreets(level, this.pedestrians);
    scene.add(this.streets.group);
    this.streetLevel = level;
  }

  private renderLabel(lot: Lot): void {
    const s = lot.state!, info = LOTS[lot.code];
    const pct = Math.round((s.progress ?? 0) * 100);
    lot.labelEl.classList.toggle('hidden-bar', !s.upgrading);
    lot.labelEl.innerHTML =
      `<div>${info.icon} ${info.name}<span class="lv">Lv ${s.level}</span></div>` +
      `<div class="bar" title="Đang nâng cấp ${pct}%"><i style="width:${pct}%"></i></div>`;
  }

  private update(dt: number, t: number): void {
    for (const lot of this.lots.values()) {
      lot.built?.update?.(dt, t);
      lot.site?.update?.(dt, t);
      if (lot.bounce > 0) {
        // nảy: phình lên rồi xẹp, dao động tắt dần
        lot.bounce = Math.max(0, lot.bounce - dt * 2.2);
        const k = 1 + Math.sin((1 - lot.bounce) * Math.PI * 3) * 0.05 * lot.bounce;
        lot.built?.group.scale.set(k, 2 - k, k);
      }
    }
    this.streets?.update?.(dt, t);
  }
}
