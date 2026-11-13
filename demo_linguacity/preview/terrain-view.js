import * as THREE from 'three';
const viewOrigin = { x: -7.7, y: .32, z: -2.5 };
const cameraOffset = new THREE.Vector3(36, 34.68, 36);
const depthScale = cameraOffset.y / (cameraOffset.length() * Math.SQRT2);
const heightScale = Math.hypot(cameraOffset.x, cameraOffset.z) / cameraOffset.length();
// Crop from the overview reference, in camera units relative to viewOrigin.
const viewBounds = { left: -33.72, right: 36.30, bottom: -19.83, top: 22.10 };
const viewWidth = viewBounds.right - viewBounds.left;
const viewHeight = viewBounds.top - viewBounds.bottom;
const centerAcross = (viewBounds.left + viewBounds.right) / (2 * Math.SQRT2);
const centerDepth = (viewBounds.bottom + viewBounds.top) / (4 * depthScale);
const terrainViews = {
  overview: {
    x: viewOrigin.x + centerAcross - centerDepth,
    z: viewOrigin.z - centerAcross - centerDepth,
    span: viewHeight,
    minWidth: 0,
  },
  bank: { x: -10.5, z: .55, span: 11.8, minWidth: 16.0 },
  rapid: { x: -14.35, z: -7.2, span: 9.9, minWidth: 13.4 },
  waterfall: { x: -.7, y: 3.45, z: -37.25, span: 15.0, minWidth: 18.8 },
  hill: { x: 10.2, y: 3.1, z: -12.45, span: 12.8, minWidth: 17.6 },
  slope: { x: -14.4, z: 6.4, span: 18.4, minWidth: 25.0 },
  coast: { x: -5.7, z: 17.3, span: 13.8, minWidth: 20.0 },
};

export function mountTerrainView({ createTerrain, mountLayers, views = {}, initialView = 'overview' }) {
  const status = document.querySelector('#status');
  try {
    start(createTerrain, mountLayers, { ...terrainViews, ...views }, initialView, status);
  } catch (error) {
    console.error(error);
    status.textContent = 'Không mở được địa hình 3D. Hãy thử Chrome hoặc Edge có WebGL.';
  }
}

