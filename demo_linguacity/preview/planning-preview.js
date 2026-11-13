import * as THREE from 'three';
import { cellAt, cellKey, changeSurface, buildLaneGraph, crossSection, materials,
  junctionStyleOptions, paintStrip, roadSections, sameCell, segmentAt, X, Z } from './roads';
import { bounds, defaultBusLevel, gradeError, lotAt, lots, measureCell, roadError, roadsAtLevel,
  sampleRoads, terraceTrail, zoneAt } from './planning-layout';
import { cellLayer, flattenGridLines, laneLines, ribbonLayer, streetMesh } from './streets';
import { flattenPlanPreview } from './flatten-preview';
import { makeTraffic } from './planning-traffic';
import { closestHillRoad, connectHillRoad, hillRoadLength, hillRoadMaterial, hillRoadSamples } from './hill-road';
import { closestStreamPath, connectStreamPath, streamFloor, streamPathOpen } from './west-bank';
import { waterAt } from './terrain';
import { extendStroke, limitBridgeStroke, planRoadStroke, planSlicedRoad, roadPrefix, roadRange, sliceRoadStroke, snapRoadEndpoints } from './road-drawing';
import { findRoadDetour } from './road-detour';
import { makeTerrainEditor } from './terrain-edit';
import { bridgeName, buildRetainingWalls, roadSurface } from './road-structures';
import { applyRoadVisual, roundedRoadVisual } from './road-visual';
import { withoutRoadCurves } from './road-shapes';
import { strokeRibbon } from './stroke-ribbon';

const zoneColors = { core: '#92c67a', expansion: '#e2c672', terrace: '#dfcf9c', slope: '#ae775a', buffer: '#c5a880', water: '#5699ae' };
const zoneNames = { core: 'Lõi có thể xây', expansion: 'Vùng mở rộng', terrace: 'Đất chuyển cao độ',
  slope: 'Sườn dốc', buffer: 'Vùng đệm cảnh quan', water: 'Mặt nước' };
