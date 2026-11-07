// "Hợp đồng" dữ liệu giữa ứng dụng chủ (Kotlin/Android, sau này web/iOS) và bản đồ.
// Bản đồ CHỈ nhận CityState để vẽ, KHÔNG tự tính tài nguyên hay gọi API (theo tinh thần ADR-009/ADR-010).
import type { BuildingCode } from '../world/grid';
import { BUILDING_CODES } from '../world/grid';

export const MAX_LEVEL = 3;

export interface BuildingState {
  code: BuildingCode;
  level: number;         // 1..MAX_LEVEL
  upgrading?: boolean;   // đang xây nâng cấp (server quyết định, bản đồ chỉ hiển thị)
  progress?: number;     // 0..1, tiến độ xây
}

/** Sự kiện thành phố (GDD §3.1): dấu (!) trên đầu một người dân, chạm vào để làm bài ngữ pháp. */
export interface CityEvent {
  id: string;
  kind?: 'GRAMMAR';
}

export interface CityState {
  buildings: BuildingState[];
  events: CityEvent[];
}

/** Ý định của người chơi gửi ngược về ứng dụng chủ. Bản đồ không tự xử lý nghiệp vụ. */
export type CityIntent =
  | { type: 'Ready' }
  | { type: 'BuildingTapped'; buildingCode: BuildingCode }
  | { type: 'CityEventTapped'; eventId: string };

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
  const byCode = new Map<BuildingCode, BuildingState>();
  for (const b of Array.isArray(raw.buildings) ? raw.buildings : []) {
    if (!b || !BUILDING_CODES.includes(b.code)) continue;
    const level = Math.min(MAX_LEVEL, Math.max(1, Math.round(Number(b.level) || 1)));
    const progress = Math.min(1, Math.max(0, Number(b.progress) || 0));
    byCode.set(b.code, { code: b.code, level, upgrading: !!b.upgrading, progress });
  }
  // công trình nào không được gửi thì coi như level 1
  const buildings = BUILDING_CODES.map((code) => byCode.get(code) ?? { code, level: 1, upgrading: false, progress: 0 });
  const events = (Array.isArray(raw.events) ? raw.events : [])
    .filter((e): e is CityEvent => !!e && typeof e.id === 'string' && e.id.length > 0)
    .map((e) => ({ id: e.id, kind: e.kind ?? 'GRAMMAR' }));
  return { buildings, events };
}
