/* Bố cục bản đồ (nhìn từ trên xuống, đơn vị = 1 ô):

z = -12 ┌────────────┬────┬────────────┐
        │  HOUSING   │    │   SCHOOL   │    Hai con đường cắt nhau ở giữa (|x| < 2, |z| < 2).
        │  (-6.5,-6.5)│ đường│ (6.5,-6.5) │    Mỗi góc là một khối nhà (block) nâng cao 0.1,
        ├────────────┼────┼────────────┤    viền ngoài là vỉa hè rộng 1 ô, bên trong là lô đất 7×7.
        │   PARK     │    │   ROAD     │
        │  (-6.5,6.5) │    │ (6.5,6.5)  │    Camera nhìn từ góc (+x, +z) nên HOUSING ở xa nhất:
z = 12  └────────────┴────┴────────────┘    nhà cao đặt ở đó không che công trình khác.
      x = -12                     x = 12
*/
export const MAP_HALF = 12;     // bản đồ từ -12 đến 12 theo cả x và z
export const ROAD_HALF = 2;     // đường: |x| < 2 hoặc |z| < 2 (hai làn, mỗi làn rộng 2)
export const BLOCK_IN = 2;      // khối nhà bắt đầu sát mép đường
export const BLOCK_OUT = 11;    // …và kết thúc trước mép bản đồ 1 ô (dải cỏ trồng cây)
export const WALK = 2.5;        // đường tâm vỉa hè phía trong (sát đường)
export const WALK_OUT = 10.5;   // đường tâm vỉa hè phía ngoài
export const LOT_C = 6.5;       // tâm lô đất
export const LOT_SIZE = 7;      // lô đất 7×7 (từ 3 đến 10)
export const BLOCK_H = 0.1;     // khối nhà cao hơn mặt đường

export type BuildingCode = 'HOUSING' | 'ROAD' | 'PARK' | 'SCHOOL';
export const BUILDING_CODES: BuildingCode[] = ['HOUSING', 'SCHOOL', 'PARK', 'ROAD'];

/** Mỗi lô nằm ở một góc phần tư: sx, sz là dấu (+1/-1) của góc đó. */
export const LOTS: Record<BuildingCode, { sx: number; sz: number; name: string; icon: string }> = {
    HOUSING: { sx: -1, sz: -1, name: 'Housing', icon: '🏠' },
    SCHOOL: { sx: 1, sz: -1, name: 'School', icon: '🏫' },
    PARK: { sx: -1, sz: 1, name: 'Park', icon: '🌳' },
    ROAD: { sx: 1, sz: 1, name: 'Road', icon: '🚌' },
};

export function lotCenter(code: BuildingCode): { x: number; z: number } {
    const l = LOTS[code];
    return { x: l.sx * LOT_C, z: l.sz * LOT_C };
}

/** Có nằm trên một khối nhà (vỉa hè hoặc lô đất) không? */
export function onBlock(x: number, z: number): boolean {
    const ax = Math.abs(x), az = Math.abs(z);
    return ax >= BLOCK_IN && ax <= BLOCK_OUT && az >= BLOCK_IN && az <= BLOCK_OUT;
}

/** Độ cao mặt đất tại (x, z): người đi lên vỉa hè sẽ "bước lên" 0.1. */
export function heightAt(x: number, z: number): number {
    return onBlock(x, z) ? BLOCK_H : 0;
}