const materialNames = { dirt: 'Đất', stone: 'Đá lát', asphalt: 'Nhựa' };
const flattenColors = {
  level: new THREE.Color('#00e5ff'),
  fill: new THREE.Color('#ffffff'),
  shallowCut: new THREE.Color('#ffab87'),
  deepCut: new THREE.Color('#ff5722'),
};
function earthTint(delta) {
  if (Math.abs(delta) <= .025) return flattenColors.level;
  if (delta < 0) return flattenColors.fill;
  return flattenColors.shallowCut.clone().lerp(flattenColors.deepCut, THREE.MathUtils.clamp((delta - .025) / .775, 0, 1));
}
const townBounds = { left: -24, right: 22, top: -25, bottom: 20 };
export function mountPlanning({ scene, canvas, surfaceY, blockers, town }) {
  const saveKey = town ? 'linguacity-demo-built-town-v1' : 'linguacity-demo-planning-v3';
  const roadSample = town ? town.roadSample : sampleRoads;
  const checkGrade = sections => town ? gradeError(sections, surfaceY, town.measure) : gradeError(sections);
  const panel = document.querySelector('#planning-controls');
  const status = document.querySelector('#planning-status');
  const levels = document.querySelector('#bus-level');
  const surfaces = document.querySelector('#road-surface');
  const apply = document.querySelector('#apply-surface');
  const modeButtons = [...document.querySelectorAll('[data-plan-mode]')];
  const zones = document.querySelector('#show-zones');
  const lanes = document.querySelector('#show-lanes');
  const trafficLegend = document.querySelector('#traffic-legend');
  const grid = document.querySelector('#show-grid');
  const roadWidthInput = document.querySelector('#road-width');
  const autoLevel = document.querySelector('#auto-level');
  const flattenSize = document.querySelector('#flatten-size');
  const detourButton = document.querySelector('#suggest-detour');
  const undoButton = document.querySelector('#undo-edit');
  const redoButton = document.querySelector('#redo-edit');
  const strokeMode = document.querySelector('#stroke-mode');
  const roadGesture = document.querySelector('#road-gesture');
  let roadStart = null, rangeOverlay = null;
  const editOptions = document.querySelector('#edit-options');
  const optionList = document.querySelector('#edit-option-list');
  const terrainEditor = town && makeTerrainEditor(town.terrain);
  const scenery = town?.terrain.scenery;
  const billableScenery = new Set(blockers.filter(item => Number.isInteger(item.sceneryId)).map(item => item.sceneryId));
  const undoStack = [], redoStack = [];
  const group = new THREE.Group();
  let pavedHeight = surfaceY;
  const actorHeight = (x, z) => {
    const engineered = town && pavedHeight(x, z);
    if (town && Math.abs(engineered - surfaceY(x, z)) > 1e-5) return engineered;
    const hillRoad = hillRoadMaterial(roads) && closestHillRoad(x, z, town?.hillRoute);
    if (hillRoad && hillRoad.distance <= 1) return (town ? Math.max(hillRoad.height, surfaceY(x, z)) : hillRoad.height) + .016;
    if (town) return town.landscape.height(x, z);
    if (streamPathOpen(roads)) {
      const bridge = streamFloor(x, z);
      if (bridge !== null) return bridge;
      const approach = closestStreamPath(x, z);
      if (approach && approach.distance <= .45) return approach.height - .010;
    }
    return surfaceY(x, z);
  };
  const traffic = makeTraffic(actorHeight, town?.trips);
  group.add(traffic.group);
  scene.add(group);
  panel.hidden = false;
  if (town) {
    zones.checked = false;
    zones.closest('label').hidden = true;
    grid.closest('label').hidden = true;
    panel.querySelector('.planning-legend').hidden = true;
  }

  const allCells = [];
  for (let z = bounds.top; !town && z <= bounds.bottom; z++) {
    for (let x = bounds.left; x <= bounds.right; x++) {
      const cell = { x, z };
      const zone = zoneAt(cell);
      if (zone === 'water') continue;
      const lot = lotAt(cell);
      const blocked = blockers.some(item => intersects(cell, item));
      if (zone === 'buffer' && !lot && !blocked) continue;
      allCells.push({ ...cell, color: lot ? (lot.future ? '#f5ce68' : '#ffda91') : zoneColors[blocked ? 'buffer' : zone] });
    }
  }
  const boundaries = [];
  for (const { x, z, w, d } of town ? [] : lots) {
    for (const [ax, az, bx, bz] of [[x, z, x + w, z], [x + w, z, x + w, z + d],
      [x + w, z + d, x, z + d], [x, z + d, x, z]]) {
      const steps = 4 * Math.hypot(bx - ax, bz - az);
      for (let step = 0; step < steps; step++) for (const t of [step / steps, (step + 1) / steps]) {
        const px = THREE.MathUtils.lerp(ax, bx, t), pz = THREE.MathUtils.lerp(az, bz, t);
        boundaries.push(px, surfaceY(px, pz) + .055, pz);
      }
    }
  }
  const parcelLines = new THREE.LineSegments(new THREE.BufferGeometry()
    .setAttribute('position', new THREE.Float32BufferAttribute(boundaries, 3)),
  new THREE.LineBasicMaterial({ color: '#968054', transparent: true, opacity: .72, depthWrite: false }));
  parcelLines.renderOrder = 5;
  group.add(parcelLines);
  let roads, viewRoads, level = defaultBusLevel, mode = 'inspect';
  let rendered, graphLines, selected, overlay, discardedOverlay, flattenLines, earthPreview, roadPreview, drag, pending, patches, squares, failedStroke, proposal;
  let lastTime = 0;

  function intersects(cell, item) {
    return Math.hypot(Math.max(cell.x - item.x, 0, item.x - cell.x - 1),
      Math.max(cell.z - item.z, 0, item.z - cell.z - 1)) < item.radius;
  }
  const activeBlocker = item => !scenery?.hidden.has(item.sceneryId);
  function checkCell(cell) {
    if (town && (cell.x < bounds.left || cell.x > bounds.right || cell.z < bounds.top || cell.z > bounds.bottom)) {
      return 'Ngoài phạm vi chỉnh đường của bản đồ.';
    }
    const error = town ? town.error(cell) : roadError(cell);
    if (error) return error;
    const obstacle = blockers.find(item => intersects(cell, item));
    if (obstacle) return obstacle.kind === 'fence' ? 'Chừa hàng rào ở mép dốc.' : 'Giữ khoảng cách với cây hoặc cụm đá.';
    if (town) return '';
    const entrance = (cell.x === 7 || cell.x === 8) && (cell.z === -6 || cell.z === -5);
    if (!entrance && (closestHillRoad(cell.x + .5, cell.z + .5)?.distance ?? Infinity) < 1.52) {
      return 'Chừa hành lang của đường xe lên đồi.';
    }
    const streamEntrance = cell.z === -13 && cell.x >= -7 && cell.x <= -5;
    if (!streamEntrance && (closestStreamPath(cell.x + .5, cell.z + .5)?.distance ?? Infinity) < .65) {
      return 'Chừa lối xuống cầu ven suối.';
    }
    return '';
  }
  function townObstacle(cell) {
    if (cell.x < townBounds.left || cell.x > townBounds.right || cell.z < townBounds.top || cell.z > townBounds.bottom) {
      return 'Ngoài phạm vi chỉnh đường của bản đồ.';
    }
    if (town.overlaps(cell)) return 'Đường chạm công trình hiện có.';
    const current = roads.get(cellKey(cell));
    if (current?.roadCurveId) return 'Nối đường tại đầu dải cong có sẵn.';
    const oldBridge = town.landscape.bridge.some(point => intersects(cell, { ...point, radius: .58 }));
    if (oldBridge || (cell.z < -6 && town.protectedPath(cell.x + .5, cell.z + .5, .12) &&
      closestHillRoad(cell.x + .5, cell.z + .5, town.hillRoute)?.distance < 1.12)) {
      return 'Chừa khoảng trống cho đường đồi hoặc cầu có sẵn.';
    }
    if (blockers.some(item => !Number.isInteger(item.sceneryId) && intersects(cell, item))) return 'Đường chạm cảnh quan được bảo vệ.';
    return '';
  }
  function flattenCellLock(cell) {
    if (cell.x < townBounds.left || cell.x > townBounds.right || cell.z < townBounds.top || cell.z > townBounds.bottom) {
      return 'Vùng san chạm rìa bản đồ.';
    }
    if (roads.has(cellKey(cell)) || town.overlaps(cell) || town.protectedPath(cell.x + .5, cell.z + .5, .07)) {
      return 'Vùng san chạm công trình hoặc lối có sẵn.';
    }
    return false;
  }
  function vertexLock(x, z, protectScenery = true) {
    if (x < townBounds.left || x > townBounds.right + 1 || z < townBounds.top || z > townBounds.bottom + 1) {
      return 'Vùng chỉnh địa hình chạm rìa bản đồ.';
    }
    if (waterAt(x, z) || town.protectedPath(x, z, .07)) return 'Quá sát mặt nước hoặc lối có sẵn.';
    for (const px of [x - .001, x + .001]) for (const pz of [z - .001, z + .001]) {
      const cell = cellAt({ x: px, z: pz });
      if (roads.has(cellKey(cell)) || town.overlaps(cell)) return 'Quá sát công trình hoặc đường hiện có.';
      if (protectScenery && blockers.some(item => activeBlocker(item) && intersects(cell, item))) {
        return 'Quá sát cây hoặc cụm đá.';
      }
    }
    return false;
  }
  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(saveKey));
      if (!data || !Array.isArray(data.roads) || ![1, 2, 3].includes(data.level)) return false;
      const saved = new Map();
      for (const cell of data.roads) {
        if (!Number.isInteger(cell.x) || !Number.isInteger(cell.z) ||
          (!([X, Z, X | Z].includes(cell.axes)) && !(cell.axes === 0 && cell.curveOnly && typeof cell.roadCurveId === 'string')) ||
          !materials.includes(cell.material) || (!town && checkCell(cell))) return false;
        if (town && (cell.x < townBounds.left || cell.x > townBounds.right || cell.z < townBounds.top ||
          cell.z > townBounds.bottom || town.overlaps(cell) ||
          ['roadY', 'roadStartY', 'roadEndY', 'bridgeY'].some(key => cell[key] !== undefined && !Number.isFinite(cell[key])) ||
          (cell.bridgeId !== undefined && (typeof cell.bridgeId !== 'string' || !Number.isFinite(cell.bridgeY) || cell.axes === (X | Z))))) return false;
        saved.set(cellKey(cell), cell);
      }
      const sections = roadSections(saved);
      if (sections.some(section => section.width > 4) || (!town && checkGrade(sections))) return false;
      if (terrainEditor && data.terrain && !terrainEditor.restoreDeltas(data.terrain)) return false;
      if (scenery && Array.isArray(data.hiddenScenery)) scenery.apply(data.hiddenScenery, true);
      roads = saved;
      level = data.level;
      return true;
    } catch {
      return false;
    }
  }
  function store() {
    try {
      localStorage.setItem(saveKey, JSON.stringify({ roads: [...roads.values()], level, terrain: terrainEditor?.heightDeltas(),
        hiddenScenery: scenery && [...scenery.hidden] }));
    } catch {
      status.textContent += ' Trình duyệt chỉ giữ các thay đổi trong phiên này.';
    }
  }

  function remove(item) {
    if (!item) return;
    group.remove(item);
    item.traverse(child => child.geometry?.dispose());
  }
  function renderRoads() {
    viewRoads = roadsAtLevel(roads, level);
    pavedHeight = town ? roadSurface(viewRoads, surfaceY) : surfaceY;
    if (rendered) {
      rendered.group.children.filter(item => item.material?.isMeshBasicMaterial).forEach(item => item.material.dispose());
      remove(rendered.group);
    }
    if (graphLines) {
      graphLines.children.forEach(item => item.material.dispose());
      remove(graphLines);
    }
    for (const layer of [patches, squares]) {
      layer?.material.dispose();
      remove(layer);
    }
    const zonesOnLand = allCells.filter(cell => {
      if (roads.has(cellKey(cell))) return false;
      const x = cell.x + .5, z = cell.z + .5;
      return (closestHillRoad(x, z)?.distance ?? Infinity) >= 1.35 &&
        (closestStreamPath(x, z)?.distance ?? Infinity) >= .83;
    });
    patches = cellLayer(zonesOnLand, surfaceY, { opacity: .30, order: 4 });
    squares = cellLayer(zonesOnLand, surfaceY, { opacity: .42, order: 4, grid: true });
    group.add(patches, squares);
    const walk = buildLaneGraph(viewRoads, 'walk', actorHeight), car = buildLaneGraph(viewRoads, 'car', actorHeight);
    const motorcycle = buildLaneGraph(viewRoads, 'motorcycle', actorHeight);
    connectHillRoad(car, viewRoads, 'car', town?.hillRoute);
    connectHillRoad(motorcycle, viewRoads, 'motorcycle', town?.hillRoute);
    if (town) town.landscape.connect(walk);
    else {
      connectHillRoad(walk, viewRoads, 'walk');
      connectStreamPath(walk, viewRoads);
    }
    rendered = streetMesh(viewRoads, pavedHeight, scenery ? blockers.filter(activeBlocker) : blockers,
      town ? { terrainPaths: false, hillRoute: town.hillRoute, reserved: town.overlaps, groundY: surfaceY } : undefined);
    if (town) {
      const original = new Map(terrainEditor.heightDeltas().map(({ index, oldY }) => [index, oldY]));
      if (original.size) {
        const retaining = buildRetainingWalls(viewRoads, pavedHeight, surfaceY, (x, z) => surfaceY(x, z, original));
        if (retaining) rendered.group.add(retaining);
      }
    }
    graphLines = new THREE.Group();
    traffic.setRoads(viewRoads, walk, car, motorcycle);
    graphLines.add(laneLines(walk, actorHeight, '#237c64'), laneLines(car, actorHeight, '#344f9e'),
      laneLines(motorcycle, actorHeight, '#af4826', (a, b) =>
        (!a.id.startsWith('roundabout:') || !b.id.startsWith('roundabout:')) &&
        ([1, 3].includes(a.section.width) || [1, 3].includes(b.section.width))));
    group.add(rendered.group, graphLines);
    showLayers();
  }
  function showLayers() {
    patches.visible = zones.checked && !grid.checked;
    squares.visible = zones.checked && grid.checked;
    parcelLines.visible = zones.checked;
    graphLines.visible = lanes.checked;
    if (trafficLegend) trafficLegend.hidden = !lanes.checked;
  }
  function mark(cells, color, height = pavedHeight, opacity = .61) {
    overlay?.material.dispose();
    remove(overlay);
    overlay = null;
    if (!cells.length) return;
    overlay = cellLayer(cells.map(cell => ({ ...cell, color: cell.color ?? color })), height,
      { opacity, grid: true, elevation: .081, order: 5 });
    group.add(overlay);
  }
  function unlock() {
    levels.value = String(level);
    for (const [i, option] of [...surfaces.options].entries()) option.disabled = i >= level;
    if (surfaces.selectedIndex >= level) surfaces.value = 'dirt';
    apply.disabled = !selected?.length;
    if (town) {
      undoButton.disabled = !undoStack.length || !!pending || !!drag || !!proposal;
      redoButton.disabled = !redoStack.length || !!pending || !!drag || !!proposal;
    }
  }
  function clearTrialVisuals() {
    mark([], '');
    discardedOverlay?.material.dispose();
    remove(discardedOverlay);
    discardedOverlay = null;
    flattenLines?.material.dispose();
    remove(flattenLines);
    flattenLines = null;
    earthPreview?.traverse(child => child.material?.dispose());
    remove(earthPreview);
    earthPreview = null;
    if (roadPreview) {
      roadPreview.traverse(child => child.material?.dispose());
      remove(roadPreview);
      roadPreview = null;
    }
  }
  function clearProposal() {
    proposal = null;
    editOptions.hidden = true;
    optionList.replaceChildren();
    clearTrialVisuals();
  }
  function clearRoadStart() {
    roadStart = null;
    rangeOverlay?.traverse(item => item.material?.dispose());
    remove(rangeOverlay);
    rangeOverlay = null;
  }

  function showRoadRange(origin) {
    clearRoadStart();
    roadStart = { origin, ...roadRange(origin, townBounds) };
    rangeOverlay = new THREE.Group();
    const vertices = [];
    const { outline } = roadStart;
    for (const [i, a] of outline.entries()) {
      const b = outline[(i + 1) % outline.length];
      const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / .5));
      for (let n = 0; n < steps; n++) for (const t of [n / steps, (n + 1) / steps]) {
        const x = THREE.MathUtils.lerp(a[0], b[0], t), z = THREE.MathUtils.lerp(a[1], b[1], t);
        vertices.push(x, Math.max(surfaceY(x, z), waterAt(x, z)?.y ?? -Infinity) + .14, z);
      }
    }
    const boundary = new THREE.LineSegments(new THREE.BufferGeometry()
      .setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)),
    new THREE.LineBasicMaterial({ color: '#72edff', transparent: true, opacity: .85, depthTest: false }));
    const pin = new THREE.Mesh(new THREE.RingGeometry(.28, .41, 24),
      new THREE.MeshBasicMaterial({ color: '#72edff', depthTest: false, side: THREE.DoubleSide }));
    pin.rotation.x = -Math.PI / 2;
    pin.position.set(origin[0], Math.max(surfaceY(...origin), waterAt(...origin)?.y ?? -Infinity) + .16, origin[1]);
    boundary.renderOrder = pin.renderOrder = 8;
    rangeOverlay.add(boundary, pin);
    group.add(rangeOverlay);
  }

  function setMode(next) {
    pending = null;
    traffic.restrict([]);
    mode = next;
    selected = null;
    if (town) {
      clearProposal();
      clearRoadStart();
      drag = null;
      flattenSize.closest('label').hidden = next !== 'flatten';
      if (roadGesture) roadGesture.closest('label').hidden = next !== 'draw';
      strokeMode.closest('label').hidden = next !== 'slope' && (next !== 'draw' || roadGesture?.value === 'points');
      failedStroke = null;
      detourButton.hidden = true;
    } else mark([], '');
    for (const button of modeButtons) button.setAttribute('aria-pressed', String(button.dataset.planMode === mode));
    canvas.dataset.planMode = mode;
    unlock();
    status.textContent = {
      inspect: town ? 'Kéo để xem bản đồ. Bấm công trình hoặc đường để xem thông tin.' :
        'Kéo để xem bản đồ. Bấm một lô hoặc đoạn đường để kiểm tra.',
      draw: town ? (roadGesture?.value === 'points' ? 'Chấm A, rồi chấm B trong phạm vi 60 đơn vị. Kéo để dịch camera.' :
        'Chọn bề rộng rồi kéo. Tim tuyến dài tối đa 60 đơn vị.') :
        'Kéo một dải thẳng. Vẽ dải song song sát bên để tăng bề rộng.',
      erase: town ? 'Kéo qua đoạn muốn xóa. Chạm một phần cầu để xóa cả cầu và đường dẫn.' :
        'Kéo qua dải muốn xóa. Các dải liền kề sẽ tính lại bề rộng.',
      upgrade: 'Bấm đoạn cần đổi mặt, chọn vật liệu rồi bấm Áp dụng.',
      flatten: 'Chạm để dùng cỡ vùng san, hoặc kéo một vùng tối đa 12×12. Ô đầu quyết định cao độ.',
      slope: 'Chọn bề rộng rồi kéo từ chân lên đỉnh hoặc ngược lại. Chọn Vẽ tự do để uốn quanh sườn đồi.',
    }[mode];
  }
  function showLot(lot) {
    const cells = [];
    for (let z = lot.z; z < lot.z + lot.d; z++) for (let x = lot.x; x < lot.x + lot.w; x++) cells.push({ x, z });
    mark([...cells, lot.gate], '#fed98c');
    const gate = viewRoads.get(cellKey(lot.gate));
    const access = gate ? (roadWidth(gate) >= 2 ? 'Tiếp cận bằng đường xe.' : 'Tiếp cận bằng lối đi bộ.') :
      'Lối vào đang thiếu đường nối.';
    status.textContent = `Lô trống · ${lot.w} × ${lot.d} ô. ${access}`;
  }
  function roadWidth(cell) {
    if (cell.roadCurveId) {
      const curve = [...viewRoads.values()].find(road => road.roadCurve?.id === cell.roadCurveId)?.roadCurve;
      if (curve) return curve.width;
    }
    return Math.max(1, ...[X, Z].filter(axis => cell.axes & axis).map(axis => crossSection(roads, cell, axis).width));
  }
  function inspect(cell, building) {
    if (!cell) return;
    const road = viewRoads.get(cellKey(cell));
    if (mode === 'upgrade') {
      selected = segmentAt(viewRoads, cell);
      mark(selected, '#ffd071');
      unlock();
      status.textContent = selected.length ? `Đã chọn ${selected.length} ô đường ${materialNames[road.material].toLowerCase()}. Chọn vật liệu để áp dụng.` :
        'Chọn một nhánh giữa hai nút giao, hoặc một đoạn tới đầu cụt.';
    } else if (building) {
      mark([], '');
      status.textContent = building.name;
    } else if (road) {
      mark(segmentAt(viewRoads, cell), '#ffd071');
      const width = roadWidth(road);
      const flow = { 1: 'Đi bộ và xe máy', 2: 'Đi bộ và làn chung ô tô, xe máy',
        3: 'Đi bộ, xe máy bên phải và ô tô riêng' }[width] ?? 'Đi bộ và xe cơ giới';
      const surface = road.bridgeId
        ? bridgeName([...viewRoads.values()].filter(cell => cell.bridgeId === road.bridgeId))
        : materialNames[road.material];
      status.textContent = `${surface} · ${width}× · ${flow}.`;
    } else if (town) {
      mark([], '');
      status.textContent = 'Kéo để xem bản đồ. Bấm công trình hoặc đường để xem thông tin.';
    } else {
      const lot = lotAt(cell);
      if (lot) {
        showLot(lot);
      } else {
        const zone = zoneAt(cell), measure = measureCell(cell);
        const error = checkCell(cell);
        mark([cell], error ? '#d78769' : '#e3d582');
        const foundation = zone === 'terrace' ? ' Kiểm tra độ chênh toàn lô trước khi chọn móng bậc.' : '';
        status.textContent = `${zoneNames[zone]} · Cao độ ${measure.low.toFixed(2)}–${measure.high.toFixed(2)}.${foundation} ${error}`;
      }
    }
  }

  function preview(to) {
    if (!to) return;
    const from = drag.from;
    if (!drag.axis && !sameCell(from, to)) drag.axis = Math.abs(to.x - from.x) >= Math.abs(to.z - from.z) ? X : Z;
    const axis = drag.axis ?? X;
    const end = axis === X ? { x: to.x, z: from.z } : { x: from.x, z: to.z };
    const material = mode === 'erase' ? 'erase' : surfaces.value;
    const trial = paintStrip(roads, from, end, material, checkCell, axis);
    const touched = section => section.cells.some(cell => trial.cells.some(changed => sameCell(cell, changed)));
    const sections = trial.error ? [] : roadSections(trial.roads).filter(touched);
    const removed = !trial.error && mode === 'erase' ? roadSections(roads).filter(touched) : [];
    const error = trial.error || checkGrade(sections);
    const affected = [...new Map([...trial.cells, ...[...sections, ...removed].flatMap(section => section.cells)]
      .map(cell => [cellKey(cell), cell])).values()];
    drag.trial = { ...trial, error, affected };
    mark(affected, error ? '#db7d60' : mode === 'erase' ? '#dbbc81' : '#e4d575');
    status.textContent = error || (mode === 'erase' ? `Xóa ${trial.cells.length} ô theo nét kéo.` : `Xem trước · rộng tới ${trial.width}×.`);
  }

  function eraseStroke(cells) {
    const spans = new Set(cells.map(cell => {
      const road = roads.get(cellKey(cell));
      return road?.bridgeId ?? road?.approachBridgeId;
    }).filter(Boolean));
    const affected = new Map(cells.map(cell => [cellKey(cell), cell]));
    for (const [key, road] of roads) {
      if (spans.has(road.bridgeId ?? road.approachBridgeId)) affected.set(key, road);
    }
    const next = new Map(withoutRoadCurves(roads, [...affected.keys()]));
    for (const [key, road] of roads) if (!next.has(key)) affected.set(key, road);
    for (const key of affected.keys()) next.delete(key);
    return { roads: next, cells: [...affected.values()], changes: [], error: '', width: 1 };
  }

  function withScenery(trial, core = trial.cells, transition = [], clearRoadEdges = false) {
    const ids = new Set(trial.error ? [] : scenery.removals(core, trial.changes, transition));
    if (clearRoadEdges && !trial.error) {
      for (const item of blockers) {
        if (Number.isInteger(item.sceneryId) && activeBlocker(item) && core.some(cell => intersects(cell, item))) {
          ids.add(item.sceneryId);
        }
      }
    }
    return { ...trial, scenery: [...ids].map(id => ({ id, hidden: true })) };
  }

  function roadTrial(cells, { centerline, ...extra } = {}) {
    const options = { roads, cells, width: Number(roadWidthInput.value), material: surfaces.value,
      surfaceY, waterAt, obstacle: townObstacle, allowLeveling: autoLevel.checked, assisted: true, ...extra };
    const solve = config => {
      if (!centerline) return planRoadStroke(config);
      if (!config.elevated) {
        const sliced = planSlicedRoad({ ...config, route: centerline });
        if (!sliced.legacyBridge) return { ...sliced, length: centerline.length };
      }
      return { ...limitBridgeStroke(planRoadStroke(config), centerline), legacyBridge: true };
    };
    const trial = solve(options);
    if (trial.error || !trial.gradeEdits.length) return withScenery({ ...trial, changes: [] }, trial.cells, [], true);
    const earth = terrainEditor.planRoad(trial.gradeEdits, (x, z) => vertexLock(x, z, false));
    if (earth.error) return { ...trial, error: earth.error, errorCell: earth.errorCell, changes: [] };
    const overrides = new Map(earth.changes.map(({ index, newY }) => [index, newY]));
    const after = solve({ ...options, cells: trial.route ?? cells,
      surfaceY: (x, z) => surfaceY(x, z, overrides), allowLeveling: false });
    if (after.error) return { ...after, changes: [] };
    const core = after.cells.filter(cell => !after.roads.get(cellKey(cell))?.bridgeId);
    const keys = new Set(core.map(cellKey));
    return withScenery({ ...after, core, transition: earth.cells.filter(cell => !keys.has(cellKey(cell))),
      changes: earth.changes }, after.cells, earth.cells, true);
  }

  function gradeRoad(centerline, mode) {
    const width = Number(roadWidthInput.value);
    let last;
    for (const shoulder of [1.25, 2.25]) {
      const earth = terrainEditor.planRoadCorridor(centerline, { mode, width, shoulder,
        isLocked: (x, z) => vertexLock(x, z, false) });
      if (earth.error || !earth.changes.length) return earth;
      const overrides = new Map(earth.changes.map(({ index, newY }) => [index, newY]));
      const road = planSlicedRoad({ roads, route: centerline, width, material: surfaces.value,
        surfaceY: (x, z) => surfaceY(x, z, overrides), waterAt, obstacle: townObstacle });
      if (!road.error) return withScenery({ ...earth, ...road, length: centerline.length }, road.cells, earth.transition, true);
      last = { ...road, error: earth.blocked?.reason ?? road.error,
        errorCell: earth.blocked?.cell ?? road.errorCell, changes: [] };
    }
    return last;
  }

  function roadCandidates({ cells, centerline }) {
    let trial = roadTrial(cells, { centerline });
    const decorate = item => centerline && !item.legacyBridge ? { ...item, visualRoute: centerline } : item;
    trial = decorate(trial);
    const candidates = [];
    if (!trial.error) {
      candidates.push({
        trial,
        kind: trial.bridges?.length ? 'bridge' : trial.changes.length ? 'light-grade' : 'flat',
        label: trial.bridges?.length ? 'Đường và cầu' :
          trial.changes.length ? 'Làm dốc nhẹ theo đường' : 'Đường theo ô',
      });
    }
    const canCorridorGrade = autoLevel.checked && centerline && !centerline.error && !trial.legacyBridge &&
      !trial.bridges?.length &&
      !centerline.cells.some(cell => townObstacle(cell) && !roads.get(cellKey(cell))?.roadCurveId);
    if (canCorridorGrade) {
      const kinds = centerline.length <= 24 ? ['slope', 'flatten'] : ['slope'];
      const graded = kinds.map(kind => ({
        kind,
        label: kind === 'flatten' ? 'San phẳng' : 'Làm dốc',
        trial: decorate(gradeRoad(centerline, kind)),
      }));
      for (const item of graded) {
        if (!item.trial.error && item.trial.changes.length) {
          candidates.push(item);
        }
      }
      if (!candidates.length) {
        const failure = graded.find(option => option.trial.error)?.trial;
        if (failure?.error && failure.error !== trial.error) trial = { ...trial, note: failure.error };
      }
    }
    return { trial, candidates };
  }

  function showTownTrial(trial, released = false, softShoulder = false) {
    clearTrialVisuals();
    const flattening = mode === 'flatten';
    const earthwork = flattening || mode === 'slope' || (mode === 'draw' && trial.core && trial.changes.length);
    const skipped = new Map((trial.skipped ?? []).map(cell => [cellKey(cell), cell]));
    if (flattening && trial.errorCell) skipped.set(cellKey(trial.errorCell), trial.errorCell);
    const overrides = new Map(trial.changes.map(({ index, newY }) => [index, newY]));
    const plannedGround = (x, z) => surfaceY(x, z, overrides);
    const colors = new Map((trial.cells ?? []).map(cell => [cellKey(cell),
      { ...cell, color: trial.roads?.get(cellKey(cell))?.bridgeId ? '#80cbe4' : trial.changes.length ? '#edc368' : '#a0db87' }]));
    if (trial.core) {
      for (const cell of trial.transition ?? []) colors.set(cellKey(cell), { ...cell, color: '#c6b47f' });
      for (const cell of trial.core) {
        const x = cell.x + .5, z = cell.z + .5;
        const target = trial.targetAt?.(x, z) ?? trial.targetY ?? plannedGround(x, z);
        const tint = earthwork ? earthTint(surfaceY(x, z) - target) : '#83cd93';
        colors.set(cellKey(cell), { ...cell, color: tint });
      }
    }
    if (trial.errorCell && !flattening) colors.set(cellKey(trial.errorCell), { ...trial.errorCell, color: '#d66c58' });
    const previewGround = (x, z) => Math.max(surfaceY(x, z), surfaceY(x, z, overrides));
    const elevation = mode === 'erase' ? pavedHeight : trial.roads ? roadSurface(trial.roads, previewGround) : previewGround;
    const visibleSurface = (x, z) => Math.max(elevation(x, z), waterAt(x, z)?.y ?? -Infinity);
    if (trial.ribbon) {
      if (trial.errorCell) mark([trial.errorCell], '#ff5722', surfaceY, .25);
      const currentSurface = (x, z) => Math.max(surfaceY(x, z), waterAt(x, z)?.y ?? -Infinity);
      const tint = trial.error ? '#ff5722' : trial.targetAt ? (x, z) => earthTint(surfaceY(x, z) - trial.targetAt(x, z)) : '#00e5ff';
      const opacity = released && mode === 'draw' ? .10 : .25;
      earthPreview = ribbonLayer(trial.ribbon, currentSurface, tint, opacity, trial.error ? '#ff7665' : '#fffdf5');
      group.add(earthPreview);
    } else if (earthwork) {
      const fill = [...colors.values()].filter(cell => !skipped.has(cellKey(cell)));
      const currentSurface = (x, z) => Math.max(surfaceY(x, z), waterAt(x, z)?.y ?? -Infinity);
      mark(fill, '#a0db87', currentSurface, .25);
      if (fill.length || skipped.size) {
        const gridCells = released ? trial.core ?? [] : fill;
        flattenLines = flattenGridLines(gridCells, skipped.values(), currentSurface);
        group.add(flattenLines);
      }
    } else {
      mark([...colors.values()], '#a0db87', visibleSurface, released ? (trial.roadVisual ? .12 : .35) : .61);
    }
    if (earthwork && released && trial.core?.length && !trial.error) {
      const target = flattening ? trial : { ...trial, targetAt: plannedGround };
      const projected = flattenPlanPreview(target, plannedGround, softShoulder || !flattening);
      if (earthPreview) earthPreview.add(projected);
      else { earthPreview = projected; group.add(earthPreview); }
    }
    if (trial.discarded?.length) {
      discardedOverlay = cellLayer(trial.discarded.map(cell => ({ ...cell, color: '#eb645b' })), visibleSurface,
        { opacity: .28, grid: true, elevation: .085, order: 5 });
      group.add(discardedOverlay);
    }
    if (released && mode === 'draw' && !trial.error) {
      const edited = new Map(trial.cells.map(cell => [cellKey(cell), trial.roads.get(cellKey(cell))]).filter(([, road]) => road));
      if (trial.junctionStyle) {
        for (const road of trial.roads.values()) {
          if (road.junctionStyle && road.junctionStyle !== roads.get(cellKey(road))?.junctionStyle) {
            for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) {
              const key = cellKey({ x: road.x + dx, z: road.z + dz });
              const neighbor = trial.roads.get(key);
              if (neighbor) edited.set(key, neighbor);
            }
          }
        }
      }
      roadPreview = streetMesh(edited, roadSurface(trial.roads, (x, z) => surfaceY(x, z, overrides)), [],
        { terrainPaths: false, groundY: surfaceY, preview: true }).group;
      roadPreview.traverse(child => {
        if (!child.material) return;
        const material = child.material.clone();
        if (child.material.isMeshBasicMaterial) child.material.dispose();
        child.material = material;
        material.transparent = true;
        material.opacity = trial.roadVisual ? .92 : .62;
        material.depthWrite = false;
        child.castShadow = false;
        child.renderOrder = 6;
      });
      group.add(roadPreview);
    }
    if (released && trial.scenery?.length) {
      for (const point of scenery.points(trial.scenery.map(edit => edit.id).filter(id => billableScenery.has(id)))) {
        const marker = new THREE.Mesh(new THREE.RingGeometry(.16, .22, 12),
          new THREE.MeshBasicMaterial({ color: '#c8574e', transparent: true, opacity: .8, depthTest: false }));
        marker.rotation.x = -Math.PI / 2;
        marker.position.set(point.x, surfaceY(point.x, point.z) + .08, point.z);
        marker.renderOrder = 7;
        if (!roadPreview) { roadPreview = new THREE.Group(); group.add(roadPreview); }
        roadPreview.add(marker);
      }
    }
    status.textContent = trial.error ? `${trial.error}${trial.errorCell ? ` · Ô (${trial.errorCell.x}, ${trial.errorCell.z})` : ''}${trial.note ? ` ${trial.note}` : ''}` : (mode === 'draw' ?
      `Xem trước · ${trial.width}×${Number.isFinite(trial.length) ? ` · ${trial.length.toLocaleString('vi-VN', { maximumFractionDigits: 1 })}/60 đơn vị` : ''}${trial.bridges?.length ? ` · ${trial.bridges.length} cầu` : ''}${trial.changes.length ? ' · có chỉnh nền' : ''}.${trial.note ? ` ${trial.note}` : ''}` :
      mode === 'erase' ? `Xem trước xóa ${trial.cells.length} ô.` :
      mode === 'slope' ? `Dốc ${Math.round((trial.grade ?? 0) * 100)}% · ${trial.ribbon ? `rộng ${trial.ribbon.width}× · ` : ''}${trial.core?.length ?? 0} ô.` :
      trial.core ? `San ${trial.core.length} ô · viền ${trial.transition.length} ô${trial.skipped?.length ? ` · bỏ qua ${trial.skipped.length} ô` : ''}${trial.capped ? ' · giới hạn 12×12' : ''}.` :
      `Xem trước · ${trial.changes.length} đỉnh địa hình thay đổi.`);
  }

  function brushTrial({ from, cells }, to, extra = {}) {
    const trial = terrainEditor.planBrush({ mode, from, to, size: Number(flattenSize.value),
      cells: mode === 'slope' ? cells : undefined, isLocked: (x, z) => vertexLock(x, z, false),
      lockCell: flattenCellLock, ...extra });
    return withScenery({ ...trial, roads }, trial.core ?? [], trial.transition);
  }

  function ribbonTrial(stroke, extra = {}) {
    const ribbon = strokeRibbon(stroke.points, Number(roadWidthInput.value), 1);
    if (ribbon.error) return { changes: [], cells: [], error: ribbon.error };
    return brushTrial(stroke, stroke.last, { ribbon, ...extra });
  }

  function roadStroke(points) {
    const width = Number(roadWidthInput.value);
    const centerline = sliceRoadStroke(snapRoadEndpoints(points, roads, width), width);
    return strokeFor(centerline);
  }

  function strokeFor(centerline) {
    const cells = centerline.points.reduce((path, [x, z]) => extendStroke(path, cellAt({ x, z })), []);
    return { centerline, cells };
  }

  function roadPartBeforeBuilding(stroke, pointMode) {
    if (stroke.centerline?.error || !stroke.centerline) return null;
    const part = roadPrefix(stroke.centerline, Number(roadWidthInput.value), cell => town.overlaps(cell));
    if (!part) return null;
    const result = part.route ? roadCandidates(strokeFor(part.route)) : { candidates: [] };
    const at = `Ô (${part.blocked.x}, ${part.blocked.z})`;
    const note = pointMode ? `${at} vướng công trình. Chưa nối tới B.` : `${at} vướng công trình. Chỉ xây đoạn phía trước.`;
    return { ...part, candidates: result.candidates.map(({ trial, label }) => ({
      label: label === 'Đường theo ô' ? 'Đến trước công trình' : label,
      trial: { ...trial, discarded: part.discarded, errorCell: part.blocked, note },
    })) };
  }

  function chooseRoadEnd(point) {
    if (!point) return;
    const end = [point.x, point.z];
    if (!roadStart) {
      if (!roadRange(end, townBounds).contains(end)) {
        status.textContent = 'Chọn A trong phạm vi chỉnh đường.';
        return;
      }
      showRoadRange(end);
      status.textContent = 'Đã chọn A. Chấm B trong vùng viền xanh, cách A tối đa 60 đơn vị.';
      return;
    }
    if (!roadStart.contains(end)) {
      status.textContent = 'Chọn B trong phạm vi chỉnh đường và cách A tối đa 60 đơn vị.';
      return;
    }
    const stroke = roadStroke([roadStart.origin, end]);
    const direct = roadCandidates(stroke);
    if (direct.candidates.length) {
      clearRoadStart();
      chooseOptions(direct.candidates);
      return;
    }
    if (stroke.centerline.error) { showTownTrial(direct.trial); return; }
    let routeOptions;
    const detour = findRoadDetour({ origin: roadStart.origin, end, width: Number(roadWidthInput.value), bounds: townBounds,
      obstacle: townObstacle, waterAt, surfaceY, autoGrade: autoLevel.checked,
      tryRoute: route => {
        const result = roadCandidates(strokeFor(route));
        if (result.candidates.length) routeOptions = result.candidates;
        return result.candidates[0]?.trial ?? result.trial;
      } });
    if (detour && routeOptions) {
      clearRoadStart();
      chooseOptions(routeOptions.map(({ label, trial }) => ({
        label: label === 'Đường theo ô' ? 'Đi vòng tới B' : `Đi vòng · ${label}`,
        trial: { ...trial, note: 'Tuyến đi vòng đã nối tới B.' },
      })));
      return;
    }
    const partial = roadPartBeforeBuilding(stroke, true);
    if (partial?.candidates.length) {
      chooseOptions(partial.candidates);
      return;
    }
    const trial = direct.trial;
    showTownTrial({ ...trial, note: `${trial.note ? trial.note + ' ' : ''}Chưa tìm được đường vòng hợp lệ trong 60 đơn vị. Chọn lại B.` });
  }

  function previewTown(to, point) {
    if (mode === 'draw') {
      const dx = Math.abs(point.x - drag.origin.x), dz = Math.abs(point.z - drag.origin.z);
      const nearAxis = strokeMode.value === 'snap' && Math.min(dx, dz) <= Math.max(dx, dz) * Math.tan(Math.PI / 12) &&
        drag.points.every(([x, z]) => dx >= dz ? Math.abs(z - drag.origin.z) <= 1 : Math.abs(x - drag.origin.x) <= 1);
      const points = nearAxis && drag.points.length > 1 ? [drag.points[0],
        dx >= dz ? [point.x, drag.origin.z] : [drag.origin.x, point.z]] : drag.points;
      Object.assign(drag, roadStroke(points));
      const { centerline } = drag;
      const building = centerline.steps.find(step => step.cells.some(cell => town.overlaps(cell)));
      const blocked = building?.cells.find(cell => town.overlaps(cell)) ??
        centerline.cells.find(cell => !roads.get(cellKey(cell))?.roadCurveId && townObstacle(cell));
      const discarded = building ? roadPrefix(centerline, Number(roadWidthInput.value), cell => town.overlaps(cell))?.discarded : [];
      drag.trial = { ...centerline, width: Number(roadWidthInput.value), changes: [],
        error: points.length > 1 ? centerline.error || (blocked ? townObstacle(blocked) : '') : '',
        errorCell: blocked, discarded };
    } else if (mode === 'flatten') {
      drag.trial = brushTrial(drag, to);
    } else {
      if (mode === 'erase') {
        drag.cells = extendStroke(drag.cells, to);
      } else {
        const previous = drag.raw.at(-1);
        drag.raw.push(...extendStroke([previous], to).slice(1, 21 - drag.raw.length));
        const dx = Math.abs(point.x - drag.origin.x), dz = Math.abs(point.z - drag.origin.z);
        const straight = strokeMode.value === 'snap' && drag.raw.every(cell => Math.abs(dx >= dz ? cell.z - drag.from.z : cell.x - drag.from.x) <= 1) &&
          Math.min(dx, dz) <= Math.max(dx, dz) * Math.tan(Math.PI / 12) &&
          new Set(drag.raw.map(cellKey)).size === drag.raw.length;
        drag.cells = straight ? extendStroke([drag.from], dx >= dz ? { x: to.x, z: drag.from.z } :
          { x: drag.from.x, z: to.z }) : drag.raw;
        drag.useRibbon = true;
        if (straight) {
          const [x, z] = drag.points[0];
          drag.slopePoints = [drag.points[0], dx >= dz ? [point.x, z] : [x, point.z]];
        } else drag.slopePoints = null;
      }
      drag.trial = drag.useRibbon ? ribbonTrial(drag.slopePoints ? { ...drag, points: drag.slopePoints } : drag) :
        drag.cells.length > 20 ? { cells: drag.cells.slice(0, 20), changes: [],
        error: 'Mỗi nét tối đa 20 ô. Chia tuyến thành nhiều đoạn.' } :
        eraseStroke(drag.cells);
    }
    showTownTrial(drag.trial);
  }

  function roadChanges(next) {
    const keys = new Set([...roads.keys(), ...next.keys()]);
    return [...keys].filter(key => roads.get(key) !== next.get(key)).map(key =>
      ({ key, before: roads.get(key), after: next.get(key) }));
  }

  function chooseOptions(candidates) {
    const junctionOptions = candidates.filter(({ trial }) => trial && !trial.error).flatMap(option => {
      const { trial } = option;
      if (mode !== 'draw') return [option];
      const variants = junctionStyleOptions(roads, trial.roads, trial.cells);
      if (!variants.length) return [option];
      return variants.map(({ style, roads }) => ({
        ...option, label: style === 'roundabout' ? 'Vòng xoay' : 'Giao cùng mức',
        trial: { ...trial, roads, junctionStyle: style },
      }));
    });
    const valid = junctionOptions.flatMap(option => {
      if (mode !== 'draw' || !option.trial.visualRoute || option.trial.legacyBridge) return [option];
      const visual = roundedRoadVisual(option.trial.visualRoute, {
        material: surfaces.value, roads: option.trial.roads, existingRoads: roads,
        obstacle: town ? townObstacle : null, waterAt,
      });
      const cornerVisual = roundedRoadVisual(option.trial.visualRoute, {
        material: surfaces.value, roads: option.trial.roads, existingRoads: roads,
        obstacle: town ? townObstacle : null, waterAt, cornerOnly: true,
      });
      const kind = option.kind;
      const squareLabel = kind === 'slope' ? 'Làm dốc' :
        kind === 'flatten' ? 'San phẳng' :
        kind === 'light-grade' ? 'Làm dốc nhẹ' :
        `${option.label} · Ô vuông`;
      if (!visual) return [{ ...option, label: squareLabel }];
      const items = [{ ...option, label: squareLabel }];
      if (cornerVisual && option.trial.visualRoute.corners?.length) {
        items.push({
          ...option,
          label: kind === 'flatten' ? 'Làm đường cong ở góc (San phẳng)' :
            kind === 'slope' ? 'Làm đường cong ở góc (Làm dốc)' : 'Làm đường cong ở góc',
          trial: {
            ...option.trial, roads: applyRoadVisual(option.trial.roads, cornerVisual), roadVisual: cornerVisual,
          },
        });
      }
      const curvedLabel = kind === 'flatten' ? 'Làm đường cong san phẳng' :
        kind === 'slope' ? 'Kết hợp làm đường cong bo tròn (Làm dốc)' :
        'Kết hợp làm đường cong bo tròn';
      items.push({
        ...option, label: curvedLabel, trial: {
          ...option.trial, roads: applyRoadVisual(option.trial.roads, visual), roadVisual: visual,
        },
      });
      if (town && visual.overhangBlockedCell && option.trial.visualRoute.points?.length >= 2) {
        const pts = option.trial.visualRoute.points;
        let detourCandidates = null;
        const detour = findRoadDetour({
          origin: pts[0], end: pts.at(-1), width: Number(roadWidthInput.value), bounds: townBounds,
          obstacle: cell => (cell.x === visual.overhangBlockedCell.x && cell.z === visual.overhangBlockedCell.z) || townObstacle(cell),
          waterAt, surfaceY, autoGrade: autoLevel.checked,
          tryRoute: route => {
            const res = roadCandidates(strokeFor(route));
            if (res.candidates.length) detourCandidates = res.candidates;
            return res.candidates[0]?.trial ?? res.trial;
          },
        });
        if (detour && detourCandidates?.length) {
          const detTrial = detourCandidates[0].trial;
          const detVis = roundedRoadVisual(detTrial.visualRoute, {
            material: surfaces.value, roads: detTrial.roads, existingRoads: roads,
            obstacle: townObstacle, waterAt,
          });
          if (detVis && !detVis.overhangBlockedCell) {
            items.push({
              label: 'Đi vòng né công trình · Đường cong bo tròn',
              trial: { ...detTrial, roads: applyRoadVisual(detTrial.roads, detVis), roadVisual: detVis },
            });
          }
        }
      }
      return items;
    });
    if (!valid.length) return false;
    proposal = { options: valid, current: 0 };
    optionList.replaceChildren();
    valid.forEach(({ label, trial }, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      const name = document.createElement('strong'), estimate = document.createElement('small');
      name.textContent = label;
      const props = trial.scenery?.filter(edit => billableScenery.has(edit.id)).length ?? 0;
      const units = (mode === 'draw' ? trial.cells.filter(cell => !roads.has(cellKey(cell))).length : 0) + (trial.bridges?.length ?? 0) * 3 +
        Math.ceil(trial.changes.length / 4) + props;
      estimate.textContent = mode === 'erase' ? `${trial.cells.length} ô` :
        `${mode === 'draw' ? `${trial.cells.length} ô${trial.bridges?.length ? ` · ${trial.bridges.length} cầu` : ''} · ` : ''}Ước tính ${units} điểm${props ? ` · dọn ${props}` : ''}`;
      button.append(name);
      if (mode === 'flatten') {
        const area = document.createElement('small');
        area.textContent = `San ${trial.core.length} ô · Taluy ${trial.transition.length} ô`;
        button.append(area);
      }
      if (mode === 'draw' && trial.changes.length) {
        const earth = document.createElement('small');
        const tiles = new Set([...(trial.core ?? []), ...(trial.transition ?? [])].map(cellKey));
        const maxChange = trial.maxChange ?? trial.changes.reduce((maximum, edit) =>
          Math.max(maximum, Math.abs(edit.newY - edit.oldY)), 0);
        earth.textContent = `Vùng chỉnh nền ${tiles.size} ô · cao độ đổi tối đa ${maxChange.toLocaleString('vi-VN', { maximumFractionDigits: 2 })}`;
        button.append(earth);
      }
      button.append(estimate);
      button.addEventListener('click', () => selectOption(index));
      optionList.append(button);
    });
    editOptions.hidden = false;
    selectOption(0);
    unlock();
    return true;
  }

  function selectOption(index) {
    proposal.current = index;
    for (const [i, button] of [...optionList.children].entries()) button.setAttribute('aria-pressed', String(i === index));
    const { trial, softShoulder } = proposal.options[index];
    showTownTrial(trial, true, softShoulder);
  }

  function confirmOption() {
    if (!proposal) return;
    const { trial, label } = proposal.options[proposal.current];
    clearProposal();
    clearRoadStart();
    const affected = new Map(trial.cells.map(cell => [cellKey(cell), cell]));
    if (trial.roads !== roads) {
      for (const { key, before, after } of roadChanges(trial.roads)) affected.set(key, before ?? after);
    }
    const props = trial.scenery?.filter(edit => billableScenery.has(edit.id)).length ?? 0;
    commit(trial.roads, [...affected.values()], `Đã áp dụng ${label.toLocaleLowerCase('vi')}${props ?
      ` và dọn ${props} cây đá` : ''}.`, trial.changes, trial.scenery);
    unlock();
  }

  function finishTown(stroke, cancelled) {
    const { cells, last } = stroke;
    unlock();
    if (cancelled) { clearTrialVisuals(); return; }
    const centerline = stroke.centerline?.points.length > 1 ? stroke.centerline : undefined;
    const drawing = mode === 'draw' ? roadCandidates({ cells, centerline }) : null;
    const trial = drawing?.trial ?? stroke.trial;
    const candidates = [];
    if (drawing) {
      const partial = !drawing.candidates.length && roadPartBeforeBuilding(stroke, false);
      if (partial) {
        if (!chooseOptions(partial.candidates)) showTownTrial({ ...trial, discarded: partial.discarded, errorCell: partial.blocked });
        return;
      }
      candidates.push(...drawing.candidates);
      if (!centerline?.error && cells.length >= 3 && cells.length <= 20) {
        const supported = roadTrial(cells, { centerline, elevated: true });
        if (!supported.error && supported.bridges?.some(bridge => bridge.kind === 'viaduct')) {
          candidates.push({ label: 'Đường trên trụ', trial: supported });
        }
      }
    } else {
      candidates.push({ label: { flatten: 'San phẳng', slope: 'Làm dốc', erase: 'Xóa đoạn đường' }[mode], trial });
      if (mode === 'flatten' && !trial.error && trial.changes.length && trial.core.length > 1) {
        const shoulder = brushTrial(stroke, last, { softEdges: true });
        const before = new Map(trial.changes.map(change => [change.index, change.newY]));
        if (!shoulder.error && (shoulder.changes.length !== before.size ||
          shoulder.changes.some(change => change.newY !== before.get(change.index)))) {
          candidates.push({ label: 'San và chuyển tiếp thoải', trial: shoulder, softShoulder: true });
        }
      }
      if (mode === 'slope' && trial.error && trial.ribbon) {
        const shoulder = ribbonTrial(stroke.slopePoints ? { ...stroke, points: stroke.slopePoints } : stroke, { trimLockedShoulder: true });
        if (!shoulder.error && shoulder.trimmed?.length) {
          candidates.push({ label: 'Làm dốc, giữ nền bên cạnh', trial: shoulder });
        }
      }
    }
    if (!chooseOptions(candidates)) {
      showTownTrial(trial);
      if (mode === 'draw' && !centerline?.error && cells.length > 1 && cells.length <= 20) {
        failedStroke = cells;
        detourButton.hidden = false;
      }
    }
  }

  function applyScenery(edits, forward = true) {
    for (const hidden of [false, true]) {
      scenery.apply(edits.filter(edit => (forward ? edit.hidden : !edit.hidden) === hidden).map(edit => edit.id), hidden);
    }
  }

  function applyChange(next, message, changes = [], nextLevel = level, sceneryEdits = []) {
    if (town) {
      const command = { roads: roadChanges(next), terrain: changes, scenery: sceneryEdits, beforeLevel: level, afterLevel: nextLevel };
      if (command.roads.length || changes.length || sceneryEdits.length || level !== nextLevel) {
        undoStack.push(command);
        if (undoStack.length > 40) undoStack.shift();
        redoStack.length = 0;
      }
      terrainEditor.apply(changes);
      applyScenery(sceneryEdits);
    }
    roads = next;
    level = nextLevel;
    renderRoads();
    status.textContent = message;
    store();
    unlock();
  }
  function commit(next, cells, message, changes = [], sceneryEdits = []) {
    if (traffic.busy(cells)) {
      pending = { next, cells, message, changes, sceneryEdits };
      traffic.restrict(cells);
      status.textContent = 'Đang đợi người và xe rời đoạn đường. Đổi chế độ để hủy.';
      unlock();
      return;
    }
    applyChange(next, message, changes, level, sceneryEdits);
  }

  function replay(from, to, forward) {
    if (pending || drag || proposal || !from.length) return;
    const command = from.at(-1);
    const affected = command.roads.map(item => item.after ?? item.before);
    if (traffic.busy(affected)) {
      status.textContent = 'Đợi người và xe rời đoạn này rồi thử lại.';
      return;
    }
    from.pop();
    to.push(command);
    terrainEditor.apply(command.terrain, forward);
    applyScenery(command.scenery, forward);
    for (const item of command.roads) {
      const value = forward ? item.after : item.before;
      if (value) roads.set(item.key, value);
      else roads.delete(item.key);
    }
    level = forward ? command.afterLevel : command.beforeLevel;
    setMode('inspect');
    renderRoads();
    status.textContent = forward ? 'Đã làm lại thao tác.' : 'Đã hoàn tác.';
    store();
  }

  for (const button of modeButtons) button.addEventListener('click', () => setMode(button.dataset.planMode));
  for (const input of [zones, lanes, grid]) input.addEventListener('change', showLayers);
  levels.addEventListener('change', () => {
    if (town) {
      const requested = Number(levels.value);
      setMode(mode);
      applyChange(roads, `Bến xe Lv${requested} · mở ${materials.slice(0, requested).map(key => materialNames[key]).join(', ')}.`, [], requested);
      return;
    }
    level = Number(levels.value);
    selected = null;
    mark([], '');
    unlock();
    renderRoads();
    status.textContent = `Bến xe Lv${level} · mở ${materials.slice(0, level).map(key => materialNames[key]).join(', ')}.`;
    store();
  });
  apply.addEventListener('click', () => {
    if (!selected?.length || pending || materials.indexOf(surfaces.value) >= level) return;
    commit(changeSurface(roads, selected, surfaces.value), selected,
      `Đã đổi ${selected.length} ô sang ${materialNames[surfaces.value].toLowerCase()}.`);
  });
  document.querySelector('#load-sample').addEventListener('click', () => {
    if (town) {
      setMode('inspect');
      const changes = terrainEditor.heightDeltas().map(({ index, oldY, newY }) => ({ index, oldY: newY, newY: oldY }));
      const sceneryEdits = [...scenery.hidden].map(id => ({ id, hidden: false }));
      applyChange(roadSample(level), `Đã nạp mạng đường mẫu theo cấp bến xe Lv${level}.`, changes, level, sceneryEdits);
      return;
    }
    roads = roadSample(level);
    renderRoads();
    setMode('inspect');
    status.textContent = `Đã nạp mạng đường mẫu theo cấp bến xe Lv${level}.`;
    store();
  });
  if (town) {
    document.querySelector('#confirm-edit').addEventListener('click', confirmOption);
    document.querySelector('#cancel-edit').addEventListener('click', () => setMode(mode));
    document.addEventListener('keydown', event => {
      if ((!proposal && !roadStart) || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === 'Escape') setMode(mode);
      if (event.key.toLowerCase() === 'v') confirmOption();
    });
    undoButton.addEventListener('click', () => replay(undoStack, redoStack, false));
    redoButton.addEventListener('click', () => replay(redoStack, undoStack, true));
    detourButton.addEventListener('click', () => {
      if (mode !== 'draw' || pending || drag || proposal) return;
      if (!failedStroke) return;
      const proposed = roadTrial(failedStroke, { suggestDetour: true }).detour;
      if (!proposed?.length) {
        status.textContent = 'Chưa tìm được đường vòng ngắn quanh nét kéo. Thử đổi điểm đầu hoặc điểm cuối.';
        return;
      }
      const trial = roadTrial(proposed);
      if (!chooseOptions([{ label: 'Đường vòng', trial }])) showTownTrial(trial);
      else detourButton.hidden = true;
    });
    for (const input of [surfaces, roadWidthInput, autoLevel, flattenSize, strokeMode, roadGesture].filter(Boolean)) input.addEventListener('change', () => {
      if (!pending && !drag) setMode(mode);
    });
  }

  if (!town) showTerrainProfile(surfaceY);

  if (!load()) roads = roadSample(level);
  renderRoads();
  setMode('inspect');
  return {
    begin(point, event) {
      if (!point || pending || proposal || event.shiftKey || !['draw', 'erase', 'flatten', 'slope'].includes(mode) ||
        (mode === 'draw' && roadGesture?.value === 'points')) return false;
      const from = cellAt(point);
      drag = { from, origin: point, cells: [from], raw: [from], last: from, points: [[point.x, point.z]] };
      if (town) {
        failedStroke = null;
        detourButton.hidden = true;
        unlock();
        previewTown(from, point);
      } else preview(drag.from);
      return true;
    },
    move(point) {
      if (!drag || !point) return;
      const cell = cellAt(point);
      if (town) {
        if (mode === 'draw' || mode === 'slope') {
          const last = drag.points.at(-1);
          if (Math.hypot(point.x - last[0], point.z - last[1]) < .18) return;
          const maxSamples = mode === 'draw' ? 512 : 96;
          if (drag.points.length >= maxSamples) drag.points[maxSamples - 1] = [point.x, point.z];
          else drag.points.push([point.x, point.z]);
        } else if (sameCell(cell, drag.last)) return;
        drag.last = cell;
        previewTown(cell, point);
      } else preview(cell);
    },
    finish(cancelled) {
      if (!drag) return;
      const ended = drag;
      const { trial } = ended;
      drag = null;
      if (town) {
        finishTown(ended, cancelled);
        return;
      }
      mark([], '');
      if (cancelled || trial.error) return;
      commit(trial.roads, trial.affected, mode === 'erase' ? 'Đã xóa dải đường.' : `Đã vẽ dải đường · rộng tới ${trial.width}×.`);
    },
    inspect(point, building) {
      if (mode === 'draw' && roadGesture?.value === 'points' && !pending && !proposal) chooseRoadEnd(point);
      if (point && ['inspect', 'upgrade'].includes(mode)) inspect(cellAt(point), building);
    },
    pickRoad(ray, hit) {
      if (!town || !['inspect', 'draw', 'erase', 'upgrade'].includes(mode)) return hit?.point;
      const decks = rendered.group.getObjectByName('Cầu người chơi');
      const bridge = decks && ray.intersectObject(decks, true)[0];
      return bridge && (!hit || bridge.distance < hit.distance) ? bridge.point : hit?.point;
    },
    update(time, animate) {
      rendered.update(time);
      const dt = Math.min(.05, time - lastTime);
      if (animate) traffic.tick(time, dt);
      if (pending && !traffic.busy(pending.cells)) {
        const { next, message, changes, sceneryEdits } = pending;
        pending = null;
        traffic.restrict([]);
        applyChange(next, message, changes, level, sceneryEdits);
      }
      lastTime = time;
    },
  };
}

