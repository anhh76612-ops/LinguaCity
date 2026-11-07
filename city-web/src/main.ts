/* Điểm khởi động. Đọc file này đầu tiên để thấy toàn cảnh:

   CityState (dữ liệu) ──setState──▶ City (công trình) + Citizens (người dân) ──▶ Three.js vẽ
        ▲                                                                       │
        └──────────── ứng dụng chủ ◀──emit(intent)── chạm vào bản đồ ◀──────────┘
*/
import './style.css';
import * as THREE from 'three';
import { mount } from './core/renderer';
import { start } from './core/loop';
import { pick, setupControls } from './core/controls';
import { City } from './world/city';
import { Citizen, Citizens } from './people/citizens';
import { type CityState, MOCK_STATE, normalizeState } from './bridge/cityState';
import { emit, exposeApi, isEmbedded } from './bridge/bridge';
import { setupDebug } from './bridge/debug';
import type { BuildingCode } from './world/grid';

mount(document.getElementById('app')!);

// City cần biết vị trí người đi bộ (để xe nhường), Citizens cần City (để biết cửa nhà ở đâu)
// → truyền một hàm "hỏi sau" thay vì đối tượng, tránh phụ thuộc vòng.
let citizens: Citizens | null = null;
const city = new City(() => citizens?.onRoad() ?? []);
citizens = new Citizens(city);

let state: CityState = normalizeState(MOCK_STATE);

function apply(next: CityState): void {
  state = next;
  city.apply(next);
  const housing = next.buildings.find((b) => b.code === 'HOUSING')?.level ?? 1;
  citizens!.setCount(3 + housing * 2);
  citizens!.syncEvents(next.events);
}

// Khởi tạo: dựng thành phố, rải người dân sẵn trên phố
city.apply(state);
citizens.setCount(3 + (state.buildings.find((b) => b.code === 'HOUSING')?.level ?? 1) * 2, true);
citizens.syncEvents(state.events);

exposeApi(apply, () => state);

/* ---------- Chạm ----------
   Thứ tự ưu tiên: người dân (dấu !) → công trình. */
setupControls((x, y) => {
  const hitPerson = pick(x, y, citizens!.pickables());
  if (hitPerson) {
    const c = findUp<Citizen>(hitPerson.object, 'citizen');
    if (c?.eventId) return emit({ type: 'CityEventTapped', eventId: c.eventId });
    if (c) citizens!.greet(c);
    return;
  }
  const hitLot = pick(x, y, city.pickables);
  const code = hitLot && findUp<BuildingCode>(hitLot.object, 'buildingCode');
  if (code) {
    city.poke(code);
    emit({ type: 'BuildingTapped', buildingCode: code });
  }
});

/** Lần ngược từ mesh bị chạm lên các cha cho tới khi gặp userData[key]. */
function findUp<T>(o: THREE.Object3D | null, key: string): T | null {
  for (; o; o = o.parent) if (o.userData[key] !== undefined) return o.userData[key] as T;
  return null;
}

/* ---------- Chạy riêng trên trình duyệt ----------
   Không có app chủ: hiện bảng giả lập và thông báo intent lên màn hình. */
const params = new URLSearchParams(location.search);
if (!isEmbedded() && params.get('debug') !== '0') {
  setupDebug(() => state, (s) => (window as unknown as { LinguaCity: { setState(s: unknown): boolean } }).LinguaCity.setState(s));
  const toast = document.getElementById('toast')!;
  let hide = 0;
  addEventListener('linguacity:intent', (e) => {
    const i = (e as CustomEvent).detail;
    if (i.type === 'Ready') return;
    toast.textContent = i.type === 'BuildingTapped' ? `BuildingTapped · ${i.buildingCode}` : `CityEventTapped · ${i.eventId}`;
    toast.classList.add('show');
    clearTimeout(hide);
    hide = window.setTimeout(() => toast.classList.remove('show'), 1800);
  });
}

start();
emit({ type: 'Ready' });
