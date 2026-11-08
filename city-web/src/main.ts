/* Điểm khởi động. Đọc file này đầu tiên để thấy toàn cảnh:

CityState (dữ liệu) ──setState──▶ City (công trình) + Citizens (người dân) + Player ──▶ Three.js vẽ
     ▲                                                                                │
     └──────────── ứng dụng chủ ◀──emit(intent)── chạm vào bản đồ ◀───────────────────┘

   Lệnh hoạt cảnh (M7): enterBuilding(code) / exitBuilding() → Director → BuildingEntered /
   BuildingExited.
   ?mode=avatar-preview: chỉ dựng nhân vật trên bệ xoay (preview.ts), không dựng thành phố. */
import './style.css';
import * as THREE from 'three';
import { mount, renderer, scene } from './core/renderer';
import { onUpdate, start } from './core/loop';
import { pick, setupControls } from './core/controls';
import { City } from './world/city';
import { Citizen, Citizens } from './people/citizens';
import { Player } from './people/player';
import { NODES, nearestNode, route } from './people/nav';
import { type CityState, DEFAULT_APPEARANCE, DEFAULT_HOUSE_STYLE, MOCK_STATE, normalizeState } from './bridge/cityState';
import { emit, exposeApi, isEmbedded } from './bridge/bridge';
import { setupDebug } from './bridge/debug';
import { BUILDING_CODES, type BuildingCode } from './world/grid';
import { InteriorView } from './world/interior/interiorView';
import { Director } from './world/director';
import { bootPreview } from './preview';

/** Phần API mà bảng giả lập (chạy riêng trên trình duyệt) cần gọi. */
interface DebugApi {
    setState(s: unknown): boolean;
    enterBuilding(code: string): boolean;
    exitBuilding(): boolean;
}

const params = new URLSearchParams(location.search);
mount(document.getElementById('app')!);
if (params.get('mode') === 'avatar-preview') {
    bootPreview();
} else {
    bootCity();
}
start();

function bootCity(): void {
    // City cần biết vị trí người đi bộ (để xe nhường), Citizens cần City (để biết cửa nhà ở đâu)
    // → truyền một hàm "hỏi sau" thay vì đối tượng, tránh phụ thuộc vòng.
    let citizens: Citizens | null = null;
    const city = new City(() => citizens?.onRoad() ?? []);
    citizens = new Citizens(city);

    let state: CityState = normalizeState(MOCK_STATE);

    /* Người chơi đứng trước nhà mình (cổng Housing), thỉnh thoảng đi dạo quanh khối nhà đó. */
    const HOME_NODES = ['HOUSING.gate', 'nn.M1', 'nn.I', 'nn.A'];
    const player = new Player({
        parent: scene,
        wander: (from) => {
            if (Math.random() < 0.45) {
                return null;
            }
            const to = HOME_NODES[Math.floor(Math.random() * HOME_NODES.length)];
            return route(
                nearestNode(from.x, from.z),
                to
            ).map((id) => ({ x: NODES[id][0], z: NODES[id][1] }));
        },
    }, state.player?.appearance ?? DEFAULT_APPEARANCE);
    const [hx, hz] = NODES['HOUSING.gate'];
    player.placeAt(hx, hz, 0);

    const interior = new InteriorView(
        state.player?.appearance ?? DEFAULT_APPEARANCE,
        state.houseStyle ?? DEFAULT_HOUSE_STYLE
    );
    const fadeEl = document.getElementById('fade')!;
    const director = new Director(city, player, interior, emit, fadeEl);

    function apply(next: CityState): void {
        state = next;
        city.apply(next);
        const housing = next.buildings.find((b) => b.code === 'HOUSING')?.level ?? 1;
        citizens!.setCount(3 + housing * 2);
        citizens!.syncEvents(next.events);
        const look = next.player?.appearance ?? DEFAULT_APPEARANCE;
        player.setAppearance(look);
        interior.setAppearance(look);
        interior.setStyle(next.houseStyle ?? DEFAULT_HOUSE_STYLE);
    }

    // Khởi tạo: dựng thành phố, rải người dân sẵn trên phố
    city.apply(state);
    citizens.setCount(
        3 + (state.buildings.find((b) => b.code === 'HOUSING')?.level ?? 1) * 2,
        true
    );
    citizens.syncEvents(state.events);

    exposeApi(apply, () => state, {
        enterBuilding(code: unknown): boolean {
            if (!BUILDING_CODES.includes(code as BuildingCode) || director.mode !== 'city') {
                return false;
            }
            void director.enter(code as BuildingCode);
            return true;
        },
        exitBuilding(): boolean {
            if (director.mode !== 'inside') {
                return false;
            }
            void director.exit();
            return true;
        },
    });

    /* ---------- Chạm ----------
       Trong nhà: chạm sàn để avatar đi tới đó. Ngoài phố: người dân (dấu !) → công trình.
       Đang chạy hoạt cảnh thì bỏ qua mọi lần chạm. */
    const ndc = new THREE.Vector2();
    setupControls((x, y) => {
        if (director.isIndoors()) {
            if (director.mode !== 'inside') {
                return;
            }
            const r = renderer.domElement.getBoundingClientRect();
            interior.tap(ndc.set(
                ((x - r.left) / r.width) * 2 - 1,
                -((y - r.top) / r.height) * 2 + 1
            ));
            return;
        }
        if (director.mode !== 'city') {
            return;
        }
        const hitPerson = pick(x, y, citizens!.pickables());
        if (hitPerson) {
            const c = findUp<Citizen>(hitPerson.object, 'citizen');
            if (c?.eventId) {
                return emit({ type: 'CityEventTapped', eventId: c.eventId });
            }
            if (c) {
                citizens!.greet(c);
            }
            return;
        }
        const hitLot = pick(x, y, city.pickables);
        const code = hitLot && findUp<BuildingCode>(hitLot.object, 'buildingCode');
        if (code) {
            city.poke(code);
            emit({ type: 'BuildingTapped', buildingCode: code });
        }
    }, () => director.canPan());

    // người chơi ngoài phố chỉ cần cập nhật khi đang hiện cảnh thành phố
    onUpdate((dt, t) => {
        if (!director.isIndoors()) {
            player.update(dt, t);
        }
    });

    /* ---------- Chạy riêng trên trình duyệt ----------
       Không có app chủ: hiện bảng giả lập và thông báo intent lên màn hình. */
    if (!isEmbedded() && params.get('debug') !== '0') {
        const api = (window as unknown as { LinguaCity: DebugApi }).LinguaCity;
        setupDebug(
            () => state,
            (s) => api.setState(s),
            { enter: (c) => api.enterBuilding(c), exit: () => api.exitBuilding() }
        );
        const toast = document.getElementById('toast')!;
        let hide = 0;
        addEventListener('linguacity:intent', (e) => {
            const i = (e as CustomEvent).detail;
            if (i.type === 'Ready') {
                return;
            }
            toast.textContent = `${i.type} · ${i.buildingCode ?? i.eventId}`;
            toast.classList.add('show');
            clearTimeout(hide);
            hide = window.setTimeout(() => toast.classList.remove('show'), 1800);
        });
    }

    emit({ type: 'Ready' });
}

/** Lần ngược từ mesh bị chạm lên các cha cho tới khi gặp userData[key]. */
function findUp<T>(o: THREE.Object3D | null, key: string): T | null {
    for (; o; o = o.parent) {
        if (o.userData[key] !== undefined) {
            return o.userData[key] as T;
        }
    }
    return null;
}
