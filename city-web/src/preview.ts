/* Chế độ xem trước nhân vật (M7): index.html?mode=avatar-preview
   Dùng cho màn chọn ngoại hình (UC_14): avatar đứng trên bệ tròn, tự xoay chậm; kéo ngang để xoay
   tay.
   App gửi ngoại hình bằng chính LinguaCity.setState({ player: { appearance } }) — các trường khác
   bị bỏ qua.
   Không dựng thành phố: tải nhanh, nhẹ máy. */
import * as THREE from 'three';
import { onResize, renderer } from './core/renderer';
import { onUpdate, setView } from './core/loop';
import { cyl } from './core/shapes';
import { type Appearance, type CityState, DEFAULT_APPEARANCE, normalizeState } from './bridge/cityState';
import { emit, exposeApi } from './bridge/bridge';
import { makeChibi, type Rig } from './people/chibi';
import { lookOf } from './people/player';
import { applyPose, poseFor, restPose } from './people/poses';

export function bootPreview(): void {
    document.body.classList.add('preview');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    const LOOK_AT = new THREE.Vector3(0, 0.95, 0);
    onResize((w, h) => {
        camera.aspect = w / h;
        // màn hẹp (khung xem trước nhỏ trong Compose): lùi camera để nhân vật không bị cắt
        // nhân vật cao ≈ 2.2 đơn vị: chọn khoảng cách để cả người + bệ vừa khung theo chiều hẹp hơn
        const fitH = 3.8, vFov = THREE.MathUtils.degToRad(camera.fov);
        let dist = fitH / 2 / Math.tan(vFov / 2);
        if (camera.aspect < 0.75) {
            dist /= camera.aspect / 0.75;
        }
        camera.position.set(0, LOOK_AT.y + dist * 0.18, dist);
        camera.lookAt(LOOK_AT);
        camera.updateProjectionMatrix();
    });
    setView(scene, camera);

    scene.add(new THREE.HemisphereLight('#fff6e8', '#8a9bb0', 1.8));
    const key = new THREE.DirectionalLight('#fff1dc', 2.2);
    key.position.set(2.5, 5, 3.5);
    key.castShadow = true;
    key.shadow.mapSize.setScalar(1024);
    Object.assign(key.shadow.camera, { left: -2, right: 2, top: 2, bottom: -2, near: 1, far: 15 });
    scene.add(key);
    const rim = new THREE.DirectionalLight('#cfe0f0', 1.2);
    rim.position.set(-3, 2.5, -3);
    scene.add(rim);
    // cảnh nhỏ, nhân vật xoay liên tục → cập nhật bóng mỗi khung
    renderer.shadowMap.autoUpdate = true;

    // bệ tròn hai tầng
    const stage = new THREE.Group();
    cyl(stage, 0.95, 1.0, 0.14, '#f3e7d3', 0, -0.14, 0, 40);
    cyl(stage, 1.05, 1.1, 0.06, '#d9c6a8', 0, -0.2, 0, 40);
    scene.add(stage);

    const turntable = new THREE.Group();
    scene.add(turntable);

    let rig: Rig | null = null;
    let lookKey = '';
    let pop = 0;
    const pose = restPose();
    const setAppearance = (a: Appearance) => {
        const k = JSON.stringify(a);
        if (k === lookKey) {
            return;
        }
        lookKey = k;
        if (rig) {
            rig.root.removeFromParent();
        }
        rig = makeChibi(lookOf(a));
        rig.root.scale.setScalar(2.3);
        rig.root.traverse((o) => {
            if ((o as THREE.Mesh).isMesh) {
                o.castShadow = true;
            }
        });
        turntable.add(rig.root);
        pop = 1;
    };
    setAppearance(DEFAULT_APPEARANCE);

    // kéo ngang để xoay; thả tay thì quán tính giảm dần rồi tự xoay chậm trở lại
    let spin = 0.5, dragging = false, lastX = 0, idle = 0;
    const el = renderer.domElement;
    el.addEventListener('pointerdown', (e) => {
        dragging = true;
        lastX = e.clientX;
        el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', (e) => {
        if (!dragging) {
            return;
        }
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        turntable.rotation.y += dx * 0.012;
        spin = dx * 0.6;
        idle = 0;
    });
    const up = () => {
        dragging = false;
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);

    let waveT = 3;
    onUpdate((dt, t) => {
        if (!dragging) {
            idle += dt;
            const auto = idle > 1.5 ? 0.5 : 0;
            spin += (auto - spin) * Math.min(1, dt * 2.5);
            turntable.rotation.y += spin * dt;
        }
        if (!rig) {
            return;
        }
        // nảy nhẹ khi đổi ngoại hình
        if (pop > 0) {
            pop = Math.max(0, pop - dt * 2.5);
            const s = 2.3 * (1 + Math.sin((1 - pop) * Math.PI * 2) * 0.08 * pop);
            rig.root.scale.set(s, s, s);
        }
        waveT -= dt;
        const anim = waveT < 0 && waveT > -1.6 ? 'wave' : 'idle';
        if (waveT < -1.6) {
            waveT = 5 + Math.random() * 4;
        }
        applyPose(rig, pose, poseFor(anim, t, 0, 0), dt, false);
    });

    let state: CityState = normalizeState({});
    exposeApi((s) => {
        state = s;
        setAppearance(s.player?.appearance ?? DEFAULT_APPEARANCE);
    }, () => state);
    emit({ type: 'Ready' });
}
