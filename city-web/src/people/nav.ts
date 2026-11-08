/* Đồ thị đường đi cho người dân.
     - Nút (node): điểm trên vỉa hè, cửa vào lô, vòng quanh đài phun nước…
     - Cạnh (edge): đoạn thẳng đi được mà không xuyên tường/công trình.
     Người dân tìm đường ngắn nhất giữa hai nút bằng thuật toán Dijkstra, rồi đi lần lượt qua từng nút.

     Vỉa hè mỗi khối nhà là một vòng chữ nhật:  I ── M1 ── A
                                                                                             │          │
                                                                                             M2         │      I = góc sát giao lộ
                                                                                             │          │      M1, M2 = giữa cạnh (cửa vào lô)
                                                                                             B ──────── O
     Bốn vạch qua đường nối các góc I của bốn khối với nhau. */
import { type BuildingCode, LOT_C, WALK, WALK_OUT, lotCenter } from '../world/grid';
import { PARK_BENCHES } from '../world/buildings/park';
import { BUS_STOP } from '../world/buildings/road';
import type { Anim } from './poses';

export type NodeId = string;
export const NODES: Record<NodeId, [number, number]> = {};
export const ADJ: Record<NodeId, NodeId[]> = {};

function node(id: NodeId, x: number, z: number): NodeId {
    NODES[id] = [x, z];
    ADJ[id] ??= [];
    return id;
}
function link(a: NodeId, b: NodeId): void {
    ADJ[a].push(b);
    ADJ[b].push(a);
}
const q = (sx: number, sz: number) => `${sx > 0 ? 'p' : 'n'}${sz > 0 ? 'p' : 'n'}`; // tên góc phần tư: pp, pn, np, nn

// 1) Vòng vỉa hè của bốn khối nhà
for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const k = q(sx, sz);
    const ring = [
        node(`${k}.I`, sx * WALK, sz * WALK),
        node(`${k}.M1`, sx * LOT_C, sz * WALK),
        node(`${k}.A`, sx * WALK_OUT, sz * WALK),
        node(`${k}.O`, sx * WALK_OUT, sz * WALK_OUT),
        node(`${k}.B`, sx * WALK, sz * WALK_OUT),
        node(`${k}.M2`, sx * WALK, sz * LOT_C),
    ];
    ring.forEach((id, i) => link(id, ring[(i + 1) % ring.length]));
}
// 2) Vạch qua đường giữa các góc I
link('pp.I', 'np.I'); link('pn.I', 'nn.I'); // băng qua đường dọc (trục z)
link('pp.I', 'pn.I'); link('np.I', 'nn.I'); // băng qua đường ngang (trục x)

// 3) Cửa vào lô HOUSING và SCHOOL (mặt trước hướng về đường z = 0)
for (const code of ['HOUSING', 'SCHOOL'] as const) {
    const c = lotCenter(code), sx = Math.sign(c.x);
    link(node(`${code}.gate`, c.x, c.z + 3.6), `${q(sx, -1)}.M1`);
}

// 4) Công viên: hai lối vào + vòng 8 nút bao quanh đài phun nước (bán kính 1.6, không đi xuyên tâm)
const park = lotCenter('PARK');
const R = 1.6, ringIds: NodeId[] = [];
for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ringIds.push(node(`PARK.r${i}`, park.x + Math.cos(a) * R, park.z + Math.sin(a) * R));
}
ringIds.forEach((id, i) => link(id, ringIds[(i + 1) % 8]));
link(node('PARK.gateX', park.x + 3.6, park.z), 'np.M2');   // lối vào phía +x
link('PARK.gateX', 'PARK.r0');                              // r0 ở góc 0 = phía +x
link(node('PARK.gateZ', park.x, park.z - 3.6), 'np.M1');   // lối vào phía -z
link('PARK.gateZ', 'PARK.r6');                              // r6 ở góc 270° = phía -z

// 5) Trạm xe buýt (lô ROAD): lối vào từ vỉa hè
const road = lotCenter('ROAD');
link(node('ROAD.gate', road.x + BUS_STOP.x, road.z + BUS_STOP.z), 'pp.M1');

/* ---------- Điểm đến (spot) ----------
     Mỗi spot là một chỗ người dân tới và làm gì đó: ngồi ghế, đứng chờ xe, ngắm đài phun nước…
     Mỗi spot chỉ cho một người dùng (by), tránh hai người ngồi chồng lên nhau. */