function showTerrainProfile(surfaceY) {
  const trailPoints = [];
  for (let i = 1; i < terraceTrail.length; i++) {
    const [x, z] = terraceTrail[i - 1], [ex, ez] = terraceTrail[i];
    const steps = Math.hypot(ex - x, ez - z) * 4;
    for (let j = i === 1 ? 0 : 1; j <= steps; j++) trailPoints.push(surfaceY(x + (ex - x) * j / steps, z + (ez - z) * j / steps));
  }
  const rise = trailPoints.at(-1) - trailPoints[0];
  const grade = Math.max(...trailPoints.slice(1).map((height, i) => Math.abs(height - trailPoints[i]) * 4));
  document.querySelector('#terrace-profile').textContent =
    `Lối bộ 1× men đầu thềm · dài ${((trailPoints.length - 1) / 4).toFixed(0)} ô · chênh cao ${rise.toFixed(2)} · dốc dọc lớn nhất ${(grade * 100).toFixed(0)}%.`;
  const hillGrade = Math.max(...hillRoadSamples.slice(1).map((point, i) => {
    const previous = hillRoadSamples[i];
    return (point.y - previous.y) / Math.hypot(point.x - previous.x, point.z - previous.z);
  }));
  document.querySelector('#hill-profile').textContent =
    `Đường xe 2× lên đồi · dài ${hillRoadLength.toFixed(1)} ô · chênh cao ${(hillRoadSamples.at(-1).y - hillRoadSamples[0].y).toFixed(2)} · dốc dọc lớn nhất ${(hillGrade * 100).toFixed(0)}% theo tỷ lệ demo.`;
  const chart = document.querySelector('#terrace-chart').getContext('2d');
  const chartHeight = chart.canvas.height, chartWidth = chart.canvas.width;
  const low = Math.min(...trailPoints), high = Math.max(...trailPoints);
  chart.strokeStyle = '#557247';
  chart.lineWidth = 2;
  chart.beginPath();
  for (const [i, height] of trailPoints.entries()) chart.lineTo(4 + i / (trailPoints.length - 1) * (chartWidth - 8),
    chartHeight - 4 - (height - low) / (high - low) * (chartHeight - 8));
  chart.stroke();

}
