// Điều khiển bằng chuột và cảm ứng: kéo để di chuyển, lăn chuột/chụm hai ngón để phóng to, chạm để chọn.
// Dùng Pointer Events: một bộ mã cho cả chuột, bút và ngón tay.
import * as THREE from 'three';
import { camera, placeCamera, renderer, target } from './renderer';
import { MAP_HALF } from '../world/grid';

const MIN_ZOOM = 0.8, MAX_ZOOM = 4;
const TAP_MOVE = 8; // px: di chuyển ít hơn thế coi là "chạm", không phải "kéo"

const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();

/** Toạ độ màn hình → toạ độ chuẩn hoá [-1, 1] mà Raycaster cần. */
function toNdc(x: number, y: number): THREE.Vector2 {
  const r = renderer.domElement.getBoundingClientRect();
  return ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
}

/** Điểm trên mặt đất nằm dưới con trỏ. */
function groundAt(x: number, y: number, out: THREE.Vector3): THREE.Vector3 | null {
  ray.setFromCamera(toNdc(x, y), camera);
  return ray.ray.intersectPlane(ground, out);
}

/** Bắn tia từ điểm chạm vào danh sách vật thể, trả về vật gần nhất. */
export function pick(x: number, y: number, objects: THREE.Object3D[]): THREE.Intersection | null {
  ray.setFromCamera(toNdc(x, y), camera);
  return ray.intersectObjects(objects, true)[0] ?? null;
}

export function setupControls(onTap: (x: number, y: number) => void): void {
  const el = renderer.domElement;
  const pointers = new Map<number, { x: number; y: number }>();
  let downAt = { x: 0, y: 0, time: 0 }, moved = 0, pinchDist = 0;
  const grab = new THREE.Vector3(), now = new THREE.Vector3();

  // Màn dọc (điện thoại): phóng to sẵn một chút cho dễ nhìn
  if (innerWidth / innerHeight < 0.8) { camera.zoom = 1.1; camera.updateProjectionMatrix(); }

  const clampTarget = () => {
    target.x = THREE.MathUtils.clamp(target.x, -MAP_HALF, MAP_HALF);
    target.z = THREE.MathUtils.clamp(target.z, -MAP_HALF, MAP_HALF);
    placeCamera();
  };
  /* Phóng to "vào chỗ con trỏ": điểm mặt đất dưới con trỏ (hoặc giữa hai ngón) đứng yên khi zoom,
     giống bản đồ Google. Cách làm: lấy điểm đó trước và sau khi zoom, dời camera bù phần lệch. */
  const before = new THREE.Vector3(), after = new THREE.Vector3();
  const setZoom = (z: number, sx: number, sy: number) => {
    const had = groundAt(sx, sy, before);
    camera.zoom = THREE.MathUtils.clamp(z, MIN_ZOOM, MAX_ZOOM);
    camera.updateProjectionMatrix();
    if (had && groundAt(sx, sy, after)) {
      target.add(before.sub(after));
      clampTarget();
    }
  };

  el.addEventListener('pointerdown', (e) => {
    el.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      downAt = { x: e.clientX, y: e.clientY, time: performance.now() };
      moved = 0;
      groundAt(e.clientX, e.clientY, grab);
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
      moved = Infinity; // đã chụm thì lần nhả tay này không còn là "chạm"
    }
  });

  el.addEventListener('pointermove', (e) => {
    const p = pointers.get(e.pointerId);
    if (!p) return;
    p.x = e.clientX;
    p.y = e.clientY;
    if (pointers.size === 1) {
      moved = Math.max(moved, Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y));
      if (moved < TAP_MOVE) return;
      /* Kéo bản đồ: giữ cho điểm mặt đất lúc bắt đầu kéo luôn nằm dưới ngón tay.
         Lấy điểm mặt đất hiện tại, dời camera một đoạn bằng chênh lệch. */
      if (groundAt(e.clientX, e.clientY, now)) {
        target.add(grab.clone().sub(now));
        clampTarget();
      }
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDist > 0) setZoom(camera.zoom * (d / pinchDist), (a.x + b.x) / 2, (a.y + b.y) / 2);
      pinchDist = d;
    }
  });

  const up = (e: PointerEvent) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.delete(e.pointerId);
    if (pointers.size === 0 && moved < TAP_MOVE && performance.now() - downAt.time < 450) onTap(e.clientX, e.clientY);
    if (pointers.size === 1) {
      // còn một ngón: tiếp tục kéo từ vị trí ngón đó
      const [p] = [...pointers.values()];
      groundAt(p.x, p.y, grab);
      downAt = { x: p.x, y: p.y, time: 0 };
    }
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);

  el.addEventListener('wheel', (e) => {
    e.preventDefault();
    setZoom(camera.zoom * Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY);
  }, { passive: false });
}
