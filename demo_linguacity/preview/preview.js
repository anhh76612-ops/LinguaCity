import * as THREE from 'three';
import { disposeGroup } from '../../city-web/src/core/shapes';
import { busStation } from './models/bus-station';
import { flat, nightLights } from './models/details';
import { house } from './models/house';
import { park } from './models/park';
import { school } from './models/school';
import { makeTown } from './town';

const options = {
  house: ['House', house, ['Lô đất trống', 'Nhà một tầng', 'Nhà có gian phụ', 'Nhà hai tầng và ban công']],
  school: ['School', school, ['Trường cũ xập xệ', 'Sửa mái và cửa', 'Thêm cổng và giá xe đạp', 'Khối hai tầng và sân trường']],
  park: ['Park', park, ['Đất trống có lối mòn', 'Lối dạo và ghế', 'Bồn hoa và giàn che', 'Đài phun nước và khu chơi']],
  bus: ['Bus Station', busStation, ['Lô dự kiến', 'Biển và ghế chờ', 'Nhà chờ có mái', 'Hai vị trí đón trả khách']],
};
const canvas = document.querySelector('#scene');
const labels = document.querySelector('#labels');
const townLabel = document.querySelector('#town-label');
const status = document.querySelector('#status');
const build = document.querySelector('#build');
const compare = document.querySelector('#compare');
const nightButton = document.querySelector('#night');
const tabs = [...document.querySelectorAll('[data-view]')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const townHints = {
  starter: 'Bấm công trình để xem tên. Chọn lô nhà thị trưởng để thử xây House Lv1.',
  developed: 'Bấm công trình để xem tên. Người dân đang ngồi công viên, chơi bóng và chờ ở bến xe.',
};

function start() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-10, 10, 6, -6, .1, 160);
  const sky = new THREE.HemisphereLight('#fff2d4', '#899471', 2.04);
  const sun = new THREE.DirectionalLight('#ffedc6', 2.04);
  sun.position.set(-13, 23, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -29, right: 29, top: 29, bottom: -29, near: 1, far: 79 });
  sun.shadow.normalBias = .035;
  scene.add(sky, sun);
  const pointer = new THREE.Vector2();
  const ray = new THREE.Raycaster();
  const projection = new THREE.Vector3();
  let view = 'starter', selected = null, town = null, focusLevel = null, starterHouse = 0;
  let night = false, content, gallery = [], time = 0, previous = 0;

  function lightMode() {
    const galleryView = Boolean(options[view]);
    scene.background = new THREE.Color(night ? '#252e3a' : galleryView ? '#e5dec9' : '#a8ac72');
    sky.color.set(night ? '#96aecb' : '#fff2d4');
    sky.groundColor.set(night ? '#676d7c' : '#899471');
    sky.intensity = night ? 1.08 : 2.04;
    sun.color.set(night ? '#a0b7d4' : '#ffedc6');
    sun.intensity = night ? .27 : 2.04;
    nightLights(night);
    nightButton.textContent = night ? 'Xem ban ngày' : 'Xem ban đêm';
    nightButton.setAttribute('aria-pressed', String(night));
  }

  function show(next, level = null) {
    if (content) disposeGroup(content);
    view = next;
    focusLevel = level;
    gallery = [];
    town = null;
    selected = null;
    townLabel.hidden = true;
    labels.replaceChildren();
    for (const tab of tabs) tab.setAttribute('aria-pressed', String(tab.dataset.view === view));
    if (options[view]) {
      const [name, make, descriptions] = options[view];
      content = new THREE.Group();
      flat(content, 56, 56, '#dcd5bc', 0, 0, .05, -.068).castShadow = false;
      for (const index of level === null ? [0, 1, 2, 3] : [level]) {
        const model = make(index);
        content.add(model);
        const badge = document.createElement('button');
        badge.type = 'button';
        badge.textContent = `${name} Lv${index}`;
        badge.dataset.level = index;
        badge.addEventListener('click', () => show(view, index));
        labels.append(badge);
        gallery.push({ model, badge });
      }
      labels.hidden = false;
      status.textContent = level === null ? 'Bấm một cấp để xem gần mô hình.' : descriptions[level];
    } else {
      town = makeTown(view === 'developed', view === 'developed' ? 3 : starterHouse);
      content = town.group;
      labels.hidden = true;
      status.textContent = townHints[view];
    }
    compare.hidden = level === null;
    build.hidden = true;
    scene.add(content);
    lightMode();
    resize();
  }

  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const aspect = width / height;
    renderer.setSize(width, height, false);
    const stacked = aspect < 1.30;
    const span = town ? Math.max(23.5, 25.5 / aspect) :
      focusLevel !== null ? Math.max(6.7, 7.1 / aspect) : stacked ? Math.max(13.6, 13.2 / aspect) : Math.max(9.2, 26.8 / aspect);
    camera.left = -span * aspect / 2;
    camera.right = span * aspect / 2;
    camera.top = span / 2;
    camera.bottom = -span / 2;
    camera.updateProjectionMatrix();
    const target = town ? [-.4, 0, -.55] : [0, .50, 0];
    camera.position.set(target[0] + 29, target[1] + 28, target[2] + 29);
    camera.lookAt(...target);
    camera.updateMatrixWorld();
    if (focusLevel === null) {
      for (const [index, { model }] of gallery.entries()) {
        const across = stacked ? (index % 2 - .5) * 6.20 : (index - 1.5) * 6.45;
        const toward = stacked ? (Math.floor(index / 2) - .5) * 8.3 : 0;
        model.position.set((across + toward) / Math.SQRT2, 0, (toward - across) / Math.SQRT2);
      }
    }
  }

  function placeLabel(label, x, y, z) {
    projection.set(x, y, z).project(camera);
    label.style.left = `${THREE.MathUtils.clamp((projection.x + 1) * 50, 8, 92)}%`;
    label.style.top = `${THREE.MathUtils.clamp((1 - projection.y) * 50, 7, 93)}%`;
  }

  canvas.addEventListener('click', event => {
    if (!town) return;
    const { left, top, width, height } = canvas.getBoundingClientRect();
    pointer.set((event.clientX - left) * 2 / width - 1, 1 - (event.clientY - top) * 2 / height);
    ray.setFromCamera(pointer, camera);
    selected = ray.intersectObjects(town.lots, true)[0]?.object ?? null;
    while (selected && !selected.userData.label) selected = selected.parent;
    townLabel.hidden = !selected;
    build.hidden = view !== 'starter' || starterHouse !== 0 || !selected?.userData.mayorHome;
    if (selected) {
      townLabel.textContent = selected.userData.label;
      selected.userData.labelHeight = new THREE.Box3().setFromObject(selected).max.y + .24;
    }
    status.textContent = selected?.userData.label ?? townHints[view];
  });
  build.addEventListener('click', () => {
    starterHouse = 1;
    show('starter');
    selected = town.lots.find(lot => lot.userData.mayorHome);
    selected.userData.labelHeight = new THREE.Box3().setFromObject(selected).max.y + .24;
    townLabel.textContent = selected.userData.label;
    townLabel.hidden = false;
    status.textContent = selected.userData.label;
  });
  for (const tab of tabs) tab.addEventListener('click', () => show(tab.dataset.view));
  compare.addEventListener('click', () => show(view));
  nightButton.addEventListener('click', () => { night = !night; lightMode(); });
  new ResizeObserver(resize).observe(canvas);

  function animate(now) {
    const dt = Math.min(.05, previous ? (now - previous) / 1000 : .016);
    previous = now;
    if (!reducedMotion.matches) time += dt;
    town?.update(time, dt);
    for (const { model, badge } of gallery) {
      placeLabel(badge, model.position.x + 2.52, .03, model.position.z + 2.52);
    }
    if (selected) placeLabel(townLabel, selected.position.x, selected.userData.labelHeight, selected.position.z);
    for (const group of town?.lots ?? gallery.map(item => item.model)) {
      group.userData.night = night;
      group.userData.animate?.(dt, time);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  show(view);
  document.documentElement.dataset.ready = 'true';
  requestAnimationFrame(animate);
}

try {
  start();
} catch (error) {
  console.error(error);
  status.textContent = 'Không mở được bản xem trước 3D. Hãy thử Chrome hoặc Edge có WebGL.';
}