export interface Spot {
    id: string;
    node: NodeId;             // nút gần nhất để tìm đường tới
    x: number; z: number;     // vị trí cuối cùng (bước khỏi nút để tới đây)
    face: number;             // hướng nhìn khi tới nơi
    act: Anim;
    sit?: boolean;
    /** Công trình sở hữu điểm này và level tối thiểu để dùng được. Mặc định: công trình theo tiền tố của node, level ≥ 1. */
    needs?: { code: BuildingCode; level: number };
    by: object | null;
}
export const SPOTS: Spot[] = [];

// ghế công viên: mỗi ghế hai chỗ ngồi
PARK_BENCHES.forEach((b, i) => {
    const near = b.face === Math.PI / 2 ? 'PARK.r4' : 'PARK.r2'; // r4 = phía -x, r2 = phía +z
    for (const off of [-0.25, 0.25]) {
        // chỗ ngồi lệch sang hai bên theo chiều dài ghế (vuông góc với hướng nhìn)
        const ox = Math.cos(b.face) * off, oz = -Math.sin(b.face) * off;
        SPOTS.push({ id: `bench${i}${off}`, node: near, x: park.x + b.x + ox, z: park.z + b.z + oz, face: b.face, act: 'sit', sit: true, by: null });
    }
});
// đứng ngắm đài phun nước / trò chuyện
for (const i of [1, 3, 5, 7]) {
    const [x, z] = NODES[`PARK.r${i}`];
    SPOTS.push({ id: `park.view${i}`, node: `PARK.r${i}`, x, z, face: Math.atan2(park.x - x, park.z - z), act: i % 4 === 1 ? 'talk' : 'idle', by: null });
}
// sân chơi (chỉ khi công viên level 3)
SPOTS.push({ id: 'park.play', node: 'PARK.r5', x: park.x - 1.6, z: park.z - 1.9, face: 0, act: 'celebrate', needs: { code: 'PARK', level: 3 }, by: null });
// trạm xe buýt: hai chỗ ngồi trên ghế + hai chỗ đứng, tất cả nhìn ra đường (-z)
for (const off of [-0.25, 0.25]) SPOTS.push({ id: `bus.seat${off}`, node: 'ROAD.gate', x: road.x + off, z: road.z - 2.3, face: Math.PI, act: 'sit', sit: true, by: null });
for (const off of [-1.3, 1.3]) SPOTS.push({ id: `bus.stand${off}`, node: 'ROAD.gate', x: road.x + off, z: road.z + BUS_STOP.z, face: Math.PI, act: off < 0 ? 'read' : 'idle', by: null });

/** Các nút vỉa hè để "đi dạo" ngẫu nhiên. */
export const STROLL_NODES = Object.keys(NODES).filter((id) => /\.(A|O|B|M1|M2)$/.test(id));

/** Đường đi ngắn nhất (theo khoảng cách) giữa hai nút: thuật toán Dijkstra. */
export function route(from: NodeId, to: NodeId): NodeId[] {
    if (from === to) return [from];
    const dist: Record<NodeId, number> = { [from]: 0 };
    const prev: Record<NodeId, NodeId | null> = { [from]: null };
    const open = new Set<NodeId>([from]);
    while (open.size) {
        // lấy nút "gần" nhất chưa xét (đồ thị nhỏ nên duyệt tuyến tính là đủ nhanh)
        let n: NodeId | null = null;
        for (const k of open) if (n === null || dist[k] < dist[n]) n = k;
        open.delete(n!);
        if (n === to) break;
        for (const m of ADJ[n!]) {
            const [ax, az] = NODES[n!], [bx, bz] = NODES[m];
            const d = dist[n!] + Math.hypot(bx - ax, bz - az);
            if (!(m in dist) || d < dist[m]) { dist[m] = d; prev[m] = n; open.add(m); }
        }
    }
    if (!(to in prev)) return [from, to];
    const path: NodeId[] = [];
    for (let n: NodeId | null = to; n; n = prev[n]) path.unshift(n);
    return path;
}

/** Nút gần một vị trí nhất. */
export function nearestNode(x: number, z: number): NodeId {
    let best = STROLL_NODES[0], bd = Infinity;
    for (const [id, [nx, nz]] of Object.entries(NODES)) {
        const d = Math.hypot(nx - x, nz - z);
        if (d < bd) { bd = d; best = id; }
    }
    return best;
}