function start(createTerrain, mountLayers, presets, initialView, status) {
  const canvas = document.querySelector('#terrain');
  const buttons = [...document.querySelectorAll('[data-camera]')].filter(button => presets[button.dataset.camera]);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#b5b88a');
  const sky = new THREE.HemisphereLight('#fff1d3', '#7c937c', 1.92);
  const sun = new THREE.DirectionalLight('#ffebc8', 2.11);
  sun.position.set(-18, 26, 16);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1536, 1536);
  Object.assign(sun.shadow.camera, { left: -35, right: 35, top: 33, bottom: -33, near: 1, far: 90 });
  sun.shadow.normalBias = .045;
  const terrain = createTerrain();
  const { group, updateWater, ground } = terrain;
  scene.add(sky, sun, group);

  const camera = new THREE.OrthographicCamera(-20, 20, 12, -12, .1, 200);
  const target = new THREE.Vector3();
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const { controls, pickBuilding } = mountLayers?.({ scene, canvas, terrain }) ?? {};
  let frame = { ...presets[initialView] };
  let drag = null, displayedSpan = frame.span, displayedDepthScale = depthScale, elapsed = 0, last = 0;

  function pick(event) {
    const bounds = canvas.getBoundingClientRect();
    pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, 1 - (event.clientY - bounds.top) / bounds.height * 2);
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObject(ground, false)[0];
    return controls?.pickRoad ? controls.pickRoad(ray, hit) : hit?.point;
  }

  function placeCamera() {
    const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight);
    if (!aspect) return;
    const maxSpan = Math.min(viewHeight, viewWidth / aspect);
    displayedSpan = Math.min(Math.max(frame.span, frame.minWidth / aspect), maxSpan);
    const halfHeight = displayedSpan / 2, halfWidth = halfHeight * aspect;
    camera.left = -halfWidth;
    camera.right = halfWidth;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    const height = frame.y ?? viewOrigin.y;
    const offset = frame.elevation ? new THREE.Vector3(cameraOffset.x, frame.elevation, cameraOffset.z) : cameraOffset;
    displayedDepthScale = offset.y / (offset.length() * Math.SQRT2);
    const displayedHeightScale = frame.elevation ? Math.hypot(offset.x, offset.z) / offset.length() : heightScale;
    const x = frame.x - viewOrigin.x, z = frame.z - viewOrigin.z;
    const viewX = (x - z) / Math.SQRT2;
    const viewY = (height - viewOrigin.y) * displayedHeightScale - (x + z) * displayedDepthScale;
    const limitedX = THREE.MathUtils.clamp(viewX, viewBounds.left + halfWidth, viewBounds.right - halfWidth);
    const limitedY = THREE.MathUtils.clamp(viewY, viewBounds.bottom + halfHeight, viewBounds.top - halfHeight);
    const lateral = (limitedX - viewX) / Math.SQRT2;
    const depth = (limitedY - viewY) / (2 * displayedDepthScale);
    target.set(frame.x + lateral - depth, height, frame.z - lateral - depth);
    camera.position.copy(target).add(offset);
    camera.lookAt(target);
    camera.updateMatrixWorld();
  }

  function resize() {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    placeCamera();
  }

  function syncPreset(value) {
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.camera === value));
  }
  syncPreset(initialView);

  function zoom(multiplier) {
    frame.x = target.x;
    frame.z = target.z;
    frame.span = THREE.MathUtils.clamp(displayedSpan * multiplier, 8.5, viewHeight);
    frame.minWidth = 0;
    syncPreset(null);
    placeCamera();
  }
  for (const button of buttons) button.addEventListener('click', () => {
    frame = { ...presets[button.dataset.camera] };
    syncPreset(button.dataset.camera);
    placeCamera();
  });
  document.querySelector('#zoom-in').addEventListener('click', () => zoom(.84));
  document.querySelector('#zoom-out').addEventListener('click', () => zoom(1.19));
  canvas.addEventListener('wheel', event => {
    event.preventDefault();
    zoom(event.deltaY < 0 ? .91 : 1.10);
  }, { passive: false });
  const editCursor = document.querySelector('#edit-cursor');
  function moveEditCursor(event) {
    if (!editCursor || event.pointerType !== 'touch') return;
    const rect = canvas.getBoundingClientRect();
    editCursor.style.left = `${event.clientX - rect.left}px`;
    editCursor.style.top = `${Math.max(12, event.clientY - rect.top - 44)}px`;
    editCursor.hidden = false;
  }
  canvas.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    const editing = controls?.begin(pick(event), event);
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, editing, moved: false };
    if (editing) moveEditCursor(event);
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    if (drag.editing) {
      moveEditCursor(event);
      controls.move(pick(event));
      return;
    }
    if (!drag.moved && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 4) return;
    drag.moved = true;
    const scale = displayedSpan / Math.max(1, canvas.clientHeight);
    const horizontal = (event.clientX - drag.x) * scale / Math.SQRT2;
    const vertical = (event.clientY - drag.y) * scale / (2 * displayedDepthScale);
    frame.x = target.x - horizontal - vertical;
    frame.z = target.z + horizontal - vertical;
    drag.x = event.clientX;
    drag.y = event.clientY;
    syncPreset(null);
    placeCamera();
  });
  for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    canvas.addEventListener(eventName, event => {
      if (drag?.id !== event.pointerId) return;
      if (drag.editing) {
        if (editCursor) editCursor.hidden = true;
        if (eventName === 'pointerup') controls.move(pick(event));
        controls.finish(eventName !== 'pointerup');
      }
      else if (eventName === 'pointerup' && !drag.moved && controls) {
        const point = pick(event);
        const building = canvas.dataset.planMode === 'inspect' ? pickBuilding?.(ray) : undefined;
        controls.inspect(point, building);
      }
      drag = null;
    });
  }

  function animate(now) {
    if (!reducedMotion.matches) elapsed += Math.min(.05, last ? (now - last) / 1000 : .016);
    last = now;
    updateWater(elapsed);
    controls?.update(elapsed, !reducedMotion.matches);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  new ResizeObserver(resize).observe(canvas);
  resize();
  status.textContent = 'Kéo để dịch góc nhìn. Cuộn hoặc dùng + và − để thu phóng.';
  document.documentElement.dataset.ready = 'true';
  requestAnimationFrame(animate);
}

