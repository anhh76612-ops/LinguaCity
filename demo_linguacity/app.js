(() => {
  const model = window.TownModel;
  const canvas = document.querySelector('#map');
  const dock = document.querySelector('#dock');
  const contextTools = document.querySelector('#context-tools');
  const houseTools = document.querySelector('#house-tools');
  const placeTools = document.querySelector('#place-tools');
  const roadTools = document.querySelector('#road-tools');
  const label = document.querySelector('#house-label');
  const labelName = document.querySelector('#label-name');
  const labelLevel = document.querySelector('#label-level');
  const status = document.querySelector('#status');
  const placeButton = document.querySelector('#place');
  const buildButton = document.querySelector('#build');
  const enterButton = document.querySelector('#enter');
  const leaveButton = document.querySelector('#leave');
  const modeButtons = document.querySelectorAll('[data-mode]');
  const levelButtons = document.querySelectorAll('[data-level]');
  const materials = document.querySelectorAll('[data-material]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const hints = {
    inspect: 'Bấm vào đất để thị trưởng di chuyển. Bấm vào nhà để chọn.',
    place: 'Bấm một ô cỏ để chọn vị trí, rồi bấm Đặt.',
    road: 'Chọn mặt đường rồi kéo trên bản đồ.',
  };
  let scene;
  try {
    scene = TownScene.create(canvas, label, document.querySelector('#scene-fade'));
  } catch (error) {
    console.error(error);
    status.textContent = 'Không mở được bản đồ 3D. Hãy mở index.html từ thư mục demo bằng trình duyệt hỗ trợ WebGL.';
    return;
  }

  const state = {
    house: { ...model.initialHouse }, roads: model.initialRoads(), roadRevision: 0,
    mode: 'inspect', material: 'dirt', draft: null, pinned: false, hover: null,
    selected: false, press: null,
  };
  let stroke = null;

  function sync(message) {
    const outdoors = scene.phase === 'town';
    const built = state.house.level > 0;
    const inspecting = outdoors && state.mode === 'inspect';
    dock.inert = !outdoors && scene.phase !== 'inside';
    for (const button of modeButtons) button.setAttribute('aria-pressed', state.mode === button.dataset.mode);
    for (const button of levelButtons) button.setAttribute('aria-pressed', (state.draft ?? state.house).level === Number(button.dataset.level));
    for (const button of materials) button.setAttribute('aria-pressed', state.material === button.dataset.material);
    document.querySelector('#mode-tools').hidden = !outdoors;
    document.querySelector('[data-mode="place"]').hidden = !built;
    houseTools.hidden = !outdoors || !built || !(state.mode === 'place' || (inspecting && state.selected));
    placeTools.hidden = !outdoors || state.mode !== 'place';
    roadTools.hidden = !outdoors || state.mode !== 'road';
    buildButton.hidden = !inspecting || built;
    enterButton.hidden = !inspecting || !built || !state.selected;
    contextTools.hidden = houseTools.hidden && placeTools.hidden && roadTools.hidden && enterButton.hidden;
    leaveButton.hidden = scene.phase !== 'inside';
    placeButton.disabled = !state.pinned || !!model.placementError(state.draft, state.roads);
    label.hidden = !inspecting || !state.selected;
    labelName.textContent = built ? 'Nhà ở' : 'Lô xây nhà';
    labelLevel.hidden = !built;
    labelLevel.textContent = `Lv${state.house.level}`;
    status.textContent = message ?? (inspecting && !built ? 'Việc đầu tiên của thị trưởng là xây căn nhà Lv1.' : hints[state.mode]);
  }

  function setMode(mode) {
    state.mode = mode;
    state.selected = false;
    state.press = null;
    state.hover = null;
    state.pinned = false;
    state.draft = mode === 'place' ? { ...state.house } : null;
    stroke = null;
    sync();
  }

  function chooseLot(cell) {
    const offset = Math.floor(model.footprint(state.draft) / 2);
    state.draft.x = cell.x - offset;
    state.draft.z = cell.z - offset;
    return model.placementError(state.draft, state.roads);
  }

  function rotate() {
    const house = state.draft ?? state.house;
    const next = { ...house, rotation: (house.rotation + 1) % 4 };
    const error = model.placementError(next, state.roads);
    if (state.draft) state.draft = next;
    else if (!error) state.house = next;
    sync(error || `Hướng nhà ${next.rotation * 90}°. ${state.mode === 'place' ? hints.place : 'Bấm vào nhà để chọn.'}`);
  }

  for (const button of modeButtons) button.addEventListener('click', () => setMode(button.dataset.mode));
  for (const button of materials) {
    button.addEventListener('click', () => {
      state.material = button.dataset.material;
      sync(state.material === 'erase' ? 'Kéo qua đoạn đường muốn xóa.' : hints.road);
    });
  }
  for (const button of levelButtons) {
    button.addEventListener('click', () => {
      const next = { ...(state.draft ?? state.house), level: Number(button.dataset.level) };
      const error = model.placementError(next, state.roads);
      if (state.draft) state.draft = next;
      else if (!error) state.house = next;
      sync(error || `Đang xem Lv${next.level}.`);
    });
  }
  document.querySelector('#rotate').addEventListener('click', rotate);
  document.querySelector('#cancel').addEventListener('click', () => setMode('inspect'));
  buildButton.addEventListener('click', () => {
    const next = { ...state.house, level: 1 };
    const error = model.placementError(next, state.roads);
    if (error) { sync(error); return; }
    state.house = next;
    state.selected = false;
    state.press = null;
    sync('Đã xây nhà Lv1. Bấm vào nhà để mở công cụ.');
  });
  enterButton.addEventListener('click', () => {
    if (!scene.enter(state)) sync('Thị trưởng chưa có lối đi đến cửa nhà.');
  });
  leaveButton.addEventListener('click', scene.leave);
  scene.onPhase(phase => {
    state.selected = false;
    state.press = null;
    const messages = {
      entering: 'Thị trưởng đang đi đến cửa nhà…',
      inside: 'Bấm vào sàn để di chuyển trong nhà.',
      leaving: 'Thị trưởng đang đi ra cửa…',
      returning: 'Thị trưởng đang bước ra ngoài…',
    };
    sync(messages[phase]);
  });
  placeButton.addEventListener('click', () => {
    if (state.mode !== 'place' || !state.pinned || model.placementError(state.draft, state.roads)) return;
    state.house = { ...state.draft };
    setMode('inspect');
    sync('Đã đặt nhà. Bấm vào nhà để chọn.');
  });
  window.addEventListener('keydown', event => {
    if (scene.phase === 'inside' && event.key === 'Escape') scene.leave();
    if (scene.phase !== 'town') return;
    if (event.key === 'Escape') setMode('inspect');
    if (event.key.toLowerCase() === 'r' && !event.repeat && state.mode !== 'road' && state.house.level) rotate();
  });

  function paint(cell) {
    const result = model.paintRoad(state.roads, state.house, state.material, stroke.last, cell);
    stroke.last = result.last;
    state.roadRevision++;
    status.textContent = result.error || (state.material === 'erase' ? 'Đang xóa đường.' : 'Đang vẽ đường.');
  }

  canvas.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    if (scene.phase !== 'town' && scene.phase !== 'inside') return;
    const point = scene.pointAt(event);
    if (!point) return;
    if (scene.phase === 'inside') {
      scene.move(point, state);
      return;
    }
    const cell = model.cellAt(point);
    state.hover = cell;
    if (state.mode === 'place') {
      const error = chooseLot(cell);
      state.pinned = !error;
      sync(error || 'Đã chọn vị trí. Bạn có thể xoay, đặt hoặc chọn ô khác.');
    } else if (state.mode === 'road') {
      canvas.setPointerCapture(event.pointerId);
      stroke = { pointer: event.pointerId, last: null };
      paint(cell);
    } else {
      state.selected = scene.hitHouse();
      state.press = state.selected ? { started: performance.now(), released: null, pointer: event.pointerId } : null;
      if (state.press) canvas.setPointerCapture(event.pointerId);
      else scene.move(point, state);
      sync(state.selected && state.house.level ? 'Bấm vào đất để bỏ chọn nhà.' : undefined);
    }
  });

  canvas.addEventListener('pointermove', event => {
    if (!event.isPrimary || scene.phase !== 'town' || state.mode === 'inspect') return;
    const point = scene.pointAt(event);
    if (!point) return;
    const cell = model.cellAt(point);
    if (state.hover && model.key(state.hover) === model.key(cell)) return;
    state.hover = cell;
    if (state.mode === 'place' && !state.pinned) status.textContent = chooseLot(cell) || hints.place;
    if (stroke?.pointer === event.pointerId) paint(cell);
  });

  function release(event) {
    if (state.press?.pointer === event.pointerId && state.press.released === null) state.press.released = performance.now();
    if (stroke?.pointer === event.pointerId) stroke = null;
  }
  for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) canvas.addEventListener(event, release);
  canvas.addEventListener('pointerleave', () => { state.hover = null; });

  new ResizeObserver(scene.resize).observe(canvas);
  scene.resize();
  sync();
  function frame(time) {
    scene.draw(state, time, reducedMotion.matches);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
