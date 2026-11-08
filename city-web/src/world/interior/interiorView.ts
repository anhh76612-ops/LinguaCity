// Cảnh "bên trong nhà" (M7): một THREE.Scene riêng có ánh sáng và camera riêng.
// Vòng lặp chỉ vẽ cảnh đang hiện (core/loop.ts setView), nên thành phố không tốn GPU khi đang ở trong nhà.
import * as THREE from 'three';
import { MOBILE, VIEW_DIR, onResize } from '../../core/renderer';
import { onUpdate } from '../../core/loop';
import { disposeGroup } from '../../core/shapes';
import type { Appearance, HouseStyle } from '../../bridge/cityState';
import { Player } from '../../people/player';
import { DOOR, ROOM_D, ROOM_W, WALKABLE, buildHouseInterior } from './house';

const INSIDE_SCALE = 1.5; // trong phòng nhìn gần hơn nên phóng to nhân vật cho cân với tường cao 2.6

export class InteriorView {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 200);
  readonly player: Player;
  private room?: THREE.Group;
  private styleKey = '';
  private floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private ray = new THREE.Raycaster();
  active = false;

  constructor(appearance: Appearance, style: HouseStyle) {
    // ánh sáng ấm trong nhà + "nắng" chiếu xiên qua cửa sổ sau
    this.scene.add(new THREE.HemisphereLight('#fff4e0', '#9a8f86', 1.7));
    const sun = new THREE.DirectionalLight('#fff0d6', 1.6);
    sun.position.set(4, 9, -6);
    sun.castShadow = true;
    sun.shadow.mapSize.setScalar(MOBILE ? 512 : 1024);
    Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 30 });
    sun.shadow.bias = -0.0008;
    sun.shadow.radius = 3;
    this.scene.add(sun, sun.target);
    this.scene.add(new THREE.PointLight('#ffd98a', 4, 6, 1.6).translateY(2.1).translateZ(-0.3));

    const target = new THREE.Vector3(0, 0.9, 0.2);
    this.camera.position.copy(target).addScaledVector(VIEW_DIR, 40);
    this.camera.lookAt(target);
    onResize((w, h) => this.fit(w / h));

    this.setStyle(style);
    this.player = new Player({
      parent: this.scene,
      scale: INSIDE_SCALE,
      ground: () => 0,
      wander: () => (Math.random() < 0.6 ? [randomSpot()] : null),
    }, appearance);
    this.player.placeAt(DOOR.x, DOOR.z, Math.PI);

    onUpdate((dt, t) => { if (this.active) this.player.update(dt, t); });
  }

  /** Khung nhìn vừa đủ cả căn phòng ở cả màn dọc và màn ngang. */
  private fit(aspect: number): void {
    const span = (ROOM_W + ROOM_D) * Math.SQRT1_2 + 1.6; // bề ngang căn phòng khi nhìn chéo
    const viewH = Math.max(7.2, span / aspect);
    this.camera.left = (-viewH * aspect) / 2;
    this.camera.right = (viewH * aspect) / 2;
    this.camera.top = viewH / 2;
    this.camera.bottom = -viewH / 2;
    this.camera.updateProjectionMatrix();
  }

  setStyle(style: HouseStyle): void {
    const key = `${style.wall}|${style.floor}`;
    if (key === this.styleKey) return;
    this.styleKey = key;
    if (this.room) disposeGroup(this.room);
    this.room = buildHouseInterior(style).group;
    this.scene.add(this.room);
  }

  setAppearance(a: Appearance): void {
    this.player.setAppearance(a);
  }

  /** Người chơi vừa bước qua cửa: đứng ở ngưỡng cửa rồi đi vào giữa phòng. */
  async walkIn(): Promise<void> {
    this.player.busy = true;
    this.player.visible = true;
    this.player.placeAt(DOOR.x, DOOR.z + 0.6, Math.PI);
    await this.player.walkTo([{ x: DOOR.x, z: 0.4 }], 1.6);
    this.player.act('wave', 1.4);
    this.player.busy = false;
  }

  async walkOut(): Promise<void> {
    this.player.busy = true;
    await this.player.walkTo([{ x: DOOR.x, z: DOOR.z - 0.2 }, { x: DOOR.x, z: DOOR.z + 0.5 }], 2.2);
    this.player.busy = false;
  }

  /** Chạm sàn: người chơi đi tới đó (kẹp trong phòng). Trả về true nếu chạm trúng sàn. */
  tap(ndc: THREE.Vector2): boolean {
    this.ray.setFromCamera(ndc, this.camera);
    const hit = this.ray.ray.intersectPlane(this.floorPlane, new THREE.Vector3());
    if (!hit || this.player.busy) return false;
    const x = THREE.MathUtils.clamp(hit.x, WALKABLE.minX, WALKABLE.maxX);
    const z = THREE.MathUtils.clamp(hit.z, WALKABLE.minZ, WALKABLE.maxZ);
    void this.player.walkTo([{ x, z }], 1.6).then(() => this.player.act('idle', 2));
    return true;
  }
}

function randomSpot(): { x: number; z: number } {
  return {
    x: THREE.MathUtils.lerp(WALKABLE.minX + 0.6, WALKABLE.maxX - 0.6, Math.random()),
    z: THREE.MathUtils.lerp(WALKABLE.minZ + 0.6, WALKABLE.maxZ - 0.8, Math.random()),
  };
}
