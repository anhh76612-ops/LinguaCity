// "Hợp đồng" (B) giữa ứng dụng chủ (Kotlin/Android, sau này web/iOS) và bản đồ — phiên bản 1.
// Đặc tả: docs/03-architecture/system-design.md §9.2 và ADR-011. Phía Kotlin: CityBridgeJson.kt.
// Bản đồ CHỈ nhận CityState để vẽ, KHÔNG tự tính tài nguyên, thời gian hay gọi API.
// Tiến hoá: chỉ THÊM trường tuỳ chọn; trường lạ bị bỏ qua; đổi nghĩa một trường thì tăng CONTRACT_VERSION.
import type { BuildingCode } from '../world/grid';
import { BUILDING_CODES } from '../world/grid';

export const MAX_LEVEL = 3;
export const CONTRACT_VERSION = 1;

export interface BuildingState {
  code: BuildingCode;
  level: number;         // 0..MAX_LEVEL — 0 = chưa xây (lô đất trống)
  upgrading?: boolean;   // đang xây nâng cấp (server quyết định, bản đồ chỉ hiển thị)
  progress?: number;     // 0..1, tiến độ xây
}

/** Sự kiện thành phố (GDD §3.1): dấu (!) trên đầu một người dân, chạm vào để làm bài ngữ pháp. */
export interface CityEvent {
  id: string;
  kind?: 'GRAMMAR';
}

/* ---------- Ngoại hình nhân vật và kiểu nhà (M7, trường TUỲ CHỌN, vẫn v1) ----------
   Bridge chỉ chở GIÁ TRỊ ĐỂ VẼ (asset_key của cosmetic_items, system-design §10.2.3):
   màu là "#rrggbb", kiểu dáng là một từ khoá. App dịch mã cosmetic (HAIR_SHORT…) sang asset_key. */
export type HairStyleKey = 'short' | 'long' | 'bun' | 'spiky';
export type AccessoryKey = 'none' | 'hat' | 'glasses';
export type FloorKey = 'oak' | 'walnut' | 'tile' | 'checker' | 'carpet';

export interface Appearance {
  skin: string;          // "#rrggbb"
  hairStyle: HairStyleKey;
  hairColor: string;
  shirt: string;
  pants: string;
  accessory: AccessoryKey;
}

export interface HouseStyle {
  wall: string;          // "#rrggbb": tường trong nhà và tường ngoài của Housing
  floor: FloorKey;
}

export const HAIR_STYLES: readonly HairStyleKey[] = ['short', 'long', 'bun', 'spiky'];
export const ACCESSORIES: readonly AccessoryKey[] = ['none', 'hat', 'glasses'];
export const FLOORS: readonly FloorKey[] = ['oak', 'walnut', 'tile', 'checker', 'carpet'];

export const DEFAULT_APPEARANCE: Appearance = {
  skin: '#f1c7a5', hairStyle: 'short', hairColor: '#4a3426', shirt: '#4db6ac', pants: '#3949ab', accessory: 'none',
};
export const DEFAULT_HOUSE_STYLE: HouseStyle = { wall: '#f3e7d3', floor: 'oak' };

export interface CityState {
  v?: number;            // phiên bản hợp đồng; thiếu thì coi như 1
  buildings: BuildingState[];
  events: CityEvent[];
  player?: { appearance?: Appearance };
  houseStyle?: HouseStyle;
}

/** Ý định của người chơi gửi ngược về ứng dụng chủ. Bản đồ không tự xử lý nghiệp vụ.
 *  BuildingEntered / BuildingExited (M7): phát khi hoạt cảnh enterBuilding() / exitBuilding() chạy xong. */
export type CityIntent =
  | { type: 'Ready' }
  | { type: 'BuildingTapped'; buildingCode: BuildingCode }
  | { type: 'CityEventTapped'; eventId: string }
  | { type: 'BuildingEntered'; buildingCode: BuildingCode }
  | { type: 'BuildingExited'; buildingCode: BuildingCode };

