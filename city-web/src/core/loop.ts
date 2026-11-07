// Vòng lặp khung hình: mỗi ~16 ms gọi update() của từng hệ (người dân, xe, hiệu ứng…) rồi vẽ.
import * as THREE from 'three';
import { camera, labelRenderer, renderer, scene } from './renderer';

/** Bất cứ thứ gì chuyển động đều đăng ký một hàm update(dt, t). dt: giây từ khung trước; t: tổng thời gian. */
export type Updatable = (dt: number, t: number) => void;
const systems = new Set<Updatable>();

export function onUpdate(fn: Updatable): () => void {
  systems.add(fn);
  return () => systems.delete(fn);
}

/** Số liệu hiệu năng để hiển thị trong bảng debug. */
export const perf = { fps: 0, calls: 0, triangles: 0 };

const clock = new THREE.Clock();
let t = 0, frames = 0, acc = 0;

function frame(): void {
  // Kẹp dt: khi tab bị ẩn rồi mở lại, dt có thể rất lớn khiến người "dịch chuyển tức thời".
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;
  for (const fn of systems) fn(dt, t);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);

  frames++;
  acc += dt;
  if (acc >= 0.5) {
    perf.fps = Math.round(frames / acc);
    perf.calls = renderer.info.render.calls;
    perf.triangles = renderer.info.render.triangles;
    frames = 0;
    acc = 0;
  }
  requestAnimationFrame(frame);
}

export function start(): void {
  clock.start();
  requestAnimationFrame(frame);
}
