// Cảnh, camera isometric, ánh sáng và renderer.
// Đây là phần quyết định "phong cách" nhiều nhất: camera trực giao + bóng mềm + tone mapping.
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { MAP_HALF } from '../world/grid';

/** Điện thoại/máy tính bảng (ngón tay) → giảm chất lượng một chút để mượt và mát máy. */
export const MOBILE = matchMedia('(pointer: coarse)').matches;

export const scene = new THREE.Scene();

/* ---------- Camera trực giao (orthographic) ----------
   Không có phối cảnh: vật ở xa không nhỏ đi. Đặt camera nhìn chéo từ góc (1, 1, 1)
   cho ra góc nhìn "isometric" quen thuộc của game xây thành phố. */
export const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 300);
// điểm camera nhìn vào (kéo bản đồ = dời điểm này). Nâng lên 3 đơn vị để chừa chỗ phía trên cho nhà
// cao + nhãn.
export const target = new THREE.Vector3(0, 3, 0);
export const VIEW_DIR = new THREE.Vector3(1, 1.05, 1).normalize();
const DIST = 80;

export function placeCamera(): void {
    camera.position.copy(target).addScaledVector(VIEW_DIR, DIST);
    camera.lookAt(target);
}

/* ---------- Renderer ---------- */
export const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
});
renderer.setClearColor(0x000000, 0); // trong suốt: trời là gradient CSS phía sau
renderer.setPixelRatio(Math.min(devicePixelRatio, MOBILE ? 1.75 : 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// Bóng của cảnh tĩnh chỉ cần tính lại khi có gì đó thay đổi (đổi level, xây xong…).
// Người và xe dùng "bóng giả" (blobShadow) nên không cần cập nhật mỗi khung hình.
renderer.shadowMap.autoUpdate = false;
renderer.toneMapping = THREE.ACESFilmicToneMapping; // màu dịu, "điện ảnh" hơn
renderer.toneMappingExposure = 1.05;

/** Gọi khi cảnh tĩnh thay đổi để tính lại bóng ở khung hình kế tiếp. */
export function refreshShadows(): void {
    renderer.shadowMap.needsUpdate = true;
}

// Lớp nhãn HTML nằm trên canvas (tên công trình, thanh tiến độ)
export const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.className = 'label-layer';
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.inset = '0';

/* ---------- Ánh sáng ----------
   1) Hemisphere: ánh sáng trời (trên ấm, dưới xanh xám) để mặt khuất không bị đen.
   2) Directional: "mặt trời" tạo bóng đổ. Bóng mềm nhờ PCFSoftShadowMap + radius. */
const hemi = new THREE.HemisphereLight('#fff6e8', '#8a9bb0', 1.6);
scene.add(hemi);

export const sun = new THREE.DirectionalLight('#fff1dc', 2.3);
sun.position.set(14, 26, 7);
sun.castShadow = true;
sun.shadow.mapSize.setScalar(MOBILE ? 1024 : 2048);
const S = MAP_HALF + 4;
Object.assign(sun.shadow.camera, { left: -S, right: S, top: S, bottom: -S, near: 1, far: 80 });
sun.shadow.bias = -0.0006;
sun.shadow.normalBias = 0.03;
sun.shadow.radius = 3;
scene.add(sun, sun.target);

/* ---------- Khung nhìn ----------
   Camera trực giao cần biết "nhìn rộng bao nhiêu đơn vị". Ta chọn đủ để thấy trọn bản đồ
   theo chiều ngang (màn dọc của điện thoại) hoặc chiều dọc (màn ngang).
   Cảnh khác (trong nhà, xem trước nhân vật) đăng ký onResize để cập nhật camera riêng. */
const resizeHooks = new Set<(w: number, h: number) => void>();
export function onResize(fn: (w: number, h: number) => void): void {
    resizeHooks.add(fn);
    fn(innerWidth, innerHeight);
}

export function resize(): void {
    const w = innerWidth, h = innerHeight, aspect = w / h;
    const mapSpan = MAP_HALF * 2 * Math.SQRT2 + 2; // bề ngang bản đồ khi nhìn chéo
    const viewH = Math.max(MAP_HALF * 2.3, mapSpan / aspect);
    camera.left = (-viewH * aspect) / 2;
    camera.right = (viewH * aspect) / 2;
    camera.top = viewH / 2;
    camera.bottom = -viewH / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    labelRenderer.setSize(w, h);
    resizeHooks.forEach((fn) => fn(w, h));
}

export function mount(el: HTMLElement): void {
    el.appendChild(renderer.domElement);
    el.appendChild(labelRenderer.domElement);
    placeCamera();
    resize();
    addEventListener('resize', resize);
}