/** Dữ liệu giả lập để chạy riêng trên trình duyệt. */
export const MOCK_STATE: CityState = {
  buildings: [
    { code: 'HOUSING', level: 2 },
    { code: 'SCHOOL', level: 2, upgrading: true, progress: 0.4 },
    { code: 'PARK', level: 2 },
    { code: 'ROAD', level: 3 },
  ],
  events: [{ id: 'evt-grammar-1', kind: 'GRAMMAR' }],
};

/** Kiểm tra và làm sạch dữ liệu nhận từ bên ngoài: không tin dữ liệu vào, kẹp giá trị về khoảng hợp lệ. */
export function normalizeState(input: unknown): CityState {
  const raw = (typeof input === 'string' ? JSON.parse(input) : input) as Partial<CityState> | null;
  if (!raw || typeof raw !== 'object') throw new Error('CityState phải là object JSON');
  const v = raw.v ?? CONTRACT_VERSION;
  if (v > CONTRACT_VERSION) console.warn(`[LinguaCity] CityState v${v} mới hơn bản đồ (v${CONTRACT_VERSION}); vẫn đọc các trường đã biết`);
  const byCode = new Map<BuildingCode, BuildingState>();
  for (const b of Array.isArray(raw.buildings) ? raw.buildings : []) {
    if (!b || !BUILDING_CODES.includes(b.code)) continue;
    const n = Number(b.level);
    const level = Math.min(MAX_LEVEL, Math.max(0, Math.round(Number.isFinite(n) ? n : 1)));
    const progress = Math.min(1, Math.max(0, Number(b.progress) || 0));
    byCode.set(b.code, { code: b.code, level, upgrading: !!b.upgrading, progress });
  }
  // công trình nào không được gửi thì coi như level 1
  const buildings = BUILDING_CODES.map((code) => byCode.get(code) ?? { code, level: 1, upgrading: false, progress: 0 });
  const events = (Array.isArray(raw.events) ? raw.events : [])
    .filter((e): e is CityEvent => !!e && typeof e.id === 'string' && e.id.length > 0)
    .map((e) => ({ id: e.id, kind: e.kind ?? 'GRAMMAR' }));
  return { v: CONTRACT_VERSION, buildings, events, player: { appearance: normalizeAppearance(raw.player?.appearance) }, houseStyle: normalizeHouseStyle(raw.houseStyle) };
}

const HEX = /^#[0-9a-fA-F]{6}$/;
const color = (v: unknown, fallback: string): string => (typeof v === 'string' && HEX.test(v) ? v.toLowerCase() : fallback);
const oneOf = <T extends string>(v: unknown, list: readonly T[], fallback: T): T => (list.includes(v as T) ? (v as T) : fallback);

/** Ngoại hình: thiếu hoặc sai trường nào thì dùng giá trị mặc định của trường đó. */
export function normalizeAppearance(input: unknown): Appearance {
  const a = (input && typeof input === 'object' ? input : {}) as Partial<Record<keyof Appearance, unknown>>;
  const d = DEFAULT_APPEARANCE;
  return {
    skin: color(a.skin, d.skin),
    hairStyle: oneOf(a.hairStyle, HAIR_STYLES, d.hairStyle),
    hairColor: color(a.hairColor, d.hairColor),
    shirt: color(a.shirt, d.shirt),
    pants: color(a.pants, d.pants),
    accessory: oneOf(a.accessory, ACCESSORIES, d.accessory),
  };
}

export function normalizeHouseStyle(input: unknown): HouseStyle {
  const h = (input && typeof input === 'object' ? input : {}) as Partial<Record<keyof HouseStyle, unknown>>;
  return { wall: color(h.wall, DEFAULT_HOUSE_STYLE.wall), floor: oneOf(h.floor, FLOORS, DEFAULT_HOUSE_STYLE.floor) };
}
